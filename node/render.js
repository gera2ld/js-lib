import { b as e, a as t } from "./base-DRyEr0XR.js";
import { M as l, d as u, l as p, p as d, c, r as g } from "./base-DRyEr0XR.js";
class n {
  constructor(r) {
    this.plugins = r;
  }
  static async create(r = e) {
    return await t(r), new n(r);
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
  n as HtmlRenderer,
  l as MarkdownRenderer,
  e as builtInPlugins,
  u as definePlugin,
  p as loadMarkdownIt,
  d as parseFrontmatter,
  c as pluginMounted,
  t as pluginPreload,
  g as renderMarkdown
};
