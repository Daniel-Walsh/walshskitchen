import { graphql } from "gatsby";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Seo from "../components/seo";

const PageDefault = ({ data, pageContext }) => {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <>
      <Seo title={frontmatter.title} />
      <Navbar categories={pageContext.categories} />
      <section className="container mx-auto my-24 px-4 md:max-w-xl">
        <div className="col-12 col-md-9 col-xl-7 col-xxl-6 mx-auto">
          <h1 className="font-display title-font font-medium text-5xl mb-4 text-gray-700">
            {frontmatter.title}
          </h1>
          <div
            className="font-written text-2xl lg:text-3xl leading-snug my-16 text-gray-600 bg-yellow-100 shadow-lg p-6"
            dangerouslySetInnerHTML={{ __html: html }}
          ></div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default PageDefault;

export const pageQuery = graphql`
  query ($fileAbsolutePath: String!) {
    markdownRemark(fileAbsolutePath: { eq: $fileAbsolutePath }) {
      html
      frontmatter {
        date
        title
      }
    }
  }
`;
