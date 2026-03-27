import { Router, Request, Response } from 'express'
import multer from 'multer'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import fs from 'fs'

const router = Router()

// 确保上传目录存在
const uploadDir = path.join(process.cwd(), 'uploads')
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true })
}

// 配置 multer 存储
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const filename = `${uuidv4()}${ext}`
    cb(null, filename)
  }
})

// 文件过滤
const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp']
  const ext = path.extname(file.originalname).toLowerCase()
  
  if (allowedTypes.includes(ext)) {
    cb(null, true)
  } else {
    cb(new Error('不支持的文件类型'))
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
})

// POST /api/upload - 上传文件
router.post('/', upload.single('file'), (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: '没有文件上传'
      })
    }

    const fileUrl = `/uploads/${req.file.filename}`
    
    res.json({
      success: true,
      data: {
        filename: req.file.filename,
        originalName: req.file.originalname,
        size: req.file.size,
        mimetype: req.file.mimetype,
        url: fileUrl
      }
    })
  } catch (error) {
    console.error('Upload error:', error)
    res.status(500).json({
      success: false,
      message: '文件上传失败'
    })
  }
})

// 错误处理中间件
router.use((error: any, req: Request, res: Response, next: any) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        success: false,
        message: '文件大小超过限制（最大 5MB）'
      })
    }
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.message
    })
  }
  
  next()
})

export default router
