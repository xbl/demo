import { Router, Request, Response } from 'express'
import { skillService } from '../services/skillService.js'

const router = Router()

// GET /api/categories - 获取所有分类
router.get('/', (req: Request, res: Response) => {
  try {
    const categories = skillService.getCategories()
    res.json({
      success: true,
      data: categories
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      data: [],
      message: 'Failed to fetch categories'
    })
  }
})

// GET /api/categories/:id - 获取分类详情及其 Skills
router.get('/:id', (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const categories = skillService.getCategories()
    const category = categories.find(c => c.id === id)
    
    if (!category) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Category not found'
      })
    }
    
    const skills = skillService.getAll({ category: id }).items
    
    res.json({
      success: true,
      data: {
        ...category,
        skills
      }
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      data: null,
      message: 'Failed to fetch category'
    })
  }
})

export default router
