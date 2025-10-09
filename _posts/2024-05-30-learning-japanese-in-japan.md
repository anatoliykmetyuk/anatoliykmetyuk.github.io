---
title: Learning Japanese in Japan
description: My journey of learning Japanese in Japan
layout: post
---

Two months ago I moved to Japan to pursue something I've always wanted to do. I've been a fan of Japanese culture for a long time, and always wanted to understand the language - so now I'm studying at a language school in Tokyo.

<!-- more -->

Our class is 23 people, all around the world, very diverse backgrounds. It's super inspiring to be among people who are pursuing their dreams in a strange country!

The curriculum is steep here. The pipeline aims at giving you a workspace-level proficiency in just 15 months, from zero. To stay on the curve, you need to learn at least 6 kanji and 30-50 new words per day. During the classes, we study new grammar every day.

I'm trying to stay on the curve, as I'm interested to know the culture beyond the tourist level, and if my 5 years in Switzerland taught me anything, it is that without the local language you may as well forget about any kind of integration.

During these two months, I was looking to figure out a system that makes for effective language learning - so that I stay on the curve and follow the class material. There are two distinct areas so far, that require two distinct approaches: the grammar and the words/kanji.

# Words
Flashcards have proven to be an effective approach. There were several problems I had to solve to make an efficient Flashcards system.

First, the cards need to be effectively manageable - and Anki just doesn't cut it here. I want the cards stored at a Google Sheet as it's the most convenient way for me to manage them (as in, quickly edit, delete, tweak, add new fields).

Second, the cards need to be effectively ingestible. There are lots of ready-made Japanese flashcards datasets online, but none follow the curriculum of our school. So I need a way to get the cards from my textbook or printouts they give us at school into the flashcards format.

Third, the solution needs to be convenient: I need to be able to do the daily practice from my phone alone, while still being lazy in bed early in the morning. A solution with a heavy setup - where I need to grab a textbook, paper and pen - to practice, just won't cut it.

# The App

<img alt="Screenshot" src="/content/images/2024/05/photo_2024-05-30_21-42-40-1.jpg" style="height: 500px;" />

Since I didn't find a decent flashcards app that would allow to store the cards in Sheets, I made my own. I used AppSmith to do it - open-source, visual-oriented, self-hostable internal tools builder. Programmable with JS if your soul so desires. Took me 3 evenings to build a usable prototype, and two weeks of iterating to improve it as I used it.

To practice Kanji writing, I use Apple Notes app which allows for drawing with my finger on my iPhone. This way I don't need a pen and paper and can do it while still in bed or in metro. Tokyo commutes can be long, but even with a bit of time, you can make progress with flashcards, so it's good to enable practice at as many places as possible.

# Ingress

<img alt="Alt" src="/content/images/2024/05/Screenshot-2024-04-29-124823-1.png" style="height: 500px;" />

This is a screenshot from my Kanji practice textbook. How do you turn that...

<img alt="Alt" src="/content/images/2024/05/Screenshot-2024-05-30-215404.png" style="height: 500px;" />

...into this? If you enter by hand, it'll take a lot of time and you won't be doing it consistently.

To do it, I use a constellation of three different software: ABBYY PDF reader, n8n, and OpenAI GPT-3.5 API.

ABBYY is the only PDF reader I found capable of an OCR at a decent level. I cannot use GPT-4 for OCR since, even if visually capable, it's OCR is still garbage-level.

n8n is an open-source, self-hostable, visual integrations builder. Wire any API to any API without writing code.

The workflow, in a simplified version, is as follows:

1. Use ABBYY OCR capability to manually convert the textbook screenshot to raw text.
2. Copy-paste the raw text into an n8n form. The form invokes OpenAI API to convert the raw text into machine-readable format, then uses Google Sheets API to populate the flashcards sheet.
3. Use GPT for Sheets to augment the flashcards with some missing data.
4. Manually review the inserted data. AI makes mistakes, the best way of using AI is in conjunction with a human.

I encoded the above procedure in detail, in text, and refine it each time I follow it. Currently, it takes me 1.5 hours per week to ingress all the flashcards according to our curriculum for that week - kanji and vocab. 1.5h/week is a low enough amount of time with high enough returns for me to keep doing it.

# Why it works
Flashcards work by showing you stuff you want to learn in small chunks - cards. There's a front - the question - and a back - the answer. You are presented with a front and try to recall the answer, then you are revealed the answer at the back. Then you select whether you responded right or wrong. The idea is that if you recall the card well, the system shows it to you less frequently. Cards you struggle with are shown more.

Under the hood my flashcards app uses SM-2 algorithm, the same one Anki uses.

Initially I tried to do my own thing: an interval of card's repetition was a square of the number of past correct recalls of that card.
However, I read about what Anki does: in fact it uses an exponential, not quadratic, function to calculate the interval. This is because the memory fades away as a power law. So I reimplemented my algorithm as an exponential - to save the time.

For the past two months, it worked well, allowing me to score high on our school tests, and to understand more signs and speech in daily life.

The reason it works so well is that the amount of material we get is linear - every day the same amount of flashcards. Exponential memorization rate beats linear ingress rate, so you aren't overwhelmed.

# Grammar

I tried studying grammar points as well using the flashcards system above. It poorly works with grammar. Whereas kanji and vocab are about memorization, grammar is about understanding and skill.

There's a trick, however, to learn grammar. In class, you need to be aware of your attention.

Our attention, at any given point, is directed onto something. In class, when we learn a sentence, it may be directed on repeating that sentence after the teacher. But there are several objects our attention can be focused on:

- Words: being aware of where one word ends and another begins.
- Word constructs. Several words bound together. This also requires to be aware of the grammatic "glue" that binds the words together.
- Meanings of words and word constructs.
- Meaning of the entire sentence. Meanings of the entire text when dealing with more than one sentence.

So at least four objects of attention.

CPUs are rated by how many operations they can perform per second. Our brain can be viewed in a similar way: one operation = one object of attention. So, for each sentence, your attention needs to go through the chain: Word -> Meaning -> Word Construct -> Meaning -> Sentence Meaning.

The process of guiding your attention in that manner is a conscious effort when done for the first time. It takes a lot of time: maybe 5-10 seconds per operation.

The good news is that once you consciously do it a bunch of times, the chain starts to happen unconsciously, fast. Works not only for language learning but for learning anything at all: riding a bike, programming etc - the process of learning is essentially about picking the right objects of attention, and consciously repeating the right patterns of moving your attention from one object to another, until your brain learns. You teach your brain by conscious repetition.

The bad news is that in class, learning may be happening fast, so you feel pressured to do fast, not right. So if you're not conscious of your attention, it's easy to end up not learning the right patterns.

Slow is smooth, smooth is fast.