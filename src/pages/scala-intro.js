import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/seo"


// markup
const IndexPage = ({ data }) =>
  <Layout>
    <Seo />
    <div>
      <h1 class="title">📖 Introduction to Programming with Scala </h1>
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
  </Layout>

export const query = graphql`
  {
    allMarkdownRemark(filter: {frontmatter: {section: {eq: "scala-intro"}}}, sort: {fields: fields___slug, order: DESC}) {
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
