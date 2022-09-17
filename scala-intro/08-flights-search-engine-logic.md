---
title: "Flights Search Engine: Logic"
section: scala-intro
---
```toc
```

## Flights from Geneva: `filter`
Let's see how we can look up flights in our flight database. Let's define the flights database as follows:

```scala
case class Flight(departure: String, destination: String, price: Int)

val flightsDatabase = List(
  Flight("Geneva", "Vienna", 200),
  Flight("Vienna", "London", 150),
  Flight("London", "Geneva", 300),
  Flight("Geneva", "Zurich", 100),
  Flight("Vienna", "London", 300),
  Flight("Vienna", "Helsinki", 200)
)
```

Let's say we want to find all the flights originating from Geneva. We can do so as follows:

```scala
println(flightsDatabase.filter(f => f.departure == "Geneva"))
```

Outputs:

```
List(Flight(Geneva,Vienna,200), Flight(Geneva,Zurich,100))
```

Above, `filter` is a method written using the ownership `.` notation, meaning that it is a part of the `flightsDatabase` list. Data can own methods in Scala. Methods owned by data usually operate on that data. For example, `filter` method filters a collection it belongs to according to certain criteria called a _predicate_. A call to the `filter` method results in a filtered version of that collection.

The above call to `filter` results in a new list with all the flights originating in Geneva. The argument to the `filter` method is a predicate for filtering. For each element of the list, the predicate tells whether to take that element or not.

In our example, the predicate is `f => f.departure == "Geneva"`. It is understood as follows: "if `f` is a flight from our list, allow that flight in the resulting collection if its departure city equals `"Geneva"`. The `==` means equality in Scala, so `a == b` means, "check if `a` equals `b`" in the context of such predicates.

When working with collections, we will be working with this `=>` notation very frequently. The entire construct built with the `=>` notation is called a _function_, and it specifies what we want Scala to do with every element of the list. To the right of the arrow `=>`, we specify what to do with every element of the list, and to the left of the arrow, we write the name by which we are going to refer to those elements on the right-hand side. So:

![](/scala-intro_assets/08-flights-search-engine-logic/CleanShot%202022-08-18%20at%2022.09.25@2x.png)

> 💡 **Food for thought**: is function a data or logic?
> 
> 🎯 **Exercise**: find all the flights arriving to London.

## Functional Programming
Those observant from you might have noticed a problem with the `filter` method above. The problem is that, so far, we've only seen methods that take data as its parameters. But `filter` is different: it takes a function, which doesn't feel like a data. If anything, it feels closer to being a method – it also has a parameter, it also has a result, and it runs some logic to compute that result.

In fact, functions can be treated both as data and logic: on one hand, you can store them in variables and pass them to methods as parameters, but on the other hand, they define some logic for the computer to execute.

The concept of a function is not something you will find in any programming language – although there is currently a trend where more and more languages adopt them. The style of programming which has functions and treats them as data and logic at the same time is called _functional programming_.

## Flight Schedule: `foreach`
Now suppose you need to print all the flights in the database nicely to be seen by the visitors of your website. Let's try with `println`:

```scala
println(flightsDatabase)
```

The output is:

```
List(Flight(Geneva,Vienna,200), Flight(Vienna,London,150), Flight(London,Geneva,300), Flight(Geneva,Zurich,100), Flight(Vienna,London,300), Flight(Vienna,Helsinki,200))
```

Not entirely nice, you wouldn't put it on your search engine's website. We'd like each flight on a separate line and nicely formatted. There's another method defined on the list that we can use called `foreach`. This method does something with each element of the list one after another. Like `filter`, it takes a function as an argument. Unlike `filter`, the part that follows the arrow `=>` of that function is not meant for filtering criteria, but rather for a logic we want Scala to do on each element of the list. In our case, we want to print every element. So we can write the code as follows:

```scala
flightsDatabase.foreach(f => println(f))
```

The code above produces the following output:

```
Flight(Geneva,Vienna,200)
Flight(Vienna,London,150)
Flight(London,Geneva,300)
Flight(Geneva,Zurich,100)
Flight(Vienna,London,300)
Flight(Vienna,Helsinki,200)
```

That's better – every flight is on a separate line. But not good enough: we don't want those parentheses (which is the default way of printing a tuple). We'd like a custom `String` into which we interpolate the individual parts of the tuple. We do it as follows:

```scala
flightsDatabase.foreach(f => println(s"Departure: ${f.departure}; Destination: ${f.destination}; Price: ${f.price}"))
```

Output:

```
Departure: Geneva; Destination: Vienna; Price: 200
Departure: Vienna; Destination: London; Price: 150
Departure: London; Destination: Geneva; Price: 300
Departure: Geneva; Destination: Zurich; Price: 100
Departure: Vienna; Destination: London; Price: 300
Departure: Vienna; Destination: Helsinki; Price: 200
```

