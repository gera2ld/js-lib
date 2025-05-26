var v = Object.defineProperty;
var b = (e, t, n) => t in e ? v(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var h = (e, t, n) => b(e, typeof t != "symbol" ? t + "" : t, n);
import { once as l, noop as M } from "https://cdn.jsdelivr.net/npm/es-toolkit@1.38.0/+esm";
import { safeHtml as p } from "./util.js";
var P = Object.defineProperty, O = (e, t, n) => t in e ? P(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, a = (e, t, n) => O(e, typeof t != "symbol" ? t + "" : t, n);
function S(e, ...t) {
  let n = e.replace(/%./g, (r) => {
    const i = r[1];
    if ("df".includes(i)) return String(Number(t.shift()));
    if ("j".includes(i)) return JSON.stringify(t.shift());
    if ("soO".includes(i)) {
      const s = t.shift();
      return s instanceof Error ? `${s}
${s.stack}` : s && typeof s == "object" ? JSON.stringify(s) : String(s);
    }
    return r;
  });
  return t.length && (n += " " + t.join(" ")), n;
}
function f(e, t) {
  return function(...n) {
    return t.call(this, e, ...n);
  };
}
const x = class d {
  constructor(t, n) {
    a(this, "output"), a(this, "options"), this.prefix = t, this.options = {
      ...d.defaultOptions,
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
    const i = S(n, ...r);
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
    return f(t, function(i, ...s) {
      return n.call(this, r, i, ...s);
    });
  }
};
a(x, "defaultOptions", {
  timestamp: !1
});
function D(e) {
  return e;
}
function u(e, t) {
  e.options.highlight ? e.options.highlight = f(e.options.highlight, (n, ...r) => t(...r) || n(...r)) : e.options.highlight = t;
}
const E = l(async () => {
  const { EmojiConvertor: e } = await import("https://cdn.jsdelivr.net/npm/emoji-js@3.8.1/+esm");
  return new e();
}), $ = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let c;
function F(e) {
  const t = e.src[e.pos] === ":" && e.src.slice(e.pos).match($);
  if (!t) return !1;
  const [n] = t;
  return e.pending += c.replace_colons(n), e.pos += n.length, !0;
}
const m = {
  name: "emoji",
  async preload() {
    c = await E(), c.replace_mode = "unified";
  },
  markdown: (e) => {
    e.inline.ruler.push("emoji", F);
  }
}, H = (e, { enableFeature: t }) => {
  u(e, (n, r) => r === "mermaid" ? (t(), '<pre class="mermaid">' + p(n) + "</pre>") : "");
}, g = {
  name: "mermaid",
  markdown: H
}, I = {
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
};
let w;
const L = l(async () => {
  const { default: e } = await import("https://cdn.jsdelivr.net/npm/@shikijs/markdown-it@3.4.2/+esm");
  w = await e({
    fallbackLanguage: "text",
    ...I
  });
}), N = async () => {
  await L();
}, _ = (e) => {
  const { highlight: t } = e.options;
  e.use(w), t && u(e, (...n) => t(...n));
}, k = {
  name: "shiki",
  preload: N,
  markdown: _
}, C = (e, { enableFeature: t }) => {
  u(e, (n, r, i) => r === "vega" ? (t(), `<div class="vega">${p(n)}</div>`) : "");
}, y = {
  name: "vega",
  markdown: C
}, V = {
  emoji: m,
  mermaid: g,
  shiki: k,
  vega: y
}, o = [m, k, y, g];
async function j(e = o) {
  await Promise.all(e.map((t) => {
    var n;
    return (n = t.preload) == null ? void 0 : n.call(t);
  }));
}
async function W(e, t = o) {
  await Promise.all(t.map((n) => {
    var r;
    return (r = n.onMounted) == null ? void 0 : r.call(n, e);
  }));
}
class X {
  constructor(t) {
    this.plugins = t;
  }
  static async create(t = o) {
    return await j(t), new this(t);
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
}
const J = l(async () => import("./markdown-it-CWWnOdsP.js"));
class Z {
  constructor(t, n) {
    h(this, "features", {});
    this.plugins = t, this.md = n, t.forEach(({ name: r, markdown: i }) => {
      i && this.md.use(i, {
        enableFeature: () => this.enableFeature(r)
      });
    });
  }
  static async create(t = o) {
    const [{ initMarkdownIt: n }] = await Promise.all([
      J(),
      j(t)
    ]);
    return new this(t, n());
  }
  enableFeature(t) {
    this.features[t] = !0;
  }
  render(t) {
    this.features = {};
    const n = this.md.render(t), r = this.plugins.filter(
      ({ name: i, always: s }) => s || this.features[i]
    );
    return {
      html: n,
      plugins: r,
      onMounted: (i) => this.process(i, r)
    };
  }
  process(t, n = this.plugins) {
  }
}
async function q(e) {
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
    const s = n + 5;
    e = e.slice(s);
  }
  return { content: e, frontmatter: t };
}
const B = M;
export {
  X as HtmlRenderer,
  Z as MarkdownRenderer,
  o as builtInPlugins,
  D as definePlugin,
  J as loadMarkdownIt,
  q as parseFrontmatter,
  u as patchHighlight,
  V as pluginMap,
  W as pluginMounted,
  j as pluginPreload,
  B as renderMarkdown
};
