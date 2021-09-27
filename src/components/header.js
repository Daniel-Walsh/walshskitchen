import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import Link from "./link";
import NavButtons from "./navbuttons";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faChevronLeft } from "@fortawesome/pro-solid-svg-icons";

const Header = ({ pagePath }) => {
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef(scrolled);

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

  useEffect(() => {
    scrollRef.current = scrolled;
  }, [scrolled]);

  const headerClasses = classNames(
    // "fixed px-4 py-4 w-full bg-opacity-95 transition-all",
    "fixed px-4 py-2 w-full bg-opacity-100 transition-all",
    // { "px-4 py-4 bg-transparent": !scrolled },
    { "bg-transparent": !scrolled },
    {
      // "px-5 py-3 bg-primary lg:px-4 lg:py-4 lg:bg-transparent": scrolled,
      "bg-primary lg:px-4 lg:py-4 lg:bg-transparent": scrolled,
    }
  );

  const logoClasses = classNames(
    "transition-all inline-block inset-0 absolute",
    { "opacity-100": !scrolled },
    { "opacity-0 lg:opacity-100": scrolled }
  );

  const logoDarkClasses = classNames(
    "transition-all inline-block inset-0 absolute",
    { "opacity-0": !scrolled },
    { "opacity-100 lg:opacity-0": scrolled }
  );

  return (
    <header style={{ zIndex: 1 }} className={headerClasses}>
      <div className="flex justify-between lg:justify-start items-center">
        <Link to="/" className="relative w-16 h-16 inline-block">
          <img
            src="/logo-round.svg"
            width="64"
            heigt="64"
            className={logoClasses}
          />
          <img
            src="/logo-round-dark.svg"
            width="64"
            heigt="64"
            className={logoDarkClasses}
          />
        </Link>
        {/* {scrolled && (
        <span className="transition-all lg:hidden text-white">
          <FontAwesomeIcon icon={faChevronLeft} className="mx-2" />
          Back to recipes
        </span>
      )} */}
        <div>
          <NavButtons pagePath={pagePath} />
        </div>
      </div>
    </header>
  );
};

export default Header;
