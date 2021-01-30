exports.getPathFromFilepath = filepath => {
  return filepath.split("/src/pages")[1].replace(".md", "")
}

exports.makeTitle = slug => {
  return slug.charAt(0).toUpperCase() + slug.split("-").join(" ").slice(1)
}
