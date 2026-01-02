import { once as we, noop as Se } from "https://cdn.jsdelivr.net/npm/es-toolkit@1.43.0/+esm";
import { safeHtml as Oe } from "./util.js";
var Pe = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i, ae = Math.ceil, q = Math.floor, C = "[BigNumber Error] ", Ee = C + "Number primitive has more than 15 significant digits: ", z = 1e14, O = 14, he = 9007199254740991, pe = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13], Y = 1e7, R = 1e9;
function Ne(h) {
  var p, E, N, w = g.prototype = { constructor: g, toString: null, valueOf: null }, M = new g(1), x = 20, S = 4, L = -7, y = 21, Z = -1e7, H = 1e7, J = !1, b = 1, W = 0, se = {
    prefix: "",
    groupSize: 3,
    secondaryGroupSize: 0,
    groupSeparator: ",",
    decimalSeparator: ".",
    fractionGroupSize: 0,
    fractionGroupSeparator: " ",
    // non-breaking space
    suffix: ""
  }, Q = "0123456789abcdefghijklmnopqrstuvwxyz", fe = !0;
  function g(e, r) {
    var i, l, t, f, u, n, s, c, o = this;
    if (!(o instanceof g)) return new g(e, r);
    if (r == null) {
      if (e && e._isBigNumber === !0) {
        o.s = e.s, !e.c || e.e > H ? o.c = o.e = null : e.e < Z ? o.c = [o.e = 0] : (o.e = e.e, o.c = e.c.slice());
        return;
      }
      if ((n = typeof e == "number") && e * 0 == 0) {
        if (o.s = 1 / e < 0 ? (e = -e, -1) : 1, e === ~~e) {
          for (f = 0, u = e; u >= 10; u /= 10, f++) ;
          f > H ? o.c = o.e = null : (o.e = f, o.c = [e]);
          return;
        }
        c = String(e);
      } else {
        if (!Pe.test(c = String(e))) return N(o, c, n);
        o.s = c.charCodeAt(0) == 45 ? (c = c.slice(1), -1) : 1;
      }
      (f = c.indexOf(".")) > -1 && (c = c.replace(".", "")), (u = c.search(/e/i)) > 0 ? (f < 0 && (f = u), f += +c.slice(u + 1), c = c.substring(0, u)) : f < 0 && (f = c.length);
    } else {
      if (k(r, 2, Q.length, "Base"), r == 10 && fe)
        return o = new g(e), U(o, x + o.e + 1, S);
      if (c = String(e), n = typeof e == "number") {
        if (e * 0 != 0) return N(o, c, n, r);
        if (o.s = 1 / e < 0 ? (c = c.slice(1), -1) : 1, g.DEBUG && c.replace(/^0\.0*|\./, "").length > 15)
          throw Error(Ee + e);
      } else
        o.s = c.charCodeAt(0) === 45 ? (c = c.slice(1), -1) : 1;
      for (i = Q.slice(0, r), f = u = 0, s = c.length; u < s; u++)
        if (i.indexOf(l = c.charAt(u)) < 0) {
          if (l == ".") {
            if (u > f) {
              f = s;
              continue;
            }
          } else if (!t && (c == c.toUpperCase() && (c = c.toLowerCase()) || c == c.toLowerCase() && (c = c.toUpperCase()))) {
            t = !0, u = -1, f = 0;
            continue;
          }
          return N(o, String(e), n, r);
        }
      n = !1, c = E(c, r, 10, o.s), (f = c.indexOf(".")) > -1 ? c = c.replace(".", "") : f = c.length;
    }
    for (u = 0; c.charCodeAt(u) === 48; u++) ;
    for (s = c.length; c.charCodeAt(--s) === 48; ) ;
    if (c = c.slice(u, ++s)) {
      if (s -= u, n && g.DEBUG && s > 15 && (e > he || e !== q(e)))
        throw Error(Ee + o.s * e);
      if ((f = f - u - 1) > H)
        o.c = o.e = null;
      else if (f < Z)
        o.c = [o.e = 0];
      else {
        if (o.e = f, o.c = [], u = (f + 1) % O, f < 0 && (u += O), u < s) {
          for (u && o.c.push(+c.slice(0, u)), s -= O; u < s; )
            o.c.push(+c.slice(u, u += O));
          u = O - (c = c.slice(u)).length;
        } else
          u -= s;
        for (; u--; c += "0") ;
        o.c.push(+c);
      }
    } else
      o.c = [o.e = 0];
  }
  g.clone = Ne, g.ROUND_UP = 0, g.ROUND_DOWN = 1, g.ROUND_CEIL = 2, g.ROUND_FLOOR = 3, g.ROUND_HALF_UP = 4, g.ROUND_HALF_DOWN = 5, g.ROUND_HALF_EVEN = 6, g.ROUND_HALF_CEIL = 7, g.ROUND_HALF_FLOOR = 8, g.EUCLID = 9, g.config = g.set = function(e) {
    var r, i;
    if (e != null)
      if (typeof e == "object") {
        if (e.hasOwnProperty(r = "DECIMAL_PLACES") && (i = e[r], k(i, 0, R, r), x = i), e.hasOwnProperty(r = "ROUNDING_MODE") && (i = e[r], k(i, 0, 8, r), S = i), e.hasOwnProperty(r = "EXPONENTIAL_AT") && (i = e[r], i && i.pop ? (k(i[0], -R, 0, r), k(i[1], 0, R, r), L = i[0], y = i[1]) : (k(i, -R, R, r), L = -(y = i < 0 ? -i : i))), e.hasOwnProperty(r = "RANGE"))
          if (i = e[r], i && i.pop)
            k(i[0], -R, -1, r), k(i[1], 1, R, r), Z = i[0], H = i[1];
          else if (k(i, -R, R, r), i)
            Z = -(H = i < 0 ? -i : i);
          else
            throw Error(C + r + " cannot be zero: " + i);
        if (e.hasOwnProperty(r = "CRYPTO"))
          if (i = e[r], i === !!i)
            if (i)
              if (typeof crypto < "u" && crypto && (crypto.getRandomValues || crypto.randomBytes))
                J = i;
              else
                throw J = !i, Error(C + "crypto unavailable");
            else
              J = i;
          else
            throw Error(C + r + " not true or false: " + i);
        if (e.hasOwnProperty(r = "MODULO_MODE") && (i = e[r], k(i, 0, 9, r), b = i), e.hasOwnProperty(r = "POW_PRECISION") && (i = e[r], k(i, 0, R, r), W = i), e.hasOwnProperty(r = "FORMAT"))
          if (i = e[r], typeof i == "object") se = i;
          else throw Error(C + r + " not an object: " + i);
        if (e.hasOwnProperty(r = "ALPHABET"))
          if (i = e[r], typeof i == "string" && !/^.?$|[+\-.\s]|(.).*\1/.test(i))
            fe = i.slice(0, 10) == "0123456789", Q = i;
          else
            throw Error(C + r + " invalid: " + i);
      } else
        throw Error(C + "Object expected: " + e);
    return {
      DECIMAL_PLACES: x,
      ROUNDING_MODE: S,
      EXPONENTIAL_AT: [L, y],
      RANGE: [Z, H],
      CRYPTO: J,
      MODULO_MODE: b,
      POW_PRECISION: W,
      FORMAT: se,
      ALPHABET: Q
    };
  }, g.isBigNumber = function(e) {
    if (!e || e._isBigNumber !== !0) return !1;
    if (!g.DEBUG) return !0;
    var r, i, l = e.c, t = e.e, f = e.s;
    e: if ({}.toString.call(l) == "[object Array]") {
      if ((f === 1 || f === -1) && t >= -R && t <= R && t === q(t)) {
        if (l[0] === 0) {
          if (t === 0 && l.length === 1) return !0;
          break e;
        }
        if (r = (t + 1) % O, r < 1 && (r += O), String(l[0]).length == r) {
          for (r = 0; r < l.length; r++)
            if (i = l[r], i < 0 || i >= z || i !== q(i)) break e;
          if (i !== 0) return !0;
        }
      }
    } else if (l === null && t === null && (f === null || f === 1 || f === -1))
      return !0;
    throw Error(C + "Invalid BigNumber: " + e);
  }, g.maximum = g.max = function() {
    return de(arguments, -1);
  }, g.minimum = g.min = function() {
    return de(arguments, 1);
  }, g.random = (function() {
    var e = 9007199254740992, r = Math.random() * e & 2097151 ? function() {
      return q(Math.random() * e);
    } : function() {
      return (Math.random() * 1073741824 | 0) * 8388608 + (Math.random() * 8388608 | 0);
    };
    return function(i) {
      var l, t, f, u, n, s = 0, c = [], o = new g(M);
      if (i == null ? i = x : k(i, 0, R), u = ae(i / O), J)
        if (crypto.getRandomValues) {
          for (l = crypto.getRandomValues(new Uint32Array(u *= 2)); s < u; )
            n = l[s] * 131072 + (l[s + 1] >>> 11), n >= 9e15 ? (t = crypto.getRandomValues(new Uint32Array(2)), l[s] = t[0], l[s + 1] = t[1]) : (c.push(n % 1e14), s += 2);
          s = u / 2;
        } else if (crypto.randomBytes) {
          for (l = crypto.randomBytes(u *= 7); s < u; )
            n = (l[s] & 31) * 281474976710656 + l[s + 1] * 1099511627776 + l[s + 2] * 4294967296 + l[s + 3] * 16777216 + (l[s + 4] << 16) + (l[s + 5] << 8) + l[s + 6], n >= 9e15 ? crypto.randomBytes(7).copy(l, s) : (c.push(n % 1e14), s += 7);
          s = u / 7;
        } else
          throw J = !1, Error(C + "crypto unavailable");
      if (!J)
        for (; s < u; )
          n = r(), n < 9e15 && (c[s++] = n % 1e14);
      for (u = c[--s], i %= O, u && i && (n = pe[O - i], c[s] = q(u / n) * n); c[s] === 0; c.pop(), s--) ;
      if (s < 0)
        c = [f = 0];
      else {
        for (f = -1; c[0] === 0; c.splice(0, 1), f -= O) ;
        for (s = 1, n = c[0]; n >= 10; n /= 10, s++) ;
        s < O && (f -= O - s);
      }
      return o.e = f, o.c = c, o;
    };
  })(), g.sum = function() {
    for (var e = 1, r = arguments, i = new g(r[0]); e < r.length; ) i = i.plus(r[e++]);
    return i;
  }, E = /* @__PURE__ */ (function() {
    var e = "0123456789";
    function r(i, l, t, f) {
      for (var u, n = [0], s, c = 0, o = i.length; c < o; ) {
        for (s = n.length; s--; n[s] *= l) ;
        for (n[0] += f.indexOf(i.charAt(c++)), u = 0; u < n.length; u++)
          n[u] > t - 1 && (n[u + 1] == null && (n[u + 1] = 0), n[u + 1] += n[u] / t | 0, n[u] %= t);
      }
      return n.reverse();
    }
    return function(i, l, t, f, u) {
      var n, s, c, o, a, m, d, _, P = i.indexOf("."), B = x, A = S;
      for (P >= 0 && (o = W, W = 0, i = i.replace(".", ""), _ = new g(l), m = _.pow(i.length - P), W = o, _.c = r(
        V(G(m.c), m.e, "0"),
        10,
        t,
        e
      ), _.e = _.c.length), d = r(i, l, t, u ? (n = Q, e) : (n = e, Q)), c = o = d.length; d[--o] == 0; d.pop()) ;
      if (!d[0]) return n.charAt(0);
      if (P < 0 ? --c : (m.c = d, m.e = c, m.s = f, m = p(m, _, B, A, t), d = m.c, a = m.r, c = m.e), s = c + B + 1, P = d[s], o = t / 2, a = a || s < 0 || d[s + 1] != null, a = A < 4 ? (P != null || a) && (A == 0 || A == (m.s < 0 ? 3 : 2)) : P > o || P == o && (A == 4 || a || A == 6 && d[s - 1] & 1 || A == (m.s < 0 ? 8 : 7)), s < 1 || !d[0])
        i = a ? V(n.charAt(1), -B, n.charAt(0)) : n.charAt(0);
      else {
        if (d.length = s, a)
          for (--t; ++d[--s] > t; )
            d[s] = 0, s || (++c, d = [1].concat(d));
        for (o = d.length; !d[--o]; ) ;
        for (P = 0, i = ""; P <= o; i += n.charAt(d[P++])) ;
        i = V(i, c, n.charAt(0));
      }
      return i;
    };
  })(), p = /* @__PURE__ */ (function() {
    function e(l, t, f) {
      var u, n, s, c, o = 0, a = l.length, m = t % Y, d = t / Y | 0;
      for (l = l.slice(); a--; )
        s = l[a] % Y, c = l[a] / Y | 0, u = d * s + c * m, n = m * s + u % Y * Y + o, o = (n / f | 0) + (u / Y | 0) + d * c, l[a] = n % f;
      return o && (l = [o].concat(l)), l;
    }
    function r(l, t, f, u) {
      var n, s;
      if (f != u)
        s = f > u ? 1 : -1;
      else
        for (n = s = 0; n < f; n++)
          if (l[n] != t[n]) {
            s = l[n] > t[n] ? 1 : -1;
            break;
          }
      return s;
    }
    function i(l, t, f, u) {
      for (var n = 0; f--; )
        l[f] -= n, n = l[f] < t[f] ? 1 : 0, l[f] = n * u + l[f] - t[f];
      for (; !l[0] && l.length > 1; l.splice(0, 1)) ;
    }
    return function(l, t, f, u, n) {
      var s, c, o, a, m, d, _, P, B, A, v, T, re, ce, ue, X, ee, F = l.s == t.s ? 1 : -1, D = l.c, I = t.c;
      if (!D || !D[0] || !I || !I[0])
        return new g(
          // Return NaN if either NaN, or both Infinity or 0.
          !l.s || !t.s || (D ? I && D[0] == I[0] : !I) ? NaN : (
            // Return ±0 if x is ±0 or y is ±Infinity, or return ±Infinity as y is ±0.
            D && D[0] == 0 || !I ? F * 0 : F / 0
          )
        );
      for (P = new g(F), B = P.c = [], c = l.e - t.e, F = f + c + 1, n || (n = z, c = $(l.e / O) - $(t.e / O), F = F / O | 0), o = 0; I[o] == (D[o] || 0); o++) ;
      if (I[o] > (D[o] || 0) && c--, F < 0)
        B.push(1), a = !0;
      else {
        for (ce = D.length, X = I.length, o = 0, F += 2, m = q(n / (I[0] + 1)), m > 1 && (I = e(I, m, n), D = e(D, m, n), X = I.length, ce = D.length), re = X, A = D.slice(0, X), v = A.length; v < X; A[v++] = 0) ;
        ee = I.slice(), ee = [0].concat(ee), ue = I[0], I[1] >= n / 2 && ue++;
        do {
          if (m = 0, s = r(I, A, X, v), s < 0) {
            if (T = A[0], X != v && (T = T * n + (A[1] || 0)), m = q(T / ue), m > 1)
              for (m >= n && (m = n - 1), d = e(I, m, n), _ = d.length, v = A.length; r(d, A, _, v) == 1; )
                m--, i(d, X < _ ? ee : I, _, n), _ = d.length, s = 1;
            else
              m == 0 && (s = m = 1), d = I.slice(), _ = d.length;
            if (_ < v && (d = [0].concat(d)), i(A, d, v, n), v = A.length, s == -1)
              for (; r(I, A, X, v) < 1; )
                m++, i(A, X < v ? ee : I, v, n), v = A.length;
          } else s === 0 && (m++, A = [0]);
          B[o++] = m, A[0] ? A[v++] = D[re] || 0 : (A = [D[re]], v = 1);
        } while ((re++ < ce || A[0] != null) && F--);
        a = A[0] != null, B[0] || B.splice(0, 1);
      }
      if (n == z) {
        for (o = 1, F = B[0]; F >= 10; F /= 10, o++) ;
        U(P, f + (P.e = o + c * O - 1) + 1, u, a);
      } else
        P.e = c, P.r = +a;
      return P;
    };
  })();
  function oe(e, r, i, l) {
    var t, f, u, n, s;
    if (i == null ? i = S : k(i, 0, 8), !e.c) return e.toString();
    if (t = e.c[0], u = e.e, r == null)
      s = G(e.c), s = l == 1 || l == 2 && (u <= L || u >= y) ? ne(s, u) : V(s, u, "0");
    else if (e = U(new g(e), r, i), f = e.e, s = G(e.c), n = s.length, l == 1 || l == 2 && (r <= f || f <= L)) {
      for (; n < r; s += "0", n++) ;
      s = ne(s, f);
    } else if (r -= u + (l === 2 && f > u), s = V(s, f, "0"), f + 1 > n) {
      if (--r > 0) for (s += "."; r--; s += "0") ;
    } else if (r += f - n, r > 0)
      for (f + 1 == n && (s += "."); r--; s += "0") ;
    return e.s < 0 && t ? "-" + s : s;
  }
  function de(e, r) {
    for (var i, l, t = 1, f = new g(e[0]); t < e.length; t++)
      l = new g(e[t]), (!l.s || (i = K(f, l)) === r || i === 0 && f.s === r) && (f = l);
    return f;
  }
  function le(e, r, i) {
    for (var l = 1, t = r.length; !r[--t]; r.pop()) ;
    for (t = r[0]; t >= 10; t /= 10, l++) ;
    return (i = l + i * O - 1) > H ? e.c = e.e = null : i < Z ? e.c = [e.e = 0] : (e.e = i, e.c = r), e;
  }
  N = /* @__PURE__ */ (function() {
    var e = /^(-?)0([xbo])(?=\w[\w.]*$)/i, r = /^([^.]+)\.$/, i = /^\.([^.]+)$/, l = /^-?(Infinity|NaN)$/, t = /^\s*\+(?=[\w.])|^\s+|\s+$/g;
    return function(f, u, n, s) {
      var c, o = n ? u : u.replace(t, "");
      if (l.test(o))
        f.s = isNaN(o) ? null : o < 0 ? -1 : 1;
      else {
        if (!n && (o = o.replace(e, function(a, m, d) {
          return c = (d = d.toLowerCase()) == "x" ? 16 : d == "b" ? 2 : 8, !s || s == c ? m : a;
        }), s && (c = s, o = o.replace(r, "$1").replace(i, "0.$1")), u != o))
          return new g(o, c);
        if (g.DEBUG)
          throw Error(C + "Not a" + (s ? " base " + s : "") + " number: " + u);
        f.s = null;
      }
      f.c = f.e = null;
    };
  })();
  function U(e, r, i, l) {
    var t, f, u, n, s, c, o, a = e.c, m = pe;
    if (a) {
      e: {
        for (t = 1, n = a[0]; n >= 10; n /= 10, t++) ;
        if (f = r - t, f < 0)
          f += O, u = r, s = a[c = 0], o = q(s / m[t - u - 1] % 10);
        else if (c = ae((f + 1) / O), c >= a.length)
          if (l) {
            for (; a.length <= c; a.push(0)) ;
            s = o = 0, t = 1, f %= O, u = f - O + 1;
          } else
            break e;
        else {
          for (s = n = a[c], t = 1; n >= 10; n /= 10, t++) ;
          f %= O, u = f - O + t, o = u < 0 ? 0 : q(s / m[t - u - 1] % 10);
        }
        if (l = l || r < 0 || // Are there any non-zero digits after the rounding digit?
        // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
        // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
        a[c + 1] != null || (u < 0 ? s : s % m[t - u - 1]), l = i < 4 ? (o || l) && (i == 0 || i == (e.s < 0 ? 3 : 2)) : o > 5 || o == 5 && (i == 4 || l || i == 6 && // Check whether the digit to the left of the rounding digit is odd.
        (f > 0 ? u > 0 ? s / m[t - u] : 0 : a[c - 1]) % 10 & 1 || i == (e.s < 0 ? 8 : 7)), r < 1 || !a[0])
          return a.length = 0, l ? (r -= e.e + 1, a[0] = m[(O - r % O) % O], e.e = -r || 0) : a[0] = e.e = 0, e;
        if (f == 0 ? (a.length = c, n = 1, c--) : (a.length = c + 1, n = m[O - f], a[c] = u > 0 ? q(s / m[t - u] % m[u]) * n : 0), l)
          for (; ; )
            if (c == 0) {
              for (f = 1, u = a[0]; u >= 10; u /= 10, f++) ;
              for (u = a[0] += n, n = 1; u >= 10; u /= 10, n++) ;
              f != n && (e.e++, a[0] == z && (a[0] = 1));
              break;
            } else {
              if (a[c] += n, a[c] != z) break;
              a[c--] = 0, n = 1;
            }
        for (f = a.length; a[--f] === 0; a.pop()) ;
      }
      e.e > H ? e.c = e.e = null : e.e < Z && (e.c = [e.e = 0]);
    }
    return e;
  }
  function j(e) {
    var r, i = e.e;
    return i === null ? e.toString() : (r = G(e.c), r = i <= L || i >= y ? ne(r, i) : V(r, i, "0"), e.s < 0 ? "-" + r : r);
  }
  return w.absoluteValue = w.abs = function() {
    var e = new g(this);
    return e.s < 0 && (e.s = 1), e;
  }, w.comparedTo = function(e, r) {
    return K(this, new g(e, r));
  }, w.decimalPlaces = w.dp = function(e, r) {
    var i, l, t, f = this;
    if (e != null)
      return k(e, 0, R), r == null ? r = S : k(r, 0, 8), U(new g(f), e + f.e + 1, r);
    if (!(i = f.c)) return null;
    if (l = ((t = i.length - 1) - $(this.e / O)) * O, t = i[t]) for (; t % 10 == 0; t /= 10, l--) ;
    return l < 0 && (l = 0), l;
  }, w.dividedBy = w.div = function(e, r) {
    return p(this, new g(e, r), x, S);
  }, w.dividedToIntegerBy = w.idiv = function(e, r) {
    return p(this, new g(e, r), 0, 1);
  }, w.exponentiatedBy = w.pow = function(e, r) {
    var i, l, t, f, u, n, s, c, o, a = this;
    if (e = new g(e), e.c && !e.isInteger())
      throw Error(C + "Exponent not an integer: " + j(e));
    if (r != null && (r = new g(r)), n = e.e > 14, !a.c || !a.c[0] || a.c[0] == 1 && !a.e && a.c.length == 1 || !e.c || !e.c[0])
      return o = new g(Math.pow(+j(a), n ? e.s * (2 - ie(e)) : +j(e))), r ? o.mod(r) : o;
    if (s = e.s < 0, r) {
      if (r.c ? !r.c[0] : !r.s) return new g(NaN);
      l = !s && a.isInteger() && r.isInteger(), l && (a = a.mod(r));
    } else {
      if (e.e > 9 && (a.e > 0 || a.e < -1 || (a.e == 0 ? a.c[0] > 1 || n && a.c[1] >= 24e7 : a.c[0] < 8e13 || n && a.c[0] <= 9999975e7)))
        return f = a.s < 0 && ie(e) ? -0 : 0, a.e > -1 && (f = 1 / f), new g(s ? 1 / f : f);
      W && (f = ae(W / O + 2));
    }
    for (n ? (i = new g(0.5), s && (e.s = 1), c = ie(e)) : (t = Math.abs(+j(e)), c = t % 2), o = new g(M); ; ) {
      if (c) {
        if (o = o.times(a), !o.c) break;
        f ? o.c.length > f && (o.c.length = f) : l && (o = o.mod(r));
      }
      if (t) {
        if (t = q(t / 2), t === 0) break;
        c = t % 2;
      } else if (e = e.times(i), U(e, e.e + 1, 1), e.e > 14)
        c = ie(e);
      else {
        if (t = +j(e), t === 0) break;
        c = t % 2;
      }
      a = a.times(a), f ? a.c && a.c.length > f && (a.c.length = f) : l && (a = a.mod(r));
    }
    return l ? o : (s && (o = M.div(o)), r ? o.mod(r) : f ? U(o, W, S, u) : o);
  }, w.integerValue = function(e) {
    var r = new g(this);
    return e == null ? e = S : k(e, 0, 8), U(r, r.e + 1, e);
  }, w.isEqualTo = w.eq = function(e, r) {
    return K(this, new g(e, r)) === 0;
  }, w.isFinite = function() {
    return !!this.c;
  }, w.isGreaterThan = w.gt = function(e, r) {
    return K(this, new g(e, r)) > 0;
  }, w.isGreaterThanOrEqualTo = w.gte = function(e, r) {
    return (r = K(this, new g(e, r))) === 1 || r === 0;
  }, w.isInteger = function() {
    return !!this.c && $(this.e / O) > this.c.length - 2;
  }, w.isLessThan = w.lt = function(e, r) {
    return K(this, new g(e, r)) < 0;
  }, w.isLessThanOrEqualTo = w.lte = function(e, r) {
    return (r = K(this, new g(e, r))) === -1 || r === 0;
  }, w.isNaN = function() {
    return !this.s;
  }, w.isNegative = function() {
    return this.s < 0;
  }, w.isPositive = function() {
    return this.s > 0;
  }, w.isZero = function() {
    return !!this.c && this.c[0] == 0;
  }, w.minus = function(e, r) {
    var i, l, t, f, u = this, n = u.s;
    if (e = new g(e, r), r = e.s, !n || !r) return new g(NaN);
    if (n != r)
      return e.s = -r, u.plus(e);
    var s = u.e / O, c = e.e / O, o = u.c, a = e.c;
    if (!s || !c) {
      if (!o || !a) return o ? (e.s = -r, e) : new g(a ? u : NaN);
      if (!o[0] || !a[0])
        return a[0] ? (e.s = -r, e) : new g(o[0] ? u : (
          // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
          S == 3 ? -0 : 0
        ));
    }
    if (s = $(s), c = $(c), o = o.slice(), n = s - c) {
      for ((f = n < 0) ? (n = -n, t = o) : (c = s, t = a), t.reverse(), r = n; r--; t.push(0)) ;
      t.reverse();
    } else
      for (l = (f = (n = o.length) < (r = a.length)) ? n : r, n = r = 0; r < l; r++)
        if (o[r] != a[r]) {
          f = o[r] < a[r];
          break;
        }
    if (f && (t = o, o = a, a = t, e.s = -e.s), r = (l = a.length) - (i = o.length), r > 0) for (; r--; o[i++] = 0) ;
    for (r = z - 1; l > n; ) {
      if (o[--l] < a[l]) {
        for (i = l; i && !o[--i]; o[i] = r) ;
        --o[i], o[l] += z;
      }
      o[l] -= a[l];
    }
    for (; o[0] == 0; o.splice(0, 1), --c) ;
    return o[0] ? le(e, o, c) : (e.s = S == 3 ? -1 : 1, e.c = [e.e = 0], e);
  }, w.modulo = w.mod = function(e, r) {
    var i, l, t = this;
    return e = new g(e, r), !t.c || !e.s || e.c && !e.c[0] ? new g(NaN) : !e.c || t.c && !t.c[0] ? new g(t) : (b == 9 ? (l = e.s, e.s = 1, i = p(t, e, 0, 3), e.s = l, i.s *= l) : i = p(t, e, 0, b), e = t.minus(i.times(e)), !e.c[0] && b == 1 && (e.s = t.s), e);
  }, w.multipliedBy = w.times = function(e, r) {
    var i, l, t, f, u, n, s, c, o, a, m, d, _, P, B, A = this, v = A.c, T = (e = new g(e, r)).c;
    if (!v || !T || !v[0] || !T[0])
      return !A.s || !e.s || v && !v[0] && !T || T && !T[0] && !v ? e.c = e.e = e.s = null : (e.s *= A.s, !v || !T ? e.c = e.e = null : (e.c = [0], e.e = 0)), e;
    for (l = $(A.e / O) + $(e.e / O), e.s *= A.s, s = v.length, a = T.length, s < a && (_ = v, v = T, T = _, t = s, s = a, a = t), t = s + a, _ = []; t--; _.push(0)) ;
    for (P = z, B = Y, t = a; --t >= 0; ) {
      for (i = 0, m = T[t] % B, d = T[t] / B | 0, u = s, f = t + u; f > t; )
        c = v[--u] % B, o = v[u] / B | 0, n = d * c + o * m, c = m * c + n % B * B + _[f] + i, i = (c / P | 0) + (n / B | 0) + d * o, _[f--] = c % P;
      _[f] = i;
    }
    return i ? ++l : _.splice(0, 1), le(e, _, l);
  }, w.negated = function() {
    var e = new g(this);
    return e.s = -e.s || null, e;
  }, w.plus = function(e, r) {
    var i, l = this, t = l.s;
    if (e = new g(e, r), r = e.s, !t || !r) return new g(NaN);
    if (t != r)
      return e.s = -r, l.minus(e);
    var f = l.e / O, u = e.e / O, n = l.c, s = e.c;
    if (!f || !u) {
      if (!n || !s) return new g(t / 0);
      if (!n[0] || !s[0]) return s[0] ? e : new g(n[0] ? l : t * 0);
    }
    if (f = $(f), u = $(u), n = n.slice(), t = f - u) {
      for (t > 0 ? (u = f, i = s) : (t = -t, i = n), i.reverse(); t--; i.push(0)) ;
      i.reverse();
    }
    for (t = n.length, r = s.length, t - r < 0 && (i = s, s = n, n = i, r = t), t = 0; r; )
      t = (n[--r] = n[r] + s[r] + t) / z | 0, n[r] = z === n[r] ? 0 : n[r] % z;
    return t && (n = [t].concat(n), ++u), le(e, n, u);
  }, w.precision = w.sd = function(e, r) {
    var i, l, t, f = this;
    if (e != null && e !== !!e)
      return k(e, 1, R), r == null ? r = S : k(r, 0, 8), U(new g(f), e, r);
    if (!(i = f.c)) return null;
    if (t = i.length - 1, l = t * O + 1, t = i[t]) {
      for (; t % 10 == 0; t /= 10, l--) ;
      for (t = i[0]; t >= 10; t /= 10, l++) ;
    }
    return e && f.e + 1 > l && (l = f.e + 1), l;
  }, w.shiftedBy = function(e) {
    return k(e, -he, he), this.times("1e" + e);
  }, w.squareRoot = w.sqrt = function() {
    var e, r, i, l, t, f = this, u = f.c, n = f.s, s = f.e, c = x + 4, o = new g("0.5");
    if (n !== 1 || !u || !u[0])
      return new g(!n || n < 0 && (!u || u[0]) ? NaN : u ? f : 1 / 0);
    if (n = Math.sqrt(+j(f)), n == 0 || n == 1 / 0 ? (r = G(u), (r.length + s) % 2 == 0 && (r += "0"), n = Math.sqrt(+r), s = $((s + 1) / 2) - (s < 0 || s % 2), n == 1 / 0 ? r = "5e" + s : (r = n.toExponential(), r = r.slice(0, r.indexOf("e") + 1) + s), i = new g(r)) : i = new g(n + ""), i.c[0]) {
      for (s = i.e, n = s + c, n < 3 && (n = 0); ; )
        if (t = i, i = o.times(t.plus(p(f, t, c, 1))), G(t.c).slice(0, n) === (r = G(i.c)).slice(0, n))
          if (i.e < s && --n, r = r.slice(n - 3, n + 1), r == "9999" || !l && r == "4999") {
            if (!l && (U(t, t.e + x + 2, 0), t.times(t).eq(f))) {
              i = t;
              break;
            }
            c += 4, n += 4, l = 1;
          } else {
            (!+r || !+r.slice(1) && r.charAt(0) == "5") && (U(i, i.e + x + 2, 1), e = !i.times(i).eq(f));
            break;
          }
    }
    return U(i, i.e + x + 1, S, e);
  }, w.toExponential = function(e, r) {
    return e != null && (k(e, 0, R), e++), oe(this, e, r, 1);
  }, w.toFixed = function(e, r) {
    return e != null && (k(e, 0, R), e = e + this.e + 1), oe(this, e, r);
  }, w.toFormat = function(e, r, i) {
    var l, t = this;
    if (i == null)
      e != null && r && typeof r == "object" ? (i = r, r = null) : e && typeof e == "object" ? (i = e, e = r = null) : i = se;
    else if (typeof i != "object")
      throw Error(C + "Argument not an object: " + i);
    if (l = t.toFixed(e, r), t.c) {
      var f, u = l.split("."), n = +i.groupSize, s = +i.secondaryGroupSize, c = i.groupSeparator || "", o = u[0], a = u[1], m = t.s < 0, d = m ? o.slice(1) : o, _ = d.length;
      if (s && (f = n, n = s, s = f, _ -= f), n > 0 && _ > 0) {
        for (f = _ % n || n, o = d.substr(0, f); f < _; f += n) o += c + d.substr(f, n);
        s > 0 && (o += c + d.slice(f)), m && (o = "-" + o);
      }
      l = a ? o + (i.decimalSeparator || "") + ((s = +i.fractionGroupSize) ? a.replace(
        new RegExp("\\d{" + s + "}\\B", "g"),
        "$&" + (i.fractionGroupSeparator || "")
      ) : a) : o;
    }
    return (i.prefix || "") + l + (i.suffix || "");
  }, w.toFraction = function(e) {
    var r, i, l, t, f, u, n, s, c, o, a, m, d = this, _ = d.c;
    if (e != null && (n = new g(e), !n.isInteger() && (n.c || n.s !== 1) || n.lt(M)))
      throw Error(C + "Argument " + (n.isInteger() ? "out of range: " : "not an integer: ") + j(n));
    if (!_) return new g(d);
    for (r = new g(M), c = i = new g(M), l = s = new g(M), m = G(_), f = r.e = m.length - d.e - 1, r.c[0] = pe[(u = f % O) < 0 ? O + u : u], e = !e || n.comparedTo(r) > 0 ? f > 0 ? r : c : n, u = H, H = 1 / 0, n = new g(m), s.c[0] = 0; o = p(n, r, 0, 1), t = i.plus(o.times(l)), t.comparedTo(e) != 1; )
      i = l, l = t, c = s.plus(o.times(t = c)), s = t, r = n.minus(o.times(t = r)), n = t;
    return t = p(e.minus(i), l, 0, 1), s = s.plus(t.times(c)), i = i.plus(t.times(l)), s.s = c.s = d.s, f = f * 2, a = p(c, l, f, S).minus(d).abs().comparedTo(
      p(s, i, f, S).minus(d).abs()
    ) < 1 ? [c, l] : [s, i], H = u, a;
  }, w.toNumber = function() {
    return +j(this);
  }, w.toPrecision = function(e, r) {
    return e != null && k(e, 1, R), oe(this, e, r, 2);
  }, w.toString = function(e) {
    var r, i = this, l = i.s, t = i.e;
    return t === null ? l ? (r = "Infinity", l < 0 && (r = "-" + r)) : r = "NaN" : (e == null ? r = t <= L || t >= y ? ne(G(i.c), t) : V(G(i.c), t, "0") : e === 10 && fe ? (i = U(new g(i), x + t + 1, S), r = V(G(i.c), i.e, "0")) : (k(e, 2, Q.length, "Base"), r = E(V(G(i.c), t, "0"), 10, e, l, !0)), l < 0 && i.c[0] && (r = "-" + r)), r;
  }, w.valueOf = w.toJSON = function() {
    return j(this);
  }, w._isBigNumber = !0, w[Symbol.toStringTag] = "BigNumber", w[/* @__PURE__ */ Symbol.for("nodejs.util.inspect.custom")] = w.valueOf, h != null && g.set(h), g;
}
function $(h) {
  var p = h | 0;
  return h > 0 || h === p ? p : p - 1;
}
function G(h) {
  for (var p, E, N = 1, w = h.length, M = h[0] + ""; N < w; ) {
    for (p = h[N++] + "", E = O - p.length; E--; p = "0" + p) ;
    M += p;
  }
  for (w = M.length; M.charCodeAt(--w) === 48; ) ;
  return M.slice(0, w + 1 || 1);
}
function K(h, p) {
  var E, N, w = h.c, M = p.c, x = h.s, S = p.s, L = h.e, y = p.e;
  if (!x || !S) return null;
  if (E = w && !w[0], N = M && !M[0], E || N) return E ? N ? 0 : -S : x;
  if (x != S) return x;
  if (E = x < 0, N = L == y, !w || !M) return N ? 0 : !w ^ E ? 1 : -1;
  if (!N) return L > y ^ E ? 1 : -1;
  for (S = (L = w.length) < (y = M.length) ? L : y, x = 0; x < S; x++) if (w[x] != M[x]) return w[x] > M[x] ^ E ? 1 : -1;
  return L == y ? 0 : L > y ^ E ? 1 : -1;
}
function k(h, p, E, N) {
  if (h < p || h > E || h !== q(h))
    throw Error(C + (N || "Argument") + (typeof h == "number" ? h < p || h > E ? " out of range: " : " not an integer: " : " not a primitive number: ") + String(h));
}
function ie(h) {
  var p = h.c.length - 1;
  return $(h.e / O) == p && h.c[p] % 2 != 0;
}
function ne(h, p) {
  return (h.length > 1 ? h.charAt(0) + "." + h.slice(1) : h) + (p < 0 ? "e" : "e+") + p;
}
function V(h, p, E) {
  var N, w;
  if (p < 0) {
    for (w = E + "."; ++p; w += E) ;
    h = w + h;
  } else if (N = h.length, ++p > N) {
    for (w = E, p -= N; --p; w += E) ;
    h += w;
  } else p < N && (h = h.slice(0, p) + "." + h.slice(p));
  return h;
}
Ne();
function Ie(h, p) {
  return function(...E) {
    return p.call(this, h, ...E);
  };
}
function He(h) {
  return h;
}
function me(h, p) {
  h.options.highlight ? h.options.highlight = Ie(h.options.highlight, (E, ...N) => p(...N) || E(...N)) : h.options.highlight = p;
}
const Be = we(async () => {
  const { EmojiConvertor: h } = await import("https://cdn.jsdelivr.net/npm/emoji-js@3.9.0/+esm");
  return new h();
}), Re = /^\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?/;
let ge;
function Te(h) {
  const p = h.src[h.pos] === ":" && h.src.slice(h.pos).match(Re);
  if (!p) return !1;
  const [E] = p;
  return h.pending += ge.replace_colons(E), h.pos += E.length, !0;
}
const Ae = {
  name: "emoji",
  async preload() {
    ge = await Be(), ge.replace_mode = "unified";
  },
  markdown: (h) => {
    h.inline.ruler.push("emoji", Te);
  }
}, De = (h, { enableFeature: p }) => {
  me(h, (E, N) => N === "mermaid" ? (p(), '<pre class="mermaid">' + Oe(E) + "</pre>") : "");
}, _e = {
  name: "mermaid",
  markdown: De
}, Le = {
  lang: "text",
  themes: {
    light: "min-light",
    dark: "tokyo-night"
  },
  defaultColor: !1,
  transformers: [
    {
      pre(h) {
        delete h.properties.style;
      }
    }
  ]
};
let ve;
const Ce = we(async () => {
  const { default: h } = await import("https://cdn.jsdelivr.net/npm/@shikijs/markdown-it@3.20.0/+esm");
  ve = await h({
    fallbackLanguage: "text",
    ...Le
  });
}), ye = async () => {
  await Ce();
}, Ue = (h) => {
  const { highlight: p } = h.options;
  h.use(ve), p && me(h, (...E) => p(...E));
}, xe = {
  name: "shiki",
  preload: ye,
  markdown: Ue
}, Fe = (h, { enableFeature: p }) => {
  me(h, (E, N, w) => N === "vega" ? (p(), `<div class="vega">${Oe(E)}</div>`) : "");
}, Me = {
  name: "vega",
  markdown: Fe
}, ze = {
  emoji: Ae,
  mermaid: _e,
  shiki: xe,
  vega: Me
}, te = [Ae, xe, Me, _e];
async function ke(h = te) {
  await Promise.all(h.map((p) => p.preload?.()));
}
async function Xe(h, p = te) {
  await Promise.all(p.map((E) => E.onMounted?.(h)));
}
class je {
  constructor(p) {
    this.plugins = p;
  }
  static async create(p = te) {
    return await ke(p), new this(p);
  }
  render(p) {
    return {
      html: p,
      plugins: this.plugins,
      onMounted: (E) => this.process(E)
    };
  }
  process(p, E = this.plugins) {
  }
}
const Ge = we(async () => import("./markdown-it-CWWnOdsP.js"));
class Ve {
  constructor(p, E) {
    this.plugins = p, this.md = E, p.forEach(({ name: N, markdown: w }) => {
      w && this.md.use(w, {
        enableFeature: () => this.enableFeature(N)
      });
    });
  }
  features = {};
  static async create(p = te) {
    const [{ initMarkdownIt: E }] = await Promise.all([
      Ge(),
      ke(p)
    ]);
    return new this(p, E());
  }
  enableFeature(p) {
    this.features[p] = !0;
  }
  render(p) {
    this.features = {};
    const E = this.md.render(p), N = this.plugins.filter(
      ({ name: w, always: M }) => M || this.features[w]
    );
    return {
      html: E,
      plugins: N,
      onMounted: (w) => this.process(w, N)
    };
  }
  process(p, E = this.plugins) {
  }
}
async function We(h) {
  let p;
  const E = h.startsWith(`---
`) ? h.indexOf(`
---
`) : -1;
  if (E > 0) {
    const N = h.slice(4, E), { parse: w } = await import("https://cdn.jsdelivr.net/npm/yaml@2.8.2/+esm");
    try {
      p = w(N);
    } catch {
    }
    const M = E + 5;
    h = h.slice(M);
  }
  return { content: h, frontmatter: p };
}
const Ye = Se;
export {
  je as HtmlRenderer,
  Ve as MarkdownRenderer,
  te as builtInPlugins,
  He as definePlugin,
  Ge as loadMarkdownIt,
  We as parseFrontmatter,
  me as patchHighlight,
  ze as pluginMap,
  Xe as pluginMounted,
  ke as pluginPreload,
  Ye as renderMarkdown
};
