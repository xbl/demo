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

export default router
