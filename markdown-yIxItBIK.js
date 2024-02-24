var w = Object.defineProperty;
var y = (t, e, n) => e in t ? w(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var l = (t, e, n) => (y(t, typeof e != "symbol" ? e + "" : e, n), n);
import { memoize as r, loadCSS as j, loadJS as i, wrapFunction as b, fetchBlob as v } from "./util.js";
import { b64encodeText as k, b64decodeText as $ } from "./base64.js";
const S = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let f;
const M = r(async () => {
  j(
    "https://cdn.jsdelivr.net/npm/emoji-js@3.8.0/lib/emoji.min.css"
  ), await i(
    "https://cdn.jsdelivr.net/npm/emoji-js@3.8.0/lib/emoji.min.js"
  );
  const t = new window.EmojiConvertor();
  return t.replace_mode = "unified", t;
});
function E(t) {
  const e = t.src[t.pos] === ":" && t.src.slice(t.pos).match(S);
  if (!e)
    return !1;
  const [n] = e;
  return t.pending += f.replace_colons(n), t.pos += n.length, !0;
}
const P = {
  name: "emoji",
  async preload() {
    f = await M();
  },
  remarkable: (t) => {
    t.inline.ruler.push("emoji", E, {});
  }
}, p = "https://cdn.jsdelivr.net/npm/", g = "11.9.0", x = r(async () => {
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
}), m = r(async () => (await i(`${p}@highlightjs/cdn-assets@${g}/highlight.min.js`), window.hljs)), A = {
  name: "hljs",
  preload: x,
  remarkable: (t, { enableFeature: e }) => {
    t.renderer.rules.fence = b(
      t.renderer.rules.fence,
      function(a, ...s) {
        return m(), e(), a.apply(this, s);
      }
    );
  },
  onMounted: async (t) => {
    const e = await m();
    t.querySelectorAll("pre code").forEach((n) => {
      e.highlightElement(n);
    });
  }
}, h = r(
  () => i(
    "https://cdn.jsdelivr.net/combine/npm/vega@5.27.0,npm/vega-lite@5.16.3,npm/vega-embed@6.24.0"
  )
), O = {
  name: "vega",
  remarkable: (t, { enableFeature: e }) => {
    t.renderer.rules.fence_custom.vega = (n, a) => {
      h(), e();
      const { content: s } = n[a];
      return `<div data-vega="${k(JSON.stringify(JSON.parse(s)))}"></div>`;
    };
  },
  onMounted: async (t) => {
    await h(), t.querySelectorAll("[data-vega]").forEach((e) => {
      const n = e.dataset.vega || "", a = JSON.parse($(n));
      e.removeAttribute("data-vega");
      const s = document.createElement("div");
      s.style.width = "100%", e.append(s), window.vegaEmbed(s, a);
    });
  }
}, C = r(async () => {
  const { default: t } = await import("https://cdn.jsdelivr.net/npm/mermaid@10.6.1/dist/mermaid.esm.min.mjs"), e = window.matchMedia("(prefers-color-scheme: dark)");
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
    await (await C()).run({
      nodes: e
    });
  }
}, c = [P, A, O, F];
async function q(t = c) {
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
const J = r(async () => {
  const { Remarkable: t } = await import("https://cdn.jsdelivr.net/npm/remarkable@2.0.1/+esm");
  return t;
});
class d {
  constructor(e, n) {
    l(this, "features", {});
    this.plugins = e, this.md = n, this.md.set({
      html: !0,
      breaks: !0
    }), e.forEach(({ name: a, remarkable: s }) => {
      s && this.md.use(s, {
        enableFeature: () => this.enableFeature(a)
      });
    });
  }
  static async create(e = c) {
    const [n] = await Promise.all([
      J(),
      q(e)
    ]), a = new n("full");
    return new d(e, a);
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
const R = r(() => d.create());
async function _({ content: t }, e) {
  const n = await R(), { html: a, onMounted: s } = n.render(t);
  e && (e.innerHTML = a, s(e));
}
async function H(t) {
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
  q as a,
  c as b,
  u as c,
  R as g,
  J as l,
  H as p,
  _ as r
};
