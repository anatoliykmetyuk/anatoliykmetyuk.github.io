---
title: "Flights Search Engine: Data"
section: scala-intro
---
```toc
```

Let's build a flight search engine to better plan our vacation! A flight search engine is a service where you can search for airplane tickets from one city to another. In this chapter, we will learn how to represent the data the program will be working with in Scala, while in the next chapters we will learn what logic you can do over this data.

A key piece of a flight search engine is a database of all the flights that it knows about. For example, here is a database of three flights:

```
Departure, Destination, Price
--------------------------
Geneva, Vienna, 200
Vienna, London, 150
London, Geneva, 300
```

A database is a _collection_ of flights (see "Data and Logic" for a refresher on collections). And a flight, in turn, consists of the departure city, the destination city, and the price.

So, we need to figure out how to represent individual flights first in Scala. Then, we need to put them all in a collection to model the database.

## Tuples
An individual flight consists of three pieces of data: departure city, destination city, and price. The cities can be represented as `String`s while the price can be an `Int`.

When a data type consists of several other data types, we call such a data type a _tuple_. You can write such a compound data as follows:

```scala
val flightFromGenevaToVienna = ("Geneva", "Vienna", 200)
```

You can get the constituents of a tuple by the order in which they occur in a tuple as follows:

```scala
val departureCity = flightFromGenevaToVienna._1
val destinationCity = flightFromGenevaToVienna._2
val price = flightFromGenevaToVienna._3

println(s"Flying from $departureCity to $destinationCity at the cost of $price USD.")
```

A dot `.` means _ownership_: for example, if we write `foo.bar`, we mean, "get me `bar` that is a structural part of `foo`". In our case, the departure, destination, and price are all parts of the tuple. Hence we access them using the dot `.` syntax, and we say that they are _owned_ by the tuple.

> 🎯 **Exercise**: Imagine you're working on an application where you track all your expenses. You need to represent an expense that consists of a name and a cost – for example, a 5$ meal at McDonald's. How would you represent it in Scala?

## Lists
A _list_ is one of the most popular types of collections in Scala. Here's a list of three numbers, `1`, `2`, and `3`:

```scala
val numbers = List(1, 2, 3)
```

We make a list the same way as a tuple, except that we write `List` before the braces.
> ❓**Question**: how would you represent a database of flights from the beginning of the chapter in Scala as a list of tuples?
So, when do we use lists and when – tuples? Conceptually, a tuple always represents one thing. For example, a flight is composed of three things as we've seen above – but we think of it as a single thing. In contrast, we think of a database of flights as a collection of individual flights.

Here's how we can represent a database of flights in Scala:
```scala
val flightsDatabase = List(
  ("Geneva", "Vienna", 200),
  ("Vienna", "London", 150),
  ("London", "Geneva", 300)
)
```

In the next chapter, we will learn how to look up flights in the flight database.

## Concepts
- **Tuple** – a type of data that consists of several pieces of other data.
- **Ownership** – written as a dot `.` in Scala, it means a data is a part of another data. For example, a price is a part of a flight. In our example, we write it as `flight._3`, but in the future, we'll learn how to give it an actual name and write it as `flight.price`.
- **List** – the most common type of collection in Scala. Represents an arbitrary number of pieces of data. All the pieces of data in a list must be of the same type.

## Homework
1. What's the difference between tuples and lists?
2. When should we use tuples and when – lists?
3. Pick your favorite social network or messenger. What are the main types of data it is working with (i.e. its domain model)?
4. Build a database of expenses for a personal budgeting app in Scala. Below, there is a list of expenses, and your task is to put it in a Scala variable:
```
Expense name, Amount ($)
------------------------
Metro, 4
Pizza, 10
Groceries, 20
Coffee Break at work, 3
New iPhone, 600
```
