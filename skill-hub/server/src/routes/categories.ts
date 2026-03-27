import { Router, Request, Response } from 'express'
import { skillService } from '../services/skillService.js'

const router = Router()

// GET /api/categories - 获取所有分类
router.get('/', async (req: Request, res: Response) => {
  try {
    const categories = await skillService.getCategories()
    res.json({
      success: true,
      data: categories
    })
  } catch (error) {
    console.error('Error fetching categories:', error)
    res.status(500).json({
      success: false,
      data: [],
      message: 'Failed to fetch categories'
    })
  }
})

// GET /api/categories/:id - 获取分类详情及其 Skills
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    
    if (id === 'featured') {
      // Featured: 返回所有精选
      const featured = await skillService.getFeatured()
      return res.json({
        success: true,
        data: {
          id: 'featured',
          name: '精选推荐',
          icon: '🔥',
          count: featured.length,
          skills: featured
        }
      })
    }
    
    const category = await skillService.getCategoryById(id)
    
    if (!category) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Category not found'
      })
    }
    
    res.json({
      success: true,
      data: category
    })
  } catch (error) {
    console.error('Error fetching category:', error)
    res.status(500).json({
      success: false,
      data: null,
      message: 'Failed to fetch category'
    })
  }
})

export default router
