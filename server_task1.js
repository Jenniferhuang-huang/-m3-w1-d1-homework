var http = require("http");

const { resolve } = require("dns/promises");

var hostname = "localhost";
var port = 5000;

var server = http.createServer((req, res) => {
  if (req.method === "GET") {
    var fileUrl = req.url;
    if (fileUrl === "/") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(`<html><body><h1>Home page<h1><body><html>`);
      return;
    } else if (fileUrl === "/about") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(`<html><body><h1>About Page<h1><body><html>`);
      return;
    } else if (fileUrl === "/contact") {
      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(`<html><body><h1>Contact page<h1><body><html>`);
      return;
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/html");
    fs.end(`<html><body><h1>Invalid Request!</h1></body></html>`);
  }
});
server.listen(port, hostname, () => {
  console.log(`The NodeJS server on port 5000 is now running......`);
});