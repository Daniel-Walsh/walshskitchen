import Img from "gatsby-image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/pro-regular-svg-icons";
import {
  faReply,
  faSalad,
  faListOl,
  faChevronCircleLeft,
} from "@fortawesome/pro-solid-svg-icons";
import Seo from "../components/seo";
import { graphql } from "gatsby";
import Link from "../components/link";
import { useMemo, useReducer, useRef, useState } from "react";
import classNames from "classnames";
import Footer from "../components/footer";
import Section from "../components/section";
import SectionHeading from "../components/section-heading";
import Header from "../components/header";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const Checkmark = ({ checked }) => {
  const icon = checked ? faCheckCircle : faCircle;
  const classes = classNames(
    "w-9 h-9 text-4xl leading-none",
    { "text-primary opacity-80 block": checked },
    { hidden: !checked }
  );

  const translateX = getRandomInt(-5, 5);
  const translateY = getRandomInt(-5, 5);
  const rotate = getRandomInt(-12, 12);
  const randomTransform = {
    transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
  };

  return (
    <>
      {useMemo(() => {
        return (
          <span className="fa-layers fa-fw w-9 h-9 relative">
            <FontAwesomeIcon
              icon={faCircle}
              className="text-gray-200 text-4xl leading-none w-9 h-9"
            />
            <span className="inline-block w-9 h-9" style={randomTransform}>
              <FontAwesomeIcon
                icon={faCircle}
                className={`${classes} animate-ping-once`}
              />
              <FontAwesomeIcon icon={icon} className={classes} />
            </span>
          </span>
        );
      }, [checked])}
    </>
  );
};

const Ingredient = ({ text, checked, callback }) => {
  const textClasses = classNames("ml-2 transition-opacity", {
    "opacity-50": checked,
  });

  return (
    <>
      {useMemo(() => {
        return (
          <div
            className="flex items-center py-2"
            style={{ cursor: "pointer" }}
            onClick={() => {
              callback();
            }}
          >
            <span className="rounded-full bg-transparent border-0 text-lg">
              <Checkmark checked={checked} />
            </span>
            <span className={textClasses}>{text}</span>
          </div>
        );
      }, [checked])}
    </>
  );
};

const Step = ({ number, text, checked, callback, isLast }) => {
  const textClasses = classNames("pl-3 transition-opacity", {
    "opacity-50": checked,
  });
  return (
    <>
      {useMemo(() => {
        return (
          <div
            className="flex relative pb-12"
            style={{ cursor: "pointer" }}
            onClick={() => {
              callback();
            }}
          >
            {!isLast && (
              <div className="flex absolute items-center justify-center w-9 inset-0">
                <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
              </div>
            )}
            <div className="inline-flex relative rounded-full bg-white w-9 h-9 flex-shrink-0">
              <Checkmark checked={checked} />
            </div>
            <div className={textClasses} style={{ flexGrow: 1 }}>
              <div className="uppercase text-sm font-bold text-primary">
                Step {number}
              </div>
              {text}
            </div>
          </div>
        );
      }, [checked])}
    </>
  );
};

const SectionInstructions = ({ text }) => {
  return (
    <div className="flex items-center mb-4 ml-3">
      <FontAwesomeIcon
        icon={faReply}
        className="text-gray-400 transform -rotate-90 scale-125"
      />
      <div className="ml-3">{text}</div>
    </div>
  );
};

