---
title: "Flights Search Engine: Naming the Data"
section: scala-intro
---
```toc
```

There's a problem with describing the flights with tuples. Let's look again at the following code from the previous chapter:

```scala
val departureCity = flightFromGenevaToVienna._1
val destinationCity = flightFromGenevaToVienna._2
val price = flightFromGenevaToVienna._3

println(s"Flying from $departureCity to $destinationCity at the cost of $price USD.")
```

It's easy to lose track of what those `_1`, `_2` and `_3` stand for. It would be nice if we could give those three components of the flight some more descriptive names.

It's important to note here that we want to do it not only for this particular flight – but for any flight in our program. What we need is a single new data type to model each individual flight. So that on each flight we can say, `flight.departure` instead of `flight._1`.

In Scala, if we use tuples of a specific structure repeatedly to represent some data, we can define a new data type that follows that structure. "Structure" means what that tuple is composed of:
- A certain number of other specific **data types**...
- ...that are written in a specific **order**...
- ...and have a specific **meaning** each.

For example, we frequently use a tuple to describe a flight – e.g. `("Geneva", "Vienna", 200)`. The flight follows a structure: it has three components – two `String`s and an `Int` – that are written in that specific order (that is, for example, `Int` is the last one, we never write it between the two `String`s), and have the following meanings: the departure city, the destination city, and the price.

We can tell Scala about that data type and call it e.g. `Flight`. We can also give a name to each of its components – the first one can be `departure`, the second – `destination`, and the third – `price`. To tell Scala about this data type and name its components, we write the following code:

```scala
case class Flight(departure: String, destination: String, price: Int)
```

We've just defined a _case class_ – a kind of a data type in Scala that is similar to a tuple except that each of its components has a name, and the types and number of those components are fixed. Here's a breakdown of what each piece means:

![](/scala-intro_assets/07-flights-search-engine-naming-the-data/CleanShot%202022-09-09%20at%2021.52.49@2x.png)

- `case class` is a keyword signaling to Scala that we're about to define a new data type. Why "case" and why "class"?
	- Here's how an English dictionary defines [class](https://www.collinsdictionary.com/dictionary/english/class): "A class of things is a group of them with similar characteristics.". So, by defining a new data type, we're attempting to describe a group of things with similar characteristics. In our case, we're trying to explain to Scala what a flight is by listing the characteristics that are present in all flights: they all have a departure city, a destination city, and a price.
	- `case` in the Scala's context means, "like a tuple". It turns out there are other ways to define a class in Scala that we aren't going to cover yet. `case` is the most simple and intuitive way to create a class.
- `Flight` is the name of the data type we're defining.
- After the name of the data type, we list the data types this new data type is made of. Recall how in the first chapter, "Data and Logic", we've discussed how every single data type is made out of other data types – a Facebook post is made out of its text and the user who posted it, an image is made out of pixels, and a text is made out of letters. So, to define a new data type, we need to tell Scala what it is made of.
- We list every component of the new data type in the `name: Type` format. `name` is how we are going to refer to it later, and `Type` is its data type. The name is separated from the type with the `:` symbol. In Scala, it is a common practice to use the `:` symbol to separate the name from the type.

Once we've defined the new data type `Flight`, we need to tell Scala that the flights we've written in the tuple format are in fact of that new data type. To do that, we write the name of the new data type followed by its constituents in parentheses:

```scala
val flightFromGenevaToVienna = Flight("Geneva", "Vienna", 200)
```

Now, instead of `_1`, `_2`, and `_3`, we can use the name of the components we've defined in the `Flight` data type:

```scala
val departureCity = flightFromGenevaToVienna.departure
val destinationCity = flightFromGenevaToVienna.destination
val price = flightFromGenevaToVienna.price

println(s"Flying from $departureCity to $destinationCity at the cost of $price USD.")
```

## Concepts
- **Class** – a data type similar to a tuple that is different from it in that it has a well-defined structure – the components it consists of and their types. In case of a tuple, we can write any data we want as members of a tuple – `(1, 2, 3)`, `("cat", "dog", "mouse")` etc – but in case of the `Flight` class as we've defined it in this chapter, we can't write `Flight("cat", "dog", "mouse")` since the third component is supposed to be a number – `price`, and not a `String`. So Scala will give you an error.

## Homework
1. What's the difference between tuples and classes?
2. What's the difference between classes and lists?
3. The previous chapter's Homework (4) tells you to build a database of expenses in Scala. Do this task again but this time, name the data type of your expenses by defining a class for them.
4. Try to write a flight `("Geneva", "Vienna", 200)` using the `Flight` class from this chapter, but omit the price. What happens when you run the program? Why?

