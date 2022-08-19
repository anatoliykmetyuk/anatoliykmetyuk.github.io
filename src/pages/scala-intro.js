import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"


// markup
const IndexPage = ({ data }) =>
  <Layout>
    <Seo />
    <div class="content p-3">
      <div class="level is-mobile">
        <div class="level-left">
          <p class="level-item">
            <a href="https://scastie.scala-lang.org/" target="_blank" rel="noreferrer">
              <i class="fa-solid fa-laptop-code"></i> Write Code
            </a>
          </p>
          <p class="level-item">
            <a href="https://discord.gg/ywpJTcxcSx" target="_blank" rel="noreferrer" class="mr-2">
              <i class="fa-brands fa-discord"></i> School
            </a>
          </p>
        </div>
      </div>
    </div>
    <div>
      <h1 class="title"><i class="fa-solid fa-book"></i> Introduction to Programming with Scala </h1>
      <div>
        Please note that this book is still a work in progress. New chapters will be added with time.<br/>
      </div>
      <hr/>
      <div>
        <b>Contents</b>
        <ul id="blog-posts" class="posts">
          {
            data.allMarkdownRemark.nodes.map(post => {
              return(
                <li><span class="is-family-monospace has-text-grey-light">&raquo;</span> <Link to={`/scala-intro/${post.fields.slug}`}>{post.frontmatter.title}</Link></li>
              )
            })
          }
        </ul>
      </div>
    </div>
  </Layout>

export const query = graphql`
  {
    allMarkdownRemark(filter: {frontmatter: {section: {eq: "scala-intro"}}}, sort: {fields: fields___slug, order: ASC}) {
      nodes {
        frontmatter {
          title
        }
        fields {
          date(formatString: "MMM DD, YYYY")
          slug
        }
      }
    }
  }
`

export default IndexPage
