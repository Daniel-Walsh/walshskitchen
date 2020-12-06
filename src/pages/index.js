import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import FadeLink from "../components/fade-link"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>
      <span className="mr-2" role="img">
        🍛
      </span>
      Welcome to the kitchen
    </h1>
    <p>
      Praesent ut ligula non mi varius sagittis. Vivamus consectetuer hendrerit
      lacus. Phasellus blandit leo ut odio. Vestibulum eu odio. Phasellus
      gravida semper nisi.
    </p>
    <p>Nam at tortor in tellus interdum sagittis. Fusce a quam.</p>
    <h2>Have you tried...</h2>
    <p>Display latest recipe here</p>
    <p>big image</p>

    <FadeLink to="/recipes/">Go to Recipes</FadeLink>
  </Layout>
)

export default IndexPage
