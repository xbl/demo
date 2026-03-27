<template>
  <div class="search-page">
    <div class="container">
      <!-- Search Header -->
      <div class="search-header">
        <h1 class="search-title">
          搜索结果: <span class="keyword">{{ keyword }}</span>
        </h1>
        <p class="result-count">找到 {{ total }} 个结果</p>
      </div>

      <!-- Filter Bar -->
      <div class="filter-bar">
        <div class="search-input-wrapper">
          <input 
            v-model="keyword"
            type="text" 
            placeholder="搜索 Skills..."
            class="search-input"
            @keyup.enter="handleSearch"
          />
          <button class="search-btn" @click="handleSearch">搜索</button>
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

      <!-- Loading -->
      <div class="loading" v-if="loading">
        <div class="spinner"></div>
      </div>

      <!-- Results -->
      <div class="skills-grid" v-else-if="results.length > 0">
        <SkillCard 
          v-for="skill in results" 
          :key="skill.id" 
          :skill="skill"
        />
      </div>

      <!-- Empty -->
      <div class="empty-state" v-else>
        <span class="empty-icon">🔍</span>
        <p>未找到相关 Skills</p>
        <p class="empty-hint">试试其他关键词</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { Skill } from '@/types'
import { skillApi } from '@/api/skill'
import SkillCard from '@/components/SkillCard.vue'

const route = useRoute()
const router = useRouter()

const keyword = ref((route.query.q as string) || '')
const results = ref<Skill[]>([])
const total = ref(0)
const loading = ref(false)
const sortBy = ref<'recent' | 'popular' | 'stars'>('popular')

const sortOptions = [
  { value: 'popular', label: '最热' },
  { value: 'recent', label: '最新' },
  { value: 'stars', label: '最多星' }
]

async function search() {
  if (!keyword.value.trim()) {
    results.value = []
    total.value = 0
    return
  }

  loading.value = true
  try {
    const res = await skillApi.getSkills({
      search: keyword.value,
      sort: sortBy.value,
      page: 1,
      pageSize: 50
    })
    results.value = res.data.data?.items || []
    total.value = res.data.data?.total || 0
  } catch (e) {
    console.error('Search failed:', e)
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  router.push({ name: 'search', query: { q: keyword.value } })
  search()
}

watch(sortBy, () => {
  search()
})

onMounted(() => {
  if (keyword.value) {
    search()
  }
})
</script>

<style scoped>
.search-page {
  padding: 2rem 0 4rem;
  min-height: 100vh;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* Header */
.search-header {
  margin-bottom: 2rem;
}

.search-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}

.keyword {
  color: #667eea;
}

.result-count {
  color: rgba(255, 255, 255, 0.6);
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

.search-input-wrapper {
  display: flex;
  gap: 0.5rem;
  flex: 1;
  min-width: 280px;
}

.search-input {
  flex: 1;
  background: #1a1a2e;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  padding: 0.875rem 1.25rem;
  color: #fff;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
}

.search-btn {
  padding: 0.875rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.search-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
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

.sort-btn.active {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

/* Grid */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* Loading */
.loading {
  display: flex;
  justify-content: center;
  padding: 4rem;
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

/* Empty */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.125rem;
}

.empty-hint {
  color: rgba(255, 255, 255, 0.4) !important;
  font-size: 0.875rem !important;
  margin-top: 0.5rem;
}
</style>
