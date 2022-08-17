---
title: "Hello World"
section: scala-intro
---
```toc
```

We will be learning to program using Scala. This is a modern, in-demand language that incorporates a broad range of approaches to programming – so you get a chance to see which one works best for you. You can give this language a shot straight from your browser via the website  [https://scastie.scala-lang.org/](https://scastie.scala-lang.org/). Head there, and you will see the following interface:
![](/scala-intro_assets/02-hello-world/CleanShot%202022-08-04%20at%2023.24.24@2x.png)

The three main areas are:
- _Toolbar_ with buttons to manage your program, e.g., to run it.
- _Editor_ where you write your code.
- _Console_ where you see the result of the program execution.

**Important! Press the "Worksheet" button at the Toolbar, so that it is green – this is needed to simplify the workflow for the purposes of this tutorial.**

Now write the following in the Editor area and press the Run button at the Toolbar:
```scala
println("Hello World")
```

At the Console, you should see the output similar to the following (the lines starting with `[info]` only appear when you run the program for the first time, please ignore them):
![](/scala-intro_assets/02-hello-world/CleanShot%202022-08-04%20at%2023.30.59@2x.png)

Congratulations! You've written your first program! Now let's see what it is made of.

- `println` is an example of logic – something called _method_ in Scala. Its name stands for "print line", and it tells the computer to print a single line of text to the console.
- `"Hello World"` is an example of data – specifically, a text. A textual data in Scala can be defined by enclosing an arbitrary text in double-quotes `"`.
- `"Hello World"` is specified between a pair of round braces, `(` and `)` right after `println`. Everything between the round braces that follow a method name is considered a _parameter_ to that method. A parameter is data a method works on, and an expression `method(parameter)` is pronounced, "a _call_ of a method `method` with a parameter `parameter`".
![](/scala-intro_assets/02-hello-world/CleanShot%202022-08-04%20at%2023.51.04@2x.png)

Now, try changing `World` to your name. Press the "Run" button again and make the computer greet you.

You can make the computer output several lines of text by calling the method `println` repeatedly:

```scala
println("Hello World")
println("The sun is shining today!")
```

The output will be:
![](/scala-intro_assets/02-hello-world/CleanShot%202022-08-05%20at%2000.18.28@2x.png)

> 📚 **Recap**: We've just composed our first program in the Scala programming language that prints some text to the console. We've also seen what basic logic and data look like in a real program. In the next chapter, we will expand our vocabulary and write a bit more complex program.

## Concepts Recap
- **Code Editor** – a text editor where you write the code.
- **Console** – a text area where the computer writes the result of the code execution.
- **Method** – a kind of logic in Scala.
- **Parameter** – a data that a method works on.

## Homework
Write a program that outputs a recipe for your favorite dish.

