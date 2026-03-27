import axios from 'axios'
import type { Skill, SkillCategory, ApiResponse, PaginatedResponse } from '@/types'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

interface SourceFile {
  name: string
  path: string
  type: string
}

interface DownloadResponse {
  skillId: string
  name: string
  version: string
  downloads: number
  downloadUrl: string
  skillMd?: string
  sourceFiles: SourceFile[]
}

export const skillApi = {
  // 获取精选 Skills
  getFeatured: () => api.get<ApiResponse<Skill[]>>('/skills/featured'),
  
  // 获取所有 Skills（支持分页和筛选）
  getSkills: (params?: {
    page?: number
    pageSize?: number
    category?: string
    search?: string
    sort?: 'popular' | 'recent' | 'stars'
  }) => api.get<ApiResponse<PaginatedResponse<Skill>>>('/skills', { params }),
  
  // 获取单个 Skill 详情
  getSkill: (id: string) => api.get<ApiResponse<Skill>>(`/skills/${id}`),
  
  // 获取 Skill 源码文件列表
  getFiles: (id: string) => api.get<ApiResponse<SourceFile[]>>(`/skills/${id}/files`),
  
  // 下载 Skill（增加下载计数）
  downloadSkill: (id: string) => api.post<ApiResponse<DownloadResponse>>(`/skills/${id}/download`),
  
  // 创建 Skill
  createSkill: (data: {
    name: string
    description: string
    author: string
    authorAvatar?: string
    tags?: string[]
    icon?: string
    categoryId: string
    featured?: boolean
  }) => api.post<ApiResponse<Skill>>('/skills', data),
  
  // 更新 Skill
  updateSkill: (id: string, data: Partial<{
    name: string
    description: string
    authorAvatar: string
    tags: string[]
    icon: string
    categoryId: string
    featured: boolean
  }>) => api.patch<ApiResponse<Skill>>(`/skills/${id}`, data),
  
  // 删除 Skill
  deleteSkill: (id: string) => api.delete(`/skills/${id}`),
  
  // 获取分类
  getCategories: () => api.get<ApiResponse<SkillCategory[]>>('/categories'),
  
  // 获取分类详情
  getCategory: (id: string) => api.get<ApiResponse<any>>(`/categories/${id}`)
}

export default api
