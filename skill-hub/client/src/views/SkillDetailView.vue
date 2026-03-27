<template>
  <div class="skill-detail" v-if="skill">
    <div class="container">
      <!-- Back Button -->
      <router-link to="/" class="back-link">
        ← 返回首页
      </router-link>

      <!-- Skill Header -->
      <div class="skill-header">
        <div class="skill-icon-large">
          {{ skill.icon || '⚡' }}
        </div>
        <div class="skill-info">
          <h1 class="skill-title">{{ skill.name }}</h1>
          <div class="skill-meta">
            <span class="author-info">
              <span class="author-avatar">{{ skill.author[0] }}</span>
              <span>{{ skill.author }}</span>
            </span>
            <span class="divider">•</span>
            <span>更新于 {{ skill.updatedAt }}</span>
          </div>
          <div class="skill-tags-large">
            <span v-for="tag in skill.tags" :key="tag" class="tag-large">
              {{ tag }}
            </span>
          </div>
        </div>
        <div class="skill-actions">
          <button 
            class="btn btn-primary btn-large"
            @click="useSkill"
          >
            <span>🚀</span> 使用此 Skill
          </button>
          
          <!-- Like Button -->
          <button 
            :class="['btn', stats?.isLiked ? 'btn-liked' : 'btn-secondary', { 'btn-loading': liking }]"
            @click="handleLike"
            :disabled="liking"
          >
            <span>{{ stats?.isLiked ? '❤️' : '🤍' }}</span> 
            {{ stats?.likes || 0 }}
          </button>
          
          <!-- Favorite Button -->
          <button 
            :class="['btn', isFavorited ? 'btn-favorited' : 'btn-secondary', { 'btn-loading': favoriting }]"
            @click="handleFavorite"
          >
            <span>{{ isFavorited ? '⭐' : '☆' }}</span>
            {{ isFavorited ? '已收藏' : '收藏' }}
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-row">
        <div class="stat-item">
          <span class="stat-icon">📥</span>
          <span class="stat-value">{{ formatNumber(skill.downloads) }}</span>
          <span class="stat-label">下载</span>
        </div>
        <div class="stat-item">
          <span class="stat-icon">⭐</span>
          <span class="stat-value">{{ stats?.likes || 0 }}</span>
          <span class="stat-label">点赞</span>
        </div>
        <div class="stat-item">
          <span class="stat-icon">💬</span>
          <span class="stat-value">{{ stats?.comments || 0 }}</span>
          <span class="stat-label">评论</span>
        </div>
        <div class="stat-item">
          <span class="stat-icon">🏷️</span>
          <span class="stat-value">{{ skill.tags.length }}</span>
          <span class="stat-label">标签</span>
        </div>
      </div>

      <!-- Description -->
      <div class="section">
        <h2 class="section-title">📝 简介</h2>
        <p class="description">{{ skill.description }}</p>
      </div>

      <!-- Scores Section -->
      <div class="section" v-if="skill.scores">
        <h2 class="section-title">📊 评分</h2>
        <div class="scores-grid">
          <div class="score-item security">
            <span class="score-icon">🛡️</span>
            <span class="score-label">安全性</span>
            <span class="score-value">{{ skill.scores.security }}/10</span>
            <div class="score-bar">
              <div class="score-fill" :style="{ width: (skill.scores.security * 10) + '%' }"></div>
            </div>
          </div>
          <div class="score-item clarity">
            <span class="score-icon">💡</span>
            <span class="score-label">清晰度</span>
            <span class="score-value">{{ skill.scores.clarity }}/10</span>
            <div class="score-bar">
              <div class="score-fill" :style="{ width: (skill.scores.clarity * 10) + '%' }"></div>
            </div>
          </div>
          <div class="score-item practicality">
            <span class="score-icon">⚙️</span>
            <span class="score-label">实用性</span>
            <span class="score-value">{{ skill.scores.practicality }}/10</span>
            <div class="score-bar">
              <div class="score-fill" :style="{ width: (skill.scores.practicality * 10) + '%' }"></div>
            </div>
          </div>
          <div class="score-item quality">
            <span class="score-icon">✨</span>
            <span class="score-label">质量</span>
            <span class="score-value">{{ skill.scores.quality }}/10</span>
            <div class="score-bar">
              <div class="score-fill" :style="{ width: (skill.scores.quality * 10) + '%' }"></div>
            </div>
          </div>
          <div class="score-item maintainability">
            <span class="score-icon">🔧</span>
            <span class="score-label">可维护性</span>
            <span class="score-value">{{ skill.scores.maintainability }}/10</span>
            <div class="score-bar">
              <div class="score-fill" :style="{ width: (skill.scores.maintainability * 10) + '%' }"></div>
            </div>
          </div>
          <div class="score-item innovation">
            <span class="score-icon">🚀</span>
            <span class="score-label">创新性</span>
            <span class="score-value">{{ skill.scores.innovation }}/10</span>
            <div class="score-bar">
              <div class="score-fill" :style="{ width: (skill.scores.innovation * 10) + '%' }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Output Preview Section -->
      <div class="section" v-if="skill.outputPreview">
        <h2 class="section-title">👁️ 输出预览</h2>
        <div class="output-preview">
          <div class="preview-header">
            <span class="preview-title">output_preview.md</span>
            <button class="copy-btn" @click="copyOutput">
              📋 复制
            </button>
          </div>
          <pre class="preview-content"><code>{{ skill.outputPreview }}</code></pre>
        </div>
      </div>

      <!-- Compatible Agents -->
      <div class="section" v-if="skill.compatibleAgents && skill.compatibleAgents.length > 0">
        <h2 class="section-title">🤖 兼容 Agents</h2>
        <div class="agents-grid">
          <div 
            v-for="agent in skill.compatibleAgents" 
            :key="agent"
            class="agent-item"
          >
            <span class="agent-icon">{{ getAgentIcon(agent) }}</span>
            <span class="agent-name">{{ getAgentName(agent) }}</span>
          </div>
        </div>
      </div>

      <!-- SKILL.md Section -->
      <div class="section" v-if="skill.skillMd">
        <h2 class="section-title">📄 SKILL.md</h2>
        <div class="skill-md-content">
          <pre><code>{{ skill.skillMd }}</code></pre>
        </div>
      </div>

      <!-- Comments Section -->
      <div class="section">
        <h2 class="section-title">💬 评论 ({{ comments.length }})</h2>
        
        <!-- Comment Form -->
        <div class="comment-form">
          <textarea 
            v-model="newComment"
            class="comment-input"
            placeholder="发表评论..."
            rows="3"
            maxlength="500"
          ></textarea>
          <div class="comment-form-footer">
            <span class="char-count">{{ newComment.length }}/500</span>
            <button 
              class="btn btn-primary"
              @click="submitComment"
              :disabled="!newComment.trim() || submitting"
            >
              {{ submitting ? '提交中...' : '发表评论' }}
            </button>
          </div>
        </div>

        <!-- Comments List -->
        <div class="comments-list" v-if="comments.length > 0">
          <div 
            v-for="comment in comments" 
            :key="comment.id"
            class="comment-item"
          >
            <div class="comment-avatar">👤</div>
            <div class="comment-content">
              <div class="comment-header">
                <span class="comment-author">匿名用户</span>
                <span class="comment-time">{{ formatDate(comment.createdAt) }}</span>
              </div>
              <p class="comment-text">{{ comment.content }}</p>
            </div>
          </div>
        </div>
        
        <div class="empty-comments" v-else>
          <span>暂无评论，快来发表第一条评论吧！</span>
        </div>
      </div>
    </div>
  </div>

  <!-- Loading State -->
  <div class="loading" v-else>
    <div class="spinner"></div>
    <p>加载中...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import type { Skill } from '@/types'
