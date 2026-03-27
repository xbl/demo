# name: skillhub-manager
# description: AI Agent Skills 市场平台管理工具 - 用于创建、部署和管理 SkillHub 项目

<objective>
SkillHub Manager 是一个开发辅助工具，帮助开发者快速搭建和管理 AI Agent Skills 市场平台。它可以：
1. 自动生成项目结构和代码
2. 部署到 Docker 容器
3. 管理数据库和测试数据
4. 执行常见的开发任务
</objective>

<trigger_pattern>
在以下场景自动触发：
- 用户请求创建新的 SkillHub 项目
- 用户需要部署或重启服务
- 用户需要运行测试或构建
- 用户需要管理数据库
</trigger_pattern>

<action>
根据用户指令执行相应操作：
1. **项目生成**：使用 Express + Vue 3 + Prisma 技术栈生成完整项目
2. **Docker 部署**：构建和启动 Docker 容器
3. **数据库管理**：运行 Prisma migrate、seed、generate
4. **测试运行**：执行单元测试和类型检查
5. **代码同步**：推送到 GitHub 仓库
</action>

<output_format>
输出格式为 Markdown，包含：
- 操作状态（成功/失败）
- 执行步骤说明
- 后续操作建议
</output_format>

<examples>
示例 1：创建新项目
```
用户：创建一个 SkillHub 项目
输出：✅ 项目已创建在 /path/to/skill-hub
```

示例 2：部署服务
```
用户：部署到 Docker
输出：✅ 容器已启动
- 前端: http://localhost:3000
- 后端: http://localhost:4000
```

示例 3：运行测试
```
用户：运行测试
输出：✅ 所有测试通过
- 客户端测试: 5 passed
- 服务端测试: 8 passed
```
</examples>

<installation>
在 OpenClaw 中使用：
1. 确保项目在 /home/gem/workspace/agent/workspace/demo/skill-hub
2. 使用 git 命令进行代码管理
3. 使用 docker-compose 进行部署
</installation>

<configuration>
项目配置：
- 前端端口: 3000
- 后端端口: 4000
- 数据库: SQLite (开发) / PostgreSQL (生产)
- 技术栈: Vue 3 + Express + Prisma + TypeScript
</configuration>
