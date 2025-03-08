var h = Object.defineProperty;
var p = (t, e, n) => e in t ? h(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var a = (t, e, n) => p(t, typeof e != "symbol" ? e + "" : e, n);
function f() {
  let t = (r) => {
  }, e = (r) => {
  };
  return { promise: new Promise((r, s) => {
    t = r, e = s;
  }), resolve: t, reject: e };
}
function y(t, e) {
  return function(...r) {
    return e.call(this, t, ...r);
  };
}
function S(t, e) {
  const n = [], r = /* @__PURE__ */ new Set();
  async function s() {
    const o = f();
    return n.push(o), c(), await o.promise, o;
  }
  function i(o) {
    r.delete(o), c();
  }
  function c() {
    for (; n.length && r.size < e; ) {
      const o = n.shift();
      r.add(o), o.resolve();
    }
  }
  async function u(...o) {
    const d = await s();
    try {
      return await t(...o);
    } finally {
      i(d);
    }
  }
  return u;
}
class v {
  constructor(e = 0) {
    a(this, "data", []);
    a(this, "getQueue", /* @__PURE__ */ new Set());
    a(this, "putQueue", /* @__PURE__ */ new Set());
    this.maxSize = e;
  }
  get size() {
    return this.data.length;
  }
  defer(e, n = 0) {
    const r = f();
    return e.add(r), r.promise.finally(() => {
      e.delete(r);
    }), n && setTimeout(r.reject, n), r.promise;
  }
  resolve(e) {
    const n = e.values().next().value;
    n && (n.resolve(), e.delete(n));
  }
  async get(e = 0) {
    this.data.length || await this.defer(this.getQueue, e);
    const n = this.data.shift();
    return this.resolve(this.putQueue), n;
  }
  async put(e, n = 0) {
    this.maxSize && this.data.length >= this.maxSize && await this.defer(this.putQueue, n), this.data.push(e), this.resolve(this.getQueue);
  }
}
async function b(t) {
  return await (await fetch(t)).blob();
}
function m(t) {
  return t = new URL(t, import.meta.url).toString(), t;
}
const l = {};
function w(t) {
  let { src: e } = t;
  e && (e = m(e));
  let n = l[e || ""];
  return n || (n = new Promise((r, s) => {
    const i = document.createElement("script");
    Object.entries(t).forEach(([c, u]) => {
      i[c] = u;
    }), i.onload = () => r(), i.onerror = s, (document.body || document.documentElement).append(i), i.remove();
  }), e && (l[e] = n)), n;
}
function k(t) {
  return w({ src: t });
}
function Q(t) {
  const e = document.createElement("link");
  e.rel = "stylesheet", e.href = t, document.head.append(e);
}
function z(t) {
  return async function(...n) {
    return (await t()).apply(this, n);
  };
}
function x(t) {
  return t.replace(
    /[<&]/g,
    (e) => ({
      "<": "&lt;",
      "&": "&amp;"
    })[e] || ""
  );
}
export {
  v as Queue,
  f as defer,
  b as fetchBlob,
  z as forwardFunction,
  m as getFullUrl,
  S as limitConcurrency,
  Q as loadCSS,
  k as loadJS,
  x as safeHtml,
  y as wrapFunction
};
