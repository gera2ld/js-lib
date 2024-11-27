import { a as e, b as s, c as t } from "./markdown-Bvp2SNRK.js";
import { M as d, g as l, l as p, p as c, r as u } from "./markdown-Bvp2SNRK.js";
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
  d as MarkdownRenderer,
  s as builtInPlugins,
  l as getRenderer,
  p as loadMarkdownIt,
  c as parseFrontmatter,
  t as pluginMounted,
  e as pluginPreload,
  u as renderMarkdown
};
