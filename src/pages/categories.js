import { graphql } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import pluralize from "pluralize";

import Link from "../components/link";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Seo from "../components/seo";
import FadeOverlay from "../components/fade-overlay";

const CategoriesPage = ({ data, pageContext }) => {
  const { categories, categoryTypes } = data;
  const { pagePath } = pageContext;

  // Loop through all category types...
  categoryTypes.edges.forEach(({ type }) => {
    // Loop through all categories for the given category type...
    type.categories.forEach((category, index) => {
      // Count the total recipes for the given category...
      const categoryRecipeCount = categories.edges.filter(
        ({ category: typeCategory }) => typeCategory.strapiId === category.id
      )[0].category.recipes.length;
      // Remove the category if it has zero recipes...
      if (categoryRecipeCount === 0) {
        delete type.categories[index];
      }
    });
  });

  // Loop through all category types once more...
  categoryTypes.edges.forEach(({ type }, index) => {
    // Remove the category type if it has zero categories...
    if (type.categories.length === 0) {
      delete categoryTypes.edges[index];
    }
  });

  return (
    <>
      <Seo title="Categories" />
      <Navbar pagePath={pagePath} />
      <section className="container mx-auto my-12 md:my-24 px-4 md:max-w-4xl">
        <div className="col-12 col-md-9 col-xl-7 col-xxl-6 mx-auto">
          <h1 className="font-display title-font font-medium text-5xl mb-10 md:mb-20 text-gray-700">
            Categories
          </h1>
          {categoryTypes.edges.map(({ type }, index) => (
            <div key={index} className="mb-6">
              <h2 className="mb-3 font-semibold text-xl">
                {pluralize(type.name)}
              </h2>
              <ul className="flex md:flex-wrap flex-col md:flex-row">
                {type.categories
                  .sort((a, b) => {
                    if (a.name < b.name) {
                      return -1;
                    }
                    if (a.name > b.name) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((category, index) => {
                    const image =
                      category.featuredPhoto &&
                      getImage(category.featuredPhoto.localFile);

                    return (
                      <li key={index}>
                        <Link
                          to={`/category/${type.slug}/${category.slug}`}
                          className="flex md:flex-col items-center mr-4 mb-4 md:mb-6 no-underline group"
                        >
                          <div className="h-14 w-14 md:h-32 md:w-32 md:mb-2 mr-3 md:mr-0 bg-gray-200 rounded-full overflow-hidden relative">
                            {category.featuredPhoto && (
                              <>
                                <GatsbyImage
                                  image={image}
                                  alt={category.name}
                                  className="rounded-full"
                                />
                                <FadeOverlay />
                              </>
                            )}
                          </div>
                          <span className="md:w-32 text-center md:text-sm font-semibold">
                            {category.name}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
              </ul>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CategoriesPage;

export const pageQuery = graphql`
  query MyQuery {
    categories: allStrapiCategory {
      edges {
        category: node {
          strapiId
          recipes {
            id
          }
        }
      }
    }
    categoryTypes: allStrapiCategoryTypes {
      edges {
        type: node {
          name
          slug
          categories {
            name
            slug
            id
            featuredPhoto {
              localFile {
                childImageSharp {
                  gatsbyImageData(
                    width: 128
                    height: 128
                    placeholder: BLURRED
                    transformOptions: { fit: COVER, cropFocus: CENTER }
                  )
                }
              }
            }
          }
        }
      }
    }
  }
`;
