module.exports = {
  siteMetadata: {
    title: `Anatolii's Programming Blog`,
    siteUrl: `https://www.akmetiuk.com`,
    titleTemplate: "%s · Anatolii's Programming Blog",
    description:
      "I'm Anatolii, Scala programmer, Compiler Engineer at LAMP/EPFL supporting the Scala 3 effort.",
    url: "https://www.akmetiuk.com", // No trailing slash allowed!
    image: "/images/avatar.jpg", // Path to the image placed in the 'static' folder, in the project's root directory.
    github: "anatoliykmetyuk",
    linkedin: "akmetiuk",
    twitter: "akmetiuk",
  },
  plugins: [
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    "gatsby-plugin-mdx",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-plugin-sass",
    "gatsby-transformer-sharp",
    "gatsby-plugin-fontawesome-css",
    "gatsby-plugin-catch-links",

    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: "GTM-MGZJP4K",
        includeInDevelopment: false,
      },
    },

    {
      resolve: "gatsby-transformer-remark",
      options: {
        plugins: [
          `gatsby-remark-graphviz`,
          `gatsby-remark-plantuml-lite`,
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              tight: true,
              fromHeading: 1,
            }
          },
          `gatsby-remark-autolink-headers`,  // Must go before prismjs to avoid https://github.com/gatsbyjs/gatsby/issues/5764 – see docs
          `gatsby-remark-prismjs`,
        ]
      }
    },
    {
      resolve: "gatsby-plugin-social9-socialshare",
      options: {
        content:  "8d8a4787d537487d991c279d63daa2fa",
        async: true,
        defer: true
      }
    },

    {
      resolve: "gatsby-source-filesystem",
      options: {
        "name": "pages",
        "path": "./src/pages/"
      },
    __key: "pages"
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: "./posts/",
      }
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "scala-intro",
        path: "./scala-intro/",
      }
    }
  ]
};