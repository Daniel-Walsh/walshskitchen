// import React from "react"
import Footer from "../components/footer";
import Layout from "../components/layout";
import Navbar from "../components/navbar";
import Seo from "../components/seo";

const NotFoundPage = () => (
  <>
    <Seo title="About this site" />
    <Navbar />
    <section className="container mx-auto my-24 px-4 md:max-w-xl">
      <div className="col-12 col-md-9 col-xl-7 col-xxl-6 mx-auto">
        <h1 className="font-display title-font font-medium text-5xl mb-4 text-gray-700">
          <span className="block sm:inline">About </span>
          <span className="block sm:inline">this site</span>
        </h1>
        <div className="font-written text-3xl leading-snug my-16 text-gray-600">
          <p>To my dear family,</p>
          <p className="mt-10">
            Way back when, I was originally going to write a family recipe cook
            book, but creating a family recipe{" "}
            <span className="underline">website</span> is so much easier than
            publishing a physical book.
          </p>
          <p>
            The recipes enshrined here are a collection of some of our family’s{" "}
            <span className="text-primary">happiest moments</span> shared around
            the dinner table. Some are "Walsh Originals" while others are
            favourites that have been clipped from magazines and websites and
            adopted into our regular meal rotations.
          </p>
          <p>
            This is for my amazing, crazy, loving family&mdash;whom none of
            which have any idea why a weirdo with food issues like me would want
            to write a book about food.
          </p>
          <p className="mt-10">I love you all.</p>
          <p>&mdash; Dan</p>
        </div>
      </div>
    </section>
    <Footer />
  </>
);

export default NotFoundPage;
