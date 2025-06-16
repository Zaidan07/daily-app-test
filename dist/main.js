var __create = Object.create;
var __getProtoOf = Object.getPrototypeOf;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __toESM = (mod, isNodeMode, target) => {
  target = mod != null ? __create(__getProtoOf(mod)) : {};
  const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
  for (let key of __getOwnPropNames(mod))
    if (!__hasOwnProp.call(to, key))
      __defProp(to, key, {
        get: () => mod[key],
        enumerable: true
      });
  return to;
};
var __moduleCache = /* @__PURE__ */ new WeakMap;
var __toCommonJS = (from) => {
  var entry = __moduleCache.get(from), desc;
  if (entry)
    return entry;
  entry = __defProp({}, "__esModule", { value: true });
  if (from && typeof from === "object" || typeof from === "function")
    __getOwnPropNames(from).map((key) => !__hasOwnProp.call(entry, key) && __defProp(entry, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    }));
  __moduleCache.set(from, entry);
  return entry;
};
var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};
var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// node:path
var exports_path = {};
__export(exports_path, {
  win32: () => y,
  toNamespacedPath: () => U,
  sep: () => I,
  resolve: () => B,
  relative: () => Q,
  posix: () => g,
  parse: () => $,
  normalize: () => G,
  join: () => K,
  isAbsolute: () => H,
  format: () => Z,
  extname: () => Y,
  dirname: () => V,
  delimiter: () => O,
  default: () => q,
  basename: () => X
});
var L, h, D, T, _, E, R = (s, e) => () => (e || s((e = { exports: {} }).exports, e), e.exports), N = (s, e, r, t) => {
  if (e && typeof e == "object" || typeof e == "function")
    for (let i of T(e))
      !E.call(s, i) && i !== r && h(s, i, { get: () => e[i], enumerable: !(t = D(e, i)) || t.enumerable });
  return s;
}, j = (s, e, r) => (r = s != null ? L(_(s)) : {}, N(e || !s || !s.__esModule ? h(r, "default", { value: s, enumerable: true }) : r, s)), k, x, u, J, P = function(s) {
  return s;
}, S = function() {
  throw new Error("Not implemented");
}, g, y, q, B, G, H, K, Q, U, V, X, Y, Z, $, I, O;
var init_path = __esm(() => {
  L = Object.create;
  h = Object.defineProperty;
  D = Object.getOwnPropertyDescriptor;
  T = Object.getOwnPropertyNames;
  _ = Object.getPrototypeOf;
  E = Object.prototype.hasOwnProperty;
  k = R((W, w) => {
    function v(s) {
      if (typeof s != "string")
        throw new TypeError("Path must be a string. Received " + JSON.stringify(s));
    }
    function C(s, e) {
      for (var r = "", t = 0, i = -1, a = 0, n, l = 0;l <= s.length; ++l) {
        if (l < s.length)
          n = s.charCodeAt(l);
        else {
          if (n === 47)
            break;
          n = 47;
        }
        if (n === 47) {
          if (!(i === l - 1 || a === 1))
            if (i !== l - 1 && a === 2) {
              if (r.length < 2 || t !== 2 || r.charCodeAt(r.length - 1) !== 46 || r.charCodeAt(r.length - 2) !== 46) {
                if (r.length > 2) {
                  var f = r.lastIndexOf("/");
                  if (f !== r.length - 1) {
                    f === -1 ? (r = "", t = 0) : (r = r.slice(0, f), t = r.length - 1 - r.lastIndexOf("/")), i = l, a = 0;
                    continue;
                  }
                } else if (r.length === 2 || r.length === 1) {
                  r = "", t = 0, i = l, a = 0;
                  continue;
                }
              }
              e && (r.length > 0 ? r += "/.." : r = "..", t = 2);
            } else
              r.length > 0 ? r += "/" + s.slice(i + 1, l) : r = s.slice(i + 1, l), t = l - i - 1;
          i = l, a = 0;
        } else
          n === 46 && a !== -1 ? ++a : a = -1;
      }
      return r;
    }
    function F(s, e) {
      var r = e.dir || e.root, t = e.base || (e.name || "") + (e.ext || "");
      return r ? r === e.root ? r + t : r + s + t : t;
    }
    var m = { resolve: function() {
      for (var e = "", r = false, t, i = arguments.length - 1;i >= -1 && !r; i--) {
        var a;
        i >= 0 ? a = arguments[i] : (t === undefined && (t = process.cwd()), a = t), v(a), a.length !== 0 && (e = a + "/" + e, r = a.charCodeAt(0) === 47);
      }
      return e = C(e, !r), r ? e.length > 0 ? "/" + e : "/" : e.length > 0 ? e : ".";
    }, normalize: function(e) {
      if (v(e), e.length === 0)
        return ".";
      var r = e.charCodeAt(0) === 47, t = e.charCodeAt(e.length - 1) === 47;
      return e = C(e, !r), e.length === 0 && !r && (e = "."), e.length > 0 && t && (e += "/"), r ? "/" + e : e;
    }, isAbsolute: function(e) {
      return v(e), e.length > 0 && e.charCodeAt(0) === 47;
    }, join: function() {
      if (arguments.length === 0)
        return ".";
      for (var e, r = 0;r < arguments.length; ++r) {
        var t = arguments[r];
        v(t), t.length > 0 && (e === undefined ? e = t : e += "/" + t);
      }
      return e === undefined ? "." : m.normalize(e);
    }, relative: function(e, r) {
      if (v(e), v(r), e === r || (e = m.resolve(e), r = m.resolve(r), e === r))
        return "";
      for (var t = 1;t < e.length && e.charCodeAt(t) === 47; ++t)
        ;
      for (var i = e.length, a = i - t, n = 1;n < r.length && r.charCodeAt(n) === 47; ++n)
        ;
      for (var l = r.length, f = l - n, c = a < f ? a : f, d = -1, o = 0;o <= c; ++o) {
        if (o === c) {
          if (f > c) {
            if (r.charCodeAt(n + o) === 47)
              return r.slice(n + o + 1);
            if (o === 0)
              return r.slice(n + o);
          } else
            a > c && (e.charCodeAt(t + o) === 47 ? d = o : o === 0 && (d = 0));
          break;
        }
        var A = e.charCodeAt(t + o), z = r.charCodeAt(n + o);
        if (A !== z)
          break;
        A === 47 && (d = o);
      }
      var b = "";
      for (o = t + d + 1;o <= i; ++o)
        (o === i || e.charCodeAt(o) === 47) && (b.length === 0 ? b += ".." : b += "/..");
      return b.length > 0 ? b + r.slice(n + d) : (n += d, r.charCodeAt(n) === 47 && ++n, r.slice(n));
    }, _makeLong: function(e) {
      return e;
    }, dirname: function(e) {
      if (v(e), e.length === 0)
        return ".";
      for (var r = e.charCodeAt(0), t = r === 47, i = -1, a = true, n = e.length - 1;n >= 1; --n)
        if (r = e.charCodeAt(n), r === 47) {
          if (!a) {
            i = n;
            break;
          }
        } else
          a = false;
      return i === -1 ? t ? "/" : "." : t && i === 1 ? "//" : e.slice(0, i);
    }, basename: function(e, r) {
      if (r !== undefined && typeof r != "string")
        throw new TypeError('"ext" argument must be a string');
      v(e);
      var t = 0, i = -1, a = true, n;
      if (r !== undefined && r.length > 0 && r.length <= e.length) {
        if (r.length === e.length && r === e)
          return "";
        var l = r.length - 1, f = -1;
        for (n = e.length - 1;n >= 0; --n) {
          var c = e.charCodeAt(n);
          if (c === 47) {
            if (!a) {
              t = n + 1;
              break;
            }
          } else
            f === -1 && (a = false, f = n + 1), l >= 0 && (c === r.charCodeAt(l) ? --l === -1 && (i = n) : (l = -1, i = f));
        }
        return t === i ? i = f : i === -1 && (i = e.length), e.slice(t, i);
      } else {
        for (n = e.length - 1;n >= 0; --n)
          if (e.charCodeAt(n) === 47) {
            if (!a) {
              t = n + 1;
              break;
            }
          } else
            i === -1 && (a = false, i = n + 1);
        return i === -1 ? "" : e.slice(t, i);
      }
    }, extname: function(e) {
      v(e);
      for (var r = -1, t = 0, i = -1, a = true, n = 0, l = e.length - 1;l >= 0; --l) {
        var f = e.charCodeAt(l);
        if (f === 47) {
          if (!a) {
            t = l + 1;
            break;
          }
          continue;
        }
        i === -1 && (a = false, i = l + 1), f === 46 ? r === -1 ? r = l : n !== 1 && (n = 1) : r !== -1 && (n = -1);
      }
      return r === -1 || i === -1 || n === 0 || n === 1 && r === i - 1 && r === t + 1 ? "" : e.slice(r, i);
    }, format: function(e) {
      if (e === null || typeof e != "object")
        throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof e);
      return F("/", e);
    }, parse: function(e) {
      v(e);
      var r = { root: "", dir: "", base: "", ext: "", name: "" };
      if (e.length === 0)
        return r;
      var t = e.charCodeAt(0), i = t === 47, a;
      i ? (r.root = "/", a = 1) : a = 0;
      for (var n = -1, l = 0, f = -1, c = true, d = e.length - 1, o = 0;d >= a; --d) {
        if (t = e.charCodeAt(d), t === 47) {
          if (!c) {
            l = d + 1;
            break;
          }
          continue;
        }
        f === -1 && (c = false, f = d + 1), t === 46 ? n === -1 ? n = d : o !== 1 && (o = 1) : n !== -1 && (o = -1);
      }
      return n === -1 || f === -1 || o === 0 || o === 1 && n === f - 1 && n === l + 1 ? f !== -1 && (l === 0 && i ? r.base = r.name = e.slice(1, f) : r.base = r.name = e.slice(l, f)) : (l === 0 && i ? (r.name = e.slice(1, n), r.base = e.slice(1, f)) : (r.name = e.slice(l, n), r.base = e.slice(l, f)), r.ext = e.slice(n, f)), l > 0 ? r.dir = e.slice(0, l - 1) : i && (r.dir = "/"), r;
    }, sep: "/", delimiter: ":", win32: null, posix: null };
    m.posix = m;
    w.exports = m;
  });
  x = j(k());
  u = x;
  J = x;
  u.parse ??= S;
  J.parse ??= S;
  g = { resolve: u.resolve.bind(u), normalize: u.normalize.bind(u), isAbsolute: u.isAbsolute.bind(u), join: u.join.bind(u), relative: u.relative.bind(u), toNamespacedPath: P, dirname: u.dirname.bind(u), basename: u.basename.bind(u), extname: u.extname.bind(u), format: u.format.bind(u), parse: u.parse.bind(u), sep: "/", delimiter: ":", win32: undefined, posix: undefined, _makeLong: P };
  y = { sep: "\\", delimiter: ";", win32: undefined, ...g, posix: g };
  g.win32 = y.win32 = y;
  g.posix = g;
  q = g;
  ({ resolve: B, normalize: G, isAbsolute: H, join: K, relative: Q, toNamespacedPath: U, dirname: V, basename: X, extname: Y, format: Z, parse: $, sep: I, delimiter: O } = g);
});

