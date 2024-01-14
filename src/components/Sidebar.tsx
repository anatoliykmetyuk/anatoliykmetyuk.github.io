import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from "gatsby"


const Sidebar = () => {return (
  <div className="content">
    <div className="has-text-centered mb-4">
      <h1>👋 Hi.</h1>
      <figure className="image">
        <Link to="/">
          <StaticImage src="../images/avatar.jpg" class="is-rounded" alt="avatar" />
        </Link>
      </figure>
      <h2>I'm <a href="/">Anatolii</a>.</h2>
      <div className="level">
        <div className="level-item">
          <a href="https://github.com/anatoliykmetyuk" target="_blank" rel="noreferrer" className="mr-2">
            <i className="fa-brands fa-github-square fa-2xl"></i>
          </a>
          <a href="https://www.linkedin.com/in/akmetiuk/" target="_blank" rel="noreferrer" className="mr-2">
            <i className="fa-brands fa-linkedin fa-2xl"></i>
          </a>
          <a href="https://twitter.com/akmetiuk" target="_blank" rel="noreferrer" className="">
            <i className="fa-brands fa-twitter-square fa-2xl"></i>
          </a>
        </div>
      </div>
    </div>
    <div>
      <p>💻I'm a compiler engineer at LAMP/EPFL, working on Scala 3.</p>
      <p>Check out the books I've written:</p>
      <p>📕<a href="https://www.amazon.com/Mastering-Functional-Programming-techniques-programming/dp/1788620798/" target="_blank" rel="noreferrer">Mastering Functional Programming</a></p>
      <p>📕<a href="/files/story-of-one-library.pdf" target="_blank" rel="noreferrer">A Story of One Library: Introduction to Functional Architectures</a></p>
    </div>
  </div>
)}

export default Sidebar
