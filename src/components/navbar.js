import { Link, navigate } from "gatsby";
import { makeTitle } from "../global-functions";

const Navbar = ({ categories }) => {
  const handleMenuChange = (event) => {
    if (event.target.value !== "") {
      navigate(`/category/${event.target.value}`);
    }
  };

  return (
    <header className="bg-white p-4 border-b border-primary">
      <div className="container mx-auto flex justify-between">
        <div>
          <Link to="/" aria>
            <img
              src="/logo-notag.svg"
              className="h-10"
              alt="Walsh's Kitchen logo"
              //   width="64"
              //   width=
              //   height="100"
              //   className={logoClasses}
            />
          </Link>
        </div>
        <div>
          <select
            onChange={(event) => {
              handleMenuChange(event);
            }}
            className="block w-10 pr-7 sm:pr-10 sm:w-full rounded-md bg-gray-100 border-transparent focus:border-red-500 focus:bg-white focus:ring-0"
          >
            <option value="">Le menu</option>
            {categories &&
              categories.map((category, index) => {
                return (
                  <option key={index} value={category}>
                    {makeTitle(category)}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
