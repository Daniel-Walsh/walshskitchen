import React from "react"
import Card from "../components/card"
import Layout from "../components/layout"
import RecipeGrid from "../components/recipe-grid"
import SEO from "../components/seo"
import { getPathFromFilepath } from "../global-functions"

const RecipeIndex = ({ data, location }) => {
  return (
    <Layout>
      <SEO title="Recipes" />
      <h1>🍲 Recipes</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <RecipeGrid recipes={data.allMarkdownRemark.edges} />
    </Layout>
  )
}

export default RecipeIndex

export const pageQuery = graphql`
  query($tag: [String]) {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { tags: { in: $tag } } }
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          html
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            title
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 450, maxHeight: 300, cropFocus: CENTER) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fileAbsolutePath
        }
      }
    }
  }
`
