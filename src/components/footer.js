const Footer = () => {
  return (
    <footer className="flex justify-center py-12 px-4 bg-gray-200 text-gray-600">
      <div>
        &copy; {new Date().getFullYear()}, Built by{" "}
        <a href="https://dwalsh.dev/">Dan Walsh</a> with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>
      </div>
    </footer>
  );
};

export default Footer;
