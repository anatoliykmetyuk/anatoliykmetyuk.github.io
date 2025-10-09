---
title: Context Function for DSL Design in Scala
description: How Context Functions can help design better DSLs in Scala
image: /images/scala3.png
layout: post
---

A strong side of Scala is its DSL capability. DSLs, or domain-specific languages, are programming languages designed for convenient expression of operations in a certain domain. An example of such a DSL is the one I [designed](/posts/2022-02-19-launching-rockets.html) for Simple Rockets 2 – SR2 Compiler. That DSL can be used to program a rocket in the game.

<!-- more -->

DSLs are often implemented as a library of another, host language. In the SR2 Compiler, the game-specific DSL is designed as a library of Scala thanks to Scala’s features for DSL design: [curried functions](https://alvinalexander.com/scala/fp-book/partially-applied-functions-currying-in-scala/), [extension methods](https://docs.scala-lang.org/scala3/book/ca-extension-methods.html), symbolic method names and [scripting capability](https://scala-cli.virtuslab.org/). Another great such feature new to Scala 3 is the [Context Function](https://docs.scala-lang.org/scala3/reference/contextual/context-functions.html#inner-main) type. This article will cover it in the context of DSL design.

# Delayed Execution
Consider the following program written in the SR2 Compiler DSL:

```scala
activateStage()  // Turn on the engine
Throttle := 1  // Engine power 100%
Pitch := 25  // Tilt the rocket 25 degrees to the horizon
```

The process of getting this code on board a SR2 rocket goes as follows:

1. The Scala code is compiled.
2. The compiled program is executed by the JVM. The job of this program is to translate the instructions `activateStage()`, `Throttle := 1` and `Pitch := 25` into equivalent instructions in the game's built-in programming language and write them as an in-game program into the game's directory.
3. In the game, the player loads the program into their desired spacecraft.
4. The player starts the flight simulation with the spacecraft in question, and the program loaded into the spacecraft is executed.

Notice how the instructions aren't for the JVM but for the Simple Rockets 2 runtime. Instead of executing them, we want the JVM to collect and output them in the desired format.

# ASTs
ASTs, or [Abstract Syntax Trees](https://en.wikipedia.org/wiki/Abstract_syntax_tree), are data structures that represent a program's source code as a tree. The first step in any compiler's pipeline is to parse the source code into such a tree. Data structures are, well, structured, as opposed to text, and so are easier for compilers to work with.

In the SR2 Compiler, we also need a structure to represent instructions so that we can transform and output them. To represent `activateStage()`, we might use a `case object ActivateStage`. To represent assignment `:=`, we could use `case class Assignment(varName: String, value: Double)`. And we can make those types extend a `sealed trait Instruction` to have a common type for all instruction types. With those types, we can represent the entire program as an AST as follows:

```scala
List(
  ActivateStage,
  Assignment("Throttle", 1),
  Assignment("Pitch", 25)
)
```

The question is, how do we define `:=` and `activateStage()` functions so that the program would produce such a list when executed?

# Context Parameters
Whenever a DSL instruction is executed by the JVM, an AST node representing that instruction must be written into a mutable list that represents the program. Where does that mutable list come from?

Global mutable state is a universally accepted bad practice, so such a list must come from the function's parameters. We don't want it to be present in the parameters explicitly since it is a technical detail that has nothing to do with the business logic of flying the rocket. Fortunately, we can make it a [contextual parameter](https://docs.scala-lang.org/scala3/book/taste-contextual-abstractions.html#inner-main) in Scala 3:

```scala
import collection.mutable.ListBuffer
def activateStage()(using lst: ListBuffer[Instruction]): Unit = ???
```

When we call `activateStage()`, the `lst` parameter is inferred from the contextual scope. However, the list must still be created somewhere and placed on that contextual scope. This logic also has nothing to do with the business logic of the DSL, so we want to abstract it away from the user. So, we can define a function `program` that provides the list to the DSL instructions. The same function can also take care of outputting the instructions to the game directory:

```scala
// Defined by the library
def program(name: String)(body: ListBuffer[Instruction] => Unit): Unit =
  val bldr = ListBuffer.empty[Instruction]
  body(bldr)
  writeProgramToFile(bldr)
end program

// Written by the user
program("Hello Simple Rockets 2") { lst =>
  given ListBuffer[Instruction] = lst
  activateStage()
  Throttle := 1
  Pitch := 25
}
```

Thus, the user doesn't need to handle the list creation. But they still need to take care of [putting it on the contextual scope](https://docs.scala-lang.org/scala3/reference/contextual/givens.html#inner-main) via `given ListBuffer[Instruction] = lst` – something we need to get rid of.

# Context Functions
A [context function](https://docs.scala-lang.org/scala3/reference/contextual/context-functions.html) is to an ordinary function what a method with contextual parameters is to a method with ordinary parameters:

```scala
def f(x: Int): Int = x * x
val f1: Int => Int = x => x * x
def g(using Int) = summon[Int] * summon[Int]
val g1: Int ?=> Int = summon[Int] * summon[Int]
```

Above[^1], `g1` is a context function. When defining a context function, we can omit its argument list, specifying only the body.

Using context functions, we can rewrite the `program` function and use it as follows:

```scala
// Defined by the library
def program(name: String)(body: ListBuffer[Instruction] ?=> Unit): Unit =
  val bldr = ListBuffer.empty[Instruction]
  body(using bldr)
  writeProgramToFile(bldr)
end program

// Written by the user
program("Hello Simple Rockets 2") {
  activateStage()
  Throttle := 1
  Pitch := 25
}
```

With that, we've spared the user the trouble of writing anything that is not related to the business logic.

# Everything is a Context Function!
At least in our DSL implementation. Remember the signature of instructions like `activateStage()`?

```scala
def activateStage()(using lst: ListBuffer[Instruction]): Unit = ???
```

Since methods with contextual parameters can be rewritten to context functions, we can rewrite the above definition as follows:

```scala
def activateStage(): ListBuffer[Instruction] ?=> Unit = ???
```

`activateStage`, hence, is an ordinary function that returns a context function. That context function, in presence of a contextual parameter of type `ListBuffer[Instruction]`, writes `ActivateStage` AST node to that list.

It is the second time that we see `ListBuffer[Instruction] ?=> Unit` type in the DSL implementation – the first one being in the `program` definition. From the DSL user's perspective, methods and values of this type contain programs meant for the game's runtime. To improve user experience, let's give this type a name and rewrite our definitions:

```scala
type SRProgram = ListBuffer[Instruction] ?=> Unit

def program(name: String)(body: SRProgram): Unit = ???
def activateStage(): SRProgram = ???
```

This type can also be used to modularise our DSL program. Consider, for example, that we have a large set of instructions for the `program`, and we want to modularise it into methods. If you put several instructions into a Scala method, the compiler will (understandably) complain that it can't find the contextual parameter for `ListBuffer[Instruction]`:

```scala
// DOES NOT COMPILE: CANNOT FIND CONTEXTUAL PARAMETER FOR ListBuffer[Instruction]

def liftOff() =
  activateStage()
  Throttle := 1
  Pitch := 25
end liftOff

def flySouth() =
  Heading := 180  // In degrees, 0 = North, 90 = East etc
end flySouth

program("Hello") {
  liftOff()
  flySouth()
}
```

However, if we type a method as `SRProgram`, the compiler understands that the contextual parameter is expected at the call site (not the definition site), and the error goes away:

```scala
def liftOff(): SRProgram =
  activateStage()
  Throttle := 1
  Pitch := 25
end liftOff

def flySouth(): SRProgram =
  Heading := 180  // In degrees, 0 = North, 90 = East etc
end flySouth

program("Hello") {
  liftOff()
  flySouth()
}
```

# Relationship with Baguettes
Those of you familiar with functional programming would recognise the monadic state pattern. In popular functional libraries there is a type class called `State` the gist of which is to abstract away mutable state from the business logic.

In a thought experiment where we use `State`, the DSL program would have had to be rewritten with `for` comprehension, as follows:

```scala
for
  _ <- activateStage()
  _ <- Throttle := 1
  _ <- Pitch := 25
yield ()
```

The usage of `for` necessarily follows the fundamental behind all the monads: their reliance on `flatMap` to express sequentiality. The new Scala 3 Context Function feature allows to eliminate this boilerplate (both textual and mental) when expressing the same idea.

# Summary
When designing DSLs, there is often a need to express a sequence of operations. It is best expressed using a sequence of statements of the host language. Sometimes we, however, do not want to execute those statements immediately but to collect them for further processing. To achieve this, we can represent them as ASTs. We, however, want to hide the mutable AST builder (e.g. a list) from the DSL since it's a technical detail and is not a part of the business logic.

This is where the notion of a context function comes handy, defined using `A ?=> B` syntax. While defining it, one can omit its parameters and specify only its body. All of the function parameters are contextual parameters and are accessible from the body.

So, one can define a `type Program = ListBuilder[Instruction] ?=> Unit` type and use it to represent all the DSL's statements and programs. A Scala `def` typed as `Program` represents a set of DSL instructions and is callable as a DSL instruction itself.

If you're interested in exploring this architecture more, you are welcome to read the codebase of the [Simple Rockets 2 compiler](https://github.com/anatoliykmetyuk/simple-rockets-compiler).

[^1]: For the documentation of `summon`, see [https://docs.scala-lang.org/scala3/reference/contextual/using-clauses.html#summoning-instances](https://docs.scala-lang.org/scala3/reference/contextual/using-clauses.html#summoning-instances)