---
title: Replacing Spreadsheets with React Apps
description: How to develop React apps with Cursor AI
layout: post
---

Recent developments in Cursor AI-powered IDE have effectively made it so that it takes less time and effort for me to develop a React app for my administrative needs rather than turn to a spreadsheet. This post describes the technique I use to do so.

<!-- more -->

For example, for the past 8 years I've been using a certain financial planning model to budget my expenses, in one form or another. I wanted to develop it into an app for a long time, and even made numerous attempts to do so, however, it kept living in the form of spreadsheets - until recently.

<iframe width="560" height="315" src="https://www.youtube.com/embed/86K7o3teN9A?si=ORUmgtncXTXNNIli" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

[Repo](https://github.com/anatoliykmetyuk/budget-projection), [Demo](https://budget-projection.vercel.app/).

As it turns out, for the app development to go smoothly in Cursor, a certain technique helps.

## Principles
Before everything else, a few principles on which everything is based.

**First principle**, it seems hard for many people to make a mental shift to just let an agent work on a task. It seems more natural to expect an agent to get the code right from the first shot - or not at all. Perhaps this mindset comes from completions or code generations - either it works or it doesn't and you revert to manual coding.

However, in my experience, if you just let the agent iterate after the first few mistakes - it usually gets it right, especially on mainstream languages like Typescript/React. Think carefully about what needs to be done, instruct AI in precise language, and leave it be for 10 minutes. Maybe take some time away from the screen, make some tea. When you come back, there's a good chance you'll have a solution.

**Second principle**, documentation is important. Before developing an app, I create a Markdown file where I spec what the app should do.

**Third**, use Planning mode of Cursor. It seems the current tendency of AI is to learn operating on large lists of entities, tasks, maintain them in memory. That's not something learnt by AI in the process of training but hard-coded by developers. Such a technique is called [scaffolding](https://www.lesswrong.com/posts/43C3igfmMrE9Qoyfe/scaffolded-llms-as-natural-language-computers).

**Fourth**, it is important to define correctness verification procedure. It involves compilation, linting, and testing - unit and integration. When Cursor makes its plan, it is important to make sure it includes verification pipeline after each step. Ask it to do so if it hasn't included based on your first prompt! Only in such a way can you ensure it works iteratively and verifies completion of each step.

## Scaffolding
Every app has a structure. Think of it as a set of boxes that AI then fills with code. If you provide a good framing for those semantic boxes, AI will do a good job filling them.

![App Structure](/post_assets/2025-12-30-replacing-sheets-with-react/app-structure.svg)

The framing of the boxes is provided in the Markdown specification for implementation. If you are interested in an example, you can check out the [specification](https://github.com/anatoliykmetyuk/CursorAnalytics/blob/79a7fce4a4d06697793ffa5a9e73b6c7001c27e8/spec/IMPLEMENTATION.md) for my [Cursor usage costs analytics](https://cursor-analytics-gules.vercel.app/) app.

When providing such framing in human text, it is important to use precise language. For example, "there should be a way for the user to delete an item" is less precise language than "there should be a red button at the item page that deletes this item". However, intentional vagueness is power - if you aren't sure yourself how something should be (for example, you'd like a nice design but aren't a designer), but are reasonably sure that AI should know what to do (as the entire Internet is full of pretty designs, so there should be a reasonable chance that AI will pick up the practices), you can use vague language for the AI to fill the gaps.

Yet another useful framing technique is to provide examples for what AI should produce - e.g. find some websites online similar to those that you'd like to build, take screenshots, and feed them to AI.

## Outcome
Setting up financial spreadsheets in precisely the way needed sometimes can take a couple of evenings. With some practice, developing React apps that push data around in the manner described above takes only a few hours. Much less brainpower goes into small technical details such as debugging a technical bug.