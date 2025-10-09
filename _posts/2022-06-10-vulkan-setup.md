---
title: Vulkan setup in Scala
description: How to use Vulkan graphics in Scala
layout: post
---

Vulkan is a modern API to access graphics cards and use them for rendering and other purposes. An OpenGL successor, it is an essential component driving many modern games.

<!-- more -->
## Approach to the LWJGL wrapper library
Vulkan is available in Scala via a Java library, LWJGL (Lightweight Java Game Library). LWJGL is truly lightweight: it doesn't introduce any new concepts, but merely mimics the game-related C++ APIs nearly one-to-one. The promise is the capability to program modern games using a high-level language without the loss of performance. The performance parity is achievable because LWJGL and the API it wraps works with off-the-heap memory: just like in C++, you need to manually allocate and deallocate memory. The off-heap data is represented via a concept of `java.nio.ByteBuffer` as well as LWJGL-provided buffer and pointer classes.

Since LWJGL provides so little new concepts on top of existing Vulkan API, a person learning Vulkan with Scala can, in fact, use a [C++-based tutorial](https://vulkan-tutorial.com/) and cross-reference it with the [contributed Java examples](https://github.com/Naitsirc98/Vulkan-Tutorial-Java). Typically, even the Java examples are unnecessary: you can copy-paste most of the C++ code directly into Scala and, after some mechanical adaptations, it will work. The adaptations necessary deal with the syntax of method and variable declarations and calls (the method names are mimicked one-to-one in LWJGL) and with the proper treatment of pointers (you need to use Java/LWJGL buffers instead of C++ pointers).

## Approach to the Vulkan GPU API
One of the challenges when learning the Vulkan API is that it's so huge. It's huge because it is very low-level, giving you as much control as possible, and making zero assumptions about your intentions at the same time. As a result, even something as trivial as preparing the Vulkan environment for usage in the application can take a hundred lines of Scala code – even more in Java or C++. Because it is so low-level, it's easy to lose sight of the forest behind the trees.

Another challenge is that Vulkan is so unforgiving. The framework doesn't check for errors by default to gain on performance, but some error checking can be enabled with so-called validation layers. Even so, it's easy to make a mistake while working with an off-the-heap memory. Almost any misuse of the API causes segmentation faults that are only debuggable with `println` statements dispersed throughout the code.

## Approach to the Tutorials
The challenge of learning such a complex codebase helped me explore an approach that worked great when dealing with the need to switch between the low-level and the high-level picture, as well as having to deal with the low-level errors.

Usually, a single chapter of the tutorial shows you how to implement some example. The implementation consists of several high-level steps, each with some low-level details. To prevent getting lost in those details, read the tutorial in several passes, and during each pass, focus your attention on a specific level of detail.

1. During the first pass, aim to grasp the concepts. Write down those concepts and the relationships between them.
2. During the second pass, focus on the task the tutorial asks you to implement. Write down the objective and the high-level steps required to accomplish it. Write what needs to be done, but not how. For example, "Step 1: Print out the supported features of the GPU; Step 2: Initialize GPU".

After those two passes, you should have a good understanding of what the tutorial is all about (the concepts) as well as what is your implementation objective for this tutorial and the high-level plan for the implementation. Writing down this information solves the problem of getting lost in the technical details of a single implementation step and losing from sight both the objective of the tutorial and the concepts the tutorial introduces.

Once you've written down and understood the implementation instructions and the concepts, follow those instructions to implement whatever the tutorial asks of you. In other words, use your notes as an implementation guide – not the actual tutorial. Use the tutorial as a reference, one of many (others would be the Vulkan spec, the LWJGL javadoc and others). This way, you have a plan that you yourself have composed, and therefore that makes sense to _you_.

# Setting up Vulkan
To set up Vulkan with Scala 3, I was following the [Vulkan Tutorial](https://vulkan-tutorial.com/) for C++ while accessing the Vulkan API via LWJGL. To set up Vulkan for your Scala project, add a dependency on Vulkan API provided by LWJGL – you will find the instructions on how to do it on the LWJGL website.

The first section of the tutorial, "Setup", explains how to set up the mechanism of communication between your program and the GPU for rendering purposes. Vulkan is a standard that specifies interactions between your program and the GPU, and its execution model uses concepts such as _command_, _queue_, _queue family_, _physical device_ and _logical device_.

- A _command_ is an instruction for the GPU to do something, e.g., to render on the screen.
- A _queue_ is where you push your command. Vulkan implementation will execute the command on the GPU in due time, after other commands pushed earlier to the same queue. More than one queue can be exposed by a single GPU and used in one program.
- A _queue family_ is a set of queues provided by a GPU that share a set of common capabilities. For example, there are queue families for rendering, there are ones for computing etc. You need to select a proper queue family that can execute your command before pushing that command.
- A _logical device_ is an abstraction over a physical GPU via which you interact with it. For example, you can access the queues via a logical device.

Hence, in technical terms, the Setup section teaches you how to get your hands on a queue to communicate with your GPU. To accomplish that, the tutorial teaches the following workflow to be implemented in your program:

1. Initialize a GLFW window. GLFW (GL FrameWork) is a library that allows you to create a window for your application. All the rendering will happen there. Vulkan doesn't specify a way windows can be created, nor does it specify a way the program will handle the user input. This is accomplished by other tools such as GLFW.
2. Initialize Vulkan to get access to a queue that supports graphics operations.
	1. Create a _Vulkan instance_. Vulkan doesn't have any global state. All the program-wide state resides in the Vulkan instance, which we need to create.
	2. Enable _validation layers_. By default, Vulkan doesn't do any error-checking on your program. Which means if you make a mistake like forgetting to clean up an object you are no longer using, you won't get any warning. Vulkan doesn't check for errors because this adds an extra performance overhead, and games are performance-critical. However, for a development environment, error checking takes priority over performance. Hence the concept of a _validation layer_ – an opt-in feature of Vulkan that enables some error-checking in your program. It is a good practice to turn it on for development, as it saves you time by providing pointers to potential errors.
	3. Pick a _physical device_. You need to pick the GPU that you want to use for your program based on certain criteria, such as the GPU's features (what it can do) and the capabilities of supported queue families.
	4. Create the logical device wrapping the physical device. The logical device contains the API to talk to the GPU.
	5. Obtain the graphics queue from the logical device.

# First Impressions
Vulkan is not a game engine. It is a low-level tool that takes time to learn, and while using it, you will encounter obscure errors. On the other hand, you are in control of everything: from the architecture of your game to the tiny details of how it is rendered. Vulkan's behavior is very well documented with its thousand-page-long specification. It's a great tool if you aren't in a rush to create a game as soon as possible but would rather have control over every aspect of your game.
