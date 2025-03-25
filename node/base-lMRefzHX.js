var w = Object.defineProperty;
var k = (e, t, n) => t in e ? w(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var h = (e, t, n) => k(e, typeof t != "symbol" ? t + "" : t, n);
import { wrapFunction as y, safeHtml as u } from "./util.js";
function z(e) {
  return e;
}
function r(e, t) {
  e.options.highlight ? e.options.highlight = y(e.options.highlight, (n, ...s) => t(...s) || n(...s)) : e.options.highlight = t;
}
function M() {
}
function c(e) {
  let t = !1, n;
  return function(...s) {
    return t || (t = !0, n = e(...s)), n;
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
  r(e, (n, s) => s === "mermaid" ? (t(), '<pre class="mermaid">' + u(n) + "</pre>") : "");
}, m = {
  name: "mermaid",
  markdown: v
}, F = {
  lang: "text",
  themes: {
    light: "min-light",
    dark: "tokyo-night"
  },
  transformers: [
    {
      pre(e) {
        delete e.properties.style;
      }
    }
  ]
};
let f;
const x = c(async () => {
  const { default: e } = await import("@shikijs/markdown-it");
  f = await e({
    fallbackLanguage: "text",
    ...F
  });
}), E = async () => {
  await x();
}, _ = (e) => {
  const { highlight: t } = e.options;
  e.use(f), t && r(e, (...n) => t(...n));
}, p = {
  name: "shiki",
  preload: E,
  markdown: _
}, $ = (e, { enableFeature: t }) => {
  r(e, (n, s, a) => s === "vega" ? (t(), `<div class="vega">${u(n)}</div>`) : "");
}, g = {
  name: "vega",
  markdown: $
}, A = {
  emoji: d,
  mermaid: m,
  shiki: p,
  vega: g
}, l = [d, p, g, m];
async function I(e = l) {
  await Promise.all(e.map((t) => {
    var n;
    return (n = t.preload) == null ? void 0 : n.call(t);
  }));
}
async function C(e, t = l) {
  await Promise.all(t.map((n) => {
    var s;
    return (s = n.onMounted) == null ? void 0 : s.call(n, e);
  }));
}
const O = c(async () => import("./markdown-it-cms-ArUl.js"));
class L {
  constructor(t, n) {
    h(this, "features", {});
    this.plugins = t, this.md = n, t.forEach(({ name: s, markdown: a }) => {
      a && this.md.use(a, {
        enableFeature: () => this.enableFeature(s)
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
    const n = this.md.render(t), s = this.plugins.filter(
      ({ name: a, always: i }) => i || this.features[a]
    );
    return {
      html: n,
      plugins: s,
      onMounted: (a) => this.process(a, s)
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
    const s = e.slice(4, n), { parse: a } = await import("yaml");
    try {
      t = a(s);
    } catch {
    }
    const i = n + 5;
    e = e.slice(i);
  }
  return { content: e, frontmatter: t };
}
const W = M;
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
