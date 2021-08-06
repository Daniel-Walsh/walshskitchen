import { graphql } from "gatsby"
// import React from "react"
import Layout from "../components/layout"
import RecipeGrid from "../components/recipe-grid"
import Seo from "../components/seo"

const TagIndex = ({ data, location, pageContext }) => {
  const { tag } = pageContext
  return (
    <Layout>
      <Seo title={`Tag: "${tag}" | Recipes`} />
      <h1>Recipes</h1>
      <div className="text-secondary h5 mt-n4 mb-4">Tag: #{tag}</div>
      <RecipeGrid recipes={data.recipes.edges} />
    </Layout>
  )
}

export default TagIndex

export const pageQuery = graphql`
  query($tag: [String]) {
    recipes: allMarkdownRemark(
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
