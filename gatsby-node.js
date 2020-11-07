/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const { getPathFromFilepath } = require("./src/global-functions")

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const pageTemplate = require.resolve(`./src/templates/page.js`)
  //   const releaseTemplate = require.resolve(`./src/templates/release.js`)
  const recipeTemplate = require.resolve(`./src/templates/recipe.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fileAbsolutePath
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    // const path = node.fileAbsolutePath.split("/src/pages")[1].replace(".md", "")
    const path = getPathFromFilepath(node.fileAbsolutePath)

    let component = pageTemplate
    if (path.indexOf("/releases/") === 0) {
      component = releaseTemplate
    }
    if (path.indexOf("/recipes/") === 0) {
      component = recipeTemplate
    }

    createPage({
      path: path,
      component: component,
      context: {
        // additional data can be passed via context
        // slug: path,
        fileAbsolutePath: node.fileAbsolutePath,
      },
    })
  })
}
