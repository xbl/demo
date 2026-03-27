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
    tags: JSON.parse(skill.tags || '[]'),
    icon: skill.icon,
    downloads: skill.downloads,
    stars: skill.stars,
    featured: skill.featured,
    categoryId: skill.categoryId,
    skillMd: skill.skillMd,
    outputPreview: skill.outputPreview,
    scores: skill.scores ? JSON.parse(skill.scores) : undefined,
    compatibleAgents: skill.compatibleAgents ? JSON.parse(skill.compatibleAgents) : undefined,
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

// 更新分类计数
async function updateCategoryCount(categoryId: string) {
  const count = await prisma.skill.count({
    where: { categoryId }
  })
  await prisma.category.update({
    where: { id: categoryId },
    data: { count }
  })
}

export const skillService = {
  // ===== READ =====
  
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

    const where: any = {}
    
    if (category) {
      where.categoryId = category
    }
    
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
        { tags: { contains: search } },
        { author: { contains: search } }
      ]
    }

    const total = await prisma.skill.count({ where })

    let orderBy: any = { updatedAt: 'desc' }
    switch (sort) {
      case 'popular':
        orderBy = { downloads: 'desc' }
        break
      case 'stars':
        orderBy = { stars: 'desc' }
        break
    }

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

  // ===== CREATE =====

  async create(data: {
    name: string
    description: string
    author: string
    authorAvatar?: string
    tags: string[]
    icon?: string
    categoryId: string
    featured?: boolean
  }): Promise<Skill> {
    const skill = await prisma.skill.create({
      data: {
        ...data,
        tags: JSON.stringify(data.tags),
        featured: data.featured || false,
        downloads: 0,
        stars: 0
      }
    })
    
    // 更新分类计数
    await updateCategoryCount(data.categoryId)
    
    return transformSkill(skill)
  },

  // ===== UPDATE =====

  async update(id: string, data: {
    name?: string
    description?: string
    authorAvatar?: string
    tags?: string[]
    icon?: string
    categoryId?: string
    featured?: boolean
  }): Promise<Skill | null> {
    const existing = await prisma.skill.findUnique({ where: { id } })
    if (!existing) return null

    const updateData: any = { ...data }
    if (data.tags) {
      updateData.tags = JSON.stringify(data.tags)
    }
    
    const oldCategoryId = existing.categoryId

    const skill = await prisma.skill.update({
      where: { id },
      data: updateData
    })

    // 如果分类变更，更新新旧分类计数
    if (data.categoryId && data.categoryId !== oldCategoryId) {
      await updateCategoryCount(oldCategoryId)
      await updateCategoryCount(data.categoryId)
    }

    return transformSkill(skill)
  },

  // ===== DELETE =====

  async delete(id: string): Promise<boolean> {
    const existing = await prisma.skill.findUnique({ where: { id } })
    if (!existing) return false

    await prisma.skill.delete({ where: { id } })
    
    // 更新分类计数
    await updateCategoryCount(existing.categoryId)
    
    return true
  },

  // ===== CATEGORIES =====

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
