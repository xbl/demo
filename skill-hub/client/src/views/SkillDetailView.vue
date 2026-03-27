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
          <button class="btn btn-primary btn-large">
            <span>🚀</span> 使用此 Skill
          </button>
          <button class="btn btn-secondary">
            <span>⭐</span> {{ skill.stars }}
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
          <span class="stat-value">{{ skill.stars }}</span>
          <span class="stat-label">Stars</span>
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

      <!-- Features -->
      <div class="section">
        <h2 class="section-title">✨ 功能特性</h2>
        <div class="features-grid">
          <div class="feature-card">
            <span class="feature-icon">🎯</span>
            <h3>精准识别</h3>
            <p>采用先进的 AI 算法，确保识别准确率达到行业领先水平</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">⚡</span>
            <h3>快速响应</h3>
            <p>优化算法实现毫秒级响应，提升工作效率</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🔒</span>
            <h3>安全可靠</h3>
            <p>企业级安全标准，保护用户数据隐私</p>
          </div>
          <div class="feature-card">
            <span class="feature-icon">🌍</span>
            <h3>多语言支持</h3>
            <p>支持全球主要语言，满足国际化需求</p>
          </div>
        </div>
      </div>

      <!-- Usage -->
      <div class="section">
        <h2 class="section-title">📖 使用方法</h2>
        <div class="code-block">
          <div class="code-header">
            <span>JavaScript / TypeScript</span>
            <button class="copy-btn">复制</button>
          </div>
          <pre><code>import { SkillHub } from '@skillhub/client'

const skill = new SkillHub('{{ skill.name }}')

// 调用 Skill
const result = await skill.execute({
  input: 'your input here'
})

console.log(result)</code></pre>
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Skill } from '@/types'
import { skillApi } from '@/api/skill'

const route = useRoute()
const skill = ref<Skill | null>(null)

onMounted(async () => {
  try {
    const res = await skillApi.getSkill(route.params.id as string)
    if (res.data.success) {
      skill.value = res.data.data
    }
  } catch (e) {
    console.error('Failed to load skill:', e)
  }
})

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
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

.btn-primary:hover {
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

/* Stats */
.stats-row {
  display: flex;
  gap: 2rem;
  padding: 1.5rem;
  background: #1a1a2e;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
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

/* Features */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.feature-card {
  padding: 1.5rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
}

.feature-card:hover {
  border-color: #667eea;
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 0.75rem;
}

.feature-card h3 {
  color: #fff;
  font-size: 1.125rem;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  line-height: 1.6;
}

/* Code Block */
.code-block {
  background: #0d1117;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.code-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(255, 255, 255, 0.05);
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
}

.copy-btn {
  background: rgba(102, 126, 234, 0.3);
  border: none;
  color: #667eea;
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.75rem;
}

.copy-btn:hover {
  background: rgba(102, 126, 234, 0.5);
}

.code-block pre {
  padding: 1rem;
  overflow-x: auto;
  margin: 0;
}

.code-block code {
  color: #e6edf3;
  font-family: 'Fira Code', 'Consolas', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
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
  }

  .stats-row {
    justify-content: center;
  }
}
</style>
