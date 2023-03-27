import express from 'express';

import { SocksProxyAgent } from 'socks-proxy-agent';
import { createProxyMiddleware as _createProxyMiddleware } from 'http-proxy-middleware';

import { AGENT_CONFIG, SERVER_PORT, OPENAI_CONFIG } from './constants.js';

createServer();

function createServer() {
  // 创建Express应用程序
  const app = express();

  // 将所有请求转发到代理服务器
  app.use('/', createProxyMiddleware());

  // 启动HTTP服务器
  app.listen(SERVER_PORT, () => {
    console.log(`HTTP server running at 127.0.0.1:${SERVER_PORT}`);
  });
}

function createProxyMiddleware() {
  // 设置 SOCKS 代理服务器
  const agent = new SocksProxyAgent(`socks://${AGENT_CONFIG.host}:${AGENT_CONFIG.port}`);

  // 创建代理中间件，将请求转发到目标主机
  const proxyMiddleware = _createProxyMiddleware((pathname) => pathname.startsWith(OPENAI_CONFIG.base), {
    target: `${OPENAI_CONFIG.host}`,
    changeOrigin: true,
    agent,
    headers: {
      Authorization: `Bearer ${OPENAI_CONFIG.api_key}`
    },
    pathRewrite: (path) => {
      const reg = new RegExp(`^${OPENAI_CONFIG.base}`);
      return path.replace(reg, '');
    }
  });

  return proxyMiddleware;
}
