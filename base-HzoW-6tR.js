var h = Object.defineProperty;
var p = (e, t, s) => t in e ? h(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var l = (e, t, s) => p(e, typeof t != "symbol" ? t + "" : t, s);
import { once as r } from "https://cdn.jsdelivr.net/npm/es-toolkit@1.32.0/+esm";
import { loadJS as c, fetchBlob as f } from "./util.js";
import { b64encode as y, encodeText as w, decodeText as b, b64decode as j } from "./base64.js";
function D(e) {
  return e;
}
const v = r(async () => (await c(
  "https://cdn.jsdelivr.net/npm/emoji-js@3.8.1/lib/emoji.min.js"
), new window.EmojiConvertor())), M = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let i;
function x(e) {
  const t = e.src[e.pos] === ":" && e.src.slice(e.pos).match(M);
  if (!t) return !1;
  const [s] = t;
  return e.pending += i.replace_colons(s), e.pos += s.length, !0;
}
const E = {
  name: "emoji",
  async preload() {
    i = await v(), i.replace_mode = "unified";
  },
  markdown: (e) => {
    e.inline.ruler.push("emoji", x);
  }
};
function $(e) {
  e.registerLanguage("vue", function(s) {
    return {
      subLanguage: "xml",
      contains: [
        s.COMMENT("<!--", "-->", {
          relevance: 10
        }),
        {
          begin: /^(\s*)(<script>)/gm,
          end: /^(\s*)(<\/script>)/gm,
          subLanguage: "javascript",
          excludeBegin: !0,
          excludeEnd: !0
        },
        {
          begin: /^(?:\s*)(?:<script\s+lang=(["'])ts\1>)/gm,
          end: /^(\s*)(<\/script>)/gm,
          subLanguage: "typescript",
          excludeBegin: !0,
          excludeEnd: !0
        },
        {
          begin: /^(\s*)(<style(\s+scoped)?>)/gm,
          end: /^(\s*)(<\/style>)/gm,
          subLanguage: "css",
          excludeBegin: !0,
          excludeEnd: !0
        },
        {
          begin: /^(?:\s*)(?:<style(?:\s+scoped)?\s+lang=(["'])(?:s[ca]ss)\1(?:\s+scoped)?>)/gm,
          end: /^(\s*)(<\/style>)/gm,
          subLanguage: "scss",
          excludeBegin: !0,
          excludeEnd: !0
        },
        {
          begin: /^(?:\s*)(?:<style(?:\s+scoped)?\s+lang=(["'])stylus\1(?:\s+scoped)?>)/gm,
          end: /^(\s*)(<\/style>)/gm,
          subLanguage: "stylus",
          excludeBegin: !0,
          excludeEnd: !0
        }
      ]
    };
  });
}
function k(e) {
  return $(e), e;
}
const u = "https://cdn.jsdelivr.net/npm/", m = "11.11.1", P = r(async () => {
  const [e, t] = await Promise.all(
    ["tokyo-night-dark", "tokyo-night-light"].map(
      (a) => f(
        `${u}@highlightjs/cdn-assets@${m}/styles/${a}.min.css`
      ).then((o) => o.text())
    )
  ), s = `@media (prefers-color-scheme: dark) {
  ${e}
}
@media (prefers-color-scheme: light) {
  ${t}
}`, n = document.createElement("style");
  n.textContent = s, document.head.append(n);
}), L = r(async () => {
  await c(`${u}@highlightjs/cdn-assets@${m}/highlight.min.js`);
  const e = window.hljs;
  return k(e);
}), O = async () => {
  P();
}, S = async (e) => {
  const t = await L();
  e.querySelectorAll("pre code").forEach((s) => {
    t.highlightElement(s);
  });
}, A = (e, { enableFeature: t, highlighters: s }) => {
  s.default = () => (t(), "");
}, B = {
  name: "hljs",
  preload: O,
  markdown: A,
  onMounted: S
}, q = r(async () => {
  const { default: e } = await import("https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.esm.min.mjs"), t = window.matchMedia("(prefers-color-scheme: dark)");
  return e.initialize({
    startOnLoad: !1,
    theme: t.matches ? "dark" : "default"
  }), e;
});
async function C(e) {
  const t = Array.from(
    e.querySelectorAll("pre code.language-mermaid")
  );
  await (await q()).run({
    nodes: t
  });
}
const F = {
  name: "mermaid",
  onMounted: C
}, J = r(
  () => c(
    "https://cdn.jsdelivr.net/combine/npm/vega@5.31.0,npm/vega-lite@5.23.0,npm/vega-embed@6.29.0"
  )
);
async function N(e) {
  await J(), e.querySelectorAll("[data-vega]").forEach((t) => {
    const s = t.dataset.vega || "", n = JSON.parse(b(j(s)));
    t.removeAttribute("data-vega");
    const a = document.createElement("div");
    a.style.width = "100%", t.append(a), window.vegaEmbed(a, n);
  });
}
const _ = {
  name: "vega",
  markdown: (e, { enableFeature: t, highlighters: s }) => {
    s.vega = (n) => (t(), `<div data-vega="${y(w(JSON.stringify(JSON.parse(n))))}"></div>`);
  },
  onMounted: N
}, d = [E, B, _, F];
async function z(e = d) {
  await Promise.all(e.map((t) => {
    var s;
    return (s = t.preload) == null ? void 0 : s.call(t);
  }));
}
async function W(e, t = d) {
  await Promise.all(t.map((s) => {
    var n;
    return (n = s.onMounted) == null ? void 0 : n.call(s, e);
  }));
}
const I = r(async () => import("./markdown-it-D_wqkLE-.js"));
let Z = class g {
  constructor(t, s, n) {
    l(this, "features", {});
    this.plugins = t, this.md = s, this.highlighters = n, t.forEach(({ name: a, markdown: o }) => {
      o && this.md.use(o, {
        enableFeature: () => this.enableFeature(a),
        highlighters: n
      });
    });
  }
  static async create(t = d) {
    const s = {}, [{ initMarkdownIt: n }] = await Promise.all([
      I(),
      z(t)
    ]);
    return new g(
      t,
      n(s),
      s
    );
  }
  enableFeature(t) {
    this.features[t] = !0;
  }
  render(t) {
    this.features = {};
    const s = this.md.render(t), n = this.plugins.filter(
      ({ name: a, always: o }) => o || this.features[a]
    );
    return {
      html: s,
      plugins: n,
      onMounted: (a) => this.process(a, n)
    };
  }
  process(t, s = this.plugins) {
  }
};
async function G(e) {
  let t;
  const s = e.startsWith(`---
`) ? e.indexOf(`
---
`) : -1;
  if (s > 0) {
    const n = e.slice(4, s), { parse: a } = await import("https://cdn.jsdelivr.net/npm/yaml@2.7.0/+esm");
    try {
      t = a(n);
    } catch {
    }
    const o = s + 5;
    e = e.slice(o);
  }
  return { content: e, frontmatter: t };
}
export {
  Z as M,
  z as a,
  d as b,
  W as c,
  D as d,
  I as l,
  G as p
};
