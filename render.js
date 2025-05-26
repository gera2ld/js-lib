var P = Object.defineProperty;
var C = (e, t, n) => t in e ? P(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var g = (e, t, n) => C(e, typeof t != "symbol" ? t + "" : t, n);
import { once as s } from "https://cdn.jsdelivr.net/npm/es-toolkit@1.38.0/+esm";
import { loadJS as k, safeHtml as y } from "./util.js";
var L = Object.defineProperty, R = (e, t, n) => t in e ? L(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, h = (e, t, n) => R(e, typeof t != "symbol" ? t + "" : t, n);
function N(e, ...t) {
  let n = e.replace(/%./g, (r) => {
    const i = r[1];
    if ("df".includes(i)) return String(Number(t.shift()));
    if ("j".includes(i)) return JSON.stringify(t.shift());
    if ("soO".includes(i)) {
      const o = t.shift();
      return o instanceof Error ? `${o}
${o.stack}` : o && typeof o == "object" ? JSON.stringify(o) : String(o);
    }
    return r;
  });
  return t.length && (n += " " + t.join(" ")), n;
}
function v(e, t) {
  return function(...n) {
    return t.call(this, e, ...n);
  };
}
const q = class M {
  constructor(t, n) {
    h(this, "output"), h(this, "options"), this.prefix = t, this.options = {
      ...M.defaultOptions,
      ...n
    };
  }
  collect() {
    return this.output = [], () => {
      const { output: t } = this;
      if (this.output = void 0, !t) throw new Error("Logs already collected");
      return t;
    };
  }
  log(t, n, ...r) {
    const i = N(n, ...r);
    this.output && this.output.push(i), console[t](
      ...this.options.timestamp ? [(/* @__PURE__ */ new Date()).toLocaleString()] : [],
      this.prefix,
      i
    );
  }
  info(t, ...n) {
    return this.log("info", t, ...n);
  }
  error(t, ...n) {
    return this.log("error", t, ...n);
  }
  wrap(t, n) {
    const r = this;
    return v(t, function(i, ...o) {
      return n.call(this, r, i, ...o);
    });
  }
};
h(q, "defaultOptions", {
  timestamp: !1
});
function et(e) {
  return e;
}
function m(e, t) {
  e.options.highlight ? e.options.highlight = v(e.options.highlight, (n, ...r) => t(...r) || n(...r)) : e.options.highlight = t;
}
const A = s(async () => (await k(
  "https://cdn.jsdelivr.net/npm/emoji-js@3.8.1/lib/emoji.min.js"
), new window.EmojiConvertor())), F = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let u;
function J(e) {
  const t = e.src[e.pos] === ":" && e.src.slice(e.pos).match(F);
  if (!t) return !1;
  const [n] = t;
  return e.pending += u.replace_colons(n), e.pos += n.length, !0;
}
const b = {
  name: "emoji",
  async preload() {
    u = await A(), u.replace_mode = "unified";
  },
  markdown: (e) => {
    e.inline.ruler.push("emoji", J);
  }
}, T = (e, { enableFeature: t }) => {
  m(e, (n, r) => r === "mermaid" ? (t(), '<pre class="mermaid">' + y(n) + "</pre>") : "");
}, I = s(async () => {
  const { default: e } = await import("https://cdn.jsdelivr.net/npm/mermaid@11.6.0/dist/mermaid.esm.min.mjs"), t = window.matchMedia("(prefers-color-scheme: dark)");
  return e.initialize({
    startOnLoad: !1,
    theme: t.matches ? "dark" : "default"
  }), e;
});
async function _(e) {
  const t = e.querySelectorAll("pre.mermaid");
  if (!t.length) return;
  await (await I()).run({
    nodes: t
  });
}
const j = {
  name: "mermaid",
  markdown: T,
  onMounted: _
}, w = {
  lang: "text",
  themes: {
    light: "min-light",
    dark: "tokyo-night"
  },
  defaultColor: !1,
  transformers: [
    {
      pre(e) {
        delete e.properties.style;
      }
    }
  ]
}, $ = s(() => {
  const e = `.shiki span {
  color: var(--shiki-light, inherit);
  background-color: var(--shiki-light-bg, inherit);
  font-style: var(--shiki-light-font-style, inherit);
  font-weight: var(--shiki-light-font-weight, inherit);
  text-decoration: var(--shiki-light-text-decoration, inherit);
}
@media (prefers-color-scheme: dark) {
  .shiki span {
    color: var(--shiki-dark, inherit);
    background-color: var(--shiki-dark-bg, inherit);
    font-style: var(--shiki-dark-font-style, inherit);
    font-weight: var(--shiki-dark-font-weight, inherit);
    text-decoration: var(--shiki-dark-text-decoration, inherit);
  }
}`, t = document.createElement("style");
  t.textContent = e, document.head.append(t);
}), x = s(async () => {
  const { codeToHtml: e } = await import("https://cdn.jsdelivr.net/npm/shiki@3.4.2/+esm");
  return e;
}), z = async () => {
  $(), await x();
}, V = (e, { enableFeature: t }) => {
  m(e, () => (t(), ""));
}, W = async (e) => {
  $();
  const t = e.querySelectorAll("pre:not(.shiki)>code");
  if (!t.length) return;
  const n = await x();
  t.forEach(async (r) => {
    var p;
    const i = r.parentNode, o = (p = r.className.match(/^language-(\S+)$/)) == null ? void 0 : p[1], l = r.textContent;
    if (!i || !o || !l) return;
    i.classList.add("shiki");
    let d;
    try {
      d = await n(l, {
        ...w,
        lang: o
      });
    } catch {
      d = await n(l, w);
    }
    const f = document.createElement("div");
    f.innerHTML = d;
    const a = f.firstElementChild;
    (a == null ? void 0 : a.tagName) === "PRE" && a.classList.contains("shiki") && i.replaceWith(a);
  });
}, E = {
  name: "shiki",
  preload: z,
  markdown: V,
  onMounted: W
}, D = (e, { enableFeature: t }) => {
  m(e, (n, r, i) => r === "vega" ? (t(), `<div class="vega">${y(n)}</div>`) : "");
}, X = s(
  () => k(
    "https://cdn.jsdelivr.net/combine/npm/vega@5.33.0,npm/vega-lite@5.23.0,npm/vega-embed@6.29.0"
  )
);
async function Z(e) {
  const t = e.querySelectorAll(".vega:not([data-processed])");
  t.length && (await X(), t.forEach((n) => {
    const r = n.textContent;
    n.dataset.processed = "true";
    const i = document.createElement("div");
    i.style.width = "100%", n.append(i), window.vegaEmbed(i, r);
  }));
}
const S = {
  name: "vega",
  markdown: D,
  onMounted: Z
}, nt = {
  emoji: b,
  mermaid: j,
  shiki: E,
  vega: S
}, c = [b, E, S, j];
async function O(e = c) {
  await Promise.all(e.map((t) => {
    var n;
    return (n = t.preload) == null ? void 0 : n.call(t);
  }));
}
async function H(e, t = c) {
  await Promise.all(t.map((n) => {
    var r;
    return (r = n.onMounted) == null ? void 0 : r.call(n, e);
  }));
}
let B = class {
  constructor(t) {
    this.plugins = t;
  }
  static async create(t = c) {
    return await O(t), new this(t);
  }
  render(t) {
    return {
      html: t,
      plugins: this.plugins,
      onMounted: (n) => this.process(n)
    };
  }
  process(t, n = this.plugins) {
  }
};
class it extends B {
  process(t, n = this.plugins) {
    H(t, n);
  }
}
const G = s(async () => import("./markdown-it-CWWnOdsP.js"));
let K = class {
  constructor(t, n) {
    g(this, "features", {});
    this.plugins = t, this.md = n, t.forEach(({ name: r, markdown: i }) => {
      i && this.md.use(i, {
        enableFeature: () => this.enableFeature(r)
      });
    });
  }
  static async create(t = c) {
    const [{ initMarkdownIt: n }] = await Promise.all([
      G(),
      O(t)
    ]);
    return new this(t, n());
  }
  enableFeature(t) {
    this.features[t] = !0;
  }
  render(t) {
    this.features = {};
    const n = this.md.render(t), r = this.plugins.filter(
      ({ name: i, always: o }) => o || this.features[i]
    );
    return {
      html: n,
      plugins: r,
      onMounted: (i) => this.process(i, r)
    };
  }
  process(t, n = this.plugins) {
  }
};
async function st(e) {
  let t;
  const n = e.startsWith(`---
`) ? e.indexOf(`
---
`) : -1;
  if (n > 0) {
    const r = e.slice(4, n), { parse: i } = await import("https://cdn.jsdelivr.net/npm/yaml@2.8.0/+esm");
    try {
      t = i(r);
    } catch {
    }
    const o = n + 5;
    e = e.slice(o);
  }
  return { content: e, frontmatter: t };
}
class Q extends K {
  process(t, n = this.plugins) {
    H(t, n);
  }
}
async function at({ content: e }, t) {
  const n = await Q.create(), { html: r, onMounted: i } = n.render(e);
  t && (t.innerHTML = r, i(t));
}
export {
  it as HtmlRenderer,
  Q as MarkdownRenderer,
  c as builtInPlugins,
  et as definePlugin,
  G as loadMarkdownIt,
  st as parseFrontmatter,
  m as patchHighlight,
  nt as pluginMap,
  H as pluginMounted,
  O as pluginPreload,
  at as renderMarkdown
};
