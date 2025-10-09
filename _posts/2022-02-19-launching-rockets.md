---
title: Launching Rockets with Scala
description: In this article, we'll see how you can script a game about rockets in Scala
image: /post_assets/2022-02-19-launching-rockets/simplerockets-2-e1631817494638.jpg
layout: post
---

If you're an aerospace hobbyist, there's a good chance that you'll have a ton of fun with [Simple Rockets 2](https://www.simplerockets.com/).

<!-- more -->

<a href="/post_assets/2022-02-19-launching-rockets/simplerockets-2-e1631817494638.jpg" target="_blank"><img src="/post_assets/2022-02-19-launching-rockets/simplerockets-2-e1631817494638.jpg" width="50%"/></a>

It’s a game where you build and fly rockets. Similarly to Kerbal Space Program, it allows you to pick up basic rocket science casually while playing the game.

The business of launching rockets relies on precision. When we need precision, we use software. It turns out, you can also program your rockets in the game with a simple built-in language, [Vizzy](https://www.simplerockets.com/Blog/View/120034/Vizzy).

<a href="/post_assets/2022-02-19-launching-rockets/CleanShot%202022-02-19%20at%2012.49.10@2x.png" target="_blank"><img src="/post_assets/2022-02-19-launching-rockets/CleanShot%202022-02-19%20at%2012.49.10@2x.png" width="50%"/></a>

It’s a visual language with which you need to drag-and-drop all the language constructs or variables in proper slots to use them. Much more tedious and quite a bit slower than typing. Not anymore – meet DSL based on Scala 3 to do just that! You can run the below code from a new [Scala CLI](https://scala-cli.virtuslab.org/) file using the `scala-cli Program.sc` syntax (extension must be `sc`), assuming you have Simple Rockets 2 installed – no other setup is necessary!

```scala
//> using scala "3.1.1"
import $dep.`com.akmetiuk::simple-rockets-compiler:0.1.1`, rocketscompiler.{ *, given }

program("Simple Launch") {
  // Countdown
  for i <- 5 to 1 by -1 do
    displayText(s"T-$i")
    waitSeconds(1)
  displayText("LAUNCH")

  // Launch sequence
  activateStage() // Start the engine
  Throttle := 1   // Set engine power to 100%
  Pitch := 30     // Tilt the rocket so that it is 30 degrees to the surface
  Heading := 180  // Fly south
}
```

The above sequence compiles to the following Vizzy code that you can load into your rocket following the [usage instructions](https://github.com/anatoliykmetyuk/simple-rockets-compiler/blob/119b9e0d480a0f363ca66892df7a9681297ca58d/README.md#usage):

<a href="/post_assets/2022-02-19-launching-rockets/CleanShot%202022-02-19%20at%2013.15.16@2x.png" target="_blank"><img src="/post_assets/2022-02-19-launching-rockets/CleanShot%202022-02-19%20at%2013.15.16@2x.png" width="50%"/></a>

With that, we have all the programming tools needed to plan our voyage to the orbit.

# How does orbit work?
To reach orbit, you need to go sufficiently high and then sufficiently fast in parallel with the planet's surface.

<a href="/post_assets/2022-02-19-launching-rockets/AA0C91B1-A17E-47B0-9665-F9AF41878ACD.jpeg" target="_blank"><img src="/post_assets/2022-02-19-launching-rockets/AA0C91B1-A17E-47B0-9665-F9AF41878ACD.jpeg" width="50%"/></a>

Here’s an intuition on how it works. The planet is round, so as you go to the side, the distance from you to planet will increase due to planet's curvature. In other words, you will gain altitude from moving to the side.

<a href="/post_assets/2022-02-19-launching-rockets/B2B87D7E-D625-4060-B4C1-1A88F6E1DAD1.jpeg" target="_blank"><img src="/post_assets/2022-02-19-launching-rockets/B2B87D7E-D625-4060-B4C1-1A88F6E1DAD1.jpeg" width="50%"/></a>

Gravity matters though. The planet will pull you back with its gravity as you move to the side. So, you will also be losing altitude to gravity.

<a href="/post_assets/2022-02-19-launching-rockets/A27EFFA2-F391-4F95-A1DA-D1191DA390C0.jpeg" target="_blank"><img src="/post_assets/2022-02-19-launching-rockets/A27EFFA2-F391-4F95-A1DA-D1191DA390C0.jpeg" width="50%"/></a>

However, if you get your speed of movement in parallel with the planet (i.e. horizontal speed) just right, you can compensate the altitude loss due to gravity by altitude gain due to the horizontal movement over the planet’s curvature. When the two perfectly compensate each other, the net change in altitude is zero, and you stay above Earth indefinitely – that is orbit.

# The Flight Plan
A trajectory from take-off to orbit looks something like this:

<a href="/post_assets/2022-02-19-launching-rockets/574C143A-13DC-4533-8E71-C644A87C691C.jpeg" target="_blank"><img src="/post_assets/2022-02-19-launching-rockets/574C143A-13DC-4533-8E71-C644A87C691C.jpeg" width="50%"/></a>

First, the rocket flies straight up as fast as possible – trying to escape the lower dense atmosphere which causes a lot of drag and therefore is hard to fly through. Once it is high enough, it starts to slowly turn to the side to build the horizontal speed.

During the first stage of the flight, the rocket is not trying to reach orbit just yet. The objective is merely to escape the atmosphere. And so the most important thing about the trajectory is its highest point above the planet surface:

<a href="/post_assets/2022-02-19-launching-rockets/3C9D58A6-43C8-4E36-855B-CD4574E4C183.jpeg" target="_blank"><img src="/post_assets/2022-02-19-launching-rockets/3C9D58A6-43C8-4E36-855B-CD4574E4C183.jpeg" width="50%"/></a>

This point is called *Apoapsis*. When trying to reach orbit, you want this point above your planet’s atmosphere. If any point of your orbit intersects the atmosphere, the spacecraft will be losing speed due to drag until it is unable to maintain orbit.

The rocket rises its apoapsis by firing its engines and accelerating upwards. When the apoapsis becomes sufficiently high above the atmosphere, the rocket shuts down its engines.

## Staying in Space
First objective, escaping the atmosphere, being achieved, the next objective is not to fall back into it. In other words, this trajectory:

<a href="/post_assets/2022-02-19-launching-rockets/8F4DD12A-638A-4344-915D-606A8DEFEECF.jpeg" target="_blank"><img src="/post_assets/2022-02-19-launching-rockets/8F4DD12A-638A-4344-915D-606A8DEFEECF.jpeg" width="50%"/></a>

needs to become this:

<a href="/post_assets/2022-02-19-launching-rockets/3DF34915-0704-4B6E-A201-BAB12E55DC5A.jpeg" target="_blank"><img src="/post_assets/2022-02-19-launching-rockets/3DF34915-0704-4B6E-A201-BAB12E55DC5A.jpeg" width="50%"/></a>

To make it happen, the rocket needs to accelerate in parallel with the planet's surface until it reaches the orbital speed. At this point, the concept of *periapsis* becomes useful. If apoapsis is the *highest* point of a spacecraft's orbit, periapsis is its *lowest* point. As we don’t want our orbit to touch the atmosphere, we want our periapsis above atmosphere as well.

# 3, 2, 1, Lift-off!
Armed with this theory, let’s build a rocket and program it to reach space. An orbit-worthy rocket may look something as follows:

<a href="/post_assets/2022-02-19-launching-rockets/CleanShot%202022-02-19%20at%2013.37.26@2x.png" target="_blank"><img src="/post_assets/2022-02-19-launching-rockets/CleanShot%202022-02-19%20at%2013.37.26@2x.png" width="50%"/></a>

The rocket has two stages: the first one will bring us out of the atmosphere and the second one will be used in space to reach orbit.

You can see the full program for this rocket [on github](https://github.com/anatoliykmetyuk/simple-rockets-compiler/blob/119b9e0d480a0f363ca66892df7a9681297ca58d/examples/FlightToOrbit.sc). Keep in mind that the in-game planet is not Earth and hence the parameters used below are not realistic for a real-Earth flight plan. E.g. the end of the atmosphere for Droo (the game’s analogue of Earth) is 60km while for Earth it is 100km. The orbital speed for Droo is around 3420m/s while for Earth it is around 7900m/s.

The parameters used in such kind of programs are very much experimentation-based. You try one set of parameters, it doesn’t work, you tweak until it works (hopefully real-world rocket scientists are more meticulous than that :) ).

 At the high-level, the program looks as follows:

```scala
  countdown
  liftOff
  gradualTurn(
    startAltitude = 500, startPitch = 80,
    endAltitude = 8000, endPitch = 25
  )
  coasting(targetApo = 70000)
  periapsisRiseManeuver(
    targetOrbitalVelicity = 3420, targetPeriapsis = 70000,
    maxTimeToApo = 60, minTimeToApo = 10, correctionThrottle = 0.2,
  )
```

For the `gradualTurn`, the idea is that upon reaching an altitude of 500 meters, we start to slowly tilt the rocket (i.e. decrease its pitch – the pitch of 90 degrees means rocket is pointing straight up and 0 degrees – the rocket is on the side, parallel to the surface). Our goal is to start with the pitch of 80 degrees and by the time we reach 8000m altitude, the pitch should reach 25 degrees.

“Coasting” means “wait until the apoapsis reaches the target value, shut down the engine and fly by inertia until the rocket reaches the apoapsis” – very much like a shell shot from an artillery gun.

“Periapsis rise manoeuvre” means “turn on the engines again and accelerate to the side until the orbital speed is reached”. The extra parameters are responsible for the technical detail of making sure this engine burn doesn’t make our orbit too lopsided, like this (try it for yourself to get a feel of why this is needed!):

<a href="/post_assets/2022-02-19-launching-rockets/7318FA49-2DD7-4C51-BAA2-B195B2DF1862.jpeg" target="_blank"><img src="/post_assets/2022-02-19-launching-rockets/7318FA49-2DD7-4C51-BAA2-B195B2DF1862.jpeg" width="50%"/></a>

## Show me the code
Here’s the full implementation of the program, [also available on GitHub](https://github.com/anatoliykmetyuk/simple-rockets-compiler/blob/119b9e0d480a0f363ca66892df7a9681297ca58d/examples/FlightToOrbit.sc). The constructs that aren’t explicitly defined in the program are defined in the DSL library and mapped to the in-game constructs:

```scala
def ascentProfile: SRProgram =
  def countdown: SRProgram =
    for i <- 5 to 1 by -1 do
      displayText(i)
      waitSeconds(1)

  def liftOff: SRProgram =
    activateStage()  // Turn on the engine
    Throttle := 1
    displayText("LIFTOFF!!!")

  def gradualTurn(startAltitude: Double, endAltitude: Double, startPitch: Double, endPitch: Double): SRProgram =
    waitUntil(Altitude.ASL >= startAltitude)  // ASL = Above Sea Level
    displayText("Starting the gradual turn")
    whileLoop(Altitude.ASL < endAltitude) {
      val fractionOfPath = (Altitude.ASL - startAltitude) / (endAltitude - startAltitude)
      val pitchDifference = endPitch - startPitch
      Pitch := startPitch + fractionOfPath * pitchDifference
    }

  def coasting(targetApo: Double): SRProgram =
    waitUntil(Orbit.Apoapsis >= targetApo)
    displayText("Coasting towards apoapsis")
    Throttle := 0

  def periapsisRiseManeuver(targetOrbitalVelicity: Double, targetPeriapsis: Double,
      maxTimeToApo: Double, minTimeToApo: Double, correctionThrottle: Double): SRProgram =
    val maxStageAcceleration = Performance.StageDeltaV / Performance.BurnTime
    val burnDeltaV = targetOrbitalVelicity - Velocity.Orbit
    val burnTime = burnDeltaV / maxStageAcceleration
    val startBurnAt = burnTime / 2

    waitUntil(Orbit.TimeToApoapsis <= startBurnAt)
    displayText("Rising periapsis")
    Pitch := 0
    Throttle := 1

    whileLoop(Orbit.Periapsis < targetPeriapsis) {
      ifTrue(Orbit.TimeToApoapsis > maxTimeToApo && Throttle =!= 0) {
        Throttle := 0
      }
      ifTrue(Orbit.TimeToApoapsis < minTimeToApo && Throttle =!= 1) {
        Throttle := correctionThrottle
      }
    }
    Throttle := 0
    displayText("Congratulations! You've reached orbit with Scala!")

  countdown
  liftOff
  gradualTurn(
    startAltitude = 500, startPitch = 80,
    endAltitude = 8000, endPitch = 25
  )
  coasting(targetApo = 70000)
  periapsisRiseManeuver(
    targetOrbitalVelicity = 3420, targetPeriapsis = 70000,
    maxTimeToApo = 60, minTimeToApo = 10, correctionThrottle = 0.2,
  )
end ascentProfile
```

Notice that for the control structures, most of the times the built-in game loops are used such as `whileLoop` and `ifTrue`. For the boolean inequality comparison, `=!=` is used instead of `!=`.

Here's a footage of how a rocket flies under this program:

<iframe width="100%" height="315" src="https://www.youtube.com/embed/dQLlwcb0zaY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Continuing the Journey

<a href="/post_assets/2022-02-19-launching-rockets/CleanShot%202022-02-19%20at%2013.48.08@2x.png" target="_blank"><img src="/post_assets/2022-02-19-launching-rockets/CleanShot%202022-02-19%20at%2013.48.08@2x.png" width="50%"/></a>

There are 20 planets in game to explore, some with really weird trajectories. Can you visit them all? Would it simplify things if you build a space station first, across multiple launches, to store fuel in orbit and refuel there with your spacecrafts before going on deep space missions? How would you do it, what kind of physics do you need to discover to make it happen?

And if during your quest you find out you do repetitive steps that can be automated, maybe the DSL described here would be of any use ;)








