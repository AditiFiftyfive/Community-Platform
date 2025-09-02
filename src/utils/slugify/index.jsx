export const slugify = (text) =>
  text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")      // spaces → dashes
    .replace(/[^\w\-]+/g, "")  // remove non-word chars
    .replace(/\-\-+/g, "-");   // collapse multiple -
