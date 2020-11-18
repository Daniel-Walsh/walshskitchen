import React from "react"
import Img from "gatsby-image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faHatChef, faArrowRight } from "@fortawesome/pro-regular-svg-icons"
import FadeLink from "./fade-link"

export default function Card({ image, title, content, link, tags }) {
  return (
    <div className="col-12 col-md-6 mb-5">
      <div className="card border-0 shadow-sm rounded-xl overflow-hidden h-100">
        <Img fluid={image} className="card-img-top" />
        <div className="card-body d-flex flex-column">
          <FadeLink className="card-title h5" to={link}>
            {title}
          </FadeLink>
          <div dangerouslySetInnerHTML={{ __html: content }}></div>
          <div class="mt-auto text-right">
            <div>
              {tags && tags.length > 0 && (
                <ul id="recipe-tags" className="list-inline">
                  {tags.map(tag => (
                    <li className="list-inline-item">
                      <span className="badge badge-pill badge-grey">
                        #{tag}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <FadeLink
              className="btn btn-outline-primary btn-block stretched-link"
              to={link}
            >
              <FontAwesomeIcon icon={faHatChef} className="mr-2" />
              Cook this recipe
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </FadeLink>
          </div>
        </div>
      </div>
    </div>
  )
}
