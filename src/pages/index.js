import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import FadeLink from "../components/fade-link"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Welcome to the kitchen</h1>
    <p>
      Way back when, I was originally going to write a family recipe cook book,
      but creating an online family recipe cook book is so much easier than
      publishing a physical book.
    </p>
    <p>
      The recipes entailed here are a collection of some of our family’s
      happiest moments shared around the dinner table. Some are Walsh Originals
      while others are favourites that have been clipped from magazines and
      websites and adopted into our regular meal rotations.
    </p>
    <p>
      This is for my amazing, crazy, loving family — whom none of which have any
      idea why a weirdo with food issues like me would want to write a recipe
      book.
    </p>
    <p>I love you all.</p>
    <p>– Dan</p>

    <FadeLink className="btn btn-primary btn-large" to="/recipes/">
      Let's get cooking!
    </FadeLink>
  </Layout>
)

export default IndexPage
