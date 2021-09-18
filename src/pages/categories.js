import { graphql } from "gatsby";
import Link from "../components/link";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Seo from "../components/seo";

const CategoriesPage = ({ data }) => {
  const { categoryTypes } = data;
  console.log(categoryTypes);
  return (
    <>
      <Seo title="Categories" />
      {/* <Navbar categories={pageContext.categories} /> */}
      <section className="container mx-auto my-24 px-4 md:max-w-xl">
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
              <h2 className="mb-3 font-semibold text-xl">{type.name}</h2>
              <ul className="flex">
                {type.categories.map((category) => (
                  <li>
                    <Link to={`/category/${type.slug}/${category.slug}`}>
                      {category.name}
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
