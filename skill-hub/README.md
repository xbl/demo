# SkillHub - AI Agent Skills Marketplace

仿照 [腾讯SkillHub](https://skillhub.tencent.com) 设计的 AI Agent Skills 交易平台。

## 技术栈

### 前端
- Vue 3 + TypeScript
- Vite (构建工具)
- Pinia (状态管理)
- Vue Router

### 后端
- Express + TypeScript
- Node.js 原生 HTTP 服务器

## 项目结构

```
skill-hub/
├── client/                 # 前端项目
│   ├── src/
│   │   ├── api/           # API 请求
│   │   ├── assets/        # 静态资源
│   │   ├── components/    # Vue 组件
│   │   ├── router/        # 路由配置
│   │   ├── types/         # TypeScript 类型
│   │   └── views/         # 页面视图
│   └── package.json
│
├── server/                 # 后端项目
│   ├── src/
│   │   ├── routes/        # 路由
│   │   ├── services/     # 业务逻辑
│   │   └── types/        # 类型定义
│   └── package.json
│
└── package.json           # 工作空间根配置
```

## 快速开始

### 安装依赖

```bash
cd skill-hub
npm install
```

### 启动开发模式

```bash
npm run dev
```

- 前端: http://localhost:3000
- 后端: http://localhost:4000

### 构建生产版本

```bash
npm run build
```

## API 接口

### Skills

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/skills/featured | 获取精选 Skills |
| GET | /api/skills | 获取 Skills 列表（支持分页） |
| GET | /api/skills/:id | 获取 Skill 详情 |

### Categories

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/categories | 获取所有分类 |
| GET | /api/categories/:id | 获取分类详情 |

## 参考

- [spec-kit](https://github.com/github/spec-kit) - GitHub Spec-Driven Development
- [腾讯SkillHub](https://skillhub.tencent.com) - 腾讯 Skills 市场

## License

MIT
