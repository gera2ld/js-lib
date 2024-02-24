function o(e) {
  const n = atob(e);
  return Uint8Array.from(n, (t) => t.codePointAt(0));
}
function c(e) {
  const n = o(e);
  return new TextDecoder().decode(n);
}
function b(e) {
  const n = e.replace(
    /[-_]/g,
    (t) => ({
      "-": "+",
      _: "/"
    })[t] || ""
  );
  return o(n);
}
function r(e) {
  const n = Array.from(e, (t) => String.fromCodePoint(t)).join("");
  return btoa(n);
}
function d(e) {
  const n = new TextEncoder().encode(e);
  return r(n);
}
function i(e) {
  return r(e).replace(
    /[+/=]/g,
    (t) => ({
      "+": "-",
      "/": "_"
    })[t] || ""
  );
}
export {
  o as b64decode,
  c as b64decodeText,
  r as b64encode,
  d as b64encodeText,
  b as b64urlDecode,
  i as b64urlEncode
};
