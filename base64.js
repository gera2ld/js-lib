const d = w(
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"
), a = w(d[0].slice(0, -2) + "-_"), f = "=";
function w(e) {
  const o = new Array(255);
  for (let n = 0; n < e.length; n += 1)
    o[e.charCodeAt(n)] = n;
  return [e, o];
}
function x(e, o) {
  const n = o[e];
  if (n == null) throw new Error("Unable to parse base64 string.");
  return n;
}
function g(e, o, n) {
  let r = "", l = 0;
  for (; l < e.length; ) {
    const u = e[l++], c = e[l++], t = e[l++];
    if (r += o[u >> 2], r += o[(u & 3) << 4 | (c || 0) >> 4], c == null ? n && (r += f) : r += o[(c & 15) << 2 | (t || 0) >> 6], t == null) {
      n && (r += f);
      break;
    }
    r += o[t & 63];
  }
  return r;
}
function h(e, o) {
  let n = e.length;
  for (; n > 0 && e[n - 1] === "="; ) n -= 1;
  const r = Math.ceil(n / 4), l = new Uint8Array(3 * r);
  let u = 0, c = 0, t = 0;
  for (c = 0; c < r; c += 1) {
    let i = 0;
    for (t = 0; t < 4; t += 1) {
      u = c * 4 + t;
      const b = e[u];
      if (!b || b === f) break;
      i |= x(e.charCodeAt(u), o) << (3 - t) * 6;
    }
    l[c * 3] = i >> 16, l[c * 3 + 1] = i >> 8 & 255, l[c * 3 + 2] = i & 255;
  }
  if (u < n - 1 || t === 1) throw new Error("Invalid base64 string");
  let s = 3 * r;
  for (; t < 4; t += 1) s -= 1;
  return l.subarray(0, s);
}
function C(e) {
  return g(e, d[0], !0);
}
function A(e) {
  return h(e, d[1]);
}
function E(e) {
  return g(e, a[0], !1);
}
function T(e) {
  return h(e, a[1]);
}
function k(e) {
  return new TextEncoder().encode(e);
}
function D(e) {
  return new TextDecoder().decode(e);
}
export {
  A as b64decode,
  C as b64encode,
  T as b64urlDecode,
  E as b64urlEncode,
  D as decodeText,
  k as encodeText
};
