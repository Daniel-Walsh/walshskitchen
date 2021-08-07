import Img from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/pro-regular-svg-icons";
import {
  faReply,
  faSalad,
  faListOl,
  faCircle as faCircleSolid,
} from "@fortawesome/pro-solid-svg-icons";
import Seo from "../components/seo";
import { graphql, Link } from "gatsby";
import { useState } from "react";
import classNames from "classnames";
import Footer from "../components/footer";
import Section from "../components/section";
import SectionHeading from "../components/section-heading";

const Ingredient = ({ text }) => {
  const [checked, setChecked] = useState(false);
  const icon = checked ? faCheckCircle : faCircle;
  const classes = classNames(
    { "text-primary": checked },
    { "text-grey": !checked }
  );
  const handleClick = () => {
    setChecked(!checked);
  };
  return (
    <div className="d-flex align-items-center pb-1">
      <span
        onClick={() => {
          handleClick();
        }}
        className="rounded-circle bg-transparent border-0 lead"
      >
        <FontAwesomeIcon
          className={classes}
          icon={icon}
          style={{ width: "2.25rem", height: "2.25rem" }}
        />
      </span>
      <span
        className="ml-2"
        style={{ cursor: "pointer" }}
        onClick={() => {
          handleClick();
        }}
      >
        {text}
      </span>
    </div>
  );
};

const Step = ({ number, text, isLast }) => {
  const [checked, setChecked] = useState(false);
  const icon = checked ? faCheckCircle : faCircle;
  const iconClasses = classNames(
    "w-100 h-100",
    { "text-primary": checked },
    { "text-grey": !checked }
  );
  const textClasses = classNames("pl-3", { "text-muted": checked });
  const handleClick = () => {
    setChecked(!checked);
  };
  return (
    <div className="d-flex position-relative pb-5">
      {!isLast && (
        <div
          className="d-flex position-absolute align-items-center justify-content-center"
          style={{
            width: "2.5rem",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        >
          <div
            className="h-100 w-1 bg-grey pointer-events-none"
            style={{ width: ".25rem" }}
          ></div>
        </div>
      )}
      <div
        className="d-inline-flex position-relative rounded-circle bg-white"
        style={{
          width: "2.5rem",
          height: "2.5rem",
          flexShrink: 0,
        }}
        onClick={() => {
          handleClick();
        }}
      >
        <FontAwesomeIcon icon={icon} className={iconClasses} />
      </div>
      <div
        className={textClasses}
        style={{ flexGrow: 1 }}
        onClick={() => {
          handleClick();
        }}
      >
        <div className="text-uppercase small font-weight-bolder text-primary">
          Step {number}
        </div>
        {text}
      </div>
    </div>
  );
};

const SectionInstructions = ({ text }) => {
  return (
    <div className="d-flex align-items-center mb-3 ml-2">
      <FontAwesomeIcon
        icon={faReply}
        style={{ transform: "rotate(-90deg)", opacity: 0.4 }}
      />
      <div className="ml-2">{text}</div>
    </div>
  );
};

export default function Recipe({ data, location }) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <>
      <div className="">
        <div className="position-fixed ml-4 mt-4" style={{ zIndex: 1 }}>
          <Link to="/">
            <img src="/logo-round.svg" width="64" heigt="64" />
          </Link>
        </div>
        <div
          className="position-fixed d-none d-lg-block"
          style={{ width: "60%", height: "100vh" }}
        >
          <Img
            fluid={frontmatter.image.childImageSharp.fluid}
            className="d-none d-lg-block mw-100 min-vh-100"
          />
        </div>
        <Img
          fluid={frontmatter.image.childImageSharp.fluid}
          className="mw-100 d-lg-none"
          style={{ maxHeight: "500px" }}
        />
      </div>
      <div id="recipe-content" className="ml-lg-auto bg-white">
        <div className="px-3 mx-auto" style={{ maxWidth: "480px" }}>
          <Seo title={`${frontmatter.title} | Recipes`} />
          <div className="row">
            <div class="col">
              <Section>
                <h1>{frontmatter.title}</h1>
                <div
                  className="lead"
                  dangerouslySetInnerHTML={{ __html: html }}
                ></div>

                {frontmatter.tags && frontmatter.tags.length > 0 && (
                  <ul id="recipe-tags" className="d-inline list-inline">
                    {frontmatter.tags.map((tag, index) => (
                      <li key={index} className="list-inline-item">
                        <span className="badge badge-pill badge-grey">
                          <Link to={`/tags/${tag}`}>#{tag}</Link>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </Section>

              <Section>
                {frontmatter.ingredients.length > 0 && (
                  <div id="recipe-ingredients">
                    <SectionHeading text="Ingredients" icon={faSalad} />
                    <SectionInstructions text="Check off each of your ingredients before you get started!" />
                    {frontmatter.ingredients.map((ingredient, index) => {
                      const [entryType, entryText] = ingredient.split("|");
                      switch (entryType) {
                        case "heading":
                          return (
                            <div className="lead font-weight-bold mt-3 mb-1">
                              {entryText}
                            </div>
                          );
                        case "item":
                          return <Ingredient text={entryText} />;
                      }
                    })}
                  </div>
                )}
              </Section>

              <Section>
                {frontmatter.directions.length > 0 && (
                  <div id="recipe-directions">
                    <SectionHeading text="Directions" icon={faListOl} />
                    <SectionInstructions text="Time to get your hands dirty! Check off each step so you don’t lose you place." />
                    {frontmatter.directions.map((step, index) => (
                      <Step
                        key={index}
                        text={step}
                        number={index + 1}
                        isLast={index === frontmatter.directions.length - 1}
                      />
                    ))}
                  </div>
                )}
              </Section>

              {frontmatter.servingSuggestion && (
                <div
                  id="talking-bubble"
                  className="border border-dark rounded-xl p-3 lead text-uppercase position-relative"
                >
                  {frontmatter.servingSuggestion}
                </div>
              )}
              <img src="/dan.svg" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export const pageQuery = graphql`
  query ($fileAbsolutePath: String!) {
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
`;
