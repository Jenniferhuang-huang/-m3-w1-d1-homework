var http = require("http");
var path = require("path");
var fs = require("fs");
const { resolve } = require("dns/promises");

var hostname = "localhost";
var port = 5000;

var server = http.createServer((req, res) => {
  if (req.method === "GET") {
    var fileUrl = req.url;
    if (fileUrl === "/") {
      fileUrl = "/index.html";
    } else if (fileUrl === "/about") {
      fileUrl = "/about.html";
    } else if (fileUrl === "/contact") {
      fileUrl = "/contact.html";
    }
  }
  var filePath = path.resolve('.'+fileUrl);
  var fileExt = path.extname(filePath);

  if (fileExt === ".html") {
    fs.access(filePath, function (err) {
      if (err) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end(
          `<html><body><h1>Error 404: ${fileUrl} not found<h1><body><html>`
        );
        return;
      }
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      fs.createReadStream(filePath).pipe(res);
    });
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    fs.end(
      `<html><body><h1>Error 404: ${fileUrl} is not a HTML filed</h1></body></html>`
    );
  }
});

server.listen(port, hostname, () => {
  console.log(`The NodeJS server on port 5000 is now running......`);
});