const TagsList = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  return (
    <ul id="recipe-tags" className="flex flex-wrap list-none">
      {tags.map((tag, index) => (
        <li key={index}>
          <Link
            className="inline-block text-primary underline hover:no-underline bg-red-100 hover:bg-red-50 px-2 py-1 mb-2 mr-2 whitespace-nowrap rounded-lg transition-colors"
            to={`/tag/${tag}`}
          >
            #{tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const checklistReducer = (state, action) => {
  switch (action.type) {
    case "toggle checked":
      const newState = [...state];
      newState[action.index]["checked"] = action.value;
      return newState;

    case "reset list":
      const resetState = state.map((item) => {
        return {
          ...item,
          checked: false,
        };
      });
      return resetState;
  }
};

export default function Recipe({ data, location }) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  const [ingredients, ingredientsDispatch] = useReducer(
    checklistReducer,
    frontmatter.ingredients.map((ingredient) => {
      const [entryType, entryText] = ingredient.split("|");
      return { entryType, entryText, checked: false };
    })
  );
  const [directions, directionsDispatch] = useReducer(
    checklistReducer,
    frontmatter.directions.map((step) => {
      return {
        entryText: step,
        checked: false,
      };
    })
  );

  const resetClasses =
    "flex items-center justify-center transition-all duration-300 overflow-hidden";

  const ingredientsResetClasses = classNames(
    resetClasses,
    {
      "h-0 opacity-0": ingredients.filter((i) => i.checked).length === 0,
    },
    {
      "h-24 opacity-100": ingredients.filter((i) => i.checked).length > 0,
    }
  );

  const directionsResetClasses = classNames(
    resetClasses,
    {
      "h-0 opacity-0": directions.filter((i) => i.checked).length === 0,
    },
    {
      "h-24 opacity-100": directions.filter((i) => i.checked).length > 0,
    }
  );

  return (
    <div className="text-gray-800">
      <div>
        <Header />
        <div className="fixed hidden lg:block w-3/5 h-screen">
          <div className="relative">
            <Img
              alt={frontmatter.title}
              fluid={frontmatter.image.childImageSharp.fluid}
              className="min-w-full min-h-screen"
            />
            <div
              className="absolute inset-y-0 right-0 w-20 bg-primary opacity-90"
              style={{ clipPath: "polygon(60% 0, 100% 0, 100% 100%, 0 100%)" }}
            ></div>
          </div>
        </div>
        <div className="min-w-full lg:hidden relative">
          <Img
            alt={frontmatter.title}
            fluid={frontmatter.image.childImageSharp.fluid}
            className="max-h-96"
          />
          <div
            className="absolute inset-x-0 bottom-0 h-12 bg-primary opacity-90"
            style={{ clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 100%)" }}
          ></div>
        </div>
      </div>
      <div id="recipe-content" className="bg-white lg:w-2/5 lg:ml-auto">
        <div className="px-5 mx-auto max-w-md">
          <Seo title={frontmatter.title} />
          <div className="row">
            <div className="col">
              <Section>
                <h1 className="font-display text-4xl leading-snug mb-4 pt-10">
                  {frontmatter.title}
                </h1>
                <div
                  className="text-xl leading-normal mb-6"
                  dangerouslySetInnerHTML={{ __html: html }}
                ></div>
              </Section>

              <Section>
                {frontmatter.ingredients.length > 0 && (
                  <div id="recipe-ingredients" className="mb-5">
                    <SectionHeading text="Ingredients" icon={faSalad} />
                    <SectionInstructions text="Check off each of your ingredients before you get started!" />
                    {ingredients.map((ingredient, index) => {
                      switch (ingredient.entryType) {
                        case "heading":
                          return (
                            <div
                              key={index}
                              className="text-lg font-semibold mt-4 mb-2"
                            >
                              {ingredient.entryText}
                            </div>
                          );
                        case "item":
                          return (
                            <Ingredient
                              key={index}
                              text={ingredient.entryText}
                              checked={ingredient.checked}
                              callback={() => {
                                ingredientsDispatch({
                                  type: "toggle checked",
                                  index,
                                  value: !ingredient.checked,
                                });
                              }}
                            />
                          );
                      }
                    })}
                    <div className={ingredientsResetClasses}>
                      <button
                        className="btn-secondary mb-0"
                        onClick={() => {
                          ingredientsDispatch({ type: "reset list" });
                        }}
                      >
                        Reset ingredients
                      </button>
                    </div>
                  </div>
                )}
                <hr />
              </Section>

              <Section>
                {directions.length > 0 && (
                  <div id="recipe-directions">
                    <SectionHeading text="Directions" icon={faListOl} />
                    <SectionInstructions text="Time to get your hands dirty! Check off each step so you don’t lose you place." />
                    {directions.map((step, index) => (
                      <Step
                        key={index}
                        text={step.entryText}
                        number={index + 1}
                        checked={step.checked}
                        callback={() => {
                          directionsDispatch({
                            type: "toggle checked",
                            index,
                            value: !step.checked,
                          });
                        }}
                        isLast={index === frontmatter.directions.length - 1}
                      />
                    ))}
                  </div>
                )}
                <div className={directionsResetClasses}>
                  <button
                    className="btn-secondary"
                    onClick={() => {
                      directionsDispatch({ type: "reset list" });
                    }}
                  >
                    Reset directions
                  </button>
                </div>
                <hr />
              </Section>

              <Section>
                {frontmatter.servingSuggestion && (
                  <div
                    id="talking-bubble"
                    className="font-comic border-2 max-w-xs text-center border-gray-600 px-4 py-3 uppercase font-weight-bold text-uppercase relative rounded-3xl"
                  >
                    {frontmatter.servingSuggestion}
                  </div>
                )}
                <img className="ml-8" src="/dan-explain.svg" alt="" />
              </Section>

              <Section>
                <div className="bg-gray-100 rounded-lg p-4">
                  <p className="mb-2">Find more recipes tagged under:</p>
                  <TagsList tags={frontmatter.tags} />
                </div>
              </Section>

              <Section>
                <div className="text-center">
                  <Link to="/" className="btn-primary">
                    <FontAwesomeIcon
                      className="mr-3"
                      icon={faChevronCircleLeft}
                    />
                    Head back to the recipe list
                  </Link>
                </div>
              </Section>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
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
