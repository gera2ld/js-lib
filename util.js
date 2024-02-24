var h = Object.defineProperty;
var m = (n, e, t) => e in n ? h(n, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : n[e] = t;
var u = (n, e, t) => (m(n, typeof e != "symbol" ? e + "" : e, t), t);
function f() {
  let n = (r) => {
  }, e = (r) => {
  };
  return { promise: new Promise((r, s) => {
    n = r, e = s;
  }), resolve: n, reject: e };
}
function g(n, e) {
  return function(...r) {
    return e.call(this, n, ...r);
  };
}
function S(n) {
  let e;
  return function(...r) {
    return e || (e = {
      result: n.apply(this, r)
    }), e.result;
  };
}
function v(n, e) {
  const t = [], r = /* @__PURE__ */ new Set();
  async function s() {
    const i = f();
    return t.push(i), c(), await i.promise, i;
  }
  function o(i) {
    r.delete(i), c();
  }
  function c() {
    for (; t.length && r.size < e; ) {
      const i = t.shift();
      r.add(i), i.resolve();
    }
  }
  async function a(...i) {
    const d = await s();
    try {
      return await n(...i);
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
async function k(n) {
  return await (await fetch(n)).blob();
}
function p(n) {
  return n = new URL(n, import.meta.url).toString(), n;
}
const l = {};
function w(n) {
  let { src: e } = n;
  e && (e = p(e));
  let t = l[e || ""];
  return t || (t = new Promise((r, s) => {
    const o = document.createElement("script");
    Object.entries(n).forEach(([c, a]) => {
      o[c] = a;
    }), o.onload = () => r(), o.onerror = s, (document.body || document.documentElement).append(o), o.remove();
  }), e && (l[e] = t)), t;
}
function z(n) {
  return w({ src: n });
}
function Q(n) {
  const e = document.createElement("link");
  e.rel = "stylesheet", e.href = n, document.head.append(e);
}
function x(n) {
  return async function(...t) {
    return (await n()).apply(this, t);
  };
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
  g as wrapFunction
};
