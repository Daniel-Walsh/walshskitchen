import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { getPathFromFilepath } from "../global-functions";
import Seo from "../components/seo";
import classNames from "classnames";
import { makeTitle } from "../global-functions";
import Link from "../components/link";

const RecipesPage = ({ data, pageContext }) => {
  const paginationPages = new Array();

  for (let index = 1; index <= pageContext.numPages; index++) {
    const pageLink =
      index === 1
        ? pageContext.basePath
        : `${pageContext.basePath}page/${index}`;
    paginationPages.push(pageLink);
  }

  const pageMeta = [];
  if (pageContext.currentPage > 1) {
    pageMeta.push({
      name: `robots`,
      content: `noindex, nofollow`,
    });
  }

  let taxonomyHeading = "";
  const isTaxonomyPage =
    pageContext.category !== undefined || pageContext.tag !== undefined;

  if (pageContext.category) {
    taxonomyHeading = makeTitle(pageContext.category);
  }

  if (pageContext.tag) {
    taxonomyHeading = `#${pageContext.tag}`;
  }

  return (
    <>
      <Seo title={pageContext.pageTitle} meta={pageMeta} />
      <Navbar categories={pageContext.categories} />
      <div className="container mx-auto">
        {!pageContext.category &&
          !pageContext.tag &&
          pageContext.currentPage === 1 && (
            <section className="text-gray-600 body-font">
              <div className="px-4 my-24 mx-auto flex flex-wrap justify-between xl:max-w-5xl">
                <div className="flex flex-wrap -mx-4 mt-auto mb-auto lg:w-2/5 sm:w-3/5 content-start md:pr-10">
                  <div className="w-full sm:p-4 px-4 mb-6">
                    <h1 className="font-display title-font font-medium text-5xl mb-4 text-gray-700">
                      <span className="block 2xl:inline">Check out </span>
                      <span className="block 2xl:inline">what's cookin'!</span>
                    </h1>
                    <div className="leading-relaxed mb-5">
                      Pour-over craft beer pug drinking vinegar live-edge
                      gastropub, keytar neutra sustainable fingerstache
                      kickstarter.
                    </div>
                    <Link
                      to={getPathFromFilepath(
                        data.recipes.edges[0].node.fileAbsolutePath
                      )}
                      className="btn-primary btn-lg"
                    >
                      Get the latest recipe!
                    </Link>
                  </div>
                </div>
                <div className="lg:w-3/5 sm:w-2/5 w-full rounded-lg overflow-hidden hidden sm:block mt-6 sm:mt-0 relative max-w-3xl">
                  <Link
                    to={getPathFromFilepath(
                      data.recipes.edges[0].node.fileAbsolutePath
                    )}
                  >
                    <GatsbyImage
                      className="object-cover object-center w-full h-full"
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
        {isTaxonomyPage && (
          <section className="px-4 my-20">
            <h1 className="font-display title-font font-medium text-5xl mb-4 text-gray-700">
              {taxonomyHeading}
              {pageContext.currentPage > 1 && (
                <>
                  , <span className="text-gray-400">cont.</span>
                </>
              )}
            </h1>
            {pageContext.category && (
              <>
                <p>
                  So far we've got{" "}
                  <span className="font-semibold">
                    {pageContext.numRecipes} recipes
                  </span>{" "}
                  categorised under{" "}
                  <span className="font-semibold">{taxonomyHeading}</span>.
                </p>
                <p>
                  In the mood for something else? Jump to the home page for the{" "}
                  <Link to="/">latest recipes</Link>.
                </p>
              </>
            )}
            {pageContext.tag && (
              <>
                <p>
                  Looks like we found{" "}
                  <span className="font-semibold">
                    {pageContext.numRecipes} recipes
                  </span>{" "}
                  tagged with{" "}
                  <span className="font-semibold">#{pageContext.tag}</span>.
                </p>
                <p>
                  Otherwise, head back to the home page for the{" "}
                  <Link to="/">latest recipes</Link>.
                </p>
              </>
            )}
          </section>
        )}
        <section className="my-24">
          <div className="flex flex-wrap">
            {data.recipes.edges &&
              data.recipes.edges.map(({ node }, index) => {
                return (
                  <Link
                    key={index}
                    to={getPathFromFilepath(node.fileAbsolutePath)}
                    className="sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 px-4 mb-5 relative group"
                  >
                    <div className="rounded-md overflow-hidden mb-1 relative">
                      <GatsbyImage
                        alt={node.frontmatter.title}
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
  query recipeListQuery(
    $skip: Int!
    $limit: Int!
    $glob: String!
    $tag: [String]
  ) {
    recipes: allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        fileAbsolutePath: { glob: $glob }
        frontmatter: { tags: { in: $tag } }
      }
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
