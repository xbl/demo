<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">
          发现高质量 <span class="gradient-text">AI Agent Skills</span>
        </h1>
        <p class="hero-subtitle">
          精选各类 Skills，提升你的 AI 助手能力
        </p>
        
        <!-- Search Bar -->
        <div class="hero-search">
          <div class="search-bar">
            <input 
              v-model="searchQuery"
              type="text" 
              placeholder="搜索 Skills..."
              class="search-input-large"
              @keyup.enter="handleSearch"
            />
            <button class="search-btn" @click="handleSearch">
              🔍 搜索
            </button>
          </div>
          
          <!-- Suggestions -->
          <div class="suggestions" v-if="suggestions.length > 0">
            <span 
              v-for="s in suggestions" 
              :key="s"
              class="suggestion-tag"
              @click="searchByTag(s)"
            >
              {{ s }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Tags -->
    <section class="tags-section" v-if="popularTags.length > 0">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🏷️</span>
            热门标签
          </h2>
        </div>
        <div class="tags-cloud">
          <span 
            v-for="tag in popularTags" 
            :key="tag.tag"
            class="tag-item"
            @click="searchByTag(tag.tag)"
          >
            {{ tag.tag }}
            <span class="tag-count">{{ tag.count }}</span>
          </span>
        </div>
      </div>
    </section>

    <!-- Featured Skills Section -->
    <section class="featured">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">🔥</span>
            精选 Skills
          </h2>
          <router-link to="/category/featured" class="view-all">
            查看全部 →
          </router-link>
        </div>
        
        <div class="skills-grid">
          <SkillCard 
            v-for="skill in featuredSkills" 
            :key="skill.id" 
            :skill="skill"
          />
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <span class="icon">📁</span>
            分类浏览
          </h2>
        </div>
        
        <div class="categories-grid">
          <CategoryCard 
            v-for="category in categories" 
            :key="category.id" 
            :category="category"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import type { Skill, SkillCategory } from '@/types'
import SkillCard from '@/components/SkillCard.vue'
import CategoryCard from '@/components/CategoryCard.vue'
import { skillApi } from '@/api/skill'
import { searchApi } from '@/api/search'

const router = useRouter()
const searchQuery = ref('')
const suggestions = ref<string[]>([])
const popularTags = ref<{ tag: string; count: number }[]>([])

// 模拟数据（后端未就绪时使用）
const featuredSkills = ref<Skill[]>([
  {
    id: '1',
    name: 'Weather Query',
    description: '获取全球天气信息和天气预报，支持多种语言',
    author: 'CloudTeam',
    tags: ['天气', 'API', '实用工具'],
    downloads: 12500,
    stars: 892,
    featured: true,
    createdAt: '2026-03-15',
    updatedAt: '2026-03-20'
  },
  {
    id: '2',
    name: 'Document Parser',
    description: '智能解析 PDF、Word、Excel 等文档，提取关键信息',
    author: 'AI Labs',
    tags: ['文档', 'AI', 'OCR'],
    downloads: 8920,
    stars: 654,
    featured: true,
    createdAt: '2026-03-10',
    updatedAt: '2026-03-18'
  },
  {
    id: '3',
    name: 'Video Editor',
    description: '视频剪辑、添加字幕、特效处理一站式完成',
    author: 'MediaPro',
    tags: ['视频', '多媒体', '编辑'],
    downloads: 6540,
    stars: 421,
    featured: true,
    createdAt: '2026-03-08',
    updatedAt: '2026-03-15'
  },
  {
    id: '4',
    name: 'Code Review',
    description: '自动代码审查，提供优化建议和最佳实践',
    author: 'DevTools',
    tags: ['开发', '代码', '审查'],
    downloads: 9870,
    stars: 756,
    featured: true,
    createdAt: '2026-03-12',
    updatedAt: '2026-03-22'
  }
])

const categories = ref<SkillCategory[]>([
  { id: 'dev', name: '开发工具', icon: '🛠️', count: 156 },
  { id: 'ai', name: 'AI 智能', icon: '🤖', count: 89 },
  { id: 'media', name: '多媒体', icon: '🎨', count: 67 },
  { id: 'productivity', name: '效率提升', icon: '⚡', count: 124 },
  { id: 'data', name: '数据分析', icon: '📊', count: 45 },
  { id: 'security', name: '安全合规', icon: '🔒', count: 32 }
])

async function loadFeatured() {
  try {
    const res = await skillApi.getFeatured()
    if (res.data.success && res.data.data.length > 0) {
      featuredSkills.value = res.data.data
    }
  } catch (e) {
    console.log('Using mock data')
  }
}

async function loadCategories() {
  try {
    const res = await skillApi.getCategories()
    if (res.data.success) {
      categories.value = res.data.data
    }
  } catch (e) {
    console.log('Using mock categories')
  }
}

async function loadPopularTags() {
  try {
    const res = await searchApi.getPopularTags(15)
    if (res.data.success) {
      popularTags.value = res.data.data
    }
  } catch (e) {
    console.log('No popular tags')
  }
}

async function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({ name: 'search', query: { q: searchQuery.value } })
  }
}

function searchByTag(tag: string) {
  router.push({ name: 'search', query: { q: tag } })
}

onMounted(() => {
  loadFeatured()
  loadCategories()
  loadPopularTags()
})
</script>

<style scoped>
.home {
  background: #0f0f1a;
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Hero Section */
.hero {
  padding: 4rem 0 3rem;
  text-align: center;
  background: linear-gradient(180deg, rgba(102, 126, 234, 0.15) 0%, transparent 100%);
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
}

.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #f093fb 50%, #f5576c 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 2rem;
}

/* Search Bar */
.hero-search {
  max-width: 600px;
  margin: 0 auto;
}

.search-bar {
  display: flex;
  gap: 0.5rem;
}

.search-input-large {
  flex: 1;
  background: #1a1a2e;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 14px;
  padding: 1rem 1.5rem;
  color: #fff;
  font-size: 1.125rem;
  transition: all 0.2s;
}

.search-input-large:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.2);
}

.search-input-large::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-btn {
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 14px;
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}

.search-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.suggestions {
  margin-top: 0.75rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
}

.suggestion-tag {
  padding: 0.25rem 0.75rem;
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
  border-radius: 20px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}

.suggestion-tag:hover {
  background: rgba(102, 126, 234, 0.4);
}

/* Tags Section */
.tags-section {
  padding: 2rem 0;
}

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.5rem 1rem;
  background: #1a1a2e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  color: #fff;
  font-size: 0.9375rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tag-item:hover {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.15);
}

.tag-count {
  background: rgba(102, 126, 234, 0.3);
  color: #667eea;
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
}

/* Section Styles */
.featured, .categories {
  padding: 3rem 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.icon {
  font-size: 1.25rem;
}

.view-all {
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
}

.view-all:hover {
  text-decoration: underline;
}

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Categories Grid */
.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
</style>
