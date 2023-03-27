# 大陆请求 openai api 的简单 demo

原理如下：

1. 使用 `express` 启动代理服务，链接到本机的 `vpn`。
2. 使用 `vite` 启动前端项目，`proxy` 到 `express` 服务。

## 使用

修改 `constants.js` 中的相关配置

```bash
# 1. 安装依赖
pnpm install

# 2. 启动代理服务
pnpm start:server

# 3. 启动前端项目
pnpm dev
```
