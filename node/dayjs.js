var J = 60, V = J * 60, j = V * 24, q = j * 7, p = 1e3, N = J * p, Z = V * p, tt = j * p, rt = q * p, x = "millisecond", F = "second", _ = "minute", U = "hour", C = "day", H = "week", y = "month", X = "quarter", I = "year", A = "date", et = "YYYY-MM-DDTHH:mm:ssZ", P = "Invalid Date", at = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, nt = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
const it = {
  name: "en",
  weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
  months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
  ordinal: function(e) {
    var t = ["th", "st", "nd", "rd"], r = e % 100;
    return "[" + e + (t[(r - 20) % 10] || t[r] || t[0]) + "]";
  }
};
var b = function(e, t, r) {
  var a = String(e);
  return !a || a.length >= t ? e : "" + Array(t + 1 - a.length).join(r) + e;
}, st = function(e) {
  var t = -e.utcOffset(), r = Math.abs(t), a = Math.floor(r / 60), i = r % 60;
  return (t <= 0 ? "+" : "-") + b(a, 2, "0") + ":" + b(i, 2, "0");
}, ut = function h(e, t) {
  if (e.date() < t.date()) return -h(t, e);
  var r = (t.year() - e.year()) * 12 + (t.month() - e.month()), a = e.clone().add(r, y), i = t - a < 0, o = e.clone().add(r + (i ? -1 : 1), y);
  return +(-(r + (t - a) / (i ? a - o : o - a)) || 0);
}, ot = function(e) {
  return e < 0 ? Math.ceil(e) || 0 : Math.floor(e);
}, ft = function(e) {
  var t = {
    M: y,
    y: I,
    w: H,
    d: C,
    D: A,
    h: U,
    m: _,
    s: F,
    ms: x,
    Q: X
  };
  return t[e] || String(e || "").toLowerCase().replace(/s$/, "");
}, ct = function(e) {
  return e === void 0;
};
const ht = {
  s: b,
  z: st,
  m: ut,
  a: ot,
  p: ft,
  u: ct
};
var Y = "en", E = {};
E[Y] = it;
var B = "$isDayjsObject", R = function(e) {
  return e instanceof z || !!(e && e[B]);
}, L = function h(e, t, r) {
  var a;
  if (!e) return Y;
  if (typeof e == "string") {
    var i = e.toLowerCase();
    E[i] && (a = i), t && (E[i] = t, a = i);
    var o = e.split("-");
    if (!a && o.length > 1)
      return h(o[0]);
  } else {
    var v = e.name;
    E[v] = e, a = v;
  }
  return !r && a && (Y = a), a || !r && Y;
}, M = function(e, t) {
  if (R(e))
    return e.clone();
  var r = typeof t == "object" ? t : {};
  return r.date = e, r.args = arguments, new z(r);
}, vt = function(e, t) {
  return M(e, {
    locale: t.$L,
    utc: t.$u,
    x: t.$x,
    $offset: t.$offset
    // todo: refactor; do not use this.$offset in you code
  });
}, $ = ht;
$.l = L;
$.i = R;
$.w = vt;
var lt = function(e) {
  var t = e.date, r = e.utc;
  if (t === null) return /* @__PURE__ */ new Date(NaN);
  if ($.u(t)) return /* @__PURE__ */ new Date();
  if (t instanceof Date) return new Date(t);
  if (typeof t == "string" && !/Z$/i.test(t)) {
    var a = t.match(at);
    if (a) {
      var i = a[2] - 1 || 0, o = (a[7] || "0").substring(0, 3);
      return r ? new Date(Date.UTC(a[1], i, a[3] || 1, a[4] || 0, a[5] || 0, a[6] || 0, o)) : new Date(a[1], i, a[3] || 1, a[4] || 0, a[5] || 0, a[6] || 0, o);
    }
  }
  return new Date(t);
}, z = /* @__PURE__ */ function() {
  function h(t) {
    this.$L = L(t.locale, null, !0), this.parse(t), this.$x = this.$x || t.x || {}, this[B] = !0;
  }
  var e = h.prototype;
  return e.parse = function(r) {
    this.$d = lt(r), this.init();
  }, e.init = function() {
    var r = this.$d;
    this.$y = r.getFullYear(), this.$M = r.getMonth(), this.$D = r.getDate(), this.$W = r.getDay(), this.$H = r.getHours(), this.$m = r.getMinutes(), this.$s = r.getSeconds(), this.$ms = r.getMilliseconds();
  }, e.$utils = function() {
    return $;
  }, e.isValid = function() {
    return this.$d.toString() !== P;
  }, e.isSame = function(r, a) {
    var i = M(r);
    return this.startOf(a) <= i && i <= this.endOf(a);
  }, e.isAfter = function(r, a) {
    return M(r) < this.startOf(a);
  }, e.isBefore = function(r, a) {
    return this.endOf(a) < M(r);
  }, e.$g = function(r, a, i) {
    return $.u(r) ? this[a] : this.set(i, r);
  }, e.unix = function() {
    return Math.floor(this.valueOf() / 1e3);
  }, e.valueOf = function() {
    return this.$d.getTime();
  }, e.startOf = function(r, a) {
    var i = this, o = $.u(a) ? !0 : a, v = $.p(r), d = function(S, g) {
      var D = $.w(i.$u ? Date.UTC(i.$y, g, S) : new Date(i.$y, g, S), i);
      return o ? D : D.endOf(C);
    }, c = function(S, g) {
      var D = [0, 0, 0, 0], T = [23, 59, 59, 999];
      return $.w(i.toDate()[S].apply(
        // eslint-disable-line prefer-spread
        i.toDate("s"),
        (o ? D : T).slice(g)
      ), i);
    }, u = this.$W, n = this.$M, s = this.$D, f = "set" + (this.$u ? "UTC" : "");
    switch (v) {
      case I:
        return o ? d(1, 0) : d(31, 11);
      case y:
        return o ? d(1, n) : d(0, n + 1);
      case H: {
        var l = this.$locale().weekStart || 0, m = (u < l ? u + 7 : u) - l;
        return d(o ? s - m : s + (6 - m), n);
      }
      case C:
      case A:
        return c(f + "Hours", 0);
      case U:
        return c(f + "Minutes", 1);
      case _:
        return c(f + "Seconds", 2);
      case F:
        return c(f + "Milliseconds", 3);
      default:
        return this.clone();
    }
  }, e.endOf = function(r) {
    return this.startOf(r, !1);
  }, e.$set = function(r, a) {
    var i, o = $.p(r), v = "set" + (this.$u ? "UTC" : ""), d = (i = {}, i[C] = v + "Date", i[A] = v + "Date", i[y] = v + "Month", i[I] = v + "FullYear", i[U] = v + "Hours", i[_] = v + "Minutes", i[F] = v + "Seconds", i[x] = v + "Milliseconds", i)[o], c = o === C ? this.$D + (a - this.$W) : a;
    if (o === y || o === I) {
      var u = this.clone().set(A, 1);
      u.$d[d](c), u.init(), this.$d = u.set(A, Math.min(this.$D, u.daysInMonth())).$d;
    } else d && this.$d[d](c);
    return this.init(), this;
  }, e.set = function(r, a) {
    return this.clone().$set(r, a);
  }, e.get = function(r) {
    return this[$.p(r)]();
  }, e.add = function(r, a) {
    var i = this, o;
    r = Number(r);
    var v = $.p(a), d = function(s) {
      var f = M(i);
      return $.w(f.date(f.date() + Math.round(s * r)), i);
    };
    if (v === y)
      return this.set(y, this.$M + r);
    if (v === I)
      return this.set(I, this.$y + r);
    if (v === C)
      return d(1);
    if (v === H)
      return d(7);
    var c = (o = {}, o[_] = N, o[U] = Z, o[F] = p, o)[v] || 1, u = this.$d.getTime() + r * c;
    return $.w(u, this);
  }, e.subtract = function(r, a) {
    return this.add(r * -1, a);
  }, e.format = function(r) {
    var a = this, i = this.$locale();
    if (!this.isValid()) return i.invalidDate || P;
    var o = r || et, v = $.z(this), d = this.$H, c = this.$m, u = this.$M, n = i.weekdays, s = i.months, f = i.meridiem, l = function(D, T, w, k) {
      return D && (D[T] || D(a, o)) || w[T].slice(0, k);
    }, m = function(D) {
      return $.s(d % 12 || 12, D, "0");
    }, O = f || function(g, D, T) {
      var w = g < 12 ? "AM" : "PM";
      return T ? w.toLowerCase() : w;
    }, S = function(D) {
      switch (D) {
        case "YY":
          return String(a.$y).slice(-2);
        case "YYYY":
          return $.s(a.$y, 4, "0");
        case "M":
          return u + 1;
        case "MM":
          return $.s(u + 1, 2, "0");
        case "MMM":
          return l(i.monthsShort, u, s, 3);
        case "MMMM":
          return l(s, u);
        case "D":
          return a.$D;
        case "DD":
          return $.s(a.$D, 2, "0");
        case "d":
          return String(a.$W);
        case "dd":
          return l(i.weekdaysMin, a.$W, n, 2);
        case "ddd":
          return l(i.weekdaysShort, a.$W, n, 3);
        case "dddd":
          return n[a.$W];
        case "H":
          return String(d);
        case "HH":
          return $.s(d, 2, "0");
        case "h":
          return m(1);
        case "hh":
          return m(2);
        case "a":
          return O(d, c, !0);
        case "A":
          return O(d, c, !1);
        case "m":
          return String(c);
        case "mm":
          return $.s(c, 2, "0");
        case "s":
          return String(a.$s);
        case "ss":
          return $.s(a.$s, 2, "0");
        case "SSS":
          return $.s(a.$ms, 3, "0");
        case "Z":
          return v;
      }
      return null;
    };
    return o.replace(nt, function(g, D) {
      return D || S(g) || v.replace(":", "");
    });
  }, e.utcOffset = function() {
    return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
  }, e.diff = function(r, a, i) {
    var o = this, v = $.p(a), d = M(r), c = (d.utcOffset() - this.utcOffset()) * N, u = this - d, n = function() {
      return $.m(o, d);
    }, s;
    switch (v) {
      case I:
        s = n() / 12;
        break;
      case y:
        s = n();
        break;
      case X:
        s = n() / 3;
        break;
      case H:
        s = (u - c) / rt;
        break;
      case C:
        s = (u - c) / tt;
        break;
      case U:
        s = u / Z;
        break;
      case _:
        s = u / N;
        break;
      case F:
        s = u / p;
        break;
      default:
        s = u;
        break;
    }
    return i ? s : $.a(s);
  }, e.daysInMonth = function() {
    return this.endOf(y).$D;
  }, e.$locale = function() {
    return E[this.$L];
  }, e.locale = function(r, a) {
    if (!r) return this.$L;
    var i = this.clone(), o = L(r, a, !0);
    return o && (i.$L = o), i;
  }, e.clone = function() {
    return $.w(this.$d, this);
  }, e.toDate = function() {
    return new Date(this.valueOf());
  }, e.toJSON = function() {
    return this.isValid() ? this.toISOString() : null;
  }, e.toISOString = function() {
    return this.$d.toISOString();
  }, e.toString = function() {
    return this.$d.toUTCString();
  }, h;
}(), K = z.prototype;
M.prototype = K;
[["$ms", x], ["$s", F], ["$m", _], ["$H", U], ["$W", C], ["$M", y], ["$y", I], ["$D", A]].forEach(function(h) {
  K[h[1]] = function(e) {
    return this.$g(e, h[0], h[1]);
  };
});
M.extend = function(h, e) {
  return h.$i || (h(e, z, M), h.$i = !0), M;
};
M.locale = L;
M.isDayjs = R;
M.unix = function(h) {
  return M(h * 1e3);
};
M.en = E[Y];
M.Ls = E;
M.p = {};
var $t = {
  year: 0,
  month: 1,
  day: 2,
  hour: 3,
  minute: 4,
  second: 5
}, G = {}, dt = function(e, t) {
  t === void 0 && (t = {});
  var r = t.timeZoneName || "short", a = e + "|" + r, i = G[a];
  return i || (i = new Intl.DateTimeFormat("en-US", {
    hour12: !1,
    timeZone: e,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: r
  }), G[a] = i), i;
};
const mt = function(h, e, t) {
  var r, a = function(u, n, s) {
    s === void 0 && (s = {});
    var f = new Date(u), l = dt(n, s);
    return l.formatToParts(f);
  }, i = function(u, n) {
    for (var s = a(u, n), f = [], l = 0; l < s.length; l += 1) {
      var m = s[l], O = m.type, S = m.value, g = $t[O];
      g >= 0 && (f[g] = parseInt(S, 10));
    }
    var D = f[3], T = D === 24 ? 0 : D, w = f[0] + "-" + f[1] + "-" + f[2] + " " + T + ":" + f[4] + ":" + f[5] + ":000", k = t.utc(w).valueOf(), W = +u, Q = W % 1e3;
    return W -= Q, (k - W) / 6e4;
  }, o = function(u, n, s) {
    var f = u - n * 60 * 1e3, l = i(f, s);
    if (n === l)
      return [f, n];
    f -= (l - n) * 60 * 1e3;
    var m = i(f, s);
    return l === m ? [f, l] : [u - Math.min(l, m) * 60 * 1e3, Math.max(l, m)];
  }, v = e.prototype;
  v.tz = function(c, u) {
    c === void 0 && (c = r);
    var n = this.utcOffset(), s = this.toDate(), f = s.toLocaleString("en-US", {
      timeZone: c
    }), l = Math.round((s - new Date(f)) / 1e3 / 60), m = -Math.round(s.getTimezoneOffset() / 15) * 15 - l, O = !Number(m), S;
    if (O)
      S = this.utcOffset(0, u);
    else if (S = t(f, {
      locale: this.$L
    }).$set(x, this.$ms).utcOffset(m, !0), u) {
      var g = S.utcOffset();
      S = S.add(n - g, _);
    }
    return S.$x.$timezone = c, S;
  }, v.offsetName = function(c) {
    var u = this.$x.$timezone || t.tz.guess(), n = a(this.valueOf(), u, {
      timeZoneName: c
    }).find(function(s) {
      return s.type.toLowerCase() === "timezonename";
    });
    return n && n.value;
  };
  var d = v.startOf;
  v.startOf = function(c, u) {
    if (!this.$x || !this.$x.$timezone)
      return d.call(this, c, u);
    var n = t(this.format("YYYY-MM-DD HH:mm:ss:SSS"), {
      locale: this.$L
    }), s = d.call(n, c, u);
    return s.tz(this.$x.$timezone, !0);
  }, t.tz = function(c, u, n) {
    var s = n && u, f = n || u || r, l = i(+t(), f);
    if (typeof c != "string")
      return t(c).tz(f);
    var m = t.utc(c, s).valueOf(), O = o(m, l, f), S = O[0], g = O[1], D = t(S).utcOffset(g);
    return D.$x.$timezone = f, D;
  }, t.tz.guess = function() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }, t.tz.setDefault = function(c) {
    r = c;
  };
};
var St = /[+-]\d\d(?::?\d\d)?/g, Dt = /([+-]|\d\d)/g;
function Ot(h) {
  h === void 0 && (h = "");
  var e = h.match(St);
  if (!e)
    return null;
  var t = ("" + e[0]).match(Dt) || ["-", 0, 0], r = t[0], a = t[1], i = t[2], o = +a * 60 + +i;
  return o === 0 ? 0 : r === "+" ? o : -o;
}
const Mt = function(h, e, t) {
  var r = e.prototype;
  t.utc = function(n) {
    var s = {
      date: n,
      utc: !0,
      args: arguments
    };
    return new e(s);
  }, r.utc = function(n) {
    var s = t(this.toDate(), {
      locale: this.$L,
      utc: !0
    });
    return n ? s.add(this.utcOffset(), _) : s;
  }, r.local = function() {
    return t(this.toDate(), {
      locale: this.$L,
      utc: !1
    });
  };
  var a = r.parse;
  r.parse = function(n) {
    n.utc && (this.$u = !0), this.$utils().u(n.$offset) || (this.$offset = n.$offset), a.call(this, n);
  };
  var i = r.init;
  r.init = function() {
    if (this.$u) {
      var n = this.$d;
      this.$y = n.getUTCFullYear(), this.$M = n.getUTCMonth(), this.$D = n.getUTCDate(), this.$W = n.getUTCDay(), this.$H = n.getUTCHours(), this.$m = n.getUTCMinutes(), this.$s = n.getUTCSeconds(), this.$ms = n.getUTCMilliseconds();
    } else
      i.call(this);
  };
  var o = r.utcOffset;
  r.utcOffset = function(n, s) {
    var f = this.$utils(), l = f.u;
    if (l(n))
      return this.$u ? 0 : l(this.$offset) ? o.call(this) : this.$offset;
    if (typeof n == "string" && (n = Ot(n), n === null))
      return this;
    var m = Math.abs(n) <= 16 ? n * 60 : n, O = this;
    if (s)
      return O.$offset = m, O.$u = n === 0, O;
    if (n !== 0) {
      var S = this.$u ? this.toDate().getTimezoneOffset() : -1 * this.utcOffset();
      O = this.local().add(m + S, _), O.$offset = m, O.$x.$localOffset = S;
    } else
      O = this.utc();
    return O;
  };
  var v = r.format, d = "YYYY-MM-DDTHH:mm:ss[Z]";
  r.format = function(n) {
    var s = n || (this.$u ? d : "");
    return v.call(this, s);
  }, r.valueOf = function() {
    var n = this.$utils().u(this.$offset) ? 0 : this.$offset + (this.$x.$localOffset || this.$d.getTimezoneOffset());
    return this.$d.valueOf() - n * N;
  }, r.isUTC = function() {
    return !!this.$u;
  }, r.toISOString = function() {
    return this.toDate().toISOString();
  }, r.toString = function() {
    return this.toDate().toUTCString();
  };
  var c = r.toDate;
  r.toDate = function(n) {
    return n === "s" && this.$offset ? t(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate() : c.call(this);
  };
  var u = r.diff;
  r.diff = function(n, s, f) {
    if (n && this.$u === n.$u)
      return u.call(this, n, s, f);
    var l = this.local(), m = t(n).local();
    return u.call(l, m, s, f);
  };
};
M.extend(Mt);
M.extend(mt);
export {
  M as dayjs
};
