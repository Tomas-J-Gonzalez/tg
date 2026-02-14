/**
 * Universal Click-to-Source for Cursor IDE
 * Ctrl+Alt+Click (Win/Linux) or Cmd+Alt+Click (Mac) to open source file
 * Dev-only: runs only on localhost
 */
(function () {
  "use strict";

  if (location.hostname !== "localhost" && location.hostname !== "127.0.0.1") {
    return;
  }

  var SCHEME = "vscode";
  var BRIDGE_PORT = 9473;
  var config = window.__CLICK_TO_SOURCE__ || null;
  var DEBUG = location.search.indexOf("cts-debug=1") >= 0;

  function getBridgeUrl() {
    var script = document.currentScript || document.querySelector("script[src*='script.js'][src*='9473']") || document.querySelector("script[data-bridge]");
    if (script && script.getAttribute("data-bridge")) {
      return script.getAttribute("data-bridge").replace(/\/$/, "");
    }
    var src = script ? script.src : "";
    var match = src && src.match(/^(https?:\/\/[^/]+)/);
    if (match) return match[1];
    return "http://localhost:" + BRIDGE_PORT;
  }

  function fetchConfig(cb) {
    if (config && config.projectRoot) {
      cb(config);
      return;
    }
    var bridgeUrl = getBridgeUrl();
    fetch(bridgeUrl + "/config")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        config = data;
        cb(config);
      })
      .catch(function () { cb(null); });
  }

  function resolveSource(el) {
    var file, line = 1;

    while (el && el !== document.body) {
      if (el.getAttribute && el.nodeType === 1) {
        var df = el.getAttribute("data-file");
        if (df) {
          var parts = df.split(":");
          file = parts[0];
          if (parts[1]) line = parseInt(parts[1], 10) || 1;
          return { file: file, line: line };
        }
        var ds = el.getAttribute("data-source");
        if (ds) {
          parts = ds.split(":");
          file = parts[0];
          if (parts[1]) line = parseInt(parts[1], 10) || 1;
          return { file: file, line: line };
        }
        var dsl = el.getAttribute("data-source-loc");
        if (dsl) {
          parts = dsl.split(":");
          file = parts[0];
          if (parts[1]) line = parseInt(parts[1], 10) || 1;
          return { file: file, line: line };
        }
        var dl = el.getAttribute("data-line");
        if (dl) line = parseInt(dl, 10) || 1;

        var fiberKey = Object.keys(el).filter(function (k) { return k.indexOf("__reactFiber$") === 0; })[0];
        if (fiberKey) {
          var fiber = el[fiberKey];
          var f = fiber;
          while (f) {
            var et = f.elementType || f.type;
            if (et && et.__source) {
              file = et.__source.fileName;
              line = et.__source.lineNumber || 1;
              if (file) return { file: file, line: line };
            }
            f = f.return;
          }
        }

        var vue = el.__vue__ || el.__vueParentComponent;
        if (vue) {
          var vtype = vue.type || vue;
          if (vtype && (vtype.__file || (vtype.__vnode && vtype.__vnode.component && vtype.__vnode.component.type && vtype.__vnode.component.type.__file))) {
            file = vtype.__file || (vtype.__vnode && vtype.__vnode.component && vtype.__vnode.component.type && vtype.__vnode.component.type.__file);
            line = (vtype.__line || vtype.__lineNumber) || 1;
            if (file) return { file: file, line: line };
          }
        }

        var prev = el.previousSibling;
        while (prev) {
          if (prev.nodeType === 8) {
            var text = prev.textContent || "";
            var m = text.match(/@source\s+([^\s:]+)(?::(\d+))?/);
            if (m) {
              file = m[1];
              if (m[2]) line = parseInt(m[2], 10) || 1;
              return { file: file, line: line };
            }
            m = text.match(/file:\s*([^\s]+)\s+line:\s*(\d+)/i);
            if (m) {
              file = m[1];
              line = parseInt(m[2], 10) || 1;
              return { file: file, line: line };
            }
          }
          prev = prev.previousSibling;
        }

        var parent = el.parentElement;
        if (parent) {
          var child = parent.firstChild;
          var idx = 0;
          while (child) {
            if (child === el) break;
            if (child.nodeType === 1 && child.tagName === el.tagName) idx++;
            child = child.nextSibling;
          }
          if (idx > 0 && !file) {
            line = idx + 1;
          }
        }
      }
      el = el.parentElement;
    }
    return null;
  }

  function toAbsolutePath(relativePath, projectRoot) {
    var sep = projectRoot.indexOf("\\") >= 0 ? "\\" : "/";
    var r = relativePath.replace(/\\/g, "/").replace(/^\//, "");
    var root = projectRoot.replace(/\\/g, "/").replace(/\/$/, "");
    return root + "/" + r;
  }

  function buildUri(absolutePath, line) {
    var path = absolutePath.replace(/\\/g, "/");
    return SCHEME + "://file/" + path + ":" + (line || 1) + ":1";
  }

  function openInEditor(file, line) {
    fetchConfig(function (cfg) {
      if (!cfg || !cfg.projectRoot) {
        console.warn("[click-to-source] No project root. Is the bridge running? Run from project root: node click-to-source/src/bridge.js");
        return;
      }
      var abs = toAbsolutePath(file, cfg.projectRoot);
      var uri = buildUri(abs, line);
      if (DEBUG) console.log("[click-to-source] Opening:", uri);
      var a = document.createElement("a");
      a.href = uri;
      a.style.display = "none";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    });
  }

  function onClick(e) {
    var mod = (e.ctrlKey || e.metaKey) && e.altKey;
    if (!mod) return;
    e.preventDefault();
    e.stopPropagation();
    var src = resolveSource(e.target);
    if (src && src.file) {
      openInEditor(src.file, src.line);
    } else if (DEBUG) {
      console.log("[click-to-source] No source found for:", e.target);
    }
  }

  document.addEventListener("click", onClick, true);
})();