There's a catch though: we interpolate the parts of the tuple into a string using the `${f.departure}` syntax, and not `$f.departure` as you would expect. Whenever we interpolate something that's accessed using an ownership syntax `.`, we need to enclose that something in between curly braces as in the code above.

> ✨ **Fun fact**: between those curly braces, you can write any valid Scala expression at all! Try the following: `println(s"2 + 2 is ${2 + 2}")`.

## Where can we go from Geneva: `map`
Let's imagine we want to compose a list of all cities we can visit from Geneva. The first step is to find all the flights departing Geneva – we can do it as before:

```scala
println(flightsDatabase.filter(f => f.departure == "Geneva"))
```

Next, we want to take this list of flights and turn it into a list of cities:

![](/scala-intro_assets/08-flights-search-engine-logic/CleanShot%202022-08-19%20at%2016.54.46@2x.png)

When we make a list from another list in Scala so, that every element of the new list is a transformed version of one element of a previous list, we call this operation a _map_ in Scala. For example: `List(1, 2, 3).map(n => n - 1)` results in a `List(0, 1, 2)`.

Here's an intuition: Google Maps has a map of your city. There's a one-to-one correspondence between every street of your city and its representation on the map. Same with collections: when mapping one collection into another, there's a one-to-one correspondence between the elements of the two collections. In our example, there's a one-to-one correspondence between the flights and destinations.

We can perform the map operation right after the filter operation as follows:

```scala
println(flightsDatabase.filter(f => f.departure == "Geneva").map(f => f.destination))
```

Outputs:

```
List(Vienna, Zurich)
```

Note how we write the `map` method call after the `filter` call using the dot `.` notation. Here's the way to think about it:

- Both `filter` and `map` are members of the list data type.
- Call to `filter` results in another list.
- Therefore, we can call `map` on that list.

The argument to `map` is a function the right-hand side of which tells how the elements of the original list should be transformed to form the new list.

> 🎯**Exercise**: given a `val numbers = List(1, 2, 3, 4)`, use the `map` function to make a new list where each number is squared. Hint: you can multiply two numbers in Scala using the `*` operator: e.g. `2 * 2`.

## Connecting flights from Geneva `flatMap`
In real life, flights often have connections. That is, to fly from city A to city B, you first fly from A to some city C and from that city – to city B. In the previous section, we've seen where we can go from Geneva – but that was only via direct flights. Now let's see where we can go from Geneva using connecting flights.

To do this, we first need to find all flights departing Geneva, then for each of those flights – find the list of all flights that are possible from the respective destination cities.

We want the two connecting flights in a tuple consisting of the first leg of the flight and the second leg of the flight, as follows:

```
(Flight(Geneva,Vienna,200), Flight(Vienna,London,150))
```

Here's the first attempt to do so:

```scala
val genevaConnectingFlights = flightsDatabase
  .filter(f => f.departure == "Geneva")
  .map { firstLeg =>
    val possibleSecondLegs = flightsDatabase.filter(f => f.departure == firstLeg.destination)
    (firstLeg, possibleSecondLegs)
  }
genevaConnectingFlights.foreach(f => println(f))
```

Output:

```
(Flight(Geneva,Vienna,200),List(Flight(Vienna,London,150), Flight(Vienna,London,300), Flight(Vienna,Helsinki,200)))
(Flight(Geneva,Zurich,100),List())
```

First of all, there's a lot going on in the code that we've never seen before:

- We store the computation of our result in a separate variable.
- Since the result is a list, we're using `foreach` to print every element of that list on a new line.
- `filter` and `map` are called from the new line with an indentation. This notation does exactly the same as before (e.g. `flightsDatabase.filter(...).map(...)` all in one line) - we are using it for readability.
- The function argument to the `map` call is no longer wrapped in round braces `( )` but in curly braces `{ }`. If an argument is a function and it is wrapped in round braces `( )`, its right-hand side must fit in one line. In our case, this is not the case. In such situations, we must use curly braces `{ }`.
- The function passed to `map` results in a tuple. This is because we want to find connecting flights, and connecting flights consist of two flights. Whenever we have data that consists of one or more pieces of data, we use tuples.

There are problems with this program though. The output is unreadable. Let's break it down a bit to see what's going on:

![](/scala-intro_assets/08-flights-search-engine-logic/CleanShot%202022-09-17%20at%2010.35.28@2x.png)

We wanted a list of connecting flights in tuples of two elements: the first leg and the onward leg. However, we got a result in the form of a tuple of the first leg and a list of onward legs.

Why? Remember the list of all connecting flights was composed using the `map` function. And the last statement of the `map` function is a tuple of the first leg and the list of onward legs. Let's try to remedy it:

