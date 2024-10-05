var w = Object.defineProperty;
var j = (t, e, n) => e in t ? w(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var m = (t, e, n) => j(t, typeof e != "symbol" ? e + "" : e, n);
import { once as r } from "https://cdn.jsdelivr.net/npm/es-toolkit@1.23.0/+esm";
import { loadCSS as y, loadJS as i, fetchBlob as v } from "./util.js";
import { b64encode as b, encodeText as $, decodeText as M, b64decode as S } from "https://gitlab.com/gera2ld/common-lib/-/raw/main/src/base64.ts";
const k = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let f;
const E = r(async () => {
  y(
    "https://cdn.jsdelivr.net/npm/emoji-js@3.8.0/lib/emoji.min.css"
  ), await i(
    "https://cdn.jsdelivr.net/npm/emoji-js@3.8.0/lib/emoji.min.js"
  );
  const t = new window.EmojiConvertor();
  return t.replace_mode = "unified", t;
});
function P(t) {
  const e = t.src[t.pos] === ":" && t.src.slice(t.pos).match(k);
  if (!e) return !1;
  const [n] = e;
  return t.pending += f.replace_colons(n), t.pos += n.length, !0;
}
const x = {
  name: "emoji",
  async preload() {
    f = await E();
  },
  markdown: (t) => {
    t.inline.ruler.push("emoji", P);
  }
}, p = "https://cdn.jsdelivr.net/npm/", g = "11.10.0", A = r(async () => {
  const [t, e] = await Promise.all(
    ["tokyo-night-dark", "tokyo-night-light"].map(
      (s) => v(
        `${p}@highlightjs/cdn-assets@${g}/styles/${s}.min.css`
      ).then((o) => o.text())
    )
  ), n = `@media (prefers-color-scheme: dark) {
  ${t}
}
@media (prefers-color-scheme: light) {
  ${e}
}`, a = document.createElement("style");
  a.textContent = n, document.head.append(a);
}), l = r(async () => (await i(`${p}@highlightjs/cdn-assets@${g}/highlight.min.js`), window.hljs)), O = {
  name: "hljs",
  preload: A,
  markdown: (t, { enableFeature: e, highlighters: n }) => {
    n.default = () => (l(), e(), "");
  },
  onMounted: async (t) => {
    const e = await l();
    t.querySelectorAll("pre code").forEach((n) => {
      e.highlightElement(n);
    });
  }
}, h = r(
  () => i(
    "https://cdn.jsdelivr.net/combine/npm/vega@5.30.0,npm/vega-lite@5.21.0,npm/vega-embed@6.26.0"
  )
), C = {
  name: "vega",
  markdown: (t, { enableFeature: e, highlighters: n }) => {
    n.vega = (a) => (h(), e(), `<div data-vega="${b($(JSON.stringify(JSON.parse(a))))}"></div>`);
  },
  onMounted: async (t) => {
    await h(), t.querySelectorAll("[data-vega]").forEach((e) => {
      const n = e.dataset.vega || "", a = JSON.parse(M(S(n)));
      e.removeAttribute("data-vega");
      const s = document.createElement("div");
      s.style.width = "100%", e.append(s), window.vegaEmbed(s, a);
    });
  }
}, q = r(async () => {
  const { default: t } = await import("https://cdn.jsdelivr.net/npm/mermaid@11.3.0/dist/mermaid.esm.min.mjs"), e = window.matchMedia("(prefers-color-scheme: dark)");
  return t.initialize({
    startOnLoad: !1,
    theme: e.matches ? "dark" : "default"
  }), t;
}), F = {
  name: "mermaid",
  onMounted: async (t) => {
    const e = Array.from(
      t.querySelectorAll("pre code.language-mermaid")
    );
    await (await q()).run({
      nodes: e
    });
  }
}, c = [x, O, C, F];
async function J(t = c) {
  await Promise.all(t.map((e) => {
    var n;
    return (n = e.preload) == null ? void 0 : n.call(e);
  }));
}
async function u(t, e = c) {
  await Promise.all(e.map((n) => {
    var a;
    return (a = n.onMounted) == null ? void 0 : a.call(n, t);
  }));
}
const _ = r(async () => import("./markdown-it-BsR8S-9k.js"));
class d {
  constructor(e, n, a) {
    m(this, "features", {});
    this.plugins = e, this.md = n, e.forEach(({ name: s, markdown: o }) => {
      o && this.md.use(o, {
        enableFeature: () => this.enableFeature(s),
        highlighters: a
      });
    });
  }
  static async create(e = c) {
    const [{ md: n, highlighters: a }] = await Promise.all([
      _(),
      J(e)
    ]);
    return new d(e, n, a);
  }
  enableFeature(e) {
    this.features[e] = !0;
  }
  render(e) {
    this.features = {};
    const n = this.md.render(e), a = this.plugins.filter(
      ({ name: s, always: o }) => o || this.features[s]
    );
    return {
      html: n,
      plugins: a,
      onMounted: (s) => u(s, a)
    };
  }
  process(e) {
    u(e, this.plugins);
  }
}
const N = r(() => d.create());
async function L({ content: t }, e) {
  const n = await N(), { html: a, onMounted: s } = n.render(t);
  e && (e.innerHTML = a, s(e));
}
async function B(t) {
  let e;
  const n = t.startsWith(`---
`) ? t.indexOf(`
---
`) : -1;
  if (n > 0) {
    const a = t.slice(4, n), { load: s } = await import("https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/+esm");
    try {
      e = s(a);
    } catch {
    }
    const o = n + 5;
    t = t.slice(o);
  }
  return { content: t, frontmatter: e };
}
export {
  d as M,
  J as a,
  c as b,
  u as c,
  N as g,
  _ as l,
  B as p,
  L as r
};
