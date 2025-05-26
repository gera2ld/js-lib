function e(t) {
  if (!t.startsWith("gist:")) throw new Error("Invalid gist URL");
  return `https://gist.githubusercontent.com/raw/${t.slice(5)}`;
}
function n(t) {
  return t = new URL(t, import.meta.url).toString(), t;
}
function i(t) {
  return t.replace(
    /[<&]/g,
    (r) => ({
      "<": "&lt;",
      "&": "&amp;"
    })[r] || ""
  );
}
export {
  n as getFullUrl,
  e as getGistUrl,
  i as safeHtml
};