```scala
val genevaConnectingFlights = flightsDatabase
  .filter(f => f.departure == "Geneva")
  .map { firstLeg =>
    val possibleSecondLegs = flightsDatabase.filter(f => f.departure == firstLeg.destination)
    possibleSecondLegs.map(secondLeg => (firstLeg, secondLeg))
  }
genevaConnectingFlights.foreach(f => println(f))
```

Output:

```
List((Flight(Geneva,Vienna,200),Flight(Vienna,London,150)), (Flight(Geneva,Vienna,200),Flight(Vienna,London,300)), (Flight(Geneva,Vienna,200),Flight(Vienna,Helsinki,200)))
List()
```

Still not good enough: we got a list of lists, but we want a flat list.

> ❓**Question**: why did we get a nested list?

We got a list of lists because we are mapping all flights to Geneva to all possible onward flights from the respective destination cities, and there are more such onward flights per city. For example, one flight from Geneva to Vienna can be continued in a number of ways: Vienna -\> London, Vienna -\> Helsinki.

In such situations where we map a list so that every element of that list corresponds to more than one element in the resulting list, we need to use `flatMap` instead of `map`. For example: `List(1, 2, 3).flatMap(n => List(n, n + 1))` results in `List(1, 2, 2, 3, 3, 4)`. We can use it as follows in our example:

```scala

val genevaConnectingFlights = flightsDatabase
  .filter(f => f.departure == "Geneva")
  .flatMap { firstLeg =>
    val possibleSecondLegs = flightsDatabase.filter(f => f.departure == firstLeg.destination)
    possibleSecondLegs.map(secondLeg => (firstLeg, secondLeg))
  }
genevaConnectingFlights.foreach(f => println(f))
```

Output:

```
(Flight(Geneva,Vienna,200),Flight(Vienna,London,150))
(Flight(Geneva,Vienna,200),Flight(Vienna,London,300))
(Flight(Geneva,Vienna,200),Flight(Vienna,Helsinki,200))
```

> 🎯**Exercise**: change `foreach` to print every pair of connecting flights nicely, so that the end user of your search engine doesn't see the parentheses or the `List`.

## Cheapest first `sortBy`
Finally, let's say we're interested in finding out what are the cheapest flights in our database. We'd like to sort the database by price. We can do it using the `sortBy` method on a list:

```scala
flightsDatabase.sortBy(f => f.price).foreach(f => println(f))
```

Outputs:

```
Flight(Geneva,Zurich,100)
Flight(Vienna,London,150)
Flight(Geneva,Vienna,200)
Flight(Vienna,Helsinki,200)
Flight(London,Geneva,300)
Flight(Vienna,London,300)
```

And if we want to reverse the order, we can call the `reverse` method on the resulting list:

```scala
flightsDatabase.sortBy(f => f.price).reverse.foreach(f => println(f))
```

Note how `reverse` doesn't take any arguments, so we don't write the parentheses after it.

If you want to find the single cheapest flight, you can use the `head` method on the sorted list. This will give you the first element of the list:

```scala
println(flightsDatabase.sortBy(f => f.price).head)
```

## Summary
In this chapter, we've learned a few useful things we can do with lists. We've learned how to look up data in lists, and how to transform one list into another by specifying how to transform each individual element of that list. We've also learned how to transform lists by specifying a transformation that gives us more than one element from the entries of the original list.

Our code has an important problem as it is right now though: it's really hard to read and understand. So, in the next chapter we'll build on what we've learned and see how to do the same thing in a more idiomatic and readable way.

## Concepts
- **Function** – a type of an argument that some methods defined on collections take. Written as `a => logic` , where `a` is the name that you intend to use in `logic` to refer to every element of that collection. And `logic` is the logic to be done on that element. This logic can _result_ in data, the same way as methods result in data. The particular result that a function must produce depends on the method it is used as an argument for. Functions can be seen as being a data and a logic at the same time.
- **Functional Programming** – a style of programming where you can use functions.
- **Predicate** – a function that checks a certain condition on each element of a collection.
- **`filter`** – a method defined on lists and called using the ownership `.` syntax on them. It takes a predicate as an argument and results in a new collection containing only the elements that pass the predicate (that is, for which the condition that the predicate checks is true). E.g. `List(1, 2, 3).filter(n => n < 3)` will result in a `List(1, 2)`.
- **`foreach`** – a method defined on lists and used to do some logic on every element of that list. `List(1, 2, 3).foreach(n => println(n))` will output each number from that list on a new line.
- **`map`** – a method defined on lists that takes a function that transforms every element of that list. It results in a new list where every element is transformed by that function. E.g. `List(1, 2, 3).map(n => n - 1)` will result in `List(0, 1, 2)`.
- **`flatMap`** – a method defined on lists that behaves just like `map` except that its argument function transforms every element of that list to possibly several elements of a new list. So, the argument to `flatMap` is a function that maps every element of the original list to a list of items of the resulting list. For example: `List(1, 2, 3).flatMap(n => List(n, n + 1))` results in `List(1, 2, 2, 3, 3, 4)`.
- **`sortBy`** – a method defined on lists that results in a new list sorted according to a function passed to `sortBy`. That function must result in a number, and the elements in the list are sorted depending on how big a number the function produced for them from lowest to highest. For example: `List(3, 2, 1).sortBy(n => n)` results in `List(1, 2, 3)`.
- **`reverse`** – a method defined on lists that results in them being reversed. `List(1, 2, 3).reverse` results in `List(3, 2, 1)`.
- **`head`** – a method on a list that results in the first element of that list. E.g. `List(1, 2, 3).head` results in `1`.

