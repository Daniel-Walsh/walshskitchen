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

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      {/* <Header siteTitle={data.site.siteMetadata?.title || `Title`} /> */}
      <main className="container">
        <div className="row">
          <div className="col-3 my-5 d-flex flex-column align-items-center">
            <Link to="/" className="mb-5 d-block">
              <Logo />
            </Link>
            <div>
              <Link to="/recipes" className="btn btn-outline-primary mb-5">
                <FontAwesomeIcon icon={faUtensils} className="mr-2" />
                Browse recipes
              </Link>
            </div>
            <ul className="list-unstyled">
              <li>Menu item</li>
              <li>Menu item</li>
              <li>Menu item</li>
            </ul>
          </div>
          <div className="col-9 my-5">{children}</div>
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
