"use strict";

var path = require("path");
var fs = require("fs");

var SCRIPT_PATH = path.join(__dirname, "..", "script.js");

function clickToSourcePlugin() {
  var scriptBody = null;
  return {
    name: "click-to-source",
    apply: "serve",
    transformIndexHtml: {
      order: "pre",
      handler: function (html, ctx) {
        var root = process.cwd();
        if (ctx && ctx.server && ctx.server.config && ctx.server.config.root) {
          root = path.resolve(ctx.server.config.root);
        }
        if (!scriptBody) {
          scriptBody = fs.readFileSync(SCRIPT_PATH, "utf8");
        }
        var inject = "<script>window.__CLICK_TO_SOURCE__={projectRoot:" + JSON.stringify(root) + "};</script>\n<script>" + scriptBody + "</script>";
        return html.replace("</body>", inject + "\n</body>");
      },
    },
  };
}

module.exports = clickToSourcePlugin;
module.exports.default = clickToSourcePlugin;
module.exports.clickToSourcePlugin = clickToSourcePlugin;
