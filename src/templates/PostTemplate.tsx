import * as React from "react"
import { graphql, HeadProps, Link, PageProps } from "gatsby"
import { Script } from "gatsby"

import Layout from "../components/Layout"
import Seo from "../components/SEO"


const PostTemplate = ({ data }: PageProps<Queries.PostTemplateQuery>) => {
  const post = data.markdownRemark;
  const { previous, next } = data;
  if (!post) return (
    <Layout>
      <p>Post not found.</p>
    </Layout>
  );

  function formatNavTitle(str: string) {
    const limit = 20;
    return str.length > limit ? `${str.substring(0, limit)}...` : str;
  }

  return (
    <Layout>
      <div className="content p-3">
        <div className="level is-mobile">
          <div className="level-left">
            {" "}
            <p className="level-item has-text-grey-light">
              {post.fields.date}
            </p>
          </div>
          <div className="level-right">
            <p className="level-item">
              <Link to="/">🏠</Link>
            </p>
          </div>
        </div>

        <h1>
          <b>{post.frontmatter.title}</b>
        </h1>
        <article dangerouslySetInnerHTML={{ __html: post.html! }} />

        <div className="box mt-3 has-background-info-light">
          <div className="level">
            <div className="level-item">
              <div className="s9-widget-wrapper" />
            </div>
          </div>

          <div className="level m-2">
            <div className="level-item">
              {previous && (
                <Link to={`/posts/${previous.fields.slug}`}>
                  <button className="button is-link-light">
                    ⬅️ {formatNavTitle(previous.frontmatter.title)}
                  </button>
                </Link>
              )}
            </div>
            <div className="level-item">
              {next && (
                <Link to={`/posts/${next.fields.slug}`}>
                  <button className="button is-link-light">
                    {formatNavTitle(next.frontmatter.title)} ➡️
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const Head = ({ location, data }: HeadProps<Queries.PostTemplateQuery>) => {
  const post = data.markdownRemark;
  const { pathname } = location;

  return (
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

      { post && <Seo
        pathname={pathname}
        title={post.frontmatter.title}
        description={post.frontmatter.description}
        article={true}
        image={post.frontmatter.image}
        />
      }
    </>
  );
}

export const query = graphql`
  query PostTemplate(
    $slug: String!
    $previousId: String
    $nextId: String
  ) {
    markdownRemark(fields: {slug: {eq: $slug}}) {
      frontmatter {
        title
        description
        image
      }
      fields {
        date(formatString: "MMM DD, YYYY")
      }
      html
    }
    previous: markdownRemark(id: { eq: $previousId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

export default PostTemplate
