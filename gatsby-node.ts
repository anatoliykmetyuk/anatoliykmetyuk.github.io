import { CreateNodeArgs, CreatePagesArgs, CreateSchemaCustomizationArgs } from "gatsby"
import path from "path"

exports.createSchemaCustomization = ({ actions }: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions;
  const typeDefs = `
    type MarkdownRemark {
      fields: MarkdownRemarkFields!
      frontmatter: Frontmatter!
      html: String!
    }

    type MarkdownRemarkFields {
      slug: String!
    }

    type Frontmatter {
      title: String!
    }
  `;
  createTypes(typeDefs);
};

exports.onCreateNode = ({ node, actions, getNode }: CreateNodeArgs) => {
  const { createNodeField } = actions
  if (node.internal.type == 'MarkdownRemark') {
    const name = getNode(node.parent!)!.name as string  // MarkdownRemark always inherits from File, type system doesn't capture this
    const dateRegex = /(\d+-\d+-\d+).+/
    const date = dateRegex.exec(name)?.[1]
    if (!date) throw new Error('Failed to parse date from MarkdownRemark node ' + node)

    createNodeField({ node,
      name: `date`,
      value: date
    })
    createNodeField({ node,
      name: `slug`,
      value: name + '.html'
    })
  }
}

exports.createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions

  const templatePath = path.resolve(`src/templates/PostTemplate.tsx`)

  const blogPages = await graphql<Queries.AllBlogPostsQuery>(`
    query AllBlogPosts {
      allMarkdownRemark(sort: {fields: fields___date, order: ASC}) {
        edges {
          node {
            fields {
              slug
            }
          }
          next {
            id
          }
          previous {
            id
          }
        }
      }
    }
  `);

  if (!blogPages.data) throw new Error('Failed to query blog posts ' + blogPages.errors);

  blogPages.data.allMarkdownRemark.edges.forEach((edge) => {
    createPage({
      path: `/posts/${edge.node.fields!.slug}`,
      component: templatePath,
      context: {
        slug: edge.node.fields!.slug,
        previousId: edge.previous && edge.previous.id,
        nextId: edge.next && edge.next.id,
      },
    })
  })
}
