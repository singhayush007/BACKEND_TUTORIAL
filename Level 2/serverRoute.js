import http from "http";

const Port = 5000;
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello from the Home Page");
    res.end();
  } else if (req.url === "/about") {
    res.write("Hello from the About Page");
    res.end();
  } else if (req.url === "/contact") {
    res.write("Hello from the Contact Page");
    res.end();
  } else {
    res.write("404 Page Not Found");
    res.end();
  }
});

server.listen(Port, () => {
  console.log(`Server is listening on port ${Port}`);
});

// To run this file use the command: node serverRoute.js
