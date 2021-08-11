import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Footer from "../components/footer";
// import Header from "../components/header";
import Navbar from "../components/navbar";
import { getPathFromFilepath } from "../global-functions";
import Seo from "../components/seo";
import classNames from "classnames";

const RecipesPage = ({ data, pageContext }) => {
  const paginationPages = new Array();
  for (let index = 1; index <= pageContext.numPages; index++) {
    const pageLink = index === 1 ? `/` : `/page/${index}`;
    paginationPages.push(pageLink);
  }

  return (
    <>
      <Seo title="Latest recipes" />
      <Navbar />
      <div className="container mx-auto">
        {pageContext.currentPage === 1 && (
          <section class="text-gray-600 body-font">
            <div class="container px-4 my-24 mx-auto flex flex-wrap justify-between xl:max-w-5xl">
              <div class="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-2/5 sm:w-3/5 content-start md:pr-10">
                <div class="w-full sm:p-4 px-4 mb-6">
                  <h1 class="font-display title-font font-medium text-5xl mb-4 text-gray-700">
                    <span className="block 2xl:inline">Check out </span>
                    <span className="block 2xl:inline">what's cookin'!</span>
                  </h1>
                  <div class="leading-relaxed mb-5">
                    Pour-over craft beer pug drinking vinegar live-edge
                    gastropub, keytar neutra sustainable fingerstache
                    kickstarter.
                  </div>
                  <Link
                    to={getPathFromFilepath(
                      data.recipes.edges[0].node.fileAbsolutePath
                    )}
                    class="inline-flex text-white bg-red-500 border-0 py-4 px-8 focus:outline-none hover:bg-red-600 rounded-lg text-xl"
                  >
                    Get the latest recipe
                  </Link>
                </div>
                {/* <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                  <h2 class="title-font font-medium text-3xl text-gray-900">
                    {pageContext.numRecipes}
                  </h2>
                  <p class="leading-relaxed">Recipes</p>
                </div>
                <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                  <h2 class="title-font font-medium text-3xl text-gray-900">
                    1.8K
                  </h2>
                  <p class="leading-relaxed">Categories</p>
                </div>
                <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                  <h2 class="title-font font-medium text-3xl text-gray-900">
                    35
                  </h2>
                  <p class="leading-relaxed">Tags</p>
                </div> */}
                {/* <div class="p-4 sm:w-1/2 lg:w-1/4 w-1/2">
                  <h2 class="title-font font-medium text-3xl text-gray-900">
                    4
                  </h2>
                  <p class="leading-relaxed">Products</p>
                </div> */}
              </div>
              <div class="lg:w-3/5 sm:w-2/5 w-full rounded-lg overflow-hidden hidden sm:block mt-6 sm:mt-0 relative max-w-3xl">
                <Link
                  to={getPathFromFilepath(
                    data.recipes.edges[0].node.fileAbsolutePath
                  )}
                >
                  <GatsbyImage
                    className="object-cover object-center w-full h-full"
                    // src="https://dummyimage.com/600x300"
                    aspectRatio={4 / 3}
                    image={
                      data.recipes.edges[0].node.frontmatter.image
                        .childImageSharp.gatsbyImageData
                    }
                    alt={data.recipes.edges[0].node.frontmatter.title}
                  />
                  <div className="inset-0 from-gray-500 to-transparent bg-opacity-50 text-white absolute bg-gradient-to-t flex items-end p-4 text-xl hover:from-gray-700 transition-all">
                    {data.recipes.edges[0].node.frontmatter.title}
                  </div>
                </Link>
              </div>
            </div>
          </section>
        )}
        <section className="my-24">
          <div className="flex flex-wrap">
            {data.recipes.edges &&
              data.recipes.edges.map(({ node }, index) => {
                return (
                  <Link
                    to={getPathFromFilepath(node.fileAbsolutePath)}
                    className="sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-5 relative group"
                  >
                    <div className="rounded-md overflow-hidden mb-1 relative">
                      <GatsbyImage
                        className="w-full object-cover h-full object-center block inset-0"
                        aspectRatio={4 / 3}
                        image={
                          node.frontmatter.image.childImageSharp.gatsbyImageData
                        }
                      />
                      <div className="inset-0 bg-black absolute group-hover:opacity-20 opacity-0 transition-opacity"></div>
                    </div>
                    <span className="font-semibold text-sm leading-none">
                      {node.frontmatter.title}
                    </span>
                  </Link>
                );
              })}
          </div>
          <div className="mt-8 px-4">
            <p className="mb-4 mt-6">
              Page{" "}
              <span className="font-semibold">{pageContext.currentPage}</span>{" "}
              of <span className="font-semibold">{pageContext.numPages}</span>
            </p>
            <div className="flex">
              {paginationPages.map((pageLink, index) => {
                const activePage = +index + 1 === pageContext.currentPage;
                const pageLinkClasses = classNames(
                  "px-4 py-2 mr-2 rounded-xl inline-block",
                  { "text-primary bg-red-100 font-semibold": activePage },
                  {
                    "bg-gray-100 hover:bg-gray-300 transition-colors":
                      !activePage,
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
  query recipeListQuery($skip: Int!, $limit: Int!) {
    recipes: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { fileAbsolutePath: { regex: "/recipes/" } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          html
          frontmatter {
            date(formatString: "DD/MM/YYYY")
            title
            tags
            image {
              childImageSharp {
                gatsbyImageData(layout: CONSTRAINED, width: 600, height: 400)
              }
            }
          }
          fileAbsolutePath
        }
      }
    }
  }
`;
