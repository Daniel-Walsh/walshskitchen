/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql, Link } from "gatsby"
// import Img from "gatsby-image"

// import Header from "./header"
import "./layout.scss"
import Logo from "./image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUtensils } from "@fortawesome/pro-regular-svg-icons"
// import TransitionLink from "gatsby-plugin-transition-link"
// import AniLink from "gatsby-plugin-transition-link/AniLink"
import FadeLink from "./fade-link"
import { makeTitle } from "../global-functions"

// const makeTitle = slug => {
//   return slug.charAt(0).toUpperCase() + slug.split("-").join(" ").slice(1)
// }

const TagList = ({ format }) => {
  // const data = useStaticQuery(graphql`
  //   query {
  //     allMarkdownRemark(filter: { frontmatter: { tags: { ne: null } } }) {
  //       edges {
  //         node {
  //           frontmatter {
  //             tags
  //           }
  //         }
  //       }
  //     }
  //   }
  // `)

  // const recipes = data.allMarkdownRemark.edges
  // let recipeTags = {}

  // recipes.forEach(recipe => {
  //   recipe.node.frontmatter.tags.forEach(tag => {
  //     recipeTags[tag] = recipeTags.hasOwnProperty(tag) ? recipeTags[tag] + 1 : 1
  //   })
  // })
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark {
        edges {
          node {
            fileAbsolutePath
          }
        }
      }
    }
  `)

  const recipes = data.allMarkdownRemark.edges
  // let categories = {}

  // let categories = recipes.map(recipe => {
  //   return recipe.node.fileAbsolutePath
  //     .split("/src/pages/recipes/")[1]
  //     .split("/")[0]
  // })

  // categories = [...new Set(categories)]

  // recipes.forEach(recipe => {
  //   recipe.node.frontmatter.tags.forEach(tag => {
  //     categories[tag] = categories.hasOwnProperty(tag) ? categories[tag] + 1 : 1
  //   })
  // })

  let categoryItems = {}

  recipes.forEach(recipe => {
    const catName = recipe.node.fileAbsolutePath
      .split("/src/pages/recipes/")[1]
      .split("/")[0]

    categoryItems[catName] = categoryItems.hasOwnProperty(catName)
      ? categoryItems[catName] + 1
      : 1
  })

  // return (
  //   // <div className="d-flex flex-wrap justify-content-center">
  //   <div className="list-group w-100">
  //     {categories
  //       .sort((a, b) => a.localeCompare(b))
  //       .map((category, id) => {
  //         return (
  //           <FadeLink
  //             key={id}
  //             className={`list-group-item list-group-item-action`}
  //             to={`/category/${category}`}
  //           >
  //             {makeTitle(category)}
  //           </FadeLink>
  //         )
  //       })}
  //   </div>
  // )

  let containerClasses = ""
  let itemClasses = ""

  if (format === "dropdown") {
    containerClasses = "dropdown-menu"
    itemClasses = "dropdown-item"
  }
  if (format === "list-group") {
    containerClasses = "list-group w-100"
    itemClasses = "list-group-item list-group-item-action"
  }

  const listGroupItemClasses = `${itemClasses} d-flex justify-content-between align-items-center`

  return (
    <div className={`${containerClasses}`} aria-labelledby="dropdownMenuButton">
      <Link
        className={listGroupItemClasses}
        to={`/recipes`}
        activeClassName="active"
      >
        Latest recipes
      </Link>
      <Link
        className={listGroupItemClasses}
        to={`/about`}
        activeClassName="active"
      >
        About this site
      </Link>
      <div class="dropdown-divider"></div>
      {Object.keys(categoryItems)
        .sort((a, b) => a.localeCompare(b))
        .map((key, value) => {
          return (
            <Link
              activeClassName="active"
              key={key}
              className={listGroupItemClasses}
              to={`/category/${key}`}
            >
              {makeTitle(key)}{" "}
              <span className="badge badge-pill badge-secondary ml-5">
                {categoryItems[key]}
              </span>
            </Link>
          )
        })}
    </div>
  )
  // return (
  //   <div className="d-flex flex-wrap justify-content-center">
  //     {Object.keys(recipeTags)
  //       .sort((a, b) => a.localeCompare(b))
  //       .map((key, value) => {
  //         return (
  //           <FadeLink
  //             key={key}
  //             className={`btn btn-sm btn-grey mb-1 mr-1`}
  //             to={`/tags/${key}`}
  //           >
  //             #{key}{" "}
  //             <span className="badge badge-pill badge-secondary">
  //               {recipeTags[key]}
  //             </span>
  //           </FadeLink>
  //         )
  //       })}
  //   </div>
  // )
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
    <div className="bg-light">
      {/* <Header siteTitle={data.site.siteMetadata?.title || `Title`} /> */}
      <main className="container">
        <div className="row d-lg-none border-bottom">
          <div className="col py-2">
            <div class="dropdown">
              <button
                class="border-secondary btn btn-outline-secondary navbar-toggler dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="d-none d-sm-inline">Le menu</span>
                <span className="navbar-toggler-icon d-block d-sm-none"></span>
              </button>
              {/* <div class="dropdown-menu" aria-labelledby="dropdownMenuButton"> */}
              {/* <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <a class="dropdown-item" href="#">
                  Something else here
                </a> */}
              <TagList format="dropdown" />
              {/* </div> */}
            </div>
            <FadeLink
              to="/"
              className="my-3 mx-auto d-block position-absolute"
              style={{
                width: "275px",
                maxWidth: "200px",
                height: "44px",
                left: "50%",
                top: 0,
                transform: "translateX(-50%)",
              }}
            >
              <Logo notag />
            </FadeLink>
          </div>
        </div>
        <div className="row">
          <div className="col-3 my-5  d-none d-lg-flex flex-column align-items-center">
            <FadeLink to="/" className="mb-5 d-block">
              <Logo />
            </FadeLink>
            {/* <div>
              <FadeLink to="/recipes" className="btn btn-primary mb-5">
                <FontAwesomeIcon icon={faUtensils} className="mr-2" />
                Browse all recipes
              </FadeLink>
            </div> */}
            {/* <p className="h5 mb-3">
              <FontAwesomeIcon icon={faUtensils} className="mr-2" />
              Categories
            </p> */}
            <TagList format="list-group" />
          </div>
          <div className="col-12 col-lg-9 my-3 my-md-5">{children}</div>
        </div>
      </main>
      <footer className="d-flex justify-content-center py-5 px-3">
        <div>
          &copy; {new Date().getFullYear()}, Built by{" "}
          <a href="https://dwalsh.dev/">Dan Walsh</a> with
          {` `}
          <a href="https://www.gatsbyjs.com">Gatsby</a>
        </div>
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
