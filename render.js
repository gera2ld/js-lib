import { b as i, a as d, c as s, M as l } from "./base-HzoW-6tR.js";
import { d as w, l as f, p as R } from "./base-HzoW-6tR.js";
let c = class t {
  constructor(e) {
    this.plugins = e;
  }
  static async create(e = i) {
    return await d(e), new t(e);
  }
  render(e) {
    return {
      html: e,
      plugins: this.plugins,
      onMounted: (n) => this.process(n)
    };
  }
  process(e, n = this.plugins) {
  }
};
class g extends c {
  process(e, n = this.plugins) {
    s(e, n);
  }
}
class u extends l {
  process(e, n = this.plugins) {
    s(e, n);
  }
}
async function m({ content: r }, e) {
  const n = await u.create(), { html: a, onMounted: o } = n.render(r);
  e && (e.innerHTML = a, o(e));
}
export {
  g as HtmlRenderer,
  u as MarkdownRenderer,
  i as builtInPlugins,
  w as definePlugin,
  f as loadMarkdownIt,
  R as parseFrontmatter,
  s as pluginMounted,
  d as pluginPreload,
  m as renderMarkdown
};
