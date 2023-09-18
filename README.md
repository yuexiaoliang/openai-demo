# 对接 OpenAI API 的示例

原理如下：

1. 使用 `express` 启动代理服务，链接到本机的 `vpn`。
2. 使用 `vite` 启动前端项目，`proxy` 到 `express` 服务。

## 已实现

- [x] ChatGPT 聊天
- [x] 图像生成
- [x] 模型微调

## 使用

1. 修改 `constants.js` 中的相关配置
2. 创建 `API_KEY` 文件，将 `openai` 的 `api key` 写入

```bash
# 1. 安装依赖
pnpm install

# 2. 启动代理服务
pnpm start:server

# 3. 启动前端项目
pnpm dev
```
