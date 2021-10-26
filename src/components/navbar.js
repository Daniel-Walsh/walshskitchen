import Link from "./link";
import NavButtons from "./navbuttons";

const Navbar = ({ pagePath }) => {
  return (
    <header className="bg-primary p-4 border-b border-primary fixed w-full z-50 shadow-md -mt-0.5">
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
          <NavButtons pagePath={pagePath} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
