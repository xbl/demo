# SkillHub 产品需求文档 (SPEC)

## 1. 产品概述

### 1.1 产品定位
**SkillHub** 是一个 AI Agent Skills 市场平台，旨在帮助用户发现、分享和使用各类 AI 助手技能（Skills）。

### 1.2 目标用户
- AI 助手用户：寻找并使用各种 Skills 来增强 AI 能力
- 开发者：开发和分享自己的 Skills
- 企业团队：管理和分发内部 Skills

### 1.3 核心价值
- **发现**：通过分类、搜索、推荐找到合适的 Skills
- **使用**：一键集成 Skills 到自己的 AI 助手
- **分享**：发布自己的 Skills 到市场

---

## 2. 功能需求

### 2.1 首页
- [x] 展示精选 Skills（Featured）
- [x] 分类快捷入口
- [x] 搜索功能

### 2.2 Skills 列表
- [x] 分类筛选
- [x] 关键词搜索
- [x] 排序（最新、最热、最多星）
- [x] 分页加载

### 2.3 Skills 详情
- [x] 基本信息展示（名称、作者、描述、图标）
- [x] 统计数据（下载数、点赞数、评论数）
- [x] 标签展示
- [x] 功能特性介绍
- [x] 使用说明/代码示例

### 2.4 发布功能
- [x] 创建新的 Skill
- [x] 选择分类、标签、图标
- [x] 管理自己发布的 Skills

### 2.5 社交功能
- [x] 点赞/取消点赞
- [x] 收藏（本地存储）
- [x] 评论功能

### 2.6 搜索功能
- [x] 关键词搜索
- [x] 分类过滤

---

## 3. 非功能需求

### 3.1 性能
- 页面首屏加载 < 2s
- API 响应时间 < 500ms

### 3.2 兼容性
- 现代浏览器（Chrome, Firefox, Safari, Edge）
- 移动端响应式布局

### 3.3 安全
- 输入内容过滤
- 文件上传类型限制
- API 请求限流

---

## 4. 技术架构

### 4.1 技术栈

#### 前端
- Vue 3 + TypeScript
- Vite
- Pinia（状态管理）
- Vue Router

#### 后端
- Express + TypeScript
- Prisma ORM
- SQLite（开发）/ PostgreSQL（生产）

### 4.2 目录结构

```
skill-hub/
├── client/                 # 前端项目
│   ├── src/
│   │   ├── api/          # API 请求
│   │   ├── assets/       # 静态资源
│   │   ├── components/   # Vue 组件
│   │   ├── router/       # 路由配置
│   │   ├── types/        # TypeScript 类型
│   │   └── views/        # 页面视图
│   └── package.json
│
├── server/                # 后端项目
│   ├── src/
│   │   ├── routes/       # 路由
│   │   ├── services/      # 业务逻辑
│   │   ├── lib/          # 工具库
│   │   └── types/        # 类型定义
│   ├── prisma/           # 数据库模型
│   └── package.json
│
├── openapi.yaml           # API 规范
├── SPEC.md               # 本文档
├── TASKS.md              # 任务清单
└── README.md             # 项目说明
```

---

## 5. 数据模型

### 5.1 Skill
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 唯一标识 |
| name | String | 名称 |
| description | String | 描述 |
| author | String | 作者 |
| authorAvatar | String? | 作者头像 |
| tags | String[] | 标签数组 |
| icon | String? | 图标 |
| downloads | Int | 下载数 |
| stars | Int | 点赞数 |
| featured | Boolean | 是否精选 |
| categoryId | String | 分类ID |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |

### 5.2 Category
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 唯一标识 |
| name | String | 名称 |
| icon | String | 图标 |
| count | Int | 技能数量 |

### 5.3 Comment
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 唯一标识 |
| content | String | 内容 |
| skillId | String | 关联的 Skill |
| createdAt | DateTime | 创建时间 |

### 5.4 Like
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 唯一标识 |
| skillId | String | 关联的 Skill |
| ipAddress | String | 点赞IP（防重复） |
| createdAt | DateTime | 创建时间 |

---

## 6. API 接口

### 6.1 Skills
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/skills | 获取列表（分页/筛选） |
| GET | /api/skills/featured | 获取精选 |
| GET | /api/skills/:id | 获取详情 |
| POST | /api/skills | 创建 |
| PATCH | /api/skills/:id | 更新 |
| DELETE | /api/skills/:id | 删除 |

### 6.2 Categories
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/categories | 获取分类列表 |
| GET | /api/categories/:id | 获取分类详情 |

### 6.3 社交
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/social/:skillId/stats | 获取统计 |
| POST | /api/social/:skillId/like | 点赞/取消点赞 |
| GET | /api/social/:skillId/comments | 获取评论 |
| POST | /api/social/:skillId/comments | 发表评论 |
| DELETE | /api/social/comments/:id | 删除评论 |

### 6.4 文件
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/upload | 上传文件 |

---

## 7. 页面结构

### 7.1 路由
| 路径 | 页面 | 说明 |
|------|------|------|
| / | HomeView | 首页 |
| /skills/:id | SkillDetailView | 详情页 |
| /category/:id | CategoryView | 分类页 |
| /search | SearchView | 搜索页 |
| /publish | PublishView | 发布页 |
| /my-skills | MySkillsView | 我的 Skills |

---

## 8. 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2026-03-27 | 初始版本 |

---

## 9. Skill 规范 (参考 skillhub.club)

### 9.1 SKILL.md 标准格式

Skill 详情页面需展示 SKILL.md 内容，包含以下标准字段：

```markdown
# name: <skill-name>
# description: <描述>

<objective>
  技能目标：解决什么问题
</objective>

<trigger_pattern>
  触发模式：何时自动调用此 Skill
</trigger_pattern>

<action>
  执行动作：Skill 具体的执行逻辑
</action>

<output_format>
  输出格式：Skill 输出的格式规范
</output_format>

<examples>
  使用示例
</examples>
```

### 9.2 Skill 详情页增强

- [ ] **评分系统**：Security、Clarity、Practicality、Quality、Maintainability、Innovation
- [ ] **Output Preview**：展示 Skill 实际输出效果
- [ ] **兼容 Agents**：Claude Code, Codex CLI, Gemini CLI, OpenCode, OpenClaw, Cursor 等
- [ ] **使用指南**：详细的使用说明
- [ ] **评估信息**：Skill 的质量评估

### 9.3 发布流程增强

- [ ] **SKILL.md 编辑器**：支持标准格式的 Skill 描述
- [ ] **代码片段上传**：支持上传 Skill 源码/配置
- [ ] **输出预览**：发布前预览 Skill 输出效果
- [ ] **Agent 兼容性选择**：选择支持的 AI Agents

---

## 10. 测试策略

### 10.1 单元测试
- [ ] 后端 Service 层测试
- [ ] 前端工具函数测试

### 10.2 组件测试
- [ ] Vue 组件测试 (Vitest)
- [ ] 组件交互测试

### 10.3 E2E 测试
- [ ] 关键用户流程测试

---

*本文档最后更新于 2026-03-27*
