"use strict";

var path = require("path");
var fs = require("fs");

var SCRIPT_PATH = path.join(__dirname, "..", "script.js");
var scriptBody = null;

function getScript() {
  if (!scriptBody) {
    scriptBody = fs.readFileSync(SCRIPT_PATH, "utf8");
  }
  return scriptBody;
}

function clickToSourceMiddleware(opts) {
  opts = opts || {};
  var projectRoot = path.resolve(opts.projectRoot || process.cwd());
  var script = getScript();
  var inject =
    "<script>window.__CLICK_TO_SOURCE__={projectRoot:" +
    JSON.stringify(projectRoot) +
    "};</script>\n<script>" +
    script +
    "</script>";

  return function (req, res, next) {
    var chunks = [];
    var originalWrite = res.write.bind(res);
    var originalEnd = res.end.bind(res);

    res.write = function (chunk, encoding, cb) {
      if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding || "utf8"));
      if (typeof encoding === "function") (cb = encoding), (encoding = undefined);
      if (cb) cb();
      return true;
    };

    res.end = function (chunk, encoding, cb) {
      if (chunk) chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk, encoding || "utf8"));
      var body = Buffer.concat(chunks).toString("utf8");
      var ct = (res.getHeader && res.getHeader("Content-Type")) || "";
      if (typeof ct === "string" && ct.indexOf("text/html") >= 0 && body.indexOf("</body>") >= 0) {
        body = body.replace("</body>", inject + "\n</body>");
        if (res.removeHeader) res.removeHeader("Content-Length");
      }
      return originalEnd(body, encoding, cb);
    };

    next();
  };
}

module.exports = clickToSourceMiddleware;
