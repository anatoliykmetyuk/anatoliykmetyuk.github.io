---
title: More Cities
section: scala-intro
---
```toc
```

What if we want to calculate not a single vacation but two or three? Say, after Barcelona, we go to Rome. We'd like to know how much each vacation costs separately and then calculate the total of all vacations.

> Exercise: try to solve this problem yourself before reading on to the solution.

One way to do it would be to add more variables to cover all vacations. Note that, once defined, the value of a variable cannot be changed. This means that if we defined `val hotelCostDaily = 80`, then `hotelCostDaily` will remain `80` across the entire program and cannot be changed. So, we'll have to get creative with the names of the variables to ensure all of them are unique:

```scala
val flightHelsinkiBarcelona = 200
val hotelCostDailyBarcelona = 80
val costOfLifeDailyBarcelona = 30
val desiredStayDurationBarcelona = 4
val totalBarcelona = flightHelsinkiBarcelona + desiredStayDurationBarcelona * (hotelCostDailyBarcelona + costOfLifeDailyBarcelona)
println(s"Total for Barcelona: $totalBarcelona USD")

val flightBarcelonaRome = 400
val hotelCostDailyRome = 100
val costOfLifeDailyRome = 40
val desiredStayDurationRome = 4
val totalRome = flightBarcelonaRome + desiredStayDurationRome * (hotelCostDailyRome + costOfLifeDailyRome)
println(s"Total for Rome: $totalRome USD")

val overallTotal = totalBarcelona + totalRome
println(s"Total overall: $overallTotal USD")
```

The output:

```
Total for Barcelona: 640 USD
Total for Rome: 960 USD
Total overall: 1600 USD
```

> Task: plan the third vacation: this time, you're flying from Rome to Tallinn – make up the costs for the flights, meals, and accommodations.

There is a problem with this approach: it doesn't scale. For every new city, we need to copy-paste the existing code, change the variable names to indicate which city they belong to, and change the text `println` outputs to mention which city the cost is calculated for.

## Methods
_Method_ is a logic that has a name – similarly to how variables are data that has a name. So, if you have some code you find yourself copy-pasting, you can give it a name and _call_ it by that name.

Here is an example of a method:

```scala
def sayHelloThreeTimes =
  println("Hello once")
  println("Hello second time")
  println("Hello third time")
```

A method is _declared_ the same way as a variable – except that you need to use the `def` keyword in place of `val`. The logic that is being named is called a method's _body_. It is specified from the new line and with an indentation of two spaces. Notice how all `println` calls start two spaces to the right compared to the keyword `def` – this indentation is important!

Here is the result of running this program in Scastie:

![](assets/CleanShot%202022-08-11%20at%2000.24.42@2x.png)

That's right – nothing happened! The method's body is not executed unless we _call_ the method. You can do so as follows:

```scala
def sayHelloThreeTimes =
  println("Hello once")
  println("Hello second time")
  println("Hello third time")
sayHelloThreeTimes
```

Notice how `sayHelloThreeTimes` is more to the left than `println` calls – the method's indentation disappears. That's where the method's body ends. So, the `sayHelloThreeTimes` call is not a part of the method's body. The call, therefore, will be executed. The output of the above program is:

```
Hello once
Hello second time
Hello third time
```

And if you want to print the greeting six times, you can call the method twice:

```scala
def sayHelloThreeTimes =
  println("Hello once")
  println("Hello second time")
  println("Hello third time")

sayHelloThreeTimes
sayHelloThreeTimes
```

Notice how we can place an empty line between the method's last statement and the first method call. This empty line is not mandatory but is a good practice to have for readability – it visually separates the method from the rest of the program. The output of the above program is:

![](assets/CleanShot%202022-08-11%20at%2000.53.49@2x.png)

> Exercise: try to avoid copy-pasting code in the vacation calculator example with the help of methods. You will fail at this task: to succeed, you need one more concept we haven't covered yet. Write down somewhere why exactly you failed and what you might need to succeed. The solution is provided in the next section, so do not read any further before doing this exercise!

