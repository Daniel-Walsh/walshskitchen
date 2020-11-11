/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
import Img from "gatsby-image"

import Header from "./header"
import "./layout.scss"
import Logo from "./image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUtensils } from "@fortawesome/pro-regular-svg-icons"

const TagList = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { frontmatter: { tags: { ne: null } } }) {
        edges {
          node {
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `)

  const recipes = data.allMarkdownRemark.edges
  let recipeTags = {}

  recipes.forEach(recipe => {
    recipe.node.frontmatter.tags.forEach(tag => {
      recipeTags[tag] = recipeTags.hasOwnProperty(tag) ? recipeTags[tag] + 1 : 1
    })
  })

  console.log(recipeTags)

  return (
    <div className="d-flex flex-wrap justify-content-center">
      {Object.keys(recipeTags)
        .sort((a, b) => a.localeCompare(b))
        .map((key, value) => {
          return (
            <a
              key={key}
              className="btn btn-sm btn-outline-dark mb-1 mr-1"
              href="#"
            >
              #{key}{" "}
              <span className="badge badge-pill badge-secondary">
                {recipeTags[key]}
              </span>
            </a>
          )
        })}
    </div>
  )
}

const Layout = ({ children }) => {
  // const data = useStaticQuery(graphql`
  //   query SiteTitleQuery {
  //     site {
  //       siteMetadata {
  //         title
  //       }
  //     }
  //   }
  // `)

  return (
    <>
      {/* <Header siteTitle={data.site.siteMetadata?.title || `Title`} /> */}
      <main className="container">
        <div className="row">
          <div className="col-3 my-5  d-none d-lg-flex flex-column align-items-center">
            <Link to="/" className="mb-5 d-block">
              <Logo />
            </Link>
            <div>
              <Link to="/recipes" className="btn btn-primary mb-5">
                <FontAwesomeIcon icon={faUtensils} className="mr-2" />
                Browse recipes
              </Link>
            </div>
            <p>Tags</p>
            <TagList />
          </div>
          <div className="col-12 col-lg-9 my-5">{children}</div>
        </div>
      </main>
      <footer>
        © {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </footer>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
