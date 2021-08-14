import Footer from "../components/footer";
import Navbar from "../components/navbar";

const Layout = ({ children, categories }) => {
  return (
    <div>
      <Navbar categories={categories} />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