// node_modules/electron/index.js
var require_electron = __commonJS((exports, module) => {
  var __dirname = "C:\\Users\\Lenovo\\Documents\\ngoding\\daily-app\\node_modules\\electron";
  var fs = (() => ({}));
  var path = (init_path(), __toCommonJS(exports_path));
  var pathFile = path.join(__dirname, "path.txt");
  function getElectronPath() {
    let executablePath;
    if (fs.existsSync(pathFile)) {
      executablePath = fs.readFileSync(pathFile, "utf-8");
    }
    if (process.env.ELECTRON_OVERRIDE_DIST_PATH) {
      return path.join(process.env.ELECTRON_OVERRIDE_DIST_PATH, executablePath || "electron");
    }
    if (executablePath) {
      return path.join(__dirname, "dist", executablePath);
    } else {
      throw new Error("Electron failed to install correctly, please delete node_modules/electron and try installing again");
    }
  }
  module.exports = getElectronPath();
});

// src/main.js
var import_electron = __toESM(require_electron(), 1);
init_path();
var __dirname = "C:\\Users\\Lenovo\\Documents\\ngoding\\daily-app\\src";
function createWindow() {
  const win = new import_electron.BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: q.join(__dirname, "preload.js")
    }
  });
  win.loadURL("http://localhost:3000");
}
import_electron.app.whenReady().then(() => {
  createWindow();
  import_electron.app.on("activate", () => {
    if (import_electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
import_electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin")
    import_electron.app.quit();
});
