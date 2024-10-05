var h = Object.defineProperty;
var p = (n, e, t) => e in n ? h(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var a = (n, e, t) => p(n, typeof e != "symbol" ? e + "" : e, t);
function f() {
  let n = (r) => {
  }, e = (r) => {
  };
  return { promise: new Promise((r, s) => {
    n = r, e = s;
  }), resolve: n, reject: e };
}
function y(n, e) {
  return function(...r) {
    return e.call(this, n, ...r);
  };
}
function S(n, e) {
  const t = [], r = /* @__PURE__ */ new Set();
  async function s() {
    const o = f();
    return t.push(o), c(), await o.promise, o;
  }
  function i(o) {
    r.delete(o), c();
  }
  function c() {
    for (; t.length && r.size < e; ) {
      const o = t.shift();
      r.add(o), o.resolve();
    }
  }
  async function u(...o) {
    const d = await s();
    try {
      return await n(...o);
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
  defer(e, t = 0) {
    const r = f();
    return e.add(r), r.promise.finally(() => {
      e.delete(r);
    }), t && setTimeout(r.reject, t), r.promise;
  }
  resolve(e) {
    const t = e.values().next().value;
    t && (t.resolve(), e.delete(t));
  }
  async get(e = 0) {
    this.data.length || await this.defer(this.getQueue, e);
    const t = this.data.shift();
    return this.resolve(this.putQueue), t;
  }
  async put(e, t = 0) {
    this.maxSize && this.data.length >= this.maxSize && await this.defer(this.putQueue, t), this.data.push(e), this.resolve(this.getQueue);
  }
}
async function b(n) {
  return await (await fetch(n)).blob();
}
function m(n) {
  return n = new URL(n, import.meta.url).toString(), n;
}
const l = {};
function w(n) {
  let { src: e } = n;
  e && (e = m(e));
  let t = l[e || ""];
  return t || (t = new Promise((r, s) => {
    const i = document.createElement("script");
    Object.entries(n).forEach(([c, u]) => {
      i[c] = u;
    }), i.onload = () => r(), i.onerror = s, (document.body || document.documentElement).append(i), i.remove();
  }), e && (l[e] = t)), t;
}
function k(n) {
  return w({ src: n });
}
function Q(n) {
  const e = document.createElement("link");
  e.rel = "stylesheet", e.href = n, document.head.append(e);
}
function z(n) {
  return async function(...t) {
    return (await n()).apply(this, t);
  };
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
  y as wrapFunction
};
