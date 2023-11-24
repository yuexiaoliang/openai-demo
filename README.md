# 对接 OpenAI API 的示例

## 已实现

- [x] 对话（Chat）
- [x] 带视觉识别的对话（Chat Vision）
- [x] 文字转音频（Create speech）
- [x] 图像生成（Create image）
- [x] 图像编辑（Create image edit）
- [x] 图像变体（Create image variation）

## 有梯子的使用方式

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

## 有代理地址的使用方式

1. 创建 `API_KEY` 文件，将 `openai` 的 `api key` 写入
2. 创建 `TARGET_URL` 文件，将自建的 `openai` 代理地址写入

```bash
# 1. 安装依赖
pnpm install

# 2. 启动代理服务
pnpm start:server

# 3. 启动前端项目
pnpm dev
```
