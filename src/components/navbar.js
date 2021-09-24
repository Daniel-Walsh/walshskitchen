import Link from "./link";

const Navbar = ({ location }) => {
  const navButton = {};
  if (location.pathname === "/categories") {
    navButton.to = "/";
    navButton.label = "All recipes";
  } else {
    navButton.to = "/categories";
    navButton.label = "Categories";
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
            className="btn border border-white text-white hover:text-primary hover:bg-white mb-0"
          >
            {navButton.label}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
