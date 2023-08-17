const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: "http://223.130.136.182/:8080",
      changeOrigin: true,
    })
  );
};