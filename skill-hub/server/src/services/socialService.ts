import prisma from '../lib/prisma.js'

export const socialService = {
  // ===== COMMENTS =====

  async getComments(skillId: string): Promise<any[]> {
    const comments = await prisma.comment.findMany({
      where: { skillId },
      orderBy: { createdAt: 'desc' },
      take: 50
    })
    return comments.map(c => ({
      id: c.id,
      content: c.content,
      createdAt: c.createdAt.toISOString()
    }))
  },

  async createComment(skillId: string, content: string): Promise<any> {
    // 检查skill是否存在
    const skill = await prisma.skill.findUnique({ where: { id: skillId } })
    if (!skill) throw new Error('Skill not found')

    const comment = await prisma.comment.create({
      data: {
        content,
        skillId
      }
    })

    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt.toISOString()
    }
  },

  async deleteComment(commentId: string): Promise<boolean> {
    try {
      await prisma.comment.delete({ where: { id: commentId } })
      return true
    } catch {
      return false
    }
  },

  // ===== LIKES =====

  async getLikeCount(skillId: string): Promise<number> {
    return prisma.like.count({ where: { skillId } })
  },

  async isLiked(skillId: string, ipAddress: string): Promise<boolean> {
    const like = await prisma.like.findUnique({
      where: {
        skillId_ipAddress: {
          skillId,
          ipAddress
        }
      }
    })
    return !!like
  },

  async toggleLike(skillId: string, ipAddress: string): Promise<{ liked: boolean; count: number }> {
    // 检查skill是否存在
    const skill = await prisma.skill.findUnique({ where: { id: skillId } })
    if (!skill) throw new Error('Skill not found')

    // 检查是否已点赞
    const existingLike = await prisma.like.findUnique({
      where: {
        skillId_ipAddress: {
          skillId,
          ipAddress
        }
      }
    })

    if (existingLike) {
      // 取消点赞
      await prisma.like.delete({
        where: { id: existingLike.id }
      })
    } else {
      // 添加点赞
      await prisma.like.create({
        data: {
          skillId,
          ipAddress: ipAddress || 'anonymous'
        }
      })
    }

    // 返回最新状态
    const count = await this.getLikeCount(skillId)
    return {
      liked: !existingLike,
      count
    }
  },

  // ===== SKILL STATS =====

  async getSkillStats(skillId: string, ipAddress: string) {
    const [likeCount, commentCount, isLiked] = await Promise.all([
      this.getLikeCount(skillId),
      prisma.comment.count({ where: { skillId } }),
      this.isLiked(skillId, ipAddress || 'anonymous')
    ])

    return {
      likes: likeCount,
      comments: commentCount,
      isLiked
    }
  }
}
