import classNames from "classnames";
import { Link } from "gatsby";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";
// import PropTypes from "prop-types";
// import React from "react"

// const Header = ({ siteTitle }) => {
const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef(scrolled);

  const [headerClasses, setHeaderClasses] = useState(
    classNames("fixed pl-4 pt-4 w-full")
  );

  const [headerIconStyles, setHeaderIconStyles] = useState({});

  useEffect(() => {
    scrollRef.current = scrolled;
    if (scrolled) {
      setHeaderClasses(
        classNames("fixed px-4 py-3 bg-primary w-full transition-all")
      );
      setHeaderIconStyles({ height: "40px", width: "40px" });
    } else {
      setHeaderClasses(classNames("fixed pl-4 pt-4 w-full transition-all"));
      setHeaderIconStyles({});
    }
  }, [scrolled]);

  useEffect(() => {
    const onScroll = (event) => {
      if (window.scrollY > 200 && !scrollRef.current) {
        setScrolled(true);
      } else if (window.scrollY < 200 && scrollRef.current) {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={headerClasses} style={{ zIndex: 1 }}>
      <Link to="/recipes">
        <img
          src="/logo-round.svg"
          width="64"
          heigt="64"
          style={headerIconStyles}
          className="transition-all inline-block"
        />
      </Link>
      {scrolled && (
        <span className="transition-all lg:hidden text-white">
          <FontAwesomeIcon icon={faChevronLeft} className="mx-2" />
          Back to recipes
        </span>
      )}
    </header>
  );
};

// Header.propTypes = {
//   siteTitle: PropTypes.string,
// };

// Header.defaultProps = {
//   siteTitle: ``,
// };

export default Header;
