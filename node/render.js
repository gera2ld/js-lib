import { b as e, a as n } from "./base-lMRefzHX.js";
import { M as p, d as u, l as d, p as g, e as c, f as h, c as M, r as m } from "./base-lMRefzHX.js";
class i {
  constructor(r) {
    this.plugins = r;
  }
  static async create(r = e) {
    return await n(r), new this(r);
  }
  render(r) {
    return {
      html: r,
      plugins: this.plugins,
      onMounted: (s) => this.process(s)
    };
  }
  process(r, s = this.plugins) {
  }
}
export {
  i as HtmlRenderer,
  p as MarkdownRenderer,
  e as builtInPlugins,
  u as definePlugin,
  d as loadMarkdownIt,
  g as parseFrontmatter,
  c as patchHighlight,
  h as pluginMap,
  M as pluginMounted,
  n as pluginPreload,
  m as renderMarkdown
};
