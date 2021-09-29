// Package imports
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faCalculator } from "@fortawesome/pro-regular-svg-icons";

// Local imports
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Seo from "../components/seo";
import Link from "../components/link";
import { getTotalTime } from "../global-functions";
import Breakpoints from "../components/breakpoints";
import DanDroolSVG from "../../static/dan-drool-anim.svg";

const RecipesPage = ({ data, pageContext }) => {
  const {
    allStrapiRecipe: { allRecipes },
    site,
  } = data;
  const {
    category,
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

  const isCategoryPage = category !== undefined;
  const isFrontpage = !category && currentPage === 1;

  const featuredRecipe = isFrontpage && allRecipes[0].recipe;

  const recipes = [...allRecipes];
  if (isFrontpage) {
    recipes.shift();
  }

  const scrollTo = (event, id) => {
    event.preventDefault();
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Breakpoints />
      <Seo title={pageTitle} meta={pageMeta} pageUrl={pageUrl} />
      <Navbar pagePath={pagePath} />
      <div className="container mx-auto mt-36">
        {isFrontpage && (
          <section className="text-gray-600 body-font">
            <div className="px-4 my-12 md:my-24 mx-auto flex flex-wrap justify-between xl:max-w-5xl">
              <div className="flex flex-wrap -mx-4 mt-auto mb-12 lg:mb-auto lg:w-2/5 sm:w-4/5 sm:ml-8 lg:ml-0 content-start md:pr-10">
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
                  <a
                    href="#"
                    onClick={(event) => {
                      scrollTo(event, "featured-recipe");
                    }}
                    className="btn-primary btn-lg lg:hidden"
                  >
                    Get the latest recipe!
                  </a>
                  <a
                    href="#"
                    onClick={(event) => {
                      scrollTo(event, "recipes");
                    }}
                    className="btn-primary btn-lg hidden lg:inline-block"
                  >
                    Scroll down for more!
                  </a>
                </div>
              </div>
              <Link
                id="featured-recipe"
                to={`/recipes/${featuredRecipe.slug}`}
                className="relative no-underline group w-full sm:mx-12 md:mx-20 lg:mx-0 lg:w-3/5 mt-6 sm:mt-0  max-w-3xl "
              >
                <div className="rounded-3xl shadow-lg overflow-hidden transform">
                  <GatsbyImage
                    className="w-full object-cover h-full object-center block inset-0 group-hover:scale-105 transition-all transform duration-500"
                    image={
                      featuredRecipe.featuredPhoto.localFile.childImageSharp
                        .gatsbyImageData
                    }
                    alt={featuredRecipe.title}
                  />
                </div>
                <div className="pointer-events-none absolute right-0 transform -translate-y-full group-hover:-translate-y-3/4 transition-all duration-500 mr-12 h-auto w-24 sm:w-32 md:w-40">
                  <DanDroolSVG className="transform -scale-x-1" />
                </div>
                <div className="w-full text-gray-600 transform -translate-y-12 group-hover:-translate-y-16 sm:-translate-y-20 sm:group-hover:-translate-y-24 transition-all duration-500 -mb-16">
                  <div className="p-6 mx-4 sm:mx-8 rounded-3xl bg-white shadow-lg transition-all group-hover:shadow-2xl duration-500">
                    <div className="font-bold text-2xl text-gray-900 pb-3">
                      {featuredRecipe.title}
                    </div>
                    <div className="pb-4 border-b flex flex-wrap text-sm md:text-base">
                      {featuredRecipe.categories.map((category, index) => (
                        <span
                          key={index}
                          className="mr-2 mb-2 px-2 py-1 rounded-md bg-gray-100 text-gray-500"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-around pt-4 text-xs sm:text-sm lg:text-base">
                      <div>
                        <FontAwesomeIcon
                          icon={faClock}
                          className="mr-1 md:mr-2"
                          size="1x"
                        />
                        Ready in{" "}
                        {getTotalTime(
                          featuredRecipe.prepTime,
                          featuredRecipe.cookTime
                        )}
                      </div>
                      <div>
                        <FontAwesomeIcon
                          icon={faCalculator}
                          className="mr-1 md:mr-2"
                          size="1x"
                        />
                        Makes {featuredRecipe.yield}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </section>
        )}
        {isCategoryPage && (
          <section className="px-4 my-12 md:my-24">
            <h1 className="font-display title-font font-medium text-5xl mb-4 text-gray-700">
              {category.name}
              {currentPage > 1 && (
                <>
                  , <span className="text-gray-400">cont.</span>
                </>
              )}
            </h1>
            <p>
              So far we've got{" "}
              <span className="font-semibold">{numRecipes} recipes</span>{" "}
              categorised under{" "}
              <span className="font-semibold">{category.name}</span>.
            </p>
            <p>
              In the mood for something else? Jump to the home page for the{" "}
              <Link to="/">latest recipes</Link>, or head back to the{" "}
              <Link to="/categories">category list</Link> for more recipe
              inspiration.
            </p>
          </section>
        )}
        <section id="recipes" className="my-12 md:my-24">
          <div className="flex flex-wrap items-stretch">
            {recipes &&
              recipes.map(({ recipe }, index) => {
                return (
                  <div
                    key={index}
                    to={`/recipes/${recipe.slug}`}
                    className="sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-5 relative group"
                  >
                    <Link
                      to={`/recipes/${recipe.slug}`}
                      className="no-underline block h-full"
                    >
                      <article className="h-full rounded-xl overflow-hidden shadow-lg group-hover:shadow-2xl group-hover:-translate-y-1 transform transition-all duration-300">
                        <div className="overflow-hidden relative transition-all">
                          <GatsbyImage
                            alt={recipe.title}
                            className="w-full object-cover h-full object-center block inset-0 group-hover:scale-105 transform transition-all duration-300"
                            image={
                              recipe.featuredPhoto.localFile.childImageSharp
                                .gatsbyImageData
                            }
                          />
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <div className="font-semibold leading-tight text-gray-900">
                              {recipe.title}
                            </div>
                            <div className="ml-4 text-black text-sm leading-none flex items-center">
                              {recipe.prepTime && recipe.cookTime && (
                                <>
                                  <FontAwesomeIcon
                                    icon={faClock}
                                    className="text-gray-500"
                                    size="1x"
                                  />
                                  <span className="ml-1 text-gray-500">
                                    {getTotalTime(
                                      recipe.prepTime,
                                      recipe.cookTime
                                    )}
                                  </span>{" "}
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </article>
                    </Link>
                  </div>
                );
              })}
          </div>
          <div id="pagination" className="mt-8 px-4">
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
    allStrapiRecipe(
      skip: $skip
      limit: $limit
      sort: { order: DESC, fields: publishOn }
      filter: { categories: { elemMatch: { id: { eq: $categoryId } } } }
    ) {
      allRecipes: edges {
        recipe: node {
          id
          excerpt
          content
          publishOn(formatString: "DD/MM/YYYY")
          title
          slug
          categories {
            name
          }
          yield
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
