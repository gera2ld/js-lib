import { a as e, b as s, c as t } from "./markdown-yIxItBIK.js";
import { M as c, g as d, l as u, p as m, r as g } from "./markdown-yIxItBIK.js";
import "./util.js";
import "./base64.js";
class a {
  constructor(r) {
    this.plugins = r;
  }
  static async create(r = s) {
    return await e(r), new a(r);
  }
  process(r) {
    t(r, this.plugins);
  }
}
export {
  a as HtmlRenderer,
  c as MarkdownRenderer,
  s as builtInPlugins,
  d as getRenderer,
  u as loadRemarkable,
  m as parseFrontmatter,
  t as pluginMounted,
  e as pluginPreload,
  g as renderMarkdown
};
