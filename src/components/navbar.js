import { Link, navigate } from "gatsby";

const Navbar = ({ collections }) => {
  const handleMenuChange = (slug) => {
    if (slug) {
      navigate(`/collection/${slug}`);
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
            />
          </Link>
        </div>
        <div>
          {/* <select
            onChange={(event) => handleMenuChange(event.target.value)}
            className="
              block 
              w-10
              pr-7
              sm:pr-10
              sm:w-full
              rounded-md
            bg-gray-100
              border-transparent
            focus:border-red-500
            focus:bg-white
              focus:ring-0"
          >
            <option value="">Le menu</option>
            {collections.map(({ collection }, index) => (
              <option key={index} value={collection.slug}>
                {collection.name}
              </option>
            ))}
          </select> */}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
