<template>
  <router-link :to="`/category/${category.id}`" class="category-card">
    <span class="category-icon">{{ category.icon }}</span>
    <span class="category-name">{{ category.name }}</span>
    <span class="category-count">{{ category.count }} 个</span>
  </router-link>
</template>

<script setup lang="ts">
import type { SkillCategory } from '@/types'

defineProps<{
  category: SkillCategory
}>()
</script>

<style scoped>
.category-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.category-card:hover {
  transform: translateY(-4px);
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.15);
  box-shadow: 0 8px 24px rgba(102, 126, 234, 0.2);
}

.category-icon {
  font-size: 2.5rem;
}

.category-name {
  color: #fff;
  font-weight: 600;
  font-size: 1rem;
}

.category-count {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
}
</style>
