const express = require("express");
const path = require("path");
const port = process.env.PORT || 3000;

const PORT = 3000;
var app = express();

const directorio_publico = path.join(__dirname, "../public");

app.use(express.static(directorio_publico));

app.listen(port, () => {
  console.log(">> inicio servidor express port:" + port);
});

module.exports = { app, path };
