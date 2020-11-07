exports.getPathFromFilepath = filepath => {
  return filepath.split("/src/pages")[1].replace(".md", "")
}
