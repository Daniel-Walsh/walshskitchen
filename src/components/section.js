import classNames from "classnames";

const Section = ({ children, classes }) => {
  const sectionClasses = classNames("my-5", classes);
  return <section className={sectionClasses}>{children}</section>;
};

export default Section;
