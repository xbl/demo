import { Router, Request, Response } from 'express'
import { skillService } from '../services/skillService.js'
import path from 'path'
import fs from 'fs'

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

// GET /api/skills/:id/files - 获取 Skill 源码文件列表
router.get('/:id/files', async (req: Request, res: Response) => {
  try {
    const skill = await skillService.getById(req.params.id)
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Skill not found'
      })
    }
    
    // 解析 sourceFiles，如果没有则返回默认文件列表
    let files = []
    if (skill.sourceFiles) {
      try {
        files = JSON.parse(skill.sourceFiles)
      } catch (e) {
        files = []
      }
    }
    
    // 如果没有文件，返回模拟数据
    if (files.length === 0) {
      files = [
        { name: 'SKILL.md', path: '/SKILL.md', type: 'markdown' },
        { name: 'index.ts', path: '/src/index.ts', type: 'typescript' },
        { name: 'config.json', path: '/config.json', type: 'json' },
      ]
    }
    
    res.json({
      success: true,
      data: files
    })
  } catch (error) {
    console.error('Error fetching files:', error)
    res.status(500).json({
      success: false,
      data: [],
      message: 'Failed to fetch files'
    })
  }
})

// POST /api/skills/:id/download - 下载 Skill（增加下载计数）
router.post('/:id/download', async (req: Request, res: Response) => {
  try {
    const skill = await skillService.incrementDownloads(req.params.id)
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'Skill not found'
      })
    }
    
    // 返回下载信息
    res.json({
      success: true,
      data: {
        skillId: skill.id,
        name: skill.name,
        version: skill.version || '1.0.0',
        downloads: skill.downloads,
        // 实际部署时可以返回真实下载链接
        downloadUrl: `/api/skills/${skill.id}/archive`,
        skillMd: skill.skillMd,
        sourceFiles: skill.sourceFiles ? JSON.parse(skill.sourceFiles) : []
      }
    })
  } catch (error) {
    console.error('Error downloading skill:', error)
    res.status(500).json({
      success: false,
      data: null,
      message: 'Failed to download skill'
    })
  }
})

// GET /api/skills/:id/archive - 获取 Skill 归档文件（可选实现）
router.get('/:id/archive', async (req: Request, res: Response) => {
  try {
    const skill = await skillService.getById(req.params.id)
    
    if (!skill) {
      return res.status(404).json({
        success: false,
        message: 'Skill not found'
      })
    }
    
    // 构建归档内容
    const archiveContent = {
      name: skill.name,
      description: skill.description,
      version: skill.version || '1.0.0',
      license: skill.license || 'MIT',
      author: skill.author,
      tags: skill.tags,
      skillMd: skill.skillMd,
      outputPreview: skill.outputPreview,
      scores: skill.scores ? JSON.parse(skill.scores) : null,
      compatibleAgents: skill.compatibleAgents ? JSON.parse(skill.compatibleAgents) : [],
      sourceFiles: skill.sourceFiles ? JSON.parse(skill.sourceFiles) : []
    }
    
    // 返回 JSON 格式的归档
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Content-Disposition', `attachment; filename="${skill.name}-${skill.version || '1.0.0'}.json"`)
    res.json(archiveContent)
  } catch (error) {
    console.error('Error fetching archive:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch archive'
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
