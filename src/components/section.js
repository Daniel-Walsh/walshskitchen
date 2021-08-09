import classNames from "classnames";

const Section = ({ children, classes }) => {
  const sectionClasses = classNames("mb-10", classes);
  return <section className={sectionClasses}>{children}</section>;
};

export default Section;
