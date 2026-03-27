import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 10000
})

export const searchApi = {
  // 通用搜索
  search: (params?: {
    page?: number
    pageSize?: number
    category?: string
    search?: string
    sort?: 'popular' | 'recent' | 'stars'
  }) => api.get('/api/search', { params }),

  // 获取热门标签
  getPopularTags: (limit?: number) => 
    api.get('/search/tags', { params: { limit } }),

  // 获取搜索建议
  getSuggestions: (query: string, limit?: number) => 
    api.get('/search/suggestions', { params: { q: query, limit } }),

  // 按标签搜索
  searchByTag: (tag: string, options?: {
    page?: number
    pageSize?: number
    sort?: 'popular' | 'recent' | 'stars'
  }) => api.get(`/search/tag/${encodeURIComponent(tag)}`, { params: options })
}

export default api
