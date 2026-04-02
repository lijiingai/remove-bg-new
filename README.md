# Cloudflare Pages 项目

## 部署步骤

1. 登录 Cloudflare Dashboard → Pages
2. 创建新项目，连接 GitHub 仓库 `lijiingai/remove-bg-new`
3. 构建设置：
   - 构建命令：留空（不需要构建）
   - 输出目录：`public`
4. 在环境变量中添加：`REMOVEBG_API_KEY = dzkktUBoa8v3K1h56BJaj1rU`
5. 部署

## 文件结构

```
├── functions/           # Cloudflare Functions
│   └── api/
│       └── remove-bg.js   # 抠图 API
├── public/              # 静态文件
│   └── index.html       # 前端页面
├── wrangler.toml        # Cloudflare 配置
└── package.json
```

## 本地测试

```bash
npm install -g wrangler
wrangler pages dev .
```

访问 http://localhost:8788
