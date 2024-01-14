import React from "react"
import { graphql, HeadProps, Link, PageProps } from "gatsby"

import Layout from "../components/Layout";
import Header from "../components/Header";


// markup
const IndexPage = ({ data }: PageProps<Queries.IndexQuery>) =>
  <Layout>
    <div>
      <h1 className="title">📝 Blog Posts</h1>
      <ul id="blog-posts" className="posts">
        {
          data.allMarkdownRemark.nodes.map(post => {
            return(
              <li><span className="is-family-monospace has-text-grey-light">{post.fields.date} &raquo;</span> <Link to={`/posts/${post.fields.slug}`}>{post.frontmatter.title}</Link></li>
            )
          })
        }
      </ul>
    </div>
  </Layout>

export const Head = ({ location: { pathname } }: HeadProps) =>
  <Header pathname={pathname} />

export const query = graphql`
  query Index {
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
