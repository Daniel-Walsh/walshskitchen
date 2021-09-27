import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBars } from "@fortawesome/pro-solid-svg-icons";

import Link from "./link";

const NavButtons = ({ pagePath }) => {
  const navButton = {};
  if (pagePath === "/categories/") {
    navButton.to = "/";
    navButton.label = "All recipes";
    navButton.icon = faHouse;
  } else {
    navButton.to = "/categories";
    navButton.label = "Categories";
    navButton.icon = faBars;
  }
  return (
    <>
      <Link
        to={navButton.to}
        className="btn border border-white text-white hover:text-primary hover:bg-white mb-0 ml-4 px-3 sm:px-4"
      >
        <FontAwesomeIcon
          icon={navButton.icon}
          className=""
          fixedWidth
          size="1x"
        />
        <span className="ml-2 hidden sm:inline">{navButton.label}</span>
      </Link>
    </>
  );
};

export default NavButtons;
