const server = require('../server.js');

module.exports = (req, res) => {
  const originalUrl = req.headers['x-matched-path'] || req.headers['x-vercel-matched-path'] || req.url;
  if (originalUrl) {
    req.url = originalUrl;
  }
  server.emit('request', req, res);
};

