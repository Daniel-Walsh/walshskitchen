/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it
// import "jquery/dist/jquery.min.js";
// import "bootstrap/dist/js/bootstrap.bundle";
import "@fontsource/pacifico";
import "@fontsource/open-sans";
import "@fontsource/open-sans/600.css";
import "@fontsource/open-sans/700.css";
import "@fontsource/pangolin";
import "@fontsource/caveat";
import "./src/styles/global.css";
import smoothscroll from "smoothscroll-polyfill";

export function onClientEntry() {
  smoothscroll.polyfill();
}

// exports.onClientEntry = () => {
// };
