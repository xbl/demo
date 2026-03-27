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
