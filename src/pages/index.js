import * as React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"


// markup
const IndexPage = ({ data }) =>
  <Layout>
    <div>
      <h1 class="title">📝 Blog Posts</h1>
      <ul id="blog-posts" class="posts">
        {
          data.allMarkdownRemark.nodes.map(post => {
            return(
              <li><span class="is-family-monospace">{post.fields.date} &raquo;</span> <Link to={`/posts/${post.fields.slug}`}>{post.frontmatter.title}</Link></li>
            )
          })
        }
      </ul>
    </div>
  </Layout>

export const query = graphql`
  {
    allMarkdownRemark(sort: {fields: fields___date, order: DESC}) {
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
