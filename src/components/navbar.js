import { Link } from "gatsby";

const Navbar = () => {
  return (
    <header className="bg-white p-4 border-b border-primary">
      <Link to="/">
        <img
          src="/logo-notag.svg"
          className="h-7"
          //   width="64"
          //   width=
          //   height="100"
          //   className={logoClasses}
        />
      </Link>
    </header>
  );
};

export default Navbar;
