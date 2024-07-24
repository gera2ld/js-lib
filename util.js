var h = Object.defineProperty;
var m = (t, e, n) => e in t ? h(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var u = (t, e, n) => (m(t, typeof e != "symbol" ? e + "" : e, n), n);
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
function S(t) {
  let e;
  return function(...r) {
    return e || (e = {
      result: t.apply(this, r)
    }), e.result;
  };
}
function v(t, e) {
  const n = [], r = /* @__PURE__ */ new Set();
  async function s() {
    const i = f();
    return n.push(i), c(), await i.promise, i;
  }
  function o(i) {
    r.delete(i), c();
  }
  function c() {
    for (; n.length && r.size < e; ) {
      const i = n.shift();
      r.add(i), i.resolve();
    }
  }
  async function a(...i) {
    const d = await s();
    try {
      return await t(...i);
    } finally {
      o(d);
    }
  }
  return a;
}
class b {
  constructor(e = 0) {
    u(this, "data", []);
    u(this, "getQueue", /* @__PURE__ */ new Set());
    u(this, "putQueue", /* @__PURE__ */ new Set());
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
async function k(t) {
  return await (await fetch(t)).blob();
}
function p(t) {
  return t = new URL(t, import.meta.url).toString(), t;
}
const l = {};
function w(t) {
  let { src: e } = t;
  e && (e = p(e));
  let n = l[e || ""];
  return n || (n = new Promise((r, s) => {
    const o = document.createElement("script");
    Object.entries(t).forEach(([c, a]) => {
      o[c] = a;
    }), o.onload = () => r(), o.onerror = s, (document.body || document.documentElement).append(o), o.remove();
  }), e && (l[e] = n)), n;
}
function z(t) {
  return w({ src: t });
}
function Q(t) {
  const e = document.createElement("link");
  e.rel = "stylesheet", e.href = t, document.head.append(e);
}
function x(t) {
  return async function(...n) {
    return (await t()).apply(this, n);
  };
}
function E(t) {
  return t.replace(
    /[<&]/g,
    (e) => ({
      "<": "&lt;",
      "&": "&amp;"
    })[e]
  );
}
export {
  b as Queue,
  f as defer,
  k as fetchBlob,
  x as forwardFunction,
  p as getFullUrl,
  v as limitConcurrency,
  Q as loadCSS,
  z as loadJS,
  S as memoize,
  E as safeHtml,
  y as wrapFunction
};
