---
title: Vacation Planner
section: scala-intro
---
```toc
```

One of the big tasks the computer is used for is to solve math. Let's see how we can use Scala as a glorified calculator. In Scala, you can print a simple mathematical expression `2 + 2` to the console as follows:

```scala
println(2 + 2)
```

![](/scala-intro_assets/03-vacation-planner/CleanShot%202022-08-10%20at%2000.10.52@2x.png)

`println` prints to the console whatever _data_ is between the round brackets that follow it. `2 + 2` is not exactly _data_ though: the number `2` is indeed data, but the symbol `+` is a _logic_: it represents an act of adding two numbers together.

`println` expects data, not logic (think about it: how can you print a piece of logic to the screen – does it even make sense?). However, `println` receives data mixed with logic. When a programmer supplies a mix of data and logic in a place where the program expects only data, this provided mix is called an _expression_. In such situations, Scala first _evaluates_ the expression – executes whatever logic is in the mix so that the mix becomes data.

For example, in the case of the expression `2 + 2`, Scala will first execute the `+` operation, reducing the entire expression to the number `4`.

> Question: how can we change the above code so that the program outputs the text `2 + 2` instead of `4`?

## Vacation Planner
You are living in Helsinki, Finland. It is summer, and you are planning your vacation. You're going to Barcelona, Spain, and your budget is 500$. You need a way to determine how long you can stay there given the following costs:
- Flights: 200$
- Meals: 30$ per day
- Hotel: 80$ per day

Let's check if you can go for a 4-day vacation:

```scala
println(200 + 4 * (30 + 80))
```

The output is `640`, meaning we are 140$ over the budget.

> Task: use this program to determine the maximal number of days for the vacation given the 500$ budget. Play with the number of days until the output becomes less than 500.

## Variables
There's a problem with our expression: it's easy to lose track of what the numbers represent. If you revisit your program in a couple of days, you may not remember which of the two numbers, `30` and `80` stands for the meals and which – is for the hotel. The problem will only worsen if we add more expenses to our program.

The solution to this problem is _variables_. A _variable_ is a named data. For example, if we _declare_ a variable named `hotelDailyCost` with a _value_ `30`, we can use it in the cost calculation as follows: `200 + 4 * (hotelDailyCost + 80))`.

Here is how to declare a variable in Scala:

```scala
val hotelDailyCost = 30
```

`val` is a _keyword_: a special word of the Scala language telling that what follows is a variable declaration. In the Scala world, all the variables start from a lower-case letter and follow a so-called "[camel case](https://en.wikipedia.org/wiki/Camel_case)" naming scheme where every new word in the name is capitalized.

Let's rewrite our entire program using variables for clarity:
```scala
val flightHelsinkiBarcelona = 200
val hotelCostDaily = 80
val costOfLifeDaily = 30
val desiredStayDuration = 4
val total = flightHelsinkiBarcelona + desiredStayDuration * (hotelCostDaily + costOfLifeDaily)
println(total)
```

Currently, the program's output is just a number. It would be nicer, however, if the program would output the number with the currency code instead: e.g., `640 USD` instead of `640`.

## Using a variable in a text
The `640 USD` is a text composed of two pieces: the number `640` and a text ` USD`. How do we combine a number and a text? The answer in Scala:

```scala
println(s"$total USD")
```

So, to use a variable in a text:
- Write `s` before your text's opening quote `"`.
- Inside that text, write `$` right before the variable you want to use. No spaces are allowed between the `$` and the variable name!

This feature is called _String Interpolation_. _String_ means "text" in the Scala lingo – from now on, we will prefer the word "String" to the word "text". "Interpolation" is a smart-sounding term that Google defines as "a remark interjected in a conversation".

> Task: make the program output the cost in the following format: "Total cost: 640 USD".

## Homework
- Change the vacation cost calculator to model a consecutive stay in two different cities: Barcelona and Rome. Your itinerary looks as follows: Helsinki -\> Barcelona -\> Rome -\> Helsinki. You must account for the flights from Helsinki to Barcelona, Barcelona to Rome, and Rome to Helsinki. You will also need to account for the different costs of life and accommodation in the two cities and the different durations of stay in both cities.
- [Body Mass Index](https://en.wikipedia.org/wiki/Body_mass_index) is a metric used in medicine to determine a healthy weight for a person. It is calculated as `BMI = kg/(m*m)` where `kg` is a person's weight in kilograms and `m` is their height in meters. Your task is to write a BMI calculator where the user inputs their height and mass in two variables.
- **HARD**: Make the vacation calculator program output the cost in the following format: "Total cost: 640$" – that is, use `$` instead of `USD`.

## Concepts Recap
- **Expression** – a mix of data and logic (such as `2 + 2`) provided by a programmer in a place where the program expects only data.
- **Expression Evaluation** – execution of expression to reduce it to pure data.
- **Variable** – data that has a name. Defined using the following syntax: `val flightCost = 400`.
- **Keyword** – a "magic" word defined by the programming language. For example, `val` is a keyword that starts a variable definition in Scala.
- **String** – a text data type.
- **String Interpolation** – a technique for using variables inside a String.

