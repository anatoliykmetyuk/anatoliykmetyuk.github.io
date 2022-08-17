---
title: "Working with Errors"
section: scala-intro
---
```toc
```

When working with software, things go wrong – this is a part of being a programmer, whether you are just starting or have 20 years of experience. The computer tells you that something is wrong with your program in the form of _errors_. In this chapter, we will learn how to read some errors you will likely encounter.

## Not Found Error
![](/scala-intro_assets/05-working-with-errors/CleanShot%202022-08-13%20at%2022.16.24@2x.png)

Above, there's an example of a "Not found" error. This error means that you made a typo in a variable or method name. The computer tries to look up the method or variable you refer to, can't find it in its memory, and tells you so. In Scala, method and variable names are _case-sensitie_: it means that `println` and `Println` are two different names, so the latter one is not correct.

## Found-Required Error
![](/scala-intro_assets/05-working-with-errors/CleanShot%202022-08-13%20at%2022.19.41@2x.png)

If you see the "Found: ..., Required: ..." error, it means you tried to pass data of a wrong data type to a method. Here's an analogy: say you live in the US and are visiting Europe for vacation. You go to a shop to buy some food and try to pay with US dollars. The cashier tells you, "sorry, but we don't accept dollars; we accept euros". "Found X, required Y" error in Scala means, "sorry, but this method doesn't accept X, it accepts Y".

Above, there is an example of this error. There is a method that computes a square of a number, and we are calling it with a String, so the computer complains. Here is a visual breakdown of what the error tells you about the problem:
![](/scala-intro_assets/05-working-with-errors/CleanShot%202022-08-13%20at%2022.24.58@2x.png)
## Too many or not enough parameters
The Found-Required error can also happen when you supply too many parameters to a method:
![](/scala-intro_assets/05-working-with-errors/CleanShot%202022-08-13%20at%2022.29.27@2x.png)
So: "you gave me two pieces of data, each of type `Int`, but I only work with one piece of data of type `Int`".

![](/scala-intro_assets/05-working-with-errors/CleanShot%202022-08-13%20at%2022.31.25@2x.png)
If you supply fewer parameters than a method expects, you will get a "missing argument" error, as shown above.
- _Argument_ is data you write between the parentheses of a method when you are calling it.
- `x` is the name of said parameter.
- `object Playground` is a concept we will cover a bit later – ignore it for now.
- `(x: Int): Int` is a so-called _signature_ of the method you are trying to call. A _signature_ of a method is made of the types of all its parameters and its return type. A signature is written using the format you see on the screenshot: the names of the parameters and their names are written between parentheses, and the result type is written after the colon `:`.

Here is a visual breakdown of the error:
![](/scala-intro_assets/05-working-with-errors/CleanShot%202022-08-13%20at%2022.36.36@2x.png)

## When you forget a closing brace
![](/scala-intro_assets/05-working-with-errors/CleanShot%202022-08-13%20at%2022.40.41@2x.png)
When you see an error similar to the one above, this usually means you wrote one brace too many or too few somewhere. Note that such errors can be particularly tricky to catch since the computer frequently reports them, not on the line where they actually happen! Above, for example, the error is on the first line since we forgot a closing brace in the method `square` definition. However, the computer reports it under the second line of the program. Sometimes, you can get such an error hundreds of lines ahead from the site where it actually happened! So, when you see such an error, you need to look before the place where it was reported to see where you missed a brace.

The `}` in the error above is the Scala's way of saying, "the program ended". So the error can be read as "I didn't find the brace I wanted before the program ended". We will see some usages of `{` and `}`  in code in the future chapters.

And this is what a "one brace too many" error looks like:
![](/scala-intro_assets/05-working-with-errors/CleanShot%202022-08-13%20at%2022.41.32@2x.png)

If you forget a closing quote `"` when defining a String, you will get the following error:
![](/scala-intro_assets/05-working-with-errors/CleanShot%202022-08-13%20at%2022.42.05@2x.png)

### Literals
What's a _literal_? In life, we encounter many _data formats_ – ways to write data. E.g., there is a currency format such as `$45`, there is a format to write mass, `45kg`, there is a time format `20:30` or `8:30 PM`, a date format `21.01.2020`, and so on. Data formats are not the same as data types: a data format is the a to write data, but a data type is the actual meaning of data. For example, `20:30` and `8:30 PM` are two different data formats but are the same data type – time.

There is only a very limited number of data formats that Scala can understand (although you can define virtually any data type – we will see how to do it in the future chapters). Scala can understand text between quotes such as `"Hello World"` and numbers such as `20`. It cannot understand things like `20:30`, `8:30 PM` or `$45`.

The data formats Scala can understand are called _literals_.

## Wrong Indentation
As we covered before, methods in Scala have their bodies indented. If you write one space too much or too little before one of the body's lines, you may get all sorts of weird errors:

![](/scala-intro_assets/05-working-with-errors/CleanShot%202022-08-14%20at%2010.06.21@2x.png)

