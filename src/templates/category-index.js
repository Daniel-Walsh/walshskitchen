import React from "react"
import Layout from "../components/layout"
import RecipeGrid from "../components/recipe-grid"
import SEO from "../components/seo"
import { makeTitle } from "../global-functions"

const CategoryIndex = ({ data, location, pageContext }) => {
  const { category, glob } = pageContext
  return (
    <Layout>
      <SEO title={`Category: "${makeTitle(category)}" | Recipes`} />
      <h1>Recipes</h1>
      <div className="text-secondary h5 mt-n4 mb-4">
        Category: {makeTitle(category)}
      </div>
      <RecipeGrid recipes={data.recipes.edges} />
    </Layout>
  )
}

export default CategoryIndex

export const pageQuery = graphql`
  query($glob: String) {
    recipes: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { glob: $glob } }
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
