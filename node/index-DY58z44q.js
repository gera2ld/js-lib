const xe = Symbol.for("yaml.alias"), Qe = Symbol.for("yaml.document"), V = Symbol.for("yaml.map"), Tt = Symbol.for("yaml.pair"), q = Symbol.for("yaml.scalar"), oe = Symbol.for("yaml.seq"), P = Symbol.for("yaml.node.type"), le = (n) => !!n && typeof n == "object" && n[P] === xe, _e = (n) => !!n && typeof n == "object" && n[P] === Qe, ye = (n) => !!n && typeof n == "object" && n[P] === V, $ = (n) => !!n && typeof n == "object" && n[P] === Tt, T = (n) => !!n && typeof n == "object" && n[P] === q, be = (n) => !!n && typeof n == "object" && n[P] === oe;
function E(n) {
  if (n && typeof n == "object")
    switch (n[P]) {
      case V:
      case oe:
        return !0;
    }
  return !1;
}
function L(n) {
  if (n && typeof n == "object")
    switch (n[P]) {
      case xe:
      case V:
      case q:
      case oe:
        return !0;
    }
  return !1;
}
const as = (n) => (T(n) || E(n)) && !!n.anchor, J = Symbol("break visit"), cs = Symbol("skip children"), de = Symbol("remove node");
function H(n, e) {
  const t = fs(e);
  _e(n) ? x(null, n.contents, t, Object.freeze([n])) === de && (n.contents = null) : x(null, n, t, Object.freeze([]));
}
H.BREAK = J;
H.SKIP = cs;
H.REMOVE = de;
function x(n, e, t, s) {
  const i = us(n, e, t, s);
  if (L(i) || $(i))
    return hs(n, s, i), x(n, i, t, s);
  if (typeof i != "symbol") {
    if (E(e)) {
      s = Object.freeze(s.concat(e));
      for (let r = 0; r < e.items.length; ++r) {
        const o = x(r, e.items[r], t, s);
        if (typeof o == "number")
          r = o - 1;
        else {
          if (o === J)
            return J;
          o === de && (e.items.splice(r, 1), r -= 1);
        }
      }
    } else if ($(e)) {
      s = Object.freeze(s.concat(e));
      const r = x("key", e.key, t, s);
      if (r === J)
        return J;
      r === de && (e.key = null);
      const o = x("value", e.value, t, s);
      if (o === J)
        return J;
      o === de && (e.value = null);
    }
  }
  return i;
}
function fs(n) {
  return typeof n == "object" && (n.Collection || n.Node || n.Value) ? Object.assign({
    Alias: n.Node,
    Map: n.Node,
    Scalar: n.Node,
    Seq: n.Node
  }, n.Value && {
    Map: n.Value,
    Scalar: n.Value,
    Seq: n.Value
  }, n.Collection && {
    Map: n.Collection,
    Seq: n.Collection
  }, n) : n;
}
function us(n, e, t, s) {
  var i, r, o, l, a;
  if (typeof t == "function")
    return t(n, e, s);
  if (ye(e))
    return (i = t.Map) == null ? void 0 : i.call(t, n, e, s);
  if (be(e))
    return (r = t.Seq) == null ? void 0 : r.call(t, n, e, s);
  if ($(e))
    return (o = t.Pair) == null ? void 0 : o.call(t, n, e, s);
  if (T(e))
    return (l = t.Scalar) == null ? void 0 : l.call(t, n, e, s);
  if (le(e))
    return (a = t.Alias) == null ? void 0 : a.call(t, n, e, s);
}
function hs(n, e, t) {
  const s = e[e.length - 1];
  if (E(s))
    s.items[n] = t;
  else if ($(s))
    n === "key" ? s.key = t : s.value = t;
  else if (_e(s))
    s.contents = t;
  else {
    const i = le(s) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${i} parent`);
  }
}
const ds = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
}, ps = (n) => n.replace(/[!,[\]{}]/g, (e) => ds[e]);
class v {
  constructor(e, t) {
    this.docStart = null, this.docEnd = !1, this.yaml = Object.assign({}, v.defaultYaml, e), this.tags = Object.assign({}, v.defaultTags, t);
  }
  clone() {
    const e = new v(this.yaml, this.tags);
    return e.docStart = this.docStart, e;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const e = new v(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = !0;
        break;
      case "1.2":
        this.atNextDocument = !1, this.yaml = {
          explicit: v.defaultYaml.explicit,
          version: "1.2"
        }, this.tags = Object.assign({}, v.defaultTags);
        break;
    }
    return e;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(e, t) {
    this.atNextDocument && (this.yaml = { explicit: v.defaultYaml.explicit, version: "1.1" }, this.tags = Object.assign({}, v.defaultTags), this.atNextDocument = !1);
    const s = e.trim().split(/[ \t]+/), i = s.shift();
    switch (i) {
      case "%TAG": {
        if (s.length !== 2 && (t(0, "%TAG directive should contain exactly two parts"), s.length < 2))
          return !1;
        const [r, o] = s;
        return this.tags[r] = o, !0;
      }
      case "%YAML": {
        if (this.yaml.explicit = !0, s.length !== 1)
          return t(0, "%YAML directive should contain exactly one part"), !1;
        const [r] = s;
        if (r === "1.1" || r === "1.2")
          return this.yaml.version = r, !0;
        {
          const o = /^\d+\.\d+$/.test(r);
          return t(6, `Unsupported YAML version ${r}`, o), !1;
        }
      }
      default:
        return t(0, `Unknown directive ${i}`, !0), !1;
    }
  }
  /**
   * Resolves a tag, matching handles to those defined in %TAG directives.
   *
   * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
   *   `'!local'` tag, or `null` if unresolvable.
   */
  tagName(e, t) {
    if (e === "!")
      return "!";
    if (e[0] !== "!")
      return t(`Not a valid tag: ${e}`), null;
    if (e[1] === "<") {
      const o = e.slice(2, -1);
      return o === "!" || o === "!!" ? (t(`Verbatim tags aren't resolved, so ${e} is invalid.`), null) : (e[e.length - 1] !== ">" && t("Verbatim tags must end with a >"), o);
    }
    const [, s, i] = e.match(/^(.*!)([^!]*)$/s);
    i || t(`The ${e} tag has no suffix`);
    const r = this.tags[s];
    if (r)
      try {
        return r + decodeURIComponent(i);
      } catch (o) {
        return t(String(o)), null;
      }
    return s === "!" ? e : (t(`Could not resolve tag: ${e}`), null);
  }
  /**
   * Given a fully resolved tag, returns its printable string form,
   * taking into account current tag prefixes and defaults.
   */
  tagString(e) {
    for (const [t, s] of Object.entries(this.tags))
      if (e.startsWith(s))
        return t + ps(e.substring(s.length));
    return e[0] === "!" ? e : `!<${e}>`;
  }
  toString(e) {
    const t = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [], s = Object.entries(this.tags);
    let i;
    if (e && s.length > 0 && L(e.contents)) {
      const r = {};
      H(e.contents, (o, l) => {
        L(l) && l.tag && (r[l.tag] = !0);
      }), i = Object.keys(r);
    } else
      i = [];
    for (const [r, o] of s)
      r === "!!" && o === "tag:yaml.org,2002:" || (!e || i.some((l) => l.startsWith(o))) && t.push(`%TAG ${r} ${o}`);
    return t.join(`
`);
  }
}
v.defaultYaml = { explicit: !1, version: "1.2" };
v.defaultTags = { "!!": "tag:yaml.org,2002:" };
function Et(n) {
  if (/[\x00-\x19\s,[\]{}]/.test(n)) {
    const t = `Anchor must not contain whitespace or control characters: ${JSON.stringify(n)}`;
    throw new Error(t);
  }
  return !0;
}
function Lt(n) {
  const e = /* @__PURE__ */ new Set();
  return H(n, {
    Value(t, s) {
      s.anchor && e.add(s.anchor);
    }
  }), e;
}
function $t(n, e) {
  for (let t = 1; ; ++t) {
    const s = `${n}${t}`;
    if (!e.has(s))
      return s;
  }
}
function ms(n, e) {
  const t = [], s = /* @__PURE__ */ new Map();
  let i = null;
  return {
    onAnchor: (r) => {
      t.push(r), i || (i = Lt(n));
      const o = $t(e, i);
      return i.add(o), o;
    },
    /**
     * With circular references, the source node is only resolved after all
     * of its child nodes are. This is why anchors are set only after all of
     * the nodes have been created.
     */
    setAnchors: () => {
      for (const r of t) {
        const o = s.get(r);
        if (typeof o == "object" && o.anchor && (T(o.node) || E(o.node)))
          o.node.anchor = o.anchor;
        else {
          const l = new Error("Failed to resolve repeated object (this should not happen)");
          throw l.source = r, l;
        }
      }
    },
    sourceObjects: s
  };
}
function ee(n, e, t, s) {
  if (s && typeof s == "object")
    if (Array.isArray(s))
      for (let i = 0, r = s.length; i < r; ++i) {
        const o = s[i], l = ee(n, s, String(i), o);
        l === void 0 ? delete s[i] : l !== o && (s[i] = l);
      }
    else if (s instanceof Map)
      for (const i of Array.from(s.keys())) {
        const r = s.get(i), o = ee(n, s, i, r);
        o === void 0 ? s.delete(i) : o !== r && s.set(i, o);
      }
    else if (s instanceof Set)
      for (const i of Array.from(s)) {
        const r = ee(n, s, i, i);
        r === void 0 ? s.delete(i) : r !== i && (s.delete(i), s.add(r));
      }
    else
      for (const [i, r] of Object.entries(s)) {
        const o = ee(n, s, i, r);
        o === void 0 ? delete s[i] : o !== r && (s[i] = o);
      }
  return n.call(e, t, s);
}
function K(n, e, t) {
  if (Array.isArray(n))
    return n.map((s, i) => K(s, String(i), t));
  if (n && typeof n.toJSON == "function") {
    if (!t || !as(n))
      return n.toJSON(e, t);
    const s = { aliasCount: 0, count: 1, res: void 0 };
    t.anchors.set(n, s), t.onCreate = (r) => {
      s.res = r, delete t.onCreate;
    };
    const i = n.toJSON(e, t);
    return t.onCreate && t.onCreate(i), i;
  }
  return typeof n == "bigint" && !(t != null && t.keep) ? Number(n) : n;
}
class et {
  constructor(e) {
    Object.defineProperty(this, P, { value: e });
  }
  /** Create a copy of this node.  */
  clone() {
    const e = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return this.range && (e.range = this.range.slice()), e;
  }
  /** A plain JavaScript representation of this node. */
  toJS(e, { mapAsMap: t, maxAliasCount: s, onAnchor: i, reviver: r } = {}) {
    if (!_e(e))
      throw new TypeError("A document argument is required");
    const o = {
      anchors: /* @__PURE__ */ new Map(),
      doc: e,
      keep: !0,
      mapAsMap: t === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof s == "number" ? s : 100
    }, l = K(this, "", o);
    if (typeof i == "function")
      for (const { count: a, res: c } of o.anchors.values())
        i(c, a);
    return typeof r == "function" ? ee(r, { "": l }, "", l) : l;
  }
}
class tt extends et {
  constructor(e) {
    super(xe), this.source = e, Object.defineProperty(this, "tag", {
      set() {
        throw new Error("Alias nodes cannot have tags");
      }
    });
  }
  /**
   * Resolve the value of this alias within `doc`, finding the last
   * instance of the `source` anchor before this node.
   */
  resolve(e) {
    let t;
    return H(e, {
      Node: (s, i) => {
        if (i === this)
          return H.BREAK;
        i.anchor === this.source && (t = i);
      }
    }), t;
  }
  toJSON(e, t) {
    if (!t)
      return { source: this.source };
    const { anchors: s, doc: i, maxAliasCount: r } = t, o = this.resolve(i);
    if (!o) {
      const a = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
      throw new ReferenceError(a);
    }
    let l = s.get(o);
    if (l || (K(o, null, t), l = s.get(o)), !l || l.res === void 0) {
      const a = "This should not happen: Alias anchor was not resolved?";
      throw new ReferenceError(a);
    }
    if (r >= 0 && (l.count += 1, l.aliasCount === 0 && (l.aliasCount = Te(i, o, s)), l.count * l.aliasCount > r)) {
      const a = "Excessive alias count indicates a resource exhaustion attack";
      throw new ReferenceError(a);
    }
    return l.res;
  }
  toString(e, t, s) {
    const i = `*${this.source}`;
    if (e) {
      if (Et(this.source), e.options.verifyAliasOrder && !e.anchors.has(this.source)) {
        const r = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(r);
      }
      if (e.implicitKey)
        return `${i} `;
    }
    return i;
  }
}
function Te(n, e, t) {
  if (le(e)) {
    const s = e.resolve(n), i = t && s && t.get(s);
    return i ? i.count * i.aliasCount : 0;
  } else if (E(e)) {
    let s = 0;
    for (const i of e.items) {
      const r = Te(n, i, t);
      r > s && (s = r);
    }
    return s;
  } else if ($(e)) {
    const s = Te(n, e.key, t), i = Te(n, e.value, t);
    return Math.max(s, i);
  }
  return 1;
}
const Ct = (n) => !n || typeof n != "function" && typeof n != "object";
class A extends et {
  constructor(e) {
    super(q), this.value = e;
  }
  toJSON(e, t) {
    return t != null && t.keep ? this.value : K(this.value, e, t);
  }
  toString() {
    return String(this.value);
  }
}
A.BLOCK_FOLDED = "BLOCK_FOLDED";
A.BLOCK_LITERAL = "BLOCK_LITERAL";
A.PLAIN = "PLAIN";
A.QUOTE_DOUBLE = "QUOTE_DOUBLE";
A.QUOTE_SINGLE = "QUOTE_SINGLE";
const gs = "tag:yaml.org,2002:";
function ys(n, e, t) {
  if (e) {
    const s = t.filter((r) => r.tag === e), i = s.find((r) => !r.format) ?? s[0];
    if (!i)
      throw new Error(`Tag ${e} not found`);
    return i;
  }
  return t.find((s) => {
    var i;
    return ((i = s.identify) == null ? void 0 : i.call(s, n)) && !s.format;
  });
}
function me(n, e, t) {
  var f, d, h;
  if (_e(n) && (n = n.contents), L(n))
    return n;
  if ($(n)) {
    const g = (d = (f = t.schema[V]).createNode) == null ? void 0 : d.call(f, t.schema, null, t);
    return g.items.push(n), g;
  }
  (n instanceof String || n instanceof Number || n instanceof Boolean || typeof BigInt < "u" && n instanceof BigInt) && (n = n.valueOf());
  const { aliasDuplicateObjects: s, onAnchor: i, onTagObj: r, schema: o, sourceObjects: l } = t;
  let a;
  if (s && n && typeof n == "object") {
    if (a = l.get(n), a)
      return a.anchor || (a.anchor = i(n)), new tt(a.anchor);
    a = { anchor: null, node: null }, l.set(n, a);
  }
  e != null && e.startsWith("!!") && (e = gs + e.slice(2));
  let c = ys(n, e, o.tags);
  if (!c) {
    if (n && typeof n.toJSON == "function" && (n = n.toJSON()), !n || typeof n != "object") {
      const g = new A(n);
      return a && (a.node = g), g;
    }
    c = n instanceof Map ? o[V] : Symbol.iterator in Object(n) ? o[oe] : o[V];
  }
  r && (r(c), delete t.onTagObj);
  const m = c != null && c.createNode ? c.createNode(t.schema, n, t) : typeof ((h = c == null ? void 0 : c.nodeClass) == null ? void 0 : h.from) == "function" ? c.nodeClass.from(t.schema, n, t) : new A(n);
  return e ? m.tag = e : c.default || (m.tag = c.tag), a && (a.node = m), m;
}
function $e(n, e, t) {
  let s = t;
  for (let i = e.length - 1; i >= 0; --i) {
    const r = e[i];
    if (typeof r == "number" && Number.isInteger(r) && r >= 0) {
      const o = [];
      o[r] = s, s = o;
    } else
      s = /* @__PURE__ */ new Map([[r, s]]);
  }
  return me(s, void 0, {
    aliasDuplicateObjects: !1,
    keepUndefined: !1,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: n,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
const ue = (n) => n == null || typeof n == "object" && !!n[Symbol.iterator]().next().done;
class _t extends et {
  constructor(e, t) {
    super(e), Object.defineProperty(this, "schema", {
      value: t,
      configurable: !0,
      enumerable: !1,
      writable: !0
    });
  }
  /**
   * Create a copy of this collection.
   *
   * @param schema - If defined, overwrites the original's schema
   */
  clone(e) {
    const t = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    return e && (t.schema = e), t.items = t.items.map((s) => L(s) || $(s) ? s.clone(e) : s), this.range && (t.range = this.range.slice()), t;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(e, t) {
    if (ue(e))
      this.add(t);
    else {
      const [s, ...i] = e, r = this.get(s, !0);
      if (E(r))
        r.addIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(s, $e(this.schema, i, t));
      else
        throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`);
    }
  }
  /**
   * Removes a value from the collection.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(e) {
    const [t, ...s] = e;
    if (s.length === 0)
      return this.delete(t);
    const i = this.get(t, !0);
    if (E(i))
      return i.deleteIn(s);
    throw new Error(`Expected YAML collection at ${t}. Remaining path: ${s}`);
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(e, t) {
    const [s, ...i] = e, r = this.get(s, !0);
    return i.length === 0 ? !t && T(r) ? r.value : r : E(r) ? r.getIn(i, t) : void 0;
  }
  hasAllNullValues(e) {
    return this.items.every((t) => {
      if (!$(t))
        return !1;
      const s = t.value;
      return s == null || e && T(s) && s.value == null && !s.commentBefore && !s.comment && !s.tag;
    });
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   */
  hasIn(e) {
    const [t, ...s] = e;
    if (s.length === 0)
      return this.has(t);
    const i = this.get(t, !0);
    return E(i) ? i.hasIn(s) : !1;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    const [s, ...i] = e;
    if (i.length === 0)
      this.set(s, t);
    else {
      const r = this.get(s, !0);
      if (E(r))
        r.setIn(i, t);
      else if (r === void 0 && this.schema)
        this.set(s, $e(this.schema, i, t));
      else
        throw new Error(`Expected YAML collection at ${s}. Remaining path: ${i}`);
    }
  }
}
const bs = (n) => n.replace(/^(?!$)(?: $)?/gm, "#");
function F(n, e) {
  return /^\n+$/.test(n) ? n.substring(1) : e ? n.replace(/^(?! *$)/gm, e) : n;
}
const G = (n, e, t) => n.endsWith(`
`) ? F(t, e) : t.includes(`
`) ? `
` + F(t, e) : (n.endsWith(" ") ? "" : " ") + t, vt = "flow", He = "block", Ee = "quoted";
function ve(n, e, t = "flow", { indentAtStart: s, lineWidth: i = 80, minContentWidth: r = 20, onFold: o, onOverflow: l } = {}) {
  if (!i || i < 0)
    return n;
  i < r && (r = 0);
  const a = Math.max(1 + r, 1 + i - e.length);
  if (n.length <= a)
    return n;
  const c = [], m = {};
  let f = i - e.length;
  typeof s == "number" && (s > i - Math.max(2, r) ? c.push(0) : f = i - s);
  let d, h, g = !1, u = -1, p = -1, b = -1;
  t === He && (u = mt(n, u, e.length), u !== -1 && (f = u + a));
  for (let N; N = n[u += 1]; ) {
    if (t === Ee && N === "\\") {
      switch (p = u, n[u + 1]) {
        case "x":
          u += 3;
          break;
        case "u":
          u += 5;
          break;
        case "U":
          u += 9;
          break;
        default:
          u += 1;
      }
      b = u;
    }
    if (N === `
`)
      t === He && (u = mt(n, u, e.length)), f = u + e.length + a, d = void 0;
    else {
      if (N === " " && h && h !== " " && h !== `
` && h !== "	") {
        const w = n[u + 1];
        w && w !== " " && w !== `
` && w !== "	" && (d = u);
      }
      if (u >= f)
        if (d)
          c.push(d), f = d + a, d = void 0;
        else if (t === Ee) {
          for (; h === " " || h === "	"; )
            h = N, N = n[u += 1], g = !0;
          const w = u > b + 1 ? u - 2 : p - 1;
          if (m[w])
            return n;
          c.push(w), m[w] = !0, f = w + a, d = void 0;
        } else
          g = !0;
    }
    h = N;
  }
  if (g && l && l(), c.length === 0)
    return n;
  o && o();
  let k = n.slice(0, c[0]);
  for (let N = 0; N < c.length; ++N) {
    const w = c[N], S = c[N + 1] || n.length;
    w === 0 ? k = `
${e}${n.slice(0, S)}` : (t === Ee && m[w] && (k += `${n[w]}\\`), k += `
${e}${n.slice(w + 1, S)}`);
  }
  return k;
}
function mt(n, e, t) {
  let s = e, i = e + 1, r = n[i];
  for (; r === " " || r === "	"; )
    if (e < i + t)
      r = n[++e];
    else {
      do
        r = n[++e];
      while (r && r !== `
`);
      s = e, i = e + 1, r = n[i];
    }
  return s;
}
const Be = (n, e) => ({
  indentAtStart: e ? n.indent.length : n.indentAtStart,
  lineWidth: n.options.lineWidth,
  minContentWidth: n.options.minContentWidth
}), Me = (n) => /^(%|---|\.\.\.)/m.test(n);
function ws(n, e, t) {
  if (!e || e < 0)
    return !1;
  const s = e - t, i = n.length;
  if (i <= s)
    return !1;
  for (let r = 0, o = 0; r < i; ++r)
    if (n[r] === `
`) {
      if (r - o > s)
        return !0;
      if (o = r + 1, i - o <= s)
        return !1;
    }
  return !0;
}
function pe(n, e) {
  const t = JSON.stringify(n);
  if (e.options.doubleQuotedAsJSON)
    return t;
  const { implicitKey: s } = e, i = e.options.doubleQuotedMinMultiLineLength, r = e.indent || (Me(n) ? "  " : "");
  let o = "", l = 0;
  for (let a = 0, c = t[a]; c; c = t[++a])
    if (c === " " && t[a + 1] === "\\" && t[a + 2] === "n" && (o += t.slice(l, a) + "\\ ", a += 1, l = a, c = "\\"), c === "\\")
      switch (t[a + 1]) {
        case "u":
          {
            o += t.slice(l, a);
            const m = t.substr(a + 2, 4);
            switch (m) {
              case "0000":
                o += "\\0";
                break;
              case "0007":
                o += "\\a";
                break;
              case "000b":
                o += "\\v";
                break;
              case "001b":
                o += "\\e";
                break;
              case "0085":
                o += "\\N";
                break;
              case "00a0":
                o += "\\_";
                break;
              case "2028":
                o += "\\L";
                break;
              case "2029":
                o += "\\P";
                break;
              default:
                m.substr(0, 2) === "00" ? o += "\\x" + m.substr(2) : o += t.substr(a, 6);
            }
            a += 5, l = a + 1;
          }
          break;
        case "n":
          if (s || t[a + 2] === '"' || t.length < i)
            a += 1;
          else {
            for (o += t.slice(l, a) + `

`; t[a + 2] === "\\" && t[a + 3] === "n" && t[a + 4] !== '"'; )
              o += `
`, a += 2;
            o += r, t[a + 2] === " " && (o += "\\"), a += 1, l = a + 1;
          }
          break;
        default:
          a += 1;
      }
  return o = l ? o + t.slice(l) : t, s ? o : ve(o, r, Ee, Be(e, !1));
}
function We(n, e) {
  if (e.options.singleQuote === !1 || e.implicitKey && n.includes(`
`) || /[ \t]\n|\n[ \t]/.test(n))
    return pe(n, e);
  const t = e.indent || (Me(n) ? "  " : ""), s = "'" + n.replace(/'/g, "''").replace(/\n+/g, `$&
${t}`) + "'";
  return e.implicitKey ? s : ve(s, t, vt, Be(e, !1));
}
function te(n, e) {
  const { singleQuote: t } = e.options;
  let s;
  if (t === !1)
    s = pe;
  else {
    const i = n.includes('"'), r = n.includes("'");
    i && !r ? s = We : r && !i ? s = pe : s = t ? We : pe;
  }
  return s(n, e);
}
let Xe;
try {
  Xe = new RegExp(`(^|(?<!
))
+(?!
|$)`, "g");
} catch {
  Xe = /\n+(?!\n|$)/g;
}
function Le({ comment: n, type: e, value: t }, s, i, r) {
  const { blockQuote: o, commentString: l, lineWidth: a } = s.options;
  if (!o || /\n[\t ]+$/.test(t) || /^\s*$/.test(t))
    return te(t, s);
  const c = s.indent || (s.forceBlockIndent || Me(t) ? "  " : ""), m = o === "literal" ? !0 : o === "folded" || e === A.BLOCK_FOLDED ? !1 : e === A.BLOCK_LITERAL ? !0 : !ws(t, a, c.length);
  if (!t)
    return m ? `|
` : `>
`;
  let f, d;
  for (d = t.length; d > 0; --d) {
    const S = t[d - 1];
    if (S !== `
` && S !== "	" && S !== " ")
      break;
  }
  let h = t.substring(d);
  const g = h.indexOf(`
`);
  g === -1 ? f = "-" : t === h || g !== h.length - 1 ? (f = "+", r && r()) : f = "", h && (t = t.slice(0, -h.length), h[h.length - 1] === `
` && (h = h.slice(0, -1)), h = h.replace(Xe, `$&${c}`));
  let u = !1, p, b = -1;
  for (p = 0; p < t.length; ++p) {
    const S = t[p];
    if (S === " ")
      u = !0;
    else if (S === `
`)
      b = p;
    else
      break;
  }
  let k = t.substring(0, b < p ? b + 1 : p);
  k && (t = t.substring(k.length), k = k.replace(/\n+/g, `$&${c}`));
  let w = (u ? c ? "2" : "1" : "") + f;
  if (n && (w += " " + l(n.replace(/ ?[\r\n]+/g, " ")), i && i()), !m) {
    const S = t.replace(/\n+/g, `
$&`).replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${c}`);
    let O = !1;
    const I = Be(s, !0);
    o !== "folded" && e !== A.BLOCK_FOLDED && (I.onOverflow = () => {
      O = !0;
    });
    const y = ve(`${k}${S}${h}`, c, He, I);
    if (!O)
      return `>${w}
${c}${y}`;
  }
  return t = t.replace(/\n+/g, `$&${c}`), `|${w}
${c}${k}${t}${h}`;
}
function ks(n, e, t, s) {
  const { type: i, value: r } = n, { actualString: o, implicitKey: l, indent: a, indentStep: c, inFlow: m } = e;
  if (l && r.includes(`
`) || m && /[[\]{},]/.test(r))
    return te(r, e);
  if (!r || /^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(r))
    return l || m || !r.includes(`
`) ? te(r, e) : Le(n, e, t, s);
  if (!l && !m && i !== A.PLAIN && r.includes(`
`))
    return Le(n, e, t, s);
  if (Me(r)) {
    if (a === "")
      return e.forceBlockIndent = !0, Le(n, e, t, s);
    if (l && a === c)
      return te(r, e);
  }
  const f = r.replace(/\n+/g, `$&
${a}`);
  if (o) {
    const d = (u) => {
      var p;
      return u.default && u.tag !== "tag:yaml.org,2002:str" && ((p = u.test) == null ? void 0 : p.test(f));
    }, { compat: h, tags: g } = e.doc.schema;
    if (g.some(d) || h != null && h.some(d))
      return te(r, e);
  }
  return l ? f : ve(f, a, vt, Be(e, !1));
}
function st(n, e, t, s) {
  const { implicitKey: i, inFlow: r } = e, o = typeof n.value == "string" ? n : Object.assign({}, n, { value: String(n.value) });
  let { type: l } = n;
  l !== A.QUOTE_DOUBLE && /[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(o.value) && (l = A.QUOTE_DOUBLE);
  const a = (m) => {
    switch (m) {
      case A.BLOCK_FOLDED:
      case A.BLOCK_LITERAL:
        return i || r ? te(o.value, e) : Le(o, e, t, s);
      case A.QUOTE_DOUBLE:
        return pe(o.value, e);
      case A.QUOTE_SINGLE:
        return We(o.value, e);
      case A.PLAIN:
        return ks(o, e, t, s);
      default:
        return null;
    }
  };
  let c = a(l);
  if (c === null) {
    const { defaultKeyType: m, defaultStringType: f } = e.options, d = i && m || f;
    if (c = a(d), c === null)
      throw new Error(`Unsupported default string type ${d}`);
  }
  return c;
}
function Bt(n, e) {
  const t = Object.assign({
    blockQuote: !0,
    commentString: bs,
    defaultKeyType: null,
    defaultStringType: "PLAIN",
    directives: null,
    doubleQuotedAsJSON: !1,
    doubleQuotedMinMultiLineLength: 40,
    falseStr: "false",
    flowCollectionPadding: !0,
    indentSeq: !0,
    lineWidth: 80,
    minContentWidth: 20,
    nullStr: "null",
    simpleKeys: !1,
    singleQuote: null,
    trueStr: "true",
    verifyAliasOrder: !0
  }, n.schema.toStringOptions, e);
  let s;
  switch (t.collectionStyle) {
    case "block":
      s = !1;
      break;
    case "flow":
      s = !0;
      break;
    default:
      s = null;
  }
  return {
    anchors: /* @__PURE__ */ new Set(),
    doc: n,
    flowCollectionPadding: t.flowCollectionPadding ? " " : "",
    indent: "",
    indentStep: typeof t.indent == "number" ? " ".repeat(t.indent) : "  ",
    inFlow: s,
    options: t
  };
}
function Ss(n, e) {
  var i;
  if (e.tag) {
    const r = n.filter((o) => o.tag === e.tag);
    if (r.length > 0)
      return r.find((o) => o.format === e.format) ?? r[0];
  }
  let t, s;
  if (T(e)) {
    s = e.value;
    let r = n.filter((o) => {
      var l;
      return (l = o.identify) == null ? void 0 : l.call(o, s);
    });
    if (r.length > 1) {
      const o = r.filter((l) => l.test);
      o.length > 0 && (r = o);
    }
    t = r.find((o) => o.format === e.format) ?? r.find((o) => !o.format);
  } else
    s = e, t = n.find((r) => r.nodeClass && s instanceof r.nodeClass);
  if (!t) {
    const r = ((i = s == null ? void 0 : s.constructor) == null ? void 0 : i.name) ?? typeof s;
    throw new Error(`Tag not resolved for ${r} value`);
  }
  return t;
}
function Ns(n, e, { anchors: t, doc: s }) {
  if (!s.directives)
    return "";
  const i = [], r = (T(n) || E(n)) && n.anchor;
  r && Et(r) && (t.add(r), i.push(`&${r}`));
  const o = n.tag ? n.tag : e.default ? null : e.tag;
  return o && i.push(s.directives.tagString(o)), i.join(" ");
}
function ie(n, e, t, s) {
  var a;
  if ($(n))
    return n.toString(e, t, s);
  if (le(n)) {
    if (e.doc.directives)
      return n.toString(e);
    if ((a = e.resolvedAliases) != null && a.has(n))
      throw new TypeError("Cannot stringify circular structure without alias nodes");
    e.resolvedAliases ? e.resolvedAliases.add(n) : e.resolvedAliases = /* @__PURE__ */ new Set([n]), n = n.resolve(e.doc);
  }
  let i;
  const r = L(n) ? n : e.doc.createNode(n, { onTagObj: (c) => i = c });
  i || (i = Ss(e.doc.schema.tags, r));
  const o = Ns(r, i, e);
  o.length > 0 && (e.indentAtStart = (e.indentAtStart ?? 0) + o.length + 1);
  const l = typeof i.stringify == "function" ? i.stringify(r, e, t, s) : T(r) ? st(r, e, t, s) : r.toString(e, t, s);
  return o ? T(r) || l[0] === "{" || l[0] === "[" ? `${o} ${l}` : `${o}
${e.indent}${l}` : l;
}
function Os({ key: n, value: e }, t, s, i) {
  const { allNullValues: r, doc: o, indent: l, indentStep: a, options: { commentString: c, indentSeq: m, simpleKeys: f } } = t;
  let d = L(n) && n.comment || null;
  if (f) {
    if (d)
      throw new Error("With simple keys, key nodes cannot have comments");
    if (E(n) || !L(n) && typeof n == "object") {
      const I = "With simple keys, collection cannot be used as a key value";
      throw new Error(I);
    }
  }
  let h = !f && (!n || d && e == null && !t.inFlow || E(n) || (T(n) ? n.type === A.BLOCK_FOLDED || n.type === A.BLOCK_LITERAL : typeof n == "object"));
  t = Object.assign({}, t, {
    allNullValues: !1,
    implicitKey: !h && (f || !r),
    indent: l + a
  });
  let g = !1, u = !1, p = ie(n, t, () => g = !0, () => u = !0);
  if (!h && !t.inFlow && p.length > 1024) {
    if (f)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    h = !0;
  }
  if (t.inFlow) {
    if (r || e == null)
      return g && s && s(), p === "" ? "?" : h ? `? ${p}` : p;
  } else if (r && !f || e == null && h)
    return p = `? ${p}`, d && !g ? p += G(p, t.indent, c(d)) : u && i && i(), p;
  g && (d = null), h ? (d && (p += G(p, t.indent, c(d))), p = `? ${p}
${l}:`) : (p = `${p}:`, d && (p += G(p, t.indent, c(d))));
  let b, k, N;
  L(e) ? (b = !!e.spaceBefore, k = e.commentBefore, N = e.comment) : (b = !1, k = null, N = null, e && typeof e == "object" && (e = o.createNode(e))), t.implicitKey = !1, !h && !d && T(e) && (t.indentAtStart = p.length + 1), u = !1, !m && a.length >= 2 && !t.inFlow && !h && be(e) && !e.flow && !e.tag && !e.anchor && (t.indent = t.indent.substring(2));
  let w = !1;
  const S = ie(e, t, () => w = !0, () => u = !0);
  let O = " ";
  if (d || b || k) {
    if (O = b ? `
` : "", k) {
      const I = c(k);
      O += `
${F(I, t.indent)}`;
    }
    S === "" && !t.inFlow ? O === `
` && (O = `

`) : O += `
${t.indent}`;
  } else if (!h && E(e)) {
    const I = S[0], y = S.indexOf(`
`), C = y !== -1, R = t.inFlow ?? e.flow ?? e.items.length === 0;
    if (C || !R) {
      let X = !1;
      if (C && (I === "&" || I === "!")) {
        let _ = S.indexOf(" ");
        I === "&" && _ !== -1 && _ < y && S[_ + 1] === "!" && (_ = S.indexOf(" ", _ + 1)), (_ === -1 || y < _) && (X = !0);
      }
      X || (O = `
${t.indent}`);
    }
  } else (S === "" || S[0] === `
`) && (O = "");
  return p += O + S, t.inFlow ? w && s && s() : N && !w ? p += G(p, t.indent, c(N)) : u && i && i(), p;
}
function Mt(n, e) {
  (n === "debug" || n === "warn") && console.warn(e);
}
const Se = "<<", U = {
  identify: (n) => n === Se || typeof n == "symbol" && n.description === Se,
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new A(Symbol(Se)), {
    addToJSMap: Kt
  }),
  stringify: () => Se
}, As = (n, e) => (U.identify(e) || T(e) && (!e.type || e.type === A.PLAIN) && U.identify(e.value)) && (n == null ? void 0 : n.doc.schema.tags.some((t) => t.tag === U.tag && t.default));
function Kt(n, e, t) {
  if (t = n && le(t) ? t.resolve(n.doc) : t, be(t))
    for (const s of t.items)
      Ue(n, e, s);
  else if (Array.isArray(t))
    for (const s of t)
      Ue(n, e, s);
  else
    Ue(n, e, t);
}
function Ue(n, e, t) {
  const s = n && le(t) ? t.resolve(n.doc) : t;
  if (!ye(s))
    throw new Error("Merge sources must be maps or map aliases");
  const i = s.toJSON(null, n, Map);
  for (const [r, o] of i)
    e instanceof Map ? e.has(r) || e.set(r, o) : e instanceof Set ? e.add(r) : Object.prototype.hasOwnProperty.call(e, r) || Object.defineProperty(e, r, {
      value: o,
      writable: !0,
      enumerable: !0,
      configurable: !0
    });
  return e;
}
function Pt(n, e, { key: t, value: s }) {
  if (L(t) && t.addToJSMap)
    t.addToJSMap(n, e, s);
  else if (As(n, t))
    Kt(n, e, s);
  else {
    const i = K(t, "", n);
    if (e instanceof Map)
      e.set(i, K(s, i, n));
    else if (e instanceof Set)
      e.add(i);
    else {
      const r = Is(t, i, n), o = K(s, r, n);
      r in e ? Object.defineProperty(e, r, {
        value: o,
        writable: !0,
        enumerable: !0,
        configurable: !0
      }) : e[r] = o;
    }
  }
  return e;
}
function Is(n, e, t) {
  if (e === null)
    return "";
  if (typeof e != "object")
    return String(e);
  if (L(n) && (t != null && t.doc)) {
    const s = Bt(t.doc, {});
    s.anchors = /* @__PURE__ */ new Set();
    for (const r of t.anchors.keys())
      s.anchors.add(r.anchor);
    s.inFlow = !0, s.inStringifyKey = !0;
    const i = n.toString(s);
    if (!t.mapKeyWarned) {
      let r = JSON.stringify(i);
      r.length > 40 && (r = r.substring(0, 36) + '..."'), Mt(t.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${r}. Set mapAsMap: true to use object keys.`), t.mapKeyWarned = !0;
    }
    return i;
  }
  return JSON.stringify(e);
}
function nt(n, e, t) {
  const s = me(n, void 0, t), i = me(e, void 0, t);
  return new B(s, i);
}
class B {
  constructor(e, t = null) {
    Object.defineProperty(this, P, { value: Tt }), this.key = e, this.value = t;
  }
  clone(e) {
    let { key: t, value: s } = this;
    return L(t) && (t = t.clone(e)), L(s) && (s = s.clone(e)), new B(t, s);
  }
  toJSON(e, t) {
    const s = t != null && t.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return Pt(t, s, this);
  }
  toString(e, t, s) {
    return e != null && e.doc ? Os(this, e, t, s) : JSON.stringify(this);
  }
}
function Dt(n, e, t) {
  return (e.inFlow ?? n.flow ? Es : Ts)(n, e, t);
}
function Ts({ comment: n, items: e }, t, { blockItemPrefix: s, flowChars: i, itemIndent: r, onChompKeep: o, onComment: l }) {
  const { indent: a, options: { commentString: c } } = t, m = Object.assign({}, t, { indent: r, type: null });
  let f = !1;
  const d = [];
  for (let g = 0; g < e.length; ++g) {
    const u = e[g];
    let p = null;
    if (L(u))
      !f && u.spaceBefore && d.push(""), Ce(t, d, u.commentBefore, f), u.comment && (p = u.comment);
    else if ($(u)) {
      const k = L(u.key) ? u.key : null;
      k && (!f && k.spaceBefore && d.push(""), Ce(t, d, k.commentBefore, f));
    }
    f = !1;
    let b = ie(u, m, () => p = null, () => f = !0);
    p && (b += G(b, r, c(p))), f && p && (f = !1), d.push(s + b);
  }
  let h;
  if (d.length === 0)
    h = i.start + i.end;
  else {
    h = d[0];
    for (let g = 1; g < d.length; ++g) {
      const u = d[g];
      h += u ? `
${a}${u}` : `
`;
    }
  }
  return n ? (h += `
` + F(c(n), a), l && l()) : f && o && o(), h;
}
function Es({ items: n }, e, { flowChars: t, itemIndent: s }) {
  const { indent: i, indentStep: r, flowCollectionPadding: o, options: { commentString: l } } = e;
  s += r;
  const a = Object.assign({}, e, {
    indent: s,
    inFlow: !0,
    type: null
  });
  let c = !1, m = 0;
  const f = [];
  for (let g = 0; g < n.length; ++g) {
    const u = n[g];
    let p = null;
    if (L(u))
      u.spaceBefore && f.push(""), Ce(e, f, u.commentBefore, !1), u.comment && (p = u.comment);
    else if ($(u)) {
      const k = L(u.key) ? u.key : null;
      k && (k.spaceBefore && f.push(""), Ce(e, f, k.commentBefore, !1), k.comment && (c = !0));
      const N = L(u.value) ? u.value : null;
      N ? (N.comment && (p = N.comment), N.commentBefore && (c = !0)) : u.value == null && (k != null && k.comment) && (p = k.comment);
    }
    p && (c = !0);
    let b = ie(u, a, () => p = null);
    g < n.length - 1 && (b += ","), p && (b += G(b, s, l(p))), !c && (f.length > m || b.includes(`
`)) && (c = !0), f.push(b), m = f.length;
  }
  const { start: d, end: h } = t;
  if (f.length === 0)
    return d + h;
  if (!c) {
    const g = f.reduce((u, p) => u + p.length + 2, 2);
    c = e.options.lineWidth > 0 && g > e.options.lineWidth;
  }
  if (c) {
    let g = d;
    for (const u of f)
      g += u ? `
${r}${i}${u}` : `
`;
    return `${g}
${i}${h}`;
  } else
    return `${d}${o}${f.join(" ")}${o}${h}`;
}
function Ce({ indent: n, options: { commentString: e } }, t, s, i) {
  if (s && i && (s = s.replace(/^\n+/, "")), s) {
    const r = F(e(s), n);
    t.push(r.trimStart());
  }
}
function Q(n, e) {
  const t = T(e) ? e.value : e;
  for (const s of n)
    if ($(s) && (s.key === e || s.key === t || T(s.key) && s.key.value === t))
      return s;
}
class M extends _t {
  static get tagName() {
    return "tag:yaml.org,2002:map";
  }
  constructor(e) {
    super(V, e), this.items = [];
  }
  /**
   * A generic collection parsing method that can be extended
   * to other node classes that inherit from YAMLMap
   */
  static from(e, t, s) {
    const { keepUndefined: i, replacer: r } = s, o = new this(e), l = (a, c) => {
      if (typeof r == "function")
        c = r.call(t, a, c);
      else if (Array.isArray(r) && !r.includes(a))
        return;
      (c !== void 0 || i) && o.items.push(nt(a, c, s));
    };
    if (t instanceof Map)
      for (const [a, c] of t)
        l(a, c);
    else if (t && typeof t == "object")
      for (const a of Object.keys(t))
        l(a, t[a]);
    return typeof e.sortMapEntries == "function" && o.items.sort(e.sortMapEntries), o;
  }
  /**
   * Adds a value to the collection.
   *
   * @param overwrite - If not set `true`, using a key that is already in the
   *   collection will throw. Otherwise, overwrites the previous value.
   */
  add(e, t) {
    var o;
    let s;
    $(e) ? s = e : !e || typeof e != "object" || !("key" in e) ? s = new B(e, e == null ? void 0 : e.value) : s = new B(e.key, e.value);
    const i = Q(this.items, s.key), r = (o = this.schema) == null ? void 0 : o.sortMapEntries;
    if (i) {
      if (!t)
        throw new Error(`Key ${s.key} already set`);
      T(i.value) && Ct(s.value) ? i.value.value = s.value : i.value = s.value;
    } else if (r) {
      const l = this.items.findIndex((a) => r(s, a) < 0);
      l === -1 ? this.items.push(s) : this.items.splice(l, 0, s);
    } else
      this.items.push(s);
  }
  delete(e) {
    const t = Q(this.items, e);
    return t ? this.items.splice(this.items.indexOf(t), 1).length > 0 : !1;
  }
  get(e, t) {
    const s = Q(this.items, e), i = s == null ? void 0 : s.value;
    return (!t && T(i) ? i.value : i) ?? void 0;
  }
  has(e) {
    return !!Q(this.items, e);
  }
  set(e, t) {
    this.add(new B(e, t), !0);
  }
  /**
   * @param ctx - Conversion context, originally set in Document#toJS()
   * @param {Class} Type - If set, forces the returned collection type
   * @returns Instance of Type, Map, or Object
   */
  toJSON(e, t, s) {
    const i = s ? new s() : t != null && t.mapAsMap ? /* @__PURE__ */ new Map() : {};
    t != null && t.onCreate && t.onCreate(i);
    for (const r of this.items)
      Pt(t, i, r);
    return i;
  }
  toString(e, t, s) {
    if (!e)
      return JSON.stringify(this);
    for (const i of this.items)
      if (!$(i))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(i)} instead`);
    return !e.allNullValues && this.hasAllNullValues(!1) && (e = Object.assign({}, e, { allNullValues: !0 })), Dt(this, e, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: e.indent || "",
      onChompKeep: s,
      onComment: t
    });
  }
}
const ae = {
  collection: "map",
  default: !0,
  nodeClass: M,
  tag: "tag:yaml.org,2002:map",
  resolve(n, e) {
    return ye(n) || e("Expected a mapping for this tag"), n;
  },
  createNode: (n, e, t) => M.from(n, e, t)
};
class W extends _t {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(e) {
    super(oe, e), this.items = [];
  }
  add(e) {
    this.items.push(e);
  }
  /**
   * Removes a value from the collection.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   *
   * @returns `true` if the item was found and removed.
   */
  delete(e) {
    const t = Ne(e);
    return typeof t != "number" ? !1 : this.items.splice(t, 1).length > 0;
  }
  get(e, t) {
    const s = Ne(e);
    if (typeof s != "number")
      return;
    const i = this.items[s];
    return !t && T(i) ? i.value : i;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(e) {
    const t = Ne(e);
    return typeof t == "number" && t < this.items.length;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   *
   * If `key` does not contain a representation of an integer, this will throw.
   * It may be wrapped in a `Scalar`.
   */
  set(e, t) {
    const s = Ne(e);
    if (typeof s != "number")
      throw new Error(`Expected a valid index, not ${e}.`);
    const i = this.items[s];
    T(i) && Ct(t) ? i.value = t : this.items[s] = t;
  }
  toJSON(e, t) {
    const s = [];
    t != null && t.onCreate && t.onCreate(s);
    let i = 0;
    for (const r of this.items)
      s.push(K(r, String(i++), t));
    return s;
  }
  toString(e, t, s) {
    return e ? Dt(this, e, {
      blockItemPrefix: "- ",
      flowChars: { start: "[", end: "]" },
      itemIndent: (e.indent || "") + "  ",
      onChompKeep: s,
      onComment: t
    }) : JSON.stringify(this);
  }
  static from(e, t, s) {
    const { replacer: i } = s, r = new this(e);
    if (t && Symbol.iterator in Object(t)) {
      let o = 0;
      for (let l of t) {
        if (typeof i == "function") {
          const a = t instanceof Set ? l : String(o++);
          l = i.call(t, a, l);
        }
        r.items.push(me(l, void 0, s));
      }
    }
    return r;
  }
}
function Ne(n) {
  let e = T(n) ? n.value : n;
  return e && typeof e == "string" && (e = Number(e)), typeof e == "number" && Number.isInteger(e) && e >= 0 ? e : null;
}
const ce = {
  collection: "seq",
  default: !0,
  nodeClass: W,
  tag: "tag:yaml.org,2002:seq",
  resolve(n, e) {
    return be(n) || e("Expected a sequence for this tag"), n;
  },
  createNode: (n, e, t) => W.from(n, e, t)
}, Ke = {
  identify: (n) => typeof n == "string",
  default: !0,
  tag: "tag:yaml.org,2002:str",
  resolve: (n) => n,
  stringify(n, e, t, s) {
    return e = Object.assign({ actualString: !0 }, e), st(n, e, t, s);
  }
}, Pe = {
  identify: (n) => n == null,
  createNode: () => new A(null),
  default: !0,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new A(null),
  stringify: ({ source: n }, e) => typeof n == "string" && Pe.test.test(n) ? n : e.options.nullStr
}, it = {
  identify: (n) => typeof n == "boolean",
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (n) => new A(n[0] === "t" || n[0] === "T"),
  stringify({ source: n, value: e }, t) {
    if (n && it.test.test(n)) {
      const s = n[0] === "t" || n[0] === "T";
      if (e === s)
        return n;
    }
    return e ? t.options.trueStr : t.options.falseStr;
  }
};
function j({ format: n, minFractionDigits: e, tag: t, value: s }) {
  if (typeof s == "bigint")
    return String(s);
  const i = typeof s == "number" ? s : Number(s);
  if (!isFinite(i))
    return isNaN(i) ? ".nan" : i < 0 ? "-.inf" : ".inf";
  let r = JSON.stringify(s);
  if (!n && e && (!t || t === "tag:yaml.org,2002:float") && /^\d/.test(r)) {
    let o = r.indexOf(".");
    o < 0 && (o = r.length, r += ".");
    let l = e - (r.length - o - 1);
    for (; l-- > 0; )
      r += "0";
  }
  return r;
}
const jt = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (n) => n.slice(-3).toLowerCase() === "nan" ? NaN : n[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: j
}, qt = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (n) => parseFloat(n),
  stringify(n) {
    const e = Number(n.value);
    return isFinite(e) ? e.toExponential() : j(n);
  }
}, Ft = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(n) {
    const e = new A(parseFloat(n)), t = n.indexOf(".");
    return t !== -1 && n[n.length - 1] === "0" && (e.minFractionDigits = n.length - t - 1), e;
  },
  stringify: j
}, De = (n) => typeof n == "bigint" || Number.isInteger(n), rt = (n, e, t, { intAsBigInt: s }) => s ? BigInt(n) : parseInt(n.substring(e), t);
function Ut(n, e, t) {
  const { value: s } = n;
  return De(s) && s >= 0 ? t + s.toString(e) : j(n);
}
const Rt = {
  identify: (n) => De(n) && n >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (n, e, t) => rt(n, 2, 8, t),
  stringify: (n) => Ut(n, 8, "0o")
}, Vt = {
  identify: De,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (n, e, t) => rt(n, 0, 10, t),
  stringify: j
}, Jt = {
  identify: (n) => De(n) && n >= 0,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (n, e, t) => rt(n, 2, 16, t),
  stringify: (n) => Ut(n, 16, "0x")
}, Ls = [
  ae,
  ce,
  Ke,
  Pe,
  it,
  Rt,
  Vt,
  Jt,
  jt,
  qt,
  Ft
];
function gt(n) {
  return typeof n == "bigint" || Number.isInteger(n);
}
const Oe = ({ value: n }) => JSON.stringify(n), $s = [
  {
    identify: (n) => typeof n == "string",
    default: !0,
    tag: "tag:yaml.org,2002:str",
    resolve: (n) => n,
    stringify: Oe
  },
  {
    identify: (n) => n == null,
    createNode: () => new A(null),
    default: !0,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: Oe
  },
  {
    identify: (n) => typeof n == "boolean",
    default: !0,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (n) => n === "true",
    stringify: Oe
  },
  {
    identify: gt,
    default: !0,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (n, e, { intAsBigInt: t }) => t ? BigInt(n) : parseInt(n, 10),
    stringify: ({ value: n }) => gt(n) ? n.toString() : JSON.stringify(n)
  },
  {
    identify: (n) => typeof n == "number",
    default: !0,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (n) => parseFloat(n),
    stringify: Oe
  }
], Cs = {
  default: !0,
  tag: "",
  test: /^/,
  resolve(n, e) {
    return e(`Unresolved plain scalar ${JSON.stringify(n)}`), n;
  }
}, _s = [ae, ce].concat($s, Cs), ot = {
  identify: (n) => n instanceof Uint8Array,
  // Buffer inherits from Uint8Array
  default: !1,
  tag: "tag:yaml.org,2002:binary",
  /**
   * Returns a Buffer in node and an Uint8Array in browsers
   *
   * To use the resulting buffer as an image, you'll want to do something like:
   *
   *   const blob = new Blob([buffer], { type: 'image/jpeg' })
   *   document.querySelector('#photo').src = URL.createObjectURL(blob)
   */
  resolve(n, e) {
    if (typeof atob == "function") {
      const t = atob(n.replace(/[\n\r]/g, "")), s = new Uint8Array(t.length);
      for (let i = 0; i < t.length; ++i)
        s[i] = t.charCodeAt(i);
      return s;
    } else
      return e("This environment does not support reading binary tags; either Buffer or atob is required"), n;
  },
  stringify({ comment: n, type: e, value: t }, s, i, r) {
    const o = t;
    let l;
    if (typeof btoa == "function") {
      let a = "";
      for (let c = 0; c < o.length; ++c)
        a += String.fromCharCode(o[c]);
      l = btoa(a);
    } else
      throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    if (e || (e = A.BLOCK_LITERAL), e !== A.QUOTE_DOUBLE) {
      const a = Math.max(s.options.lineWidth - s.indent.length, s.options.minContentWidth), c = Math.ceil(l.length / a), m = new Array(c);
      for (let f = 0, d = 0; f < c; ++f, d += a)
        m[f] = l.substr(d, a);
      l = m.join(e === A.BLOCK_LITERAL ? `
` : " ");
    }
    return st({ comment: n, type: e, value: l }, s, i, r);
  }
};
function Yt(n, e) {
  if (be(n))
    for (let t = 0; t < n.items.length; ++t) {
      let s = n.items[t];
      if (!$(s)) {
        if (ye(s)) {
          s.items.length > 1 && e("Each pair must have its own sequence indicator");
          const i = s.items[0] || new B(new A(null));
          if (s.commentBefore && (i.key.commentBefore = i.key.commentBefore ? `${s.commentBefore}
${i.key.commentBefore}` : s.commentBefore), s.comment) {
            const r = i.value ?? i.key;
            r.comment = r.comment ? `${s.comment}
${r.comment}` : s.comment;
          }
          s = i;
        }
        n.items[t] = $(s) ? s : new B(s);
      }
    }
  else
    e("Expected a sequence for this tag");
  return n;
}
function Gt(n, e, t) {
  const { replacer: s } = t, i = new W(n);
  i.tag = "tag:yaml.org,2002:pairs";
  let r = 0;
  if (e && Symbol.iterator in Object(e))
    for (let o of e) {
      typeof s == "function" && (o = s.call(e, String(r++), o));
      let l, a;
      if (Array.isArray(o))
        if (o.length === 2)
          l = o[0], a = o[1];
        else
          throw new TypeError(`Expected [key, value] tuple: ${o}`);
      else if (o && o instanceof Object) {
        const c = Object.keys(o);
        if (c.length === 1)
          l = c[0], a = o[l];
        else
          throw new TypeError(`Expected tuple with one key, not ${c.length} keys`);
      } else
        l = o;
      i.items.push(nt(l, a, t));
    }
  return i;
}
const lt = {
  collection: "seq",
  default: !1,
  tag: "tag:yaml.org,2002:pairs",
  resolve: Yt,
  createNode: Gt
};
class se extends W {
  constructor() {
    super(), this.add = M.prototype.add.bind(this), this.delete = M.prototype.delete.bind(this), this.get = M.prototype.get.bind(this), this.has = M.prototype.has.bind(this), this.set = M.prototype.set.bind(this), this.tag = se.tag;
  }
  /**
   * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
   * but TypeScript won't allow widening the signature of a child method.
   */
  toJSON(e, t) {
    if (!t)
      return super.toJSON(e);
    const s = /* @__PURE__ */ new Map();
    t != null && t.onCreate && t.onCreate(s);
    for (const i of this.items) {
      let r, o;
      if ($(i) ? (r = K(i.key, "", t), o = K(i.value, r, t)) : r = K(i, "", t), s.has(r))
        throw new Error("Ordered maps must not include duplicate keys");
      s.set(r, o);
    }
    return s;
  }
  static from(e, t, s) {
    const i = Gt(e, t, s), r = new this();
    return r.items = i.items, r;
  }
}
se.tag = "tag:yaml.org,2002:omap";
const at = {
  collection: "seq",
  identify: (n) => n instanceof Map,
  nodeClass: se,
  default: !1,
  tag: "tag:yaml.org,2002:omap",
  resolve(n, e) {
    const t = Yt(n, e), s = [];
    for (const { key: i } of t.items)
      T(i) && (s.includes(i.value) ? e(`Ordered maps must not include duplicate keys: ${i.value}`) : s.push(i.value));
    return Object.assign(new se(), t);
  },
  createNode: (n, e, t) => se.from(n, e, t)
};
function Qt({ value: n, source: e }, t) {
  return e && (n ? Ht : Wt).test.test(e) ? e : n ? t.options.trueStr : t.options.falseStr;
}
const Ht = {
  identify: (n) => n === !0,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new A(!0),
  stringify: Qt
}, Wt = {
  identify: (n) => n === !1,
  default: !0,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new A(!1),
  stringify: Qt
}, vs = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (n) => n.slice(-3).toLowerCase() === "nan" ? NaN : n[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: j
}, Bs = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (n) => parseFloat(n.replace(/_/g, "")),
  stringify(n) {
    const e = Number(n.value);
    return isFinite(e) ? e.toExponential() : j(n);
  }
}, Ms = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(n) {
    const e = new A(parseFloat(n.replace(/_/g, ""))), t = n.indexOf(".");
    if (t !== -1) {
      const s = n.substring(t + 1).replace(/_/g, "");
      s[s.length - 1] === "0" && (e.minFractionDigits = s.length);
    }
    return e;
  },
  stringify: j
}, we = (n) => typeof n == "bigint" || Number.isInteger(n);
function je(n, e, t, { intAsBigInt: s }) {
  const i = n[0];
  if ((i === "-" || i === "+") && (e += 1), n = n.substring(e).replace(/_/g, ""), s) {
    switch (t) {
      case 2:
        n = `0b${n}`;
        break;
      case 8:
        n = `0o${n}`;
        break;
      case 16:
        n = `0x${n}`;
        break;
    }
    const o = BigInt(n);
    return i === "-" ? BigInt(-1) * o : o;
  }
  const r = parseInt(n, t);
  return i === "-" ? -1 * r : r;
}
function ct(n, e, t) {
  const { value: s } = n;
  if (we(s)) {
    const i = s.toString(e);
    return s < 0 ? "-" + t + i.substr(1) : t + i;
  }
  return j(n);
}
const Ks = {
  identify: we,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (n, e, t) => je(n, 2, 2, t),
  stringify: (n) => ct(n, 2, "0b")
}, Ps = {
  identify: we,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (n, e, t) => je(n, 1, 8, t),
  stringify: (n) => ct(n, 8, "0")
}, Ds = {
  identify: we,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (n, e, t) => je(n, 0, 10, t),
  stringify: j
}, js = {
  identify: we,
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (n, e, t) => je(n, 2, 16, t),
  stringify: (n) => ct(n, 16, "0x")
};
class ne extends M {
  constructor(e) {
    super(e), this.tag = ne.tag;
  }
  add(e) {
    let t;
    $(e) ? t = e : e && typeof e == "object" && "key" in e && "value" in e && e.value === null ? t = new B(e.key, null) : t = new B(e, null), Q(this.items, t.key) || this.items.push(t);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(e, t) {
    const s = Q(this.items, e);
    return !t && $(s) ? T(s.key) ? s.key.value : s.key : s;
  }
  set(e, t) {
    if (typeof t != "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof t}`);
    const s = Q(this.items, e);
    s && !t ? this.items.splice(this.items.indexOf(s), 1) : !s && t && this.items.push(new B(e));
  }
  toJSON(e, t) {
    return super.toJSON(e, t, Set);
  }
  toString(e, t, s) {
    if (!e)
      return JSON.stringify(this);
    if (this.hasAllNullValues(!0))
      return super.toString(Object.assign({}, e, { allNullValues: !0 }), t, s);
    throw new Error("Set items must all have null values");
  }
  static from(e, t, s) {
    const { replacer: i } = s, r = new this(e);
    if (t && Symbol.iterator in Object(t))
      for (let o of t)
        typeof i == "function" && (o = i.call(t, o, o)), r.items.push(nt(o, null, s));
    return r;
  }
}
ne.tag = "tag:yaml.org,2002:set";
const ft = {
  collection: "map",
  identify: (n) => n instanceof Set,
  nodeClass: ne,
  default: !1,
  tag: "tag:yaml.org,2002:set",
  createNode: (n, e, t) => ne.from(n, e, t),
  resolve(n, e) {
    if (ye(n)) {
      if (n.hasAllNullValues(!0))
        return Object.assign(new ne(), n);
      e("Set items must all have null values");
    } else
      e("Expected a mapping for this tag");
    return n;
  }
};
function ut(n, e) {
  const t = n[0], s = t === "-" || t === "+" ? n.substring(1) : n, i = (o) => e ? BigInt(o) : Number(o), r = s.replace(/_/g, "").split(":").reduce((o, l) => o * i(60) + i(l), i(0));
  return t === "-" ? i(-1) * r : r;
}
function Xt(n) {
  let { value: e } = n, t = (o) => o;
  if (typeof e == "bigint")
    t = (o) => BigInt(o);
  else if (isNaN(e) || !isFinite(e))
    return j(n);
  let s = "";
  e < 0 && (s = "-", e *= t(-1));
  const i = t(60), r = [e % i];
  return e < 60 ? r.unshift(0) : (e = (e - r[0]) / i, r.unshift(e % i), e >= 60 && (e = (e - r[0]) / i, r.unshift(e))), s + r.map((o) => String(o).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
const zt = {
  identify: (n) => typeof n == "bigint" || Number.isInteger(n),
  default: !0,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (n, e, { intAsBigInt: t }) => ut(n, t),
  stringify: Xt
}, Zt = {
  identify: (n) => typeof n == "number",
  default: !0,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (n) => ut(n, !1),
  stringify: Xt
}, qe = {
  identify: (n) => n instanceof Date,
  default: !0,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(n) {
    const e = n.match(qe.test);
    if (!e)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, t, s, i, r, o, l] = e.map(Number), a = e[7] ? Number((e[7] + "00").substr(1, 3)) : 0;
    let c = Date.UTC(t, s - 1, i, r || 0, o || 0, l || 0, a);
    const m = e[8];
    if (m && m !== "Z") {
      let f = ut(m, !1);
      Math.abs(f) < 30 && (f *= 60), c -= 6e4 * f;
    }
    return new Date(c);
  },
  stringify: ({ value: n }) => n.toISOString().replace(/(T00:00:00)?\.000Z$/, "")
}, yt = [
  ae,
  ce,
  Ke,
  Pe,
  Ht,
  Wt,
  Ks,
  Ps,
  Ds,
  js,
  vs,
  Bs,
  Ms,
  ot,
  U,
  at,
  lt,
  ft,
  zt,
  Zt,
  qe
], bt = /* @__PURE__ */ new Map([
  ["core", Ls],
  ["failsafe", [ae, ce, Ke]],
  ["json", _s],
  ["yaml11", yt],
  ["yaml-1.1", yt]
]), wt = {
  binary: ot,
  bool: it,
  float: Ft,
  floatExp: qt,
  floatNaN: jt,
  floatTime: Zt,
  int: Vt,
  intHex: Jt,
  intOct: Rt,
  intTime: zt,
  map: ae,
  merge: U,
  null: Pe,
  omap: at,
  pairs: lt,
  seq: ce,
  set: ft,
  timestamp: qe
}, qs = {
  "tag:yaml.org,2002:binary": ot,
  "tag:yaml.org,2002:merge": U,
  "tag:yaml.org,2002:omap": at,
  "tag:yaml.org,2002:pairs": lt,
  "tag:yaml.org,2002:set": ft,
  "tag:yaml.org,2002:timestamp": qe
};
function Re(n, e, t) {
  const s = bt.get(e);
  if (s && !n)
    return t && !s.includes(U) ? s.concat(U) : s.slice();
  let i = s;
  if (!i)
    if (Array.isArray(n))
      i = [];
    else {
      const r = Array.from(bt.keys()).filter((o) => o !== "yaml11").map((o) => JSON.stringify(o)).join(", ");
      throw new Error(`Unknown schema "${e}"; use one of ${r} or define customTags array`);
    }
  if (Array.isArray(n))
    for (const r of n)
      i = i.concat(r);
  else typeof n == "function" && (i = n(i.slice()));
  return t && (i = i.concat(U)), i.reduce((r, o) => {
    const l = typeof o == "string" ? wt[o] : o;
    if (!l) {
      const a = JSON.stringify(o), c = Object.keys(wt).map((m) => JSON.stringify(m)).join(", ");
      throw new Error(`Unknown custom tag ${a}; use one of ${c}`);
    }
    return r.includes(l) || r.push(l), r;
  }, []);
}
const Fs = (n, e) => n.key < e.key ? -1 : n.key > e.key ? 1 : 0;
class ht {
  constructor({ compat: e, customTags: t, merge: s, resolveKnownTags: i, schema: r, sortMapEntries: o, toStringDefaults: l }) {
    this.compat = Array.isArray(e) ? Re(e, "compat") : e ? Re(null, e) : null, this.name = typeof r == "string" && r || "core", this.knownTags = i ? qs : {}, this.tags = Re(t, this.name, s), this.toStringOptions = l ?? null, Object.defineProperty(this, V, { value: ae }), Object.defineProperty(this, q, { value: Ke }), Object.defineProperty(this, oe, { value: ce }), this.sortMapEntries = typeof o == "function" ? o : o === !0 ? Fs : null;
  }
  clone() {
    const e = Object.create(ht.prototype, Object.getOwnPropertyDescriptors(this));
    return e.tags = this.tags.slice(), e;
  }
}
function Us(n, e) {
  var a;
  const t = [];
  let s = e.directives === !0;
  if (e.directives !== !1 && n.directives) {
    const c = n.directives.toString(n);
    c ? (t.push(c), s = !0) : n.directives.docStart && (s = !0);
  }
  s && t.push("---");
  const i = Bt(n, e), { commentString: r } = i.options;
  if (n.commentBefore) {
    t.length !== 1 && t.unshift("");
    const c = r(n.commentBefore);
    t.unshift(F(c, ""));
  }
  let o = !1, l = null;
  if (n.contents) {
    if (L(n.contents)) {
      if (n.contents.spaceBefore && s && t.push(""), n.contents.commentBefore) {
        const f = r(n.contents.commentBefore);
        t.push(F(f, ""));
      }
      i.forceBlockIndent = !!n.comment, l = n.contents.comment;
    }
    const c = l ? void 0 : () => o = !0;
    let m = ie(n.contents, i, () => l = null, c);
    l && (m += G(m, "", r(l))), (m[0] === "|" || m[0] === ">") && t[t.length - 1] === "---" ? t[t.length - 1] = `--- ${m}` : t.push(m);
  } else
    t.push(ie(n.contents, i));
  if ((a = n.directives) != null && a.docEnd)
    if (n.comment) {
      const c = r(n.comment);
      c.includes(`
`) ? (t.push("..."), t.push(F(c, ""))) : t.push(`... ${c}`);
    } else
      t.push("...");
  else {
    let c = n.comment;
    c && o && (c = c.replace(/^\n+/, "")), c && ((!o || l) && t[t.length - 1] !== "" && t.push(""), t.push(F(r(c), "")));
  }
  return t.join(`
`) + `
`;
}
class Fe {
  constructor(e, t, s) {
    this.commentBefore = null, this.comment = null, this.errors = [], this.warnings = [], Object.defineProperty(this, P, { value: Qe });
    let i = null;
    typeof t == "function" || Array.isArray(t) ? i = t : s === void 0 && t && (s = t, t = void 0);
    const r = Object.assign({
      intAsBigInt: !1,
      keepSourceTokens: !1,
      logLevel: "warn",
      prettyErrors: !0,
      strict: !0,
      stringKeys: !1,
      uniqueKeys: !0,
      version: "1.2"
    }, s);
    this.options = r;
    let { version: o } = r;
    s != null && s._directives ? (this.directives = s._directives.atDocument(), this.directives.yaml.explicit && (o = this.directives.yaml.version)) : this.directives = new v({ version: o }), this.setSchema(o, s), this.contents = e === void 0 ? null : this.createNode(e, i, s);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const e = Object.create(Fe.prototype, {
      [P]: { value: Qe }
    });
    return e.commentBefore = this.commentBefore, e.comment = this.comment, e.errors = this.errors.slice(), e.warnings = this.warnings.slice(), e.options = Object.assign({}, this.options), this.directives && (e.directives = this.directives.clone()), e.schema = this.schema.clone(), e.contents = L(this.contents) ? this.contents.clone(e.schema) : this.contents, this.range && (e.range = this.range.slice()), e;
  }
  /** Adds a value to the document. */
  add(e) {
    z(this.contents) && this.contents.add(e);
  }
  /** Adds a value to the document. */
  addIn(e, t) {
    z(this.contents) && this.contents.addIn(e, t);
  }
  /**
   * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
   *
   * If `node` already has an anchor, `name` is ignored.
   * Otherwise, the `node.anchor` value will be set to `name`,
   * or if an anchor with that name is already present in the document,
   * `name` will be used as a prefix for a new unique anchor.
   * If `name` is undefined, the generated anchor will use 'a' as a prefix.
   */
  createAlias(e, t) {
    if (!e.anchor) {
      const s = Lt(this);
      e.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !t || s.has(t) ? $t(t || "a", s) : t;
    }
    return new tt(e.anchor);
  }
  createNode(e, t, s) {
    let i;
    if (typeof t == "function")
      e = t.call({ "": e }, "", e), i = t;
    else if (Array.isArray(t)) {
      const p = (k) => typeof k == "number" || k instanceof String || k instanceof Number, b = t.filter(p).map(String);
      b.length > 0 && (t = t.concat(b)), i = t;
    } else s === void 0 && t && (s = t, t = void 0);
    const { aliasDuplicateObjects: r, anchorPrefix: o, flow: l, keepUndefined: a, onTagObj: c, tag: m } = s ?? {}, { onAnchor: f, setAnchors: d, sourceObjects: h } = ms(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      o || "a"
    ), g = {
      aliasDuplicateObjects: r ?? !0,
      keepUndefined: a ?? !1,
      onAnchor: f,
      onTagObj: c,
      replacer: i,
      schema: this.schema,
      sourceObjects: h
    }, u = me(e, m, g);
    return l && E(u) && (u.flow = !0), d(), u;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(e, t, s = {}) {
    const i = this.createNode(e, null, s), r = this.createNode(t, null, s);
    return new B(i, r);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(e) {
    return z(this.contents) ? this.contents.delete(e) : !1;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(e) {
    return ue(e) ? this.contents == null ? !1 : (this.contents = null, !0) : z(this.contents) ? this.contents.deleteIn(e) : !1;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(e, t) {
    return E(this.contents) ? this.contents.get(e, t) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(e, t) {
    return ue(e) ? !t && T(this.contents) ? this.contents.value : this.contents : E(this.contents) ? this.contents.getIn(e, t) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(e) {
    return E(this.contents) ? this.contents.has(e) : !1;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(e) {
    return ue(e) ? this.contents !== void 0 : E(this.contents) ? this.contents.hasIn(e) : !1;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(e, t) {
    this.contents == null ? this.contents = $e(this.schema, [e], t) : z(this.contents) && this.contents.set(e, t);
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(e, t) {
    ue(e) ? this.contents = t : this.contents == null ? this.contents = $e(this.schema, Array.from(e), t) : z(this.contents) && this.contents.setIn(e, t);
  }
  /**
   * Change the YAML version and schema used by the document.
   * A `null` version disables support for directives, explicit tags, anchors, and aliases.
   * It also requires the `schema` option to be given as a `Schema` instance value.
   *
   * Overrides all previously set schema options.
   */
  setSchema(e, t = {}) {
    typeof e == "number" && (e = String(e));
    let s;
    switch (e) {
      case "1.1":
        this.directives ? this.directives.yaml.version = "1.1" : this.directives = new v({ version: "1.1" }), s = { resolveKnownTags: !1, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        this.directives ? this.directives.yaml.version = e : this.directives = new v({ version: e }), s = { resolveKnownTags: !0, schema: "core" };
        break;
      case null:
        this.directives && delete this.directives, s = null;
        break;
      default: {
        const i = JSON.stringify(e);
        throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${i}`);
      }
    }
    if (t.schema instanceof Object)
      this.schema = t.schema;
    else if (s)
      this.schema = new ht(Object.assign(s, t));
    else
      throw new Error("With a null YAML version, the { schema: Schema } option is required");
  }
  // json & jsonArg are only used from toJSON()
  toJS({ json: e, jsonArg: t, mapAsMap: s, maxAliasCount: i, onAnchor: r, reviver: o } = {}) {
    const l = {
      anchors: /* @__PURE__ */ new Map(),
      doc: this,
      keep: !e,
      mapAsMap: s === !0,
      mapKeyWarned: !1,
      maxAliasCount: typeof i == "number" ? i : 100
    }, a = K(this.contents, t ?? "", l);
    if (typeof r == "function")
      for (const { count: c, res: m } of l.anchors.values())
        r(m, c);
    return typeof o == "function" ? ee(o, { "": a }, "", a) : a;
  }
  /**
   * A JSON representation of the document `contents`.
   *
   * @param jsonArg Used by `JSON.stringify` to indicate the array index or
   *   property name.
   */
  toJSON(e, t) {
    return this.toJS({ json: !0, jsonArg: e, mapAsMap: !1, onAnchor: t });
  }
  /** A YAML representation of the document. */
  toString(e = {}) {
    if (this.errors.length > 0)
      throw new Error("Document with errors cannot be stringified");
    if ("indent" in e && (!Number.isInteger(e.indent) || Number(e.indent) <= 0)) {
      const t = JSON.stringify(e.indent);
      throw new Error(`"indent" option must be a positive integer, not ${t}`);
    }
    return Us(this, e);
  }
}
function z(n) {
  if (E(n))
    return !0;
  throw new Error("Expected a YAML collection as document contents");
}
class xt extends Error {
  constructor(e, t, s, i) {
    super(), this.name = e, this.code = s, this.message = i, this.pos = t;
  }
}
class he extends xt {
  constructor(e, t, s) {
    super("YAMLParseError", e, t, s);
  }
}
class Rs extends xt {
  constructor(e, t, s) {
    super("YAMLWarning", e, t, s);
  }
}
const kt = (n, e) => (t) => {
  if (t.pos[0] === -1)
    return;
  t.linePos = t.pos.map((l) => e.linePos(l));
  const { line: s, col: i } = t.linePos[0];
  t.message += ` at line ${s}, column ${i}`;
  let r = i - 1, o = n.substring(e.lineStarts[s - 1], e.lineStarts[s]).replace(/[\n\r]+$/, "");
  if (r >= 60 && o.length > 80) {
    const l = Math.min(r - 39, o.length - 79);
    o = "…" + o.substring(l), r -= l - 1;
  }
  if (o.length > 80 && (o = o.substring(0, 79) + "…"), s > 1 && /^ *$/.test(o.substring(0, r))) {
    let l = n.substring(e.lineStarts[s - 2], e.lineStarts[s - 1]);
    l.length > 80 && (l = l.substring(0, 79) + `…
`), o = l + o;
  }
  if (/[^ ]/.test(o)) {
    let l = 1;
    const a = t.linePos[1];
    a && a.line === s && a.col > i && (l = Math.max(1, Math.min(a.col - i, 80 - r)));
    const c = " ".repeat(r) + "^".repeat(l);
    t.message += `:

${o}
${c}
`;
  }
};
function re(n, { flow: e, indicator: t, next: s, offset: i, onError: r, parentIndent: o, startOnNewline: l }) {
  let a = !1, c = l, m = l, f = "", d = "", h = !1, g = !1, u = null, p = null, b = null, k = null, N = null, w = null, S = null;
  for (const y of n)
    switch (g && (y.type !== "space" && y.type !== "newline" && y.type !== "comma" && r(y.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), g = !1), u && (c && y.type !== "comment" && y.type !== "newline" && r(u, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), u = null), y.type) {
      case "space":
        !e && (t !== "doc-start" || (s == null ? void 0 : s.type) !== "flow-collection") && y.source.includes("	") && (u = y), m = !0;
        break;
      case "comment": {
        m || r(y, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const C = y.source.substring(1) || " ";
        f ? f += d + C : f = C, d = "", c = !1;
        break;
      }
      case "newline":
        c ? f ? f += y.source : (!w || t !== "seq-item-ind") && (a = !0) : d += y.source, c = !0, h = !0, (p || b) && (k = y), m = !0;
        break;
      case "anchor":
        p && r(y, "MULTIPLE_ANCHORS", "A node can have at most one anchor"), y.source.endsWith(":") && r(y.offset + y.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", !0), p = y, S === null && (S = y.offset), c = !1, m = !1, g = !0;
        break;
      case "tag": {
        b && r(y, "MULTIPLE_TAGS", "A node can have at most one tag"), b = y, S === null && (S = y.offset), c = !1, m = !1, g = !0;
        break;
      }
      case t:
        (p || b) && r(y, "BAD_PROP_ORDER", `Anchors and tags must be after the ${y.source} indicator`), w && r(y, "UNEXPECTED_TOKEN", `Unexpected ${y.source} in ${e ?? "collection"}`), w = y, c = t === "seq-item-ind" || t === "explicit-key-ind", m = !1;
        break;
      case "comma":
        if (e) {
          N && r(y, "UNEXPECTED_TOKEN", `Unexpected , in ${e}`), N = y, c = !1, m = !1;
          break;
        }
      // else fallthrough
      default:
        r(y, "UNEXPECTED_TOKEN", `Unexpected ${y.type} token`), c = !1, m = !1;
    }
  const O = n[n.length - 1], I = O ? O.offset + O.source.length : i;
  return g && s && s.type !== "space" && s.type !== "newline" && s.type !== "comma" && (s.type !== "scalar" || s.source !== "") && r(s.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space"), u && (c && u.indent <= o || (s == null ? void 0 : s.type) === "block-map" || (s == null ? void 0 : s.type) === "block-seq") && r(u, "TAB_AS_INDENT", "Tabs are not allowed as indentation"), {
    comma: N,
    found: w,
    spaceBefore: a,
    comment: f,
    hasNewline: h,
    anchor: p,
    tag: b,
    newlineAfterProp: k,
    end: I,
    start: S ?? I
  };
}
function ge(n) {
  if (!n)
    return null;
  switch (n.type) {
    case "alias":
    case "scalar":
    case "double-quoted-scalar":
    case "single-quoted-scalar":
      if (n.source.includes(`
`))
        return !0;
      if (n.end) {
        for (const e of n.end)
          if (e.type === "newline")
            return !0;
      }
      return !1;
    case "flow-collection":
      for (const e of n.items) {
        for (const t of e.start)
          if (t.type === "newline")
            return !0;
        if (e.sep) {
          for (const t of e.sep)
            if (t.type === "newline")
              return !0;
        }
        if (ge(e.key) || ge(e.value))
          return !0;
      }
      return !1;
    default:
      return !0;
  }
}
function ze(n, e, t) {
  if ((e == null ? void 0 : e.type) === "flow-collection") {
    const s = e.end[0];
    s.indent === n && (s.source === "]" || s.source === "}") && ge(e) && t(s, "BAD_INDENT", "Flow end indicator should be more indented than parent", !0);
  }
}
function es(n, e, t) {
  const { uniqueKeys: s } = n.options;
  if (s === !1)
    return !1;
  const i = typeof s == "function" ? s : (r, o) => r === o || T(r) && T(o) && r.value === o.value;
  return e.some((r) => i(r.key, t));
}
const St = "All mapping items must start at the same column";
function Vs({ composeNode: n, composeEmptyNode: e }, t, s, i, r) {
  var m;
  const o = (r == null ? void 0 : r.nodeClass) ?? M, l = new o(t.schema);
  t.atRoot && (t.atRoot = !1);
  let a = s.offset, c = null;
  for (const f of s.items) {
    const { start: d, key: h, sep: g, value: u } = f, p = re(d, {
      indicator: "explicit-key-ind",
      next: h ?? (g == null ? void 0 : g[0]),
      offset: a,
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !0
    }), b = !p.found;
    if (b) {
      if (h && (h.type === "block-seq" ? i(a, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key") : "indent" in h && h.indent !== s.indent && i(a, "BAD_INDENT", St)), !p.anchor && !p.tag && !g) {
        c = p.end, p.comment && (l.comment ? l.comment += `
` + p.comment : l.comment = p.comment);
        continue;
      }
      (p.newlineAfterProp || ge(h)) && i(h ?? d[d.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
    } else ((m = p.found) == null ? void 0 : m.indent) !== s.indent && i(a, "BAD_INDENT", St);
    t.atKey = !0;
    const k = p.end, N = h ? n(t, h, p, i) : e(t, k, d, null, p, i);
    t.schema.compat && ze(s.indent, h, i), t.atKey = !1, es(t, l.items, N) && i(k, "DUPLICATE_KEY", "Map keys must be unique");
    const w = re(g ?? [], {
      indicator: "map-value-ind",
      next: u,
      offset: N.range[2],
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !h || h.type === "block-scalar"
    });
    if (a = w.end, w.found) {
      b && ((u == null ? void 0 : u.type) === "block-map" && !w.hasNewline && i(a, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings"), t.options.strict && p.start < w.found.offset - 1024 && i(N.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key"));
      const S = u ? n(t, u, w, i) : e(t, a, g, null, w, i);
      t.schema.compat && ze(s.indent, u, i), a = S.range[2];
      const O = new B(N, S);
      t.options.keepSourceTokens && (O.srcToken = f), l.items.push(O);
    } else {
      b && i(N.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values"), w.comment && (N.comment ? N.comment += `
` + w.comment : N.comment = w.comment);
      const S = new B(N);
      t.options.keepSourceTokens && (S.srcToken = f), l.items.push(S);
    }
  }
  return c && c < a && i(c, "IMPOSSIBLE", "Map comment with trailing content"), l.range = [s.offset, a, c ?? a], l;
}
function Js({ composeNode: n, composeEmptyNode: e }, t, s, i, r) {
  const o = (r == null ? void 0 : r.nodeClass) ?? W, l = new o(t.schema);
  t.atRoot && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let a = s.offset, c = null;
  for (const { start: m, value: f } of s.items) {
    const d = re(m, {
      indicator: "seq-item-ind",
      next: f,
      offset: a,
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !0
    });
    if (!d.found)
      if (d.anchor || d.tag || f)
        f && f.type === "block-seq" ? i(d.end, "BAD_INDENT", "All sequence items must start at the same column") : i(a, "MISSING_CHAR", "Sequence item without - indicator");
      else {
        c = d.end, d.comment && (l.comment = d.comment);
        continue;
      }
    const h = f ? n(t, f, d, i) : e(t, d.end, m, null, d, i);
    t.schema.compat && ze(s.indent, f, i), a = h.range[2], l.items.push(h);
  }
  return l.range = [s.offset, a, c ?? a], l;
}
function ke(n, e, t, s) {
  let i = "";
  if (n) {
    let r = !1, o = "";
    for (const l of n) {
      const { source: a, type: c } = l;
      switch (c) {
        case "space":
          r = !0;
          break;
        case "comment": {
          t && !r && s(l, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const m = a.substring(1) || " ";
          i ? i += o + m : i = m, o = "";
          break;
        }
        case "newline":
          i && (o += a), r = !0;
          break;
        default:
          s(l, "UNEXPECTED_TOKEN", `Unexpected ${c} at node end`);
      }
      e += a.length;
    }
  }
  return { comment: i, offset: e };
}
const Ve = "Block collections are not allowed within flow collections", Je = (n) => n && (n.type === "block-map" || n.type === "block-seq");
function Ys({ composeNode: n, composeEmptyNode: e }, t, s, i, r) {
  const o = s.start.source === "{", l = o ? "flow map" : "flow sequence", a = (r == null ? void 0 : r.nodeClass) ?? (o ? M : W), c = new a(t.schema);
  c.flow = !0;
  const m = t.atRoot;
  m && (t.atRoot = !1), t.atKey && (t.atKey = !1);
  let f = s.offset + s.start.source.length;
  for (let p = 0; p < s.items.length; ++p) {
    const b = s.items[p], { start: k, key: N, sep: w, value: S } = b, O = re(k, {
      flow: l,
      indicator: "explicit-key-ind",
      next: N ?? (w == null ? void 0 : w[0]),
      offset: f,
      onError: i,
      parentIndent: s.indent,
      startOnNewline: !1
    });
    if (!O.found) {
      if (!O.anchor && !O.tag && !w && !S) {
        p === 0 && O.comma ? i(O.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${l}`) : p < s.items.length - 1 && i(O.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${l}`), O.comment && (c.comment ? c.comment += `
` + O.comment : c.comment = O.comment), f = O.end;
        continue;
      }
      !o && t.options.strict && ge(N) && i(
        N,
        // checked by containsNewline()
        "MULTILINE_IMPLICIT_KEY",
        "Implicit keys of flow sequence pairs need to be on a single line"
      );
    }
    if (p === 0)
      O.comma && i(O.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${l}`);
    else if (O.comma || i(O.start, "MISSING_CHAR", `Missing , between ${l} items`), O.comment) {
      let I = "";
      e: for (const y of k)
        switch (y.type) {
          case "comma":
          case "space":
            break;
          case "comment":
            I = y.source.substring(1);
            break e;
          default:
            break e;
        }
      if (I) {
        let y = c.items[c.items.length - 1];
        $(y) && (y = y.value ?? y.key), y.comment ? y.comment += `
` + I : y.comment = I, O.comment = O.comment.substring(I.length + 1);
      }
    }
    if (!o && !w && !O.found) {
      const I = S ? n(t, S, O, i) : e(t, O.end, w, null, O, i);
      c.items.push(I), f = I.range[2], Je(S) && i(I.range, "BLOCK_IN_FLOW", Ve);
    } else {
      t.atKey = !0;
      const I = O.end, y = N ? n(t, N, O, i) : e(t, I, k, null, O, i);
      Je(N) && i(y.range, "BLOCK_IN_FLOW", Ve), t.atKey = !1;
      const C = re(w ?? [], {
        flow: l,
        indicator: "map-value-ind",
        next: S,
        offset: y.range[2],
        onError: i,
        parentIndent: s.indent,
        startOnNewline: !1
      });
      if (C.found) {
        if (!o && !O.found && t.options.strict) {
          if (w)
            for (const _ of w) {
              if (_ === C.found)
                break;
              if (_.type === "newline") {
                i(_, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          O.start < C.found.offset - 1024 && i(C.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else S && ("source" in S && S.source && S.source[0] === ":" ? i(S, "MISSING_CHAR", `Missing space after : in ${l}`) : i(C.start, "MISSING_CHAR", `Missing , or : between ${l} items`));
      const R = S ? n(t, S, C, i) : C.found ? e(t, C.end, w, null, C, i) : null;
      R ? Je(S) && i(R.range, "BLOCK_IN_FLOW", Ve) : C.comment && (y.comment ? y.comment += `
` + C.comment : y.comment = C.comment);
      const X = new B(y, R);
      if (t.options.keepSourceTokens && (X.srcToken = b), o) {
        const _ = c;
        es(t, _.items, y) && i(I, "DUPLICATE_KEY", "Map keys must be unique"), _.items.push(X);
      } else {
        const _ = new M(t.schema);
        _.flow = !0, _.items.push(X);
        const pt = (R ?? y).range;
        _.range = [y.range[0], pt[1], pt[2]], c.items.push(_);
      }
      f = R ? R.range[2] : C.end;
    }
  }
  const d = o ? "}" : "]", [h, ...g] = s.end;
  let u = f;
  if (h && h.source === d)
    u = h.offset + h.source.length;
  else {
    const p = l[0].toUpperCase() + l.substring(1), b = m ? `${p} must end with a ${d}` : `${p} in block collection must be sufficiently indented and end with a ${d}`;
    i(f, m ? "MISSING_CHAR" : "BAD_INDENT", b), h && h.source.length !== 1 && g.unshift(h);
  }
  if (g.length > 0) {
    const p = ke(g, u, t.options.strict, i);
    p.comment && (c.comment ? c.comment += `
` + p.comment : c.comment = p.comment), c.range = [s.offset, u, p.offset];
  } else
    c.range = [s.offset, u, u];
  return c;
}
function Ye(n, e, t, s, i, r) {
  const o = t.type === "block-map" ? Vs(n, e, t, s, r) : t.type === "block-seq" ? Js(n, e, t, s, r) : Ys(n, e, t, s, r), l = o.constructor;
  return i === "!" || i === l.tagName ? (o.tag = l.tagName, o) : (i && (o.tag = i), o);
}
function Gs(n, e, t, s, i) {
  var d;
  const r = s.tag, o = r ? e.directives.tagName(r.source, (h) => i(r, "TAG_RESOLVE_FAILED", h)) : null;
  if (t.type === "block-seq") {
    const { anchor: h, newlineAfterProp: g } = s, u = h && r ? h.offset > r.offset ? h : r : h ?? r;
    u && (!g || g.offset < u.offset) && i(u, "MISSING_CHAR", "Missing newline after block sequence props");
  }
  const l = t.type === "block-map" ? "map" : t.type === "block-seq" ? "seq" : t.start.source === "{" ? "map" : "seq";
  if (!r || !o || o === "!" || o === M.tagName && l === "map" || o === W.tagName && l === "seq")
    return Ye(n, e, t, i, o);
  let a = e.schema.tags.find((h) => h.tag === o && h.collection === l);
  if (!a) {
    const h = e.schema.knownTags[o];
    if (h && h.collection === l)
      e.schema.tags.push(Object.assign({}, h, { default: !1 })), a = h;
    else
      return h != null && h.collection ? i(r, "BAD_COLLECTION_TYPE", `${h.tag} used for ${l} collection, but expects ${h.collection}`, !0) : i(r, "TAG_RESOLVE_FAILED", `Unresolved tag: ${o}`, !0), Ye(n, e, t, i, o);
  }
  const c = Ye(n, e, t, i, o, a), m = ((d = a.resolve) == null ? void 0 : d.call(a, c, (h) => i(r, "TAG_RESOLVE_FAILED", h), e.options)) ?? c, f = L(m) ? m : new A(m);
  return f.range = c.range, f.tag = o, a != null && a.format && (f.format = a.format), f;
}
function Qs(n, e, t) {
  const s = e.offset, i = Hs(e, n.options.strict, t);
  if (!i)
    return { value: "", type: null, comment: "", range: [s, s, s] };
  const r = i.mode === ">" ? A.BLOCK_FOLDED : A.BLOCK_LITERAL, o = e.source ? Ws(e.source) : [];
  let l = o.length;
  for (let u = o.length - 1; u >= 0; --u) {
    const p = o[u][1];
    if (p === "" || p === "\r")
      l = u;
    else
      break;
  }
  if (l === 0) {
    const u = i.chomp === "+" && o.length > 0 ? `
`.repeat(Math.max(1, o.length - 1)) : "";
    let p = s + i.length;
    return e.source && (p += e.source.length), { value: u, type: r, comment: i.comment, range: [s, p, p] };
  }
  let a = e.indent + i.indent, c = e.offset + i.length, m = 0;
  for (let u = 0; u < l; ++u) {
    const [p, b] = o[u];
    if (b === "" || b === "\r")
      i.indent === 0 && p.length > a && (a = p.length);
    else {
      p.length < a && t(c + p.length, "MISSING_CHAR", "Block scalars with more-indented leading empty lines must use an explicit indentation indicator"), i.indent === 0 && (a = p.length), m = u, a === 0 && !n.atRoot && t(c, "BAD_INDENT", "Block scalar values in collections must be indented");
      break;
    }
    c += p.length + b.length + 1;
  }
  for (let u = o.length - 1; u >= l; --u)
    o[u][0].length > a && (l = u + 1);
  let f = "", d = "", h = !1;
  for (let u = 0; u < m; ++u)
    f += o[u][0].slice(a) + `
`;
  for (let u = m; u < l; ++u) {
    let [p, b] = o[u];
    c += p.length + b.length + 1;
    const k = b[b.length - 1] === "\r";
    if (k && (b = b.slice(0, -1)), b && p.length < a) {
      const w = `Block scalar lines must not be less indented than their ${i.indent ? "explicit indentation indicator" : "first line"}`;
      t(c - b.length - (k ? 2 : 1), "BAD_INDENT", w), p = "";
    }
    r === A.BLOCK_LITERAL ? (f += d + p.slice(a) + b, d = `
`) : p.length > a || b[0] === "	" ? (d === " " ? d = `
` : !h && d === `
` && (d = `

`), f += d + p.slice(a) + b, d = `
`, h = !0) : b === "" ? d === `
` ? f += `
` : d = `
` : (f += d + b, d = " ", h = !1);
  }
  switch (i.chomp) {
    case "-":
      break;
    case "+":
      for (let u = l; u < o.length; ++u)
        f += `
` + o[u][0].slice(a);
      f[f.length - 1] !== `
` && (f += `
`);
      break;
    default:
      f += `
`;
  }
  const g = s + i.length + e.source.length;
  return { value: f, type: r, comment: i.comment, range: [s, g, g] };
}
function Hs({ offset: n, props: e }, t, s) {
  if (e[0].type !== "block-scalar-header")
    return s(e[0], "IMPOSSIBLE", "Block scalar header not found"), null;
  const { source: i } = e[0], r = i[0];
  let o = 0, l = "", a = -1;
  for (let d = 1; d < i.length; ++d) {
    const h = i[d];
    if (!l && (h === "-" || h === "+"))
      l = h;
    else {
      const g = Number(h);
      !o && g ? o = g : a === -1 && (a = n + d);
    }
  }
  a !== -1 && s(a, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${i}`);
  let c = !1, m = "", f = i.length;
  for (let d = 1; d < e.length; ++d) {
    const h = e[d];
    switch (h.type) {
      case "space":
        c = !0;
      // fallthrough
      case "newline":
        f += h.source.length;
        break;
      case "comment":
        t && !c && s(h, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters"), f += h.source.length, m = h.source.substring(1);
        break;
      case "error":
        s(h, "UNEXPECTED_TOKEN", h.message), f += h.source.length;
        break;
      /* istanbul ignore next should not happen */
      default: {
        const g = `Unexpected token in block scalar header: ${h.type}`;
        s(h, "UNEXPECTED_TOKEN", g);
        const u = h.source;
        u && typeof u == "string" && (f += u.length);
      }
    }
  }
  return { mode: r, indent: o, chomp: l, comment: m, length: f };
}
function Ws(n) {
  const e = n.split(/\n( *)/), t = e[0], s = t.match(/^( *)/), r = [s != null && s[1] ? [s[1], t.slice(s[1].length)] : ["", t]];
  for (let o = 1; o < e.length; o += 2)
    r.push([e[o], e[o + 1]]);
  return r;
}
function Xs(n, e, t) {
  const { offset: s, type: i, source: r, end: o } = n;
  let l, a;
  const c = (d, h, g) => t(s + d, h, g);
  switch (i) {
    case "scalar":
      l = A.PLAIN, a = zs(r, c);
      break;
    case "single-quoted-scalar":
      l = A.QUOTE_SINGLE, a = Zs(r, c);
      break;
    case "double-quoted-scalar":
      l = A.QUOTE_DOUBLE, a = xs(r, c);
      break;
    /* istanbul ignore next should not happen */
    default:
      return t(n, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${i}`), {
        value: "",
        type: null,
        comment: "",
        range: [s, s + r.length, s + r.length]
      };
  }
  const m = s + r.length, f = ke(o, m, e, t);
  return {
    value: a,
    type: l,
    comment: f.comment,
    range: [s, m, f.offset]
  };
}
function zs(n, e) {
  let t = "";
  switch (n[0]) {
    /* istanbul ignore next should not happen */
    case "	":
      t = "a tab character";
      break;
    case ",":
      t = "flow indicator character ,";
      break;
    case "%":
      t = "directive indicator character %";
      break;
    case "|":
    case ">": {
      t = `block scalar indicator ${n[0]}`;
      break;
    }
    case "@":
    case "`": {
      t = `reserved character ${n[0]}`;
      break;
    }
  }
  return t && e(0, "BAD_SCALAR_START", `Plain value cannot start with ${t}`), ts(n);
}
function Zs(n, e) {
  return (n[n.length - 1] !== "'" || n.length === 1) && e(n.length, "MISSING_CHAR", "Missing closing 'quote"), ts(n.slice(1, -1)).replace(/''/g, "'");
}
function ts(n) {
  let e, t;
  try {
    e = new RegExp(`(.*?)(?<![ 	])[ 	]*\r?
`, "sy"), t = new RegExp(`[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?
`, "sy");
  } catch {
    e = /(.*?)[ \t]*\r?\n/sy, t = /[ \t]*(.*?)[ \t]*\r?\n/sy;
  }
  let s = e.exec(n);
  if (!s)
    return n;
  let i = s[1], r = " ", o = e.lastIndex;
  for (t.lastIndex = o; s = t.exec(n); )
    s[1] === "" ? r === `
` ? i += r : r = `
` : (i += r + s[1], r = " "), o = t.lastIndex;
  const l = /[ \t]*(.*)/sy;
  return l.lastIndex = o, s = l.exec(n), i + r + ((s == null ? void 0 : s[1]) ?? "");
}
function xs(n, e) {
  let t = "";
  for (let s = 1; s < n.length - 1; ++s) {
    const i = n[s];
    if (!(i === "\r" && n[s + 1] === `
`))
      if (i === `
`) {
        const { fold: r, offset: o } = en(n, s);
        t += r, s = o;
      } else if (i === "\\") {
        let r = n[++s];
        const o = tn[r];
        if (o)
          t += o;
        else if (r === `
`)
          for (r = n[s + 1]; r === " " || r === "	"; )
            r = n[++s + 1];
        else if (r === "\r" && n[s + 1] === `
`)
          for (r = n[++s + 1]; r === " " || r === "	"; )
            r = n[++s + 1];
        else if (r === "x" || r === "u" || r === "U") {
          const l = { x: 2, u: 4, U: 8 }[r];
          t += sn(n, s + 1, l, e), s += l;
        } else {
          const l = n.substr(s - 1, 2);
          e(s - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${l}`), t += l;
        }
      } else if (i === " " || i === "	") {
        const r = s;
        let o = n[s + 1];
        for (; o === " " || o === "	"; )
          o = n[++s + 1];
        o !== `
` && !(o === "\r" && n[s + 2] === `
`) && (t += s > r ? n.slice(r, s + 1) : i);
      } else
        t += i;
  }
  return (n[n.length - 1] !== '"' || n.length === 1) && e(n.length, "MISSING_CHAR", 'Missing closing "quote'), t;
}
function en(n, e) {
  let t = "", s = n[e + 1];
  for (; (s === " " || s === "	" || s === `
` || s === "\r") && !(s === "\r" && n[e + 2] !== `
`); )
    s === `
` && (t += `
`), e += 1, s = n[e + 1];
  return t || (t = " "), { fold: t, offset: e };
}
const tn = {
  0: "\0",
  // null character
  a: "\x07",
  // bell character
  b: "\b",
  // backspace
  e: "\x1B",
  // escape character
  f: "\f",
  // form feed
  n: `
`,
  // line feed
  r: "\r",
  // carriage return
  t: "	",
  // horizontal tab
  v: "\v",
  // vertical tab
  N: "",
  // Unicode next line
  _: " ",
  // Unicode non-breaking space
  L: "\u2028",
  // Unicode line separator
  P: "\u2029",
  // Unicode paragraph separator
  " ": " ",
  '"': '"',
  "/": "/",
  "\\": "\\",
  "	": "	"
};
function sn(n, e, t, s) {
  const i = n.substr(e, t), o = i.length === t && /^[0-9a-fA-F]+$/.test(i) ? parseInt(i, 16) : NaN;
  if (isNaN(o)) {
    const l = n.substr(e - 2, t + 2);
    return s(e - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${l}`), l;
  }
  return String.fromCodePoint(o);
}
function ss(n, e, t, s) {
  const { value: i, type: r, comment: o, range: l } = e.type === "block-scalar" ? Qs(n, e, s) : Xs(e, n.options.strict, s), a = t ? n.directives.tagName(t.source, (f) => s(t, "TAG_RESOLVE_FAILED", f)) : null;
  let c;
  n.options.stringKeys && n.atKey ? c = n.schema[q] : a ? c = nn(n.schema, i, a, t, s) : e.type === "scalar" ? c = rn(n, i, e, s) : c = n.schema[q];
  let m;
  try {
    const f = c.resolve(i, (d) => s(t ?? e, "TAG_RESOLVE_FAILED", d), n.options);
    m = T(f) ? f : new A(f);
  } catch (f) {
    const d = f instanceof Error ? f.message : String(f);
    s(t ?? e, "TAG_RESOLVE_FAILED", d), m = new A(i);
  }
  return m.range = l, m.source = i, r && (m.type = r), a && (m.tag = a), c.format && (m.format = c.format), o && (m.comment = o), m;
}
function nn(n, e, t, s, i) {
  var l;
  if (t === "!")
    return n[q];
  const r = [];
  for (const a of n.tags)
    if (!a.collection && a.tag === t)
      if (a.default && a.test)
        r.push(a);
      else
        return a;
  for (const a of r)
    if ((l = a.test) != null && l.test(e))
      return a;
  const o = n.knownTags[t];
  return o && !o.collection ? (n.tags.push(Object.assign({}, o, { default: !1, test: void 0 })), o) : (i(s, "TAG_RESOLVE_FAILED", `Unresolved tag: ${t}`, t !== "tag:yaml.org,2002:str"), n[q]);
}
function rn({ atKey: n, directives: e, schema: t }, s, i, r) {
  const o = t.tags.find((l) => {
    var a;
    return (l.default === !0 || n && l.default === "key") && ((a = l.test) == null ? void 0 : a.test(s));
  }) || t[q];
  if (t.compat) {
    const l = t.compat.find((a) => {
      var c;
      return a.default && ((c = a.test) == null ? void 0 : c.test(s));
    }) ?? t[q];
    if (o.tag !== l.tag) {
      const a = e.tagString(o.tag), c = e.tagString(l.tag), m = `Value may be parsed as either ${a} or ${c}`;
      r(i, "TAG_RESOLVE_FAILED", m, !0);
    }
  }
  return o;
}
function on(n, e, t) {
  if (e) {
    t === null && (t = e.length);
    for (let s = t - 1; s >= 0; --s) {
      let i = e[s];
      switch (i.type) {
        case "space":
        case "comment":
        case "newline":
          n -= i.source.length;
          continue;
      }
      for (i = e[++s]; (i == null ? void 0 : i.type) === "space"; )
        n += i.source.length, i = e[++s];
      break;
    }
  }
  return n;
}
const ln = { composeNode: ns, composeEmptyNode: dt };
function ns(n, e, t, s) {
  const i = n.atKey, { spaceBefore: r, comment: o, anchor: l, tag: a } = t;
  let c, m = !0;
  switch (e.type) {
    case "alias":
      c = an(n, e, s), (l || a) && s(e, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      c = ss(n, e, a, s), l && (c.anchor = l.source.substring(1));
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      c = Gs(ln, n, e, t, s), l && (c.anchor = l.source.substring(1));
      break;
    default: {
      const f = e.type === "error" ? e.message : `Unsupported token (type: ${e.type})`;
      s(e, "UNEXPECTED_TOKEN", f), c = dt(n, e.offset, void 0, null, t, s), m = !1;
    }
  }
  return l && c.anchor === "" && s(l, "BAD_ALIAS", "Anchor cannot be an empty string"), i && n.options.stringKeys && (!T(c) || typeof c.value != "string" || c.tag && c.tag !== "tag:yaml.org,2002:str") && s(a ?? e, "NON_STRING_KEY", "With stringKeys, all keys must be strings"), r && (c.spaceBefore = !0), o && (e.type === "scalar" && e.source === "" ? c.comment = o : c.commentBefore = o), n.options.keepSourceTokens && m && (c.srcToken = e), c;
}
function dt(n, e, t, s, { spaceBefore: i, comment: r, anchor: o, tag: l, end: a }, c) {
  const m = {
    type: "scalar",
    offset: on(e, t, s),
    indent: -1,
    source: ""
  }, f = ss(n, m, l, c);
  return o && (f.anchor = o.source.substring(1), f.anchor === "" && c(o, "BAD_ALIAS", "Anchor cannot be an empty string")), i && (f.spaceBefore = !0), r && (f.comment = r, f.range[2] = a), f;
}
function an({ options: n }, { offset: e, source: t, end: s }, i) {
  const r = new tt(t.substring(1));
  r.source === "" && i(e, "BAD_ALIAS", "Alias cannot be an empty string"), r.source.endsWith(":") && i(e + t.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", !0);
  const o = e + t.length, l = ke(s, o, n.strict, i);
  return r.range = [e, o, l.offset], l.comment && (r.comment = l.comment), r;
}
function cn(n, e, { offset: t, start: s, value: i, end: r }, o) {
  const l = Object.assign({ _directives: e }, n), a = new Fe(void 0, l), c = {
    atKey: !1,
    atRoot: !0,
    directives: a.directives,
    options: a.options,
    schema: a.schema
  }, m = re(s, {
    indicator: "doc-start",
    next: i ?? (r == null ? void 0 : r[0]),
    offset: t,
    onError: o,
    parentIndent: 0,
    startOnNewline: !0
  });
  m.found && (a.directives.docStart = !0, i && (i.type === "block-map" || i.type === "block-seq") && !m.hasNewline && o(m.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker")), a.contents = i ? ns(c, i, m, o) : dt(c, m.end, s, null, m, o);
  const f = a.contents.range[2], d = ke(r, f, !1, o);
  return d.comment && (a.comment = d.comment), a.range = [t, f, d.offset], a;
}
function fe(n) {
  if (typeof n == "number")
    return [n, n + 1];
  if (Array.isArray(n))
    return n.length === 2 ? n : [n[0], n[1]];
  const { offset: e, source: t } = n;
  return [e, e + (typeof t == "string" ? t.length : 1)];
}
function Nt(n) {
  var i;
  let e = "", t = !1, s = !1;
  for (let r = 0; r < n.length; ++r) {
    const o = n[r];
    switch (o[0]) {
      case "#":
        e += (e === "" ? "" : s ? `

` : `
`) + (o.substring(1) || " "), t = !0, s = !1;
        break;
      case "%":
        ((i = n[r + 1]) == null ? void 0 : i[0]) !== "#" && (r += 1), t = !1;
        break;
      default:
        t || (s = !0), t = !1;
    }
  }
  return { comment: e, afterEmptyLine: s };
}
class fn {
  constructor(e = {}) {
    this.doc = null, this.atDirectives = !1, this.prelude = [], this.errors = [], this.warnings = [], this.onError = (t, s, i, r) => {
      const o = fe(t);
      r ? this.warnings.push(new Rs(o, s, i)) : this.errors.push(new he(o, s, i));
    }, this.directives = new v({ version: e.version || "1.2" }), this.options = e;
  }
  decorate(e, t) {
    const { comment: s, afterEmptyLine: i } = Nt(this.prelude);
    if (s) {
      const r = e.contents;
      if (t)
        e.comment = e.comment ? `${e.comment}
${s}` : s;
      else if (i || e.directives.docStart || !r)
        e.commentBefore = s;
      else if (E(r) && !r.flow && r.items.length > 0) {
        let o = r.items[0];
        $(o) && (o = o.key);
        const l = o.commentBefore;
        o.commentBefore = l ? `${s}
${l}` : s;
      } else {
        const o = r.commentBefore;
        r.commentBefore = o ? `${s}
${o}` : s;
      }
    }
    t ? (Array.prototype.push.apply(e.errors, this.errors), Array.prototype.push.apply(e.warnings, this.warnings)) : (e.errors = this.errors, e.warnings = this.warnings), this.prelude = [], this.errors = [], this.warnings = [];
  }
  /**
   * Current stream status information.
   *
   * Mostly useful at the end of input for an empty stream.
   */
  streamInfo() {
    return {
      comment: Nt(this.prelude).comment,
      directives: this.directives,
      errors: this.errors,
      warnings: this.warnings
    };
  }
  /**
   * Compose tokens into documents.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *compose(e, t = !1, s = -1) {
    for (const i of e)
      yield* this.next(i);
    yield* this.end(t, s);
  }
  /** Advance the composer by one CST token. */
  *next(e) {
    switch (e.type) {
      case "directive":
        this.directives.add(e.source, (t, s, i) => {
          const r = fe(e);
          r[0] += t, this.onError(r, "BAD_DIRECTIVE", s, i);
        }), this.prelude.push(e.source), this.atDirectives = !0;
        break;
      case "document": {
        const t = cn(this.options, this.directives, e, this.onError);
        this.atDirectives && !t.directives.docStart && this.onError(e, "MISSING_CHAR", "Missing directives-end/doc-start indicator line"), this.decorate(t, !1), this.doc && (yield this.doc), this.doc = t, this.atDirectives = !1;
        break;
      }
      case "byte-order-mark":
      case "space":
        break;
      case "comment":
      case "newline":
        this.prelude.push(e.source);
        break;
      case "error": {
        const t = e.source ? `${e.message}: ${JSON.stringify(e.source)}` : e.message, s = new he(fe(e), "UNEXPECTED_TOKEN", t);
        this.atDirectives || !this.doc ? this.errors.push(s) : this.doc.errors.push(s);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const s = "Unexpected doc-end without preceding document";
          this.errors.push(new he(fe(e), "UNEXPECTED_TOKEN", s));
          break;
        }
        this.doc.directives.docEnd = !0;
        const t = ke(e.end, e.offset + e.source.length, this.doc.options.strict, this.onError);
        if (this.decorate(this.doc, !0), t.comment) {
          const s = this.doc.comment;
          this.doc.comment = s ? `${s}
${t.comment}` : t.comment;
        }
        this.doc.range[2] = t.offset;
        break;
      }
      default:
        this.errors.push(new he(fe(e), "UNEXPECTED_TOKEN", `Unsupported token ${e.type}`));
    }
  }
  /**
   * Call at end of input to yield any remaining document.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *end(e = !1, t = -1) {
    if (this.doc)
      this.decorate(this.doc, !0), yield this.doc, this.doc = null;
    else if (e) {
      const s = Object.assign({ _directives: this.directives }, this.options), i = new Fe(void 0, s);
      this.atDirectives && this.onError(t, "MISSING_CHAR", "Missing directives-end indicator line"), i.range = [0, t, t], this.decorate(i, !1), yield i;
    }
  }
}
const is = "\uFEFF", rs = "", os = "", Ze = "";
function un(n) {
  switch (n) {
    case is:
      return "byte-order-mark";
    case rs:
      return "doc-mode";
    case os:
      return "flow-error-end";
    case Ze:
      return "scalar";
    case "---":
      return "doc-start";
    case "...":
      return "doc-end";
    case "":
    case `
`:
    case `\r
`:
      return "newline";
    case "-":
      return "seq-item-ind";
    case "?":
      return "explicit-key-ind";
    case ":":
      return "map-value-ind";
    case "{":
      return "flow-map-start";
    case "}":
      return "flow-map-end";
    case "[":
      return "flow-seq-start";
    case "]":
      return "flow-seq-end";
    case ",":
      return "comma";
  }
  switch (n[0]) {
    case " ":
    case "	":
      return "space";
    case "#":
      return "comment";
    case "%":
      return "directive-line";
    case "*":
      return "alias";
    case "&":
      return "anchor";
    case "!":
      return "tag";
    case "'":
      return "single-quoted-scalar";
    case '"':
      return "double-quoted-scalar";
    case "|":
    case ">":
      return "block-scalar-header";
  }
  return null;
}
function D(n) {
  switch (n) {
    case void 0:
    case " ":
    case `
`:
    case "\r":
    case "	":
      return !0;
    default:
      return !1;
  }
}
const Ot = new Set("0123456789ABCDEFabcdef"), hn = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()"), Ae = new Set(",[]{}"), dn = new Set(` ,[]{}
\r	`), Ge = (n) => !n || dn.has(n);
class pn {
  constructor() {
    this.atEnd = !1, this.blockScalarIndent = -1, this.blockScalarKeep = !1, this.buffer = "", this.flowKey = !1, this.flowLevel = 0, this.indentNext = 0, this.indentValue = 0, this.lineEndPos = null, this.next = null, this.pos = 0;
  }
  /**
   * Generate YAML tokens from the `source` string. If `incomplete`,
   * a part of the last line may be left as a buffer for the next call.
   *
   * @returns A generator of lexical tokens
   */
  *lex(e, t = !1) {
    if (e) {
      if (typeof e != "string")
        throw TypeError("source is not a string");
      this.buffer = this.buffer ? this.buffer + e : e, this.lineEndPos = null;
    }
    this.atEnd = !t;
    let s = this.next ?? "stream";
    for (; s && (t || this.hasChars(1)); )
      s = yield* this.parseNext(s);
  }
  atLineEnd() {
    let e = this.pos, t = this.buffer[e];
    for (; t === " " || t === "	"; )
      t = this.buffer[++e];
    return !t || t === "#" || t === `
` ? !0 : t === "\r" ? this.buffer[e + 1] === `
` : !1;
  }
  charAt(e) {
    return this.buffer[this.pos + e];
  }
  continueScalar(e) {
    let t = this.buffer[e];
    if (this.indentNext > 0) {
      let s = 0;
      for (; t === " "; )
        t = this.buffer[++s + e];
      if (t === "\r") {
        const i = this.buffer[s + e + 1];
        if (i === `
` || !i && !this.atEnd)
          return e + s + 1;
      }
      return t === `
` || s >= this.indentNext || !t && !this.atEnd ? e + s : -1;
    }
    if (t === "-" || t === ".") {
      const s = this.buffer.substr(e, 3);
      if ((s === "---" || s === "...") && D(this.buffer[e + 3]))
        return -1;
    }
    return e;
  }
  getLine() {
    let e = this.lineEndPos;
    return (typeof e != "number" || e !== -1 && e < this.pos) && (e = this.buffer.indexOf(`
`, this.pos), this.lineEndPos = e), e === -1 ? this.atEnd ? this.buffer.substring(this.pos) : null : (this.buffer[e - 1] === "\r" && (e -= 1), this.buffer.substring(this.pos, e));
  }
  hasChars(e) {
    return this.pos + e <= this.buffer.length;
  }
  setNext(e) {
    return this.buffer = this.buffer.substring(this.pos), this.pos = 0, this.lineEndPos = null, this.next = e, null;
  }
  peek(e) {
    return this.buffer.substr(this.pos, e);
  }
  *parseNext(e) {
    switch (e) {
      case "stream":
        return yield* this.parseStream();
      case "line-start":
        return yield* this.parseLineStart();
      case "block-start":
        return yield* this.parseBlockStart();
      case "doc":
        return yield* this.parseDocument();
      case "flow":
        return yield* this.parseFlowCollection();
      case "quoted-scalar":
        return yield* this.parseQuotedScalar();
      case "block-scalar":
        return yield* this.parseBlockScalar();
      case "plain-scalar":
        return yield* this.parsePlainScalar();
    }
  }
  *parseStream() {
    let e = this.getLine();
    if (e === null)
      return this.setNext("stream");
    if (e[0] === is && (yield* this.pushCount(1), e = e.substring(1)), e[0] === "%") {
      let t = e.length, s = e.indexOf("#");
      for (; s !== -1; ) {
        const r = e[s - 1];
        if (r === " " || r === "	") {
          t = s - 1;
          break;
        } else
          s = e.indexOf("#", s + 1);
      }
      for (; ; ) {
        const r = e[t - 1];
        if (r === " " || r === "	")
          t -= 1;
        else
          break;
      }
      const i = (yield* this.pushCount(t)) + (yield* this.pushSpaces(!0));
      return yield* this.pushCount(e.length - i), this.pushNewline(), "stream";
    }
    if (this.atLineEnd()) {
      const t = yield* this.pushSpaces(!0);
      return yield* this.pushCount(e.length - t), yield* this.pushNewline(), "stream";
    }
    return yield rs, yield* this.parseLineStart();
  }
  *parseLineStart() {
    const e = this.charAt(0);
    if (!e && !this.atEnd)
      return this.setNext("line-start");
    if (e === "-" || e === ".") {
      if (!this.atEnd && !this.hasChars(4))
        return this.setNext("line-start");
      const t = this.peek(3);
      if ((t === "---" || t === "...") && D(this.charAt(3)))
        return yield* this.pushCount(3), this.indentValue = 0, this.indentNext = 0, t === "---" ? "doc" : "stream";
    }
    return this.indentValue = yield* this.pushSpaces(!1), this.indentNext > this.indentValue && !D(this.charAt(1)) && (this.indentNext = this.indentValue), yield* this.parseBlockStart();
  }
  *parseBlockStart() {
    const [e, t] = this.peek(2);
    if (!t && !this.atEnd)
      return this.setNext("block-start");
    if ((e === "-" || e === "?" || e === ":") && D(t)) {
      const s = (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0));
      return this.indentNext = this.indentValue + 1, this.indentValue += s, yield* this.parseBlockStart();
    }
    return "doc";
  }
  *parseDocument() {
    yield* this.pushSpaces(!0);
    const e = this.getLine();
    if (e === null)
      return this.setNext("doc");
    let t = yield* this.pushIndicators();
    switch (e[t]) {
      case "#":
        yield* this.pushCount(e.length - t);
      // fallthrough
      case void 0:
        return yield* this.pushNewline(), yield* this.parseLineStart();
      case "{":
      case "[":
        return yield* this.pushCount(1), this.flowKey = !1, this.flowLevel = 1, "flow";
      case "}":
      case "]":
        return yield* this.pushCount(1), "doc";
      case "*":
        return yield* this.pushUntil(Ge), "doc";
      case '"':
      case "'":
        return yield* this.parseQuotedScalar();
      case "|":
      case ">":
        return t += yield* this.parseBlockScalarHeader(), t += yield* this.pushSpaces(!0), yield* this.pushCount(e.length - t), yield* this.pushNewline(), yield* this.parseBlockScalar();
      default:
        return yield* this.parsePlainScalar();
    }
  }
  *parseFlowCollection() {
    let e, t, s = -1;
    do
      e = yield* this.pushNewline(), e > 0 ? (t = yield* this.pushSpaces(!1), this.indentValue = s = t) : t = 0, t += yield* this.pushSpaces(!0);
    while (e + t > 0);
    const i = this.getLine();
    if (i === null)
      return this.setNext("flow");
    if ((s !== -1 && s < this.indentNext && i[0] !== "#" || s === 0 && (i.startsWith("---") || i.startsWith("...")) && D(i[3])) && !(s === this.indentNext - 1 && this.flowLevel === 1 && (i[0] === "]" || i[0] === "}")))
      return this.flowLevel = 0, yield os, yield* this.parseLineStart();
    let r = 0;
    for (; i[r] === ","; )
      r += yield* this.pushCount(1), r += yield* this.pushSpaces(!0), this.flowKey = !1;
    switch (r += yield* this.pushIndicators(), i[r]) {
      case void 0:
        return "flow";
      case "#":
        return yield* this.pushCount(i.length - r), "flow";
      case "{":
      case "[":
        return yield* this.pushCount(1), this.flowKey = !1, this.flowLevel += 1, "flow";
      case "}":
      case "]":
        return yield* this.pushCount(1), this.flowKey = !0, this.flowLevel -= 1, this.flowLevel ? "flow" : "doc";
      case "*":
        return yield* this.pushUntil(Ge), "flow";
      case '"':
      case "'":
        return this.flowKey = !0, yield* this.parseQuotedScalar();
      case ":": {
        const o = this.charAt(1);
        if (this.flowKey || D(o) || o === ",")
          return this.flowKey = !1, yield* this.pushCount(1), yield* this.pushSpaces(!0), "flow";
      }
      // fallthrough
      default:
        return this.flowKey = !1, yield* this.parsePlainScalar();
    }
  }
  *parseQuotedScalar() {
    const e = this.charAt(0);
    let t = this.buffer.indexOf(e, this.pos + 1);
    if (e === "'")
      for (; t !== -1 && this.buffer[t + 1] === "'"; )
        t = this.buffer.indexOf("'", t + 2);
    else
      for (; t !== -1; ) {
        let r = 0;
        for (; this.buffer[t - 1 - r] === "\\"; )
          r += 1;
        if (r % 2 === 0)
          break;
        t = this.buffer.indexOf('"', t + 1);
      }
    const s = this.buffer.substring(0, t);
    let i = s.indexOf(`
`, this.pos);
    if (i !== -1) {
      for (; i !== -1; ) {
        const r = this.continueScalar(i + 1);
        if (r === -1)
          break;
        i = s.indexOf(`
`, r);
      }
      i !== -1 && (t = i - (s[i - 1] === "\r" ? 2 : 1));
    }
    if (t === -1) {
      if (!this.atEnd)
        return this.setNext("quoted-scalar");
      t = this.buffer.length;
    }
    return yield* this.pushToIndex(t + 1, !1), this.flowLevel ? "flow" : "doc";
  }
  *parseBlockScalarHeader() {
    this.blockScalarIndent = -1, this.blockScalarKeep = !1;
    let e = this.pos;
    for (; ; ) {
      const t = this.buffer[++e];
      if (t === "+")
        this.blockScalarKeep = !0;
      else if (t > "0" && t <= "9")
        this.blockScalarIndent = Number(t) - 1;
      else if (t !== "-")
        break;
    }
    return yield* this.pushUntil((t) => D(t) || t === "#");
  }
  *parseBlockScalar() {
    let e = this.pos - 1, t = 0, s;
    e: for (let r = this.pos; s = this.buffer[r]; ++r)
      switch (s) {
        case " ":
          t += 1;
          break;
        case `
`:
          e = r, t = 0;
          break;
        case "\r": {
          const o = this.buffer[r + 1];
          if (!o && !this.atEnd)
            return this.setNext("block-scalar");
          if (o === `
`)
            break;
        }
        // fallthrough
        default:
          break e;
      }
    if (!s && !this.atEnd)
      return this.setNext("block-scalar");
    if (t >= this.indentNext) {
      this.blockScalarIndent === -1 ? this.indentNext = t : this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
      do {
        const r = this.continueScalar(e + 1);
        if (r === -1)
          break;
        e = this.buffer.indexOf(`
`, r);
      } while (e !== -1);
      if (e === -1) {
        if (!this.atEnd)
          return this.setNext("block-scalar");
        e = this.buffer.length;
      }
    }
    let i = e + 1;
    for (s = this.buffer[i]; s === " "; )
      s = this.buffer[++i];
    if (s === "	") {
      for (; s === "	" || s === " " || s === "\r" || s === `
`; )
        s = this.buffer[++i];
      e = i - 1;
    } else if (!this.blockScalarKeep)
      do {
        let r = e - 1, o = this.buffer[r];
        o === "\r" && (o = this.buffer[--r]);
        const l = r;
        for (; o === " "; )
          o = this.buffer[--r];
        if (o === `
` && r >= this.pos && r + 1 + t > l)
          e = r;
        else
          break;
      } while (!0);
    return yield Ze, yield* this.pushToIndex(e + 1, !0), yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const e = this.flowLevel > 0;
    let t = this.pos - 1, s = this.pos - 1, i;
    for (; i = this.buffer[++s]; )
      if (i === ":") {
        const r = this.buffer[s + 1];
        if (D(r) || e && Ae.has(r))
          break;
        t = s;
      } else if (D(i)) {
        let r = this.buffer[s + 1];
        if (i === "\r" && (r === `
` ? (s += 1, i = `
`, r = this.buffer[s + 1]) : t = s), r === "#" || e && Ae.has(r))
          break;
        if (i === `
`) {
          const o = this.continueScalar(s + 1);
          if (o === -1)
            break;
          s = Math.max(s, o - 2);
        }
      } else {
        if (e && Ae.has(i))
          break;
        t = s;
      }
    return !i && !this.atEnd ? this.setNext("plain-scalar") : (yield Ze, yield* this.pushToIndex(t + 1, !0), e ? "flow" : "doc");
  }
  *pushCount(e) {
    return e > 0 ? (yield this.buffer.substr(this.pos, e), this.pos += e, e) : 0;
  }
  *pushToIndex(e, t) {
    const s = this.buffer.slice(this.pos, e);
    return s ? (yield s, this.pos += s.length, s.length) : (t && (yield ""), 0);
  }
  *pushIndicators() {
    switch (this.charAt(0)) {
      case "!":
        return (yield* this.pushTag()) + (yield* this.pushSpaces(!0)) + (yield* this.pushIndicators());
      case "&":
        return (yield* this.pushUntil(Ge)) + (yield* this.pushSpaces(!0)) + (yield* this.pushIndicators());
      case "-":
      // this is an error
      case "?":
      // this is an error outside flow collections
      case ":": {
        const e = this.flowLevel > 0, t = this.charAt(1);
        if (D(t) || e && Ae.has(t))
          return e ? this.flowKey && (this.flowKey = !1) : this.indentNext = this.indentValue + 1, (yield* this.pushCount(1)) + (yield* this.pushSpaces(!0)) + (yield* this.pushIndicators());
      }
    }
    return 0;
  }
  *pushTag() {
    if (this.charAt(1) === "<") {
      let e = this.pos + 2, t = this.buffer[e];
      for (; !D(t) && t !== ">"; )
        t = this.buffer[++e];
      return yield* this.pushToIndex(t === ">" ? e + 1 : e, !1);
    } else {
      let e = this.pos + 1, t = this.buffer[e];
      for (; t; )
        if (hn.has(t))
          t = this.buffer[++e];
        else if (t === "%" && Ot.has(this.buffer[e + 1]) && Ot.has(this.buffer[e + 2]))
          t = this.buffer[e += 3];
        else
          break;
      return yield* this.pushToIndex(e, !1);
    }
  }
  *pushNewline() {
    const e = this.buffer[this.pos];
    return e === `
` ? yield* this.pushCount(1) : e === "\r" && this.charAt(1) === `
` ? yield* this.pushCount(2) : 0;
  }
  *pushSpaces(e) {
    let t = this.pos - 1, s;
    do
      s = this.buffer[++t];
    while (s === " " || e && s === "	");
    const i = t - this.pos;
    return i > 0 && (yield this.buffer.substr(this.pos, i), this.pos = t), i;
  }
  *pushUntil(e) {
    let t = this.pos, s = this.buffer[t];
    for (; !e(s); )
      s = this.buffer[++t];
    return yield* this.pushToIndex(t, !1);
  }
}
class mn {
  constructor() {
    this.lineStarts = [], this.addNewLine = (e) => this.lineStarts.push(e), this.linePos = (e) => {
      let t = 0, s = this.lineStarts.length;
      for (; t < s; ) {
        const r = t + s >> 1;
        this.lineStarts[r] < e ? t = r + 1 : s = r;
      }
      if (this.lineStarts[t] === e)
        return { line: t + 1, col: 1 };
      if (t === 0)
        return { line: 0, col: e };
      const i = this.lineStarts[t - 1];
      return { line: t, col: e - i + 1 };
    };
  }
}
function Y(n, e) {
  for (let t = 0; t < n.length; ++t)
    if (n[t].type === e)
      return !0;
  return !1;
}
function At(n) {
  for (let e = 0; e < n.length; ++e)
    switch (n[e].type) {
      case "space":
      case "comment":
      case "newline":
        break;
      default:
        return e;
    }
  return -1;
}
function ls(n) {
  switch (n == null ? void 0 : n.type) {
    case "alias":
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "flow-collection":
      return !0;
    default:
      return !1;
  }
}
function Ie(n) {
  switch (n.type) {
    case "document":
      return n.start;
    case "block-map": {
      const e = n.items[n.items.length - 1];
      return e.sep ?? e.start;
    }
    case "block-seq":
      return n.items[n.items.length - 1].start;
    /* istanbul ignore next should not happen */
    default:
      return [];
  }
}
function Z(n) {
  var t;
  if (n.length === 0)
    return [];
  let e = n.length;
  e: for (; --e >= 0; )
    switch (n[e].type) {
      case "doc-start":
      case "explicit-key-ind":
      case "map-value-ind":
      case "seq-item-ind":
      case "newline":
        break e;
    }
  for (; ((t = n[++e]) == null ? void 0 : t.type) === "space"; )
    ;
  return n.splice(e, n.length);
}
function It(n) {
  if (n.start.type === "flow-seq-start")
    for (const e of n.items)
      e.sep && !e.value && !Y(e.start, "explicit-key-ind") && !Y(e.sep, "map-value-ind") && (e.key && (e.value = e.key), delete e.key, ls(e.value) ? e.value.end ? Array.prototype.push.apply(e.value.end, e.sep) : e.value.end = e.sep : Array.prototype.push.apply(e.start, e.sep), delete e.sep);
}
class gn {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(e) {
    this.atNewLine = !0, this.atScalar = !1, this.indent = 0, this.offset = 0, this.onKeyLine = !1, this.stack = [], this.source = "", this.type = "", this.lexer = new pn(), this.onNewLine = e;
  }
  /**
   * Parse `source` as a YAML stream.
   * If `incomplete`, a part of the last line may be left as a buffer for the next call.
   *
   * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
   *
   * @returns A generator of tokens representing each directive, document, and other structure.
   */
  *parse(e, t = !1) {
    this.onNewLine && this.offset === 0 && this.onNewLine(0);
    for (const s of this.lexer.lex(e, t))
      yield* this.next(s);
    t || (yield* this.end());
  }
  /**
   * Advance the parser by the `source` of one lexical token.
   */
  *next(e) {
    if (this.source = e, this.atScalar) {
      this.atScalar = !1, yield* this.step(), this.offset += e.length;
      return;
    }
    const t = un(e);
    if (t)
      if (t === "scalar")
        this.atNewLine = !1, this.atScalar = !0, this.type = "scalar";
      else {
        switch (this.type = t, yield* this.step(), t) {
          case "newline":
            this.atNewLine = !0, this.indent = 0, this.onNewLine && this.onNewLine(this.offset + e.length);
            break;
          case "space":
            this.atNewLine && e[0] === " " && (this.indent += e.length);
            break;
          case "explicit-key-ind":
          case "map-value-ind":
          case "seq-item-ind":
            this.atNewLine && (this.indent += e.length);
            break;
          case "doc-mode":
          case "flow-error-end":
            return;
          default:
            this.atNewLine = !1;
        }
        this.offset += e.length;
      }
    else {
      const s = `Not a YAML token: ${e}`;
      yield* this.pop({ type: "error", offset: this.offset, message: s, source: e }), this.offset += e.length;
    }
  }
  /** Call at end of input to push out any remaining constructions */
  *end() {
    for (; this.stack.length > 0; )
      yield* this.pop();
  }
  get sourceToken() {
    return {
      type: this.type,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
  }
  *step() {
    const e = this.peek(1);
    if (this.type === "doc-end" && (!e || e.type !== "doc-end")) {
      for (; this.stack.length > 0; )
        yield* this.pop();
      this.stack.push({
        type: "doc-end",
        offset: this.offset,
        source: this.source
      });
      return;
    }
    if (!e)
      return yield* this.stream();
    switch (e.type) {
      case "document":
        return yield* this.document(e);
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return yield* this.scalar(e);
      case "block-scalar":
        return yield* this.blockScalar(e);
      case "block-map":
        return yield* this.blockMap(e);
      case "block-seq":
        return yield* this.blockSequence(e);
      case "flow-collection":
        return yield* this.flowCollection(e);
      case "doc-end":
        return yield* this.documentEnd(e);
    }
    yield* this.pop();
  }
  peek(e) {
    return this.stack[this.stack.length - e];
  }
  *pop(e) {
    const t = e ?? this.stack.pop();
    if (!t)
      yield { type: "error", offset: this.offset, source: "", message: "Tried to pop an empty stack" };
    else if (this.stack.length === 0)
      yield t;
    else {
      const s = this.peek(1);
      switch (t.type === "block-scalar" ? t.indent = "indent" in s ? s.indent : 0 : t.type === "flow-collection" && s.type === "document" && (t.indent = 0), t.type === "flow-collection" && It(t), s.type) {
        case "document":
          s.value = t;
          break;
        case "block-scalar":
          s.props.push(t);
          break;
        case "block-map": {
          const i = s.items[s.items.length - 1];
          if (i.value) {
            s.items.push({ start: [], key: t, sep: [] }), this.onKeyLine = !0;
            return;
          } else if (i.sep)
            i.value = t;
          else {
            Object.assign(i, { key: t, sep: [] }), this.onKeyLine = !i.explicitKey;
            return;
          }
          break;
        }
        case "block-seq": {
          const i = s.items[s.items.length - 1];
          i.value ? s.items.push({ start: [], value: t }) : i.value = t;
          break;
        }
        case "flow-collection": {
          const i = s.items[s.items.length - 1];
          !i || i.value ? s.items.push({ start: [], key: t, sep: [] }) : i.sep ? i.value = t : Object.assign(i, { key: t, sep: [] });
          return;
        }
        /* istanbul ignore next should not happen */
        default:
          yield* this.pop(), yield* this.pop(t);
      }
      if ((s.type === "document" || s.type === "block-map" || s.type === "block-seq") && (t.type === "block-map" || t.type === "block-seq")) {
        const i = t.items[t.items.length - 1];
        i && !i.sep && !i.value && i.start.length > 0 && At(i.start) === -1 && (t.indent === 0 || i.start.every((r) => r.type !== "comment" || r.indent < t.indent)) && (s.type === "document" ? s.end = i.start : s.items.push({ start: i.start }), t.items.splice(-1, 1));
      }
    }
  }
  *stream() {
    switch (this.type) {
      case "directive-line":
        yield { type: "directive", offset: this.offset, source: this.source };
        return;
      case "byte-order-mark":
      case "space":
      case "comment":
      case "newline":
        yield this.sourceToken;
        return;
      case "doc-mode":
      case "doc-start": {
        const e = {
          type: "document",
          offset: this.offset,
          start: []
        };
        this.type === "doc-start" && e.start.push(this.sourceToken), this.stack.push(e);
        return;
      }
    }
    yield {
      type: "error",
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML stream`,
      source: this.source
    };
  }
  *document(e) {
    if (e.value)
      return yield* this.lineEnd(e);
    switch (this.type) {
      case "doc-start": {
        At(e.start) !== -1 ? (yield* this.pop(), yield* this.step()) : e.start.push(this.sourceToken);
        return;
      }
      case "anchor":
      case "tag":
      case "space":
      case "comment":
      case "newline":
        e.start.push(this.sourceToken);
        return;
    }
    const t = this.startBlockValue(e);
    t ? this.stack.push(t) : yield {
      type: "error",
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML document`,
      source: this.source
    };
  }
  *scalar(e) {
    if (this.type === "map-value-ind") {
      const t = Ie(this.peek(2)), s = Z(t);
      let i;
      e.end ? (i = e.end, i.push(this.sourceToken), delete e.end) : i = [this.sourceToken];
      const r = {
        type: "block-map",
        offset: e.offset,
        indent: e.indent,
        items: [{ start: s, key: e, sep: i }]
      };
      this.onKeyLine = !0, this.stack[this.stack.length - 1] = r;
    } else
      yield* this.lineEnd(e);
  }
  *blockScalar(e) {
    switch (this.type) {
      case "space":
      case "comment":
      case "newline":
        e.props.push(this.sourceToken);
        return;
      case "scalar":
        if (e.source = this.source, this.atNewLine = !0, this.indent = 0, this.onNewLine) {
          let t = this.source.indexOf(`
`) + 1;
          for (; t !== 0; )
            this.onNewLine(this.offset + t), t = this.source.indexOf(`
`, t) + 1;
        }
        yield* this.pop();
        break;
      /* istanbul ignore next should not happen */
      default:
        yield* this.pop(), yield* this.step();
    }
  }
  *blockMap(e) {
    var s;
    const t = e.items[e.items.length - 1];
    switch (this.type) {
      case "newline":
        if (this.onKeyLine = !1, t.value) {
          const i = "end" in t.value ? t.value.end : void 0, r = Array.isArray(i) ? i[i.length - 1] : void 0;
          (r == null ? void 0 : r.type) === "comment" ? i == null || i.push(this.sourceToken) : e.items.push({ start: [this.sourceToken] });
        } else t.sep ? t.sep.push(this.sourceToken) : t.start.push(this.sourceToken);
        return;
      case "space":
      case "comment":
        if (t.value)
          e.items.push({ start: [this.sourceToken] });
        else if (t.sep)
          t.sep.push(this.sourceToken);
        else {
          if (this.atIndentedComment(t.start, e.indent)) {
            const i = e.items[e.items.length - 2], r = (s = i == null ? void 0 : i.value) == null ? void 0 : s.end;
            if (Array.isArray(r)) {
              Array.prototype.push.apply(r, t.start), r.push(this.sourceToken), e.items.pop();
              return;
            }
          }
          t.start.push(this.sourceToken);
        }
        return;
    }
    if (this.indent >= e.indent) {
      const i = !this.onKeyLine && this.indent === e.indent, r = i && (t.sep || t.explicitKey) && this.type !== "seq-item-ind";
      let o = [];
      if (r && t.sep && !t.value) {
        const l = [];
        for (let a = 0; a < t.sep.length; ++a) {
          const c = t.sep[a];
          switch (c.type) {
            case "newline":
              l.push(a);
              break;
            case "space":
              break;
            case "comment":
              c.indent > e.indent && (l.length = 0);
              break;
            default:
              l.length = 0;
          }
        }
        l.length >= 2 && (o = t.sep.splice(l[1]));
      }
      switch (this.type) {
        case "anchor":
        case "tag":
          r || t.value ? (o.push(this.sourceToken), e.items.push({ start: o }), this.onKeyLine = !0) : t.sep ? t.sep.push(this.sourceToken) : t.start.push(this.sourceToken);
          return;
        case "explicit-key-ind":
          !t.sep && !t.explicitKey ? (t.start.push(this.sourceToken), t.explicitKey = !0) : r || t.value ? (o.push(this.sourceToken), e.items.push({ start: o, explicitKey: !0 })) : this.stack.push({
            type: "block-map",
            offset: this.offset,
            indent: this.indent,
            items: [{ start: [this.sourceToken], explicitKey: !0 }]
          }), this.onKeyLine = !0;
          return;
        case "map-value-ind":
          if (t.explicitKey)
            if (t.sep)
              if (t.value)
                e.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (Y(t.sep, "map-value-ind"))
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: o, key: null, sep: [this.sourceToken] }]
                });
              else if (ls(t.key) && !Y(t.sep, "newline")) {
                const l = Z(t.start), a = t.key, c = t.sep;
                c.push(this.sourceToken), delete t.key, delete t.sep, this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: l, key: a, sep: c }]
                });
              } else o.length > 0 ? t.sep = t.sep.concat(o, this.sourceToken) : t.sep.push(this.sourceToken);
            else if (Y(t.start, "newline"))
              Object.assign(t, { key: null, sep: [this.sourceToken] });
            else {
              const l = Z(t.start);
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: l, key: null, sep: [this.sourceToken] }]
              });
            }
          else
            t.sep ? t.value || r ? e.items.push({ start: o, key: null, sep: [this.sourceToken] }) : Y(t.sep, "map-value-ind") ? this.stack.push({
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [], key: null, sep: [this.sourceToken] }]
            }) : t.sep.push(this.sourceToken) : Object.assign(t, { key: null, sep: [this.sourceToken] });
          this.onKeyLine = !0;
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const l = this.flowScalar(this.type);
          r || t.value ? (e.items.push({ start: o, key: l, sep: [] }), this.onKeyLine = !0) : t.sep ? this.stack.push(l) : (Object.assign(t, { key: l, sep: [] }), this.onKeyLine = !0);
          return;
        }
        default: {
          const l = this.startBlockValue(e);
          if (l) {
            i && l.type !== "block-seq" && e.items.push({ start: o }), this.stack.push(l);
            return;
          }
        }
      }
    }
    yield* this.pop(), yield* this.step();
  }
  *blockSequence(e) {
    var s;
    const t = e.items[e.items.length - 1];
    switch (this.type) {
      case "newline":
        if (t.value) {
          const i = "end" in t.value ? t.value.end : void 0, r = Array.isArray(i) ? i[i.length - 1] : void 0;
          (r == null ? void 0 : r.type) === "comment" ? i == null || i.push(this.sourceToken) : e.items.push({ start: [this.sourceToken] });
        } else
          t.start.push(this.sourceToken);
        return;
      case "space":
      case "comment":
        if (t.value)
          e.items.push({ start: [this.sourceToken] });
        else {
          if (this.atIndentedComment(t.start, e.indent)) {
            const i = e.items[e.items.length - 2], r = (s = i == null ? void 0 : i.value) == null ? void 0 : s.end;
            if (Array.isArray(r)) {
              Array.prototype.push.apply(r, t.start), r.push(this.sourceToken), e.items.pop();
              return;
            }
          }
          t.start.push(this.sourceToken);
        }
        return;
      case "anchor":
      case "tag":
        if (t.value || this.indent <= e.indent)
          break;
        t.start.push(this.sourceToken);
        return;
      case "seq-item-ind":
        if (this.indent !== e.indent)
          break;
        t.value || Y(t.start, "seq-item-ind") ? e.items.push({ start: [this.sourceToken] }) : t.start.push(this.sourceToken);
        return;
    }
    if (this.indent > e.indent) {
      const i = this.startBlockValue(e);
      if (i) {
        this.stack.push(i);
        return;
      }
    }
    yield* this.pop(), yield* this.step();
  }
  *flowCollection(e) {
    const t = e.items[e.items.length - 1];
    if (this.type === "flow-error-end") {
      let s;
      do
        yield* this.pop(), s = this.peek(1);
      while (s && s.type === "flow-collection");
    } else if (e.end.length === 0) {
      switch (this.type) {
        case "comma":
        case "explicit-key-ind":
          !t || t.sep ? e.items.push({ start: [this.sourceToken] }) : t.start.push(this.sourceToken);
          return;
        case "map-value-ind":
          !t || t.value ? e.items.push({ start: [], key: null, sep: [this.sourceToken] }) : t.sep ? t.sep.push(this.sourceToken) : Object.assign(t, { key: null, sep: [this.sourceToken] });
          return;
        case "space":
        case "comment":
        case "newline":
        case "anchor":
        case "tag":
          !t || t.value ? e.items.push({ start: [this.sourceToken] }) : t.sep ? t.sep.push(this.sourceToken) : t.start.push(this.sourceToken);
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const i = this.flowScalar(this.type);
          !t || t.value ? e.items.push({ start: [], key: i, sep: [] }) : t.sep ? this.stack.push(i) : Object.assign(t, { key: i, sep: [] });
          return;
        }
        case "flow-map-end":
        case "flow-seq-end":
          e.end.push(this.sourceToken);
          return;
      }
      const s = this.startBlockValue(e);
      s ? this.stack.push(s) : (yield* this.pop(), yield* this.step());
    } else {
      const s = this.peek(2);
      if (s.type === "block-map" && (this.type === "map-value-ind" && s.indent === e.indent || this.type === "newline" && !s.items[s.items.length - 1].sep))
        yield* this.pop(), yield* this.step();
      else if (this.type === "map-value-ind" && s.type !== "flow-collection") {
        const i = Ie(s), r = Z(i);
        It(e);
        const o = e.end.splice(1, e.end.length);
        o.push(this.sourceToken);
        const l = {
          type: "block-map",
          offset: e.offset,
          indent: e.indent,
          items: [{ start: r, key: e, sep: o }]
        };
        this.onKeyLine = !0, this.stack[this.stack.length - 1] = l;
      } else
        yield* this.lineEnd(e);
    }
  }
  flowScalar(e) {
    if (this.onNewLine) {
      let t = this.source.indexOf(`
`) + 1;
      for (; t !== 0; )
        this.onNewLine(this.offset + t), t = this.source.indexOf(`
`, t) + 1;
    }
    return {
      type: e,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
  }
  startBlockValue(e) {
    switch (this.type) {
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return this.flowScalar(this.type);
      case "block-scalar-header":
        return {
          type: "block-scalar",
          offset: this.offset,
          indent: this.indent,
          props: [this.sourceToken],
          source: ""
        };
      case "flow-map-start":
      case "flow-seq-start":
        return {
          type: "flow-collection",
          offset: this.offset,
          indent: this.indent,
          start: this.sourceToken,
          items: [],
          end: []
        };
      case "seq-item-ind":
        return {
          type: "block-seq",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: [this.sourceToken] }]
        };
      case "explicit-key-ind": {
        this.onKeyLine = !0;
        const t = Ie(e), s = Z(t);
        return s.push(this.sourceToken), {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: s, explicitKey: !0 }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = !0;
        const t = Ie(e), s = Z(t);
        return {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: s, key: null, sep: [this.sourceToken] }]
        };
      }
    }
    return null;
  }
  atIndentedComment(e, t) {
    return this.type !== "comment" || this.indent <= t ? !1 : e.every((s) => s.type === "newline" || s.type === "space");
  }
  *documentEnd(e) {
    this.type !== "doc-mode" && (e.end ? e.end.push(this.sourceToken) : e.end = [this.sourceToken], this.type === "newline" && (yield* this.pop()));
  }
  *lineEnd(e) {
    switch (this.type) {
      case "comma":
      case "doc-start":
      case "doc-end":
      case "flow-seq-end":
      case "flow-map-end":
      case "map-value-ind":
        yield* this.pop(), yield* this.step();
        break;
      case "newline":
        this.onKeyLine = !1;
      // fallthrough
      case "space":
      case "comment":
      default:
        e.end ? e.end.push(this.sourceToken) : e.end = [this.sourceToken], this.type === "newline" && (yield* this.pop());
    }
  }
}
function yn(n) {
  const e = n.prettyErrors !== !1;
  return { lineCounter: n.lineCounter || e && new mn() || null, prettyErrors: e };
}
function bn(n, e = {}) {
  const { lineCounter: t, prettyErrors: s } = yn(e), i = new gn(t == null ? void 0 : t.addNewLine), r = new fn(e);
  let o = null;
  for (const l of r.compose(i.parse(n), !0, n.length))
    if (!o)
      o = l;
    else if (o.options.logLevel !== "silent") {
      o.errors.push(new he(l.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  return s && t && (o.errors.forEach(kt(n, t)), o.warnings.forEach(kt(n, t))), o;
}
function wn(n, e, t) {
  let s;
  typeof e == "function" ? s = e : t === void 0 && e && typeof e == "object" && (t = e);
  const i = bn(n, t);
  if (!i)
    return null;
  if (i.warnings.forEach((r) => Mt(i.options.logLevel, r)), i.errors.length > 0) {
    if (i.options.logLevel !== "silent")
      throw i.errors[0];
    i.errors = [];
  }
  return i.toJS(Object.assign({ reviver: s }, t));
}
export {
  tt as Alias,
  fn as Composer,
  Fe as Document,
  pn as Lexer,
  mn as LineCounter,
  B as Pair,
  gn as Parser,
  A as Scalar,
  ht as Schema,
  xt as YAMLError,
  M as YAMLMap,
  he as YAMLParseError,
  W as YAMLSeq,
  Rs as YAMLWarning,
  le as isAlias,
  E as isCollection,
  _e as isDocument,
  ye as isMap,
  L as isNode,
  $ as isPair,
  T as isScalar,
  be as isSeq,
  wn as parse,
  bn as parseDocument,
  H as visit
};
