import { Router, Request, Response } from 'express'
import { socialService } from '../services/socialService.js'

const router = Router()

// Helper to get client IP
function getClientIP(req: Request): string {
  return (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim() 
    || req.headers['x-real-ip'] as string
    || req.socket.remoteAddress 
    || 'anonymous'
}

// GET /api/social/:skillId/stats - 获取技能互动统计
router.get('/:skillId/stats', async (req: Request, res: Response) => {
  try {
    const ipAddress = getClientIP(req)
    const stats = await socialService.getSkillStats(req.params.skillId, ipAddress)
    res.json({
      success: true,
      data: stats
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to fetch stats'
    })
  }
})

// POST /api/social/:skillId/like - 点赞/取消点赞
router.post('/:skillId/like', async (req: Request, res: Response) => {
  try {
    const ipAddress = getClientIP(req)
    const result = await socialService.toggleLike(req.params.skillId, ipAddress)
    res.json({
      success: true,
      data: result
    })
  } catch (error: any) {
    console.error('Error toggling like:', error)
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to toggle like'
    })
  }
})

// GET /api/social/:skillId/comments - 获取评论列表
router.get('/:skillId/comments', async (req: Request, res: Response) => {
  try {
    const comments = await socialService.getComments(req.params.skillId)
    res.json({
      success: true,
      data: comments
    })
  } catch (error) {
    console.error('Error fetching comments:', error)
    res.status(500).json({
      success: false,
      data: [],
      message: 'Failed to fetch comments'
    })
  }
})

// POST /api/social/:skillId/comments - 添加评论
router.post('/:skillId/comments', async (req: Request, res: Response) => {
  try {
    const { content } = req.body
    
    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: '评论内容不能为空'
      })
    }

    if (content.length > 500) {
      return res.status(400).json({
        success: false,
        message: '评论内容过长（最多500字符）'
      })
    }

    const comment = await socialService.createComment(req.params.skillId, content.trim())
    
    res.status(201).json({
      success: true,
      data: comment
    })
  } catch (error: any) {
    console.error('Error creating comment:', error)
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create comment'
    })
  }
})

// DELETE /api/social/comments/:commentId - 删除评论
router.delete('/comments/:commentId', async (req: Request, res: Response) => {
  try {
    const deleted = await socialService.deleteComment(req.params.commentId)
    
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: '评论不存在'
      })
    }

    res.json({
      success: true,
      message: '删除成功'
    })
  } catch (error) {
    console.error('Error deleting comment:', error)
    res.status(500).json({
      success: false,
      message: 'Failed to delete comment'
    })
  }
})

export default router
