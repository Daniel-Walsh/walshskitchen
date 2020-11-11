import React from "react"
import { getPathFromFilepath } from "../global-functions"
import Card from "./card"

const RecipeGrid = ({ recipes }) => {
  return (
    <div className="row">
      {recipes.map(({ node }) => (
        <Card
          key={node.id}
          image={node.frontmatter.image.childImageSharp.fluid}
          title={node.frontmatter.title}
          content={node.html}
          link={getPathFromFilepath(node.fileAbsolutePath)}
          tags={node.frontmatter.tags}
        />
      ))}
    </div>
  )
}

export default RecipeGrid
