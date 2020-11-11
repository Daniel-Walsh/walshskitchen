import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { getPathFromFilepath } from "../global-functions"

import Card from "../components/card"
import RecipeGrid from "../components/recipe-grid"

const RecipesPage = ({ data, location }) => {
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

export default RecipesPage

export const pageQuery = graphql`
  query {
    allMarkdownRemark(
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
