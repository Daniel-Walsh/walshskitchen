const Footer = () => {
  return (
    <footer className="d-flex justify-content-center py-5 px-3 bg-grey">
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
