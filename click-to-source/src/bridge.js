#!/usr/bin/env node
"use strict";

var http = require("http");
var path = require("path");
var fs = require("fs");

var PORT = parseInt(process.env.CLICK_TO_SOURCE_PORT || "9473", 10);
var ROOT = path.resolve(process.cwd());
var SCRIPT_PATH = path.join(__dirname, "script.js");
var scriptBody = "";

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function serveScript(req, res) {
  cors(res);
  res.setHeader("Content-Type", "application/javascript; charset=utf-8");
  res.end(scriptBody);
}

function serveConfig(req, res) {
  cors(res);
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ projectRoot: ROOT }));
}

var server = http.createServer(function (req, res) {
  if (req.method === "OPTIONS") {
    cors(res);
    res.writeHead(204);
    res.end();
    return;
  }
  var u = req.url.split("?")[0];
  if (u === "/script.js") return serveScript(req, res);
  if (u === "/config") return serveConfig(req, res);
  res.writeHead(404);
  res.end("Not found");
});

fs.readFile(SCRIPT_PATH, "utf8", function (err, data) {
  if (err) {
    console.error("click-to-source: Could not read script.js:", err.message);
    process.exit(1);
  }
  scriptBody = data;
  server.listen(PORT, "127.0.0.1", function () {
    console.log("click-to-source bridge running at http://localhost:" + PORT);
    console.log("  /script.js - universal browser script");
    console.log("  /config    - project root (CORS enabled)");
    console.log("");
    console.log("Add to your HTML: <script src=\"http://localhost:" + PORT + "/script.js\" data-bridge=\"http://localhost:" + PORT + "\"></script>");
  });
});
