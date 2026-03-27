<template>
  <div class="my-skills-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">我的 Skills</h1>
        <router-link to="/publish" class="btn btn-primary">
          <span>➕</span> 发布新 Skill
        </router-link>
      </div>

      <!-- Loading -->
      <div class="loading" v-if="loading">
        <div class="spinner"></div>
      </div>

      <!-- Skills List -->
      <div class="skills-list" v-else-if="skills.length > 0">
        <div 
          v-for="skill in skills" 
          :key="skill.id" 
          class="skill-item"
        >
          <div class="skill-icon">{{ skill.icon || '⚡' }}</div>
          
          <div class="skill-info">
            <h3 class="skill-name">{{ skill.name }}</h3>
            <p class="skill-desc">{{ skill.description }}</p>
            <div class="skill-meta">
              <span class="meta-item">
                <span>📥</span> {{ skill.downloads }}
              </span>
              <span class="meta-item">
                <span>⭐</span> {{ skill.stars }}
              </span>
              <span class="meta-item">
                <span>🏷️</span> {{ skill.categoryId }}
              </span>
            </div>
          </div>

          <div class="skill-actions">
            <button class="btn btn-icon" @click="editSkill(skill.id)" title="编辑">
              ✏️
            </button>
            <button class="btn btn-icon btn-danger" @click="confirmDelete(skill)" title="删除">
              🗑️
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div class="empty-state" v-else>
        <span class="empty-icon">📦</span>
        <p>还没有发布任何 Skill</p>
        <router-link to="/publish" class="btn btn-primary">
          发布第一个 Skill
        </router-link>
      </div>
    </div>

    <!-- Delete Confirm Modal -->
    <div class="modal-overlay" v-if="deleteTarget" @click="deleteTarget = null">
      <div class="modal" @click.stop>
        <h3>确认删除</h3>
        <p>确定要删除 "{{ deleteTarget.name }}" 吗？此操作无法撤销。</p>
        <div class="modal-actions">
          <button class="btn btn-secondary" @click="deleteTarget = null">取消</button>
          <button class="btn btn-danger" @click="handleDelete">确认删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { skillApi } from '@/api/skill'
import type { Skill } from '@/types'

const router = useRouter()
const loading = ref(false)
const skills = ref<Skill[]>([])
const deleteTarget = ref<Skill | null>(null)

async function loadSkills() {
  loading.value = true
  try {
    const res = await skillApi.getSkills({ pageSize: 100 })
    skills.value = res.data.data?.items || []
  } catch (e) {
    console.error('Failed to load skills:', e)
  } finally {
    loading.value = false
  }
}

function editSkill(id: string) {
  // TODO: 跳转编辑页
  router.push(`/skills/${id}`)
}

function confirmDelete(skill: Skill) {
  deleteTarget.value = skill
}

async function handleDelete() {
  if (!deleteTarget.value) return

  try {
    await skillApi.deleteSkill(deleteTarget.value.id)
    skills.value = skills.value.filter(s => s.id !== deleteTarget.value!.id)
    deleteTarget.value = null
    alert('删除成功')
  } catch (e) {
    alert('删除失败')
  }
}

onMounted(() => {
  loadSkills()
})
</script>

<style scoped>
.my-skills-page {
  padding: 2rem 0 4rem;
  min-height: 100vh;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
}

/* Skills List */
.skills-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: #1a1a2e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 1.25rem;
  transition: all 0.2s;
}

.skill-item:hover {
  border-color: #667eea;
}

.skill-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  flex-shrink: 0;
}

.skill-info {
  flex: 1;
  min-width: 0;
}

.skill-name {
  font-size: 1.125rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 0.25rem;
}

.skill-desc {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skill-meta {
  display: flex;
  gap: 1rem;
}

.meta-item {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.skill-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: rgba(255, 255, 255, 0.15);
}

.btn-icon.btn-danger:hover {
  background: rgba(239, 68, 68, 0.2);
}

/* Empty State */
.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  background: #1a1a2e;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.empty-icon {
  font-size: 4rem;
  display: block;
  margin-bottom: 1rem;
}

.empty-state p {
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.5rem;
}

/* Button */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1.25rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-danger {
  background: #ef4444;
  color: #fff;
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

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: #1a1a2e;
  border-radius: 16px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.modal h3 {
  color: #fff;
  margin-bottom: 1rem;
}

.modal p {
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 1.5rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}
</style>
