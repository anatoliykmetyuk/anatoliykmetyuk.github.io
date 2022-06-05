---
title: Vulkan setup in Scala
description: How to use Vulkan graphics in Scala
---

Vulkan is a modern API to access graphics cards and use them for rendering and other purposes. An OpenGL successor, it is an essential component driving many modern games.

## Learning Approach
### Learn C API, apply in Scala
Vulkan is available in Scala via Java library, LWJGL (Lightweight Java Game Library). LWJGL is truly lightweight: it doesn't introduce any new concepts, but merely mimics the C++ API nearly one-to-one. The promise is the capability to program modern games on a high-level language without the loss of performance. The performance part is because LWJGL is oriented for working with off-the-heap memory: just like in C++, you need to manually allocate and deallocate memory, as the majority of LWJGL methods work on off-the-heap data. Such a data is represented via a concept of `java.nio.ByteBuffer` as well as LWJGL-provided buffer and pointer classes.

Since LWJGL provides so little new concepts on top of existing Vulkan API, the one learning Vulkan with Scala can, in fact, use a [C++-based tutorial](https://vulkan-tutorial.com/) and cross-reference it with the [contributed Java examples](https://github.com/Naitsirc98/Vulkan-Tutorial-Java). Typically, even the Java examples are unnecessary: you can copy-paste most of the C++ code directly into Scala and after some mechanical adaptations it will work. The adaptations necessary are about how the syntax of method calls (the method names are mimicked one-to-one in LWJGL) and proper treatment of pointers (you need to use Java/LWJGL buffers instead of C++ pointers).

### Challenge: API is huge, detailed and unforgiving
One of the challenges when learning the Vulkan API is that it's so huge. It's huge because it is very low-level, giving you as much control as possible, and making zero assumptions about your intentions at the same time. As a result, even something as trivial as preparing the Vulkan environment for usage in the application can take around a hundred lines of Scala code – even more in Java or C++.

The fact that it is so low-level means that it's easy to get lost in the low-level details. You can lose from sight the overall logic and intent of the tutorial chapter you are reading – let alone the big picture of the entire tutorial or book you are learning from.

Another challenge when working with Vulkan is that it's so unforgiving. The framework doesn't check for errors by default to win on performance, but some error checking can be enabled with so-called validation layers. Even so, it's easy to make a mistake working with an off-the-heap memory. Some examples of such mistakes:

- `malloc` ("memory allocate") and `calloc` ("contiguous allocation") methods are generally used to allocate memory off the heap. The difference between the two is that `calloc` sets all the bits of the allocated memory to zeros, while `malloc` does not. This means that, if you declare this memory as containing a certain object, for example a structure with configuration information, this structure will have its initial data set to garbage. And, if you don't set all the fields explicitly, you may get a segmentation fault error.
- In general, any misuse of the API causes segmentation faults that are only debuggable with `println` statements dispersed throughout the code.

### Descriptive-Prescriptive approach to learning
The challenge of learning such a complex codebase helped me explore an approach that worked great when dealing with the need to switch between the low-level and the high-level picture, as well as having to deal with the low-level errors.

Usually, a single chapter of the tutorial shows you how to implement some example. The implementation consists of several high-level steps, each with some low-level details, which it is easy to get lost in. So, to prevent getting lost in those details, read the tutorial in several passes, and during each pass, focus your attention on a specific level of detail.

During the first pass, aim to grasp the concepts. Write them down, and the relationships between them. During the second pass, focus on the task the tutorial asks you to implement. Write down the objective, and the high-level steps required to accomplish it. Write what needs to be done, but not how. For example, "Step 1: Print out the supported features of the GPU; Step 2: Initialize GPU".

After those two paths, you should have a good understanding of what the tutorial is all about (the concepts) as well as what is your implementation objective for this tutorial and the high-level plan for the implementation. Writing down this information solves the problem of getting lost in the technical details of a single implementation step and losing from sight both the objective of the tutorial and the concepts the tutorial introduces.

Once you've written down and understood the implementation instructions and the concepts, follow those instructions to implement whatever the tutorial asks of you. In process, use the tutorial as a reference – not a guide. The implementation steps you yourself have written down are your guide, not the tutorial. This way, you follow a plan that you yourself have composed, and that makes sense to _you_.

## Setup
To set up Vulkan with Scala 3, I was following the [Vulkan Tutorial](https://vulkan-tutorial.com/) for C++ while accessing the Vulkan API via LWJGL. To set up Vulkan for your Scala project, add a dependency on Vulkan API provided by LWJGL – you will find the instructions on how to do it via their website.

The first section of the tutorial, Setup, explains how to set up the mechanism of communication between your program and your GPU for rendering purposes. Vulkan is the standard that specifies interactions between your program and the GPU, and its execution model operates notions such as _command_, _queue_, _queue family_, _physical device_, _logical device_.

- A command is the instruction for the GPU to do something, e.g., to render something on the screen.
- A queue is where you push your command. Vulkan implementation will execute the command on the GPU in due time, sequentially with other commands pushed to the same queue.
- A queue family is a set of queues provided by the GPU that share a set of common capabilities. For example, there are queue families for rendering, there are ones for computing etc. You need to select a proper queue family that can execute your command before pushing that command.
- A logical device is the abstraction over a physical GPU via which you interact with it, e.g., access the queues.

Hence, in technical terms, the Setup section teaches you how to get a hand on a queue to communicate with your GPU. To accomplish that, the tutorial teaches:

1. Initialize a GLFW window. GLFW (GL FrameWork) is a library that allows to create a window for your application. All the rendering will happen there.
2. Initialize Vulkan to get access to a queue that supports graphics operations.
	1. Create Vulkan instance. Vulkan doesn't have any global state. All the program-wide state resides in this so-called instance, which we need to create.
	2. Enable validation layers. By default, Vulkan doesn't do any error-checking on your program. Which means if you make a mistake like forgetting to clean up an object you are no longer using, you won't get any warning that this is happening. Vulkan doesn't check for errors because this adds an extra performance overhead, and games are performance-critical. However, for a development environment, error checking takes priority over performance. Hence, the concept of a _validation layer_ – an opt-in feature of Vulkan that turns on some error-checking on your program. It is smart to turn it on for development, as it saves you time by providing pointers to potential errors.
	3. Pick physical device. You need to pick the GPU that you want to use for your program based on certain criteria, such as its features (what it can do) and the types of supported queue families.
	4. Create the logical device wrapping the physical device. The logical device contains the API to talk to the GPU.
	5. Obtain the graphics queue from the logical device.
