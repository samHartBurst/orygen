const { createServer } = require('http');
const next = require('next');

const port = 443;
const dev = 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on <http://localhost>:${port}`);
  });
});
