var $ = Object.defineProperty;
var x = (t, e, n) => e in t ? $(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var f = (t, e, n) => x(t, typeof e != "symbol" ? e + "" : e, n);
import { once as i } from "https://cdn.jsdelivr.net/npm/es-toolkit@1.33.0/+esm";
import { wrapFunction as P, loadJS as w, safeHtml as g } from "./util.js";
function Z(t) {
  return t;
}
function m(t, e) {
  t.options.highlight ? t.options.highlight = P(t.options.highlight, (n, ...a) => e(...a) || n(...a)) : t.options.highlight = e;
}
const S = i(async () => (await w(
  "https://cdn.jsdelivr.net/npm/emoji-js@3.8.1/lib/emoji.min.js"
), new window.EmojiConvertor())), C = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let l;
function F(t) {
  const e = t.src[t.pos] === ":" && t.src.slice(t.pos).match(C);
  if (!e) return !1;
  const [n] = e;
  return t.pending += l.replace_colons(n), t.pos += n.length, !0;
}
const y = {
  name: "emoji",
  async preload() {
    l = await S(), l.replace_mode = "unified";
  },
  markdown: (t) => {
    t.inline.ruler.push("emoji", F);
  }
}, H = (t, { enableFeature: e }) => {
  m(t, (n, a) => a === "mermaid" ? (e(), '<pre class="mermaid">' + g(n) + "</pre>") : "");
}, O = i(async () => {
  const { default: t } = await import("https://cdn.jsdelivr.net/npm/mermaid@11.5.0/dist/mermaid.esm.min.mjs"), e = window.matchMedia("(prefers-color-scheme: dark)");
  return t.initialize({
    startOnLoad: !1,
    theme: e.matches ? "dark" : "default"
  }), t;
});
async function q(t) {
  const e = t.querySelectorAll("pre.mermaid");
  if (!e.length) return;
  await (await O()).run({
    nodes: e
  });
}
const v = {
  name: "mermaid",
  markdown: H,
  onMounted: q
}, k = {
  lang: "text",
  themes: {
    light: "min-light",
    dark: "tokyo-night"
  },
  transformers: [
    {
      pre(t) {
        delete t.properties.style;
      }
    }
  ]
}, M = i(() => {
  const t = `@media (prefers-color-scheme: dark) {
  .shiki,
  .shiki span {
    color: var(--shiki-dark) !important;
    background-color: var(--shiki-dark-bg) !important;
    /* Optional, if you also want font styles */
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
    text-decoration: var(--shiki-dark-text-decoration) !important;
  }
}`, e = document.createElement("style");
  e.textContent = t, document.head.append(e);
}), j = i(async () => {
  const { codeToHtml: t } = await import("https://cdn.jsdelivr.net/npm/shiki@3.2.1/+esm");
  return t;
}), A = async () => {
  M(), await j();
}, L = (t, { enableFeature: e }) => {
  m(t, () => (e(), ""));
}, _ = async (t) => {
  M();
  const e = t.querySelectorAll("pre:not(.shiki)>code");
  if (!e.length) return;
  const n = await j();
  e.forEach(async (a) => {
    var p;
    const o = a.parentNode, s = (p = a.className.match(/^language-(\S+)$/)) == null ? void 0 : p[1], c = a.textContent;
    if (!o || !s || !c) return;
    o.classList.add("shiki");
    let d;
    try {
      d = await n(c, {
        ...k,
        lang: s
      });
    } catch {
      d = await n(c, k);
    }
    const u = document.createElement("div");
    u.innerHTML = d;
    const r = u.firstElementChild;
    (r == null ? void 0 : r.tagName) === "PRE" && r.classList.contains("shiki") && o.replaceWith(r);
  });
}, b = {
  name: "shiki",
  preload: A,
  markdown: L,
  onMounted: _
}, I = (t, { enableFeature: e }) => {
  m(t, (n, a, o) => a === "vega" ? (e(), `<div class="vega">${g(n)}</div>`) : "");
}, N = i(
  () => w(
    "https://cdn.jsdelivr.net/combine/npm/vega@5.33.0,npm/vega-lite@5.23.0,npm/vega-embed@6.29.0"
  )
);
async function R(t) {
  const e = t.querySelectorAll(".vega:not([data-processed])");
  e.length && (await N(), e.forEach((n) => {
    const a = n.textContent;
    n.dataset.processed = "true";
    const o = document.createElement("div");
    o.style.width = "100%", n.append(o), window.vegaEmbed(o, a);
  }));
}
const E = {
  name: "vega",
  markdown: I,
  onMounted: R
}, B = {
  emoji: y,
  mermaid: v,
  shiki: b,
  vega: E
}, h = [y, b, E, v];
async function T(t = h) {
  await Promise.all(t.map((e) => {
    var n;
    return (n = e.preload) == null ? void 0 : n.call(e);
  }));
}
async function D(t, e = h) {
  await Promise.all(e.map((n) => {
    var a;
    return (a = n.onMounted) == null ? void 0 : a.call(n, t);
  }));
}
const z = i(async () => import("./markdown-it-CWWnOdsP.js"));
let G = class {
  constructor(e, n) {
    f(this, "features", {});
    this.plugins = e, this.md = n, e.forEach(({ name: a, markdown: o }) => {
      o && this.md.use(o, {
        enableFeature: () => this.enableFeature(a)
      });
    });
  }
  static async create(e = h) {
    const [{ initMarkdownIt: n }] = await Promise.all([
      z(),
      T(e)
    ]);
    return new this(e, n());
  }
  enableFeature(e) {
    this.features[e] = !0;
  }
  render(e) {
    this.features = {};
    const n = this.md.render(e), a = this.plugins.filter(
      ({ name: o, always: s }) => s || this.features[o]
    );
    return {
      html: n,
      plugins: a,
      onMounted: (o) => this.process(o, a)
    };
  }
  process(e, n = this.plugins) {
  }
};
async function Q(t) {
  let e;
  const n = t.startsWith(`---
`) ? t.indexOf(`
---
`) : -1;
  if (n > 0) {
    const a = t.slice(4, n), { parse: o } = await import("https://cdn.jsdelivr.net/npm/yaml@2.7.0/+esm");
    try {
      e = o(a);
    } catch {
    }
    const s = n + 5;
    t = t.slice(s);
  }
  return { content: t, frontmatter: e };
}
export {
  G as M,
  T as a,
  h as b,
  D as c,
  Z as d,
  m as e,
  B as f,
  z as l,
  Q as p
};