## Homework
In the appendix to this chapter, at the very end, you will find a larger database of flights. Use it to do the following exercises:
1. Find all flights departing from London
2. Find all flights arriving in Paris
3. Find all flights departing London cheaper than `500$`. Hint: you can compare two numbers using the `<`, `>`, `<=` and `>=` inequality operators. For example, `a < b` means, "check if `a` is less than `b`".
4. **HARD**: A roundtrip from city A to city B is a pair of flights: one from A to B and another – back from B to A. Imagine you're in Geneva and you are looking for the cheapest city to go to for a vacation. Find the cheapest roundtrip departing from Geneva. Answer: The roundtrip you should get is priced at `920`.
5. **VERY HARD**: Find the cheapest roundtrip originating from Geneva in 4 legs. That is, two legs to get from Geneva to a destination, and two legs from that destination back to Geneva. Hint: you may need an inequality operator `!=`: `a != b` means "check if `a` does not equal `b`". Useful for `filter` predicates. Answer: the roundtrip you should get is priced at `901`.

### Appendix: Flight Database for the Homework
```scala
case class Flight(departure: String, destination: String, price: Int)

val flightsDatabase = List(
  Flight("London", "Helsinki", 395),
  Flight("Geneva", "Helsinki", 629),
  Flight("Rome", "London", 248),
  Flight("Zurich", "Paris", 630),
  Flight("Budapest", "Zurich", 776),
  Flight("London", "Vienna", 363),
  Flight("Vienna", "Zurich", 956),
  Flight("Budapest", "Helsinki", 444),
  Flight("Paris", "London", 715),
  Flight("Rome", "Geneva", 669),
  Flight("Rome", "Helsinki", 371),
  Flight("Budapest", "Geneva", 924),
  Flight("Geneva", "London", 320),
  Flight("Zurich", "Budapest", 184),
  Flight("London", "Paris", 845),
  Flight("Vienna", "Paris", 770),
  Flight("Paris", "Rome", 166),
  Flight("Helsinki", "Vienna", 745),
  Flight("Budapest", "London", 652),
  Flight("Helsinki", "Rome", 297),
  Flight("Vienna", "London", 248),
  Flight("Helsinki", "Zurich", 967),
  Flight("Vienna", "Budapest", 826),
  Flight("Geneva", "Vienna", 304),
  Flight("Vienna", "Helsinki", 983),
  Flight("London", "Geneva", 600),
  Flight("Rome", "Budapest", 945),
  Flight("Helsinki", "Budapest", 745),
  Flight("Vienna", "Rome", 678),
  Flight("Paris", "Vienna", 859),
  Flight("Geneva", "Paris", 692),
  Flight("Zurich", "Vienna", 469),
  Flight("Helsinki", "Geneva", 318),
  Flight("Zurich", "Helsinki", 351),
  Flight("Budapest", "Rome", 875),
  Flight("Budapest", "Paris", 950),
  Flight("Rome", "Paris", 158),
  Flight("Zurich", "Geneva", 247),
  Flight("Geneva", "Rome", 332),
  Flight("Helsinki", "Paris", 958),
  Flight("Rome", "Vienna", 999),
  Flight("Helsinki", "London", 357),
  Flight("London", "Budapest", 674),
  Flight("Zurich", "Rome", 186),
  Flight("Rome", "Zurich", 109),
  Flight("Paris", "Budapest", 531),
  Flight("Geneva", "Budapest", 158),
  Flight("Vienna", "Geneva", 686),
  Flight("London", "Zurich", 554),
  Flight("Paris", "Zurich", 164),
  Flight("Paris", "Geneva", 922),
  Flight("Zurich", "London", 931),
  Flight("Budapest", "Vienna", 883),
  Flight("Paris", "Helsinki", 780),
  Flight("Geneva", "Zurich", 857),
  Flight("London", "Rome", 596),
)
```
