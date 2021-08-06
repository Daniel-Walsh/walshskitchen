// import React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
// import FadeLink from "../components/fade-link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faUtensils } from "@fortawesome/pro-regular-svg-icons"
import { Link } from "gatsby"

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <div className="row h-100">
      <div className="col py-5 text-center d-flex flex-column justify-content-center align-items-center">
        <h1>Welcome to the&nbsp;kitchen!</h1>
        <p className="lead">What are you waiting for?</p>
        <Link className="btn btn-primary btn-large" to="/recipes">
          <FontAwesomeIcon icon={faUtensils} className="mr-2" /> Let's get
          cooking!
        </Link>
      </div>
    </div>
  </Layout>
)

export default IndexPage
