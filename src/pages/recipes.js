import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { getPathFromFilepath } from "../global-functions"

const RecipesPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
  location,
}) => {
  const Posts = edges
    // .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => (
      <div>
        <Link to={getPathFromFilepath(edge.node.fileAbsolutePath)}>
          {edge.node.frontmatter.title}
        </Link>
      </div>
      // <Card
      //   key={edge.node.id}
      //   post={edge.node}
      //   title={edge.node.frontmatter.title}
      //   path={getPathFromFilepath(edge.node.fileAbsolutePath)}
      //   date={edge.node.frontmatter.date}
      //   image={edge.node.frontmatter.image}
      // />
    ))
  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div> */}
      <div>{Posts}</div>
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
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            title
          }
          fileAbsolutePath
        }
      }
    }
  }
`