Above, the "Not Found" error happens because we wrote one space too little before `x * x`. Scala thus thinks it's outside the method's body. `x`, like any method parameter, is visible only inside the method's body, so the "Not Found" error happens.

## Concepts Recap
- **Case-sensitivity** – in method and variable names, lower or upper case of letters matter. That is, `println` is not the same thing as `Println`, and `prIntln` is yet a different thing.
- **Argument** – when calling a method, it is data supplied to the method for its parameters.
- **Signature** – the types of all the method parameters and their result type.
- **Data format** – a way to write data, e.g., `20:30` or `8:30 PM` for time. Not to be confused with a data type: in the example, `20:30` and `8:30 PM` represent the same data of the same data type yet written using different data formats.
- **Literal** – data formats built into the programming language that you can write in the code. For example, the quote notation for Strings, `"Hello World"`, is a format to write text supported by Scala. In contrast, `20:30` is not a valid way to write time in Scala.
### Error Types
- **Not Found Error** – typo in a method or variable name.
- **Found-Required Error** – you've called a method with a wrong data type for its parameter. This error can also happen if you call a method with too many arguments.
- **Missing Argument Error** – you've called a method with not enough arguments.
- **"`)` expected but `}` found" Error** – you forgot a closing brace `)` somewhere before the place the error was reported, e.g. `def square(x: Int = x * x`.
- **Unclosed String Literal Error** – you forgot to close a String literal, e.g. `"foo`.

> 📚 **Recap**: In this chapter, we've seen a number of errors you will likely encounter on your programming journey.

## Homework
1. What's the difference between a data type and a data format?
2. Give some examples of literals in Scala.

### Bug-fixing Challenges
_Bug_ is when a programmer intended its program to do one thing, but it does another thing. Below, you will find a few challenges where you have to find and fix a bug in a program. Here are some rules and considerations for doing so:
- Scala will point you to some (but not all) of the bugs by emitting an error.
- You are allowed to run the program to see which errors Scala will show you. But for the bonus points, try to find a bug without ever running a program.
- You must run the program after you fix it, to verify if what you did was correct.

1. Easy
```scala
def calculateVacationCost(flight: Int, hotelCostDaily: Int, costOfLifeDaily: Int, desiredStayDuration: Int) =
  val total = flight + desiredStayDuration * (hotelCostDaily + costOfLifeDaily)
  println(s"Total for the vacation: $total USD")

calculateVacationCost(200, 80, 30, "4")
calculateVacationCost(400, 100, 40, 4)
```

2. Easy
```scala
def calculateVacationCost(flight: Int, hotelCostDaily: Int, costOfLifeDaily: Int, desiredStayDuration: Int) =
  val total = flight + desiredStayDuration * (hotelCostDaily + costOfLifeDaily)
  println(s"Total for the vacation: $total")

calcuIateVacationCost(200, 80, 30, 4)
calculateVacationCost(400, 100, 40, 4)
```

3. Medium
```scala
def calculateVacationCost(flight: Int hotelCostDaily: Int, costOfLifeDaily: Int, desiredStayDuration: Int) =
  val total = flight + desiredStayDuration * (hotelCostDaily + costOfLifeDaily)
  println(s"Total for the vacation: $total USD")

calculateVacationCost(200, 80, 30, 4)
calculateVacationCost(400, 100, 40, 4)
```

4. Medium
```scala
def calculateVacationCost(flight: Int, hotelCostDaily: Int, costOfLifeDaily: Int, desiredStayDuration: Int) =
  val total = flight + desiredStayDuration * (hotelCostDaily + costOfLifeDaily)
  println(s"Total for the vacation: $total$")

calculateVacationCost(200, 80, 30, 4)
calculateVacationCost(400, 100, 40, 4)
```

5. Medium, bug
```scala
def calculateVacationCost(flight: Int, hotelCostDaily: Int, costOfLifeDaily: Int, desiredStayDuration: Int) =
  val total = flight + desiredStayDuration * (hotelCostDaily + costOfLifeDaily)
  println(s"Total for the vacation: total USD")

calculateVacationCost(200, 80, 30, 4)
calculateVacationCost(400, 100, 40, 4)
```

6.  Medium, bug
```scala
def calculateVacationCost(flight: Int, hotelCostDaily: Int, costOfLifeDaily: Int, desiredStayDuration: Int) =
  val total = flight + desiredStayDuration * (hotelCostDaily + costOfLifeDaily)
  println(s"Total for the vacation: $$total")

calculateVacationCost(200, 80, 30, 4)
calculateVacationCost(400, 100, 40, 4)
```

7. **HARD**
```scala
def calculateVacationCost(flight: Int, hotelCostDaily: Int, costOfLifeDaily: Int, desiredStayDuration: Int) =
  val total = flight + desiredStayDuration * (hotelCostDaily + costOfLifeDaily)
  println(s"Total for the vacation: $total")

val totalBarcelona = calculateVacationCost(200, 80, 30, 4)
val totalRome = calculateVacationCost(400, 100, 40, 4)
val total = totalBarcelona + totalRome
println(s"Total for vacation is: $total USD")
```
