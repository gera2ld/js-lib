var w = Object.defineProperty;
var j = (t, e, a) => e in t ? w(t, e, { enumerable: !0, configurable: !0, writable: !0, value: a }) : t[e] = a;
var m = (t, e, a) => (j(t, typeof e != "symbol" ? e + "" : e, a), a);
import { memoize as r, loadCSS as y, loadJS as i, fetchBlob as v } from "./util.js";
import { b64encodeText as b, b64decodeText as $ } from "./base64.js";
const M = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let f;
const S = r(async () => {
  y(
    "https://cdn.jsdelivr.net/npm/emoji-js@3.8.0/lib/emoji.min.css"
  ), await i(
    "https://cdn.jsdelivr.net/npm/emoji-js@3.8.0/lib/emoji.min.js"
  );
  const t = new window.EmojiConvertor();
  return t.replace_mode = "unified", t;
});
function k(t) {
  const e = t.src[t.pos] === ":" && t.src.slice(t.pos).match(M);
  if (!e)
    return !1;
  const [a] = e;
  return t.pending += f.replace_colons(a), t.pos += a.length, !0;
}
const E = {
  name: "emoji",
  async preload() {
    f = await S();
  },
  markdown: (t) => {
    t.inline.ruler.push("emoji", k);
  }
}, p = "https://cdn.jsdelivr.net/npm/", g = "11.9.0", P = r(async () => {
  const [t, e] = await Promise.all(
    ["tokyo-night-dark", "tokyo-night-light"].map(
      (s) => v(
        `${p}@highlightjs/cdn-assets@${g}/styles/${s}.min.css`
      ).then((o) => o.text())
    )
  ), a = `@media (prefers-color-scheme: dark) {
  ${t}
}
@media (prefers-color-scheme: light) {
  ${e}
}`, n = document.createElement("style");
  n.textContent = a, document.head.append(n);
}), l = r(async () => (await i(`${p}@highlightjs/cdn-assets@${g}/highlight.min.js`), window.hljs)), x = {
  name: "hljs",
  preload: P,
  markdown: (t, { enableFeature: e, highlighters: a }) => {
    a.default = () => (l(), e(), "");
  },
  onMounted: async (t) => {
    const e = await l();
    t.querySelectorAll("pre code").forEach((a) => {
      e.highlightElement(a);
    });
  }
}, h = r(
  () => i(
    "https://cdn.jsdelivr.net/combine/npm/vega@5.27.0,npm/vega-lite@5.16.3,npm/vega-embed@6.24.0"
  )
), A = {
  name: "vega",
  markdown: (t, { enableFeature: e, highlighters: a }) => {
    a.vega = (n) => (h(), e(), `<div data-vega="${b(JSON.stringify(JSON.parse(n)))}"></div>`);
  },
  onMounted: async (t) => {
    await h(), t.querySelectorAll("[data-vega]").forEach((e) => {
      const a = e.dataset.vega || "", n = JSON.parse($(a));
      e.removeAttribute("data-vega");
      const s = document.createElement("div");
      s.style.width = "100%", e.append(s), window.vegaEmbed(s, n);
    });
  }
}, O = r(async () => {
  const { default: t } = await import("https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.esm.min.mjs"), e = window.matchMedia("(prefers-color-scheme: dark)");
  return t.initialize({
    startOnLoad: !1,
    theme: e.matches ? "dark" : "default"
  }), t;
}), C = {
  name: "mermaid",
  onMounted: async (t) => {
    const e = Array.from(
      t.querySelectorAll("pre code.language-mermaid")
    );
    await (await O()).run({
      nodes: e
    });
  }
}, c = [E, x, A, C];
async function q(t = c) {
  await Promise.all(t.map((e) => {
    var a;
    return (a = e.preload) == null ? void 0 : a.call(e);
  }));
}
async function u(t, e = c) {
  await Promise.all(e.map((a) => {
    var n;
    return (n = a.onMounted) == null ? void 0 : n.call(a, t);
  }));
}
const F = r(async () => import("./markdown-it-tC5K6h-a.js"));
class d {
  constructor(e, a, n) {
    m(this, "features", {});
    this.plugins = e, this.md = a, e.forEach(({ name: s, markdown: o }) => {
      o && this.md.use(o, {
        enableFeature: () => this.enableFeature(s),
        highlighters: n
      });
    });
  }
  static async create(e = c) {
    const [{ md: a, highlighters: n }] = await Promise.all([
      F(),
      q(e)
    ]);
    return new d(e, a, n);
  }
  enableFeature(e) {
    this.features[e] = !0;
  }
  render(e) {
    this.features = {};
    const a = this.md.render(e), n = this.plugins.filter(
      ({ name: s, always: o }) => o || this.features[s]
    );
    return {
      html: a,
      plugins: n,
      onMounted: (s) => u(s, n)
    };
  }
  process(e) {
    u(e, this.plugins);
  }
}
const J = r(() => d.create());
async function T({ content: t }, e) {
  const a = await J(), { html: n, onMounted: s } = a.render(t);
  e && (e.innerHTML = n, s(e));
}
async function H(t) {
  let e;
  const a = t.startsWith(`---
`) ? t.indexOf(`
---
`) : -1;
  if (a > 0) {
    const n = t.slice(4, a), { load: s } = await import("https://cdn.jsdelivr.net/npm/js-yaml@4.1.0/+esm");
    try {
      e = s(n);
    } catch {
    }
    const o = a + 5;
    t = t.slice(o);
  }
  return { content: t, frontmatter: e };
}
export {
  d as M,
  q as a,
  c as b,
  u as c,
  J as g,
  F as l,
  H as p,
  T as r
};
