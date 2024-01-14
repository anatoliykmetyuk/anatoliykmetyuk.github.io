import * as React from "react"
import { graphql, HeadProps, Link, PageProps } from "gatsby"

import Layout from "../components/Layout"
import Header from "../components/Header"


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

export const Head = ({ location: { pathname }, data }: HeadProps<Queries.PostTemplateQuery>) =>
  <Header pathname={pathname} post={data.markdownRemark?.frontmatter} />

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
