const siteUrl = process.env.URL || `https://walshskitchen.com`;

module.exports = {
  siteMetadata: {
    title: `Walsh's Kitchen`,
    description: `A collection of some of our family’s happiest moments shared around the dinner table.`,
    author: `@_Deedubbs`,
    siteUrl,
  },
  plugins: [
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
                context {
                  fileAbsolutePath
                }
              }
            }
            allFile {
              edges {
                node {
                  modifiedTime
                  absolutePath
                }
              }
            }
          }
        `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({ site, allSitePage, allFile: { edges: files } }) => {
          const currentDate = new Date().toISOString();
          return allSitePage.nodes
            .filter((pageNode) => !pageNode.path.includes("/page/"))
            .map((pageNode) => {
              const modifiedFile = files.filter(({ node: fileNode }) => {
                if (
                  fileNode.absolutePath === pageNode.context.fileAbsolutePath
                ) {
                  return true;
                }
              });

              const modified =
                modifiedFile.length > 0
                  ? modifiedFile[0].node.modifiedTime
                  : currentDate;

              return {
                path: pageNode.path,
                modified,
              };
            });
        },
        serialize: ({ path, modified }) => {
          return {
            url: `${siteUrl}${path}`.replace(/\/$/, ""),
            lastmod: modified,
          };
        },
      },
    },
    `gatsby-plugin-netlify`,
    "gatsby-plugin-image",
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-transition-link`,
    "gatsby-plugin-postcss",
    {
      resolve: `gatsby-source-strapi`,
      options: {
        apiURL: `https://immense-fjord-35218.herokuapp.com`,
        queryLimit: 1000, // Defaults to 100
        collectionTypes: [`recipe`, `category`, `category-types`],
        // singleTypes: [`home-page`, `contact`],
      },
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        // rule: {
        //   include: /assets/ // See below to configure properly
        // }
      },
    },
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Walsh's Kitchen`,
        short_name: `Walsh's Kitchen`,
        start_url: `/`,
        background_color: `#f8f9fa`,
        theme_color: `#ef4444`,
        // display: `minimal-ui`,
        display: `standalone`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
        icon_options: {
          // For all the options available,
          // please see the section "Additional Resources" below.
          purpose: `any maskable`,
        },
        // cache_busting_mode: "none",
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          "UA-131167772-1",
          // "GA-TRACKING_ID", // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
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
    // `gatsby-plugin-remove-serviceworker`,
    `gatsby-plugin-offline`,
  ],
};
