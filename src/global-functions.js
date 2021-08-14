exports.getPathFromFilepath = (filepath) => {
  // return filepath.split("/src/pages")[1].replace(".md", "")
  let path = filepath.split("/src/pages/recipes/")[1].replace(".md", "");
  path = "/recipes/" + path.split("/")[1];
  return path;
};

exports.getPath = (fileAbsolutePath, splitOn) => {
  return fileAbsolutePath.split(`/${splitOn.join("/")}/`)[1].replace(".md", "");
};

exports.makeTitle = (slug) => {
  return slug.charAt(0).toUpperCase() + slug.split("-").join(" ").slice(1);
};
