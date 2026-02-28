---
title: Bureaucratic way of efficient AI-assisted development
description: This article covers my approach of highly regularized, well-documented approach to AI-assisted software engineering.
layout: post
---

The key to an effective AI software engineering flow is bureaucracy. Everything needs to be indexed, named, and organzied.

**Plan**. First is your plan. Whether you're making an app from scratch, or working on an existing project, plan helps. Cursor has plan mode, however, such a mode is not suitable for long-running plans, work that may span a couple of days, weeks or longer. For long-running work, the plan needs to live in a separate markdown document, readily accessible to AI agents and humans alike for reference.

**Tasks**. The plan needs to have a structure. The more uniform the structure, the better. This means, the plan needs to be composed of well-defined items. It's a good idea for your tasks to have a name, a status (done, pending, cancelled), and a validation procedure at least.

**Indexing**. With Plan and Tasks, you have started to establish the working documentation for the project. A real project will involve many more documentation and other reference data. However all of those need to be uniquely referencable. Therefore, it is a good idea to develop a **naming scheme** for all the materials covering your project development. So, in a conversation with an AI agent or in any other document, you can reference every plan, every task etc concisely and uniquely. A good idea for every structural component of your project documentation, to have a unique numeric ID. Then, it is easy to ask an agent things like, "please do the task 05 of plan 01".

**Algorithmization**. Bulding up a structured, referencable documentation paves the way for algorithmization of your workflows. Tasks mentioned above imply some work that need to be done. If the tasks are uniform (i.e. more or less of the same nature), the procedure of the work would also be the same for each task, give or take. So, you can capture it in a **Standard Operating Procedure** - SOP. SOPs also live in your project documentation, and follow the principles of indexing. So, if your project SOP #01 is an algorithm to code a task, and a SOP #02 is one to verify the task was done correctly, you can say to the agent:

- "please run SOP 01 on task 05 of plan 01".
- When it reports the work as done, you can ask "please run SOP 02 on task 05 of plan 01" - to verify the task.
- Once the task is verified, you can ask to update the status in the plan: "please update the task 05 of plan 01, set status to Done".

**Chessboard**. Currently there is a trend in AI for autonomous execution of long sequences of tasks. Maybe even involving reasoning, where at certain points of the chain the agent is deciding what step to do next. In my experience, this does not work so well for non-trivial tasks. Instead, what works is doing the decision-making step yourself while delegating routine, repeating tasks without too much room for deviation to agents.

So the development process will look like a chessboard game: in chess, there is a standard notation to denote every possible move you can make. In your engineering project, following the principles of Indexing and Algorithmization, you should have working documents with your standard SOPs, numbered and referencable in agent conversations. You think, you name your move, then the agent executes.

Continuing an example above, your task may not pass verification (SOP #02) from the first try. You may want to execute a debugging step after which ask the agent to rerun the SOP #02, verification, again. You may want to repeat the sequence until verification is passing.

In contrast, agents left to their own devices (e.g. told to execute all project tasks by themselves), with time degrade: start skipping steps, give up on passing verification after a few failing tries, propose unacceptable solutions from architectural standpoint just to get verification done etc.

So, rather than wishing for an agent to autonomously do everything, it's better to establish a good synergy with an agent, outsourcing standardized work to it, leaving reasoning to yourself.

**Organization**. Following such a bureaucratic (some may even say boring) way, you will quickly accumulate a large corpus of data. As you amass the data and documents, it is good to organize it in a scalable way, so even if the doc count grows from 10 to 100, both you and your agent can easily find stuff in it. Indexing everything goes a long way to ensure that.

## Conclusion

Following such a development style, my experience is that you start spending less of your attention on mundane tasks - searching the web for a right command, explaining the agent what needs to be done over and over, doing trivial coding tasks. Some of you may have noticed that this style of development took a page from the project management book - indeed, in the era of AI, a software engineer can drastically increase their output which imposes some management obligations on them.

Once the trivial stuff is commoditized via indexing and algorithmization, and the project management layer is figured out, the attention is liberated for doing stuff that AI is still bad at, and, frankly, that is more satisfying for a human to do: thinking about the architecture, long-term trade-offs, polishing the code to a high standard.

I've recently developed a tool to help with the development pattern described above - the [Context Layer](https://ctxlayer.dev) proejct that helps you keep the documentation and other materials for your project organized. If you are curious enough to try the pattern or the tool in your own projects, I'd be happy to hear from you on how it goes!
