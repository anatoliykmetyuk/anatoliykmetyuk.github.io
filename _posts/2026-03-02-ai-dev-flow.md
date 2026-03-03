---
title: Bureaucratic way of efficient AI-assisted development
description: This article covers my approach of highly regularized, well-documented approach to AI-assisted software engineering.
layout: post
---

The key to an effective AI software engineering flow is bureaucracy. Everything needs to be indexed, named, and organzied.

<!-- more -->

**Plan**. First is your plan. Whether you're making an app from scratch, or working on an existing project, plan helps. Cursor has plan mode, however, such a mode is not suitable for long-running plans, work that may span a couple of days, weeks or longer. For long-running work, the plan needs to live in a separate markdown document, readily accessible to AI agents and humans alike for reference.

**Tasks**. The plan needs to have a structure. The more uniform the structure, the better. This means, the plan needs to be composed of items that are of the same, well-defined shape. It's a good idea for your tasks to have a name, a status (done, pending, cancelled), and a validation procedure at least.

**Indexing**. With Plan and Tasks, you have started to establish the working documentation for the project. A real project will involve many more documentation and other reference data. However all of those need to be uniquely referencable. Therefore, it is a good idea to develop a **naming scheme** for all the materials covering your project development. So, in a conversation with an AI agent or in any other document, you can reference every plan, every task etc concisely and uniquely. A good idea for every structural component of your project documentation, to have a unique numeric ID. Then, it is easy to ask an agent things like, "please do the task 05 of plan 01".

**Algorithmization**. Bulding up a structured, referencable documentation paves the way for algorithmization of your workflows. Tasks mentioned above imply some work that need to be done. If the tasks are uniform (i.e. more or less of the same nature, having the same shape), the procedure of the work can also be standardized across tasks. So, you can capture it in a **Standard Operating Procedure** - SOP. SOPs also live in your project documentation, and follow the principles of indexing. So, if your project SOP #01 is an algorithm to code a task, and a SOP #02 is one to verify the task was done correctly, you can say to the agent:

- "Please run SOP 01 on task 05 of plan 01".
- When it reports the work as done, you can ask, "Please run SOP 02 on task 05 of plan 01" - to verify the task.
- Once the task is verified, you can ask to update the status in the plan: "Please update the task 05 of plan 01, set status to Done".

**Chessboard**. Currently there is a trend in AI for autonomous execution of long sequences of tasks. Maybe even involving reasoning, where at certain points of the chain the agent is deciding what step to do next. In my experience, this does not work so well for non-trivial tasks, as even the most advanced agents degrade if left to their own devices for too long. Instead, what works is doing the decision-making step yourself while delegating routine, repeating tasks without too much room for deviation to agents.

So the development process will look like a chessboard game: in chess, there is a standard notation to denote every possible move you can make. In your engineering project, following the principles of Indexing and Algorithmization, you should have working documents with your standard SOPs, numbered and referencable in agent conversations. SOPs defined your valid moves. You think, you name your move, then the agent executes.

**Organization**. Following this way of development, you will quickly accumulate a large corpus of documents. As you amass the data and documents, it is good to organize it in a scalable way, so even if the doc count grows from 10 to 100, both you and your agent can easily find stuff in it. Indexing everything goes a long way to ensure that.

## Conclusion

For some, this style of development may come across as bureaucratic and boring. Yet others may find that it looks like project management rather than software engineering.

My experience with this style of development is that you start spending less of your attention on mundane tasks, leaving more energy for stuff that matters - architecture, business requirements etc. In the era of AI, a software engineer can drastically increase their output which imposes some management obligations on them, so having a good command of basic project management techniques comes a long way.

I've recently developed a tool to help with the development pattern described above - the [Context Layer](https://ctxlayer.dev) proejct that helps you keep the documentation and other materials for your project organized. If you are curious enough to try the pattern or the tool in your own projects, I'd be happy to hear from you on how it goes!
