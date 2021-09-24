import { graphql } from "gatsby";
import pluralize from "pluralize";
import { globalHistory } from "@reach/router";

import Link from "../components/link";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Seo from "../components/seo";

const CategoriesPage = ({ data }) => {
  const { categoryTypes } = data;
  return (
    <>
      <Seo title="Categories" />
      <Navbar location={globalHistory.location} />
      <section className="container mx-auto my-24 px-4 md:max-w-4xl">
        <div className="col-12 col-md-9 col-xl-7 col-xxl-6 mx-auto">
          <h1 className="font-display title-font font-medium text-5xl mb-4 text-gray-700">
            {/* {frontmatter.title} */}
            Categories
          </h1>
          {/* <div
            className="font-written text-2xl lg:text-3xl leading-snug my-16 text-gray-600 bg-yellow-100 shadow-lg p-6"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div> */}
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
                  .map((category) => (
                    <li>
                      <Link
                        to={`/category/${type.slug}/${category.slug}`}
                        className="flex flex-col items-center mr-4 mb-4 no-underline"
                      >
                        <div className="h-24 w-24 bg-gray-200 rounded-full"></div>
                        <span className="w-24 text-center">
                          {" "}
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
    categoryTypes: allStrapiCategoryTypes {
      edges {
        type: node {
          name
          slug
          categories {
            name
            slug
          }
        }
      }
    }
  }
`;
