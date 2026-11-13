const server = require('../server.js');

module.exports = (req, res) => {
  if (!req.url.includes('?')) {
    const originalUrl = req.headers['x-matched-path'] || req.headers['x-vercel-matched-path'];
    if (originalUrl && originalUrl !== '/api' && !originalUrl.includes('[')) {
      req.url = originalUrl;
    }
  }
  server.emit('request', req, res);
};
