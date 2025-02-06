var m = Object.defineProperty;
var f = (e, s, n) => s in e ? m(e, s, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[s] = n;
var u = (e, s, n) => f(e, typeof s != "symbol" ? s + "" : s, n);
function F(e) {
  return e;
}
function l() {
}
function d(e) {
  let s = !1, n;
  return function(...t) {
    return s || (s = !0, n = e(...t)), n;
  };
}
const h = d(async () => {
  const { EmojiConvertor: e } = await import("./emoji-CUwzEQA8.js").then((n) => n.e);
  return new e();
}), p = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let i;
function y(e) {
  const s = e.src[e.pos] === ":" && e.src.slice(e.pos).match(p);
  if (!s) return !1;
  const [n] = s;
  return e.pending += i.replace_colons(n), e.pos += n.length, !0;
}
const b = {
  name: "emoji",
  async preload() {
    i = await h(), i.replace_mode = "unified";
  },
  markdown: (e) => {
    e.inline.ruler.push("emoji", y);
  }
};
function w(e) {
  e.registerLanguage("vue", function(n) {
    return {
      subLanguage: "xml",
      contains: [
        n.COMMENT("<!--", "-->", {
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
function j(e) {
  return w(e), e;
}
const x = l;
let o;
const M = async () => {
  const { default: e } = await import("./index-BdXsNC5G.js");
  return o = j(e), o;
}, E = async () => {
  await M();
}, L = (e, { enableFeature: s, highlighters: n }) => {
  n.default = (t, a) => (s(), o.highlightAuto(t, a ? [a] : void 0).value);
}, P = {
  name: "hljs",
  preload: E,
  markdown: L,
  onMounted: x
}, c = [b, P];
async function k(e = c) {
  await Promise.all(e.map((s) => {
    var n;
    return (n = s.preload) == null ? void 0 : n.call(s);
  }));
}
async function I(e, s = c) {
  await Promise.all(s.map((n) => {
    var t;
    return (t = n.onMounted) == null ? void 0 : t.call(n, e);
  }));
}
const v = d(async () => import("./markdown-it-clcn1nsd.js"));
class g {
  constructor(s, n, t) {
    u(this, "features", {});
    this.plugins = s, this.md = n, this.highlighters = t, s.forEach(({ name: a, markdown: r }) => {
      r && this.md.use(r, {
        enableFeature: () => this.enableFeature(a),
        highlighters: t
      });
    });
  }
  static async create(s = c) {
    const n = {}, [{ initMarkdownIt: t }] = await Promise.all([
      v(),
      k(s)
    ]);
    return new g(
      s,
      t(n),
      n
    );
  }
  enableFeature(s) {
    this.features[s] = !0;
  }
  render(s) {
    this.features = {};
    const n = this.md.render(s), t = this.plugins.filter(
      ({ name: a, always: r }) => r || this.features[a]
    );
    return {
      html: n,
      plugins: t,
      onMounted: (a) => this.process(a, t)
    };
  }
  process(s, n = this.plugins) {
  }
}
async function O(e) {
  let s;
  const n = e.startsWith(`---
`) ? e.indexOf(`
---
`) : -1;
  if (n > 0) {
    const t = e.slice(4, n), { parse: a } = await import("./index-DY58z44q.js");
    try {
      s = a(t);
    } catch {
    }
    const r = n + 5;
    e = e.slice(r);
  }
  return { content: e, frontmatter: s };
}
const _ = l;
export {
  g as M,
  k as a,
  c as b,
  I as c,
  F as d,
  v as l,
  O as p,
  _ as r
};
