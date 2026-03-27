# SkillHub 迭代规划 (最终版)

## 迭代原则
- 小步提交，每次只改一小部分
- 每个提交可独立验证
- 前后端并行开发

---

## Iteration 1: 基础骨架 ✅
- [x] 01 - 初始化 monorepo 结构
- [x] 02 - 配置前端 (Vue + Vite + TS)
- [x] 03 - 配置后端 (Express + TS)
- [x] 04 - 添加基础依赖

---

## Iteration 2: API 规范 ✅
- [x] 01 - 定义 OpenAPI 3.0 规范
- [x] 02 - 实现 Mock 数据服务
- [x] 03 - 完善 API 路由

---

## Iteration 3: 核心页面 ✅
- [x] 01 - 首页 + 精选 Skills
- [x] 02 - 技能详情页
- [x] 03 - 分类页面
- [x] 04 - 搜索页面
- [x] 05 - 导航与路由优化

---

## Iteration 4: 数据持久化 ✅
- [x] 01 - 添加 Prisma 依赖
- [x] 02 - 定义 Prisma Schema
- [x] 03 - 创建数据库迁移
- [x] 04 - 实现 Skills CRUD
- [x] 05 - 实现 Categories CRUD

---

## Iteration 5: Skill 发布 ✅
- [x] 01 - 后端：添加 multer 文件上传
- [x] 02 - 前端：创建 Skill 发布页面
- [x] 03 - 前端：创建技能管理页面
- [x] 04 - 前端：集成发布功能

---

## Iteration 6: 社交功能 🔄
**目标**: 匿名社交互动（无需用户系统）

### 提交计划
- [ ] 01 - 后端：点赞/收藏/评论 API
- [ ] 02 - 前端：详情页点赞/收藏按钮
- [ ] 03 - 前端：评论列表与表单
- [ ] 04 - 前端：我的收藏页面

---

## Iteration 7: 搜索增强 ⏳
- [ ] 高级搜索 API
- [ ] 标签系统优化
- [ ] 推荐算法

---

## Iteration 8: 部署上线 ⏳
- [ ] Docker 配置
- [ ] CI/CD 流水线
- [ ] 性能优化

---

## 技术栈汇总

### 前端
- Vue 3 + TypeScript
- Vite
- Pinia (状态管理)
- Vue Router

### 后端
- Express + TypeScript
- Prisma (ORM)
- SQLite (开发) / PostgreSQL (生产)
- Multer (文件上传)

### 社交功能设计（无用户系统）
- **点赞**: 内存 Set 存储 IP/Session，防止重复
- **收藏**: localStorage 存储 skill IDs
- **评论**: 匿名显示，仅存储内容
