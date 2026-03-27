<template>
  <router-link :to="`/skills/${skill.id}`" class="skill-card">
    <div class="card-header">
      <div class="skill-icon">
        {{ skill.icon || '⚡' }}
      </div>
      <div class="skill-badges">
        <span v-if="skill.featured" class="badge badge-featured">精选</span>
      </div>
    </div>
    
    <h3 class="skill-name">{{ skill.name }}</h3>
    <p class="skill-description">{{ skill.description }}</p>
    
    <div class="skill-tags">
      <span v-for="tag in skill.tags.slice(0, 3)" :key="tag" class="tag">
        {{ tag }}
      </span>
    </div>
    
    <div class="card-footer">
      <div class="author">
        <span class="author-avatar">{{ skill.author[0] }}</span>
        <span class="author-name">{{ skill.author }}</span>
      </div>
      <div class="stats">
        <span class="stat">
          <span class="stat-icon">⭐</span>
          {{ skill.stars }}
        </span>
        <span class="stat">
          <span class="stat-icon">📥</span>
          {{ formatNumber(skill.downloads) }}
        </span>
      </div>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import type { Skill } from '@/types'

defineProps<{
  skill: Skill
}>()

function formatNumber(num: number): string {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'k'
  }
  return num.toString()
}
</script>

<style scoped>
.skill-card {
  display: flex;
  flex-direction: column;
  background: #1a1a2e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.5rem;
  text-decoration: none;
  transition: all 0.3s ease;
}

.skill-card:hover {
  transform: translateY(-4px);
  border-color: #667eea;
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.skill-icon {
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.badge-featured {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: #fff;
}

.skill-name {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.5rem;
}

.skill-description {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1rem;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tag {
  padding: 0.25rem 0.5rem;
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
  border-radius: 6px;
  font-size: 0.75rem;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.author {
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

.author-name {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
}

.stats {
  display: flex;
  gap: 0.75rem;
}

.stat {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
}

.stat-icon {
  font-size: 0.875rem;
}
</style>
