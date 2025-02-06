const Pu = {};
function I0(u) {
  let e = Pu[u];
  if (e)
    return e;
  e = Pu[u] = [];
  for (let n = 0; n < 128; n++) {
    const r = String.fromCharCode(n);
    e.push(r);
  }
  for (let n = 0; n < u.length; n++) {
    const r = u.charCodeAt(n);
    e[r] = "%" + ("0" + r.toString(16).toUpperCase()).slice(-2);
  }
  return e;
}
function V(u, e) {
  typeof e != "string" && (e = V.defaultChars);
  const n = I0(e);
  return u.replace(/(%[a-f0-9]{2})+/gi, function(r) {
    let t = "";
    for (let c = 0, o = r.length; c < o; c += 3) {
      const i = parseInt(r.slice(c + 1, c + 3), 16);
      if (i < 128) {
        t += n[i];
        continue;
      }
      if ((i & 224) === 192 && c + 3 < o) {
        const a = parseInt(r.slice(c + 4, c + 6), 16);
        if ((a & 192) === 128) {
          const s = i << 6 & 1984 | a & 63;
          s < 128 ? t += "��" : t += String.fromCharCode(s), c += 3;
          continue;
        }
      }
      if ((i & 240) === 224 && c + 6 < o) {
        const a = parseInt(r.slice(c + 4, c + 6), 16), s = parseInt(r.slice(c + 7, c + 9), 16);
        if ((a & 192) === 128 && (s & 192) === 128) {
          const f = i << 12 & 61440 | a << 6 & 4032 | s & 63;
          f < 2048 || f >= 55296 && f <= 57343 ? t += "���" : t += String.fromCharCode(f), c += 6;
          continue;
        }
      }
      if ((i & 248) === 240 && c + 9 < o) {
        const a = parseInt(r.slice(c + 4, c + 6), 16), s = parseInt(r.slice(c + 7, c + 9), 16), f = parseInt(r.slice(c + 10, c + 12), 16);
        if ((a & 192) === 128 && (s & 192) === 128 && (f & 192) === 128) {
          let l = i << 18 & 1835008 | a << 12 & 258048 | s << 6 & 4032 | f & 63;
          l < 65536 || l > 1114111 ? t += "����" : (l -= 65536, t += String.fromCharCode(55296 + (l >> 10), 56320 + (l & 1023))), c += 9;
          continue;
        }
      }
      t += "�";
    }
    return t;
  });
}
V.defaultChars = ";/?:@&=+$,#";
V.componentChars = "";
const Lu = {};
function M0(u) {
  let e = Lu[u];
  if (e)
    return e;
  e = Lu[u] = [];
  for (let n = 0; n < 128; n++) {
    const r = String.fromCharCode(n);
    /^[0-9a-z]$/i.test(r) ? e.push(r) : e.push("%" + ("0" + n.toString(16).toUpperCase()).slice(-2));
  }
  for (let n = 0; n < u.length; n++)
    e[u.charCodeAt(n)] = u[n];
  return e;
}
function eu(u, e, n) {
  typeof e != "string" && (n = e, e = eu.defaultChars), typeof n > "u" && (n = !0);
  const r = M0(e);
  let t = "";
  for (let c = 0, o = u.length; c < o; c++) {
    const i = u.charCodeAt(c);
    if (n && i === 37 && c + 2 < o && /^[0-9a-f]{2}$/i.test(u.slice(c + 1, c + 3))) {
      t += u.slice(c, c + 3), c += 2;
      continue;
    }
    if (i < 128) {
      t += r[i];
      continue;
    }
    if (i >= 55296 && i <= 57343) {
      if (i >= 55296 && i <= 56319 && c + 1 < o) {
        const a = u.charCodeAt(c + 1);
        if (a >= 56320 && a <= 57343) {
          t += encodeURIComponent(u[c] + u[c + 1]), c++;
          continue;
        }
      }
      t += "%EF%BF%BD";
      continue;
    }
    t += encodeURIComponent(u[c]);
  }
  return t;
}
eu.defaultChars = ";/?:@&=+$,-_.!~*'()#";
eu.componentChars = "-_.!~*'()";
function vu(u) {
  let e = "";
  return e += u.protocol || "", e += u.slashes ? "//" : "", e += u.auth ? u.auth + "@" : "", u.hostname && u.hostname.indexOf(":") !== -1 ? e += "[" + u.hostname + "]" : e += u.hostname || "", e += u.port ? ":" + u.port : "", e += u.pathname || "", e += u.search || "", e += u.hash || "", e;
}
function ou() {
  this.protocol = null, this.slashes = null, this.auth = null, this.port = null, this.hostname = null, this.hash = null, this.search = null, this.pathname = null;
}
const q0 = /^([a-z0-9.+-]+:)/i, R0 = /:[0-9]*$/, O0 = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, P0 = ["<", ">", '"', "`", " ", "\r", `
`, "	"], L0 = ["{", "}", "|", "\\", "^", "`"].concat(P0), j0 = ["'"].concat(L0), ju = ["%", "/", "?", ";", "#"].concat(j0), Nu = ["/", "?", "#"], N0 = 255, $u = /^[+a-z0-9A-Z_-]{0,63}$/, $0 = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, Hu = {
  javascript: !0,
  "javascript:": !0
}, Uu = {
  http: !0,
  https: !0,
  ftp: !0,
  gopher: !0,
  file: !0,
  "http:": !0,
  "https:": !0,
  "ftp:": !0,
  "gopher:": !0,
  "file:": !0
};
function Su(u, e) {
  if (u && u instanceof ou) return u;
  const n = new ou();
  return n.parse(u, e), n;
}
ou.prototype.parse = function(u, e) {
  let n, r, t, c = u;
  if (c = c.trim(), !e && u.split("#").length === 1) {
    const s = O0.exec(c);
    if (s)
      return this.pathname = s[1], s[2] && (this.search = s[2]), this;
  }
  let o = q0.exec(c);
  if (o && (o = o[0], n = o.toLowerCase(), this.protocol = o, c = c.substr(o.length)), (e || o || c.match(/^\/\/[^@\/]+@[^@\/]+/)) && (t = c.substr(0, 2) === "//", t && !(o && Hu[o]) && (c = c.substr(2), this.slashes = !0)), !Hu[o] && (t || o && !Uu[o])) {
    let s = -1;
    for (let d = 0; d < Nu.length; d++)
      r = c.indexOf(Nu[d]), r !== -1 && (s === -1 || r < s) && (s = r);
    let f, l;
    s === -1 ? l = c.lastIndexOf("@") : l = c.lastIndexOf("@", s), l !== -1 && (f = c.slice(0, l), c = c.slice(l + 1), this.auth = f), s = -1;
    for (let d = 0; d < ju.length; d++)
      r = c.indexOf(ju[d]), r !== -1 && (s === -1 || r < s) && (s = r);
    s === -1 && (s = c.length), c[s - 1] === ":" && s--;
    const b = c.slice(0, s);
    c = c.slice(s), this.parseHost(b), this.hostname = this.hostname || "";
    const h = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
    if (!h) {
      const d = this.hostname.split(/\./);
      for (let k = 0, g = d.length; k < g; k++) {
        const C = d[k];
        if (C && !C.match($u)) {
          let p = "";
          for (let _ = 0, x = C.length; _ < x; _++)
            C.charCodeAt(_) > 127 ? p += "x" : p += C[_];
          if (!p.match($u)) {
            const _ = d.slice(0, k), x = d.slice(k + 1), m = C.match($0);
            m && (_.push(m[1]), x.unshift(m[2])), x.length && (c = x.join(".") + c), this.hostname = _.join(".");
            break;
          }
        }
      }
    }
    this.hostname.length > N0 && (this.hostname = ""), h && (this.hostname = this.hostname.substr(1, this.hostname.length - 2));
  }
  const i = c.indexOf("#");
  i !== -1 && (this.hash = c.substr(i), c = c.slice(0, i));
  const a = c.indexOf("?");
  return a !== -1 && (this.search = c.substr(a), c = c.slice(0, a)), c && (this.pathname = c), Uu[n] && this.hostname && !this.pathname && (this.pathname = ""), this;
};
ou.prototype.parseHost = function(u) {
  let e = R0.exec(u);
  e && (e = e[0], e !== ":" && (this.port = e.substr(1)), u = u.substr(0, u.length - e.length)), u && (this.hostname = u);
};
const H0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  decode: V,
  encode: eu,
  format: vu,
  parse: Su
}, Symbol.toStringTag, { value: "Module" })), c0 = /[\0-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, i0 = /[\0-\x1F\x7F-\x9F]/, U0 = /[\xAD\u0600-\u0605\u061C\u06DD\u070F\u0890\u0891\u08E2\u180E\u200B-\u200F\u202A-\u202E\u2060-\u2064\u2066-\u206F\uFEFF\uFFF9-\uFFFB]|\uD804[\uDCBD\uDCCD]|\uD80D[\uDC30-\uDC3F]|\uD82F[\uDCA0-\uDCA3]|\uD834[\uDD73-\uDD7A]|\uDB40[\uDC01\uDC20-\uDC7F]/, Tu = /[!-#%-\*,-\/:;\?@\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061D-\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1B7D\u1B7E\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52-\u2E5D\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD803[\uDEAD\uDF55-\uDF59\uDF86-\uDF89]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC8\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDC4B-\uDC4F\uDC5A\uDC5B\uDC5D\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDE60-\uDE6C\uDEB9\uDF3C-\uDF3E]|\uD806[\uDC3B\uDD44-\uDD46\uDDE2\uDE3F-\uDE46\uDE9A-\uDE9C\uDE9E-\uDEA2\uDF00-\uDF09]|\uD807[\uDC41-\uDC45\uDC70\uDC71\uDEF7\uDEF8\uDF43-\uDF4F\uDFFF]|\uD809[\uDC70-\uDC74]|\uD80B[\uDFF1\uDFF2]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD81B[\uDE97-\uDE9A\uDFE2]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]|\uD83A[\uDD5E\uDD5F]/, o0 = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u0888\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20C0\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFF\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u31EF\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC2\uFD40-\uFD4F\uFDCF\uFDFC-\uFDFF\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD833[\uDF50-\uDFC3]|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDEA\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEDC-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF76\uDF7B-\uDFD9\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDE53\uDE60-\uDE6D\uDE70-\uDE7C\uDE80-\uDE88\uDE90-\uDEBD\uDEBF-\uDEC5\uDECE-\uDEDB\uDEE0-\uDEE8\uDEF0-\uDEF8\uDF00-\uDF92\uDF94-\uDFCA]/, a0 = /[ \xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/, Z0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Any: c0,
  Cc: i0,
  Cf: U0,
  P: Tu,
  S: o0,
  Z: a0
}, Symbol.toStringTag, { value: "Module" })), V0 = new Uint16Array(
  // prettier-ignore
  'ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((u) => u.charCodeAt(0))
), G0 = new Uint16Array(
  // prettier-ignore
  "Ȁaglq	\x1Bɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((u) => u.charCodeAt(0))
);
var _u;
const W0 = /* @__PURE__ */ new Map([
  [0, 65533],
  // C1 Unicode control character reference replacements
  [128, 8364],
  [130, 8218],
  [131, 402],
  [132, 8222],
  [133, 8230],
  [134, 8224],
  [135, 8225],
  [136, 710],
  [137, 8240],
  [138, 352],
  [139, 8249],
  [140, 338],
  [142, 381],
  [145, 8216],
  [146, 8217],
  [147, 8220],
  [148, 8221],
  [149, 8226],
  [150, 8211],
  [151, 8212],
  [152, 732],
  [153, 8482],
  [154, 353],
  [155, 8250],
  [156, 339],
  [158, 382],
  [159, 376]
]), J0 = (
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, node/no-unsupported-features/es-builtins
  (_u = String.fromCodePoint) !== null && _u !== void 0 ? _u : function(u) {
    let e = "";
    return u > 65535 && (u -= 65536, e += String.fromCharCode(u >>> 10 & 1023 | 55296), u = 56320 | u & 1023), e += String.fromCharCode(u), e;
  }
);
function Q0(u) {
  var e;
  return u >= 55296 && u <= 57343 || u > 1114111 ? 65533 : (e = W0.get(u)) !== null && e !== void 0 ? e : u;
}
var A;
(function(u) {
  u[u.NUM = 35] = "NUM", u[u.SEMI = 59] = "SEMI", u[u.EQUALS = 61] = "EQUALS", u[u.ZERO = 48] = "ZERO", u[u.NINE = 57] = "NINE", u[u.LOWER_A = 97] = "LOWER_A", u[u.LOWER_F = 102] = "LOWER_F", u[u.LOWER_X = 120] = "LOWER_X", u[u.LOWER_Z = 122] = "LOWER_Z", u[u.UPPER_A = 65] = "UPPER_A", u[u.UPPER_F = 70] = "UPPER_F", u[u.UPPER_Z = 90] = "UPPER_Z";
})(A || (A = {}));
const X0 = 32;
var L;
(function(u) {
  u[u.VALUE_LENGTH = 49152] = "VALUE_LENGTH", u[u.BRANCH_LENGTH = 16256] = "BRANCH_LENGTH", u[u.JUMP_TABLE = 127] = "JUMP_TABLE";
})(L || (L = {}));
function yu(u) {
  return u >= A.ZERO && u <= A.NINE;
}
function Y0(u) {
  return u >= A.UPPER_A && u <= A.UPPER_F || u >= A.LOWER_A && u <= A.LOWER_F;
}
function K0(u) {
  return u >= A.UPPER_A && u <= A.UPPER_Z || u >= A.LOWER_A && u <= A.LOWER_Z || yu(u);
}
function ue(u) {
  return u === A.EQUALS || K0(u);
}
var y;
(function(u) {
  u[u.EntityStart = 0] = "EntityStart", u[u.NumericStart = 1] = "NumericStart", u[u.NumericDecimal = 2] = "NumericDecimal", u[u.NumericHex = 3] = "NumericHex", u[u.NamedEntity = 4] = "NamedEntity";
})(y || (y = {}));
var P;
(function(u) {
  u[u.Legacy = 0] = "Legacy", u[u.Strict = 1] = "Strict", u[u.Attribute = 2] = "Attribute";
})(P || (P = {}));
class ee {
  constructor(e, n, r) {
    this.decodeTree = e, this.emitCodePoint = n, this.errors = r, this.state = y.EntityStart, this.consumed = 1, this.result = 0, this.treeIndex = 0, this.excess = 1, this.decodeMode = P.Strict;
  }
  /** Resets the instance to make it reusable. */
  startEntity(e) {
    this.decodeMode = e, this.state = y.EntityStart, this.result = 0, this.treeIndex = 0, this.excess = 1, this.consumed = 1;
  }
  /**
   * Write an entity to the decoder. This can be called multiple times with partial entities.
   * If the entity is incomplete, the decoder will return -1.
   *
   * Mirrors the implementation of `getDecoder`, but with the ability to stop decoding if the
   * entity is incomplete, and resume when the next string is written.
   *
   * @param string The string containing the entity (or a continuation of the entity).
   * @param offset The offset at which the entity begins. Should be 0 if this is not the first call.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  write(e, n) {
    switch (this.state) {
      case y.EntityStart:
        return e.charCodeAt(n) === A.NUM ? (this.state = y.NumericStart, this.consumed += 1, this.stateNumericStart(e, n + 1)) : (this.state = y.NamedEntity, this.stateNamedEntity(e, n));
      case y.NumericStart:
        return this.stateNumericStart(e, n);
      case y.NumericDecimal:
        return this.stateNumericDecimal(e, n);
      case y.NumericHex:
        return this.stateNumericHex(e, n);
      case y.NamedEntity:
        return this.stateNamedEntity(e, n);
    }
  }
  /**
   * Switches between the numeric decimal and hexadecimal states.
   *
   * Equivalent to the `Numeric character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericStart(e, n) {
    return n >= e.length ? -1 : (e.charCodeAt(n) | X0) === A.LOWER_X ? (this.state = y.NumericHex, this.consumed += 1, this.stateNumericHex(e, n + 1)) : (this.state = y.NumericDecimal, this.stateNumericDecimal(e, n));
  }
  addToNumericResult(e, n, r, t) {
    if (n !== r) {
      const c = r - n;
      this.result = this.result * Math.pow(t, c) + parseInt(e.substr(n, c), t), this.consumed += c;
    }
  }
  /**
   * Parses a hexadecimal numeric entity.
   *
   * Equivalent to the `Hexademical character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericHex(e, n) {
    const r = n;
    for (; n < e.length; ) {
      const t = e.charCodeAt(n);
      if (yu(t) || Y0(t))
        n += 1;
      else
        return this.addToNumericResult(e, r, n, 16), this.emitNumericEntity(t, 3);
    }
    return this.addToNumericResult(e, r, n, 16), -1;
  }
  /**
   * Parses a decimal numeric entity.
   *
   * Equivalent to the `Decimal character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNumericDecimal(e, n) {
    const r = n;
    for (; n < e.length; ) {
      const t = e.charCodeAt(n);
      if (yu(t))
        n += 1;
      else
        return this.addToNumericResult(e, r, n, 10), this.emitNumericEntity(t, 2);
    }
    return this.addToNumericResult(e, r, n, 10), -1;
  }
  /**
   * Validate and emit a numeric entity.
   *
   * Implements the logic from the `Hexademical character reference start
   * state` and `Numeric character reference end state` in the HTML spec.
   *
   * @param lastCp The last code point of the entity. Used to see if the
   *               entity was terminated with a semicolon.
   * @param expectedLength The minimum number of characters that should be
   *                       consumed. Used to validate that at least one digit
   *                       was consumed.
   * @returns The number of characters that were consumed.
   */
  emitNumericEntity(e, n) {
    var r;
    if (this.consumed <= n)
      return (r = this.errors) === null || r === void 0 || r.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
    if (e === A.SEMI)
      this.consumed += 1;
    else if (this.decodeMode === P.Strict)
      return 0;
    return this.emitCodePoint(Q0(this.result), this.consumed), this.errors && (e !== A.SEMI && this.errors.missingSemicolonAfterCharacterReference(), this.errors.validateNumericCharacterReference(this.result)), this.consumed;
  }
  /**
   * Parses a named entity.
   *
   * Equivalent to the `Named character reference state` in the HTML spec.
   *
   * @param str The string containing the entity (or a continuation of the entity).
   * @param offset The current offset.
   * @returns The number of characters that were consumed, or -1 if the entity is incomplete.
   */
  stateNamedEntity(e, n) {
    const { decodeTree: r } = this;
    let t = r[this.treeIndex], c = (t & L.VALUE_LENGTH) >> 14;
    for (; n < e.length; n++, this.excess++) {
      const o = e.charCodeAt(n);
      if (this.treeIndex = ne(r, t, this.treeIndex + Math.max(1, c), o), this.treeIndex < 0)
        return this.result === 0 || // If we are parsing an attribute
        this.decodeMode === P.Attribute && // We shouldn't have consumed any characters after the entity,
        (c === 0 || // And there should be no invalid characters.
        ue(o)) ? 0 : this.emitNotTerminatedNamedEntity();
      if (t = r[this.treeIndex], c = (t & L.VALUE_LENGTH) >> 14, c !== 0) {
        if (o === A.SEMI)
          return this.emitNamedEntityData(this.treeIndex, c, this.consumed + this.excess);
        this.decodeMode !== P.Strict && (this.result = this.treeIndex, this.consumed += this.excess, this.excess = 0);
      }
    }
    return -1;
  }
  /**
   * Emit a named entity that was not terminated with a semicolon.
   *
   * @returns The number of characters consumed.
   */
  emitNotTerminatedNamedEntity() {
    var e;
    const { result: n, decodeTree: r } = this, t = (r[n] & L.VALUE_LENGTH) >> 14;
    return this.emitNamedEntityData(n, t, this.consumed), (e = this.errors) === null || e === void 0 || e.missingSemicolonAfterCharacterReference(), this.consumed;
  }
  /**
   * Emit a named entity.
   *
   * @param result The index of the entity in the decode tree.
   * @param valueLength The number of bytes in the entity.
   * @param consumed The number of characters consumed.
   *
   * @returns The number of characters consumed.
   */
  emitNamedEntityData(e, n, r) {
    const { decodeTree: t } = this;
    return this.emitCodePoint(n === 1 ? t[e] & ~L.VALUE_LENGTH : t[e + 1], r), n === 3 && this.emitCodePoint(t[e + 2], r), r;
  }
  /**
   * Signal to the parser that the end of the input was reached.
   *
   * Remaining data will be emitted and relevant errors will be produced.
   *
   * @returns The number of characters consumed.
   */
  end() {
    var e;
    switch (this.state) {
      case y.NamedEntity:
        return this.result !== 0 && (this.decodeMode !== P.Attribute || this.result === this.treeIndex) ? this.emitNotTerminatedNamedEntity() : 0;
      // Otherwise, emit a numeric entity if we have one.
      case y.NumericDecimal:
        return this.emitNumericEntity(0, 2);
      case y.NumericHex:
        return this.emitNumericEntity(0, 3);
      case y.NumericStart:
        return (e = this.errors) === null || e === void 0 || e.absenceOfDigitsInNumericCharacterReference(this.consumed), 0;
      case y.EntityStart:
        return 0;
    }
  }
}
function s0(u) {
  let e = "";
  const n = new ee(u, (r) => e += J0(r));
  return function(t, c) {
    let o = 0, i = 0;
    for (; (i = t.indexOf("&", i)) >= 0; ) {
      e += t.slice(o, i), n.startEntity(c);
      const s = n.write(
        t,
        // Skip the "&"
        i + 1
      );
      if (s < 0) {
        o = i + n.end();
        break;
      }
      o = i + s, i = s === 0 ? o + 1 : o;
    }
    const a = e + t.slice(o);
    return e = "", a;
  };
}
function ne(u, e, n, r) {
  const t = (e & L.BRANCH_LENGTH) >> 7, c = e & L.JUMP_TABLE;
  if (t === 0)
    return c !== 0 && r === c ? n : -1;
  if (c) {
    const a = r - c;
    return a < 0 || a >= t ? -1 : u[n + a] - 1;
  }
  let o = n, i = o + t - 1;
  for (; o <= i; ) {
    const a = o + i >>> 1, s = u[a];
    if (s < r)
      o = a + 1;
    else if (s > r)
      i = a - 1;
    else
      return u[a + t];
  }
  return -1;
}
const re = s0(V0);
s0(G0);
function f0(u, e = P.Legacy) {
  return re(u, e);
}
function te(u) {
  return Object.prototype.toString.call(u);
}
function Bu(u) {
  return te(u) === "[object String]";
}
const ce = Object.prototype.hasOwnProperty;
function ie(u, e) {
  return ce.call(u, e);
}
function lu(u) {
  return Array.prototype.slice.call(arguments, 1).forEach(function(n) {
    if (n) {
      if (typeof n != "object")
        throw new TypeError(n + "must be object");
      Object.keys(n).forEach(function(r) {
        u[r] = n[r];
      });
    }
  }), u;
}
function l0(u, e, n) {
  return [].concat(u.slice(0, e), n, u.slice(e + 1));
}
function zu(u) {
  return !(u >= 55296 && u <= 57343 || u >= 64976 && u <= 65007 || (u & 65535) === 65535 || (u & 65535) === 65534 || u >= 0 && u <= 8 || u === 11 || u >= 14 && u <= 31 || u >= 127 && u <= 159 || u > 1114111);
}
function au(u) {
  if (u > 65535) {
    u -= 65536;
    const e = 55296 + (u >> 10), n = 56320 + (u & 1023);
    return String.fromCharCode(e, n);
  }
  return String.fromCharCode(u);
}
const d0 = /\\([!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~])/g, oe = /&([a-z#][a-z0-9]{1,31});/gi, ae = new RegExp(d0.source + "|" + oe.source, "gi"), se = /^#((?:x[a-f0-9]{1,8}|[0-9]{1,8}))$/i;
function fe(u, e) {
  if (e.charCodeAt(0) === 35 && se.test(e)) {
    const r = e[1].toLowerCase() === "x" ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10);
    return zu(r) ? au(r) : u;
  }
  const n = f0(u);
  return n !== u ? n : u;
}
function le(u) {
  return u.indexOf("\\") < 0 ? u : u.replace(d0, "$1");
}
function G(u) {
  return u.indexOf("\\") < 0 && u.indexOf("&") < 0 ? u : u.replace(ae, function(e, n, r) {
    return n || fe(e, r);
  });
}
const de = /[&<>"]/, he = /[&<>"]/g, be = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;"
};
function pe(u) {
  return be[u];
}
function j(u) {
  return de.test(u) ? u.replace(he, pe) : u;
}
const xe = /[.?*+^$[\]\\(){}|-]/g;
function _e(u) {
  return u.replace(xe, "\\$&");
}
function E(u) {
  switch (u) {
    case 9:
    case 32:
      return !0;
  }
  return !1;
}
function X(u) {
  if (u >= 8192 && u <= 8202)
    return !0;
  switch (u) {
    case 9:
    // \t
    case 10:
    // \n
    case 11:
    // \v
    case 12:
    // \f
    case 13:
    // \r
    case 32:
    case 160:
    case 5760:
    case 8239:
    case 8287:
    case 12288:
      return !0;
  }
  return !1;
}
function Y(u) {
  return Tu.test(u) || o0.test(u);
}
function K(u) {
  switch (u) {
    case 33:
    case 34:
    case 35:
    case 36:
    case 37:
    case 38:
    case 39:
    case 40:
    case 41:
    case 42:
    case 43:
    case 44:
    case 45:
    case 46:
    case 47:
    case 58:
    case 59:
    case 60:
    case 61:
    case 62:
    case 63:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 124:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
function du(u) {
  return u = u.trim().replace(/\s+/g, " "), "ẞ".toLowerCase() === "Ṿ" && (u = u.replace(/ẞ/g, "ß")), u.toLowerCase().toUpperCase();
}
const me = { mdurl: H0, ucmicro: Z0 }, ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  arrayReplaceAt: l0,
  assign: lu,
  escapeHtml: j,
  escapeRE: _e,
  fromCodePoint: au,
  has: ie,
  isMdAsciiPunct: K,
  isPunctChar: Y,
  isSpace: E,
  isString: Bu,
  isValidEntityCode: zu,
  isWhiteSpace: X,
  lib: me,
  normalizeReference: du,
  unescapeAll: G,
  unescapeMd: le
}, Symbol.toStringTag, { value: "Module" }));
function ge(u, e, n) {
  let r, t, c, o;
  const i = u.posMax, a = u.pos;
  for (u.pos = e + 1, r = 1; u.pos < i; ) {
    if (c = u.src.charCodeAt(u.pos), c === 93 && (r--, r === 0)) {
      t = !0;
      break;
    }
    if (o = u.pos, u.md.inline.skipToken(u), c === 91) {
      if (o === u.pos - 1)
        r++;
      else if (n)
        return u.pos = a, -1;
    }
  }
  let s = -1;
  return t && (s = u.pos), u.pos = a, s;
}
function De(u, e, n) {
  let r, t = e;
  const c = {
    ok: !1,
    pos: 0,
    str: ""
  };
  if (u.charCodeAt(t) === 60) {
    for (t++; t < n; ) {
      if (r = u.charCodeAt(t), r === 10 || r === 60)
        return c;
      if (r === 62)
        return c.pos = t + 1, c.str = G(u.slice(e + 1, t)), c.ok = !0, c;
      if (r === 92 && t + 1 < n) {
        t += 2;
        continue;
      }
      t++;
    }
    return c;
  }
  let o = 0;
  for (; t < n && (r = u.charCodeAt(t), !(r === 32 || r < 32 || r === 127)); ) {
    if (r === 92 && t + 1 < n) {
      if (u.charCodeAt(t + 1) === 32)
        break;
      t += 2;
      continue;
    }
    if (r === 40 && (o++, o > 32))
      return c;
    if (r === 41) {
      if (o === 0)
        break;
      o--;
    }
    t++;
  }
  return e === t || o !== 0 || (c.str = G(u.slice(e, t)), c.pos = t, c.ok = !0), c;
}
function Ce(u, e, n, r) {
  let t, c = e;
  const o = {
    // if `true`, this is a valid link title
    ok: !1,
    // if `true`, this link can be continued on the next line
    can_continue: !1,
    // if `ok`, it's the position of the first character after the closing marker
    pos: 0,
    // if `ok`, it's the unescaped title
    str: "",
    // expected closing marker character code
    marker: 0
  };
  if (r)
    o.str = r.str, o.marker = r.marker;
  else {
    if (c >= n)
      return o;
    let i = u.charCodeAt(c);
    if (i !== 34 && i !== 39 && i !== 40)
      return o;
    e++, c++, i === 40 && (i = 41), o.marker = i;
  }
  for (; c < n; ) {
    if (t = u.charCodeAt(c), t === o.marker)
      return o.pos = c + 1, o.str += G(u.slice(e, c)), o.ok = !0, o;
    if (t === 40 && o.marker === 41)
      return o;
    t === 92 && c + 1 < n && c++, c++;
  }
  return o.can_continue = !0, o.str += G(u.slice(e, c)), o;
}
const Ee = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  parseLinkDestination: De,
  parseLinkLabel: ge,
  parseLinkTitle: Ce
}, Symbol.toStringTag, { value: "Module" })), M = {};
M.code_inline = function(u, e, n, r, t) {
  const c = u[e];
  return "<code" + t.renderAttrs(c) + ">" + j(c.content) + "</code>";
};
M.code_block = function(u, e, n, r, t) {
  const c = u[e];
  return "<pre" + t.renderAttrs(c) + "><code>" + j(u[e].content) + `</code></pre>
`;
};
M.fence = function(u, e, n, r, t) {
  const c = u[e], o = c.info ? G(c.info).trim() : "";
  let i = "", a = "";
  if (o) {
    const f = o.split(/(\s+)/g);
    i = f[0], a = f.slice(2).join("");
  }
  let s;
  if (n.highlight ? s = n.highlight(c.content, i, a) || j(c.content) : s = j(c.content), s.indexOf("<pre") === 0)
    return s + `
`;
  if (o) {
    const f = c.attrIndex("class"), l = c.attrs ? c.attrs.slice() : [];
    f < 0 ? l.push(["class", n.langPrefix + i]) : (l[f] = l[f].slice(), l[f][1] += " " + n.langPrefix + i);
    const b = {
      attrs: l
    };
    return `<pre><code${t.renderAttrs(b)}>${s}</code></pre>
`;
  }
  return `<pre><code${t.renderAttrs(c)}>${s}</code></pre>
`;
};
M.image = function(u, e, n, r, t) {
  const c = u[e];
  return c.attrs[c.attrIndex("alt")][1] = t.renderInlineAsText(c.children, n, r), t.renderToken(u, e, n);
};
M.hardbreak = function(u, e, n) {
  return n.xhtmlOut ? `<br />
` : `<br>
`;
};
M.softbreak = function(u, e, n) {
  return n.breaks ? n.xhtmlOut ? `<br />
` : `<br>
` : `
`;
};
M.text = function(u, e) {
  return j(u[e].content);
};
M.html_block = function(u, e) {
  return u[e].content;
};
M.html_inline = function(u, e) {
  return u[e].content;
};
function J() {
  this.rules = lu({}, M);
}
J.prototype.renderAttrs = function(e) {
  let n, r, t;
  if (!e.attrs)
    return "";
  for (t = "", n = 0, r = e.attrs.length; n < r; n++)
    t += " " + j(e.attrs[n][0]) + '="' + j(e.attrs[n][1]) + '"';
  return t;
};
J.prototype.renderToken = function(e, n, r) {
  const t = e[n];
  let c = "";
  if (t.hidden)
    return "";
  t.block && t.nesting !== -1 && n && e[n - 1].hidden && (c += `
`), c += (t.nesting === -1 ? "</" : "<") + t.tag, c += this.renderAttrs(t), t.nesting === 0 && r.xhtmlOut && (c += " /");
  let o = !1;
  if (t.block && (o = !0, t.nesting === 1 && n + 1 < e.length)) {
    const i = e[n + 1];
    (i.type === "inline" || i.hidden || i.nesting === -1 && i.tag === t.tag) && (o = !1);
  }
  return c += o ? `>
` : ">", c;
};
J.prototype.renderInline = function(u, e, n) {
  let r = "";
  const t = this.rules;
  for (let c = 0, o = u.length; c < o; c++) {
    const i = u[c].type;
    typeof t[i] < "u" ? r += t[i](u, c, e, n, this) : r += this.renderToken(u, c, e);
  }
  return r;
};
J.prototype.renderInlineAsText = function(u, e, n) {
  let r = "";
  for (let t = 0, c = u.length; t < c; t++)
    switch (u[t].type) {
      case "text":
        r += u[t].content;
        break;
      case "image":
        r += this.renderInlineAsText(u[t].children, e, n);
        break;
      case "html_inline":
      case "html_block":
        r += u[t].content;
        break;
      case "softbreak":
      case "hardbreak":
        r += `
`;
        break;
    }
  return r;
};
J.prototype.render = function(u, e, n) {
  let r = "";
  const t = this.rules;
  for (let c = 0, o = u.length; c < o; c++) {
    const i = u[c].type;
    i === "inline" ? r += this.renderInline(u[c].children, e, n) : typeof t[i] < "u" ? r += t[i](u, c, e, n, this) : r += this.renderToken(u, c, e, n);
  }
  return r;
};
function w() {
  this.__rules__ = [], this.__cache__ = null;
}
w.prototype.__find__ = function(u) {
  for (let e = 0; e < this.__rules__.length; e++)
    if (this.__rules__[e].name === u)
      return e;
  return -1;
};
w.prototype.__compile__ = function() {
  const u = this, e = [""];
  u.__rules__.forEach(function(n) {
    n.enabled && n.alt.forEach(function(r) {
      e.indexOf(r) < 0 && e.push(r);
    });
  }), u.__cache__ = {}, e.forEach(function(n) {
    u.__cache__[n] = [], u.__rules__.forEach(function(r) {
      r.enabled && (n && r.alt.indexOf(n) < 0 || u.__cache__[n].push(r.fn));
    });
  });
};
w.prototype.at = function(u, e, n) {
  const r = this.__find__(u), t = n || {};
  if (r === -1)
    throw new Error("Parser rule not found: " + u);
  this.__rules__[r].fn = e, this.__rules__[r].alt = t.alt || [], this.__cache__ = null;
};
w.prototype.before = function(u, e, n, r) {
  const t = this.__find__(u), c = r || {};
  if (t === -1)
    throw new Error("Parser rule not found: " + u);
  this.__rules__.splice(t, 0, {
    name: e,
    enabled: !0,
    fn: n,
    alt: c.alt || []
  }), this.__cache__ = null;
};
w.prototype.after = function(u, e, n, r) {
  const t = this.__find__(u), c = r || {};
  if (t === -1)
    throw new Error("Parser rule not found: " + u);
  this.__rules__.splice(t + 1, 0, {
    name: e,
    enabled: !0,
    fn: n,
    alt: c.alt || []
  }), this.__cache__ = null;
};
w.prototype.push = function(u, e, n) {
  const r = n || {};
  this.__rules__.push({
    name: u,
    enabled: !0,
    fn: e,
    alt: r.alt || []
  }), this.__cache__ = null;
};
w.prototype.enable = function(u, e) {
  Array.isArray(u) || (u = [u]);
  const n = [];
  return u.forEach(function(r) {
    const t = this.__find__(r);
    if (t < 0) {
      if (e)
        return;
      throw new Error("Rules manager: invalid rule name " + r);
    }
    this.__rules__[t].enabled = !0, n.push(r);
  }, this), this.__cache__ = null, n;
};
w.prototype.enableOnly = function(u, e) {
  Array.isArray(u) || (u = [u]), this.__rules__.forEach(function(n) {
    n.enabled = !1;
  }), this.enable(u, e);
};
w.prototype.disable = function(u, e) {
  Array.isArray(u) || (u = [u]);
  const n = [];
  return u.forEach(function(r) {
    const t = this.__find__(r);
    if (t < 0) {
      if (e)
        return;
      throw new Error("Rules manager: invalid rule name " + r);
    }
    this.__rules__[t].enabled = !1, n.push(r);
  }, this), this.__cache__ = null, n;
};
w.prototype.getRules = function(u) {
  return this.__cache__ === null && this.__compile__(), this.__cache__[u] || [];
};
function B(u, e, n) {
  this.type = u, this.tag = e, this.attrs = null, this.map = null, this.nesting = n, this.level = 0, this.children = null, this.content = "", this.markup = "", this.info = "", this.meta = null, this.block = !1, this.hidden = !1;
}
B.prototype.attrIndex = function(e) {
  if (!this.attrs)
    return -1;
  const n = this.attrs;
  for (let r = 0, t = n.length; r < t; r++)
    if (n[r][0] === e)
      return r;
  return -1;
};
B.prototype.attrPush = function(e) {
  this.attrs ? this.attrs.push(e) : this.attrs = [e];
};
B.prototype.attrSet = function(e, n) {
  const r = this.attrIndex(e), t = [e, n];
  r < 0 ? this.attrPush(t) : this.attrs[r] = t;
};
B.prototype.attrGet = function(e) {
  const n = this.attrIndex(e);
  let r = null;
  return n >= 0 && (r = this.attrs[n][1]), r;
};
B.prototype.attrJoin = function(e, n) {
  const r = this.attrIndex(e);
  r < 0 ? this.attrPush([e, n]) : this.attrs[r][1] = this.attrs[r][1] + " " + n;
};
function h0(u, e, n) {
  this.src = u, this.env = n, this.tokens = [], this.inlineMode = !1, this.md = e;
}
h0.prototype.Token = B;
const ye = /\r\n?|\n/g, Ae = /\0/g;
function Fe(u) {
  let e;
  e = u.src.replace(ye, `
`), e = e.replace(Ae, "�"), u.src = e;
}
function we(u) {
  let e;
  u.inlineMode ? (e = new u.Token("inline", "", 0), e.content = u.src, e.map = [0, 1], e.children = [], u.tokens.push(e)) : u.md.block.parse(u.src, u.md, u.env, u.tokens);
}
function ve(u) {
  const e = u.tokens;
  for (let n = 0, r = e.length; n < r; n++) {
    const t = e[n];
    t.type === "inline" && u.md.inline.parse(t.content, u.md, u.env, t.children);
  }
}
function Se(u) {
  return /^<a[>\s]/i.test(u);
}
function Te(u) {
  return /^<\/a\s*>/i.test(u);
}
function Be(u) {
  const e = u.tokens;
  if (u.md.options.linkify)
    for (let n = 0, r = e.length; n < r; n++) {
      if (e[n].type !== "inline" || !u.md.linkify.pretest(e[n].content))
        continue;
      let t = e[n].children, c = 0;
      for (let o = t.length - 1; o >= 0; o--) {
        const i = t[o];
        if (i.type === "link_close") {
          for (o--; t[o].level !== i.level && t[o].type !== "link_open"; )
            o--;
          continue;
        }
        if (i.type === "html_inline" && (Se(i.content) && c > 0 && c--, Te(i.content) && c++), !(c > 0) && i.type === "text" && u.md.linkify.test(i.content)) {
          const a = i.content;
          let s = u.md.linkify.match(a);
          const f = [];
          let l = i.level, b = 0;
          s.length > 0 && s[0].index === 0 && o > 0 && t[o - 1].type === "text_special" && (s = s.slice(1));
          for (let h = 0; h < s.length; h++) {
            const d = s[h].url, k = u.md.normalizeLink(d);
            if (!u.md.validateLink(k))
              continue;
            let g = s[h].text;
            s[h].schema ? s[h].schema === "mailto:" && !/^mailto:/i.test(g) ? g = u.md.normalizeLinkText("mailto:" + g).replace(/^mailto:/, "") : g = u.md.normalizeLinkText(g) : g = u.md.normalizeLinkText("http://" + g).replace(/^http:\/\//, "");
            const C = s[h].index;
            if (C > b) {
              const m = new u.Token("text", "", 0);
              m.content = a.slice(b, C), m.level = l, f.push(m);
            }
            const p = new u.Token("link_open", "a", 1);
            p.attrs = [["href", k]], p.level = l++, p.markup = "linkify", p.info = "auto", f.push(p);
            const _ = new u.Token("text", "", 0);
            _.content = g, _.level = l, f.push(_);
            const x = new u.Token("link_close", "a", -1);
            x.level = --l, x.markup = "linkify", x.info = "auto", f.push(x), b = s[h].lastIndex;
          }
          if (b < a.length) {
            const h = new u.Token("text", "", 0);
            h.content = a.slice(b), h.level = l, f.push(h);
          }
          e[n].children = t = l0(t, o, f);
        }
      }
    }
}
const b0 = /\+-|\.\.|\?\?\?\?|!!!!|,,|--/, ze = /\((c|tm|r)\)/i, Ie = /\((c|tm|r)\)/ig, Me = {
  c: "©",
  r: "®",
  tm: "™"
};
function qe(u, e) {
  return Me[e.toLowerCase()];
}
function Re(u) {
  let e = 0;
  for (let n = u.length - 1; n >= 0; n--) {
    const r = u[n];
    r.type === "text" && !e && (r.content = r.content.replace(Ie, qe)), r.type === "link_open" && r.info === "auto" && e--, r.type === "link_close" && r.info === "auto" && e++;
  }
}
function Oe(u) {
  let e = 0;
  for (let n = u.length - 1; n >= 0; n--) {
    const r = u[n];
    r.type === "text" && !e && b0.test(r.content) && (r.content = r.content.replace(/\+-/g, "±").replace(/\.{2,}/g, "…").replace(/([?!])…/g, "$1..").replace(/([?!]){4,}/g, "$1$1$1").replace(/,{2,}/g, ",").replace(/(^|[^-])---(?=[^-]|$)/mg, "$1—").replace(/(^|\s)--(?=\s|$)/mg, "$1–").replace(/(^|[^-\s])--(?=[^-\s]|$)/mg, "$1–")), r.type === "link_open" && r.info === "auto" && e--, r.type === "link_close" && r.info === "auto" && e++;
  }
}
function Pe(u) {
  let e;
  if (u.md.options.typographer)
    for (e = u.tokens.length - 1; e >= 0; e--)
      u.tokens[e].type === "inline" && (ze.test(u.tokens[e].content) && Re(u.tokens[e].children), b0.test(u.tokens[e].content) && Oe(u.tokens[e].children));
}
const Le = /['"]/, Zu = /['"]/g, Vu = "’";
function cu(u, e, n) {
  return u.slice(0, e) + n + u.slice(e + 1);
}
function je(u, e) {
  let n;
  const r = [];
  for (let t = 0; t < u.length; t++) {
    const c = u[t], o = u[t].level;
    for (n = r.length - 1; n >= 0 && !(r[n].level <= o); n--)
      ;
    if (r.length = n + 1, c.type !== "text")
      continue;
    let i = c.content, a = 0, s = i.length;
    u:
      for (; a < s; ) {
        Zu.lastIndex = a;
        const f = Zu.exec(i);
        if (!f)
          break;
        let l = !0, b = !0;
        a = f.index + 1;
        const h = f[0] === "'";
        let d = 32;
        if (f.index - 1 >= 0)
          d = i.charCodeAt(f.index - 1);
        else
          for (n = t - 1; n >= 0 && !(u[n].type === "softbreak" || u[n].type === "hardbreak"); n--)
            if (u[n].content) {
              d = u[n].content.charCodeAt(u[n].content.length - 1);
              break;
            }
        let k = 32;
        if (a < s)
          k = i.charCodeAt(a);
        else
          for (n = t + 1; n < u.length && !(u[n].type === "softbreak" || u[n].type === "hardbreak"); n++)
            if (u[n].content) {
              k = u[n].content.charCodeAt(0);
              break;
            }
        const g = K(d) || Y(String.fromCharCode(d)), C = K(k) || Y(String.fromCharCode(k)), p = X(d), _ = X(k);
        if (_ ? l = !1 : C && (p || g || (l = !1)), p ? b = !1 : g && (_ || C || (b = !1)), k === 34 && f[0] === '"' && d >= 48 && d <= 57 && (b = l = !1), l && b && (l = g, b = C), !l && !b) {
          h && (c.content = cu(c.content, f.index, Vu));
          continue;
        }
        if (b)
          for (n = r.length - 1; n >= 0; n--) {
            let x = r[n];
            if (r[n].level < o)
              break;
            if (x.single === h && r[n].level === o) {
              x = r[n];
              let m, D;
              h ? (m = e.md.options.quotes[2], D = e.md.options.quotes[3]) : (m = e.md.options.quotes[0], D = e.md.options.quotes[1]), c.content = cu(c.content, f.index, D), u[x.token].content = cu(
                u[x.token].content,
                x.pos,
                m
              ), a += D.length - 1, x.token === t && (a += m.length - 1), i = c.content, s = i.length, r.length = n;
              continue u;
            }
          }
        l ? r.push({
          token: t,
          pos: f.index,
          single: h,
          level: o
        }) : b && h && (c.content = cu(c.content, f.index, Vu));
      }
  }
}
function Ne(u) {
  if (u.md.options.typographer)
    for (let e = u.tokens.length - 1; e >= 0; e--)
      u.tokens[e].type !== "inline" || !Le.test(u.tokens[e].content) || je(u.tokens[e].children, u);
}
function $e(u) {
  let e, n;
  const r = u.tokens, t = r.length;
  for (let c = 0; c < t; c++) {
    if (r[c].type !== "inline") continue;
    const o = r[c].children, i = o.length;
    for (e = 0; e < i; e++)
      o[e].type === "text_special" && (o[e].type = "text");
    for (e = n = 0; e < i; e++)
      o[e].type === "text" && e + 1 < i && o[e + 1].type === "text" ? o[e + 1].content = o[e].content + o[e + 1].content : (e !== n && (o[n] = o[e]), n++);
    e !== n && (o.length = n);
  }
}
const mu = [
  ["normalize", Fe],
  ["block", we],
  ["inline", ve],
  ["linkify", Be],
  ["replacements", Pe],
  ["smartquotes", Ne],
  // `text_join` finds `text_special` tokens (for escape sequences)
  // and joins them with the rest of the text
  ["text_join", $e]
];
function Iu() {
  this.ruler = new w();
  for (let u = 0; u < mu.length; u++)
    this.ruler.push(mu[u][0], mu[u][1]);
}
Iu.prototype.process = function(u) {
  const e = this.ruler.getRules("");
  for (let n = 0, r = e.length; n < r; n++)
    e[n](u);
};
Iu.prototype.State = h0;
function q(u, e, n, r) {
  this.src = u, this.md = e, this.env = n, this.tokens = r, this.bMarks = [], this.eMarks = [], this.tShift = [], this.sCount = [], this.bsCount = [], this.blkIndent = 0, this.line = 0, this.lineMax = 0, this.tight = !1, this.ddIndent = -1, this.listIndent = -1, this.parentType = "root", this.level = 0;
  const t = this.src;
  for (let c = 0, o = 0, i = 0, a = 0, s = t.length, f = !1; o < s; o++) {
    const l = t.charCodeAt(o);
    if (!f)
      if (E(l)) {
        i++, l === 9 ? a += 4 - a % 4 : a++;
        continue;
      } else
        f = !0;
    (l === 10 || o === s - 1) && (l !== 10 && o++, this.bMarks.push(c), this.eMarks.push(o), this.tShift.push(i), this.sCount.push(a), this.bsCount.push(0), f = !1, i = 0, a = 0, c = o + 1);
  }
  this.bMarks.push(t.length), this.eMarks.push(t.length), this.tShift.push(0), this.sCount.push(0), this.bsCount.push(0), this.lineMax = this.bMarks.length - 1;
}
q.prototype.push = function(u, e, n) {
  const r = new B(u, e, n);
  return r.block = !0, n < 0 && this.level--, r.level = this.level, n > 0 && this.level++, this.tokens.push(r), r;
};
q.prototype.isEmpty = function(e) {
  return this.bMarks[e] + this.tShift[e] >= this.eMarks[e];
};
q.prototype.skipEmptyLines = function(e) {
  for (let n = this.lineMax; e < n && !(this.bMarks[e] + this.tShift[e] < this.eMarks[e]); e++)
    ;
  return e;
};
q.prototype.skipSpaces = function(e) {
  for (let n = this.src.length; e < n; e++) {
    const r = this.src.charCodeAt(e);
    if (!E(r))
      break;
  }
  return e;
};
q.prototype.skipSpacesBack = function(e, n) {
  if (e <= n)
    return e;
  for (; e > n; )
    if (!E(this.src.charCodeAt(--e)))
      return e + 1;
  return e;
};
q.prototype.skipChars = function(e, n) {
  for (let r = this.src.length; e < r && this.src.charCodeAt(e) === n; e++)
    ;
  return e;
};
q.prototype.skipCharsBack = function(e, n, r) {
  if (e <= r)
    return e;
  for (; e > r; )
    if (n !== this.src.charCodeAt(--e))
      return e + 1;
  return e;
};
q.prototype.getLines = function(e, n, r, t) {
  if (e >= n)
    return "";
  const c = new Array(n - e);
  for (let o = 0, i = e; i < n; i++, o++) {
    let a = 0;
    const s = this.bMarks[i];
    let f = s, l;
    for (i + 1 < n || t ? l = this.eMarks[i] + 1 : l = this.eMarks[i]; f < l && a < r; ) {
      const b = this.src.charCodeAt(f);
      if (E(b))
        b === 9 ? a += 4 - (a + this.bsCount[i]) % 4 : a++;
      else if (f - s < this.tShift[i])
        a++;
      else
        break;
      f++;
    }
    a > r ? c[o] = new Array(a - r + 1).join(" ") + this.src.slice(f, l) : c[o] = this.src.slice(f, l);
  }
  return c.join("");
};
q.prototype.Token = B;
const He = 65536;
function ku(u, e) {
  const n = u.bMarks[e] + u.tShift[e], r = u.eMarks[e];
  return u.src.slice(n, r);
}
function Gu(u) {
  const e = [], n = u.length;
  let r = 0, t = u.charCodeAt(r), c = !1, o = 0, i = "";
  for (; r < n; )
    t === 124 && (c ? (i += u.substring(o, r - 1), o = r) : (e.push(i + u.substring(o, r)), i = "", o = r + 1)), c = t === 92, r++, t = u.charCodeAt(r);
  return e.push(i + u.substring(o)), e;
}
function Ue(u, e, n, r) {
  if (e + 2 > n)
    return !1;
  let t = e + 1;
  if (u.sCount[t] < u.blkIndent || u.sCount[t] - u.blkIndent >= 4)
    return !1;
  let c = u.bMarks[t] + u.tShift[t];
  if (c >= u.eMarks[t])
    return !1;
  const o = u.src.charCodeAt(c++);
  if (o !== 124 && o !== 45 && o !== 58 || c >= u.eMarks[t])
    return !1;
  const i = u.src.charCodeAt(c++);
  if (i !== 124 && i !== 45 && i !== 58 && !E(i) || o === 45 && E(i))
    return !1;
  for (; c < u.eMarks[t]; ) {
    const x = u.src.charCodeAt(c);
    if (x !== 124 && x !== 45 && x !== 58 && !E(x))
      return !1;
    c++;
  }
  let a = ku(u, e + 1), s = a.split("|");
  const f = [];
  for (let x = 0; x < s.length; x++) {
    const m = s[x].trim();
    if (!m) {
      if (x === 0 || x === s.length - 1)
        continue;
      return !1;
    }
    if (!/^:?-+:?$/.test(m))
      return !1;
    m.charCodeAt(m.length - 1) === 58 ? f.push(m.charCodeAt(0) === 58 ? "center" : "right") : m.charCodeAt(0) === 58 ? f.push("left") : f.push("");
  }
  if (a = ku(u, e).trim(), a.indexOf("|") === -1 || u.sCount[e] - u.blkIndent >= 4)
    return !1;
  s = Gu(a), s.length && s[0] === "" && s.shift(), s.length && s[s.length - 1] === "" && s.pop();
  const l = s.length;
  if (l === 0 || l !== f.length)
    return !1;
  if (r)
    return !0;
  const b = u.parentType;
  u.parentType = "table";
  const h = u.md.block.ruler.getRules("blockquote"), d = u.push("table_open", "table", 1), k = [e, 0];
  d.map = k;
  const g = u.push("thead_open", "thead", 1);
  g.map = [e, e + 1];
  const C = u.push("tr_open", "tr", 1);
  C.map = [e, e + 1];
  for (let x = 0; x < s.length; x++) {
    const m = u.push("th_open", "th", 1);
    f[x] && (m.attrs = [["style", "text-align:" + f[x]]]);
    const D = u.push("inline", "", 0);
    D.content = s[x].trim(), D.children = [], u.push("th_close", "th", -1);
  }
  u.push("tr_close", "tr", -1), u.push("thead_close", "thead", -1);
  let p, _ = 0;
  for (t = e + 2; t < n && !(u.sCount[t] < u.blkIndent); t++) {
    let x = !1;
    for (let D = 0, F = h.length; D < F; D++)
      if (h[D](u, t, n, !0)) {
        x = !0;
        break;
      }
    if (x || (a = ku(u, t).trim(), !a) || u.sCount[t] - u.blkIndent >= 4 || (s = Gu(a), s.length && s[0] === "" && s.shift(), s.length && s[s.length - 1] === "" && s.pop(), _ += l - s.length, _ > He))
      break;
    if (t === e + 2) {
      const D = u.push("tbody_open", "tbody", 1);
      D.map = p = [e + 2, 0];
    }
    const m = u.push("tr_open", "tr", 1);
    m.map = [t, t + 1];
    for (let D = 0; D < l; D++) {
      const F = u.push("td_open", "td", 1);
      f[D] && (F.attrs = [["style", "text-align:" + f[D]]]);
      const T = u.push("inline", "", 0);
      T.content = s[D] ? s[D].trim() : "", T.children = [], u.push("td_close", "td", -1);
    }
    u.push("tr_close", "tr", -1);
  }
  return p && (u.push("tbody_close", "tbody", -1), p[1] = t), u.push("table_close", "table", -1), k[1] = t, u.parentType = b, u.line = t, !0;
}
function Ze(u, e, n) {
  if (u.sCount[e] - u.blkIndent < 4)
    return !1;
  let r = e + 1, t = r;
  for (; r < n; ) {
    if (u.isEmpty(r)) {
      r++;
      continue;
    }
    if (u.sCount[r] - u.blkIndent >= 4) {
      r++, t = r;
      continue;
    }
    break;
  }
  u.line = t;
  const c = u.push("code_block", "code", 0);
  return c.content = u.getLines(e, t, 4 + u.blkIndent, !1) + `
`, c.map = [e, u.line], !0;
}
function Ve(u, e, n, r) {
  let t = u.bMarks[e] + u.tShift[e], c = u.eMarks[e];
  if (u.sCount[e] - u.blkIndent >= 4 || t + 3 > c)
    return !1;
  const o = u.src.charCodeAt(t);
  if (o !== 126 && o !== 96)
    return !1;
  let i = t;
  t = u.skipChars(t, o);
  let a = t - i;
  if (a < 3)
    return !1;
  const s = u.src.slice(i, t), f = u.src.slice(t, c);
  if (o === 96 && f.indexOf(String.fromCharCode(o)) >= 0)
    return !1;
  if (r)
    return !0;
  let l = e, b = !1;
  for (; l++, !(l >= n || (t = i = u.bMarks[l] + u.tShift[l], c = u.eMarks[l], t < c && u.sCount[l] < u.blkIndent)); )
    if (u.src.charCodeAt(t) === o && !(u.sCount[l] - u.blkIndent >= 4) && (t = u.skipChars(t, o), !(t - i < a) && (t = u.skipSpaces(t), !(t < c)))) {
      b = !0;
      break;
    }
  a = u.sCount[e], u.line = l + (b ? 1 : 0);
  const h = u.push("fence", "code", 0);
  return h.info = f, h.content = u.getLines(e + 1, l, a, !0), h.markup = s, h.map = [e, u.line], !0;
}
function Ge(u, e, n, r) {
  let t = u.bMarks[e] + u.tShift[e], c = u.eMarks[e];
  const o = u.lineMax;
  if (u.sCount[e] - u.blkIndent >= 4 || u.src.charCodeAt(t) !== 62)
    return !1;
  if (r)
    return !0;
  const i = [], a = [], s = [], f = [], l = u.md.block.ruler.getRules("blockquote"), b = u.parentType;
  u.parentType = "blockquote";
  let h = !1, d;
  for (d = e; d < n; d++) {
    const _ = u.sCount[d] < u.blkIndent;
    if (t = u.bMarks[d] + u.tShift[d], c = u.eMarks[d], t >= c)
      break;
    if (u.src.charCodeAt(t++) === 62 && !_) {
      let m = u.sCount[d] + 1, D, F;
      u.src.charCodeAt(t) === 32 ? (t++, m++, F = !1, D = !0) : u.src.charCodeAt(t) === 9 ? (D = !0, (u.bsCount[d] + m) % 4 === 3 ? (t++, m++, F = !1) : F = !0) : D = !1;
      let T = m;
      for (i.push(u.bMarks[d]), u.bMarks[d] = t; t < c; ) {
        const R = u.src.charCodeAt(t);
        if (E(R))
          R === 9 ? T += 4 - (T + u.bsCount[d] + (F ? 1 : 0)) % 4 : T++;
        else
          break;
        t++;
      }
      h = t >= c, a.push(u.bsCount[d]), u.bsCount[d] = u.sCount[d] + 1 + (D ? 1 : 0), s.push(u.sCount[d]), u.sCount[d] = T - m, f.push(u.tShift[d]), u.tShift[d] = t - u.bMarks[d];
      continue;
    }
    if (h)
      break;
    let x = !1;
    for (let m = 0, D = l.length; m < D; m++)
      if (l[m](u, d, n, !0)) {
        x = !0;
        break;
      }
    if (x) {
      u.lineMax = d, u.blkIndent !== 0 && (i.push(u.bMarks[d]), a.push(u.bsCount[d]), f.push(u.tShift[d]), s.push(u.sCount[d]), u.sCount[d] -= u.blkIndent);
      break;
    }
    i.push(u.bMarks[d]), a.push(u.bsCount[d]), f.push(u.tShift[d]), s.push(u.sCount[d]), u.sCount[d] = -1;
  }
  const k = u.blkIndent;
  u.blkIndent = 0;
  const g = u.push("blockquote_open", "blockquote", 1);
  g.markup = ">";
  const C = [e, 0];
  g.map = C, u.md.block.tokenize(u, e, d);
  const p = u.push("blockquote_close", "blockquote", -1);
  p.markup = ">", u.lineMax = o, u.parentType = b, C[1] = u.line;
  for (let _ = 0; _ < f.length; _++)
    u.bMarks[_ + e] = i[_], u.tShift[_ + e] = f[_], u.sCount[_ + e] = s[_], u.bsCount[_ + e] = a[_];
  return u.blkIndent = k, !0;
}
function We(u, e, n, r) {
  const t = u.eMarks[e];
  if (u.sCount[e] - u.blkIndent >= 4)
    return !1;
  let c = u.bMarks[e] + u.tShift[e];
  const o = u.src.charCodeAt(c++);
  if (o !== 42 && o !== 45 && o !== 95)
    return !1;
  let i = 1;
  for (; c < t; ) {
    const s = u.src.charCodeAt(c++);
    if (s !== o && !E(s))
      return !1;
    s === o && i++;
  }
  if (i < 3)
    return !1;
  if (r)
    return !0;
  u.line = e + 1;
  const a = u.push("hr", "hr", 0);
  return a.map = [e, u.line], a.markup = Array(i + 1).join(String.fromCharCode(o)), !0;
}
function Wu(u, e) {
  const n = u.eMarks[e];
  let r = u.bMarks[e] + u.tShift[e];
  const t = u.src.charCodeAt(r++);
  if (t !== 42 && t !== 45 && t !== 43)
    return -1;
  if (r < n) {
    const c = u.src.charCodeAt(r);
    if (!E(c))
      return -1;
  }
  return r;
}
function Ju(u, e) {
  const n = u.bMarks[e] + u.tShift[e], r = u.eMarks[e];
  let t = n;
  if (t + 1 >= r)
    return -1;
  let c = u.src.charCodeAt(t++);
  if (c < 48 || c > 57)
    return -1;
  for (; ; ) {
    if (t >= r)
      return -1;
    if (c = u.src.charCodeAt(t++), c >= 48 && c <= 57) {
      if (t - n >= 10)
        return -1;
      continue;
    }
    if (c === 41 || c === 46)
      break;
    return -1;
  }
  return t < r && (c = u.src.charCodeAt(t), !E(c)) ? -1 : t;
}
function Je(u, e) {
  const n = u.level + 2;
  for (let r = e + 2, t = u.tokens.length - 2; r < t; r++)
    u.tokens[r].level === n && u.tokens[r].type === "paragraph_open" && (u.tokens[r + 2].hidden = !0, u.tokens[r].hidden = !0, r += 2);
}
function Qe(u, e, n, r) {
  let t, c, o, i, a = e, s = !0;
  if (u.sCount[a] - u.blkIndent >= 4 || u.listIndent >= 0 && u.sCount[a] - u.listIndent >= 4 && u.sCount[a] < u.blkIndent)
    return !1;
  let f = !1;
  r && u.parentType === "paragraph" && u.sCount[a] >= u.blkIndent && (f = !0);
  let l, b, h;
  if ((h = Ju(u, a)) >= 0) {
    if (l = !0, o = u.bMarks[a] + u.tShift[a], b = Number(u.src.slice(o, h - 1)), f && b !== 1) return !1;
  } else if ((h = Wu(u, a)) >= 0)
    l = !1;
  else
    return !1;
  if (f && u.skipSpaces(h) >= u.eMarks[a])
    return !1;
  if (r)
    return !0;
  const d = u.src.charCodeAt(h - 1), k = u.tokens.length;
  l ? (i = u.push("ordered_list_open", "ol", 1), b !== 1 && (i.attrs = [["start", b]])) : i = u.push("bullet_list_open", "ul", 1);
  const g = [a, 0];
  i.map = g, i.markup = String.fromCharCode(d);
  let C = !1;
  const p = u.md.block.ruler.getRules("list"), _ = u.parentType;
  for (u.parentType = "list"; a < n; ) {
    c = h, t = u.eMarks[a];
    const x = u.sCount[a] + h - (u.bMarks[a] + u.tShift[a]);
    let m = x;
    for (; c < t; ) {
      const $ = u.src.charCodeAt(c);
      if ($ === 9)
        m += 4 - (m + u.bsCount[a]) % 4;
      else if ($ === 32)
        m++;
      else
        break;
      c++;
    }
    const D = c;
    let F;
    D >= t ? F = 1 : F = m - x, F > 4 && (F = 1);
    const T = x + F;
    i = u.push("list_item_open", "li", 1), i.markup = String.fromCharCode(d);
    const R = [a, 0];
    i.map = R, l && (i.info = u.src.slice(o, h - 1));
    const Q = u.tight, xu = u.tShift[a], T0 = u.sCount[a], B0 = u.listIndent;
    if (u.listIndent = u.blkIndent, u.blkIndent = T, u.tight = !0, u.tShift[a] = D - u.bMarks[a], u.sCount[a] = m, D >= t && u.isEmpty(a + 1) ? u.line = Math.min(u.line + 2, n) : u.md.block.tokenize(u, a, n, !0), (!u.tight || C) && (s = !1), C = u.line - a > 1 && u.isEmpty(u.line - 1), u.blkIndent = u.listIndent, u.listIndent = B0, u.tShift[a] = xu, u.sCount[a] = T0, u.tight = Q, i = u.push("list_item_close", "li", -1), i.markup = String.fromCharCode(d), a = u.line, R[1] = a, a >= n || u.sCount[a] < u.blkIndent || u.sCount[a] - u.blkIndent >= 4)
      break;
    let Ou = !1;
    for (let $ = 0, z0 = p.length; $ < z0; $++)
      if (p[$](u, a, n, !0)) {
        Ou = !0;
        break;
      }
    if (Ou)
      break;
    if (l) {
      if (h = Ju(u, a), h < 0)
        break;
      o = u.bMarks[a] + u.tShift[a];
    } else if (h = Wu(u, a), h < 0)
      break;
    if (d !== u.src.charCodeAt(h - 1))
      break;
  }
  return l ? i = u.push("ordered_list_close", "ol", -1) : i = u.push("bullet_list_close", "ul", -1), i.markup = String.fromCharCode(d), g[1] = a, u.line = a, u.parentType = _, s && Je(u, k), !0;
}
function Xe(u, e, n, r) {
  let t = u.bMarks[e] + u.tShift[e], c = u.eMarks[e], o = e + 1;
  if (u.sCount[e] - u.blkIndent >= 4 || u.src.charCodeAt(t) !== 91)
    return !1;
  function i(p) {
    const _ = u.lineMax;
    if (p >= _ || u.isEmpty(p))
      return null;
    let x = !1;
    if (u.sCount[p] - u.blkIndent > 3 && (x = !0), u.sCount[p] < 0 && (x = !0), !x) {
      const F = u.md.block.ruler.getRules("reference"), T = u.parentType;
      u.parentType = "reference";
      let R = !1;
      for (let Q = 0, xu = F.length; Q < xu; Q++)
        if (F[Q](u, p, _, !0)) {
          R = !0;
          break;
        }
      if (u.parentType = T, R)
        return null;
    }
    const m = u.bMarks[p] + u.tShift[p], D = u.eMarks[p];
    return u.src.slice(m, D + 1);
  }
  let a = u.src.slice(t, c + 1);
  c = a.length;
  let s = -1;
  for (t = 1; t < c; t++) {
    const p = a.charCodeAt(t);
    if (p === 91)
      return !1;
    if (p === 93) {
      s = t;
      break;
    } else if (p === 10) {
      const _ = i(o);
      _ !== null && (a += _, c = a.length, o++);
    } else if (p === 92 && (t++, t < c && a.charCodeAt(t) === 10)) {
      const _ = i(o);
      _ !== null && (a += _, c = a.length, o++);
    }
  }
  if (s < 0 || a.charCodeAt(s + 1) !== 58)
    return !1;
  for (t = s + 2; t < c; t++) {
    const p = a.charCodeAt(t);
    if (p === 10) {
      const _ = i(o);
      _ !== null && (a += _, c = a.length, o++);
    } else if (!E(p)) break;
  }
  const f = u.md.helpers.parseLinkDestination(a, t, c);
  if (!f.ok)
    return !1;
  const l = u.md.normalizeLink(f.str);
  if (!u.md.validateLink(l))
    return !1;
  t = f.pos;
  const b = t, h = o, d = t;
  for (; t < c; t++) {
    const p = a.charCodeAt(t);
    if (p === 10) {
      const _ = i(o);
      _ !== null && (a += _, c = a.length, o++);
    } else if (!E(p)) break;
  }
  let k = u.md.helpers.parseLinkTitle(a, t, c);
  for (; k.can_continue; ) {
    const p = i(o);
    if (p === null) break;
    a += p, t = c, c = a.length, o++, k = u.md.helpers.parseLinkTitle(a, t, c, k);
  }
  let g;
  for (t < c && d !== t && k.ok ? (g = k.str, t = k.pos) : (g = "", t = b, o = h); t < c; ) {
    const p = a.charCodeAt(t);
    if (!E(p))
      break;
    t++;
  }
  if (t < c && a.charCodeAt(t) !== 10 && g)
    for (g = "", t = b, o = h; t < c; ) {
      const p = a.charCodeAt(t);
      if (!E(p))
        break;
      t++;
    }
  if (t < c && a.charCodeAt(t) !== 10)
    return !1;
  const C = du(a.slice(1, s));
  return C ? (r || (typeof u.env.references > "u" && (u.env.references = {}), typeof u.env.references[C] > "u" && (u.env.references[C] = { title: g, href: l }), u.line = o), !0) : !1;
}
const Ye = [
  "address",
  "article",
  "aside",
  "base",
  "basefont",
  "blockquote",
  "body",
  "caption",
  "center",
  "col",
  "colgroup",
  "dd",
  "details",
  "dialog",
  "dir",
  "div",
  "dl",
  "dt",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "frame",
  "frameset",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hr",
  "html",
  "iframe",
  "legend",
  "li",
  "link",
  "main",
  "menu",
  "menuitem",
  "nav",
  "noframes",
  "ol",
  "optgroup",
  "option",
  "p",
  "param",
  "search",
  "section",
  "summary",
  "table",
  "tbody",
  "td",
  "tfoot",
  "th",
  "thead",
  "title",
  "tr",
  "track",
  "ul"
], Ke = "[a-zA-Z_:][a-zA-Z0-9:._-]*", un = "[^\"'=<>`\\x00-\\x20]+", en = "'[^']*'", nn = '"[^"]*"', rn = "(?:" + un + "|" + en + "|" + nn + ")", tn = "(?:\\s+" + Ke + "(?:\\s*=\\s*" + rn + ")?)", p0 = "<[A-Za-z][A-Za-z0-9\\-]*" + tn + "*\\s*\\/?>", x0 = "<\\/[A-Za-z][A-Za-z0-9\\-]*\\s*>", cn = "<!---?>|<!--(?:[^-]|-[^-]|--[^>])*-->", on = "<[?][\\s\\S]*?[?]>", an = "<![A-Za-z][^>]*>", sn = "<!\\[CDATA\\[[\\s\\S]*?\\]\\]>", fn = new RegExp("^(?:" + p0 + "|" + x0 + "|" + cn + "|" + on + "|" + an + "|" + sn + ")"), ln = new RegExp("^(?:" + p0 + "|" + x0 + ")"), H = [
  [/^<(script|pre|style|textarea)(?=(\s|>|$))/i, /<\/(script|pre|style|textarea)>/i, !0],
  [/^<!--/, /-->/, !0],
  [/^<\?/, /\?>/, !0],
  [/^<![A-Z]/, />/, !0],
  [/^<!\[CDATA\[/, /\]\]>/, !0],
  [new RegExp("^</?(" + Ye.join("|") + ")(?=(\\s|/?>|$))", "i"), /^$/, !0],
  [new RegExp(ln.source + "\\s*$"), /^$/, !1]
];
function dn(u, e, n, r) {
  let t = u.bMarks[e] + u.tShift[e], c = u.eMarks[e];
  if (u.sCount[e] - u.blkIndent >= 4 || !u.md.options.html || u.src.charCodeAt(t) !== 60)
    return !1;
  let o = u.src.slice(t, c), i = 0;
  for (; i < H.length && !H[i][0].test(o); i++)
    ;
  if (i === H.length)
    return !1;
  if (r)
    return H[i][2];
  let a = e + 1;
  if (!H[i][1].test(o)) {
    for (; a < n && !(u.sCount[a] < u.blkIndent); a++)
      if (t = u.bMarks[a] + u.tShift[a], c = u.eMarks[a], o = u.src.slice(t, c), H[i][1].test(o)) {
        o.length !== 0 && a++;
        break;
      }
  }
  u.line = a;
  const s = u.push("html_block", "", 0);
  return s.map = [e, a], s.content = u.getLines(e, a, u.blkIndent, !0), !0;
}
function hn(u, e, n, r) {
  let t = u.bMarks[e] + u.tShift[e], c = u.eMarks[e];
  if (u.sCount[e] - u.blkIndent >= 4)
    return !1;
  let o = u.src.charCodeAt(t);
  if (o !== 35 || t >= c)
    return !1;
  let i = 1;
  for (o = u.src.charCodeAt(++t); o === 35 && t < c && i <= 6; )
    i++, o = u.src.charCodeAt(++t);
  if (i > 6 || t < c && !E(o))
    return !1;
  if (r)
    return !0;
  c = u.skipSpacesBack(c, t);
  const a = u.skipCharsBack(c, 35, t);
  a > t && E(u.src.charCodeAt(a - 1)) && (c = a), u.line = e + 1;
  const s = u.push("heading_open", "h" + String(i), 1);
  s.markup = "########".slice(0, i), s.map = [e, u.line];
  const f = u.push("inline", "", 0);
  f.content = u.src.slice(t, c).trim(), f.map = [e, u.line], f.children = [];
  const l = u.push("heading_close", "h" + String(i), -1);
  return l.markup = "########".slice(0, i), !0;
}
function bn(u, e, n) {
  const r = u.md.block.ruler.getRules("paragraph");
  if (u.sCount[e] - u.blkIndent >= 4)
    return !1;
  const t = u.parentType;
  u.parentType = "paragraph";
  let c = 0, o, i = e + 1;
  for (; i < n && !u.isEmpty(i); i++) {
    if (u.sCount[i] - u.blkIndent > 3)
      continue;
    if (u.sCount[i] >= u.blkIndent) {
      let h = u.bMarks[i] + u.tShift[i];
      const d = u.eMarks[i];
      if (h < d && (o = u.src.charCodeAt(h), (o === 45 || o === 61) && (h = u.skipChars(h, o), h = u.skipSpaces(h), h >= d))) {
        c = o === 61 ? 1 : 2;
        break;
      }
    }
    if (u.sCount[i] < 0)
      continue;
    let b = !1;
    for (let h = 0, d = r.length; h < d; h++)
      if (r[h](u, i, n, !0)) {
        b = !0;
        break;
      }
    if (b)
      break;
  }
  if (!c)
    return !1;
  const a = u.getLines(e, i, u.blkIndent, !1).trim();
  u.line = i + 1;
  const s = u.push("heading_open", "h" + String(c), 1);
  s.markup = String.fromCharCode(o), s.map = [e, u.line];
  const f = u.push("inline", "", 0);
  f.content = a, f.map = [e, u.line - 1], f.children = [];
  const l = u.push("heading_close", "h" + String(c), -1);
  return l.markup = String.fromCharCode(o), u.parentType = t, !0;
}
function pn(u, e, n) {
  const r = u.md.block.ruler.getRules("paragraph"), t = u.parentType;
  let c = e + 1;
  for (u.parentType = "paragraph"; c < n && !u.isEmpty(c); c++) {
    if (u.sCount[c] - u.blkIndent > 3 || u.sCount[c] < 0)
      continue;
    let s = !1;
    for (let f = 0, l = r.length; f < l; f++)
      if (r[f](u, c, n, !0)) {
        s = !0;
        break;
      }
    if (s)
      break;
  }
  const o = u.getLines(e, c, u.blkIndent, !1).trim();
  u.line = c;
  const i = u.push("paragraph_open", "p", 1);
  i.map = [e, u.line];
  const a = u.push("inline", "", 0);
  return a.content = o, a.map = [e, u.line], a.children = [], u.push("paragraph_close", "p", -1), u.parentType = t, !0;
}
const iu = [
  // First 2 params - rule name & source. Secondary array - list of rules,
  // which can be terminated by this one.
  ["table", Ue, ["paragraph", "reference"]],
  ["code", Ze],
  ["fence", Ve, ["paragraph", "reference", "blockquote", "list"]],
  ["blockquote", Ge, ["paragraph", "reference", "blockquote", "list"]],
  ["hr", We, ["paragraph", "reference", "blockquote", "list"]],
  ["list", Qe, ["paragraph", "reference", "blockquote"]],
  ["reference", Xe],
  ["html_block", dn, ["paragraph", "reference", "blockquote"]],
  ["heading", hn, ["paragraph", "reference", "blockquote"]],
  ["lheading", bn],
  ["paragraph", pn]
];
function hu() {
  this.ruler = new w();
  for (let u = 0; u < iu.length; u++)
    this.ruler.push(iu[u][0], iu[u][1], { alt: (iu[u][2] || []).slice() });
}
hu.prototype.tokenize = function(u, e, n) {
  const r = this.ruler.getRules(""), t = r.length, c = u.md.options.maxNesting;
  let o = e, i = !1;
  for (; o < n && (u.line = o = u.skipEmptyLines(o), !(o >= n || u.sCount[o] < u.blkIndent)); ) {
    if (u.level >= c) {
      u.line = n;
      break;
    }
    const a = u.line;
    let s = !1;
    for (let f = 0; f < t; f++)
      if (s = r[f](u, o, n, !1), s) {
        if (a >= u.line)
          throw new Error("block rule didn't increment state.line");
        break;
      }
    if (!s) throw new Error("none of the block rules matched");
    u.tight = !i, u.isEmpty(u.line - 1) && (i = !0), o = u.line, o < n && u.isEmpty(o) && (i = !0, o++, u.line = o);
  }
};
hu.prototype.parse = function(u, e, n, r) {
  if (!u)
    return;
  const t = new this.State(u, e, n, r);
  this.tokenize(t, t.line, t.lineMax);
};
hu.prototype.State = q;
function nu(u, e, n, r) {
  this.src = u, this.env = n, this.md = e, this.tokens = r, this.tokens_meta = Array(r.length), this.pos = 0, this.posMax = this.src.length, this.level = 0, this.pending = "", this.pendingLevel = 0, this.cache = {}, this.delimiters = [], this._prev_delimiters = [], this.backticks = {}, this.backticksScanned = !1, this.linkLevel = 0;
}
nu.prototype.pushPending = function() {
  const u = new B("text", "", 0);
  return u.content = this.pending, u.level = this.pendingLevel, this.tokens.push(u), this.pending = "", u;
};
nu.prototype.push = function(u, e, n) {
  this.pending && this.pushPending();
  const r = new B(u, e, n);
  let t = null;
  return n < 0 && (this.level--, this.delimiters = this._prev_delimiters.pop()), r.level = this.level, n > 0 && (this.level++, this._prev_delimiters.push(this.delimiters), this.delimiters = [], t = { delimiters: this.delimiters }), this.pendingLevel = this.level, this.tokens.push(r), this.tokens_meta.push(t), r;
};
nu.prototype.scanDelims = function(u, e) {
  const n = this.posMax, r = this.src.charCodeAt(u), t = u > 0 ? this.src.charCodeAt(u - 1) : 32;
  let c = u;
  for (; c < n && this.src.charCodeAt(c) === r; )
    c++;
  const o = c - u, i = c < n ? this.src.charCodeAt(c) : 32, a = K(t) || Y(String.fromCharCode(t)), s = K(i) || Y(String.fromCharCode(i)), f = X(t), l = X(i), b = !l && (!s || f || a), h = !f && (!a || l || s);
  return { can_open: b && (e || !h || a), can_close: h && (e || !b || s), length: o };
};
nu.prototype.Token = B;
function xn(u) {
  switch (u) {
    case 10:
    case 33:
    case 35:
    case 36:
    case 37:
    case 38:
    case 42:
    case 43:
    case 45:
    case 58:
    case 60:
    case 61:
    case 62:
    case 64:
    case 91:
    case 92:
    case 93:
    case 94:
    case 95:
    case 96:
    case 123:
    case 125:
    case 126:
      return !0;
    default:
      return !1;
  }
}
function _n(u, e) {
  let n = u.pos;
  for (; n < u.posMax && !xn(u.src.charCodeAt(n)); )
    n++;
  return n === u.pos ? !1 : (e || (u.pending += u.src.slice(u.pos, n)), u.pos = n, !0);
}
const mn = /(?:^|[^a-z0-9.+-])([a-z][a-z0-9.+-]*)$/i;
function kn(u, e) {
  if (!u.md.options.linkify || u.linkLevel > 0) return !1;
  const n = u.pos, r = u.posMax;
  if (n + 3 > r || u.src.charCodeAt(n) !== 58 || u.src.charCodeAt(n + 1) !== 47 || u.src.charCodeAt(n + 2) !== 47) return !1;
  const t = u.pending.match(mn);
  if (!t) return !1;
  const c = t[1], o = u.md.linkify.matchAtStart(u.src.slice(n - c.length));
  if (!o) return !1;
  let i = o.url;
  if (i.length <= c.length) return !1;
  i = i.replace(/\*+$/, "");
  const a = u.md.normalizeLink(i);
  if (!u.md.validateLink(a)) return !1;
  if (!e) {
    u.pending = u.pending.slice(0, -c.length);
    const s = u.push("link_open", "a", 1);
    s.attrs = [["href", a]], s.markup = "linkify", s.info = "auto";
    const f = u.push("text", "", 0);
    f.content = u.md.normalizeLinkText(i);
    const l = u.push("link_close", "a", -1);
    l.markup = "linkify", l.info = "auto";
  }
  return u.pos += i.length - c.length, !0;
}
function gn(u, e) {
  let n = u.pos;
  if (u.src.charCodeAt(n) !== 10)
    return !1;
  const r = u.pending.length - 1, t = u.posMax;
  if (!e)
    if (r >= 0 && u.pending.charCodeAt(r) === 32)
      if (r >= 1 && u.pending.charCodeAt(r - 1) === 32) {
        let c = r - 1;
        for (; c >= 1 && u.pending.charCodeAt(c - 1) === 32; ) c--;
        u.pending = u.pending.slice(0, c), u.push("hardbreak", "br", 0);
      } else
        u.pending = u.pending.slice(0, -1), u.push("softbreak", "br", 0);
    else
      u.push("softbreak", "br", 0);
  for (n++; n < t && E(u.src.charCodeAt(n)); )
    n++;
  return u.pos = n, !0;
}
const Mu = [];
for (let u = 0; u < 256; u++)
  Mu.push(0);
"\\!\"#$%&'()*+,./:;<=>?@[]^_`{|}~-".split("").forEach(function(u) {
  Mu[u.charCodeAt(0)] = 1;
});
function Dn(u, e) {
  let n = u.pos;
  const r = u.posMax;
  if (u.src.charCodeAt(n) !== 92 || (n++, n >= r)) return !1;
  let t = u.src.charCodeAt(n);
  if (t === 10) {
    for (e || u.push("hardbreak", "br", 0), n++; n < r && (t = u.src.charCodeAt(n), !!E(t)); )
      n++;
    return u.pos = n, !0;
  }
  let c = u.src[n];
  if (t >= 55296 && t <= 56319 && n + 1 < r) {
    const i = u.src.charCodeAt(n + 1);
    i >= 56320 && i <= 57343 && (c += u.src[n + 1], n++);
  }
  const o = "\\" + c;
  if (!e) {
    const i = u.push("text_special", "", 0);
    t < 256 && Mu[t] !== 0 ? i.content = c : i.content = o, i.markup = o, i.info = "escape";
  }
  return u.pos = n + 1, !0;
}
function Cn(u, e) {
  let n = u.pos;
  if (u.src.charCodeAt(n) !== 96)
    return !1;
  const t = n;
  n++;
  const c = u.posMax;
  for (; n < c && u.src.charCodeAt(n) === 96; )
    n++;
  const o = u.src.slice(t, n), i = o.length;
  if (u.backticksScanned && (u.backticks[i] || 0) <= t)
    return e || (u.pending += o), u.pos += i, !0;
  let a = n, s;
  for (; (s = u.src.indexOf("`", a)) !== -1; ) {
    for (a = s + 1; a < c && u.src.charCodeAt(a) === 96; )
      a++;
    const f = a - s;
    if (f === i) {
      if (!e) {
        const l = u.push("code_inline", "code", 0);
        l.markup = o, l.content = u.src.slice(n, s).replace(/\n/g, " ").replace(/^ (.+) $/, "$1");
      }
      return u.pos = a, !0;
    }
    u.backticks[f] = s;
  }
  return u.backticksScanned = !0, e || (u.pending += o), u.pos += i, !0;
}
function En(u, e) {
  const n = u.pos, r = u.src.charCodeAt(n);
  if (e || r !== 126)
    return !1;
  const t = u.scanDelims(u.pos, !0);
  let c = t.length;
  const o = String.fromCharCode(r);
  if (c < 2)
    return !1;
  let i;
  c % 2 && (i = u.push("text", "", 0), i.content = o, c--);
  for (let a = 0; a < c; a += 2)
    i = u.push("text", "", 0), i.content = o + o, u.delimiters.push({
      marker: r,
      length: 0,
      // disable "rule of 3" length checks meant for emphasis
      token: u.tokens.length - 1,
      end: -1,
      open: t.can_open,
      close: t.can_close
    });
  return u.pos += t.length, !0;
}
function Qu(u, e) {
  let n;
  const r = [], t = e.length;
  for (let c = 0; c < t; c++) {
    const o = e[c];
    if (o.marker !== 126 || o.end === -1)
      continue;
    const i = e[o.end];
    n = u.tokens[o.token], n.type = "s_open", n.tag = "s", n.nesting = 1, n.markup = "~~", n.content = "", n = u.tokens[i.token], n.type = "s_close", n.tag = "s", n.nesting = -1, n.markup = "~~", n.content = "", u.tokens[i.token - 1].type === "text" && u.tokens[i.token - 1].content === "~" && r.push(i.token - 1);
  }
  for (; r.length; ) {
    const c = r.pop();
    let o = c + 1;
    for (; o < u.tokens.length && u.tokens[o].type === "s_close"; )
      o++;
    o--, c !== o && (n = u.tokens[o], u.tokens[o] = u.tokens[c], u.tokens[c] = n);
  }
}
function yn(u) {
  const e = u.tokens_meta, n = u.tokens_meta.length;
  Qu(u, u.delimiters);
  for (let r = 0; r < n; r++)
    e[r] && e[r].delimiters && Qu(u, e[r].delimiters);
}
const _0 = {
  tokenize: En,
  postProcess: yn
};
function An(u, e) {
  const n = u.pos, r = u.src.charCodeAt(n);
  if (e || r !== 95 && r !== 42)
    return !1;
  const t = u.scanDelims(u.pos, r === 42);
  for (let c = 0; c < t.length; c++) {
    const o = u.push("text", "", 0);
    o.content = String.fromCharCode(r), u.delimiters.push({
      // Char code of the starting marker (number).
      //
      marker: r,
      // Total length of these series of delimiters.
      //
      length: t.length,
      // A position of the token this delimiter corresponds to.
      //
      token: u.tokens.length - 1,
      // If this delimiter is matched as a valid opener, `end` will be
      // equal to its position, otherwise it's `-1`.
      //
      end: -1,
      // Boolean flags that determine if this delimiter could open or close
      // an emphasis.
      //
      open: t.can_open,
      close: t.can_close
    });
  }
  return u.pos += t.length, !0;
}
function Xu(u, e) {
  const n = e.length;
  for (let r = n - 1; r >= 0; r--) {
    const t = e[r];
    if (t.marker !== 95 && t.marker !== 42 || t.end === -1)
      continue;
    const c = e[t.end], o = r > 0 && e[r - 1].end === t.end + 1 && // check that first two markers match and adjacent
    e[r - 1].marker === t.marker && e[r - 1].token === t.token - 1 && // check that last two markers are adjacent (we can safely assume they match)
    e[t.end + 1].token === c.token + 1, i = String.fromCharCode(t.marker), a = u.tokens[t.token];
    a.type = o ? "strong_open" : "em_open", a.tag = o ? "strong" : "em", a.nesting = 1, a.markup = o ? i + i : i, a.content = "";
    const s = u.tokens[c.token];
    s.type = o ? "strong_close" : "em_close", s.tag = o ? "strong" : "em", s.nesting = -1, s.markup = o ? i + i : i, s.content = "", o && (u.tokens[e[r - 1].token].content = "", u.tokens[e[t.end + 1].token].content = "", r--);
  }
}
function Fn(u) {
  const e = u.tokens_meta, n = u.tokens_meta.length;
  Xu(u, u.delimiters);
  for (let r = 0; r < n; r++)
    e[r] && e[r].delimiters && Xu(u, e[r].delimiters);
}
const m0 = {
  tokenize: An,
  postProcess: Fn
};
function wn(u, e) {
  let n, r, t, c, o = "", i = "", a = u.pos, s = !0;
  if (u.src.charCodeAt(u.pos) !== 91)
    return !1;
  const f = u.pos, l = u.posMax, b = u.pos + 1, h = u.md.helpers.parseLinkLabel(u, u.pos, !0);
  if (h < 0)
    return !1;
  let d = h + 1;
  if (d < l && u.src.charCodeAt(d) === 40) {
    for (s = !1, d++; d < l && (n = u.src.charCodeAt(d), !(!E(n) && n !== 10)); d++)
      ;
    if (d >= l)
      return !1;
    if (a = d, t = u.md.helpers.parseLinkDestination(u.src, d, u.posMax), t.ok) {
      for (o = u.md.normalizeLink(t.str), u.md.validateLink(o) ? d = t.pos : o = "", a = d; d < l && (n = u.src.charCodeAt(d), !(!E(n) && n !== 10)); d++)
        ;
      if (t = u.md.helpers.parseLinkTitle(u.src, d, u.posMax), d < l && a !== d && t.ok)
        for (i = t.str, d = t.pos; d < l && (n = u.src.charCodeAt(d), !(!E(n) && n !== 10)); d++)
          ;
    }
    (d >= l || u.src.charCodeAt(d) !== 41) && (s = !0), d++;
  }
  if (s) {
    if (typeof u.env.references > "u")
      return !1;
    if (d < l && u.src.charCodeAt(d) === 91 ? (a = d + 1, d = u.md.helpers.parseLinkLabel(u, d), d >= 0 ? r = u.src.slice(a, d++) : d = h + 1) : d = h + 1, r || (r = u.src.slice(b, h)), c = u.env.references[du(r)], !c)
      return u.pos = f, !1;
    o = c.href, i = c.title;
  }
  if (!e) {
    u.pos = b, u.posMax = h;
    const k = u.push("link_open", "a", 1), g = [["href", o]];
    k.attrs = g, i && g.push(["title", i]), u.linkLevel++, u.md.inline.tokenize(u), u.linkLevel--, u.push("link_close", "a", -1);
  }
  return u.pos = d, u.posMax = l, !0;
}
function vn(u, e) {
  let n, r, t, c, o, i, a, s, f = "";
  const l = u.pos, b = u.posMax;
  if (u.src.charCodeAt(u.pos) !== 33 || u.src.charCodeAt(u.pos + 1) !== 91)
    return !1;
  const h = u.pos + 2, d = u.md.helpers.parseLinkLabel(u, u.pos + 1, !1);
  if (d < 0)
    return !1;
  if (c = d + 1, c < b && u.src.charCodeAt(c) === 40) {
    for (c++; c < b && (n = u.src.charCodeAt(c), !(!E(n) && n !== 10)); c++)
      ;
    if (c >= b)
      return !1;
    for (s = c, i = u.md.helpers.parseLinkDestination(u.src, c, u.posMax), i.ok && (f = u.md.normalizeLink(i.str), u.md.validateLink(f) ? c = i.pos : f = ""), s = c; c < b && (n = u.src.charCodeAt(c), !(!E(n) && n !== 10)); c++)
      ;
    if (i = u.md.helpers.parseLinkTitle(u.src, c, u.posMax), c < b && s !== c && i.ok)
      for (a = i.str, c = i.pos; c < b && (n = u.src.charCodeAt(c), !(!E(n) && n !== 10)); c++)
        ;
    else
      a = "";
    if (c >= b || u.src.charCodeAt(c) !== 41)
      return u.pos = l, !1;
    c++;
  } else {
    if (typeof u.env.references > "u")
      return !1;
    if (c < b && u.src.charCodeAt(c) === 91 ? (s = c + 1, c = u.md.helpers.parseLinkLabel(u, c), c >= 0 ? t = u.src.slice(s, c++) : c = d + 1) : c = d + 1, t || (t = u.src.slice(h, d)), o = u.env.references[du(t)], !o)
      return u.pos = l, !1;
    f = o.href, a = o.title;
  }
  if (!e) {
    r = u.src.slice(h, d);
    const k = [];
    u.md.inline.parse(
      r,
      u.md,
      u.env,
      k
    );
    const g = u.push("image", "img", 0), C = [["src", f], ["alt", ""]];
    g.attrs = C, g.children = k, g.content = r, a && C.push(["title", a]);
  }
  return u.pos = c, u.posMax = b, !0;
}
const Sn = /^([a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*)$/, Tn = /^([a-zA-Z][a-zA-Z0-9+.-]{1,31}):([^<>\x00-\x20]*)$/;
function Bn(u, e) {
  let n = u.pos;
  if (u.src.charCodeAt(n) !== 60)
    return !1;
  const r = u.pos, t = u.posMax;
  for (; ; ) {
    if (++n >= t) return !1;
    const o = u.src.charCodeAt(n);
    if (o === 60) return !1;
    if (o === 62) break;
  }
  const c = u.src.slice(r + 1, n);
  if (Tn.test(c)) {
    const o = u.md.normalizeLink(c);
    if (!u.md.validateLink(o))
      return !1;
    if (!e) {
      const i = u.push("link_open", "a", 1);
      i.attrs = [["href", o]], i.markup = "autolink", i.info = "auto";
      const a = u.push("text", "", 0);
      a.content = u.md.normalizeLinkText(c);
      const s = u.push("link_close", "a", -1);
      s.markup = "autolink", s.info = "auto";
    }
    return u.pos += c.length + 2, !0;
  }
  if (Sn.test(c)) {
    const o = u.md.normalizeLink("mailto:" + c);
    if (!u.md.validateLink(o))
      return !1;
    if (!e) {
      const i = u.push("link_open", "a", 1);
      i.attrs = [["href", o]], i.markup = "autolink", i.info = "auto";
      const a = u.push("text", "", 0);
      a.content = u.md.normalizeLinkText(c);
      const s = u.push("link_close", "a", -1);
      s.markup = "autolink", s.info = "auto";
    }
    return u.pos += c.length + 2, !0;
  }
  return !1;
}
function zn(u) {
  return /^<a[>\s]/i.test(u);
}
function In(u) {
  return /^<\/a\s*>/i.test(u);
}
function Mn(u) {
  const e = u | 32;
  return e >= 97 && e <= 122;
}
function qn(u, e) {
  if (!u.md.options.html)
    return !1;
  const n = u.posMax, r = u.pos;
  if (u.src.charCodeAt(r) !== 60 || r + 2 >= n)
    return !1;
  const t = u.src.charCodeAt(r + 1);
  if (t !== 33 && t !== 63 && t !== 47 && !Mn(t))
    return !1;
  const c = u.src.slice(r).match(fn);
  if (!c)
    return !1;
  if (!e) {
    const o = u.push("html_inline", "", 0);
    o.content = c[0], zn(o.content) && u.linkLevel++, In(o.content) && u.linkLevel--;
  }
  return u.pos += c[0].length, !0;
}
const Rn = /^&#((?:x[a-f0-9]{1,6}|[0-9]{1,7}));/i, On = /^&([a-z][a-z0-9]{1,31});/i;
function Pn(u, e) {
  const n = u.pos, r = u.posMax;
  if (u.src.charCodeAt(n) !== 38 || n + 1 >= r) return !1;
  if (u.src.charCodeAt(n + 1) === 35) {
    const c = u.src.slice(n).match(Rn);
    if (c) {
      if (!e) {
        const o = c[1][0].toLowerCase() === "x" ? parseInt(c[1].slice(1), 16) : parseInt(c[1], 10), i = u.push("text_special", "", 0);
        i.content = zu(o) ? au(o) : au(65533), i.markup = c[0], i.info = "entity";
      }
      return u.pos += c[0].length, !0;
    }
  } else {
    const c = u.src.slice(n).match(On);
    if (c) {
      const o = f0(c[0]);
      if (o !== c[0]) {
        if (!e) {
          const i = u.push("text_special", "", 0);
          i.content = o, i.markup = c[0], i.info = "entity";
        }
        return u.pos += c[0].length, !0;
      }
    }
  }
  return !1;
}
function Yu(u) {
  const e = {}, n = u.length;
  if (!n) return;
  let r = 0, t = -2;
  const c = [];
  for (let o = 0; o < n; o++) {
    const i = u[o];
    if (c.push(0), (u[r].marker !== i.marker || t !== i.token - 1) && (r = o), t = i.token, i.length = i.length || 0, !i.close) continue;
    e.hasOwnProperty(i.marker) || (e[i.marker] = [-1, -1, -1, -1, -1, -1]);
    const a = e[i.marker][(i.open ? 3 : 0) + i.length % 3];
    let s = r - c[r] - 1, f = s;
    for (; s > a; s -= c[s] + 1) {
      const l = u[s];
      if (l.marker === i.marker && l.open && l.end < 0) {
        let b = !1;
        if ((l.close || i.open) && (l.length + i.length) % 3 === 0 && (l.length % 3 !== 0 || i.length % 3 !== 0) && (b = !0), !b) {
          const h = s > 0 && !u[s - 1].open ? c[s - 1] + 1 : 0;
          c[o] = o - s + h, c[s] = h, i.open = !1, l.end = o, l.close = !1, f = -1, t = -2;
          break;
        }
      }
    }
    f !== -1 && (e[i.marker][(i.open ? 3 : 0) + (i.length || 0) % 3] = f);
  }
}
function Ln(u) {
  const e = u.tokens_meta, n = u.tokens_meta.length;
  Yu(u.delimiters);
  for (let r = 0; r < n; r++)
    e[r] && e[r].delimiters && Yu(e[r].delimiters);
}
function jn(u) {
  let e, n, r = 0;
  const t = u.tokens, c = u.tokens.length;
  for (e = n = 0; e < c; e++)
    t[e].nesting < 0 && r--, t[e].level = r, t[e].nesting > 0 && r++, t[e].type === "text" && e + 1 < c && t[e + 1].type === "text" ? t[e + 1].content = t[e].content + t[e + 1].content : (e !== n && (t[n] = t[e]), n++);
  e !== n && (t.length = n);
}
const gu = [
  ["text", _n],
  ["linkify", kn],
  ["newline", gn],
  ["escape", Dn],
  ["backticks", Cn],
  ["strikethrough", _0.tokenize],
  ["emphasis", m0.tokenize],
  ["link", wn],
  ["image", vn],
  ["autolink", Bn],
  ["html_inline", qn],
  ["entity", Pn]
], Du = [
  ["balance_pairs", Ln],
  ["strikethrough", _0.postProcess],
  ["emphasis", m0.postProcess],
  // rules for pairs separate '**' into its own text tokens, which may be left unused,
  // rule below merges unused segments back with the rest of the text
  ["fragments_join", jn]
];
function ru() {
  this.ruler = new w();
  for (let u = 0; u < gu.length; u++)
    this.ruler.push(gu[u][0], gu[u][1]);
  this.ruler2 = new w();
  for (let u = 0; u < Du.length; u++)
    this.ruler2.push(Du[u][0], Du[u][1]);
}
ru.prototype.skipToken = function(u) {
  const e = u.pos, n = this.ruler.getRules(""), r = n.length, t = u.md.options.maxNesting, c = u.cache;
  if (typeof c[e] < "u") {
    u.pos = c[e];
    return;
  }
  let o = !1;
  if (u.level < t) {
    for (let i = 0; i < r; i++)
      if (u.level++, o = n[i](u, !0), u.level--, o) {
        if (e >= u.pos)
          throw new Error("inline rule didn't increment state.pos");
        break;
      }
  } else
    u.pos = u.posMax;
  o || u.pos++, c[e] = u.pos;
};
ru.prototype.tokenize = function(u) {
  const e = this.ruler.getRules(""), n = e.length, r = u.posMax, t = u.md.options.maxNesting;
  for (; u.pos < r; ) {
    const c = u.pos;
    let o = !1;
    if (u.level < t) {
      for (let i = 0; i < n; i++)
        if (o = e[i](u, !1), o) {
          if (c >= u.pos)
            throw new Error("inline rule didn't increment state.pos");
          break;
        }
    }
    if (o) {
      if (u.pos >= r)
        break;
      continue;
    }
    u.pending += u.src[u.pos++];
  }
  u.pending && u.pushPending();
};
ru.prototype.parse = function(u, e, n, r) {
  const t = new this.State(u, e, n, r);
  this.tokenize(t);
  const c = this.ruler2.getRules(""), o = c.length;
  for (let i = 0; i < o; i++)
    c[i](t);
};
ru.prototype.State = nu;
function Nn(u) {
  const e = {};
  u = u || {}, e.src_Any = c0.source, e.src_Cc = i0.source, e.src_Z = a0.source, e.src_P = Tu.source, e.src_ZPCc = [e.src_Z, e.src_P, e.src_Cc].join("|"), e.src_ZCc = [e.src_Z, e.src_Cc].join("|");
  const n = "[><｜]";
  return e.src_pseudo_letter = "(?:(?!" + n + "|" + e.src_ZPCc + ")" + e.src_Any + ")", e.src_ip4 = "(?:(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)", e.src_auth = "(?:(?:(?!" + e.src_ZCc + "|[@/\\[\\]()]).)+@)?", e.src_port = "(?::(?:6(?:[0-4]\\d{3}|5(?:[0-4]\\d{2}|5(?:[0-2]\\d|3[0-5])))|[1-5]?\\d{1,4}))?", e.src_host_terminator = "(?=$|" + n + "|" + e.src_ZPCc + ")(?!" + (u["---"] ? "-(?!--)|" : "-|") + "_|:\\d|\\.-|\\.(?!$|" + e.src_ZPCc + "))", e.src_path = "(?:[/?#](?:(?!" + e.src_ZCc + "|" + n + `|[()[\\]{}.,"'?!\\-;]).|\\[(?:(?!` + e.src_ZCc + "|\\]).)*\\]|\\((?:(?!" + e.src_ZCc + "|[)]).)*\\)|\\{(?:(?!" + e.src_ZCc + '|[}]).)*\\}|\\"(?:(?!' + e.src_ZCc + `|["]).)+\\"|\\'(?:(?!` + e.src_ZCc + "|[']).)+\\'|\\'(?=" + e.src_pseudo_letter + "|[-])|\\.{2,}[a-zA-Z0-9%/&]|\\.(?!" + e.src_ZCc + "|[.]|$)|" + (u["---"] ? "\\-(?!--(?:[^-]|$))(?:-*)|" : "\\-+|") + // allow `,,,` in paths
  ",(?!" + e.src_ZCc + "|$)|;(?!" + e.src_ZCc + "|$)|\\!+(?!" + e.src_ZCc + "|[!]|$)|\\?(?!" + e.src_ZCc + "|[?]|$))+|\\/)?", e.src_email_name = '[\\-;:&=\\+\\$,\\.a-zA-Z0-9_][\\-;:&=\\+\\$,\\"\\.a-zA-Z0-9_]*', e.src_xn = "xn--[a-z0-9\\-]{1,59}", e.src_domain_root = // Allow letters & digits (http://test1)
  "(?:" + e.src_xn + "|" + e.src_pseudo_letter + "{1,63})", e.src_domain = "(?:" + e.src_xn + "|(?:" + e.src_pseudo_letter + ")|(?:" + e.src_pseudo_letter + "(?:-|" + e.src_pseudo_letter + "){0,61}" + e.src_pseudo_letter + "))", e.src_host = "(?:(?:(?:(?:" + e.src_domain + ")\\.)*" + e.src_domain + "))", e.tpl_host_fuzzy = "(?:" + e.src_ip4 + "|(?:(?:(?:" + e.src_domain + ")\\.)+(?:%TLDS%)))", e.tpl_host_no_ip_fuzzy = "(?:(?:(?:" + e.src_domain + ")\\.)+(?:%TLDS%))", e.src_host_strict = e.src_host + e.src_host_terminator, e.tpl_host_fuzzy_strict = e.tpl_host_fuzzy + e.src_host_terminator, e.src_host_port_strict = e.src_host + e.src_port + e.src_host_terminator, e.tpl_host_port_fuzzy_strict = e.tpl_host_fuzzy + e.src_port + e.src_host_terminator, e.tpl_host_port_no_ip_fuzzy_strict = e.tpl_host_no_ip_fuzzy + e.src_port + e.src_host_terminator, e.tpl_host_fuzzy_test = "localhost|www\\.|\\.\\d{1,3}\\.|(?:\\.(?:%TLDS%)(?:" + e.src_ZPCc + "|>|$))", e.tpl_email_fuzzy = "(^|" + n + '|"|\\(|' + e.src_ZCc + ")(" + e.src_email_name + "@" + e.tpl_host_fuzzy_strict + ")", e.tpl_link_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + e.src_ZPCc + "))((?![$+<=>^`|｜])" + e.tpl_host_port_fuzzy_strict + e.src_path + ")", e.tpl_link_no_ip_fuzzy = // Fuzzy link can't be prepended with .:/\- and non punctuation.
  // but can start with > (markdown blockquote)
  "(^|(?![.:/\\-_@])(?:[$+<=>^`|｜]|" + e.src_ZPCc + "))((?![$+<=>^`|｜])" + e.tpl_host_port_no_ip_fuzzy_strict + e.src_path + ")", e;
}
function Au(u) {
  return Array.prototype.slice.call(arguments, 1).forEach(function(n) {
    n && Object.keys(n).forEach(function(r) {
      u[r] = n[r];
    });
  }), u;
}
function bu(u) {
  return Object.prototype.toString.call(u);
}
function $n(u) {
  return bu(u) === "[object String]";
}
function Hn(u) {
  return bu(u) === "[object Object]";
}
function Un(u) {
  return bu(u) === "[object RegExp]";
}
function Ku(u) {
  return bu(u) === "[object Function]";
}
function Zn(u) {
  return u.replace(/[.?*+^$[\]\\(){}|-]/g, "\\$&");
}
const k0 = {
  fuzzyLink: !0,
  fuzzyEmail: !0,
  fuzzyIP: !1
};
function Vn(u) {
  return Object.keys(u || {}).reduce(function(e, n) {
    return e || k0.hasOwnProperty(n);
  }, !1);
}
const Gn = {
  "http:": {
    validate: function(u, e, n) {
      const r = u.slice(e);
      return n.re.http || (n.re.http = new RegExp(
        "^\\/\\/" + n.re.src_auth + n.re.src_host_port_strict + n.re.src_path,
        "i"
      )), n.re.http.test(r) ? r.match(n.re.http)[0].length : 0;
    }
  },
  "https:": "http:",
  "ftp:": "http:",
  "//": {
    validate: function(u, e, n) {
      const r = u.slice(e);
      return n.re.no_http || (n.re.no_http = new RegExp(
        "^" + n.re.src_auth + // Don't allow single-level domains, because of false positives like '//test'
        // with code comments
        "(?:localhost|(?:(?:" + n.re.src_domain + ")\\.)+" + n.re.src_domain_root + ")" + n.re.src_port + n.re.src_host_terminator + n.re.src_path,
        "i"
      )), n.re.no_http.test(r) ? e >= 3 && u[e - 3] === ":" || e >= 3 && u[e - 3] === "/" ? 0 : r.match(n.re.no_http)[0].length : 0;
    }
  },
  "mailto:": {
    validate: function(u, e, n) {
      const r = u.slice(e);
      return n.re.mailto || (n.re.mailto = new RegExp(
        "^" + n.re.src_email_name + "@" + n.re.src_host_strict,
        "i"
      )), n.re.mailto.test(r) ? r.match(n.re.mailto)[0].length : 0;
    }
  }
}, Wn = "a[cdefgilmnoqrstuwxz]|b[abdefghijmnorstvwyz]|c[acdfghiklmnoruvwxyz]|d[ejkmoz]|e[cegrstu]|f[ijkmor]|g[abdefghilmnpqrstuwy]|h[kmnrtu]|i[delmnoqrst]|j[emop]|k[eghimnprwyz]|l[abcikrstuvy]|m[acdeghklmnopqrstuvwxyz]|n[acefgilopruz]|om|p[aefghklmnrstwy]|qa|r[eosuw]|s[abcdeghijklmnortuvxyz]|t[cdfghjklmnortvwz]|u[agksyz]|v[aceginu]|w[fs]|y[et]|z[amw]", Jn = "biz|com|edu|gov|net|org|pro|web|xxx|aero|asia|coop|info|museum|name|shop|рф".split("|");
function Qn(u) {
  u.__index__ = -1, u.__text_cache__ = "";
}
function Xn(u) {
  return function(e, n) {
    const r = e.slice(n);
    return u.test(r) ? r.match(u)[0].length : 0;
  };
}
function u0() {
  return function(u, e) {
    e.normalize(u);
  };
}
function su(u) {
  const e = u.re = Nn(u.__opts__), n = u.__tlds__.slice();
  u.onCompile(), u.__tlds_replaced__ || n.push(Wn), n.push(e.src_xn), e.src_tlds = n.join("|");
  function r(i) {
    return i.replace("%TLDS%", e.src_tlds);
  }
  e.email_fuzzy = RegExp(r(e.tpl_email_fuzzy), "i"), e.link_fuzzy = RegExp(r(e.tpl_link_fuzzy), "i"), e.link_no_ip_fuzzy = RegExp(r(e.tpl_link_no_ip_fuzzy), "i"), e.host_fuzzy_test = RegExp(r(e.tpl_host_fuzzy_test), "i");
  const t = [];
  u.__compiled__ = {};
  function c(i, a) {
    throw new Error('(LinkifyIt) Invalid schema "' + i + '": ' + a);
  }
  Object.keys(u.__schemas__).forEach(function(i) {
    const a = u.__schemas__[i];
    if (a === null)
      return;
    const s = { validate: null, link: null };
    if (u.__compiled__[i] = s, Hn(a)) {
      Un(a.validate) ? s.validate = Xn(a.validate) : Ku(a.validate) ? s.validate = a.validate : c(i, a), Ku(a.normalize) ? s.normalize = a.normalize : a.normalize ? c(i, a) : s.normalize = u0();
      return;
    }
    if ($n(a)) {
      t.push(i);
      return;
    }
    c(i, a);
  }), t.forEach(function(i) {
    u.__compiled__[u.__schemas__[i]] && (u.__compiled__[i].validate = u.__compiled__[u.__schemas__[i]].validate, u.__compiled__[i].normalize = u.__compiled__[u.__schemas__[i]].normalize);
  }), u.__compiled__[""] = { validate: null, normalize: u0() };
  const o = Object.keys(u.__compiled__).filter(function(i) {
    return i.length > 0 && u.__compiled__[i];
  }).map(Zn).join("|");
  u.re.schema_test = RegExp("(^|(?!_)(?:[><｜]|" + e.src_ZPCc + "))(" + o + ")", "i"), u.re.schema_search = RegExp("(^|(?!_)(?:[><｜]|" + e.src_ZPCc + "))(" + o + ")", "ig"), u.re.schema_at_start = RegExp("^" + u.re.schema_search.source, "i"), u.re.pretest = RegExp(
    "(" + u.re.schema_test.source + ")|(" + u.re.host_fuzzy_test.source + ")|@",
    "i"
  ), Qn(u);
}
function Yn(u, e) {
  const n = u.__index__, r = u.__last_index__, t = u.__text_cache__.slice(n, r);
  this.schema = u.__schema__.toLowerCase(), this.index = n + e, this.lastIndex = r + e, this.raw = t, this.text = t, this.url = t;
}
function Fu(u, e) {
  const n = new Yn(u, e);
  return u.__compiled__[n.schema].normalize(n, u), n;
}
function v(u, e) {
  if (!(this instanceof v))
    return new v(u, e);
  e || Vn(u) && (e = u, u = {}), this.__opts__ = Au({}, k0, e), this.__index__ = -1, this.__last_index__ = -1, this.__schema__ = "", this.__text_cache__ = "", this.__schemas__ = Au({}, Gn, u), this.__compiled__ = {}, this.__tlds__ = Jn, this.__tlds_replaced__ = !1, this.re = {}, su(this);
}
v.prototype.add = function(e, n) {
  return this.__schemas__[e] = n, su(this), this;
};
v.prototype.set = function(e) {
  return this.__opts__ = Au(this.__opts__, e), this;
};
v.prototype.test = function(e) {
  if (this.__text_cache__ = e, this.__index__ = -1, !e.length)
    return !1;
  let n, r, t, c, o, i, a, s, f;
  if (this.re.schema_test.test(e)) {
    for (a = this.re.schema_search, a.lastIndex = 0; (n = a.exec(e)) !== null; )
      if (c = this.testSchemaAt(e, n[2], a.lastIndex), c) {
        this.__schema__ = n[2], this.__index__ = n.index + n[1].length, this.__last_index__ = n.index + n[0].length + c;
        break;
      }
  }
  return this.__opts__.fuzzyLink && this.__compiled__["http:"] && (s = e.search(this.re.host_fuzzy_test), s >= 0 && (this.__index__ < 0 || s < this.__index__) && (r = e.match(this.__opts__.fuzzyIP ? this.re.link_fuzzy : this.re.link_no_ip_fuzzy)) !== null && (o = r.index + r[1].length, (this.__index__ < 0 || o < this.__index__) && (this.__schema__ = "", this.__index__ = o, this.__last_index__ = r.index + r[0].length))), this.__opts__.fuzzyEmail && this.__compiled__["mailto:"] && (f = e.indexOf("@"), f >= 0 && (t = e.match(this.re.email_fuzzy)) !== null && (o = t.index + t[1].length, i = t.index + t[0].length, (this.__index__ < 0 || o < this.__index__ || o === this.__index__ && i > this.__last_index__) && (this.__schema__ = "mailto:", this.__index__ = o, this.__last_index__ = i))), this.__index__ >= 0;
};
v.prototype.pretest = function(e) {
  return this.re.pretest.test(e);
};
v.prototype.testSchemaAt = function(e, n, r) {
  return this.__compiled__[n.toLowerCase()] ? this.__compiled__[n.toLowerCase()].validate(e, r, this) : 0;
};
v.prototype.match = function(e) {
  const n = [];
  let r = 0;
  this.__index__ >= 0 && this.__text_cache__ === e && (n.push(Fu(this, r)), r = this.__last_index__);
  let t = r ? e.slice(r) : e;
  for (; this.test(t); )
    n.push(Fu(this, r)), t = t.slice(this.__last_index__), r += this.__last_index__;
  return n.length ? n : null;
};
v.prototype.matchAtStart = function(e) {
  if (this.__text_cache__ = e, this.__index__ = -1, !e.length) return null;
  const n = this.re.schema_at_start.exec(e);
  if (!n) return null;
  const r = this.testSchemaAt(e, n[2], n[0].length);
  return r ? (this.__schema__ = n[2], this.__index__ = n.index + n[1].length, this.__last_index__ = n.index + n[0].length + r, Fu(this, 0)) : null;
};
v.prototype.tlds = function(e, n) {
  return e = Array.isArray(e) ? e : [e], n ? (this.__tlds__ = this.__tlds__.concat(e).sort().filter(function(r, t, c) {
    return r !== c[t - 1];
  }).reverse(), su(this), this) : (this.__tlds__ = e.slice(), this.__tlds_replaced__ = !0, su(this), this);
};
v.prototype.normalize = function(e) {
  e.schema || (e.url = "http://" + e.url), e.schema === "mailto:" && !/^mailto:/i.test(e.url) && (e.url = "mailto:" + e.url);
};
v.prototype.onCompile = function() {
};
const Z = 2147483647, z = 36, qu = 1, uu = 26, Kn = 38, ur = 700, g0 = 72, D0 = 128, C0 = "-", er = /^xn--/, nr = /[^\0-\x7F]/, rr = /[\x2E\u3002\uFF0E\uFF61]/g, tr = {
  overflow: "Overflow: input needs wider integers to process",
  "not-basic": "Illegal input >= 0x80 (not a basic code point)",
  "invalid-input": "Invalid input"
}, Cu = z - qu, I = Math.floor, Eu = String.fromCharCode;
function O(u) {
  throw new RangeError(tr[u]);
}
function cr(u, e) {
  const n = [];
  let r = u.length;
  for (; r--; )
    n[r] = e(u[r]);
  return n;
}
function E0(u, e) {
  const n = u.split("@");
  let r = "";
  n.length > 1 && (r = n[0] + "@", u = n[1]), u = u.replace(rr, ".");
  const t = u.split("."), c = cr(t, e).join(".");
  return r + c;
}
function ir(u) {
  const e = [];
  let n = 0;
  const r = u.length;
  for (; n < r; ) {
    const t = u.charCodeAt(n++);
    if (t >= 55296 && t <= 56319 && n < r) {
      const c = u.charCodeAt(n++);
      (c & 64512) == 56320 ? e.push(((t & 1023) << 10) + (c & 1023) + 65536) : (e.push(t), n--);
    } else
      e.push(t);
  }
  return e;
}
const or = function(u) {
  return u >= 48 && u < 58 ? 26 + (u - 48) : u >= 65 && u < 91 ? u - 65 : u >= 97 && u < 123 ? u - 97 : z;
}, e0 = function(u, e) {
  return u + 22 + 75 * (u < 26) - ((e != 0) << 5);
}, y0 = function(u, e, n) {
  let r = 0;
  for (u = n ? I(u / ur) : u >> 1, u += I(u / e); u > Cu * uu >> 1; r += z)
    u = I(u / Cu);
  return I(r + (Cu + 1) * u / (u + Kn));
}, ar = function(u) {
  const e = [], n = u.length;
  let r = 0, t = D0, c = g0, o = u.lastIndexOf(C0);
  o < 0 && (o = 0);
  for (let i = 0; i < o; ++i)
    u.charCodeAt(i) >= 128 && O("not-basic"), e.push(u.charCodeAt(i));
  for (let i = o > 0 ? o + 1 : 0; i < n; ) {
    const a = r;
    for (let f = 1, l = z; ; l += z) {
      i >= n && O("invalid-input");
      const b = or(u.charCodeAt(i++));
      b >= z && O("invalid-input"), b > I((Z - r) / f) && O("overflow"), r += b * f;
      const h = l <= c ? qu : l >= c + uu ? uu : l - c;
      if (b < h)
        break;
      const d = z - h;
      f > I(Z / d) && O("overflow"), f *= d;
    }
    const s = e.length + 1;
    c = y0(r - a, s, a == 0), I(r / s) > Z - t && O("overflow"), t += I(r / s), r %= s, e.splice(r++, 0, t);
  }
  return String.fromCodePoint(...e);
}, sr = function(u) {
  const e = [];
  u = ir(u);
  const n = u.length;
  let r = D0, t = 0, c = g0;
  for (const a of u)
    a < 128 && e.push(Eu(a));
  const o = e.length;
  let i = o;
  for (o && e.push(C0); i < n; ) {
    let a = Z;
    for (const f of u)
      f >= r && f < a && (a = f);
    const s = i + 1;
    a - r > I((Z - t) / s) && O("overflow"), t += (a - r) * s, r = a;
    for (const f of u)
      if (f < r && ++t > Z && O("overflow"), f === r) {
        let l = t;
        for (let b = z; ; b += z) {
          const h = b <= c ? qu : b >= c + uu ? uu : b - c;
          if (l < h)
            break;
          const d = l - h, k = z - h;
          e.push(
            Eu(e0(h + d % k, 0))
          ), l = I(d / k);
        }
        e.push(Eu(e0(l, 0))), c = y0(t, s, i === o), t = 0, ++i;
      }
    ++t, ++r;
  }
  return e.join("");
}, fr = function(u) {
  return E0(u, function(e) {
    return er.test(e) ? ar(e.slice(4).toLowerCase()) : e;
  });
}, lr = function(u) {
  return E0(u, function(e) {
    return nr.test(e) ? "xn--" + sr(e) : e;
  });
}, A0 = {
  toASCII: lr,
  toUnicode: fr
}, dr = {
  options: {
    // Enable HTML tags in source
    html: !1,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !1,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 100
  },
  components: {
    core: {},
    block: {},
    inline: {}
  }
}, hr = {
  options: {
    // Enable HTML tags in source
    html: !1,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !1,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "text"
      ],
      rules2: [
        "balance_pairs",
        "fragments_join"
      ]
    }
  }
}, br = {
  options: {
    // Enable HTML tags in source
    html: !0,
    // Use '/' to close single tags (<br />)
    xhtmlOut: !0,
    // Convert '\n' in paragraphs into <br>
    breaks: !1,
    // CSS language prefix for fenced blocks
    langPrefix: "language-",
    // autoconvert URL-like texts to links
    linkify: !1,
    // Enable some language-neutral replacements + quotes beautification
    typographer: !1,
    // Double + single quotes replacement pairs, when typographer enabled,
    // and smartquotes on. Could be either a String or an Array.
    //
    // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
    // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
    quotes: "“”‘’",
    /* “”‘’ */
    // Highlighter function. Should return escaped HTML,
    // or '' if the source string is not changed and should be escaped externaly.
    // If result starts with <pre... internal wrapper is skipped.
    //
    // function (/*str, lang*/) { return ''; }
    //
    highlight: null,
    // Internal protection, recursion limit
    maxNesting: 20
  },
  components: {
    core: {
      rules: [
        "normalize",
        "block",
        "inline",
        "text_join"
      ]
    },
    block: {
      rules: [
        "blockquote",
        "code",
        "fence",
        "heading",
        "hr",
        "html_block",
        "lheading",
        "list",
        "reference",
        "paragraph"
      ]
    },
    inline: {
      rules: [
        "autolink",
        "backticks",
        "emphasis",
        "entity",
        "escape",
        "html_inline",
        "image",
        "link",
        "newline",
        "text"
      ],
      rules2: [
        "balance_pairs",
        "emphasis",
        "fragments_join"
      ]
    }
  }
}, pr = {
  default: dr,
  zero: hr,
  commonmark: br
}, xr = /^(vbscript|javascript|file|data):/, _r = /^data:image\/(gif|png|jpeg|webp);/;
function mr(u) {
  const e = u.trim().toLowerCase();
  return xr.test(e) ? _r.test(e) : !0;
}
const F0 = ["http:", "https:", "mailto:"];
function kr(u) {
  const e = Su(u, !0);
  if (e.hostname && (!e.protocol || F0.indexOf(e.protocol) >= 0))
    try {
      e.hostname = A0.toASCII(e.hostname);
    } catch {
    }
  return eu(vu(e));
}
function gr(u) {
  const e = Su(u, !0);
  if (e.hostname && (!e.protocol || F0.indexOf(e.protocol) >= 0))
    try {
      e.hostname = A0.toUnicode(e.hostname);
    } catch {
    }
  return V(vu(e), V.defaultChars + "%");
}
function S(u, e) {
  if (!(this instanceof S))
    return new S(u, e);
  e || Bu(u) || (e = u || {}, u = "default"), this.inline = new ru(), this.block = new hu(), this.core = new Iu(), this.renderer = new J(), this.linkify = new v(), this.validateLink = mr, this.normalizeLink = kr, this.normalizeLinkText = gr, this.utils = ke, this.helpers = lu({}, Ee), this.options = {}, this.configure(u), e && this.set(e);
}
S.prototype.set = function(u) {
  return lu(this.options, u), this;
};
S.prototype.configure = function(u) {
  const e = this;
  if (Bu(u)) {
    const n = u;
    if (u = pr[n], !u)
      throw new Error('Wrong `markdown-it` preset "' + n + '", check name');
  }
  if (!u)
    throw new Error("Wrong `markdown-it` preset, can't be empty");
  return u.options && e.set(u.options), u.components && Object.keys(u.components).forEach(function(n) {
    u.components[n].rules && e[n].ruler.enableOnly(u.components[n].rules), u.components[n].rules2 && e[n].ruler2.enableOnly(u.components[n].rules2);
  }), this;
};
S.prototype.enable = function(u, e) {
  let n = [];
  Array.isArray(u) || (u = [u]), ["core", "block", "inline"].forEach(function(t) {
    n = n.concat(this[t].ruler.enable(u, !0));
  }, this), n = n.concat(this.inline.ruler2.enable(u, !0));
  const r = u.filter(function(t) {
    return n.indexOf(t) < 0;
  });
  if (r.length && !e)
    throw new Error("MarkdownIt. Failed to enable unknown rule(s): " + r);
  return this;
};
S.prototype.disable = function(u, e) {
  let n = [];
  Array.isArray(u) || (u = [u]), ["core", "block", "inline"].forEach(function(t) {
    n = n.concat(this[t].ruler.disable(u, !0));
  }, this), n = n.concat(this.inline.ruler2.disable(u, !0));
  const r = u.filter(function(t) {
    return n.indexOf(t) < 0;
  });
  if (r.length && !e)
    throw new Error("MarkdownIt. Failed to disable unknown rule(s): " + r);
  return this;
};
S.prototype.use = function(u) {
  const e = [this].concat(Array.prototype.slice.call(arguments, 1));
  return u.apply(u, e), this;
};
S.prototype.parse = function(u, e) {
  if (typeof u != "string")
    throw new Error("Input data should be a String");
  const n = new this.core.State(u, this, e);
  return this.core.process(n), n.tokens;
};
S.prototype.render = function(u, e) {
  return e = e || {}, this.renderer.render(this.parse(u, e), this.options, e);
};
S.prototype.parseInline = function(u, e) {
  const n = new this.core.State(u, this, e);
  return n.inlineMode = !0, this.core.process(n), n.tokens;
};
S.prototype.renderInline = function(u, e) {
  return e = e || {}, this.renderer.render(this.parseInline(u, e), this.options, e);
};
var n0 = !1, W = { false: "push", true: "unshift", after: "push", before: "unshift" }, fu = { isPermalinkSymbol: !0 };
function wu(u, e, n, r) {
  var t;
  if (!n0) {
    var c = "Using deprecated markdown-it-anchor permalink option, see https://github.com/valeriangalliat/markdown-it-anchor#permalinks";
    typeof process == "object" && process && process.emitWarning ? process.emitWarning(c) : console.warn(c), n0 = !0;
  }
  var o = [Object.assign(new n.Token("link_open", "a", 1), { attrs: [].concat(e.permalinkClass ? [["class", e.permalinkClass]] : [], [["href", e.permalinkHref(u, n)]], Object.entries(e.permalinkAttrs(u, n))) }), Object.assign(new n.Token("html_block", "", 0), { content: e.permalinkSymbol, meta: fu }), new n.Token("link_close", "a", -1)];
  e.permalinkSpace && n.tokens[r + 1].children[W[e.permalinkBefore]](Object.assign(new n.Token("text", "", 0), { content: " " })), (t = n.tokens[r + 1].children)[W[e.permalinkBefore]].apply(t, o);
}
function w0(u) {
  return "#" + u;
}
function v0(u) {
  return {};
}
var Dr = { class: "header-anchor", symbol: "#", renderHref: w0, renderAttrs: v0 };
function tu(u) {
  function e(n) {
    return n = Object.assign({}, e.defaults, n), function(r, t, c, o) {
      return u(r, n, t, c, o);
    };
  }
  return e.defaults = Object.assign({}, Dr), e.renderPermalinkImpl = u, e;
}
function Ru(u) {
  var e = [], n = u.filter(function(r) {
    if (r[0] !== "class") return !0;
    e.push(r[1]);
  });
  return e.length > 0 && n.unshift(["class", e.join(" ")]), n;
}
var pu = tu(function(u, e, n, r, t) {
  var c, o = [Object.assign(new r.Token("link_open", "a", 1), { attrs: Ru([].concat(e.class ? [["class", e.class]] : [], [["href", e.renderHref(u, r)]], e.ariaHidden ? [["aria-hidden", "true"]] : [], Object.entries(e.renderAttrs(u, r)))) }), Object.assign(new r.Token("html_inline", "", 0), { content: e.symbol, meta: fu }), new r.Token("link_close", "a", -1)];
  if (e.space) {
    var i = typeof e.space == "string" ? e.space : " ";
    r.tokens[t + 1].children[W[e.placement]](Object.assign(new r.Token(typeof e.space == "string" ? "html_inline" : "text", "", 0), { content: i }));
  }
  (c = r.tokens[t + 1].children)[W[e.placement]].apply(c, o);
});
Object.assign(pu.defaults, { space: !0, placement: "after", ariaHidden: !1 });
var N = tu(pu.renderPermalinkImpl);
N.defaults = Object.assign({}, pu.defaults, { ariaHidden: !0 });
var S0 = tu(function(u, e, n, r, t) {
  var c = [Object.assign(new r.Token("link_open", "a", 1), { attrs: Ru([].concat(e.class ? [["class", e.class]] : [], [["href", e.renderHref(u, r)]], Object.entries(e.renderAttrs(u, r)))) })].concat(e.safariReaderFix ? [new r.Token("span_open", "span", 1)] : [], r.tokens[t + 1].children, e.safariReaderFix ? [new r.Token("span_close", "span", -1)] : [], [new r.Token("link_close", "a", -1)]);
  r.tokens[t + 1] = Object.assign(new r.Token("inline", "", 0), { children: c });
});
Object.assign(S0.defaults, { safariReaderFix: !1 });
var r0 = tu(function(u, e, n, r, t) {
  var c;
  if (!["visually-hidden", "aria-label", "aria-describedby", "aria-labelledby"].includes(e.style)) throw new Error("`permalink.linkAfterHeader` called with unknown style option `" + e.style + "`");
  if (!["aria-describedby", "aria-labelledby"].includes(e.style) && !e.assistiveText) throw new Error("`permalink.linkAfterHeader` called without the `assistiveText` option in `" + e.style + "` style");
  if (e.style === "visually-hidden" && !e.visuallyHiddenClass) throw new Error("`permalink.linkAfterHeader` called without the `visuallyHiddenClass` option in `visually-hidden` style");
  var o = r.tokens[t + 1].children.filter(function(l) {
    return l.type === "text" || l.type === "code_inline";
  }).reduce(function(l, b) {
    return l + b.content;
  }, ""), i = [], a = [];
  if (e.class && a.push(["class", e.class]), a.push(["href", e.renderHref(u, r)]), a.push.apply(a, Object.entries(e.renderAttrs(u, r))), e.style === "visually-hidden") {
    if (i.push(Object.assign(new r.Token("span_open", "span", 1), { attrs: [["class", e.visuallyHiddenClass]] }), Object.assign(new r.Token("text", "", 0), { content: e.assistiveText(o) }), new r.Token("span_close", "span", -1)), e.space) {
      var s = typeof e.space == "string" ? e.space : " ";
      i[W[e.placement]](Object.assign(new r.Token(typeof e.space == "string" ? "html_inline" : "text", "", 0), { content: s }));
    }
    i[W[e.placement]](Object.assign(new r.Token("span_open", "span", 1), { attrs: [["aria-hidden", "true"]] }), Object.assign(new r.Token("html_inline", "", 0), { content: e.symbol, meta: fu }), new r.Token("span_close", "span", -1));
  } else i.push(Object.assign(new r.Token("html_inline", "", 0), { content: e.symbol, meta: fu }));
  e.style === "aria-label" ? a.push(["aria-label", e.assistiveText(o)]) : ["aria-describedby", "aria-labelledby"].includes(e.style) && a.push([e.style, u]);
  var f = [Object.assign(new r.Token("link_open", "a", 1), { attrs: Ru(a) })].concat(i, [new r.Token("link_close", "a", -1)]);
  (c = r.tokens).splice.apply(c, [t + 3, 0].concat(f)), e.wrapper && (r.tokens.splice(t, 0, Object.assign(new r.Token("html_block", "", 0), { content: e.wrapper[0] + `
` })), r.tokens.splice(t + 3 + f.length + 1, 0, Object.assign(new r.Token("html_block", "", 0), { content: e.wrapper[1] + `
` })));
});
function t0(u, e, n, r) {
  var t = u, c = r;
  if (n && Object.prototype.hasOwnProperty.call(e, t)) throw new Error("User defined `id` attribute `" + u + "` is not unique. Please fix it in your Markdown to continue.");
  for (; Object.prototype.hasOwnProperty.call(e, t); ) t = u + "-" + c, c += 1;
  return e[t] = !0, t;
}
function U(u, e) {
  e = Object.assign({}, U.defaults, e), u.core.ruler.push("anchor", function(n) {
    for (var r, t = {}, c = n.tokens, o = Array.isArray(e.level) ? (r = e.level, function(l) {
      return r.includes(l);
    }) : /* @__PURE__ */ function(l) {
      return function(b) {
        return b >= l;
      };
    }(e.level), i = 0; i < c.length; i++) {
      var a = c[i];
      if (a.type === "heading_open" && o(Number(a.tag.substr(1)))) {
        var s = e.getTokensText(c[i + 1].children), f = a.attrGet("id");
        f = f == null ? t0(f = e.slugifyWithState ? e.slugifyWithState(s, n) : e.slugify(s), t, !1, e.uniqueSlugStartIndex) : t0(f, t, !0, e.uniqueSlugStartIndex), a.attrSet("id", f), e.tabIndex !== !1 && a.attrSet("tabindex", "" + e.tabIndex), typeof e.permalink == "function" ? e.permalink(f, e, n, i) : (e.permalink || e.renderPermalink && e.renderPermalink !== wu) && e.renderPermalink(f, e, n, i), i = c.indexOf(a), e.callback && e.callback(a, { slug: f, title: s });
      }
    }
  });
}
Object.assign(r0.defaults, { style: "visually-hidden", space: !0, placement: "after", wrapper: null }), U.permalink = { __proto__: null, legacy: wu, renderHref: w0, renderAttrs: v0, makePermalink: tu, linkInsideHeader: pu, ariaHidden: N, headerLink: S0, linkAfterHeader: r0 }, U.defaults = { level: 1, slugify: function(u) {
  return encodeURIComponent(String(u).trim().toLowerCase().replace(/\s+/g, "-"));
}, uniqueSlugStartIndex: 1, tabIndex: "-1", getTokensText: function(u) {
  return u.filter(function(e) {
    return ["text", "code_inline"].includes(e.type);
  }).map(function(e) {
    return e.content;
  }).join("");
}, permalink: !1, renderPermalink: wu, permalinkClass: N.defaults.class, permalinkSpace: N.defaults.space, permalinkSymbol: "¶", permalinkBefore: N.defaults.placement === "before", permalinkHref: N.defaults.renderHref, permalinkAttrs: N.defaults.renderAttrs }, U.default = U;
function Cr(u) {
  function e(r, t) {
    const c = r.pos, o = r.src.charCodeAt(c);
    if (t || o !== 43)
      return !1;
    const i = r.scanDelims(r.pos, !0);
    let a = i.length;
    const s = String.fromCharCode(o);
    if (a < 2)
      return !1;
    if (a % 2) {
      const f = r.push("text", "", 0);
      f.content = s, a--;
    }
    for (let f = 0; f < a; f += 2) {
      const l = r.push("text", "", 0);
      l.content = s + s, !(!i.can_open && !i.can_close) && r.delimiters.push({
        marker: o,
        length: 0,
        // disable "rule of 3" length checks meant for emphasis
        jump: f / 2,
        // 1 delimiter = 2 characters
        token: r.tokens.length - 1,
        end: -1,
        open: i.can_open,
        close: i.can_close
      });
    }
    return r.pos += i.length, !0;
  }
  function n(r, t) {
    let c;
    const o = [], i = t.length;
    for (let a = 0; a < i; a++) {
      const s = t[a];
      if (s.marker !== 43 || s.end === -1)
        continue;
      const f = t[s.end];
      c = r.tokens[s.token], c.type = "ins_open", c.tag = "ins", c.nesting = 1, c.markup = "++", c.content = "", c = r.tokens[f.token], c.type = "ins_close", c.tag = "ins", c.nesting = -1, c.markup = "++", c.content = "", r.tokens[f.token - 1].type === "text" && r.tokens[f.token - 1].content === "+" && o.push(f.token - 1);
    }
    for (; o.length; ) {
      const a = o.pop();
      let s = a + 1;
      for (; s < r.tokens.length && r.tokens[s].type === "ins_close"; )
        s++;
      s--, a !== s && (c = r.tokens[s], r.tokens[s] = r.tokens[a], r.tokens[a] = c);
    }
  }
  u.inline.ruler.before("emphasis", "ins", e), u.inline.ruler2.before("emphasis", "ins", function(r) {
    const t = r.tokens_meta, c = (r.tokens_meta || []).length;
    n(r, r.delimiters);
    for (let o = 0; o < c; o++)
      t[o] && t[o].delimiters && n(r, t[o].delimiters);
  });
}
function Er(u) {
  function e(r, t) {
    const c = r.pos, o = r.src.charCodeAt(c);
    if (t || o !== 61)
      return !1;
    const i = r.scanDelims(r.pos, !0);
    let a = i.length;
    const s = String.fromCharCode(o);
    if (a < 2)
      return !1;
    if (a % 2) {
      const f = r.push("text", "", 0);
      f.content = s, a--;
    }
    for (let f = 0; f < a; f += 2) {
      const l = r.push("text", "", 0);
      l.content = s + s, !(!i.can_open && !i.can_close) && r.delimiters.push({
        marker: o,
        length: 0,
        // disable "rule of 3" length checks meant for emphasis
        jump: f / 2,
        // 1 delimiter = 2 characters
        token: r.tokens.length - 1,
        end: -1,
        open: i.can_open,
        close: i.can_close
      });
    }
    return r.pos += i.length, !0;
  }
  function n(r, t) {
    const c = [], o = t.length;
    for (let i = 0; i < o; i++) {
      const a = t[i];
      if (a.marker !== 61 || a.end === -1)
        continue;
      const s = t[a.end], f = r.tokens[a.token];
      f.type = "mark_open", f.tag = "mark", f.nesting = 1, f.markup = "==", f.content = "";
      const l = r.tokens[s.token];
      l.type = "mark_close", l.tag = "mark", l.nesting = -1, l.markup = "==", l.content = "", r.tokens[s.token - 1].type === "text" && r.tokens[s.token - 1].content === "=" && c.push(s.token - 1);
    }
    for (; c.length; ) {
      const i = c.pop();
      let a = i + 1;
      for (; a < r.tokens.length && r.tokens[a].type === "mark_close"; )
        a++;
      if (a--, i !== a) {
        const s = r.tokens[a];
        r.tokens[a] = r.tokens[i], r.tokens[i] = s;
      }
    }
  }
  u.inline.ruler.before("emphasis", "mark", e), u.inline.ruler2.before("emphasis", "mark", function(r) {
    let t;
    const c = r.tokens_meta, o = (r.tokens_meta || []).length;
    for (n(r, r.delimiters), t = 0; t < o; t++)
      c[t] && c[t].delimiters && n(r, c[t].delimiters);
  });
}
const yr = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/g;
function Ar(u, e) {
  const n = u.posMax, r = u.pos;
  if (u.src.charCodeAt(r) !== 126 || e || r + 2 >= n)
    return !1;
  u.pos = r + 1;
  let t = !1;
  for (; u.pos < n; ) {
    if (u.src.charCodeAt(u.pos) === 126) {
      t = !0;
      break;
    }
    u.md.inline.skipToken(u);
  }
  if (!t || r + 1 === u.pos)
    return u.pos = r, !1;
  const c = u.src.slice(r + 1, u.pos);
  if (c.match(/(^|[^\\])(\\\\)*\s/))
    return u.pos = r, !1;
  u.posMax = u.pos, u.pos = r + 1;
  const o = u.push("sub_open", "sub", 1);
  o.markup = "~";
  const i = u.push("text", "", 0);
  i.content = c.replace(yr, "$1");
  const a = u.push("sub_close", "sub", -1);
  return a.markup = "~", u.pos = u.posMax + 1, u.posMax = n, !0;
}
function Fr(u) {
  u.inline.ruler.after("emphasis", "sub", Ar);
}
const wr = /\\([ \\!"#$%&'()*+,./:;<=>?@[\]^_`{|}~-])/g;
function vr(u, e) {
  const n = u.posMax, r = u.pos;
  if (u.src.charCodeAt(r) !== 94 || e || r + 2 >= n)
    return !1;
  u.pos = r + 1;
  let t = !1;
  for (; u.pos < n; ) {
    if (u.src.charCodeAt(u.pos) === 94) {
      t = !0;
      break;
    }
    u.md.inline.skipToken(u);
  }
  if (!t || r + 1 === u.pos)
    return u.pos = r, !1;
  const c = u.src.slice(r + 1, u.pos);
  if (c.match(/(^|[^\\])(\\\\)*\s/))
    return u.pos = r, !1;
  u.posMax = u.pos, u.pos = r + 1;
  const o = u.push("sup_open", "sup", 1);
  o.markup = "^";
  const i = u.push("text", "", 0);
  i.content = c.replace(wr, "$1");
  const a = u.push("sup_close", "sup", -1);
  return a.markup = "^", u.pos = u.posMax + 1, u.posMax = n, !0;
}
function Sr(u) {
  u.inline.ruler.after("emphasis", "sup", vr);
}
function Tr(u) {
  const e = S({
    html: !0,
    breaks: !0,
    highlight(n, r) {
      const t = u[r] || u.default;
      return t == null ? void 0 : t(n, r);
    }
  });
  return e.use(Cr).use(Er).use(Fr).use(Sr).use(U), e;
}
export {
  Tr as initMarkdownIt
};
