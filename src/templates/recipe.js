import React from "react"
import Layout from "../components/layout"
import Img from "gatsby-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faJug,
  faEgg,
  faSack,
  faCarrot,
  faLeaf,
  faHatChef,
  faWineBottle,
  faFish,
  faWheat,
  faQuestionCircle,
  faPepperHot,
  faCauldron,
  faMeat,
  faSteak,
  faSoup,
  faInfoCircle,
  faTint,
  faCube,
} from "@fortawesome/pro-regular-svg-icons"

const getIngredientIcon = ingredient => {
  if (["milk"].includes(ingredient)) {
    return faJug
  }
  if (["egg"].includes(ingredient)) {
    return faEgg
  }
  if (["sugar"].includes(ingredient)) {
    return faSack
  }
  if (["carrot", "onion", "mushroom", "garlic"].includes(ingredient)) {
    return faCarrot
  }
  if (["parsley", "mint", "herbs"].includes(ingredient)) {
    return faLeaf
  }
  if (["salt", "pepper", "spice"].includes(ingredient)) {
    return faHatChef
  }
  if (["vinegar", "wine", "oil", "sauce"].includes(ingredient)) {
    return faWineBottle
  }
  if (["tuna", "fish"].includes(ingredient)) {
    return faFish
  }
  if (["rice", "breadcrumbs", "flour"].includes(ingredient)) {
    return faWheat
  }
  if (["capsicum"].includes(ingredient)) {
    return faPepperHot
  }
  if (["stock"].includes(ingredient)) {
    return faCauldron
  }
  if (["ham"].includes(ingredient)) {
    return faMeat
  }
  if (["beef"].includes(ingredient)) {
    return faSteak
  }
  if (["soup"].includes(ingredient)) {
    return faSoup
  }
  if (["water"].includes(ingredient)) {
    return faTint
  }
  if (["butter", "ghee"].includes(ingredient)) {
    return faCube
  }

  return faQuestionCircle
}

export default function Recipe({ data, location }) {
  const { markdownRemark } = data // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <div className="row mb-5">
        <div className="col-12 col-md-6 col-lg-6 order-2 order-md-1">
          <h1>{frontmatter.title}</h1>
          <div
            className="lead"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
          <p>
            <FontAwesomeIcon
              icon={faInfoCircle}
              className="mr-0 text-primary"
              style={{ width: "2.5ch" }}
            />{" "}
            Serving suggestion: {frontmatter.servingSuggestion}
          </p>

          {frontmatter.tags && frontmatter.tags.length > 0 && (
            <>
              <span className="h6 mr-2">Tags:</span>
              <ul id="recipe-tags" className="d-inline list-inline">
                {frontmatter.tags.map(tag => (
                  <li className="list-inline-item">
                    <span className="badge badge-pill badge-grey">#{tag}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="col-12 col-md-6 col-lg-5 offset-lg-1 order-1 order-md-2">
          <Img
            fluid={frontmatter.image.childImageSharp.fluid}
            className="rounded-xl shadow mw-100 mb-3 "
          />
        </div>
      </div>

      <hr />

      <div className="row my-5">
        <div className="col-12 col-lg-8 offset-lg-2">
          {frontmatter.ingredients.length > 0 && (
            <div id="recipe-ingredients">
              <h2 className="h3">Ingredients</h2>
              <ul className="list-unstyled">
                {frontmatter.ingredients.map(ingredient => {
                  let ingredientIcon, ingredientDesc
                  let isHeading = false
                  if (ingredient.indexOf("|") === -1) {
                    ingredientIcon = getIngredientIcon("")
                    ingredientDesc = ingredient
                  } else {
                    if (ingredient.split("|")[0] === "heading") {
                      isHeading = true
                    }

                    ingredientIcon = getIngredientIcon(ingredient.split("|")[0])
                    ingredientDesc = ingredient.split("|")[1]
                  }

                  return (
                    <li className="position-relative mb-2">
                      <FontAwesomeIcon
                        icon={ingredientIcon}
                        className={`position-absolute top-0 mr-3 text-primary ${
                          isHeading && `d-none`
                        }`}
                        style={{ width: "2.5ch", top: ".2rem", left: "-.2rem" }}
                      />
                      {(isHeading && (
                        <span className="h5">{ingredientDesc}</span>
                      )) || <p className="ml-4">{ingredientDesc}</p>}
                    </li>
                  )
                })}
              </ul>
            </div>
          )}
        </div>
      </div>

      <hr />

      <div className="row my-5">
        <div className="col-12 col-lg-8 offset-lg-2">
          {frontmatter.directions.length > 0 && (
            <div id="recipe-directions">
              <h2 className="h3">Directions</h2>
              <ol className="list-unstyled">
                {frontmatter.directions.map((step, index) => (
                  <li class="mb-4">
                    <div className="text-uppercase small font-weight-bolder text-primary">
                      Step {index + 1}
                    </div>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>

      <hr />
    </Layout>
  )
}

export const pageQuery = graphql`
  query($fileAbsolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        ingredients
        directions
        servingSuggestion
        tags
        image {
          childImageSharp {
            fluid(maxWidth: 450, maxHeight: 450, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
