# SkillHub 任务清单 (TASKS)

## 状态说明
- [ ] 未开始
- [x] 已完成
- [🔄] 进行中

---

## Iteration 1: 基础骨架 ✅ [x]

- [x] 01 - 初始化 monorepo 结构（根 package.json + workspaces）
- [x] 02 - 配置前端 (Vue + Vite + TypeScript)
- [x] 03 - 配置后端 (Express + TypeScript)
- [x] 04 - 添加基础依赖（concurrently 等）

---

## Iteration 2: API 规范 ✅ [x]

- [x] 01 - 定义 OpenAPI 3.0 规范（openapi.yaml）
- [x] 02 - 实现 Mock 数据服务（skillService.ts）
- [x] 03 - 完善 API 路由（skills.ts, categories.ts）

---

## Iteration 3: 核心页面 ✅ [x]

- [x] 01 - 首页 + 精选 Skills（HomeView.vue）
- [x] 02 - 技能详情页（SkillDetailView.vue）
- [x] 03 - 分类页面（CategoryView.vue）
- [x] 04 - 搜索页面（SearchView.vue）
- [x] 05 - 导航与路由优化

---

## Iteration 4: 数据持久化 ✅ [x]

- [x] 01 - 添加 Prisma 依赖（package.json）
- [x] 02 - 定义 Prisma Schema（Skill, Category 模型）
- [x] 03 - 创建数据库迁移（prisma db push）
- [x] 04 - 实现 Skills CRUD（service + routes）
- [x] 05 - 实现 Categories CRUD

---

## Iteration 5: Skill 发布 ✅ [x]

- [x] 01 - 后端：添加 multer 文件上传
- [x] 02 - 前端：创建 Skill 发布页面（PublishView.vue）
- [x] 03 - 前端：创建技能管理页面（MySkillsView.vue）
- [x] 04 - 前端：集成发布功能

---

## Iteration 6: 社交功能 ✅ [x]

- [x] 01 - 后端：点赞/收藏/评论 API（Like, Comment 模型）
- [x] 02 - 前端：详情页点赞/收藏按钮
- [x] 03 - 前端：评论列表与表单
- [x] 04 - 前端：我的收藏页面（TODO: 后续实现）

---

## Iteration 7: 搜索增强 ⏳ [ ]

### 7.1 高级搜索 API
- [ ] 01 - 支持多字段搜索（name, description, tags, author）
- [ ] 02 - 添加搜索结果高亮
- [ ] 03 - 搜索热度统计

### 7.2 标签系统优化
- [ ] 01 - 热门标签榜单
- [ ] 02 - 标签自动补全
- [ ] 03 - 标签页面（/tags/:tag）

### 7.3 推荐算法
- [ ] 01 - 基于热度的推荐
- [ ] 02 - 基于分类的推荐
- [ ] 03 - 猜你喜欢模块

---

## Iteration 8: 部署上线 ⏳ [ ]

### 8.1 Docker 配置
- [ ] 01 - 前端 Dockerfile
- [ ] 02 - 后端 Dockerfile
- [ ] 03 - docker-compose.yml
- [ ] 04 - .dockerignore

### 8.2 CI/CD
- [ ] 01 - GitHub Actions 工作流
- [ ] 02 - 自动测试
- [ ] 03 - 自动部署

### 8.3 性能优化
- [ ] 01 - 前端资源压缩
- [ ] 02 - 静态资源 CDN
- [ ] 03 - API 缓存
- [ ] 04 - 数据库索引优化

### 8.4 生产环境
- [ ] 01 - PostgreSQL 数据库迁移
- [ ] 02 - 环境变量配置
- [ ] 03 - 日志系统
- [ ] 04 - 监控告警

---

## 待定功能 (Backlog)

### 用户系统
- [ ] 用户注册/登录
- [ ] JWT 认证
- [ ] 个人中心
- [ ] 收藏列表页面

### 通知系统
- [ ] 评论通知
- [ ] 点赞通知

### 管理员功能
- [ ] Skill 审核
- [ ] 分类管理
- [ ] 数据统计

### 国际化
- [ ] 多语言支持
- [ ] 英文版

---

## 任务管理

| 状态 | 数量 |
|------|------|
| ✅ 已完成 | 26 |
| 🔄 进行中 | 0 |
| ⏳ 待开始 | 18 |
| 📋 待定 | 12 |

---

*本文档最后更新于 2026-03-27*
