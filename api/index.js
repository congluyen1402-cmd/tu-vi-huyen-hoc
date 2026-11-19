const server = require('../server.js');

module.exports = (req, res) => {
  const originalUrl = req.headers['x-matched-path'] || req.headers['x-vercel-matched-path'];
  if (originalUrl && originalUrl !== '/api' && !originalUrl.includes('[')) {
    const queryIdx = req.url.indexOf('?');
    const queryStr = queryIdx !== -1 ? req.url.slice(queryIdx) : '';
    req.url = originalUrl + queryStr;
  }
  server.emit('request', req, res);
};
