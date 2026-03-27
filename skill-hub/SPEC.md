# SkillHub 产品需求文档 (SPEC) v2

## 1. 产品概述

### 1.1 产品定位
**SkillHub** 是一个 AI Agent Skills 市场平台，旨在帮助用户发现、分享和使用各类 AI 助手技能（Skills）。

### 1.2 目标用户
- AI 助手用户：寻找并使用各种 Skills 来增强 AI 能力
- 开发者：开发和分享自己的 Skills
- 企业团队：管理和分发内部 Skills

---

## 2. 功能需求

### 2.1 首页
- [x] 展示精选 Skills（Featured）
- [x] 分类快捷入口
- [x] 搜索功能
- [x] 热门标签

### 2.2 Skills 列表
- [x] 分类筛选
- [x] 关键词搜索
- [x] 排序（最新、最热、最多星）
- [x] 分页加载

### 2.3 Skills 详情页 ⭐ (重点完善)
- [x] 基本信息展示（名称、作者、描述、图标）
- [x] 统计数据（下载数、点赞数、评论数）
- [x] 标签展示
- [x] 功能特性介绍
- [x] **SKILL.md 内容展示**
- [x] **评分系统**（Security/Clarity/Practicality/Quality/Maintainability/Innovation）
- [x] **Output Preview 输出预览**
- [x] **兼容 Agents 列表**
- [ ] **📥 下载 Skill（完整包）**
- [ ] **📋 复制 SKILL.md**
- [ ] **🚀 一键安装**
- [ ] **📁 文件浏览**
- [ ] **📦 Skill 源码管理**

### 2.4 发布功能
- [x] 创建新的 Skill
- [x] 选择分类、标签、图标
- [x] SKILL.md 编辑器
- [x] 评分设置
- [x] Agent 兼容性选择
- [ ] 文件上传（源码、配置）
- [ ] 版本管理

### 2.5 社交功能
- [x] 点赞/取消点赞
- [x] 收藏（本地存储）
- [x] 评论功能

### 2.6 搜索功能
- [x] 关键词搜索
- [x] 分类过滤
- [x] 标签搜索
- [x] 热门标签

### 2.7 用户功能
- [ ] 我的收藏页面
- [ ] 我的 Skills 管理
- [ ] 个人中心

---

## 3. 数据模型 (更新)

### 3.1 Skill (更新)
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
| skillMd | String? | SKILL.md 内容 |
| outputPreview | String? | 输出预览 |
| scores | JSON | 评分 |
| compatibleAgents | String[] | 兼容 Agents |
| **sourceFiles** | **String** | **源码文件列表 (JSON)** |
| **version** | **String** | **版本号** |
| **license** | **String** | **许可证** |
| createdAt | DateTime | 创建时间 |
| updatedAt | DateTime | 更新时间 |

### 3.2 Category
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 唯一标识 |
| name | String | 名称 |
| icon | String | 图标 |
| count | Int | 技能数量 |

### 3.3 Comment
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 唯一标识 |
| content | String | 内容 |
| skillId | String | 关联的 Skill |
| createdAt | DateTime | 创建时间 |

### 3.4 Like
| 字段 | 类型 | 说明 |
|------|------|------|
| id | String | 唯一标识 |
| skillId | String | 关联的 Skill |
| ipAddress | String | 点赞IP |
| createdAt | DateTime | 创建时间 |

---

## 4. API 接口 (更新)

### 4.1 Skills
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/skills | 获取列表（分页/筛选） |
| GET | /api/skills/featured | 获取精选 |
| GET | /api/skills/:id | 获取详情 |
| POST | /api/skills | 创建 |
| PATCH | /api/skills/:id | 更新 |
| DELETE | /api/skills/:id | 删除 |
| **POST** | **/api/skills/:id/download** | **下载计数+获取下载链接** |

### 4.2 Categories
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/categories | 获取分类列表 |
| GET | /api/categories/:id | 获取分类详情 |

### 4.3 社交
| 方法 | 路径 | 说明 |
|------|------|------|
| GET | /api/social/:skillId/stats | 获取统计 |
| POST | /api/social/:skillId/like | 点赞/取消点赞 |
| GET | /api/social/:skillId/comments | 获取评论 |
| POST | /api/social/:skillId/comments | 发表评论 |
| DELETE | /api/social/comments/:id | 删除评论 |

### 4.4 文件
| 方法 | 路径 | 说明 |
|------|------|------|
| POST | /api/upload | 上传文件 |
| **GET** | **/api/skills/:id/files** | **获取 Skill 源码文件列表** |

---

## 5. 页面结构

### 5.1 路由
| 路径 | 页面 | 说明 |
|------|------|------|
| / | HomeView | 首页 |
| /skills/:id | SkillDetailView | 详情页 |
| /category/:id | CategoryView | 分类页 |
| /search | SearchView | 搜索页 |
| /publish | PublishView | 发布页 |
| /my-skills | MySkillsView | 我的 Skills |
| **/my-favorites** | **MyFavoritesView** | **我的收藏** |

---

## 6. 迭代规划

### Iteration 9: Skill 详情页完善
- [ ] 下载 Skill 功能
- [ ] 复制 SKILL.md 功能
- [ ] 一键安装功能
- [ ] 文件浏览功能

### Iteration 10: 用户功能
- [ ] 我的收藏页面
- [ ] 个人中心

### Iteration 11: 高级功能
- [ ] Skill 版本管理
- [ ] 许可证管理

---

## 7. 测试策略

### 7.1 单元测试
- [x] 后端 Service 层测试
- [x] 前端工具函数测试

### 7.2 组件测试
- [x] Vue 组件测试
- [ ] 组件交互测试

### 7.3 E2E 测试
- [ ] 关键用户流程测试

---

## 8. 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| 1.0.0 | 2026-03-27 | 初始版本 |
| 2.0.0 | 2026-03-27 | 详情页增强、发布流程增强、测试完善 |

---

*本文档最后更新于 2026-03-27*
