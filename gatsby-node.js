/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const {
  getPathFromFilepath,
  makeTitle,
  getPath,
} = require("./src/global-functions");

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
      recipes: allMarkdownRemark(
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
  let categories = recipes.map((recipe) => {
    return recipe.node.fileAbsolutePath
      .split("/src/pages/recipes/")[1]
      .split("/")[0];
  });
  categories = [...new Set(categories)];

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
      createPage({
        path: i === 0 ? basePath : `${basePath}page/${i + 1}`,
        component: recipeListTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          numRecipes: includedRecipes.length,
          categories,
          basePath,
          pageTitle,
          ...additionalContext,
        },
      });
    });
  };

  // Create content pages
  pages.forEach(({ node }) => {
    const component = node.fileAbsolutePath.includes("/about.md")
      ? pageNoteTemplate
      : pageDefaultTemplate;
    createPage({
      path: getPath(node.fileAbsolutePath, ["src", "pages"]),
      component,
      context: {
        categories,
        fileAbsolutePath: node.fileAbsolutePath,
      },
    });
  });

  // Create recipe pages
  recipes.forEach(({ node }) => {
    // Get the old recipe URL to set up 301 redirects with
    const fromPath = `/${
      getPathFromFilepath(node.fileAbsolutePath).split("/")[2]
    }`;

    const path = getPathFromFilepath(node.fileAbsolutePath);
    createPage({
      path,
      component: recipeTemplate,
      context: {
        fileAbsolutePath: node.fileAbsolutePath,
      },
    });
    createRedirect({ fromPath, toPath: path, isPermanent: true });
  });

  // Create category index pages
  categories.forEach((category) => {
    const categoryRecipes = recipes.filter(
      (recipe) =>
        recipe.node.fileAbsolutePath.indexOf(`/pages/recipes/${category}/`) > -1
    );
    createIndexPages(
      categoryRecipes,
      `/category/${category}/`,
      `${makeTitle(category)} | Recipes`,
      {
        category,
        glob: `**/src/pages/recipes/${category}/**`,
      }
    );
  });

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
      fromPath: `/tags/${tag}`,
      toPath: `/tag/${tag}`,
      isPermanent: true,
    });
  });

  // Create recipe index pages
  createIndexPages(recipes, `/`, "Latest recipes", {
    glob: `**/src/pages/recipes/**`,
  });

  createRedirect({ fromPath: `/recipes`, toPath: `/`, isPermanent: true });
};
