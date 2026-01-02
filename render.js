import { once as b } from "https://cdn.jsdelivr.net/npm/es-toolkit@1.43.0/+esm";
import { loadJS as Oe, safeHtml as ke } from "./util.js";
var Te = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, he = Math.ceil, q = Math.floor, D = "[BigNumber Error] ", Ee = D + "Number primitive has more than 15 significant digits: ", j = 1e14, O = 14, pe = 9007199254740991, de = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], J = 1e7, T = 1e9;
function ve(p) {
  var h, m, N, d = g.prototype = { constructor: g, toString: null, valueOf: null }, x = new g(1), A = 20, S = 4, I = -7, B = 21, Y = -1e7, H = 1e7, Z = !1, ee = 1, W = 0, oe = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: " ",
    // non-breaking space
    suffix: ""
  }, Q = "0123456789abcdefghijklmnopqrstuvwxyz", le = !0;
  function g(e, n) {
    var t, f, i, o, u, r, s, c, l = this;
    if (!(l instanceof g)) return new g(e, n);
    if (n == null) {
      if (e && e._isBigNumber === !0) {
        l.s = e.s, !e.c || e.e > H ? l.c = l.e = null : e.e < Y ? l.c = [l.e = 0] : (l.e = e.e, l.c = e.c.slice());
        return;
      }
      if ((r = typeof e == "number") && e * 0 == 0) {
        if (l.s = 1 / e < 0 ? (e = -e, -1) : 1, e === ~~e) {
          for (o = 0, u = e; u >= 10; u /= 10, o++) ;
          o > H ? l.c = l.e = null : (l.e = o, l.c = [e]);
          return;
        }
        c = String(e);
      } else {
        if (!Te.test(c = String(e))) return N(l, c, r);
        l.s = c.charCodeAt(0) == 45 ? (c = c.slice(1), -1) : 1;
      }
      (o = c.indexOf(".")) > -1 && (c = c.replace(".", "")), (u = c.search(/e/i)) > 0 ? (o < 0 && (o = u), o += +c.slice(u + 1), c = c.substring(0, u)) : o < 0 && (o = c.length);
    } else {
      if (_(n, 2, Q.length, "Base"), n == 10 && le)
        return l = new g(e), U(l, A + l.e + 1, S);
      if (c = String(e), r = typeof e == "number") {
        if (e * 0 != 0) return N(l, c, r, n);
        if (l.s = 1 / e < 0 ? (c = c.slice(1), -1) : 1, g.DEBUG && c.replace(/^0\.0*|\./, "").length > 15)
          throw Error(Ee + e);
      } else
        l.s = c.charCodeAt(0) === 45 ? (c = c.slice(1), -1) : 1;
      for (t = Q.slice(0, n), o = u = 0, s = c.length; u < s; u++)
        if (t.indexOf(f = c.charAt(u)) < 0) {
          if (f == ".") {
            if (u > o) {
              o = s;
              continue;
            }
          } else if (!i && (c == c.toUpperCase() && (c = c.toLowerCase()) || c == c.toLowerCase() && (c = c.toUpperCase()))) {
            i = !0, u = -1, o = 0;
            continue;
          }
          return N(l, String(e), r, n);
        }
      r = !1, c = m(c, n, 10, l.s), (o = c.indexOf(".")) > -1 ? c = c.replace(".", "") : o = c.length;
    }
    for (u = 0; c.charCodeAt(u) === 48; u++) ;
    for (s = c.length; c.charCodeAt(--s) === 48; ) ;
    if (c = c.slice(u, ++s)) {
      if (s -= u, r && g.DEBUG && s > 15 && (e > pe || e !== q(e)))
        throw Error(Ee + l.s * e);
      if ((o = o - u - 1) > H)
        l.c = l.e = null;
      else if (o < Y)
        l.c = [l.e = 0];
      else {
        if (l.e = o, l.c = [], u = (o + 1) % O, o < 0 && (u += O), u < s) {
          for (u && l.c.push(+c.slice(0, u)), s -= O; u < s; )
            l.c.push(+c.slice(u, u += O));
          u = O - (c = c.slice(u)).length;
        } else
          u -= s;
        for (; u--; c += "0") ;
        l.c.push(+c);
      }
    } else
      l.c = [l.e = 0];
  }
  g.clone = ve, g.ROUND_UP = 0, g.ROUND_DOWN = 1, g.ROUND_CEIL = 2, g.ROUND_FLOOR = 3, g.ROUND_HALF_UP = 4, g.ROUND_HALF_DOWN = 5, g.ROUND_HALF_EVEN = 6, g.ROUND_HALF_CEIL = 7, g.ROUND_HALF_FLOOR = 8, g.EUCLID = 9, g.config = g.set = function(e) {
    var n, t;
    if (e != null)
      if (typeof e == "object") {
        if (e.hasOwnProperty(n = "DECIMAL_PLACES") && (t = e[n], _(t, 0, T, n), A = t), e.hasOwnProperty(n = "ROUNDING_MODE") && (t = e[n], _(t, 0, 8, n), S = t), e.hasOwnProperty(n = "EXPONENTIAL_AT") && (t = e[n], t && t.pop ? (_(t[0], -T, 0, n), _(t[1], 0, T, n), I = t[0], B = t[1]) : (_(t, -T, T, n), I = -(B = t < 0 ? -t : t))), e.hasOwnProperty(n = "RANGE"))
          if (t = e[n], t && t.pop)
            _(t[0], -T, -1, n), _(t[1], 1, T, n), Y = t[0], H = t[1];
          else if (_(t, -T, T, n), t)
            Y = -(H = t < 0 ? -t : t);
          else
            throw Error(D + n + " cannot be zero: " + t);
        if (e.hasOwnProperty(n = "CRYPTO"))
          if (t = e[n], t === !!t)
            if (t)
              if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
                Z = t;
              else
                throw Z = !t, Error(D + "crypto unavailable");
            else
              Z = t;
          else
            throw Error(D + n + " not true or false: " + t);
        if (e.hasOwnProperty(n = "MODULO_MODE") && (t = e[n], _(t, 0, 9, n), ee = t), e.hasOwnProperty(n = "POW_PRECISION") && (t = e[n], _(t, 0, T, n), W = t), e.hasOwnProperty(n = "FORMAT"))
          if (t = e[n], typeof t == "object") oe = t;
          else throw Error(D + n + " not an object: " + t);
        if (e.hasOwnProperty(n = "ALPHABET"))
          if (t = e[n], typeof t == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(t))
            le = t.slice(0, 10) == "0123456789", Q = t;
          else
            throw Error(D + n + " invalid: " + t);
      } else
        throw Error(D + "Object expected: " + e);
    return {
      DECIMAL_PLACES: A,
      ROUNDING_MODE: S,
      EXPONENTIAL_AT: [I, B],
      RANGE: [Y, H],
      CRYPTO: Z,
      MODULO_MODE: ee,
      POW_PRECISION: W,
      FORMAT: oe,
      ALPHABET: Q
    };
  }, g.isBigNumber = function(e) {
    if (!e || e._isBigNumber !== !0) return !1;
    if (!g.DEBUG) return !0;
    var n, t, f = e.c, i = e.e, o = e.s;
    e: if ({}.toString.call(f) == "[object Array]") {
      if ((o === 1 || o === -1) && i >= -T && i <= T && i === q(i)) {
        if (f[0] === 0) {
          if (i === 0 && f.length === 1) return !0;
          break e;
        }
        if (n = (i + 1) % O, n < 1 && (n += O), String(f[0]).length == n) {
          for (n = 0; n < f.length; n++)
            if (t = f[n], t < 0 || t >= j || t !== q(t)) break e;
          if (t !== 0) return !0;
        }
      }
    } else if (f === null && i === null && (o === null || o === 1 || o === -1))
      return !0;
    throw Error(D + "Invalid BigNumber: " + e);
  }, g.maximum = g.max = function() {
    return we(arguments, -1);
  }, g.minimum = g.min = function() {
    return we(arguments, 1);
  }, g.random = (function() {
    var e = 9007199254740992, n = Math.random() * e & 2097151 ? function() {
      return q(Math.random() * e);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(t) {
      var f, i, o, u, r, s = 0, c = [], l = new g(x);
      if (t == null ? t = A : _(t, 0, T), u = he(t / O), Z)
        if (crypto.getRandomValues) {
          for (f = crypto.getRandomValues(new Uint32Array(u *= 2)); s < u; )
            r = f[s] * 131072 + (f[s + 1] >>> 11), r >= 9e15 ? (i = crypto.getRandomValues(new Uint32Array(2)), f[s] = i[0], f[s + 1] = i[1]) : (c.push(r % 1e14), s += 2);
          s = u / 2;
        } else if (crypto.randomBytes) {
          for (f = crypto.randomBytes(u *= 7); s < u; )
            r = (f[s] & 31) * 281474976710656 + f[s + 1] * 1099511627776 + f[s + 2] * 4294967296 + f[s + 3] * 16777216 + (f[s + 4] << 16) + (f[s + 5] << 8) + f[s + 6], r >= 9e15 ? crypto.randomBytes(7).copy(f, s) : (c.push(r % 1e14), s += 7);
          s = u / 7;
        } else
          throw Z = !1, Error(D + "crypto unavailable");
      if (!Z)
        for (; s < u; )
          r = n(), r < 9e15 && (c[s++] = r % 1e14);
      for (u = c[--s], t %= O, u && t && (r = de[O - t], c[s] = q(u / r) * r); c[s] === 0; c.pop(), s--) ;
      if (s < 0)
        c = [o = 0];
      else {
        for (o = -1; c[0] === 0; c.splice(0, 1), o -= O) ;
        for (s = 1, r = c[0]; r >= 10; r /= 10, s++) ;
        s < O && (o -= O - s);
      }
      return l.e = o, l.c = c, l;
    };
  })(), g.sum = function() {
    for (var e = 1, n = arguments, t = new g(n[0]); e < n.length; ) t = t.plus(n[e++]);
    return t;
  }, m = /* @__PURE__ */ (function() {
    var e = "0123456789";
    function n(t, f, i, o) {
      for (var u, r = [0], s, c = 0, l = t.length; c < l; ) {
        for (s = r.length; s--; r[s] *= f) ;
        for (r[0] += o.indexOf(t.charAt(c++)), u = 0; u < r.length; u++)
          r[u] > i - 1 && (r[u + 1] == null && (r[u + 1] = 0), r[u + 1] += r[u] / i | 0, r[u] %= i);
      }
      return r.reverse();
    }
    return function(t, f, i, o, u) {
      var r, s, c, l, a, w, E, v, y = t.indexOf("."), R = A, k = S;
      for (y >= 0 && (l = W, W = 0, t = t.replace(".", ""), v = new g(f), w = v.pow(t.length - y), W = l, v.c = n(
        V(F(w.c), w.e, "0"),
        10,
        i,
        e
      ), v.e = v.c.length), E = n(t, f, i, u ? (r = Q, e) : (r = e, Q)), c = l = E.length; E[--l] == 0; E.pop()) ;
      if (!E[0]) return r.charAt(0);
      if (y < 0 ? --c : (w.c = E, w.e = c, w.s = o, w = h(w, v, R, k, i), E = w.c, a = w.r, c = w.e), s = c + R + 1, y = E[s], l = i / 2, a = a || s < 0 || E[s + 1] != null, a = k < 4 ? (y != null || a) && (k == 0 || k == (w.s < 0 ? 3 : 2)) : y > l || y == l && (k == 4 || a || k == 6 && E[s - 1] & 1 || k == (w.s < 0 ? 8 : 7)), s < 1 || !E[0])
        t = a ? V(r.charAt(1), -R, r.charAt(0)) : r.charAt(0);
      else {
        if (E.length = s, a)
          for (--i; ++E[--s] > i; )
            E[s] = 0, s || (++c, E = [1].concat(E));
        for (l = E.length; !E[--l]; ) ;
        for (y = 0, t = ""; y <= l; t += r.charAt(E[y++])) ;
        t = V(t, c, r.charAt(0));
      }
      return t;
    };
  })(), h = /* @__PURE__ */ (function() {
    function e(f, i, o) {
      var u, r, s, c, l = 0, a = f.length, w = i % J, E = i / J | 0;
      for (f = f.slice(); a--; )
        s = f[a] % J, c = f[a] / J | 0, u = E * s + c * w, r = w * s + u % J * J + l, l = (r / o | 0) + (u / J | 0) + E * c, f[a] = r % o;
      return l && (f = [l].concat(f)), f;
    }
    function n(f, i, o, u) {
      var r, s;
      if (o != u)
        s = o > u ? 1 : -1;
      else
        for (r = s = 0; r < o; r++)
          if (f[r] != i[r]) {
            s = f[r] > i[r] ? 1 : -1;
            break;
          }
      return s;
    }
    function t(f, i, o, u) {
      for (var r = 0; o--; )
        f[o] -= r, r = f[o] < i[o] ? 1 : 0, f[o] = r * u + f[o] - i[o];
      for (; !f[0] && f.length > 1; f.splice(0, 1)) ;
    }
    return function(f, i, o, u, r) {
      var s, c, l, a, w, E, v, y, R, k, M, C, te, ue, ae, z, ne, $ = f.s == i.s ? 1 : -1, L = f.c, P = i.c;
      if (!L || !L[0] || !P || !P[0])
        return new g(
          // Return NaN if either NaN, or both Infinity or 0.
          !f.s || !i.s || (L ? P && L[0] == P[0] : !P) ? NaN : (
            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            L && L[0] == 0 || !P ? $ * 0 : $ / 0
          )
        );
      for (y = new g($), R = y.c = [], c = f.e - i.e, $ = o + c + 1, r || (r = j, c = G(f.e / O) - G(i.e / O), $ = $ / O | 0), l = 0; P[l] == (L[l] || 0); l++) ;
      if (P[l] > (L[l] || 0) && c--, $ < 0)
        R.push(1), a = !0;
      else {
        for (ue = L.length, z = P.length, l = 0, $ += 2, w = q(r / (P[0] + 1)), w > 1 && (P = e(P, w, r), L = e(L, w, r), z = P.length, ue = L.length), te = z, k = L.slice(0, z), M = k.length; M < z; k[M++] = 0) ;
        ne = P.slice(), ne = [0].concat(ne), ae = P[0], P[1] >= r / 2 && ae++;
        do {
          if (w = 0, s = n(P, k, z, M), s < 0) {
            if (C = k[0], z != M && (C = C * r + (k[1] || 0)), w = q(C / ae), w > 1)
              for (w >= r && (w = r - 1), E = e(P, w, r), v = E.length, M = k.length; n(E, k, v, M) == 1; )
                w--, t(E, z < v ? ne : P, v, r), v = E.length, s = 1;
            else
              w == 0 && (s = w = 1), E = P.slice(), v = E.length;
            if (v < M && (E = [0].concat(E)), t(k, E, M, r), M = k.length, s == -1)
              for (; n(P, k, z, M) < 1; )
                w++, t(k, z < M ? ne : P, M, r), M = k.length;
          } else s === 0 && (w++, k = [0]);
          R[l++] = w, k[0] ? k[M++] = L[te] || 0 : (k = [L[te]], M = 1);
        } while ((te++ < ue || k[0] != null) && $--);
        a = k[0] != null, R[0] || R.splice(0, 1);
      }
      if (r == j) {
        for (l = 1, $ = R[0]; $ >= 10; $ /= 10, l++) ;
        U(y, o + (y.e = l + c * O - 1) + 1, u, a);
      } else
        y.e = c, y.r = +a;
      return y;
    };
  })();
  function fe(e, n, t, f) {
    var i, o, u, r, s;
    if (t == null ? t = S : _(t, 0, 8), !e.c) return e.toString();
    if (i = e.c[0], u = e.e, n == null)
      s = F(e.c), s = f == 1 || f == 2 && (u <= I || u >= B) ? ie(s, u) : V(s, u, "0");
    else if (e = U(new g(e), n, t), o = e.e, s = F(e.c), r = s.length, f == 1 || f == 2 && (n <= o || o <= I)) {
      for (; r < n; s += "0", r++) ;
      s = ie(s, o);
    } else if (n -= u + (f === 2 && o > u), s = V(s, o, "0"), o + 1 > r) {
      if (--n > 0) for (s += "."; n--; s += "0") ;
    } else if (n += o - r, n > 0)
      for (o + 1 == r && (s += "."); n--; s += "0") ;
    return e.s < 0 && i ? "-" + s : s;
  }
  function we(e, n) {
    for (var t, f, i = 1, o = new g(e[0]); i < e.length; i++)
      f = new g(e[i]), (!f.s || (t = K(o, f)) === n || t === 0 && o.s === n) && (o = f);
    return o;
  }
  function ce(e, n, t) {
    for (var f = 1, i = n.length; !n[--i]; n.pop()) ;
    for (i = n[0]; i >= 10; i /= 10, f++) ;
    return (t = f + t * O - 1) > H ? e.c = e.e = null : t < Y ? e.c = [e.e = 0] : (e.e = t, e.c = n), e;
  }
  N = /* @__PURE__ */ (function() {
    var e = /^(-?)0([xbo])(?=\w[\w.]*$)/i, n = /^([^.]+)\.$/, t = /^\.([^.]+)$/, f = /^-?(Infinity|NaN)$/, i = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(o, u, r, s) {
      var c, l = r ? u : u.replace(i, "");
      if (f.test(l))
        o.s = isNaN(l) ? null : l < 0 ? -1 : 1;
      else {
        if (!r && (l = l.replace(e, function(a, w, E) {
          return c = (E = E.toLowerCase()) == "x" ? 16 : E == "b" ? 2 : 8, !s || s == c ? w : a;
        }), s && (c = s, l = l.replace(n, "$1").replace(t, "0.$1")), u != l))
          return new g(l, c);
        if (g.DEBUG)
          throw Error(D + "Not a" + (s ? " base " + s : "") + " number: " + u);
        o.s = null;
      }
      o.c = o.e = null;
    };
  })();
  function U(e, n, t, f) {
    var i, o, u, r, s, c, l, a = e.c, w = de;
    if (a) {
      e: {
        for (i = 1, r = a[0]; r >= 10; r /= 10, i++) ;
        if (o = n - i, o < 0)
          o += O, u = n, s = a[c = 0], l = q(s / w[i - u - 1] % 10);
        else if (c = he((o + 1) / O), c >= a.length)
          if (f) {
            for (; a.length <= c; a.push(0)) ;
            s = l = 0, i = 1, o %= O, u = o - O + 1;
          } else
            break e;
        else {
          for (s = r = a[c], i = 1; r >= 10; r /= 10, i++) ;
          o %= O, u = o - O + i, l = u < 0 ? 0 : q(s / w[i - u - 1] % 10);
        }
        if (f = f || n < 0 || // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
        a[c + 1] != null || (u < 0 ? s : s % w[i - u - 1]), f = t < 4 ? (l || f) && (t == 0 || t == (e.s < 0 ? 3 : 2)) : l > 5 || l == 5 && (t == 4 || f || t == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (o > 0 ? u > 0 ? s / w[i - u] : 0 : a[c - 1]) % 10 & 1 || t == (e.s < 0 ? 8 : 7)), n < 1 || !a[0])
          return a.length = 0, f ? (n -= e.e + 1, a[0] = w[(O - n % O) % O], e.e = -n || 0) : a[0] = e.e = 0, e;
        if (o == 0 ? (a.length = c, r = 1, c--) : (a.length = c + 1, r = w[O - o], a[c] = u > 0 ? q(s / w[i - u] % w[u]) * r : 0), f)
          for (; ; )
            if (c == 0) {
              for (o = 1, u = a[0]; u >= 10; u /= 10, o++) ;
              for (u = a[0] += r, r = 1; u >= 10; u /= 10, r++) ;
              o != r && (e.e++, a[0] == j && (a[0] = 1));
              break;
            } else {
              if (a[c] += r, a[c] != j) break;
              a[c--] = 0, r = 1;
            }
        for (o = a.length; a[--o] === 0; a.pop()) ;
      }
      e.e > H ? e.c = e.e = null : e.e < Y && (e.c = [e.e = 0]);
    }
    return e;
  }
  function X(e) {
    var n, t = e.e;
    return t === null ? e.toString() : (n = F(e.c), n = t <= I || t >= B ? ie(n, t) : V(n, t, "0"), e.s < 0 ? "-" + n : n);
  }
  return d.absoluteValue = d.abs = function() {
    var e = new g(this);
    return e.s < 0 && (e.s = 1), e;
  }, d.comparedTo = function(e, n) {
    return K(this, new g(e, n));
  }, d.decimalPlaces = d.dp = function(e, n) {
    var t, f, i, o = this;
    if (e != null)
      return _(e, 0, T), n == null ? n = S : _(n, 0, 8), U(new g(o), e + o.e + 1, n);
    if (!(t = o.c)) return null;
    if (f = ((i = t.length - 1) - G(this.e / O)) * O, i = t[i]) for (; i % 10 == 0; i /= 10, f--) ;
    return f < 0 && (f = 0), f;
  }, d.dividedBy = d.div = function(e, n) {
    return h(this, new g(e, n), A, S);
  }, d.dividedToIntegerBy = d.idiv = function(e, n) {
    return h(this, new g(e, n), 0, 1);
  }, d.exponentiatedBy = d.pow = function(e, n) {
    var t, f, i, o, u, r, s, c, l, a = this;
    if (e = new g(e), e.c && !e.isInteger())
      throw Error(D + "Exponent not an integer: " + X(e));
    if (n != null && (n = new g(n)), r = e.e > 14, !a.c || !a.c[0] || a.c[0] == 1 && !a.e && a.c.length == 1 || !e.c || !e.c[0])
      return l = new g(Math.pow(+X(a), r ? e.s * (2 - re(e)) : +X(e))), n ? l.mod(n) : l;
    if (s = e.s < 0, n) {
      if (n.c ? !n.c[0] : !n.s) return new g(NaN);
      f = !s && a.isInteger() && n.isInteger(), f && (a = a.mod(n));
    } else {
      if (e.e > 9 && (a.e > 0 || a.e < -1 || (a.e == 0 ? a.c[0] > 1 || r && a.c[1] >= 24e7 : a.c[0] < 8e13 || r && a.c[0] <= 9999975e7)))
        return o = a.s < 0 && re(e) ? -0 : 0, a.e > -1 && (o = 1 / o), new g(s ? 1 / o : o);
      W && (o = he(W / O + 2));
    }
    for (r ? (t = new g(0.5), s && (e.s = 1), c = re(e)) : (i = Math.abs(+X(e)), c = i % 2), l = new g(x); ; ) {
      if (c) {
        if (l = l.times(a), !l.c) break;
        o ? l.c.length > o && (l.c.length = o) : f && (l = l.mod(n));
      }
      if (i) {
        if (i = q(i / 2), i === 0) break;
        c = i % 2;
      } else if (e = e.times(t), U(e, e.e + 1, 1), e.e > 14)
        c = re(e);
      else {
        if (i = +X(e), i === 0) break;
        c = i % 2;
      }
      a = a.times(a), o ? a.c && a.c.length > o && (a.c.length = o) : f && (a = a.mod(n));
    }
    return f ? l : (s && (l = x.div(l)), n ? l.mod(n) : o ? U(l, W, S, u) : l);
  }, d.integerValue = function(e) {
    var n = new g(this);
    return e == null ? e = S : _(e, 0, 8), U(n, n.e + 1, e);
  }, d.isEqualTo = d.eq = function(e, n) {
    return K(this, new g(e, n)) === 0;
  }, d.isFinite = function() {
    return !!this.c;
  }, d.isGreaterThan = d.gt = function(e, n) {
    return K(this, new g(e, n)) > 0;
  }, d.isGreaterThanOrEqualTo = d.gte = function(e, n) {
    return (n = K(this, new g(e, n))) === 1 || n === 0;
  }, d.isInteger = function() {
    return !!this.c && G(this.e / O) > this.c.length - 2;
  }, d.isLessThan = d.lt = function(e, n) {
    return K(this, new g(e, n)) < 0;
  }, d.isLessThanOrEqualTo = d.lte = function(e, n) {
    return (n = K(this, new g(e, n))) === -1 || n === 0;
  }, d.isNaN = function() {
    return !this.s;
  }, d.isNegative = function() {
    return this.s < 0;
  }, d.isPositive = function() {
    return this.s > 0;
  }, d.isZero = function() {
    return !!this.c && this.c[0] == 0;
  }, d.minus = function(e, n) {
    var t, f, i, o, u = this, r = u.s;
    if (e = new g(e, n), n = e.s, !r || !n) return new g(NaN);
    if (r != n)
      return e.s = -n, u.plus(e);
    var s = u.e / O, c = e.e / O, l = u.c, a = e.c;
    if (!s || !c) {
      if (!l || !a) return l ? (e.s = -n, e) : new g(a ? u : NaN);
      if (!l[0] || !a[0])
        return a[0] ? (e.s = -n, e) : new g(l[0] ? u : (
          // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          S == 3 ? -0 : 0
        ));
    }
    if (s = G(s), c = G(c), l = l.slice(), r = s - c) {
      for ((o = r < 0) ? (r = -r, i = l) : (c = s, i = a), i.reverse(), n = r; n--; i.push(0)) ;
      i.reverse();
    } else
      for (f = (o = (r = l.length) < (n = a.length)) ? r : n, r = n = 0; n < f; n++)
        if (l[n] != a[n]) {
          o = l[n] < a[n];
          break;
        }
    if (o && (i = l, l = a, a = i, e.s = -e.s), n = (f = a.length) - (t = l.length), n > 0) for (; n--; l[t++] = 0) ;
    for (n = j - 1; f > r; ) {
      if (l[--f] < a[f]) {
        for (t = f; t && !l[--t]; l[t] = n) ;
        --l[t], l[f] += j;
      }
      l[f] -= a[f];
    }
    for (; l[0] == 0; l.splice(0, 1), --c) ;
    return l[0] ? ce(e, l, c) : (e.s = S == 3 ? -1 : 1, e.c = [e.e = 0], e);
  }, d.modulo = d.mod = function(e, n) {
    var t, f, i = this;
    return e = new g(e, n), !i.c || !e.s || e.c && !e.c[0] ? new g(NaN) : !e.c || i.c && !i.c[0] ? new g(i) : (ee == 9 ? (f = e.s, e.s = 1, t = h(i, e, 0, 3), e.s = f, t.s *= f) : t = h(i, e, 0, ee), e = i.minus(t.times(e)), !e.c[0] && ee == 1 && (e.s = i.s), e);
  }, d.multipliedBy = d.times = function(e, n) {
    var t, f, i, o, u, r, s, c, l, a, w, E, v, y, R, k = this, M = k.c, C = (e = new g(e, n)).c;
    if (!M || !C || !M[0] || !C[0])
      return !k.s || !e.s || M && !M[0] && !C || C && !C[0] && !M ? e.c = e.e = e.s = null : (e.s *= k.s, !M || !C ? e.c = e.e = null : (e.c = [0], e.e = 0)), e;
    for (f = G(k.e / O) + G(e.e / O), e.s *= k.s, s = M.length, a = C.length, s < a && (v = M, M = C, C = v, i = s, s = a, a = i), i = s + a, v = []; i--; v.push(0)) ;
    for (y = j, R = J, i = a; --i >= 0; ) {
      for (t = 0, w = C[i] % R, E = C[i] / R | 0, u = s, o = i + u; o > i; )
        c = M[--u] % R, l = M[u] / R | 0, r = E * c + l * w, c = w * c + r % R * R + v[o] + t, t = (c / y | 0) + (r / R | 0) + E * l, v[o--] = c % y;
      v[o] = t;
    }
    return t ? ++f : v.splice(0, 1), ce(e, v, f);
  }, d.negated = function() {
    var e = new g(this);
    return e.s = -e.s || null, e;
  }, d.plus = function(e, n) {
    var t, f = this, i = f.s;
    if (e = new g(e, n), n = e.s, !i || !n) return new g(NaN);
    if (i != n)
      return e.s = -n, f.minus(e);
    var o = f.e / O, u = e.e / O, r = f.c, s = e.c;
    if (!o || !u) {
      if (!r || !s) return new g(i / 0);
      if (!r[0] || !s[0]) return s[0] ? e : new g(r[0] ? f : i * 0);
    }
    if (o = G(o), u = G(u), r = r.slice(), i = o - u) {
      for (i > 0 ? (u = o, t = s) : (i = -i, t = r), t.reverse(); i--; t.push(0)) ;
      t.reverse();
    }
    for (i = r.length, n = s.length, i - n < 0 && (t = s, s = r, r = t, n = i), i = 0; n; )
      i = (r[--n] = r[n] + s[n] + i) / j | 0, r[n] = j === r[n] ? 0 : r[n] % j;
    return i && (r = [i].concat(r), ++u), ce(e, r, u);
  }, d.precision = d.sd = function(e, n) {
    var t, f, i, o = this;
    if (e != null && e !== !!e)
      return _(e, 1, T), n == null ? n = S : _(n, 0, 8), U(new g(o), e, n);
    if (!(t = o.c)) return null;
    if (i = t.length - 1, f = i * O + 1, i = t[i]) {
      for (; i % 10 == 0; i /= 10, f--) ;
      for (i = t[0]; i >= 10; i /= 10, f++) ;
    }
    return e && o.e + 1 > f && (f = o.e + 1), f;
  }, d.shiftedBy = function(e) {
    return _(e, -pe, pe), this.times("1e" + e);
  }, d.squareRoot = d.sqrt = function() {
    var e, n, t, f, i, o = this, u = o.c, r = o.s, s = o.e, c = A + 4, l = new g("0.5");
    if (r !== 1 || !u || !u[0])
      return new g(!r || r < 0 && (!u || u[0]) ? NaN : u ? o : 1 / 0);
    if (r = Math.sqrt(+X(o)), r == 0 || r == 1 / 0 ? (n = F(u), (n.length + s) % 2 == 0 && (n += "0"), r = Math.sqrt(+n), s = G((s + 1) / 2) - (s < 0 || s % 2), r == 1 / 0 ? n = "5e" + s : (n = r.toExponential(), n = n.slice(0, n.indexOf("e") + 1) + s), t = new g(n)) : t = new g(r + ""), t.c[0]) {
      for (s = t.e, r = s + c, r < 3 && (r = 0); ; )
        if (i = t, t = l.times(i.plus(h(o, i, c, 1))), F(i.c).slice(0, r) === (n = F(t.c)).slice(0, r))
          if (t.e < s && --r, n = n.slice(r - 3, r + 1), n == "9999" || !f && n == "4999") {
            if (!f && (U(i, i.e + A + 2, 0), i.times(i).eq(o))) {
              t = i;
              break;
            }
            c += 4, r += 4, f = 1;
          } else {
            (!+n || !+n.slice(1) && n.charAt(0) == "5") && (U(t, t.e + A + 2, 1), e = !t.times(t).eq(o));
            break;
          }
    }
    return U(t, t.e + A + 1, S, e);
  }, d.toExponential = function(e, n) {
    return e != null && (_(e, 0, T), e++), fe(this, e, n, 1);
  }, d.toFixed = function(e, n) {
    return e != null && (_(e, 0, T), e = e + this.e + 1), fe(this, e, n);
  }, d.toFormat = function(e, n, t) {
    var f, i = this;
    if (t == null)
      e != null && n && typeof n == "object" ? (t = n, n = null) : e && typeof e == "object" ? (t = e, e = n = null) : t = oe;
    else if (typeof t != "object")
      throw Error(D + "Argument not an object: " + t);
    if (f = i.toFixed(e, n), i.c) {
      var o, u = f.split("."), r = +t.groupSize, s = +t.secondaryGroupSize, c = t.groupSeparator || "", l = u[0], a = u[1], w = i.s < 0, E = w ? l.slice(1) : l, v = E.length;
      if (s && (o = r, r = s, s = o, v -= o), r > 0 && v > 0) {
        for (o = v % r || r, l = E.substr(0, o); o < v; o += r) l += c + E.substr(o, r);
        s > 0 && (l += c + E.slice(o)), w && (l = "-" + l);
      }
      f = a ? l + (t.decimalSeparator || "") + ((s = +t.fractionGroupSize) ? a.replace(
        new RegExp("\\d{" + s + "}\\B", "g"),
        "$&" + (t.fractionGroupSeparator || "")
      ) : a) : l;
    }
    return (t.prefix || "") + f + (t.suffix || "");
  }, d.toFraction = function(e) {
    var n, t, f, i, o, u, r, s, c, l, a, w, E = this, v = E.c;
    if (e != null && (r = new g(e), !r.isInteger() && (r.c || r.s !== 1) || r.lt(x)))
      throw Error(D + "Argument " + (r.isInteger() ? "out of range: " : "not an integer: ") + X(r));
    if (!v) return new g(E);
    for (n = new g(x), c = t = new g(x), f = s = new g(x), w = F(v), o = n.e = w.length - E.e - 1, n.c[0] = de[(u = o % O) < 0 ? O + u : u], e = !e || r.comparedTo(n) > 0 ? o > 0 ? n : c : r, u = H, H = 1 / 0, r = new g(w), s.c[0] = 0; l = h(r, n, 0, 1), i = t.plus(l.times(f)), i.comparedTo(e) != 1; )
      t = f, f = i, c = s.plus(l.times(i = c)), s = i, n = r.minus(l.times(i = n)), r = i;
    return i = h(e.minus(t), f, 0, 1), s = s.plus(i.times(c)), t = t.plus(i.times(f)), s.s = c.s = E.s, o = o * 2, a = h(c, f, o, S).minus(E).abs().comparedTo(
      h(s, t, o, S).minus(E).abs()
    ) < 1 ? [c, f] : [s, t], H = u, a;
  }, d.toNumber = function() {
    return +X(this);
  }, d.toPrecision = function(e, n) {
    return e != null && _(e, 1, T), fe(this, e, n, 2);
  }, d.toString = function(e) {
    var n, t = this, f = t.s, i = t.e;
    return i === null ? f ? (n = "Infinity", f < 0 && (n = "-" + n)) : n = "NaN" : (e == null ? n = i <= I || i >= B ? ie(F(t.c), i) : V(F(t.c), i, "0") : e === 10 && le ? (t = U(new g(t), A + i + 1, S), n = V(F(t.c), t.e, "0")) : (_(e, 2, Q.length, "Base"), n = m(V(F(t.c), i, "0"), 10, e, f, !0)), f < 0 && t.c[0] && (n = "-" + n)), n;
  }, d.valueOf = d.toJSON = function() {
    return X(this);
  }, d._isBigNumber = !0, d[Symbol.toStringTag] = "BigNumber", d[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = d.valueOf, p != null && g.set(p), g;
}
function G(p) {
  var h = p | 0;
  return p > 0 || p === h ? h : h - 1;
}
function F(p) {
  for (var h, m, N = 1, d = p.length, x = p[0] + ""; N < d; ) {
    for (h = p[N++] + "", m = O - h.length; m--; h = "0" + h) ;
    x += h;
  }
  for (d = x.length; x.charCodeAt(--d) === 48; ) ;
  return x.slice(0, d + 1 || 1);
}
function K(p, h) {
  var m, N, d = p.c, x = h.c, A = p.s, S = h.s, I = p.e, B = h.e;
  if (!A || !S) return null;
  if (m = d && !d[0], N = x && !x[0], m || N) return m ? N ? 0 : -S : A;
  if (A != S) return A;
  if (m = A < 0, N = I == B, !d || !x) return N ? 0 : !d ^ m ? 1 : -1;
  if (!N) return I > B ^ m ? 1 : -1;
  for (S = (I = d.length) < (B = x.length) ? I : B, A = 0; A < S; A++) if (d[A] != x[A]) return d[A] > x[A] ^ m ? 1 : -1;
  return I == B ? 0 : I > B ^ m ? 1 : -1;
}
function _(p, h, m, N) {
  if (p < h || p > m || p !== q(p))
    throw Error(D + (N || "Argument") + (typeof p == "number" ? p < h || p > m ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(p));
}
function re(p) {
  var h = p.c.length - 1;
  return G(p.e / O) == h && p.c[h] % 2 != 0;
}
function ie(p, h) {
  return (p.length > 1 ? p.charAt(0) + "." + p.slice(1) : p) + (h < 0 ? "e" : "e+") + h;
}
function V(p, h, m) {
  var N, d;
  if (h < 0) {
    for (d = m + "."; ++h; d += m) ;
    p = d + p;
  } else if (N = p.length, ++h > N) {
    for (d = m, h -= N; --h; d += m) ;
    p += d;
  } else h < N && (p = p.slice(0, h) + "." + p.slice(h));
  return p;
}
ve();
function Ie(p, h) {
  return function(...m) {
    return h.call(this, p, ...m);
  };
}
function Ke(p) {
  return p;
}
function me(p, h) {
  p.options.highlight ? p.options.highlight = Ie(p.options.highlight, (m, ...N) => h(...N) || m(...N)) : p.options.highlight = h;
}
const Be = b(async () => (await Oe(
  "https://cdn.jsdelivr.net/npm/emoji-js@3.9.0/lib/emoji.min.js"
), new window.EmojiConvertor())), Ce = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let ge;
function Le(p) {
  const h = p.src[p.pos] === ":" && p.src.slice(p.pos).match(Ce);
  if (!h) return !1;
  const [m] = h;
  return p.pending += ge.replace_colons(m), p.pos += m.length, !0;
}
const Ae = {
  name: "emoji",
  async preload() {
    ge = await Be(), ge.replace_mode = "unified";
  },
  markdown: (p) => {
    p.inline.ruler.push("emoji", Le);
  }
}, De = (p, { enableFeature: h }) => {
  me(p, (m, N) => N === "mermaid" ? (h(), '<pre class="mermaid">' + ke(m) + "</pre>") : "");
}, Ue = b(async () => {
  const { default: p } = await import("https://cdn.jsdelivr.net/npm/mermaid@11.12.2/dist/mermaid.esm.min.mjs"), h = window.matchMedia("(prefers-color-scheme: dark)");
  return p.initialize({
    startOnLoad: !1,
    theme: h.matches ? "dark" : "default"
  }), p;
});
async function $e(p) {
  const h = p.querySelectorAll("pre.mermaid");
  if (!h.length) return;
  await (await Ue()).run({
    nodes: h
  });
}
const Me = {
  name: "mermaid",
  markdown: De,
  onMounted: $e
}, Ne = {
  lang: "text",
  themes: {
    light: "min-light",
    dark: "tokyo-night"
  },
  defaultColor: !1,
  transformers: [
    {
      pre(p) {
        delete p.properties.style;
      }
    }
  ]
}, Fe = `.shiki span {
  color: var(--shiki-light, inherit);
  background-color: var(--shiki-light-bg, inherit);
  font-style: var(--shiki-light-font-style, inherit);
  font-weight: var(--shiki-light-font-weight, inherit);
  text-decoration: var(--shiki-light-text-decoration, inherit);
}
@media (prefers-color-scheme: dark) {
  .shiki span {
    color: var(--shiki-dark, inherit);
    background-color: var(--shiki-dark-bg, inherit);
    font-style: var(--shiki-dark-font-style, inherit);
    font-weight: var(--shiki-dark-font-weight, inherit);
    text-decoration: var(--shiki-dark-text-decoration, inherit);
  }
}`, xe = b(() => {
  const p = document.createElement("style");
  p.textContent = Fe, document.head.append(p);
}), Se = b(async () => {
  const { codeToHtml: p } = await import("https://cdn.jsdelivr.net/npm/shiki@3.20.0/+esm");
  return p;
}), qe = async () => {
  xe(), await Se();
}, Ge = (p, { enableFeature: h }) => {
  me(p, () => (h(), ""));
}, He = async (p) => {
  xe();
  const h = p.querySelectorAll("pre:not(.shiki)>code");
  if (!h.length) return;
  const m = await Se();
  h.forEach(async (N) => {
    const d = N.parentNode, x = N.className.match(/^language-(\S+)$/)?.[1], A = N.textContent;
    if (!d || !x || !A) return;
    d.classList.add("shiki");
    let S;
    try {
      S = await m(A, {
        ...Ne,
        lang: x
      });
    } catch {
      S = await m(A, Ne);
    }
    const I = document.createElement("div");
    I.innerHTML = S;
    const B = I.firstElementChild;
    B?.tagName === "PRE" && B.classList.contains("shiki") && d.replaceWith(B);
  });
}, _e = {
  name: "shiki",
  preload: qe,
  markdown: Ge,
  onMounted: He
}, je = (p, { enableFeature: h }) => {
  me(p, (m, N, d) => N === "vega" ? (h(), `<div class="vega">${ke(m)}</div>`) : "");
}, ze = b(
  () => Oe(
    "https://cdn.jsdelivr.net/combine/npm/vega@6.2.0,npm/vega-lite@6.4.1,npm/vega-embed@7.1.0"
  )
);
async function Xe(p) {
  const h = p.querySelectorAll(".vega:not([data-processed])");
  h.length && (await ze(), h.forEach((m) => {
    const N = m.textContent;
    m.dataset.processed = "true";
    const d = document.createElement("div");
    d.style.width = "100%", m.append(d), window.vegaEmbed(d, N);
  }));
}
const ye = {
  name: "vega",
  markdown: je,
  onMounted: Xe
}, be = {
  emoji: Ae,
  mermaid: Me,
  shiki: _e,
  vega: ye
}, se = [Ae, _e, ye, Me];
async function Pe(p = se) {
  await Promise.all(p.map((h) => h.preload?.()));
}
async function Re(p, h = se) {
  await Promise.all(h.map((m) => m.onMounted?.(p)));
}
let Ve = class {
  constructor(h) {
    this.plugins = h;
  }
  static async create(h = se) {
    return await Pe(h), new this(h);
  }
  render(h) {
    return {
      html: h,
      plugins: this.plugins,
      onMounted: (m) => this.process(m)
    };
  }
  process(h, m = this.plugins) {
  }
};
class nn extends Ve {
  process(h, m = this.plugins) {
    Re(h, m);
  }
}
const We = b(async () => import("./markdown-it-CWWnOdsP.js"));
let Je = class {
  constructor(h, m) {
    this.plugins = h, this.md = m, h.forEach(({ name: N, markdown: d }) => {
      d && this.md.use(d, {
        enableFeature: () => this.enableFeature(N)
      });
    });
  }
  features = {};
  static async create(h = se) {
    const [{ initMarkdownIt: m }] = await Promise.all([
      We(),
      Pe(h)
    ]);
    return new this(h, m());
  }
  enableFeature(h) {
    this.features[h] = !0;
  }
  render(h) {
    this.features = {};
    const m = this.md.render(h), N = this.plugins.filter(
      ({ name: d, always: x }) => x || this.features[d]
    );
    return {
      html: m,
      plugins: N,
      onMounted: (d) => this.process(d, N)
    };
  }
  process(h, m = this.plugins) {
  }
};
async function rn(p) {
  let h;
  const m = p.startsWith(`---
`) ? p.indexOf(`
---
`) : -1;
  if (m > 0) {
    const N = p.slice(4, m), { parse: d } = await import("https://cdn.jsdelivr.net/npm/yaml@2.8.2/+esm");
    try {
      h = d(N);
    } catch {
    }
    const x = m + 5;
    p = p.slice(x);
  }
  return { content: p, frontmatter: h };
}
class Ye extends Je {
  process(h, m = this.plugins) {
    Re(h, m);
  }
}
async function sn({ content: p }, h) {
  const m = await Ye.create(), { html: N, onMounted: d } = m.render(p);
  h && (h.innerHTML = N, d(h));
}
export {
  nn as HtmlRenderer,
  Ye as MarkdownRenderer,
  se as builtInPlugins,
  Ke as definePlugin,
  We as loadMarkdownIt,
  rn as parseFrontmatter,
  me as patchHighlight,
  be as pluginMap,
  Re as pluginMounted,
  Pe as pluginPreload,
  sn as renderMarkdown
};
