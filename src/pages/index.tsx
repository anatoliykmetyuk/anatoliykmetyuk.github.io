import React from "react"
import { graphql, HeadProps, Link, PageProps, Script } from "gatsby"

import Layout from "../components/Layout";
import Seo from "../components/SEO";


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

export const Head = ({ location: { pathname } }: HeadProps) => (
  <>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      integrity="sha512-9usAa10IRO0HhonpyAIVpjrylPvoDwiPUiKdWk5t3PyolY1cOd4DSE0Ga+ri4AuTroPR5aQvXU9xC6qOPnzFeg=="
      crossOrigin="anonymous"
      referrerPolicy="no-referrer"
    />
    <Script
      defer
      data-domain="akmetiuk.com"
      src="https://plausible.cloud.akmetiuk.com/js/script.js"
    />

    <Seo pathname={pathname} />
  </>
);

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
