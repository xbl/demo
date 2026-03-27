import type { Skill, SkillCategory, PaginatedResponse } from '../types/index.js'

// Mock Data Store
export const skills: Skill[] = [
  {
    id: '1',
    name: 'Weather Query',
    description: '获取全球天气信息和天气预报，支持多种语言和地区',
    author: 'CloudTeam',
    tags: ['天气', 'API', '实用工具'],
    icon: '🌤️',
    downloads: 12500,
    stars: 892,
    featured: true,
    categoryId: 'productivity',
    createdAt: '2026-03-15',
    updatedAt: '2026-03-20'
  },
  {
    id: '2',
    name: 'Document Parser',
    description: '智能解析 PDF、Word、Excel 等文档，提取关键信息并转换为结构化数据',
    author: 'AI Labs',
    tags: ['文档', 'AI', 'OCR'],
    icon: '📄',
    downloads: 8920,
    stars: 654,
    featured: true,
    categoryId: 'ai',
    createdAt: '2026-03-10',
    updatedAt: '2026-03-18'
  },
  {
    id: '3',
    name: 'Video Editor',
    description: '视频剪辑、添加字幕、特效处理一站式完成，支持多种格式',
    author: 'MediaPro',
    tags: ['视频', '多媒体', '编辑'],
    icon: '🎬',
    downloads: 6540,
    stars: 421,
    featured: true,
    categoryId: 'media',
    createdAt: '2026-03-08',
    updatedAt: '2026-03-15'
  },
  {
    id: '4',
    name: 'Code Review',
    description: '自动代码审查，提供优化建议和最佳实践，提升代码质量',
    author: 'DevTools',
    tags: ['开发', '代码', '审查'],
    icon: '👀',
    downloads: 9870,
    stars: 756,
    featured: true,
    categoryId: 'dev',
    createdAt: '2026-03-12',
    updatedAt: '2026-03-22'
  },
  {
    id: '5',
    name: 'Image Understanding',
    description: '强大的图像理解能力，识别物体、场景、文字等',
    author: 'VisionAI',
    tags: ['图像', 'AI', '识别'],
    icon: '🖼️',
    downloads: 15230,
    stars: 1102,
    featured: true,
    categoryId: 'ai',
    createdAt: '2026-03-05',
    updatedAt: '2026-03-19'
  },
  {
    id: '6',
    name: 'Data Analyzer',
    description: '数据分析工具，支持 CSV、JSON、Excel 等格式',
    author: 'DataWorks',
    tags: ['数据', '分析', '可视化'],
    icon: '📊',
    downloads: 7650,
    stars: 543,
    featured: false,
    categoryId: 'data',
    createdAt: '2026-03-01',
    updatedAt: '2026-03-10'
  },
  {
    id: '7',
    name: 'Security Scanner',
    description: '安全漏洞扫描，检测常见安全问题',
    author: 'SecTeam',
    tags: ['安全', '扫描', '合规'],
    icon: '🔒',
    downloads: 4320,
    stars: 312,
    featured: false,
    categoryId: 'security',
    createdAt: '2026-02-28',
    updatedAt: '2026-03-05'
  },
  {
    id: '8',
    name: 'API Tester',
    description: 'API 接口测试工具，支持 REST 和 GraphQL',
    author: 'APIFox',
    tags: ['API', '测试', '开发'],
    icon: '🔌',
    downloads: 11890,
    stars: 867,
    featured: false,
    categoryId: 'dev',
    createdAt: '2026-02-25',
    updatedAt: '2026-03-12'
  }
]

export const categories: SkillCategory[] = [
  { id: 'dev', name: '开发工具', icon: '🛠️', count: 156 },
  { id: 'ai', name: 'AI 智能', icon: '🤖', count: 89 },
  { id: 'media', name: '多媒体', icon: '🎨', count: 67 },
  { id: 'productivity', name: '效率提升', icon: '⚡', count: 124 },
  { id: 'data', name: '数据分析', icon: '📊', count: 45 },
  { id: 'security', name: '安全合规', icon: '🔒', count: 32 }
]

// Service Functions
export const skillService = {
  getFeatured(): Skill[] {
    return skills.filter(s => s.featured)
  },

  getAll(options: {
    page?: number
    pageSize?: number
    category?: string
    search?: string
    sort?: 'popular' | 'recent' | 'stars'
  } = {}): PaginatedResponse<Skill> {
    let result = [...skills]
    
    // Filter by category
    if (options.category) {
      result = result.filter(s => s.categoryId === options.category)
    }
    
    // Filter by search
    if (options.search) {
      const searchLower = options.search.toLowerCase()
      result = result.filter(s => 
        s.name.toLowerCase().includes(searchLower) ||
        s.description.toLowerCase().includes(searchLower) ||
        s.tags.some(t => t.toLowerCase().includes(searchLower))
      )
    }
    
    // Sort
    switch (options.sort) {
      case 'popular':
        result.sort((a, b) => b.downloads - a.downloads)
        break
      case 'stars':
        result.sort((a, b) => b.stars - a.stars)
        break
      case 'recent':
      default:
        result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    }
    
    // Pagination
    const page = options.page || 1
    const pageSize = options.pageSize || 20
    const start = (page - 1) * pageSize
    const end = start + pageSize
    
    return {
      items: result.slice(start, end),
      total: result.length,
      page,
      pageSize,
      totalPages: Math.ceil(result.length / pageSize)
    }
  },

  getById(id: string): Skill | undefined {
    return skills.find(s => s.id === id)
  },

  getCategories(): SkillCategory[] {
    return categories
  }
}
