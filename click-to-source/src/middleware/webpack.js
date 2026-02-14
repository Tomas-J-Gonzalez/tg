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

function ClickToSourceWebpackPlugin(opts) {
  opts = opts || {};
  this.projectRoot = path.resolve(opts.projectRoot || process.cwd());
}

ClickToSourceWebpackPlugin.prototype.apply = function (compiler) {
  var self = this;
  if (compiler.options.mode === "production") return;

  compiler.hooks.compilation.tap("ClickToSourceWebpackPlugin", function (compilation) {
    compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing &&
      compilation.hooks.htmlWebpackPluginBeforeHtmlProcessing.tapAsync(
        "ClickToSourceWebpackPlugin",
        function (data, cb) {
          var script = getScript();
          var inject =
            "<script>window.__CLICK_TO_SOURCE__={projectRoot:" +
            JSON.stringify(self.projectRoot) +
            "};</script>\n<script>" +
            script +
            "</script>";
          data.html = data.html.replace("</body>", inject + "\n</body>");
          cb(null, data);
        }
      );
  });

  compiler.hooks.compilation.tap("ClickToSourceWebpackPlugin", function (compilation) {
    compilation.hooks.htmlWebpackPluginAlterAssetTags &&
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
        "ClickToSourceWebpackPlugin",
        function (data, cb) {
          var script = getScript();
          var inject = {
            tagName: "script",
            closeTag: true,
            innerHTML:
              "window.__CLICK_TO_SOURCE__={projectRoot:" +
              JSON.stringify(self.projectRoot) +
              "};" +
              script,
          };
          data.head = data.head || [];
          data.body = data.body || [];
          data.body.push(inject);
          cb(null, data);
        }
      );
  });
};

module.exports = ClickToSourceWebpackPlugin;
