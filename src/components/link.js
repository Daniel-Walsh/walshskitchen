import AniLink from "gatsby-plugin-transition-link/AniLink";

const Link = (props) => {
  return (
    <AniLink paintDrip color="white" {...props}>
      {props.children}
    </AniLink>
  );
};

export default Link;
