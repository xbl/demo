# SkillHub 迭代规划 (修订版)

## 迭代原则
- 小步提交，每次只改一小部分
- 每个提交可独立验证
- 前后端并行开发

---

## Iteration 1: 基础骨架 ✅
**目标**: 项目初始化，目录结构搭建

### 提交列表
- [x] 01 - 初始化 monorepo 结构
- [x] 02 - 配置前端 (Vue + Vite + TS)
- [x] 03 - 配置后端 (Express + TS)
- [x] 04 - 添加基础依赖

---

## Iteration 2: API 规范 ✅
**目标**: 定义 OpenAPI 规范，使用 Mock 数据

### 提交列表
- [x] 01 - 定义 OpenAPI 3.0 规范
- [x] 02 - 实现 Mock 数据服务
- [x] 03 - 完善 API 路由

---

## Iteration 3: 核心页面 ✅
**目标**: 完成所有核心页面

### 提交列表
- [x] 01 - 首页 + 精选 Skills
- [x] 02 - 技能详情页
- [x] 03 - 分类页面
- [x] 04 - 搜索页面
- [x] 05 - 导航与路由优化

---

## Iteration 4: 数据持久化 🔄
**目标**: 集成 SQLite 数据库，完成 CRUD

### 里程碑
1. 配置 Prisma + SQLite
2. 创建数据库表结构
3. 实现 Skills CRUD 接口
4. 实现 Categories CRUD 接口

### 提交计划
- [ ] 01 - 添加 Prisma 依赖
- [ ] 02 - 定义 Prisma Schema
- [ ] 03 - 创建数据库迁移
- [ ] 04 - 实现 Skills CRUD
- [ ] 05 - 实现 Categories CRUD

---

## Iteration 5: Skill 发布 ⏳
**目标**: 完整的 Skill 发布流程

### 里程碑
1. Skill 发布表单
2. 文件上传功能
3. Skill 管理（编辑/删除）
4. 我的 Skills 页面

---

## Iteration 6: 社交功能 ⏳
**目标**: 用户互动功能

### 里程碑
1. 收藏 Skills
2. 点赞功能
3. 评论系统

---

## Iteration 7: 搜索增强 ⏳
**目标**: 强大的搜索和推荐

### 里程碑
1. 高级搜索 API
2. 标签系统
3. 推荐算法

---

## Iteration 8: 部署上线 ⏳
**目标**: 生产环境部署

### 里程碑
1. Docker 配置
2. CI/CD 流水线
3. 性能优化

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
- 无需认证（简化版）

### 部署
- Docker
- GitHub Actions
