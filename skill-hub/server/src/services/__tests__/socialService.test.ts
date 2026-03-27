import { describe, it, expect, beforeEach, vi } from 'vitest'

// Mock Prisma
const mockPrisma = {
  skill: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },
  category: {
    findMany: vi.fn(),
    findUnique: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    count: vi.fn(),
  },
  comment: {
    findMany: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },
  like: {
    findMany: vi.fn(),
    create: vi.fn(),
    delete: vi.fn(),
    count: vi.fn(),
  },
}

vi.mock('../lib/prisma.js', () => ({
  default: mockPrisma,
}))

describe('Social Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getComments', () => {
    it('should return comments for a skill', async () => {
      const mockComments = [
        {
          id: '1',
          content: 'Great skill!',
          skillId: 'skill-1',
          createdAt: new Date('2026-03-27'),
        },
        {
          id: '2',
          content: 'Very useful, thank you!',
          skillId: 'skill-1',
          createdAt: new Date('2026-03-26'),
        },
      ]

      mockPrisma.comment.findMany.mockResolvedValue(mockComments)

      const { socialService } = await import('../socialService.js')
      const result = await socialService.getComments('skill-1')

      expect(result).toHaveLength(2)
      expect(result[0].content).toBe('Great skill!')
    })

    it('should return empty array when no comments', async () => {
      mockPrisma.comment.findMany.mockResolvedValue([])

      const { socialService } = await import('../socialService.js')
      const result = await socialService.getComments('skill-1')

      expect(result).toHaveLength(0)
    })
  })

  describe('createComment', () => {
    it('should create a new comment', async () => {
      const newComment = {
        id: 'new-id',
        content: 'New comment',
        skillId: 'skill-1',
        createdAt: new Date(),
      }

      mockPrisma.skill.findUnique.mockResolvedValue({ id: 'skill-1' })
      mockPrisma.comment.create.mockResolvedValue(newComment)

      const { socialService } = await import('../socialService.js')
      const result = await socialService.createComment('skill-1', 'New comment')

      expect(result.content).toBe('New comment')
    })

    it('should throw error for non-existent skill', async () => {
      mockPrisma.skill.findUnique.mockResolvedValue(null)

      const { socialService } = await import('../socialService.js')
      
      await expect(
        socialService.createComment('invalid-id', 'New comment')
      ).rejects.toThrow('Skill not found')
    })
  })

  describe('toggleLike', () => {
    it('should add like when not already liked', async () => {
      mockPrisma.like.findMany.mockResolvedValue([])
      mockPrisma.like.create.mockResolvedValue({ id: 'like-1' })
      mockPrisma.like.count.mockResolvedValue(1)

      const { socialService } = await import('../socialService.js')
      const result = await socialService.toggleLike('skill-1', '127.0.0.1')

      expect(result.liked).toBe(true)
      expect(result.count).toBe(1)
    })

    it('should remove like when already liked', async () => {
      mockPrisma.like.findMany.mockResolvedValue([{ id: 'like-1' }])
      mockPrisma.like.delete.mockResolvedValue({})
      mockPrisma.like.count.mockResolvedValue(0)

      const { socialService } = await import('../socialService.js')
      const result = await socialService.toggleLike('skill-1', '127.0.0.1')

      expect(result.liked).toBe(false)
      expect(result.count).toBe(0)
    })
  })

  describe('getSkillStats', () => {
    it('should return stats for a skill', async () => {
      mockPrisma.like.count.mockResolvedValue(10)
      mockPrisma.comment.count.mockResolvedValue(5)
      mockPrisma.like.findMany.mockResolvedValue([{ id: 'like-1' }])

      const { socialService } = await import('../socialService.js')
      const result = await socialService.getSkillStats('skill-1', '127.0.0.1')

      expect(result.likes).toBe(10)
      expect(result.comments).toBe(5)
      expect(result.isLiked).toBe(true)
    })

    it('should return isLiked false when IP not found', async () => {
      mockPrisma.like.count.mockResolvedValue(10)
      mockPrisma.comment.count.mockResolvedValue(5)
      mockPrisma.like.findMany.mockResolvedValue([])

      const { socialService } = await import('../socialService.js')
      const result = await socialService.getSkillStats('skill-1', '127.0.0.1')

      expect(result.likes).toBe(10)
      expect(result.isLiked).toBe(false)
    })
  })
})