import { skillApi } from '@/api/skill'
import { socialApi } from '@/api/social'

const route = useRoute()
const skill = ref<Skill | null>(null)
const stats = ref<{ likes: number; comments: number; isLiked: boolean } | null>(null)
const comments = ref<any[]>([])
const newComment = ref('')
const submitting = ref(false)
const liking = ref(false)
const favoriting = ref(false)

// 从 localStorage 获取收藏列表
const favorites = reactive(new Set<string>(
  JSON.parse(localStorage.getItem('skillhub_favorites') || '[]')
))

const isFavorited = computed(() => favorites.has(route.params.id as string))

onMounted(async () => {
  try {
    const skillRes = await skillApi.getSkill(route.params.id as string)
    if (skillRes.data.success) {
      skill.value = skillRes.data.data
    }
    
    // 加载统计数据
    const statsRes = await socialApi.getStats(route.params.id as string)
    if (statsRes.data.success) {
      stats.value = statsRes.data.data
    }
    
    // 加载评论
    const commentsRes = await socialApi.getComments(route.params.id as string)
    if (commentsRes.data.success) {
      comments.value = commentsRes.data.data || []
    }
  } catch (e) {
    console.error('Failed to load skill:', e)
  }
})

async function handleLike() {
  liking.value = true
  try {
    const res = await socialApi.toggleLike(route.params.id as string)
    if (res.data.success) {
      stats.value = {
        ...stats.value!,
        likes: res.data.data.count,
        isLiked: res.data.data.liked
      }
    }
  } catch (e) {
    console.error('Like failed:', e)
  } finally {
    liking.value = false
  }
}

