// import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import RecipeGrid from "../components/recipe-grid"
import { graphql } from "gatsby"

const RecipesPage = ({ data, location }) => {
  return (
    <Layout>
      <Seo title="Latest recipes" />
      <h1 className="mb-5">Recipes</h1>
      <RecipeGrid recipes={data.recipes.edges} />
    </Layout>
  )
}

export default RecipesPage

export const pageQuery = graphql`
  query {
    recipes: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/recipes/" } }
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
