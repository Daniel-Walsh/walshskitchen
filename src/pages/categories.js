import { graphql } from "gatsby";
import pluralize from "pluralize";

import Link from "../components/link";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Seo from "../components/seo";

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
      <section className="container mx-auto my-24 px-4 md:max-w-4xl">
        <div className="col-12 col-md-9 col-xl-7 col-xxl-6 mx-auto">
          <h1 className="font-display title-font font-medium text-5xl mb-20 text-gray-700">
            Categories
          </h1>
          {categoryTypes.edges.map(({ type }, index) => (
            <div key={index} className="mb-6">
              <h2 className="mb-3 font-semibold text-xl">
                {pluralize(type.name)}
              </h2>
              <ul className="flex flex-wrap">
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
                  .map((category, index) => (
                    <li key={index}>
                      <Link
                        to={`/category/${type.slug}/${category.slug}`}
                        className="flex flex-col items-center mr-4 mb-4 no-underline"
                      >
                        <div className="h-24 w-24 bg-gray-200 rounded-full"></div>
                        <span className="w-24 text-center">
                          {category.name}
                        </span>
                      </Link>
                    </li>
                  ))}
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
          }
        }
      }
    }
  }
`;
