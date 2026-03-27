import prisma from '../lib/prisma.js'

export const searchService = {
  // 获取所有标签及其使用次数
  async getAllTags(): Promise<{ tag: string; count: number }[]> {
    const skills = await prisma.skill.findMany({
      select: { tags: true }
    })

    // 统计标签
    const tagCounts = new Map<string, number>()
    for (const skill of skills) {
      const tags = JSON.parse(skill.tags) as string[]
      for (const tag of tags) {
        tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
      }
    }

    // 转换为数组并排序
    const result = Array.from(tagCounts.entries())
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)

    return result
  },

  // 获取热门标签
  async getPopularTags(limit: number = 20): Promise<{ tag: string; count: number }[]> {
    const allTags = await this.getAllTags()
    return allTags.slice(0, limit)
  },

  // 搜索建议（用于自动补全）
  async getSuggestions(query: string, limit: number = 10): Promise<string[]> {
    const allTags = await this.getAllTags()
    const q = query.toLowerCase()
    
    return allTags
      .filter(t => t.tag.toLowerCase().includes(q))
      .slice(0, limit)
      .map(t => t.tag)
  },

  // 按标签搜索 Skills
  async searchByTag(tag: string, options: {
    page?: number
    pageSize?: number
    sort?: 'popular' | 'recent' | 'stars'
  } = {}): Promise<any> {
    const { page = 1, pageSize = 20, sort } = options

    const where: any = {
      tags: { contains: tag }
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
      items: items.map((s: any) => ({
        id: s.id,
        name: s.name,
        description: s.description,
        author: s.author,
        tags: JSON.parse(s.tags),
        icon: s.icon,
        downloads: s.downloads,
        stars: s.stars,
        featured: s.featured,
        categoryId: s.categoryId,
        createdAt: s.createdAt.toISOString().split('T')[0],
        updatedAt: s.updatedAt.toISOString().split('T')[0]
      })),
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize)
    }
  }
}
