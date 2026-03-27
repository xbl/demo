import { Router, Request, Response } from 'express'
import { skillService } from '../services/skillService.js'

const router = Router()

// GET /api/skills/featured - 获取精选 Skills
router.get('/featured', async (req: Request, res: Response) => {
  try {
    const featured = await skillService.getFeatured()
    res.json({
      success: true,
      data: featured
    })
  } catch (error) {
    console.error('Error fetching featured:', error)
    res.status(500).json({
      success: false,
      data: [],
      message: 'Failed to fetch featured skills'
    })
  }
})

// GET /api/skills - 获取所有 Skills（支持分页和筛选）
router.get('/', async (req: Request, res: Response) => {
  try {
    const { page, pageSize, category, search, sort } = req.query
    
    const result = await skillService.getAll({
      page: page ? parseInt(page as string) : undefined,
      pageSize: pageSize ? parseInt(pageSize as string) : undefined,
      category: category as string,
      search: search as string,
      sort: sort as 'popular' | 'recent' | 'stars'
    })
    
    res.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Error fetching skills:', error)
    res.status(500).json({
      success: false,
      data: { items: [], total: 0, page: 1, pageSize: 20, totalPages: 0 },
      message: 'Failed to fetch skills'
    })
  }
})

// GET /api/skills/:id - 获取单个 Skill 详情
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const skill = await skillService.getById(req.params.id)
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Skill not found'
      })
    }
    
    res.json({
      success: true,
      data: skill
    })
  } catch (error) {
    console.error('Error fetching skill:', error)
    res.status(500).json({
      success: false,
      data: null,
      message: 'Failed to fetch skill'
    })
  }
})

// POST /api/skills - 创建 Skill
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, description, author, authorAvatar, tags, icon, categoryId, featured } = req.body

    if (!name || !description || !author || !categoryId) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'Missing required fields: name, description, author, categoryId'
      })
    }

    const skill = await skillService.create({
      name,
      description,
      author,
      authorAvatar,
      tags: tags || [],
      icon,
      categoryId,
      featured
    })

    res.status(201).json({
      success: true,
      data: skill,
      message: 'Skill created successfully'
    })
  } catch (error) {
    console.error('Error creating skill:', error)
    res.status(500).json({
      success: false,
      data: null,
      message: 'Failed to create skill'
    })
  }
})

// PATCH /api/skills/:id - 更新 Skill
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const { name, description, authorAvatar, tags, icon, categoryId, featured } = req.body

    const skill = await skillService.update(req.params.id, {
      name,
      description,
      authorAvatar,
      tags,
      icon,
      categoryId,
      featured
    })

    if (!skill) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Skill not found'
      })
    }

    res.json({
      success: true,
      data: skill,
      message: 'Skill updated successfully'
    })
  } catch (error) {
    console.error('Error updating skill:', error)
    res.status(500).json({
      success: false,
      data: null,
      message: 'Failed to update skill'
    })
  }
})

// DELETE /api/skills/:id - 删除 Skill
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const deleted = await skillService.delete(req.params.id)

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      })
    }

    res.json({
      success: true,
      message: 'Skill deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting skill:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete skill'
    })
  }
})

export default router