function handleFavorite() {
  const skillId = route.params.id as string
  if (favorites.has(skillId)) {
    favorites.delete(skillId)
  } else {
    favorites.add(skillId)
  }
  localStorage.setItem('skillhub_favorites', JSON.stringify([...favorites]))
}

async function submitComment() {
  if (!newComment.value.trim()) return
  
  submitting.value = true
  try {
    const res = await socialApi.createComment(route.params.id as string, newComment.value)
    if (res.data.success) {
      comments.value.unshift(res.data.data)
      newComment.value = ''
      stats.value!.comments++
    }
  } catch (e: any) {
    alert(e.response?.data?.message || '评论失败')
  } finally {
    submitting.value = false
  }
}

function useSkill() {
  alert('Skill 使用功能开发中...')
}

function copyOutput() {
  if (skill.value?.outputPreview) {
    navigator.clipboard.writeText(skill.value.outputPreview)
    alert('已复制到剪贴板！')
  }
}

function getAgentIcon(agent: string): string {
  const icons: Record<string, string> = {
    'claude-code': '🦁',
    'openclaw': '🦞',
    'cursor': '💻',
    'vscode': '📘',
    'codex': '⚡',
    'gemini': '🌟',
    'opencode': '🔵',
  }
  return icons[agent] || '🤖'
}

function getAgentName(agent: string): string {
  const names: Record<string, string> = {
    'claude-code': 'Claude Code',
    'openclaw': 'OpenClaw',
    'cursor': 'Cursor',
    'vscode': 'VS Code',
    'codex': 'Codex CLI',
    'gemini': 'Gemini CLI',
    'opencode': 'OpenCode',
  }
  return names[agent] || agent
}

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return '刚刚'
  if (minutes < 60) return `${minutes}分钟前`
  if (hours < 24) return `${hours}小时前`
  if (days < 7) return `${days}天前`
  
  return date.toLocaleDateString('zh-CN')
}
</script>

