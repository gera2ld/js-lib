var m = Object.defineProperty;
var y = (t, e, n) => e in t ? m(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var l = (t, e, n) => y(t, typeof e != "symbol" ? e + "" : e, n);
function b(t, e) {
  const { json: n, timeout: r = 1e4, ...c } = e || {}, o = new AbortController(), u = setTimeout(() => o.abort(), r), a = new Headers(c.headers);
  n != null && (c.body = JSON.stringify(n), a.set("content-type", "application/json"));
  async function s(i) {
    const f = await fetch(t, {
      ...c,
      headers: a,
      signal: o.signal
    });
    try {
      const d = await i(f);
      if (!f.ok)
        throw {
          status: f.status,
          data: d,
          url: t.toString(),
          options: e
        };
      return d;
    } finally {
      clearTimeout(u);
    }
  }
  return {
    async arrayBuffer() {
      return s((i) => i.arrayBuffer());
    },
    async blob() {
      return s((i) => i.blob());
    },
    async json() {
      return a.has("accept") || a.set("accept", "application/json"), s((i) => i.json());
    },
    async text() {
      return s((i) => i.text());
    },
    abort() {
      o.abort();
    }
  };
}
function p() {
  const t = {
    status: "pending"
  };
  return t.promise = new Promise((e, n) => {
    t.resolve = e, t.reject = n;
  }), t.promise.then(
    () => {
      t.status = "resolved";
    },
    () => {
      t.status = "rejected";
    }
  ), t;
}
function v(t, e) {
  return function(...r) {
    return e.call(this, t, ...r);
  };
}
function k(t, e) {
  const n = [], r = /* @__PURE__ */ new Set();
  async function c() {
    const s = p();
    return n.push(s), u(), await s.promise, s;
  }
  function o(s) {
    r.delete(s), u();
  }
  function u() {
    for (; n.length && r.size < e; ) {
      const s = n.shift();
      r.add(s), s.resolve();
    }
  }
  async function a(...s) {
    const i = await c();
    try {
      return await t(...s);
    } finally {
      o(i);
    }
  }
  return a;
}
class j {
  constructor(e = 0) {
    l(this, "data", []);
    l(this, "getQueue", /* @__PURE__ */ new Set());
    l(this, "putQueue", /* @__PURE__ */ new Set());
    this.maxSize = e;
  }
  get size() {
    return this.data.length;
  }
  defer(e, n = 0) {
    const r = p();
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
function w(t) {
  return t = new URL(t, import.meta.url).toString(), t;
}
const h = {};
function g(t) {
  let { src: e } = t;
  e && (e = w(e));
  let n = h[e || ""];
  return n || (n = new Promise((r, c) => {
    const o = document.createElement("script");
    Object.entries(t).forEach(([u, a]) => {
      o[u] = a;
    }), o.onload = () => r(), o.onerror = c, (document.body || document.documentElement).append(o), o.remove();
  }), e && (h[e] = n)), n;
}
function Q(t) {
  return g({ src: t });
}
function x(t) {
  const e = document.createElement("link");
  e.rel = "stylesheet", e.href = t, document.head.append(e);
}
function z(t) {
  return async function(...n) {
    return (await t()).apply(this, n);
  };
}
function T(t) {
  return t.replace(
    /[<&]/g,
    (e) => ({
      "<": "&lt;",
      "&": "&amp;"
    })[e] || ""
  );
}
export {
  j as Queue,
  p as defer,
  z as forwardFunction,
  w as getFullUrl,
  k as limitConcurrency,
  x as loadCSS,
  Q as loadJS,
  T as safeHtml,
  b as simpleRequest,
  v as wrapFunction
};
