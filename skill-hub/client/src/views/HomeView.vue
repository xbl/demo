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
          <router-link to="/categories/featured" class="view-all">
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
import type { Skill, SkillCategory } from '@/types'
import SkillCard from '@/components/SkillCard.vue'
import CategoryCard from '@/components/CategoryCard.vue'
import { skillApi } from '@/api/skill'

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

onMounted(async () => {
  try {
    const res = await skillApi.getFeatured()
    if (res.data.success && res.data.data.length > 0) {
      featuredSkills.value = res.data.data
    }
  } catch (e) {
    console.log('Using mock data')
  }
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
  padding: 4rem 0;
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
