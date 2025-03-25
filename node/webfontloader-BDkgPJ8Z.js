function Ft(d) {
  return d && d.__esModule && Object.prototype.hasOwnProperty.call(d, "default") ? d.default : d;
}
var P = { exports: {} }, st;
function Ot() {
  return st || (st = 1, function(d) {
    (function() {
      function rt(t, n, e) {
        return t.call.apply(t.bind, arguments);
      }
      function at(t, n, e) {
        if (!t) throw Error();
        if (2 < arguments.length) {
          var i = Array.prototype.slice.call(arguments, 2);
          return function() {
            var o = Array.prototype.slice.call(arguments);
            return Array.prototype.unshift.apply(o, i), t.apply(n, o);
          };
        }
        return function() {
          return t.apply(n, arguments);
        };
      }
      function v(t, n, e) {
        return v = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? rt : at, v.apply(null, arguments);
      }
      var _ = Date.now || function() {
        return +/* @__PURE__ */ new Date();
      };
      function ft(t, n) {
        this.a = t, this.o = n || t, this.c = this.o.document;
      }
      var ut = !!window.FontFace;
      function A(t, n, e, i) {
        if (n = t.c.createElement(n), e) for (var o in e) e.hasOwnProperty(o) && (o == "style" ? n.style.cssText = e[o] : n.setAttribute(o, e[o]));
        return i && n.appendChild(t.c.createTextNode(i)), n;
      }
      function I(t, n, e) {
        t = t.c.getElementsByTagName(n)[0], t || (t = document.documentElement), t.insertBefore(e, t.lastChild);
      }
      function x(t) {
        t.parentNode && t.parentNode.removeChild(t);
      }
      function m(t, n, e) {
        n = n || [], e = e || [];
        for (var i = t.className.split(/\s+/), o = 0; o < n.length; o += 1) {
          for (var s = !1, r = 0; r < i.length; r += 1) if (n[o] === i[r]) {
            s = !0;
            break;
          }
          s || i.push(n[o]);
        }
        for (n = [], o = 0; o < i.length; o += 1) {
          for (s = !1, r = 0; r < e.length; r += 1) if (i[o] === e[r]) {
            s = !0;
            break;
          }
          s || n.push(i[o]);
        }
        t.className = n.join(" ").replace(/\s+/g, " ").replace(/^\s+|\s+$/, "");
      }
      function B(t, n) {
        for (var e = t.className.split(/\s+/), i = 0, o = e.length; i < o; i++) if (e[i] == n) return !0;
        return !1;
      }
      function ct(t) {
        return t.o.location.hostname || t.a.location.hostname;
      }
      function k(t, n, e) {
        function i() {
          a && o && s && (a(r), a = null);
        }
        n = A(t, "link", { rel: "stylesheet", href: n, media: "all" });
        var o = !1, s = !0, r = null, a = e || null;
        ut ? (n.onload = function() {
          o = !0, i();
        }, n.onerror = function() {
          o = !0, r = Error("Stylesheet failed to load"), i();
        }) : setTimeout(function() {
          o = !0, i();
        }, 0), I(t, "head", n);
      }
      function N(t, n, e, i) {
        var o = t.c.getElementsByTagName("head")[0];
        if (o) {
          var s = A(t, "script", { src: n }), r = !1;
          return s.onload = s.onreadystatechange = function() {
            r || this.readyState && this.readyState != "loaded" && this.readyState != "complete" || (r = !0, e && e(null), s.onload = s.onreadystatechange = null, s.parentNode.tagName == "HEAD" && o.removeChild(s));
          }, o.appendChild(s), setTimeout(function() {
            r || (r = !0, e && e(Error("Script load timeout")));
          }, i || 5e3), s;
        }
        return null;
      }
      function D() {
        this.a = 0, this.c = null;
      }
      function q(t) {
        return t.a++, function() {
          t.a--, $(t);
        };
      }
      function L(t, n) {
        t.c = n, $(t);
      }
      function $(t) {
        t.a == 0 && t.c && (t.c(), t.c = null);
      }
      function M(t) {
        this.a = t || "-";
      }
      M.prototype.c = function(t) {
        for (var n = [], e = 0; e < arguments.length; e++) n.push(arguments[e].replace(/[\W_]+/g, "").toLowerCase());
        return n.join(this.a);
      };
      function p(t, n) {
        this.c = t, this.f = 4, this.a = "n";
        var e = (n || "n4").match(/^([nio])([1-9])$/i);
        e && (this.a = e[1], this.f = parseInt(e[2], 10));
      }
      function lt(t) {
        return H(t) + " " + (t.f + "00") + " 300px " + z(t.c);
      }
      function z(t) {
        var n = [];
        t = t.split(/,\s*/);
        for (var e = 0; e < t.length; e++) {
          var i = t[e].replace(/['"]/g, "");
          i.indexOf(" ") != -1 || /^\d/.test(i) ? n.push("'" + i + "'") : n.push(i);
        }
        return n.join(",");
      }
      function h(t) {
        return t.a + t.f;
      }
      function H(t) {
        var n = "normal";
        return t.a === "o" ? n = "oblique" : t.a === "i" && (n = "italic"), n;
      }
      function ht(t) {
        var n = 4, e = "n", i = null;
        return t && ((i = t.match(/(normal|oblique|italic)/i)) && i[1] && (e = i[1].substr(0, 1).toLowerCase()), (i = t.match(/([1-9]00|normal|bold)/i)) && i[1] && (/bold/i.test(i[1]) ? n = 7 : /[1-9]00/.test(i[1]) && (n = parseInt(i[1].substr(0, 1), 10)))), e + n;
      }
      function pt(t, n) {
        this.c = t, this.f = t.o.document.documentElement, this.h = n, this.a = new M("-"), this.j = n.events !== !1, this.g = n.classes !== !1;
      }
      function gt(t) {
        t.g && m(t.f, [t.a.c("wf", "loading")]), y(t, "loading");
      }
      function G(t) {
        if (t.g) {
          var n = B(t.f, t.a.c("wf", "active")), e = [], i = [t.a.c("wf", "loading")];
          n || e.push(t.a.c("wf", "inactive")), m(t.f, e, i);
        }
        y(t, "inactive");
      }
      function y(t, n, e) {
        t.j && t.h[n] && (e ? t.h[n](e.c, h(e)) : t.h[n]());
      }
      function vt() {
        this.c = {};
      }
      function dt(t, n, e) {
        var i = [], o;
        for (o in n) if (n.hasOwnProperty(o)) {
          var s = t.c[o];
          s && i.push(s(n[o], e));
        }
        return i;
      }
      function T(t, n) {
        this.c = t, this.f = n, this.a = A(this.c, "span", { "aria-hidden": "true" }, this.f);
      }
      function S(t) {
        I(t.c, "body", t.a);
      }
      function E(t) {
        return "display:block;position:absolute;top:-9999px;left:-9999px;font-size:300px;width:auto;height:auto;line-height:normal;margin:0;padding:0;font-variant:normal;white-space:nowrap;font-family:" + z(t.c) + ";" + ("font-style:" + H(t) + ";font-weight:" + (t.f + "00") + ";");
      }
      function R(t, n, e, i, o, s) {
        this.g = t, this.j = n, this.a = i, this.c = e, this.f = o || 3e3, this.h = s || void 0;
      }
      R.prototype.start = function() {
        var t = this.c.o.document, n = this, e = _(), i = new Promise(function(r, a) {
          function f() {
            _() - e >= n.f ? a() : t.fonts.load(lt(n.a), n.h).then(function(u) {
              1 <= u.length ? r() : setTimeout(f, 25);
            }, function() {
              a();
            });
          }
          f();
        }), o = null, s = new Promise(function(r, a) {
          o = setTimeout(a, n.f);
        });
        Promise.race([s, i]).then(function() {
          o && (clearTimeout(o), o = null), n.g(n.a);
        }, function() {
          n.j(n.a);
        });
      };
      function K(t, n, e, i, o, s, r) {
        this.v = t, this.B = n, this.c = e, this.a = i, this.s = r || "BESbswy", this.f = {}, this.w = o || 3e3, this.u = s || null, this.m = this.j = this.h = this.g = null, this.g = new T(this.c, this.s), this.h = new T(this.c, this.s), this.j = new T(this.c, this.s), this.m = new T(this.c, this.s), t = new p(this.a.c + ",serif", h(this.a)), t = E(t), this.g.a.style.cssText = t, t = new p(this.a.c + ",sans-serif", h(this.a)), t = E(t), this.h.a.style.cssText = t, t = new p("serif", h(this.a)), t = E(t), this.j.a.style.cssText = t, t = new p("sans-serif", h(this.a)), t = E(t), this.m.a.style.cssText = t, S(this.g), S(this.h), S(this.j), S(this.m);
      }
      var C = { D: "serif", C: "sans-serif" }, W = null;
      function U() {
        if (W === null) {
          var t = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent);
          W = !!t && (536 > parseInt(t[1], 10) || parseInt(t[1], 10) === 536 && 11 >= parseInt(t[2], 10));
        }
        return W;
      }
      K.prototype.start = function() {
        this.f.serif = this.j.a.offsetWidth, this.f["sans-serif"] = this.m.a.offsetWidth, this.A = _(), X(this);
      };
      function V(t, n, e) {
        for (var i in C) if (C.hasOwnProperty(i) && n === t.f[C[i]] && e === t.f[C[i]]) return !0;
        return !1;
      }
      function X(t) {
        var n = t.g.a.offsetWidth, e = t.h.a.offsetWidth, i;
        (i = n === t.f.serif && e === t.f["sans-serif"]) || (i = U() && V(t, n, e)), i ? _() - t.A >= t.w ? U() && V(t, n, e) && (t.u === null || t.u.hasOwnProperty(t.a.c)) ? F(t, t.v) : F(t, t.B) : wt(t) : F(t, t.v);
      }
      function wt(t) {
        setTimeout(v(function() {
          X(this);
        }, t), 50);
      }
      function F(t, n) {
        setTimeout(v(function() {
          x(this.g.a), x(this.h.a), x(this.j.a), x(this.m.a), n(this.a);
        }, t), 0);
      }
      function O(t, n, e) {
        this.c = t, this.a = n, this.f = 0, this.m = this.j = !1, this.s = e;
      }
      var b = null;
      O.prototype.g = function(t) {
        var n = this.a;
        n.g && m(n.f, [n.a.c("wf", t.c, h(t).toString(), "active")], [n.a.c("wf", t.c, h(t).toString(), "loading"), n.a.c("wf", t.c, h(t).toString(), "inactive")]), y(n, "fontactive", t), this.m = !0, J(this);
      }, O.prototype.h = function(t) {
        var n = this.a;
        if (n.g) {
          var e = B(n.f, n.a.c("wf", t.c, h(t).toString(), "active")), i = [], o = [n.a.c("wf", t.c, h(t).toString(), "loading")];
          e || i.push(n.a.c("wf", t.c, h(t).toString(), "inactive")), m(n.f, i, o);
        }
        y(n, "fontinactive", t), J(this);
      };
      function J(t) {
        --t.f == 0 && t.j && (t.m ? (t = t.a, t.g && m(t.f, [t.a.c("wf", "active")], [t.a.c("wf", "loading"), t.a.c("wf", "inactive")]), y(t, "active")) : G(t.a));
      }
      function Q(t) {
        this.j = t, this.a = new vt(), this.h = 0, this.f = this.g = !0;
      }
      Q.prototype.load = function(t) {
        this.c = new ft(this.j, t.context || this.j), this.g = t.events !== !1, this.f = t.classes !== !1, yt(this, new pt(this.c, t), t);
      };
      function mt(t, n, e, i, o) {
        var s = --t.h == 0;
        (t.f || t.g) && setTimeout(function() {
          var r = o || null, a = i || null || {};
          if (e.length === 0 && s) G(n.a);
          else {
            n.f += e.length, s && (n.j = s);
            var f, u = [];
            for (f = 0; f < e.length; f++) {
              var c = e[f], l = a[c.c], g = n.a, j = c;
              if (g.g && m(g.f, [g.a.c("wf", j.c, h(j).toString(), "loading")]), y(g, "fontloading", j), g = null, b === null) if (window.FontFace) {
                var j = /Gecko.*Firefox\/(\d+)/.exec(window.navigator.userAgent), Wt = /OS X.*Version\/10\..*Safari/.exec(window.navigator.userAgent) && /Apple/.exec(window.navigator.vendor);
                b = j ? 42 < parseInt(j[1], 10) : !Wt;
              } else b = !1;
              b ? g = new R(v(n.g, n), v(n.h, n), n.c, c, n.s, l) : g = new K(v(n.g, n), v(n.h, n), n.c, c, n.s, r, l), u.push(g);
            }
            for (f = 0; f < u.length; f++) u[f].start();
          }
        }, 0);
      }
      function yt(t, n, e) {
        var o = [], i = e.timeout;
        gt(n);
        var o = dt(t.a, e, t.c), s = new O(t.c, n, i);
        for (t.h = o.length, n = 0, e = o.length; n < e; n++) o[n].load(function(r, a, f) {
          mt(t, s, r, a, f);
        });
      }
      function Y(t, n) {
        this.c = t, this.a = n;
      }
      Y.prototype.load = function(t) {
        function n() {
          if (s["__mti_fntLst" + i]) {
            var r = s["__mti_fntLst" + i](), a = [], f;
            if (r) for (var u = 0; u < r.length; u++) {
              var c = r[u].fontfamily;
              r[u].fontStyle != null && r[u].fontWeight != null ? (f = r[u].fontStyle + r[u].fontWeight, a.push(new p(c, f))) : a.push(new p(c));
            }
            t(a);
          } else setTimeout(function() {
            n();
          }, 50);
        }
        var e = this, i = e.a.projectId, o = e.a.version;
        if (i) {
          var s = e.c.o;
          N(this.c, (e.a.api || "https://fast.fonts.net/jsapi") + "/" + i + ".js" + (o ? "?v=" + o : ""), function(r) {
            r ? t([]) : (s["__MonotypeConfiguration__" + i] = function() {
              return e.a;
            }, n());
          }).id = "__MonotypeAPIScript__" + i;
        } else t([]);
      };
      function Z(t, n) {
        this.c = t, this.a = n;
      }
      Z.prototype.load = function(t) {
        var n, e, i = this.a.urls || [], o = this.a.families || [], s = this.a.testStrings || {}, r = new D();
        for (n = 0, e = i.length; n < e; n++) k(this.c, i[n], q(r));
        var a = [];
        for (n = 0, e = o.length; n < e; n++) if (i = o[n].split(":"), i[1]) for (var f = i[1].split(","), u = 0; u < f.length; u += 1) a.push(new p(i[0], f[u]));
        else a.push(new p(i[0]));
        L(r, function() {
          t(a, s);
        });
      };
      function jt(t, n) {
        t ? this.c = t : this.c = _t, this.a = [], this.f = [], this.g = n || "";
      }
      var _t = "https://fonts.googleapis.com/css";
      function xt(t, n) {
        for (var e = n.length, i = 0; i < e; i++) {
          var o = n[i].split(":");
          o.length == 3 && t.f.push(o.pop());
          var s = "";
          o.length == 2 && o[1] != "" && (s = ":"), t.a.push(o.join(s));
        }
      }
      function Tt(t) {
        if (t.a.length == 0) throw Error("No fonts to load!");
        if (t.c.indexOf("kit=") != -1) return t.c;
        for (var n = t.a.length, e = [], i = 0; i < n; i++) e.push(t.a[i].replace(/ /g, "+"));
        return n = t.c + "?family=" + e.join("%7C"), 0 < t.f.length && (n += "&subset=" + t.f.join(",")), 0 < t.g.length && (n += "&text=" + encodeURIComponent(t.g)), n;
      }
      function St(t) {
        this.f = t, this.a = [], this.c = {};
      }
      var tt = { latin: "BESbswy", "latin-ext": "çöüğş", cyrillic: "йяЖ", greek: "αβΣ", khmer: "កខគ", Hanuman: "កខគ" }, Et = { thin: "1", extralight: "2", "extra-light": "2", ultralight: "2", "ultra-light": "2", light: "3", regular: "4", book: "4", medium: "5", "semi-bold": "6", semibold: "6", "demi-bold": "6", demibold: "6", bold: "7", "extra-bold": "8", extrabold: "8", "ultra-bold": "8", ultrabold: "8", black: "9", heavy: "9", l: "3", r: "4", b: "7" }, Ct = { i: "i", italic: "i", n: "n", normal: "n" }, bt = /^(thin|(?:(?:extra|ultra)-?)?light|regular|book|medium|(?:(?:semi|demi|extra|ultra)-?)?bold|black|heavy|l|r|b|[1-9]00)?(n|i|normal|italic)?$/;
      function At(t) {
        for (var n = t.f.length, e = 0; e < n; e++) {
          var i = t.f[e].split(":"), o = i[0].replace(/\+/g, " "), s = ["n4"];
          if (2 <= i.length) {
            var r, a = i[1];
            if (r = [], a) for (var a = a.split(","), f = a.length, u = 0; u < f; u++) {
              var c;
              if (c = a[u], c.match(/^[\w-]+$/)) {
                var l = bt.exec(c.toLowerCase());
                if (l == null) c = "";
                else {
                  if (c = l[2], c = c == null || c == "" ? "n" : Ct[c], l = l[1], l == null || l == "") l = "4";
                  else var g = Et[l], l = g || (isNaN(l) ? "4" : l.substr(0, 1));
                  c = [c, l].join("");
                }
              } else c = "";
              c && r.push(c);
            }
            0 < r.length && (s = r), i.length == 3 && (i = i[2], r = [], i = i ? i.split(",") : r, 0 < i.length && (i = tt[i[0]]) && (t.c[o] = i));
          }
          for (t.c[o] || (i = tt[o]) && (t.c[o] = i), i = 0; i < s.length; i += 1) t.a.push(new p(o, s[i]));
        }
      }
      function nt(t, n) {
        this.c = t, this.a = n;
      }
      var Nt = { Arimo: !0, Cousine: !0, Tinos: !0 };
      nt.prototype.load = function(t) {
        var n = new D(), e = this.c, i = new jt(this.a.api, this.a.text), o = this.a.families;
        xt(i, o);
        var s = new St(o);
        At(s), k(e, Tt(i), q(n)), L(n, function() {
          t(s.a, s.c, Nt);
        });
      };
      function it(t, n) {
        this.c = t, this.a = n;
      }
      it.prototype.load = function(t) {
        var n = this.a.id, e = this.c.o;
        n ? N(this.c, (this.a.api || "https://use.typekit.net") + "/" + n + ".js", function(i) {
          if (i) t([]);
          else if (e.Typekit && e.Typekit.config && e.Typekit.config.fn) {
            i = e.Typekit.config.fn;
            for (var o = [], s = 0; s < i.length; s += 2) for (var r = i[s], a = i[s + 1], f = 0; f < a.length; f++) o.push(new p(r, a[f]));
            try {
              e.Typekit.load({ events: !1, classes: !1, async: !0 });
            } catch {
            }
            t(o);
          }
        }, 2e3) : t([]);
      };
      function et(t, n) {
        this.c = t, this.f = n, this.a = [];
      }
      et.prototype.load = function(t) {
        var n = this.f.id, e = this.c.o, i = this;
        n ? (e.__webfontfontdeckmodule__ || (e.__webfontfontdeckmodule__ = {}), e.__webfontfontdeckmodule__[n] = function(o, s) {
          for (var r = 0, a = s.fonts.length; r < a; ++r) {
            var f = s.fonts[r];
            i.a.push(new p(f.name, ht("font-weight:" + f.weight + ";font-style:" + f.style)));
          }
          t(i.a);
        }, N(this.c, (this.f.api || "https://f.fontdeck.com/s/css/js/") + ct(this.c) + "/" + n + ".js", function(o) {
          o && t([]);
        })) : t([]);
      };
      var w = new Q(window);
      w.a.c.custom = function(t, n) {
        return new Z(n, t);
      }, w.a.c.fontdeck = function(t, n) {
        return new et(n, t);
      }, w.a.c.monotype = function(t, n) {
        return new Y(n, t);
      }, w.a.c.typekit = function(t, n) {
        return new it(n, t);
      }, w.a.c.google = function(t, n) {
        return new nt(n, t);
      };
      var ot = { load: v(w.load, w) };
      d.exports ? d.exports = ot : (window.WebFont = ot, window.WebFontConfig && w.load(window.WebFontConfig));
    })();
  }(P)), P.exports;
}
var Pt = Ot();
const It = /* @__PURE__ */ Ft(Pt), Bt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: It
}, Symbol.toStringTag, { value: "Module" }));
export {
  Bt as w
};
