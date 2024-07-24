var L = Object.defineProperty;
var M = (r, t, e) => t in r ? L(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var g = (r, t, e) => (M(r, typeof t != "symbol" ? t + "" : t, e), e), E = (r, t, e) => {
  if (!t.has(r))
    throw TypeError("Cannot " + e);
};
var h = (r, t, e) => {
  if (t.has(r))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(r) : t.set(r, e);
};
var l = (r, t, e) => (E(r, t, "access private method"), e);
import { safeHtml as b } from "./util.js";
const v = document.createElement("style");
v.textContent = `
.json-grid {
  padding: .5rem;
}
.json-grid table {
  border-radius: .25rem;
  font-size: .75rem;
  line-height: 1rem;
  background: #e5e7eb;
}
.json-grid th, .json-grid td {
  padding: .25rem;
}
.json-grid th {
  color: #4b5563;
}
.json-grid td {
  background: white;
}
.json-grid .subtle {
  color: #9ca3af;
  font-style: italic;
}
.json-grid .toggle {
  color: #4b5563;
  cursor: pointer;
}
.json-grid .toggle::before {
  content: '[+]';
  margin-right: .5em;
}
.json-grid .toggle.open:before {
  content: '[-]';
}
`;
document.head.append(v);
var m, p, c, d, u, j, f, y;
class w {
  constructor() {
    h(this, m);
    h(this, c);
    h(this, u);
    h(this, f);
    g(this, "container", null);
    g(this, "data");
    g(this, "handleClick", (t) => {
      var s, o;
      const e = (s = t.target) == null ? void 0 : s.closest(".toggle"), n = e == null ? void 0 : e.dataset.path;
      if (n)
        if (e.classList.contains("open"))
          e.classList.remove("open"), (o = e.nextElementSibling) == null || o.remove();
        else {
          e.classList.add("open");
          const i = l(this, m, p).call(this, n), a = (Array.isArray(i) ? l(this, u, j) : l(this, f, y)).call(this, i, n, !0, !1).join("");
          e.insertAdjacentHTML("afterend", a);
        }
    });
  }
  mount(t, e) {
    if (this.unmount(), this.container = typeof t == "string" ? document.querySelector(t) : t, !this.container)
      throw new Error("Invalid container");
    this.container.classList.add("json-grid"), this.container.addEventListener("click", this.handleClick), e && this.setData(e, !1);
  }
  setData(t, e) {
    if (this.data = t, !this.container)
      return;
    const n = l(this, c, d).call(this, t, "", !0, e).join("");
    this.container.innerHTML = n;
  }
  unmount() {
    this.container && (this.container.removeEventListener("click", this.handleClick), this.container = null);
  }
}
m = new WeakSet(), p = function(t) {
  return t.split(".").filter(Boolean).reduce((e, n) => Array.isArray(e) ? e[+n] : e[Object.keys(e)[+n]], this.data);
}, c = new WeakSet(), d = function(t, e, n, s) {
  return Array.isArray(t) ? [
    `<div class="toggle ${n ? "open" : ""}" data-path="${e}">${t.length} items</div>`,
    ...n ? l(this, u, j).call(this, t, e, s, s) : []
  ] : $(t) ? [
    `<div class="toggle ${n ? "open" : ""}" data-path="${e}">${Object.keys(t).length} keys</div>`,
    ...n ? l(this, f, y).call(this, t, e, s, s) : []
  ] : t == null ? [
    `<div class="subtle" data-path="${e}">`,
    b(`${t}`),
    "</div>"
  ] : [`<div data-path="${e}">`, b(`${t}`), "</div>"];
}, u = new WeakSet(), j = function(t, e, n, s) {
  if (!t.length)
    return ['<div class="subtle">[Empty array]</div>'];
  let o = [];
  try {
    t.every($) && (o = [...new Set(t.flatMap((i) => Object.keys(i)))]);
  } catch {
  }
  return o.length ? [
    "<table><tr><th>#</th>",
    ...o.flatMap((i) => ["<th>", b(i), "</th>"]),
    "</tr>",
    ...t.flatMap((i, a) => [
      "<tr><th>",
      `${a}`,
      "</th>",
      ...o.flatMap((k) => [
        "<td>",
        ...l(this, c, d).call(this, i[k], `${e}.${a}`, n, s),
        "</td>"
      ]),
      "</tr>"
    ]),
    "</table>"
  ] : [
    "<table><tr><th>#</th><th>[Array]</th></tr>",
    ...t.flatMap((i, a) => [
      "<tr><th>",
      `${a}`,
      "</th><td>",
      ...l(this, c, d).call(this, i, `${e}.${a}`, n, s),
      "</td></tr>"
    ]),
    "</table>"
  ];
}, f = new WeakSet(), y = function(t, e, n, s) {
  const o = Object.keys(t);
  return o.length ? [
    "<table>",
    ...o.flatMap((i, a) => [
      "<tr><th>",
      b(i),
      "</th><td>",
      ...l(this, c, d).call(this, t[i], `${e}.${a}`, n, s),
      "</td></tr>"
    ]),
    "</table>"
  ] : ['<div class="subtle">[Empty object]</div>'];
};
function A(r, t, e = !1) {
  const n = new w();
  return n.mount(r), n.setData(t, e), n;
}
function $(r) {
  return r && typeof r == "object";
}
export {
  w as JsonRenderer,
  A as renderJson
};
