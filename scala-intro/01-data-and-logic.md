---
title: Data and Logic
section: scala-intro
---

```toc
```

Everything in programming is either _data_ or _logic_. Data is information stored in the computer; logic is an instruction to the computer telling it what to do.

# Data
Consider how Instagram works. It operates on the following data:
- Posts (photos and videos) uploaded by the users
- Usernames of the users
- Comments
- Likes
- Bio of the users' profiles
- Stories

... and so on. There are dozens of types of data a typical application operates on. Usually, data types are made of other data types as building blocks. For example:
- An Instagram post is comprised of a picture or a video uploaded by the user, the number of likes and the people who put those likes, and the comment section.
- The comment section consists of zero or more comments.
- Each comment consists of the name of the user who left the comment, the text of the comment, and the likes of that comment.

## Collections
Frequently, a data type is composed of an arbitrary number of other data types. An Instagram comment section is a collection of comments. A post wall is a collection of individual posts. The text you are reading is a collection of individual letters.

In programming, the situation when we have to deal with a multitude of individual things is very common. Hence, most programming languages recognize a special data type – a _collection_.

## The Fundamental Data Type
Every data type is built, at the end of the day, of one fundamental data type. A number. Here's how.

Consider text. It is really a collection of letters. Each letter can be represented with a number. For example, 'a' can be '0', 'b' can be '1', 'c' can be '2' and so on. Then, the word "cat" can be represented by a collection of numbers '3', '0' and '21'.

Consider a photo. A photo is really a collection of dots of different colors – pixels. So, a 1000x1000 photo is really a collection of 1,000,000 pixels. And each pixel is defined by its color. Each color can be made up by mixing three base colors: red, green, and blue. And so, every color can be represented by three numbers, each representing the intensity of the color's red, green, and blue components correspondingly.

Consider a movie: it is a collection of photos displayed in rapid succession.

# Logic
Those photos won't upload themselves to Instagram though. Nor will those likes just appear out of nowhere. Instagram is a lively social network designed for people to interact with it.

All interactions on the social network happen via _logic_ which is another fundamental part of software systems. Here are some examples of logic on Instagram:

- Uploading a picture
- Posting a comment
- Liking a post
- Following someone

Logic is _executed_ by the computer. Most of the time, the result of running a piece of logic is data manipulation: some data gets created, modified, or deleted.

In the next chapter, we will see an example of data and logic in our first program.

# Concepts Recap
- **Data** – information stored in the computer, such as blog articles, Instagram pictures, YouTube videos etc. When you speak about them, you may naturally use nouns to refer to them.
- **Logic** – actions performed on data. For example, downloading a file, editing a photo, recording a video. When you speak about logic, you may naturally use verbs to refer to it.
- **Collection** – a type of data that represents several pieces of other data. For example, a shopping list is a collection of individual shopping items.