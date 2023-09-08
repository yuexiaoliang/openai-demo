const path = require('path');
const express = require('express');

const { createProxyMiddleware } = require('http-proxy-middleware');

const { createLogger, transports, format } = require('winston');

// 创建一个日志记录器
const logger = createLogger({
  level: 'info', // 日志级别，可以是 'info', 'error', 'warn', 'debug', 等
  format: format.combine(
    format.timestamp(), // 添加时间戳
    format.json() // 使用 JSON 格式化日志
  ),
  transports: [
    new transports.Console(), // 输出到控制台
    new transports.File({ filename: 'error.log', level: 'error' }), // 输出错误级别的日志到文件
    new transports.File({ filename: 'combined.log' }) // 输出所有级别的日志到文件
  ]
});

const PORT = 3870;
const app = express();

app.use(
  '/',
  createProxyMiddleware({
    target: 'https://api.openai.com',
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      if (req.method !== 'OPTIONS') {
        const { rawHeaders, originalUrl } = req;
        logger.info({ rawHeaders, originalUrl });
      }
    },
    onProxyRes: (proxyRes, req, res) => {
      proxyRes.headers['Access-Control-Allow-Origin'] = '*';
      proxyRes.headers['Access-Control-Allow-Headers'] = 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With';
    }
  })
);

app
  .listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  })
  .on('error', (err) => {
    logger.error(err.toString());
  });
