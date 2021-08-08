import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { getPathFromFilepath } from "../global-functions";

const RecipesPage = ({ data, pageContext }) => {
  const paginationPages = new Array();
  for (let index = 1; index <= pageContext.numPages; index++) {
    const pageLink = index === 1 ? `/recipes` : `/recipes/page/${index}`;
    paginationPages.push(pageLink);
  }

  pageContext.numPages;
  return (
    <>
      <div className="flex flex-wrap">
        {data.recipes.edges &&
          data.recipes.edges.map(({ node }, index) => {
            return (
              <div className="sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 mb-4 relative">
                <Link
                  to={getPathFromFilepath(node.fileAbsolutePath)}
                  className=""
                >
                  <div className="rounded-md overflow-hidden mb-2 relative">
                    <GatsbyImage
                      className="w-full object-cover h-full object-center block inset-0"
                      aspectRatio={4 / 3}
                      image={
                        node.frontmatter.image.childImageSharp.gatsbyImageData
                      }
                    />
                    <div className="inset-0 bg-black absolute hover:opacity-20 opacity-0 transition-opacity"></div>
                  </div>
                </Link>
                <span className="font-medium">{node.frontmatter.title}</span>
              </div>
            );
          })}
      </div>
      <ul id="pagination" className="list-none flex">
        {paginationPages.map((pageLink, index) => {
          return (
            <li key={index}>
              <Link className="p-4 border" to={pageLink}>
                {index + 1}
              </Link>
            </li>
          );
        })}
      </ul>
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
