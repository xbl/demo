import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import path from 'path'
import skillsRouter from './routes/skills.js'
import categoriesRouter from './routes/categories.js'
import socialRouter from './routes/social.js'
import searchRouter from './routes/search.js'
import uploadRouter from './routes/upload.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

// 静态文件服务（上传的文件）
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')))

// API Routes
app.use('/api/skills', skillsRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/social', socialRouter)
app.use('/api/search', searchRouter)

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  })
})

// Error handler
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack)
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`📊 API Base: http://localhost:${PORT}/api`)
})
