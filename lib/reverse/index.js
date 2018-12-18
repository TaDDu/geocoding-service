var express = require("express");
var app = express();
var routes = require("./routes.js");

app.use("/reverse", routes);

module.exports = app;
