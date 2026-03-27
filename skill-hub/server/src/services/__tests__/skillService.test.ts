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

describe('Skill Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('getFeatured', () => {
    it('should return featured skills', async () => {
      const mockSkills = [
        {
          id: '1',
          name: 'Test Skill',
          description: 'Test Description',
          author: 'Test Author',
          tags: '["test"]',
          downloads: 100,
          stars: 10,
          featured: true,
          categoryId: 'dev',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      mockPrisma.skill.findMany.mockResolvedValue(mockSkills)

      const { skillService } = await import('../services/skillService.js')
      const result = await skillService.getFeatured()

      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Test Skill')
      expect(mockPrisma.skill.findMany).toHaveBeenCalledWith({
        where: { featured: true },
      })
    })

    it('should return empty array when no featured skills', async () => {
      mockPrisma.skill.findMany.mockResolvedValue([])

      const { skillService } = await import('../services/skillService.js')
      const result = await skillService.getFeatured()

      expect(result).toHaveLength(0)
    })
  })

  describe('getAll', () => {
    it('should return paginated skills', async () => {
      const mockSkills = [
        {
          id: '1',
          name: 'Skill 1',
          description: 'Description 1',
          author: 'Author 1',
          tags: '["test"]',
          downloads: 100,
          stars: 10,
          featured: false,
          categoryId: 'dev',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]

      mockPrisma.skill.count.mockResolvedValue(1)
      mockPrisma.skill.findMany.mockResolvedValue(mockSkills)

      const { skillService } = await import('../services/skillService.js')
      const result = await skillService.getAll({ page: 1, pageSize: 10 })

      expect(result.items).toHaveLength(1)
      expect(result.total).toBe(1)
      expect(result.page).toBe(1)
      expect(result.pageSize).toBe(10)
    })

    it('should filter by category', async () => {
      mockPrisma.skill.count.mockResolvedValue(0)
      mockPrisma.skill.findMany.mockResolvedValue([])

      const { skillService } = await import('../services/skillService.js')
      await skillService.getAll({ category: 'dev' })

      expect(mockPrisma.skill.count).toHaveBeenCalledWith({
        where: { categoryId: 'dev' },
      })
    })

    it('should filter by search query', async () => {
      mockPrisma.skill.count.mockResolvedValue(0)
      mockPrisma.skill.findMany.mockResolvedValue([])

      const { skillService } = await import('../services/skillService.js')
      await skillService.getAll({ search: 'test' })

      expect(mockPrisma.skill.count).toHaveBeenCalledWith({
        where: expect.objectContaining({
          OR: expect.any(Array),
        }),
      })
    })
  })

  describe('getById', () => {
    it('should return skill by id', async () => {
      const mockSkill = {
        id: '1',
        name: 'Test Skill',
        description: 'Test Description',
        author: 'Test Author',
        tags: '["test"]',
        downloads: 100,
        stars: 10,
        featured: true,
        categoryId: 'dev',
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockPrisma.skill.findUnique.mockResolvedValue(mockSkill)

      const { skillService } = await import('../services/skillService.js')
      const result = await skillService.getById('1')

      expect(result).toBeDefined()
      expect(result?.name).toBe('Test Skill')
    })

    it('should return null for non-existent skill', async () => {
      mockPrisma.skill.findUnique.mockResolvedValue(null)

      const { skillService } = await import('../services/skillService.js')
      const result = await skillService.getById('999')

      expect(result).toBeNull()
    })
  })

  describe('create', () => {
    it('should create a new skill', async () => {
      const newSkill = {
        name: 'New Skill',
        description: 'New Description',
        author: 'New Author',
        tags: ['new', 'test'],
        categoryId: 'dev',
      }

      const createdSkill = {
        id: 'new-id',
        ...newSkill,
        tags: '["new","test"]',
        downloads: 0,
        stars: 0,
        featured: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      mockPrisma.skill.create.mockResolvedValue(createdSkill)

      const { skillService } = await import('../services/skillService.js')
      const result = await skillService.create(newSkill)

      expect(result.name).toBe('New Skill')
      expect(mockPrisma.skill.create).toHaveBeenCalled()
    })
  })
})
