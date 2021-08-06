import React from "react"
import Img from "gatsby-image"
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faHatChef, faArrowRight } from "@fortawesome/pro-regular-svg-icons"
// import FadeLink from "./fade-link"
import { Link } from "gatsby"

export default function Card({ image, title, content, link, tags }) {
  return (
    <div className="col-12 col-xxl-4 mb-4">
      <div className="card border-0 shadow-sm rounded-xl overflow-hidden">
        <div className="row no-gutters">
          <div className="col-12 col-md-5 col-xxl-12">
            <div
              className="d-none d-md-block d-xxl-none w-100 h-100"
              style={{ background: `50%/cover no-repeat url(${image.src})` }}
            ></div>
            <Img fluid={image} className="card-img-top d-md-none d-xxl-block" />
          </div>
          <div className="col-12 col-md-7 col-xxl-12 position-static">
            <div
              className="card-body d-flex flex-column"
              style={{ minHeight: "225px" }}
            >
              <div className="card-title h4">
                <Link className="stretched-link" to={link}>
                  {title}
                </Link>
              </div>
              <div dangerouslySetInnerHTML={{ __html: content }}></div>
              {/* <div class="mt-auto text-right"> */}
              <div class="text-right">
                <div>
                  {tags && tags.length > 0 && (
                    <ul id="recipe-tags" className="list-inline mb-0">
                      {tags.map(tag => (
                        <li className="list-inline-item mr-0 ml-2">
                          <span className="badge badge-pill badge-grey">
                            #{tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                {/* <FadeLink
                  className="btn btn-outline-primary btn-block "
                  to={link}
                >
                  <FontAwesomeIcon icon={faHatChef} className="mr-2" />
                  Cook this recipe
                  <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
                </FadeLink> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <div className="col-12 col-md-6 mb-5">
    //   <div className="card border-0 shadow-sm rounded-xl overflow-hidden h-100">
    //     <Img fluid={image} className="card-img-top" />
    //     <div className="card-body d-flex flex-column">
    //       <FadeLink className="card-title h5" to={link}>
    //         {title}
    //       </FadeLink>
    //       <div dangerouslySetInnerHTML={{ __html: content }}></div>
    //       <div class="mt-auto text-right">
    //         <div>
    //           {tags && tags.length > 0 && (
    //             <ul id="recipe-tags" className="list-inline">
    //               {tags.map(tag => (
    //                 <li className="list-inline-item">
    //                   <span className="badge badge-pill badge-grey">
    //                     #{tag}
    //                   </span>
    //                 </li>
    //               ))}
    //             </ul>
    //           )}
    //         </div>
    //         <FadeLink
    //           className="btn btn-outline-primary btn-block stretched-link"
    //           to={link}
    //         >
    //           <FontAwesomeIcon icon={faHatChef} className="mr-2" />
    //           Cook this recipe
    //           <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
    //         </FadeLink>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}
