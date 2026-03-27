import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dotenv from 'dotenv'
import skillsRouter from './routes/skills.js'
import categoriesRouter from './routes/categories.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Middleware
app.use(helmet())
app.use(cors())
app.use(express.json())

// API Routes
app.use('/api/skills', skillsRouter)
app.use('/api/categories', categoriesRouter)

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