<style scoped>
.skill-detail {
  padding: 2rem 0 4rem;
  min-height: 100vh;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.back-link {
  display: inline-block;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  margin-bottom: 1.5rem;
  transition: color 0.2s;
}

.back-link:hover {
  color: #fff;
}

/* Header */
.skill-header {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.skill-icon-large {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  flex-shrink: 0;
}

.skill-info {
  flex: 1;
  min-width: 200px;
}

.skill-title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.75rem;
}

.skill-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.author-avatar {
  width: 24px;
  height: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.75rem;
  color: #fff;
  font-weight: 600;
}

.divider {
  opacity: 0.5;
}

.skill-tags-large {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag-large {
  padding: 0.375rem 0.875rem;
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
}

.skill-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-large {
  padding: 1rem 2rem;
  font-size: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}

.btn-liked {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.btn-favorited {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
  border: 1px solid rgba(251, 191, 36, 0.3);
}

.btn-loading {
  opacity: 0.6;
  cursor: wait;
}

/* Stats */
.stats-row {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: #1a1a2e;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}

.stat-icon {
  font-size: 1.5rem;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
}

.stat-label {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
}

/* Sections */
.section {
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
}

.description {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.8;
  font-size: 1rem;
}

/* Scores */
.scores-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.score-item {
  background: #1a1a2e;
  border-radius: 12px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.score-icon {
  font-size: 1.25rem;
  display: block;
  margin-bottom: 0.25rem;
}

.score-label {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
}

.score-value {
  color: #fff;
  font-weight: 700;
  font-size: 1.125rem;
  display: block;
  margin-bottom: 0.5rem;
}

.score-bar {
  height: 6px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
  overflow: hidden;
}

.score-fill {
  height: 100%;
  background: linear-gradient(90deg, #667eea, #764ba2);
  border-radius: 3px;
  transition: width 0.3s;
}

/* Output Preview */
.output-preview {
  background: #1e1e1e;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #2d2d2d;
  border-bottom: 1px solid #3d3d3d;
}

.preview-title {
  font-family: monospace;
  font-size: 0.875rem;
  color: #aaa;
}

.copy-btn {
  background: #3d3d3d;
  border: none;
  color: #fff;
  padding: 0.375rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.75rem;
  transition: background 0.2s;
}

.copy-btn:hover {
  background: #4d4d4d;
}

.preview-content {
  padding: 1rem;
  margin: 0;
  overflow-x: auto;
  max-height: 400px;
  color: #ccc;
  font-size: 0.875rem;
  line-height: 1.6;
}

/* Agents */
.agents-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
}

.agent-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #1a1a2e;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.agent-icon {
  font-size: 1.25rem;
}

.agent-name {
  color: #fff;
  font-size: 0.875rem;
}

/* SKILL.md */
.skill-md-content {
  background: #1a1a2e;
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow-x: auto;
}

.skill-md-content pre {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  line-height: 1.6;
}

/* Comments */
.comment-form {
  background: #1a1a2e;
  border-radius: 16px;
  padding: 1.25rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.comment-input {
  width: 100%;
  background: #0f0f1a;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 0.875rem 1rem;
  color: #fff;
  font-size: 1rem;
  resize: vertical;
  min-height: 80px;
}

.comment-input:focus {
  outline: none;
  border-color: #667eea;
}

.comment-form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.75rem;
}

.char-count {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.comment-item {
  display: flex;
  gap: 1rem;
  padding: 1.25rem;
  background: #1a1a2e;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.comment-avatar {
  width: 40px;
  height: 40px;
  background: rgba(102, 126, 234, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.comment-author {
  color: #fff;
  font-weight: 600;
}

.comment-time {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
}

.comment-text {
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.6;
}

.empty-comments {
  text-align: center;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.5);
  background: #1a1a2e;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Loading */
.loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: rgba(255, 255, 255, 0.6);
}

.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 768px) {
  .skill-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .skill-actions {
    flex-direction: row;
    width: 100%;
    justify-content: center;
  }

  .stats-row {
    justify-content: center;
  }
}
</style>
