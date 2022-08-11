const path = require(`path`)


exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type == 'MarkdownRemark') {
    const name = getNode(node.parent).name
    if (node.frontmatter.section == 'scala-intro') {
      createNodeField({ node, name: `slug`, value: name + '.html'})
    } else {
      const dateRegex = /(\d+-\d+-\d+).+/
      const date = dateRegex.exec(name)[1]

      createNodeField({
        node,
        name: `date`,
        value: date
      })

      createNodeField({ node, name: `slug`, value: name + '.html' })
    }
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const templatePath = path.resolve(`src/templates/PostTemplate.js`)

  const blogPages = await graphql(`
    {
      allMarkdownRemark(filter: {frontmatter: {section: {eq: null}}}, sort: {fields: fields___date, order: ASC}) {
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
  `)

  blogPages.data.allMarkdownRemark.edges.forEach((edge) => {
    createPage({
      path: `/posts/${edge.node.fields.slug}`,
      component: templatePath,
      context: {
        slug: edge.node.fields.slug,
        previousId: edge.previous && edge.previous.id,
        nextId: edge.next && edge.next.id,
        section: 'posts',
      },
    })
  })

  const scalaIntro = await graphql(`
    {
      allMarkdownRemark(filter: {frontmatter: {section: {eq: "scala-intro"}}}, sort: {fields: fields___date, order: ASC}) {
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
  `)

  scalaIntro.data.allMarkdownRemark.edges.forEach((edge) => {
    createPage({
      path: `/scala-intro/${edge.node.fields.slug}`,
      component: templatePath,
      context: {
        slug: edge.node.fields.slug,
        previousId: edge.previous && edge.previous.id,
        nextId: edge.next && edge.next.id,
        section: 'scala-intro',
      },
    })
  })
}
