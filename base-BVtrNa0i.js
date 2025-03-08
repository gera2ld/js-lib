var b = Object.defineProperty;
var E = (t, e, n) => e in t ? b(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var p = (t, e, n) => E(t, typeof e != "symbol" ? e + "" : e, n);
import { once as i } from "https://cdn.jsdelivr.net/npm/es-toolkit@1.32.0/+esm";
import { wrapFunction as $, loadJS as k, safeHtml as w } from "./util.js";
function V(t) {
  return t;
}
function l(t, e) {
  t.options.highlight ? t.options.highlight = $(t.options.highlight, (n, ...a) => e(...a) || n(...a)) : t.options.highlight = e;
}
const x = i(async () => (await k(
  "https://cdn.jsdelivr.net/npm/emoji-js@3.8.1/lib/emoji.min.js"
), new window.EmojiConvertor())), P = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let d;
function S(t) {
  const e = t.src[t.pos] === ":" && t.src.slice(t.pos).match(P);
  if (!e) return !1;
  const [n] = e;
  return t.pending += d.replace_colons(n), t.pos += n.length, !0;
}
const g = {
  name: "emoji",
  async preload() {
    d = await x(), d.replace_mode = "unified";
  },
  markdown: (t) => {
    t.inline.ruler.push("emoji", S);
  }
}, C = (t, { enableFeature: e }) => {
  l(t, (n, a) => a === "mermaid" ? (e(), '<pre class="mermaid">' + w(n) + "</pre>") : "");
}, A = i(async () => {
  const { default: t } = await import("https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.esm.min.mjs"), e = window.matchMedia("(prefers-color-scheme: dark)");
  return t.initialize({
    startOnLoad: !1,
    theme: e.matches ? "dark" : "default"
  }), t;
});
async function F(t) {
  const e = Array.from(t.querySelectorAll("pre.mermaid"));
  await (await A()).run({
    nodes: e
  });
}
const y = {
  name: "mermaid",
  markdown: C,
  onMounted: F
}, f = {
  themes: {
    light: "one-light",
    dark: "tokyo-night"
  }
}, H = i(() => {
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
}), v = i(async () => {
  const { codeToHtml: t } = await import("https://cdn.jsdelivr.net/npm/shiki@3.1.0/+esm");
  return t;
}), O = async () => {
  H(), await v();
}, q = (t, { enableFeature: e }) => {
  l(t, () => (e(), ""));
}, L = async (t) => {
  const e = await v();
  t.querySelectorAll("pre:not(.shiki)>code").forEach(
    async (n) => {
      var u;
      const a = n.parentNode, o = (u = n.className.match(/^language-(\S+)$/)) == null ? void 0 : u[1], s = n.textContent;
      if (!a || !o || !s) return;
      a.classList.add("shiki");
      let c;
      try {
        c = await e(s, {
          lang: o,
          ...f
        });
      } catch {
        c = await e(s, {
          lang: "text",
          ...f
        });
      }
      const h = document.createElement("div");
      h.innerHTML = c;
      const r = h.firstElementChild;
      (r == null ? void 0 : r.tagName) === "PRE" && r.classList.contains("shiki") && a.replaceWith(r);
    }
  );
}, M = {
  name: "shiki",
  preload: O,
  markdown: q,
  onMounted: L
}, _ = (t, { enableFeature: e }) => {
  l(t, (n, a, o) => a === "vega" ? (e(), `<div class="vega">${w(n)}</div>`) : "");
}, I = i(
  () => k(
    "https://cdn.jsdelivr.net/combine/npm/vega@5.32.0,npm/vega-lite@5.23.0,npm/vega-embed@6.29.0"
  )
);
async function N(t) {
  await I(), t.querySelectorAll(".vega:not([data-processed])").forEach(
    (e) => {
      const n = e.textContent;
      e.dataset.processed = "true";
      const a = document.createElement("div");
      a.style.width = "100%", e.append(a), window.vegaEmbed(a, n);
    }
  );
}
const j = {
  name: "vega",
  markdown: _,
  onMounted: N
}, Z = {
  emoji: g,
  mermaid: y,
  shiki: M,
  vega: j
}, m = [g, M, j, y];
async function R(t = m) {
  await Promise.all(t.map((e) => {
    var n;
    return (n = e.preload) == null ? void 0 : n.call(e);
  }));
}
async function B(t, e = m) {
  await Promise.all(e.map((n) => {
    var a;
    return (a = n.onMounted) == null ? void 0 : a.call(n, t);
  }));
}
const T = i(async () => import("./markdown-it-CWWnOdsP.js"));
let D = class {
  constructor(e, n) {
    p(this, "features", {});
    this.plugins = e, this.md = n, e.forEach(({ name: a, markdown: o }) => {
      o && this.md.use(o, {
        enableFeature: () => this.enableFeature(a)
      });
    });
  }
  static async create(e = m) {
    const [{ initMarkdownIt: n }] = await Promise.all([
      T(),
      R(e)
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
async function K(t) {
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
  D as M,
  R as a,
  m as b,
  B as c,
  V as d,
  l as e,
  Z as f,
  T as l,
  K as p
};
