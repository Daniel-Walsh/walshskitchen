// Package imports
import { useEffect, useMemo, useReducer, useState } from "react";
import { Helmet } from "react-helmet";
import ReactMarkdown from "react-markdown";
import { graphql } from "gatsby";
import Img from "gatsby-image";
import classNames from "classnames";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/pro-regular-svg-icons";
import {
  faReply,
  faSalad,
  faListOl,
  faChevronCircleLeft,
} from "@fortawesome/pro-solid-svg-icons";

// Local imports
import Seo from "../components/seo";
import Link from "../components/link";
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
              size="1x"
              icon={faCircle}
              className="text-gray-200 text-4xl leading-none w-9 h-9"
            />
            <span className="inline-block w-9 h-9" style={randomTransform}>
              <FontAwesomeIcon
                size="1x"
                icon={faCircle}
                className={`${classes} animate-ping-once`}
              />
              <FontAwesomeIcon size="1x" icon={icon} className={classes} />
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
              <ReactMarkdown>{text}</ReactMarkdown>
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
        size="1x"
        icon={faReply}
        className="text-gray-400 transform -rotate-90 scale-125"
      />
      <div className="ml-3">{text}</div>
    </div>
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

export default function Recipe({ data, pageContext }) {
  const { recipe, categoryTypes, site } = data;
  const { pagePath } = pageContext;

  const getCategoryTypeById = (strapiId) => {
    return categoryTypes.edges.filter(
      (item) => item.type.strapiId === strapiId
    )[0].type;
  };

  const pageUrl = `${site.siteMetadata.siteUrl}${pagePath}`;

  const [ingredients, ingredientsDispatch] = useReducer(
    checklistReducer,
    recipe.ingredients.map((ingredient) => {
      return {
        entryType: ingredient.type,
        entryText: ingredient.item,
        checked: false,
      };
    })
  );
  const [directions, directionsDispatch] = useReducer(
    checklistReducer,
    recipe.directions.map((direction) => {
      return {
        entryText: direction.step,
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

  const metaImageUrl = `${site.siteMetadata.siteUrl}${recipe.metaImage.localFile.childImageSharp.gatsbyImageData.images.fallback.src}`;

  const schema = {
    "@context": "http://schema.org/",
    "@type": "Recipe",
    name: recipe.title,
    image: [metaImageUrl],
    author: {
      "@type": "Organization",
      name: "Walsh's Kitchen",
    },
    datePublished: moment(recipe.publishOn).format("YYYY-MM-DD"),
    description: recipe.excerpt,
    // nutrition: {
    //   "@type": "NutritionInformation",
    //   calories: "270 calories",
    // },
    nutrition: null,
    aggregateRating: null,
    recipeIngredient: ingredients.map((ingredient) => ingredient.entryText),
    recipeInstructions: directions.map((step) => ({
      "@type": "HowToStep",
      text: step.entryText,
    })),
    video: [],
  };

  // if (frontmatter.tags && frontmatter.tags.length > 0) {
  //   schema["keywords"] = frontmatter.tags.join(", ");
  // }

  if (recipe.yield) {
    schema["recipeYield"] = recipe.yield;
  }

  if (recipe.category) {
    schema["recipeCategory"] = recipe.category.name;
  }

  // if (frontmatter.cuisine) {
  // schema["recipeCuisine"] = frontmatter.cuisine;
  // }

  const prepTime = +recipe.prepTime;
  const cookTime = +recipe.cookTime;
  const totalTime = prepTime + cookTime;

  if (totalTime > 0) {
    schema["prepTime"] = moment.duration(prepTime, "minutes").toISOString();
    schema["cookTime"] = moment.duration(cookTime, "minutes").toISOString();
    schema["totalTime"] = moment.duration(totalTime, "minutes").toISOString();
  } else {
    schema["prepTime"] = null;
    schema["cookTime"] = null;
    schema["totalTime"] = null;
  }

  // const [scrollY, setScrollY] = useState(0);

  // useEffect(() => {
  //   const updateScroll = () => {
  //     setScrollY(window.scrollY);
  //   };

  //   window.addEventListener("scroll", updateScroll);

  //   return () => {
  //     window.removeEventListener("scroll", updateScroll);
  //   };
  // }, []);

  // const imageStyles = {
  //   transform: `translateY(${scrollY * -1})`,
  // };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
      <Seo
        title={recipe.title}
        description={recipe.excerpt}
        pageUrl={pageUrl}
        type="article"
        meta={[
          {
            property: "og:image",
            content: metaImageUrl,
          },
          {
            property: "og:image:width",
            content:
              recipe.metaImage.localFile.childImageSharp.gatsbyImageData.width,
          },
          {
            property: "og:image:height",
            content:
              recipe.metaImage.localFile.childImageSharp.gatsbyImageData.height,
          },
          {
            name: `twitter:image`,
            content: metaImageUrl,
          },
        ]}
      />
      <div className="text-gray-800">
        <div>
          <Header pagePath={pagePath} />
          <div className="fixed hidden lg:block w-3/5 h-screen">
            <div className="relative">
              <Img
                alt={recipe.featuredPhoto.alternativeText || recipe.title}
                fluid={recipe.featuredPhoto.localFile.childImageSharp.fluid}
                className="min-w-full min-h-screen"
              />
              <div
                className="absolute inset-y-0 right-0 w-20 bg-primary opacity-90"
                style={{
                  clipPath: "polygon(60% 0, 100% 0, 100% 100%, 0 100%)",
                }}
              ></div>
            </div>
          </div>
          <div
            className="min-w-full lg:hidden relative"
            // style={imageStyles}
          >
            <Img
              alt={recipe.featuredPhoto.alternativeText || recipe.title}
              fluid={recipe.featuredPhoto.localFile.childImageSharp.fluid}
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
            <div className="row">
              <div className="col">
                <Section>
                  <h1 className="font-display text-4xl leading-snug mb-4 pt-10">
                    {recipe.title}
                  </h1>
                  <ReactMarkdown className="text-xl leading-normal mb-6">
                    {recipe.content}
                  </ReactMarkdown>
                </Section>

                <Section>
                  {recipe.ingredients.length > 0 && (
                    <div id="recipe-ingredients" className="mb-5">
                      <SectionHeading text="Ingredients" icon={faSalad} />
                      <SectionInstructions text="Check off each of your ingredients before you get started!" />
                      {ingredients.map((ingredient, index) => {
                        switch (ingredient.entryType) {
                          case "Heading":
                            return (
                              <div
                                key={index}
                                className="text-lg font-semibold mt-4 mb-2"
                              >
                                {ingredient.entryText}
                              </div>
                            );
                          case "Ingredient":
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
                          isLast={index === recipe.directions.length - 1}
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

                {recipe.servingSuggestion && (
                  <Section>
                    <div
                      id="talking-bubble"
                      className="font-comic border-2 max-w-xs text-center border-gray-600 px-4 py-3 uppercase font-weight-bold text-uppercase relative rounded-3xl"
                    >
                      Serving suggestion&mdash;{recipe.servingSuggestion}
                    </div>
                    <img className="ml-8" src="/dan-explain.svg" alt="" />
                  </Section>
                )}

                {recipe.categories.length > 0 && (
                  <Section>
                    <div className="bg-gray-100 rounded-lg p-4">
                      <p className="mb-2">
                        Find more recipes categorised under:
                      </p>
                      <ul id="recipe-tags" className="flex flex-wrap list-none">
                        {recipe.categories.map(
                          ({ name, slug, categoryType }, index) => (
                            <li key={index}>
                              <Link
                                className="inline-block text-primary underline hover:no-underline bg-red-100 hover:bg-red-50 px-2 py-1 mb-2 mr-2 whitespace-nowrap rounded-lg transition-colors"
                                to={`/category/${
                                  getCategoryTypeById(categoryType).slug
                                }/${slug}`}
                              >
                                {name}
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  </Section>
                )}

                <Section>
                  <div className="text-center">
                    <Link to="/" className="btn-primary">
                      <FontAwesomeIcon
                        size="1x"
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
    </>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    categoryTypes: allStrapiCategoryTypes {
      edges {
        type: node {
          name
          slug
          strapiId
        }
      }
    }
    recipe: strapiRecipe(id: { eq: $id }) {
      title
      slug
      excerpt
      content
      publishOn
      categories {
        name
        slug
        categoryType
      }
      featuredPhoto {
        url
        alternativeText
        localFile {
          childImageSharp {
            fluid(maxWidth: 450, maxHeight: 450, cropFocus: CENTER) {
              ...GatsbyImageSharpFluid
            }
            original {
              src
            }
          }
        }
      }
      metaImage: featuredPhoto {
        localFile {
          childImageSharp {
            gatsbyImageData(
              layout: CONSTRAINED
              width: 600
              height: 600
              transformOptions: { fit: COVER }
              formats: JPG
            )
          }
        }
      }
      prepTime
      cookTime
      yield
      ingredients {
        item
        type
      }
      directions {
        step
      }
      servingSuggestion
    }
  }
`;

// export const pageQuery = graphql`
//   query ($fileAbsolutePath: String!) {
//     site {
//       siteMetadata {
//         siteUrl
//       }
//     }
//     markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
//       html
//       frontmatter {
//         date(formatString: "MMMM DD, YYYY")
//         title
//         excerpt
//         category
//         cuisine
//         ingredients
//         directions
//         servingSuggestion
//         tags
//         prepTime
//         cookTime
//         image {
//           childImageSharp {
//             fluid(maxWidth: 450, maxHeight: 450, cropFocus: CENTER) {
//               ...GatsbyImageSharpFluid
//             }
//             original {
//               src
//             }
//           }
//         }
//         metaImage: image {
//           childImageSharp {
//             gatsbyImageData(
//               layout: CONSTRAINED
//               width: 600
//               height: 600
//               transformOptions: { fit: COVER }
//               formats: JPG
//             )
//           }
//         }
//       }
//     }
//   }
// `;
