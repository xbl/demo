<template>
  <div class="category-page">
    <div class="container">
      <!-- Back Button -->
      <router-link to="/" class="back-link">
        ← 返回首页
      </router-link>

      <!-- Category Header -->
      <div class="category-header">
        <span class="category-icon-large">{{ category?.icon || '📁' }}</span>
        <div class="category-info">
          <h1 class="category-title">{{ categoryName }}</h1>
          <p class="category-count">{{ skills.length }} 个 Skills</p>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar">
        <div class="search-filter">
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="搜索此分类下的 Skills..."
            class="search-input"
            @input="handleSearch"
          />
        </div>
        <div class="sort-filter">
          <button 
            v-for="option in sortOptions" 
            :key="option.value"
            :class="['sort-btn', { active: sortBy === option.value }]"
            @click="sortBy = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </div>

      <!-- Skills Grid -->
      <div class="skills-grid" v-if="filteredSkills.length > 0">
        <SkillCard 
          v-for="skill in filteredSkills" 
          :key="skill.id" 
          :skill="skill"
        />
      </div>

      <!-- Empty State -->
      <div class="empty-state" v-else>
        <span class="empty-icon">🔍</span>
        <p>暂无匹配的 Skills</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { Skill, SkillCategory } from '@/types'
import { skillApi } from '@/api/skill'
import SkillCard from '@/components/SkillCard.vue'

const route = useRoute()
const categoryId = computed(() => route.params.id as string)

const category = ref<SkillCategory | null>(null)
const skills = ref<Skill[]>([])
const searchQuery = ref('')
const sortBy = ref<'recent' | 'popular' | 'stars'>('recent')

const sortOptions = [
  { value: 'recent' as const, label: '最新' },
  { value: 'popular' as const, label: '最热' },
  { value: 'stars' as const, label: '最多星' }
]

const categoryNameMap: Record<string, string> = {
  'dev': '开发工具',
  'ai': 'AI 智能',
  'media': '多媒体',
  'productivity': '效率提升',
  'data': '数据分析',
  'security': '安全合规',
  'featured': '精选推荐'
}

const categoryName = computed(() => {
  return categoryNameMap[categoryId.value] || category.value?.name || '全部分类'
})

const filteredSkills = computed(() => {
  let result = [...skills.value]
  
  // Filter by search
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(s => 
      s.name.toLowerCase().includes(query) ||
      s.description.toLowerCase().includes(query) ||
      s.tags.some(t => t.toLowerCase().includes(query))
    )
  }
  
  // Sort
  switch (sortBy.value) {
    case 'popular':
      result.sort((a, b) => b.downloads - a.downloads)
      break
    case 'stars':
      result.sort((a, b) => b.stars - a.stars)
      break
    case 'recent':
    default:
      result.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
  }
  
  return result
})

async function loadData() {
  try {
    if (categoryId.value === 'featured') {
      // Featured: 获取精选
      const res = await skillApi.getFeatured()
      skills.value = res.data.data || []
    } else {
      // Category: 获取分类下的 skills
      const res = await skillApi.getSkills({ category: categoryId.value })
      skills.value = res.data.data?.items || []
    }
    
    // 获取分类信息
    const catRes = await skillApi.getCategories()
    category.value = catRes.data.data?.find((c: SkillCategory) => c.id === categoryId.value) || null
  } catch (e) {
    console.error('Failed to load category:', e)
  }
}

function handleSearch() {
  // Search is handled by computed property
}

onMounted(() => {
  loadData()
})

watch(categoryId, () => {
  loadData()
})
</script>

<style scoped>
.category-page {
  padding: 2rem 0 4rem;
  min-height: 100vh;
}

.container {
  max-width: 1400px;
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
.category-header {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
}

.category-icon-large {
  font-size: 4rem;
}

.category-title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.25rem;
}

.category-count {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
}

/* Filter Bar */
.filter-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-filter {
  flex: 1;
  min-width: 280px;
}

.search-input {
  width: 100%;
  background: #1a1a2e;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 0.875rem 1.25rem;
  color: #fff;
  font-size: 1rem;
  transition: all 0.2s;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.sort-filter {
  display: flex;
  gap: 0.5rem;
  background: #1a1a2e;
  padding: 0.375rem;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.sort-btn {
  padding: 0.625rem 1rem;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-weight: 500;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
}

.sort-btn:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

.sort-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

/* Skills Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: rgba(255, 255, 255, 0.5);
}

.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.empty-state p {
  font-size: 1.125rem;
}

/* Responsive */
@media (max-width: 640px) {
  .category-header {
    flex-direction: column;
    text-align: center;
  }
  
  .filter-bar {
    flex-direction: column;
  }
  
  .sort-filter {
    width: 100%;
    justify-content: center;
  }
}
</style>
