import axios from 'axios'
import type { Skill, SkillCategory, ApiResponse, PaginatedResponse } from '@/types'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

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
  
  // 获取分类
  getCategories: () => api.get<ApiResponse<SkillCategory[]>>('/categories')
}

export default api
