import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBars } from "@fortawesome/pro-solid-svg-icons";

import Link from "./link";

const Navbar = ({ location }) => {
  const navButton = {};
  if (location.pathname === "/categories") {
    navButton.to = "/";
    navButton.label = "All recipes";
    navButton.icon = faHouse;
  } else {
    navButton.to = "/categories";
    navButton.label = "Categories";
    navButton.icon = faBars;
  }

  return (
    <header className="bg-primary p-4 border-b border-primary">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/">
            <img
              src="/logo-notag-dark.svg"
              className="h-10"
              alt="Walsh's Kitchen logo"
            />
          </Link>
        </div>
        <div>
          <Link
            to={navButton.to}
            className="btn border border-white text-white hover:text-primary hover:bg-white mb-0 ml-4 px-3 sm:px-4"
          >
            <FontAwesomeIcon icon={navButton.icon} className="" fixedWidth />
            <span className="ml-2 hidden sm:inline">{navButton.label}</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
