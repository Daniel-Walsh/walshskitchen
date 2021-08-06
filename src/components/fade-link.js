// import React from "react"
import AniLink from "gatsby-plugin-transition-link/AniLink";

const FadeLink = ({ to, className, children, style }) => {
  return (
    <AniLink fade duration={0.4} to={to} className={className} style={style}>
      {children}
    </AniLink>
  );
};

export default FadeLink;
