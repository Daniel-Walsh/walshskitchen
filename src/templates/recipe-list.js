// Package imports
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/pro-regular-svg-icons";

// Local imports
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Seo from "../components/seo";
import Link from "../components/link";
import { getTotalTime } from "../global-functions";
import FadeOverlay from "../components/fade-overlay";

const RecipesPage = ({ data, pageContext }) => {
  const { recipes, site } = data;
  const {
    category,
    tag,
    numPages,
    numRecipes,
    currentPage,
    basePath,
    pageTitle,
    pagePath,
  } = pageContext;
  const pageUrl = `${site.siteMetadata.siteUrl}${pagePath}`;
  const paginationPages = new Array();

  for (let index = 1; index <= numPages; index++) {
    const pageLink = index === 1 ? basePath : `${basePath}page/${index}`;
    paginationPages.push(pageLink);
  }

  const pageMeta = [];
  if (currentPage > 1) {
    pageMeta.push({
      name: `robots`,
      content: `noindex, nofollow`,
    });
  }

  let taxonomyHeading = "";
  const isTaxonomyPage = category !== undefined || tag !== undefined;

  if (category) {
    taxonomyHeading = category.name;
  }

  if (tag) {
    taxonomyHeading = `#${tag}`;
  }

  return (
    <>
      <Seo title={pageTitle} meta={pageMeta} pageUrl={pageUrl} />
      <Navbar pagePath={pagePath} />
      <div className="container mx-auto">
        {!category && !tag && currentPage === 1 && (
          <section className="text-gray-600 body-font">
            <div className="px-4 my-12 md:my-24 mx-auto flex flex-wrap justify-between xl:max-w-5xl">
              <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-2/5 sm:w-3/5 content-start md:pr-10">
                <div className="w-full sm:p-4 px-4 md:mb-6">
                  <h1 className="font-display title-font font-medium text-5xl mb-4 text-gray-700">
                    <span className="block 2xl:inline">Check out </span>
                    <span className="block 2xl:inline">what's cookin'!</span>
                  </h1>
                  <div className="leading-relaxed mb-5">
                    All your family favourites in one place,{" "}
                    <span className="font-semibold">Walsh's Kitchen</span> is
                    here to save you from recipe-memory-fatigue&mdash;reminding
                    you how many cups of flour you need{" "}
                    <span className="italic">before</span> you mess up your
                    pancakes, again.
                  </div>
                  <Link
                    to={`/recipes/${recipes.edges[0].recipe.slug}`}
                    className="btn-primary btn-lg"
                  >
                    Get the latest recipe!
                  </Link>
                </div>
              </div>
              <div className="lg:w-3/5 sm:w-2/5 w-full rounded-lg overflow-hidden hidden sm:block mt-6 sm:mt-0 relative max-w-3xl">
                <Link
                  to={`/recipes/${recipes.edges[0].recipe.slug}`}
                  className="group"
                >
                  <GatsbyImage
                    className="object-cover object-center w-full h-full group-hover:scale-105 transition-all transform"
                    aspectRatio={4 / 3}
                    image={
                      recipes.edges[0].recipe.featuredPhoto.localFile
                        .childImageSharp.gatsbyImageData
                    }
                    alt={recipes.edges[0].recipe.title}
                  />
                  <FadeOverlay />
                  <div className="inset-0 from-gray-700 opacity-90 to-transparent bg-opacity-50 text-white absolute bg-gradient-to-t flex items-end p-4 text-xl group-hover:opacity-100 transition-all">
                    {recipes.edges[0].recipe.title}
                  </div>
                </Link>
              </div>
            </div>
          </section>
        )}
        {isTaxonomyPage && (
          <section className="px-4 my-12 md:my-24">
            <h1 className="font-display title-font font-medium text-5xl mb-4 text-gray-700">
              {taxonomyHeading}
              {currentPage > 1 && (
                <>
                  , <span className="text-gray-400">cont.</span>
                </>
              )}
            </h1>
            {category && (
              <>
                <p>
                  So far we've got{" "}
                  <span className="font-semibold">{numRecipes} recipes</span>{" "}
                  categorised under{" "}
                  <span className="font-semibold">{taxonomyHeading}</span>.
                </p>
                <p>
                  In the mood for something else? Jump to the home page for the{" "}
                  <Link to="/">latest recipes</Link>, or head back to the{" "}
                  <Link to="/categories">category list</Link> for more recipe
                  inspiration.
                </p>
              </>
            )}
            {tag && (
              <>
                <p>
                  Looks like we found{" "}
                  <span className="font-semibold">{numRecipes} recipes</span>{" "}
                  tagged with <span className="font-semibold">#{tag}</span>.
                </p>
                <p>
                  Otherwise, head back to the home page for the{" "}
                  <Link to="/">latest recipes</Link>.
                </p>
              </>
            )}
          </section>
        )}
        <section className="my-12 md:my-24">
          <div className="flex flex-wrap">
            {data.recipes.edges &&
              data.recipes.edges.map(({ recipe }, index) => {
                return (
                  <div
                    key={index}
                    to={`/recipes/${recipe.slug}`}
                    className="sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-5 relative group"
                  >
                    <Link
                      to={`/recipes/${recipe.slug}`}
                      className="no-underline"
                    >
                      <div className="rounded-md overflow-hidden mb-1 relative transition-all">
                        <GatsbyImage
                          alt={recipe.title}
                          className="w-full object-cover h-full object-center block inset-0 group-hover:scale-105 transform transition-all"
                          aspectRatio={4 / 3}
                          image={
                            recipe.featuredPhoto.localFile.childImageSharp
                              .gatsbyImageData
                          }
                        />
                        <FadeOverlay />
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold text-sm leading-none">
                          {recipe.title}
                        </span>
                        <div className="ml-4 text-black text-sm leading-none flex items-center">
                          {recipe.prepTime && recipe.cookTime && (
                            <>
                              <FontAwesomeIcon
                                icon={faClock}
                                className="text-gray-500"
                              />
                              <span className="ml-1 text-gray-500">
                                {getTotalTime(recipe.prepTime, recipe.cookTime)}
                              </span>{" "}
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
          </div>
          <div className="mt-8 px-4">
            <p className="mb-4 mt-6">
              Page <span className="font-semibold">{currentPage}</span> of{" "}
              <span className="font-semibold">{numPages}</span>
            </p>
            <div className="flex">
              {paginationPages.map((pageLink, index) => {
                const activePage = +index + 1 === currentPage;
                const pageLinkClasses = classNames(
                  "btn mr-2",
                  { "text-primary bg-red-100 font-semibold": activePage },
                  {
                    "btn-secondary": !activePage,
                  }
                );
                if (activePage) {
                  return (
                    <div key={index} className={pageLinkClasses}>
                      {index + 1}
                    </div>
                  );
                }
                return (
                  <Link key={index} className={pageLinkClasses} to={pageLink}>
                    {index + 1}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default RecipesPage;

export const pageQuery = graphql`
  query recipeListQuery($skip: Int!, $limit: Int!, $categoryId: Int) {
    site {
      siteMetadata {
        siteUrl
      }
    }
    recipes: allStrapiRecipe(
      skip: $skip
      limit: $limit
      sort: { order: DESC, fields: publishOn }
      filter: { categories: { elemMatch: { id: { eq: $categoryId } } } }
    ) {
      edges {
        recipe: node {
          id
          excerpt
          content
          publishOn(formatString: "DD/MM/YYYY")
          title
          slug
          prepTime
          cookTime
          featuredPhoto {
            localFile {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 600, height: 400)
              }
            }
          }
        }
      }
    }
  }
`;

// export const pageQuery = graphql`
//   query recipeListQuery(
//     $skip: Int!
//     $limit: Int!
//     $glob: String!
//     $tag: [String]
//   ) {
//     site {
//       siteMetadata {
//         siteUrl
//       }
//     }
//     recipes: allMarkdownRemark(
//       sort: { order: DESC, fields: [frontmatter___date] }
//       filter: {
//         fileAbsolutePath: { glob: $glob }
//         frontmatter: { tags: { in: $tag } }
//       }
//       limit: $limit
//       skip: $skip
//     ) {
//       edges {
//         node {
//           id
//           excerpt(pruneLength: 250)
//           html
//           frontmatter {
//             date(formatString: "DD/MM/YYYY")
//             title
//             tags
//             image {
//               childImageSharp {
//                 gatsbyImageData(layout: CONSTRAINED, width: 600, height: 400)
//               }
//             }
//           }
//           fileAbsolutePath
//         }
//       }
//     }
//   }
// `;
