var g = Object.defineProperty;
var k = (e, t, n) => t in e ? g(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var h = (e, t, n) => k(e, typeof t != "symbol" ? t + "" : t, n);
import { wrapFunction as M, safeHtml as u } from "./util.js";
function z(e) {
  return e;
}
function r(e, t) {
  e.options.highlight ? e.options.highlight = M(e.options.highlight, (n, ...a) => t(...a) || n(...a)) : e.options.highlight = t;
}
function y() {
}
function c(e) {
  let t = !1, n;
  return function(...a) {
    return t || (t = !0, n = e(...a)), n;
  };
}
const j = c(async () => {
  const { EmojiConvertor: e } = await import("emoji-js");
  return new e();
}), P = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let o;
function b(e) {
  const t = e.src[e.pos] === ":" && e.src.slice(e.pos).match(P);
  if (!t) return !1;
  const [n] = t;
  return e.pending += o.replace_colons(n), e.pos += n.length, !0;
}
const d = {
  name: "emoji",
  async preload() {
    o = await j(), o.replace_mode = "unified";
  },
  markdown: (e) => {
    e.inline.ruler.push("emoji", b);
  }
}, v = (e, { enableFeature: t }) => {
  r(e, (n, a) => a === "mermaid" ? (t(), '<pre class="mermaid">' + u(n) + "</pre>") : "");
}, m = {
  name: "mermaid",
  markdown: v
}, F = {
  themes: {
    light: "one-light",
    dark: "tokyo-night"
  }
};
let f;
const E = c(async () => {
  const { default: e } = await import("@shikijs/markdown-it");
  f = await e({
    fallbackLanguage: "text",
    ...F
  });
}), _ = async () => {
  await E();
}, $ = (e) => {
  const { highlight: t } = e.options;
  e.use(f), t && r(e, (...n) => t(...n));
}, p = {
  name: "shiki",
  preload: _,
  markdown: $
}, x = (e, { enableFeature: t }) => {
  r(e, (n, a, s) => a === "vega" ? (t(), `<div class="vega">${u(n)}</div>`) : "");
}, w = {
  name: "vega",
  markdown: x
}, A = {
  emoji: d,
  mermaid: m,
  shiki: p,
  vega: w
}, l = [d, p, w, m];
async function I(e = l) {
  await Promise.all(e.map((t) => {
    var n;
    return (n = t.preload) == null ? void 0 : n.call(t);
  }));
}
async function C(e, t = l) {
  await Promise.all(t.map((n) => {
    var a;
    return (a = n.onMounted) == null ? void 0 : a.call(n, e);
  }));
}
const O = c(async () => import("./markdown-it-cms-ArUl.js"));
class L {
  constructor(t, n) {
    h(this, "features", {});
    this.plugins = t, this.md = n, t.forEach(({ name: a, markdown: s }) => {
      s && this.md.use(s, {
        enableFeature: () => this.enableFeature(a)
      });
    });
  }
  static async create(t = l) {
    const [{ initMarkdownIt: n }] = await Promise.all([
      O(),
      I(t)
    ]);
    return new this(t, n());
  }
  enableFeature(t) {
    this.features[t] = !0;
  }
  render(t) {
    this.features = {};
    const n = this.md.render(t), a = this.plugins.filter(
      ({ name: s, always: i }) => i || this.features[s]
    );
    return {
      html: n,
      plugins: a,
      onMounted: (s) => this.process(s, a)
    };
  }
  process(t, n = this.plugins) {
  }
}
async function R(e) {
  let t;
  const n = e.startsWith(`---
`) ? e.indexOf(`
---
`) : -1;
  if (n > 0) {
    const a = e.slice(4, n), { parse: s } = await import("yaml");
    try {
      t = s(a);
    } catch {
    }
    const i = n + 5;
    e = e.slice(i);
  }
  return { content: e, frontmatter: t };
}
const W = y;
export {
  L as M,
  I as a,
  l as b,
  C as c,
  z as d,
  r as e,
  A as f,
  O as l,
  R as p,
  W as r
};
