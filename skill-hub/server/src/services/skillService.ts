import prisma from '../lib/prisma.js'
import type { Skill, SkillCategory, PaginatedResponse } from '../types/index.js'

// 转换 Prisma 模型到 API 响应格式
function transformSkill(skill: any): Skill {
  return {
    id: skill.id,
    name: skill.name,
    description: skill.description,
    author: skill.author,
    authorAvatar: skill.authorAvatar,
    tags: JSON.parse(skill.tags),
    icon: skill.icon,
    downloads: skill.downloads,
    stars: skill.stars,
    featured: skill.featured,
    categoryId: skill.categoryId,
    createdAt: skill.createdAt.toISOString().split('T')[0],
    updatedAt: skill.updatedAt.toISOString().split('T')[0]
  }
}

function transformCategory(category: any): SkillCategory {
  return {
    id: category.id,
    name: category.name,
    icon: category.icon,
    count: category.count
  }
}

export const skillService = {
  async getFeatured(): Promise<Skill[]> {
    const skills = await prisma.skill.findMany({
      where: { featured: true }
    })
    return skills.map(transformSkill)
  },

  async getAll(options: {
    page?: number
    pageSize?: number
    category?: string
    search?: string
    sort?: 'popular' | 'recent' | 'stars'
  } = {}): Promise<PaginatedResponse<Skill>> {
    const { page = 1, pageSize = 20, category, search, sort } = options

    // Build where clause
    const where: any = {}
    
    if (category) {
      where.categoryId = category
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } }
      ]
    }

    // Get total count
    const total = await prisma.skill.count({ where })

    // Build order by
    let orderBy: any = { updatedAt: 'desc' }
    switch (sort) {
      case 'popular':
        orderBy = { downloads: 'desc' }
        break
      case 'stars':
        orderBy = { stars: 'desc' }
        break
      case 'recent':
      default:
        orderBy = { updatedAt: 'desc' }
    }

    // Get items
    const items = await prisma.skill.findMany({
      where,
      orderBy,
      skip: (page - 1) * pageSize,
      take: pageSize
    })

    return {
      items: items.map(transformSkill),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    }
  },

  async getById(id: string): Promise<Skill | null> {
    const skill = await prisma.skill.findUnique({
      where: { id }
    })
    return skill ? transformSkill(skill) : null
  },

  async getCategories(): Promise<SkillCategory[]> {
    const categories = await prisma.category.findMany({
      orderBy: { count: 'desc' }
    })
    return categories.map(transformCategory)
  },

  async getCategoryById(id: string): Promise<any> {
    const category = await prisma.category.findUnique({
      where: { id }
    })
    if (!category) return null
    
    const skills = await prisma.skill.findMany({
      where: { categoryId: id },
      orderBy: { stars: 'desc' }
    })
    
    return {
      ...transformCategory(category),
      skills: skills.map(transformSkill)
    }
  }
}
