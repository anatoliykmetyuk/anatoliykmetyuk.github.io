---
title: Attention Allocation Models for Agentic Development
description: A practical model for agentic software development.
layout: post
typora-root-url: ..
typora-copy-images-to: ../post_assets/2026-08-13-agentic-development-model
---

Modern agentic engineering seems to be converging on a theme of agents being exceptionally great at taking care of boilerplate and navigating large search spaces, pursuing an objective function over long time horizons. They are much less great at decision-making and architecture design. The net effect is a speed-up of the software engineering projects with humans still being essential parts of the loop. The human programmer's ability to effectively work with information is becoming a bottleneck to realizing the system's potential.

In this article, I'm sharing a few mental models one can use to optimize their information processing capability as a human in a human-agent engineering system, to an effect of spending limited human attention capital more efficiently.

<!-- more -->

## Limitations of Agents

Modern agents speed up software engineering. However, agents are not capable of performing software engineering fully autonomously. The following aspects of software engineering still depend on human attention:

- **Architectural decision-making**. Agents are great at implementing tasks with clear objective functions. Archtectural design is a complex problem where one must take into account multitude of factors as well as project how the system will evolve into the future and interact with various parties - maintainers, users etc. This task does not have a clear objective function and involves decision-making around tradeoffs. Tasked with designing an architecture, agents often come up with mediocre solutions that aim to solve immediate task at hand while failing to take into account more nuanced tradeoffs.
- **Responsibility**. Software is supposed to be deployed to production at some point. Tests may be green but when stakes are involved, a human is expected to take responsibility. How much are you willing to bet that the software the agent claims is correct, indeed turns out to be correct when deployed in production?
- **Code review** follows directly from the prior two points. When there is new code coming in to the project, does it introduce good architectural decisions? What is the impact surface and who can vouch for the decision to accept the code?

Greater speed at which new code can be produced yet necessity to have a human understand that code and all the implications means more, not less, cognitive workload for the programmers in the AI-assisted development scenario. Programmer's ability to process information effectively becomes the bottleneck to software engineering enterprise.

Different thinking patterns yield different results when it comes to speed and quality of information processing. Below, I'll outline a few thinking models that I've empirically found effective for working with incoming code.

## Incoming Code Review

When some new code is pending entry into the project, there is a necessity for someone to place their stamp of approval on it. The code may come from your own LLM, or from a contributor submitting a PR on GitHub, with or without LLM involvement.

When faced with a wall of new code, it is tricky to know where to start reviewing it. Asking questions about it to an LLM often does not help much, as it presents you with information that may be out of context and not readily understandable.

When regularly faced with a task of code review, we develop a thinking pattern that we use each time - this often happens unconsciously. Becoming explicit about it, writing it down has the following benefits:

- **Regularization of the process** - making sure the process is followed each time, as opposed to each session being ad-hoc, often missing or changing steps, being prone to divertion by various distractors along the way.
- **Scaling the process** beyond what is possible to hold in one's own mind. It's difficult for most people to hold more than 7 objects of attention at once in their conscious mind. Pen and paper solves the problem.
- **Ability to iterate** and improve the process in a conscious way.

Here's the model I've converged to in my practice:

![image-20260811151919110](/post_assets/2026-08-13-agentic-development-model/image-20260811151919110.png)

The above questions may be asked directly to the LLM in an order that interests the programmer, and aims to provide a structure to information gathering and processing.

A usual order of questions is as follows:

1. **Undesirable state of things** - from the end user's perspective, what is wrong?
2. **Desirable state of things** - from the end user's perspective, how would the correct solution look like?
3. **Root cause** - what architectural invariant, law, contract was violated that caused the issue?
4. **Operations** to get from undesirable to desirable state of things - i.e. conceptually, what does the proposed solution do to fix things?

Once step (4) is understood, it becomes clearer what the incoming change is conceptually all about. Once the issue is well-understood, you are in position to request and adversarial review. This involves instructing the agent to try its best to break the solution along the dimensions that matter to you. Relevant dimensions is the realm of architecture and therefore require human judgement. For example:

- **Correctness** - is it right to begin with?
- **Minimality and Necessity** - is the solution surgical, having as little impact surface as possible?
- **Corner Cases** - stress-test it adversarily to see when it might break.
- **Compatibility** - forward and backward, as required by the constraints of the project.
- **Architectural Contract vs Special Casing** - is the solution a single-purpose hack, or does it approach the problem from a conceptual standpoint, systematically improving the architecture?

LLM will usually spit out a bunch of findings, and you will need to exercise your human judgement to determine the relevance of each. You can further ask about the **Impact** of each finding - who exactly is affected and how badly? Is the issue merely a theoretical concern? What's the chance of it actually materializing and in case it happens, how bad the consequences will be? If it's a theoretical one and low-impact, do you need to address it at all?

With modern advanced models, you do not need any special instructions for the agent to understand the mentioned questions. LLMs understand the words such as "undesirable state of things", "minimality and necessity", "corner cases" etc out of the box with no further explanations.

Another tip is having pen and paper at the ready. Agents will give you multiple objects of attention, such as multiple review findings, multiple failure modes etc, and instead of holding them all in your memory, writing them down on a piece of paper helps further reduce cognitive load.

## Corner-case Analysis: Descartian Analysis

There is a type of issues that manifest only when the stars align. You need to be on a specific version of Linux, launching the application with a specific configuration, passing it a specific input... it's easy to get confused trying to understand what parameters are relevant for an issue to happen and what are not.

When faced with such scenarios, it is useful to think about the relevant independent parameters as of orthogonal axes defining a Descartian space. The objective then becomes to map out a surface in that space where the issue happens vs where it does not. In the case of only two dimensions with only two possible values for each, you can draw the space:

![image-20260811153513986](/post_assets/2026-08-13-agentic-development-model/image-20260811153513986.png)

With more dimensions, it is helpful to list the dimensions and represent relevant combinations as tuples: `(os=linux, input1=x, input2=y) - fails with error Y`  and so on.

Mapping out the failure surface allows to focus on specific cases or clusters of cases one at a time, further partition the failure surface into separate falilure modets etc. Explicit enumeration of cases also allows to not lose the big picture and return to it once you're done with an individual case. Shrinking the possibility space to one case or cluster at a time further reduces the cognitive load. LLMs are also greate at such configural thinking, so if you explicitly include the tuple with the coordinates, an LLM will easily understand what you mean.

## Conclusion

The above mental models address the issue of an increased cognitive load on the programmer's mind when doing AI-assisted development. If you are not conscious about how you allocate your attention, suboptimal unconscious patterns may be established, leading to decreased productivity and less fun from the development process.

One way to solve the issue is to become explicitly aware of the thinking patterns you use when when doing repetitive tasks, writing them down, then iterating to improve efficiency.

Two patterns of thinking proposed in this article deal with the question of working with code incoming to a project. Programmers dealing with other kinds of repetitive work may discover different patterns applicable in their own use cases.
