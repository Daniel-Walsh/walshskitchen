import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="About" />
    <div className="row">
      <div className="col-6 mx-auto">
        <h1>To my dear family,</h1>
        <p>
          Way back when, I was originally going to write a family recipe cook
          book, but creating a family recipe{" "}
          <span className="font-italic">website</span> is so much easier than
          publishing a physical book.
        </p>
        <blockquote>
          The recipes enshrined here are a collection of some of our family’s{" "}
          <span className="text-primary font-italic">happiest moments</span>{" "}
          shared around the dinner table. Some are "Walsh Originals" while
          others are favourites that have been clipped from magazines and
          websites and adopted into our regular meal rotations.
        </blockquote>
        <p>
          This is for my amazing, crazy, loving family&mdash;whom none of which
          have any idea why a weirdo with food issues like me would want to
          write a book about food.
        </p>
        <p className="lead font-italic">I love you all.</p>
        <p className="lead font-italic">&mdash; Dan</p>
      </div>
    </div>
  </Layout>
)

export default NotFoundPage
