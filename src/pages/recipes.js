import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { getPathFromFilepath } from "../global-functions"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHatChef, faArrowRight } from "@fortawesome/pro-regular-svg-icons"

const RecipesPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
  location,
}) => {
  const Posts = edges
    // .filter(edge => !!edge.node.frontmatter.date) // You can filter your posts based on some criteria
    .map(edge => (
      <div key={edge.node.id} className="col-12 col-md-6 mb-5">
        <div className="card border-0 shadow rounded-xl overflow-hidden h-100">
          <Img
            fluid={edge.node.frontmatter.image.childImageSharp.fluid}
            className="card-img-top"
          />
          <div className="card-body d-flex flex-column">
            <Link
              className="card-title h5"
              to={getPathFromFilepath(edge.node.fileAbsolutePath)}
            >
              {edge.node.frontmatter.title}
            </Link>
            <div dangerouslySetInnerHTML={{ __html: edge.node.html }}></div>
            <div class="mt-auto text-right">
              <div>
                {edge.node.frontmatter.tags &&
                  edge.node.frontmatter.tags.length > 0 && (
                    <ul id="recipe-tags" className="list-inline">
                      {edge.node.frontmatter.tags.map(tag => (
                        <li className="list-inline-item">
                          <span className="badge badge-pill badge-grey">
                            #{tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
              </div>
              <Link
                className="btn btn-outline-primary btn-block stretched-link"
                to={getPathFromFilepath(edge.node.fileAbsolutePath)}
              >
                <FontAwesomeIcon icon={faHatChef} className="mr-2" />
                Cook this recipe
                <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    ))
  return (
    <Layout>
      <SEO title="Recipes" />
      <h1>🍲 Recipes</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div> */}
      <div className="row">{Posts}</div>
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
