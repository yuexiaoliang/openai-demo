export const OPENAI_CONFIG = {
  // openai 的 api_key
  // 生成地址：https://platform.openai.com/account/api-keys
  api_key: '',

  // openai api 的 host，不用修改
  host: 'https://api.openai.com',

  // 所有 openai api 的前缀，只有以此开头的请求才会被代理
  base: '/openai'
};


// vpn 相关配置
export const AGENT_CONFIG = {
  // SOCKS 主机名
  host: '127.0.0.1',

  // SOCKS 端口
  port: 10808
};

// 代理服务器端口
export const SERVER_PORT = 8190;
