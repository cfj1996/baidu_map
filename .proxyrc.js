module.exports = function (app) {
  const dotenv = require("dotenv");
  const { createProxyMiddleware } = require("http-proxy-middleware");
  dotenv.config();
  app.use(
    createProxyMiddleware(["**", "!/*.*", "!/"], {
      target: process.env.SERVER_URL || "http://127.0.0.1:8080/",
      ws: true,
      changeOrigin: true,
    }),
  );
};
