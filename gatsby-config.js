module.exports = {
  siteMetadata: {
    title: `Walsh's Kitchen`,
    description: `A collection of some of our family’s happiest moments shared around the dinner table.`,
    author: `@_Deedubbs`,
  },
  plugins: [
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-transition-link`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: `markdown-pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `recipe-images`,
    //     path: `${__dirname}/src/images/recipes`,
    //   },
    // },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Walsh's Kitchen`,
        short_name: `Walsh's Kitchen`,
        start_url: `/recipes/`,
        background_color: `#f8f9fa`,
        theme_color: `#e83333`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
        icon_options: {
          // For all the options available,
          // please see the section "Additional Resources" below.
          purpose: `any maskable`,
        },
        cache_busting_mode: "none",
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 500,
            },
          },
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // {
    //   resolve: "gatsby-plugin-offline",
    //   options: {
    //     precachePages: [`/recipes/`],
    //     workboxConfig: {
    //       globPatterns: ["**/*icon*.png"],
    //     },
    //   },
    // },
    `gatsby-plugin-remove-serviceworker`,
  ],
}
