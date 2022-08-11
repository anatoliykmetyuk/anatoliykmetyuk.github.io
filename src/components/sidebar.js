import * as React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"


const Sidebar = () => {return (
  <div class="content">
    <div class="has-text-centered mb-4">
      <h1>👋 Hi.</h1>
      <figure class="image">
        <Link to="/">
          <StaticImage src="../images/avatar.jpg" class="is-rounded" alt="avatar" />
        </Link>
      </figure>
      <h2>I'm <a href="/">Anatolii</a>.</h2>
      <div class="level">
        <div class="level-item">
          <a href="https://github.com/anatoliykmetyuk" target="_blank" rel="noreferrer" class="mr-2">
            <i class="fa-brands fa-github-square fa-2xl"></i>
          </a>
          <a href="https://www.linkedin.com/in/akmetiuk/" target="_blank" rel="noreferrer" class="mr-2">
            <i class="fa-brands fa-linkedin fa-2xl"></i>
          </a>
          <a href="https://twitter.com/akmetiuk" target="_blank" rel="noreferrer" class="">
            <i class="fa-brands fa-twitter-square fa-2xl"></i>
          </a>
        </div>
      </div>
    </div>
    <div>
      <p>💻I'm a compiler engineer at LAMP/EPFL, working on Scala 3.</p>
      <p>Check out the books I've written:</p>
      <p>📕<Link to={`/scala-intro`}>[WIP] Introduction to Programming with Scala</Link> – learn how to program from absolute zero.</p>
      <p>📕<a href="https://www.amazon.com/Mastering-Functional-Programming-techniques-programming/dp/1788620798/" target="_blank" rel="noreferrer">Mastering Functional Programming</a> – the motivation behind purely functional libraries such as Cats.</p>
      <p>📕<a href="/files/story-of-one-library.pdf" target="_blank" rel="noreferrer">A Story of One Library</a> – a commit-by-commit analysis of an application from the very start. The challenges that were arising during the implementation are addressed in a functional way, so that the reader can understand the motivation behind the functional techniques.</p>
    </div>
  </div>
)}

export default Sidebar
