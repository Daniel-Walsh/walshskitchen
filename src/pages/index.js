import React from "react"
// import { Link } from "gatsby"

import Layout from "../components/layout"
// import Image from "../components/image"
import SEO from "../components/seo"
import FadeLink from "../components/fade-link"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>🍛 Welcome to the kitchen</h1>
    <p>
      Praesent ut ligula non mi varius sagittis. Vivamus consectetuer hendrerit
      lacus. Phasellus blandit leo ut odio. Vestibulum eu odio. Phasellus
      gravida semper nisi.
    </p>
    <p>Nam at tortor in tellus interdum sagittis. Fusce a quam.</p>
    <h2>Have you tried...</h2>
    <p>Display latest recipe here</p>
    <p>big image</p>

    {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div> */}
    <FadeLink to="/recipes/">Go to Recipes</FadeLink>
  </Layout>
)

export default IndexPage
