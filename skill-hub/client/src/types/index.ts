export interface Skill {
  id: string
  name: string
  description: string
  author: string
  authorAvatar?: string
  tags: string[]
  icon?: string
  downloads: number
  stars: number
  featured?: boolean
  categoryId?: string
  skillMd?: string       // SKILL.md 内容
  outputPreview?: string // Output Preview
  scores?: {            // 评分
    security: number
    clarity: number
    practicality: number
    quality: number
    maintainability: number
    innovation: number
  }
  compatibleAgents?: string[] // 兼容的 Agents
  sourceFiles?: string      // 源码文件列表 (JSON string)
  version?: string          // 版本号
  license?: string          // 许可证
  createdAt: string
  updatedAt: string
}

export interface SkillCategory {
  id: string
  name: string
  icon: string
  count: number
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}
