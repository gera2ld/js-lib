import { a as t, b as e, c as s } from "./markdown-ZZTvlF1u.js";
import { M as l, g as c, l as u, p as g, r as m } from "./markdown-ZZTvlF1u.js";
import "./util.js";
import "./base64.js";
class a {
  constructor(r) {
    this.plugins = r;
  }
  static async create(r = e) {
    return await t(r), new a(r);
  }
  process(r) {
    s(r, this.plugins);
  }
}
export {
  a as HtmlRenderer,
  l as MarkdownRenderer,
  e as builtInPlugins,
  c as getRenderer,
  u as loadMarkdownIt,
  g as parseFrontmatter,
  s as pluginMounted,
  t as pluginPreload,
  m as renderMarkdown
};
