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
    classNames("position-fixed pl-4 pt-4 w-100")
  );

  const [headerIconStyles, setHeaderIconStyles] = useState({});

  useEffect(() => {
    scrollRef.current = scrolled;
    if (scrolled) {
      setHeaderClasses(
        classNames("position-fixed px-4 py-3 bg-primary w-100 transition")
      );
      setHeaderIconStyles({ height: "40px", width: "40px" });
    } else {
      setHeaderClasses(classNames("position-fixed pl-4 pt-4 w-100 transition"));
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
      <Link to="/">
        <img
          src="/logo-round.svg"
          width="64"
          heigt="64"
          style={headerIconStyles}
          className="transition"
        />
      </Link>
      {scrolled && (
        <span className="transition d-lg-none text-white">
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
