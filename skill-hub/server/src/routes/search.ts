import { Router, Request, Response } from 'express'
import { searchService } from '../services/searchService.js'
import { skillService } from '../services/skillService.js'

const router = Router()

// GET /api/search/tags - 获取热门标签
router.get('/tags', async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 20
    const tags = await searchService.getPopularTags(limit)
    res.json({
      success: true,
      data: tags
    })
  } catch (error) {
    console.error('Error fetching tags:', error)
    res.status(500).json({
      success: false,
      data: [],
      message: 'Failed to fetch tags'
    })
  }
})

// GET /api/search/suggestions - 获取搜索建议
router.get('/suggestions', async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string || ''
    const limit = parseInt(req.query.limit as string) || 10
    
    const suggestions = await searchService.getSuggestions(query, limit)
    
    res.json({
      success: true,
      data: suggestions
    })
  } catch (error) {
    console.error('Error fetching suggestions:', error)
    res.status(500).json({
      success: false,
      data: [],
      message: 'Failed to fetch suggestions'
    })
  }
})

// GET /api/search/tag/:tag - 按标签搜索
router.get('/tag/:tag', async (req: Request, res: Response) => {
  try {
    const { page, pageSize, sort } = req.query
    
    const result = await searchService.searchByTag(req.params.tag, {
      page: page ? parseInt(page as string) : undefined,
      pageSize: pageSize ? parseInt(pageSize as string) : undefined,
      sort: sort as 'popular' | 'recent' | 'stars'
    })
    
    res.json({
      success: true,
      data: result
    })
  } catch (error) {
    console.error('Error searching by tag:', error)
    res.status(500).json({
      success: false,
      data: { items: [], total: 0, page: 1, pageSize: 20, totalPages: 0 },
      message: 'Failed to search'
    })
  }
})

// GET /api/search - 通用搜索（复用 skills API）
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
    console.error('Error searching:', error)
    res.status(500).json({
      success: false,
      data: { items: [], total: 0, page: 1, pageSize: 20, totalPages: 0 },
      message: 'Failed to search'
    })
  }
})

export default router
