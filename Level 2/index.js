import http from "http";

const server = http.createServer((req, res) => {
  res.write("Hello World from HTTP server");
  res.end();
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

// To run this file use the command: node index.js