## Vacation Calculator, the Method Way
If you've tried the exercise from the previous section, you must have encountered a problem. Let's try doing it step-by-step, starting from putting into a method the code that we copy-paste frequently:

```scala
def calculateVacationCost =
  val flightHelsinkiBarcelona = 200
  val hotelCostDailyBarcelona = 80
  val costOfLifeDailyBarcelona = 30
  val desiredStayDurationBarcelona = 4
  val totalBarcelona = flightHelsinkiBarcelona + desiredStayDurationBarcelona * (hotelCostDailyBarcelona + costOfLifeDailyBarcelona)
  println(s"Total for Barcelona: $totalBarcelona USD")
```

However, we do not only copy-paste the code when planning a new city – we also change the names of the variables and their values! Why did we change the names of the variables? Because we can't create a new variable with the same name. Good news: if a variable is defined inside a method, it is invisible from outside that method. So we don't have to worry about changing the variable names for each new city:

```scala
def calculateVacationCost =
  val flight = 200
  val hotelCostDaily = 80
  val costOfLifeDaily = 30
  val desiredStayDuration = 4
  val total = flight + desiredStayDuration * (hotelCostDaily + costOfLifeDaily)
  println(s"Total for Barcelona: $total USD")
```

What about the values of the variables – the flight, hotel and life costs, and the stay duration? They are different for each city. We can solve this using the concept of a method parameter.

A _method parameter_ is a variable that is not the same for otherwise identical copy-pastes of code for which the method was defined. Such a variable is written in parentheses after the method's name. Let's write the `flight` variable as a parameter:

```scala
def calculateVacationCost(flight: Int) =
  val hotelCostDaily = 80
  val costOfLifeDaily = 30
  val desiredStayDuration = 4
  val total = flight + desiredStayDuration * (hotelCostDaily + costOfLifeDaily)
  println(s"Total for Barcelona: $total USD")
```

Note the `: Int` after the parameter's name. Parameters must have their _data type_ written after their name. A _data type_ is a type of the data contained in the variable – e.g., a number, a text, a picture, a file, etc. `Int` stands for "integer" and represents a whole number (cannot represent a fractional number).

Methods can be _parameterized_ by more than one parameter, in which case they are separated by a comma:

```scala
def calculateVacationCost(flight: Int, hotelCostDaily: Int, costOfLifeDaily: Int, desiredStayDuration: Int) =
  val total = flight + desiredStayDuration * (hotelCostDaily + costOfLifeDaily)
  println(s"Total for the vacation: $total USD")
```

When calling a parameterized method, we must provide all its parameters in parentheses following the call. Let's rewrite the original code for Barcelona and Rome using the method we've just defined:

```scala
def calculateVacationCost(flight: Int, hotelCostDaily: Int, costOfLifeDaily: Int, desiredStayDuration: Int) =
  val total = flight + desiredStayDuration * (hotelCostDaily + costOfLifeDaily)
  println(s"Total for the vacation: $total USD")

calculateVacationCost(200, 80, 30, 4)
calculateVacationCost(400, 100, 40, 4)
```

Output:

```
Total for the vacation: 640 USD
Total for the vacation: 960 USD
```

> Exercise: Change the method so that the output mentions the city for which the vacation is being computed: for example, "Total for Rome: 960 USD". Hint: the data type that represents text is `String`.

## Homework
Define a method for the Body Mass Index calculation (see the homework for the previous chapter for the detailed task specification).

## Concepts Recap
- **Method** – a logic with a name that can be executed by referring to that name. Used when we find ourselves copy-pasting the same code. Syntax: `def methodName = ...`
- **Method's Body** – a logic that is executed when a method is called. Is written after the `=` sign in the method definition, from a new line and with two spaces of indentation. Variables defined in the body are invisible from outside of the body, but the variables defined outside are visible from the body.
- **Method's Parameter** – a kind of a variable defined for the method's body that is different between different calls to the method. E.g., in the vacation calculator method, the flight cost is different for different vacations, and so it must become a parameter. A parameter is specified in the method definition after the method's name inside parentheses with its data type. Multiple parameters are separated by a comma: `def vacationCost(flights: Int, dailyStay: Int) = ...`.
