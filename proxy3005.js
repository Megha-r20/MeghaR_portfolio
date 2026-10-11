const http = require('http');

const server = http.createServer((req, res) => {
  const options = {
    hostname: '127.0.0.1',
    port: 3000,
    path: req.url,
    method: req.method,
    headers: { ...req.headers, host: '127.0.0.1:3000' }
  };

  const proxyReq = http.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });

  proxyReq.on('error', (err) => {
    res.writeHead(502);
    res.end('Bad Gateway: ' + err.message);
  });

  req.pipe(proxyReq, { end: true });
});

server.listen(3005, () => {
  console.log('Proxy listening on http://127.0.0.1:3005 -> http://127.0.0.1:3000');
});
