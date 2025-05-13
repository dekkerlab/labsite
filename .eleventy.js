const yaml = require("js-yaml");
// const { myFunction } = require("./my-functions.js");
const utils = require("./_data/site.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("static");
  eleventyConfig.addPassthroughCopy("images"); // Keep your original images
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));
  eleventyConfig.addDataExtension("yml", (contents) => yaml.load(contents));

  // Use the imported function for global data
  eleventyConfig.addGlobalData("site", {
    currentYear: utils.currentYear(),
    getLastName: utils.getLastName,
  });

  eleventyConfig.addFilter("sortByLastName", (members) => {
    if (!Array.isArray(members)) {
      return [];
    }
    return members.slice().sort((a, b) => {
      const lastNameA = utils.getLastName(a.name).toLowerCase();
      const lastNameB = utils.getLastName(b.name).toLowerCase();
      return lastNameA.localeCompare(lastNameB);
    });
  });

  eleventyConfig.addFilter("formatDate", (dateObj) => {
    if (!dateObj) return "";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateObj).toLocaleDateString("en-US", options);
  });

  eleventyConfig.addCollection("news", (collectionApi) => {
    const newsPosts = collectionApi.getFilteredByGlob("./news/*.md");
    return newsPosts.sort(
      (a, b) => new Date(b.data.date) - new Date(a.data.date),
    );
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      data: "_data",
      layouts: "_layouts", // Try explicitly setting the layouts directory
    },
  };
};
