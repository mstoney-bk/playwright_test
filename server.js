// Minimal static server for the demo app (no dependencies)
const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

http.createServer((req, res) => {
  const file = path.join(__dirname, 'app', 'index.html');
  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error');
    }
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(data);
  });
}).listen(port, () => console.log(`Demo app on http://localhost:${port}`));
