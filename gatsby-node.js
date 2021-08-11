/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const { getPathFromFilepath } = require("./src/global-functions");

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const postsPerPage = 12;
  const pageTemplate = require.resolve(`./src/templates/page.js`);
  //   const releaseTemplate = require.resolve(`./src/templates/release.js`)
  const recipeTemplate = require.resolve(`./src/templates/recipe.js`);
  const recipeIndexTemplate = require.resolve(`./src/templates/tag-index.js`);
  const recipeCategoryTemplate = require.resolve(
    `./src/templates/category-index.js`
  );
  const recipeListTemplate = require.resolve(`./src/templates/recipe-list.js`);

  const result = await graphql(`
    {
      recipes: allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fileAbsolutePath
          }
        }
      }
      tags: allMarkdownRemark(filter: { frontmatter: { tags: { ne: null } } }) {
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

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.recipes.edges.forEach(({ node }) => {
    // const path = node.fileAbsolutePath.split("/src/pages")[1].replace(".md", "")
    const path = getPathFromFilepath(node.fileAbsolutePath);

    // let path = node.fileAbsolutePath
    //   .split("/src/pages/recipes/")[1]
    //   .replace(".md", "")
    // path = "/recipes/" + path.split("/")[1]
    // console.log(path)

    let component = pageTemplate;
    if (path.indexOf("/releases/") === 0) {
      component = releaseTemplate;
    }
    if (path.indexOf("/recipes/") === 0) {
      component = recipeTemplate;
    }

    createPage({
      path: path,
      component: component,
      context: {
        // additional data can be passed via context
        // slug: path,
        fileAbsolutePath: node.fileAbsolutePath,
      },
    });
  });

  const recipes = result.data.tags.edges;
  let recipeTags = [];

  recipes.forEach((recipe) => {
    recipe.node.frontmatter.tags.forEach((tag) => {
      recipeTags.push(tag);
    });
  });

  // Filter out just the unique tags
  recipeTags = [...new Set(recipeTags)];

  recipeTags.forEach((tag) => {
    createPage({
      path: `/tags/${tag}`,
      component: recipeIndexTemplate,
      context: {
        tag,
      },
    });
  });

  // category pages
  let categories = result.data.recipes.edges.map((recipe) => {
    return recipe.node.fileAbsolutePath
      .split("/src/pages/recipes/")[1]
      .split("/")[0];
  });

  categories = [...new Set(categories)];

  // categories.forEach((category) => {
  //   createPage({
  //     path: `/category/${category}`,
  //     component: recipeCategoryTemplate,
  //     context: {
  //       glob: `**/src/pages/recipes/${category}/**`,
  //       category,
  //     },
  //   });
  // });

  categories.forEach((category) => {
    const categoryRecipes = result.data.recipes.edges.filter((recipe) => {
      return (
        recipe.node.fileAbsolutePath.indexOf(`/pages/recipes/${category}/`) > -1
      );
    });
    console.log(category, categoryRecipes.length);
    const numPages = Math.ceil(categoryRecipes.length / postsPerPage);
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path:
          i === 0
            ? `/category/${category}`
            : `/category/${category}/page/${i + 1}`,
        component: recipeListTemplate,
        context: {
          limit: postsPerPage,
          skip: i * postsPerPage,
          numPages,
          currentPage: i + 1,
          numRecipes: categoryRecipes.length,
          categories,
          category,
          glob: `**/src/pages/recipes/${category}/**`,
        },
      });
    });
    // createPage({
    //   path: `/category-new/${category}`,
    //   component: recipeListTemplate,
    //   context: {
    //     glob: `**/src/pages/recipes/${category}/**`,
    //     category,
    //   },
    // });
  });

  // ...

  // Create blog-list pages
  const posts = result.data.recipes.edges;
  const numPages = Math.ceil(posts.length / postsPerPage);
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/` : `/page/${i + 1}`,
      component: recipeListTemplate,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        numRecipes: posts.length,
        categories,
        glob: `**/src/pages/recipes/**`,
      },
    });
  });
};
