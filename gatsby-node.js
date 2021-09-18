/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const { getPathFromFilepath, getPath } = require("./src/global-functions");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage, createRedirect } = actions;
  const pageDefaultTemplate = require.resolve(
    `./src/templates/page-default.js`
  );
  const pageNoteTemplate = require.resolve(`./src/templates/page-note.js`);
  const recipeTemplate = require.resolve(`./src/templates/recipe.js`);
  const recipeListTemplate = require.resolve(`./src/templates/recipe-list.js`);

  const result = await graphql(`
    {
      recipes: allStrapiRecipe {
        edges {
          node {
            id
            title
            slug
          }
        }
      }
      collections: allStrapiCollection {
        edges {
          collection: node {
            name
            slug
          }
        }
      }
      categories: allStrapiCategory {
        edges {
          category: node {
            name
            slug
            type: categoryType {
              name
              slug
            }
          }
        }
      }
      pages: allMarkdownRemark(
        filter: { fileAbsolutePath: { glob: "**/pages/*.md" } }
        limit: 1000
      ) {
        edges {
          node {
            fileAbsolutePath
          }
        }
      }
      recipesX: allMarkdownRemark(
        filter: { fileAbsolutePath: { glob: "**/pages/recipes/**" } }
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fileAbsolutePath
          }
        }
      }
      recipesWithTags: allMarkdownRemark(
        filter: { frontmatter: { tags: { ne: null } } }
        limit: 1000
      ) {
        edges {
          node {
            fileAbsolutePath
            frontmatter {
              tags
            }
          }
        }
      }
    }
  `);

  const pages = result.data.pages.edges;
  const recipes = result.data.recipes.edges;
  const recipesWithTags = result.data.recipesWithTags.edges;

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  // Get list of unique categories
  const collections = result.data.collections.edges;
  const categories = result.data.categories.edges;
  // let categories = recipes.map((recipe) => {
  //   return recipe.node.fileAbsolutePath
  //     .split("/src/pages/recipes/")[1]
  //     .split("/")[0];
  // });
  // categories = [...new Set(categories)];

  // Get list of unique tags
  let tags = recipesWithTags
    .map((recipe) => recipe.node.frontmatter.tags)
    .flat();
  tags = [...new Set(tags)];

  const createIndexPages = (
    includedRecipes,
    basePath = "/",
    pageTitle,
    additionalContext = {}
  ) => {
    const postsPerPage = 12;
    const numPages = Math.ceil(includedRecipes.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      let path = i === 0 ? basePath : `${basePath}page/${i + 1}`;
      if (path.endsWith("/") && path !== "/") {
        path = path.replace(/\/$/, "");
      }
      createPage({
        path,
        component: recipeListTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          numRecipes: includedRecipes.length,
          categories,
          collections,
          basePath,
          pageTitle,
          ...additionalContext,
        },
      });
      // createRedirect({
      //   fromPath: encodeURI(`${path}/`),
      //   toPath: encodeURI(path),
      //   isPermanent: true,
      // });
    });
  };

  // Create content pages
  pages.forEach(({ node }) => {
    const component = node.fileAbsolutePath.includes("/about.md")
      ? pageNoteTemplate
      : pageDefaultTemplate;
    const path = getPath(node.fileAbsolutePath, ["src", "pages"]);
    createPage({
      path,
      component,
      context: {
        categories,
        fileAbsolutePath: node.fileAbsolutePath,
      },
    });
    // createRedirect({
    //   fromPath: encodeURI(`${path}/`),
    //   toPath: encodeURI(path),
    //   isPermanent: true,
    // });
  });

  // Create recipe pages
  recipes.forEach(({ node }) => {
    // Get the old recipe URL to set up 301 redirects with
    // const fromPath = `/${
    //   getPathFromFilepath(node.fileAbsolutePath).split("/")[2]
    // }`;
    const fromPath = `/${node.slug}`;
    const path = `/recipes/${node.slug}`;

    // const path = getPathFromFilepath(node.fileAbsolutePath);

    createPage({
      path,
      component: recipeTemplate,
      context: {
        id: node.id,
        pathName: path,
        // fileAbsolutePath: node.fileAbsolutePath,
      },
    });
    createRedirect({
      fromPath: encodeURI(fromPath),
      toPath: encodeURI(path),
      isPermanent: true,
    });
  });

  // Create category index pages
  // categories.forEach((category) => {
  //   const categoryRecipes = recipes.filter(
  //     (recipe) =>
  //       recipe.node.fileAbsolutePath.indexOf(
  //         `/pages/recipes/${category.node.slug}/`
  //       ) > -1
  //   );
  //   createIndexPages(
  //     categoryRecipes,
  //     `/category/${category.node.slug}/`,
  //     `${category.node.name} | Recipes`,
  //     {
  //       category: category.node.name,
  //       glob: `**/src/pages/recipes/${category.node.slug}/**`,
  //     }
  //   );
  // });

  // Create tag index pages
  tags.forEach((tag) => {
    const tagRecipes = recipesWithTags.filter((recipe) => {
      return recipe.node.frontmatter.tags.includes(tag);
    });
    createIndexPages(tagRecipes, `/tag/${tag}/`, `#${tag} | Recipes`, {
      tag,
      glob: `**/src/pages/recipes/**`,
    });
    createRedirect({
      fromPath: encodeURI(`/tags/${tag}`),
      toPath: encodeURI(`/tag/${tag}`),
      isPermanent: true,
    });
  });

  // Create recipe index pages
  createIndexPages(recipes, `/`, "Latest recipes", {
    glob: `**/src/pages/recipes/**`,
  });

  createRedirect({ fromPath: `/recipes`, toPath: `/`, isPermanent: true });
};
