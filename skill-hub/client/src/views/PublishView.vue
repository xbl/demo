<template>
  <div class="publish-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">发布新 Skill</h1>
        <p class="page-desc">创建一个新的 Skill 与社区分享</p>
      </div>

      <form @submit.prevent="handleSubmit" class="publish-form">
        <!-- 基本信息 -->
        <div class="form-section">
          <h2 class="section-title">基本信息</h2>
          
          <div class="form-group">
            <label class="form-label">Skill 名称 *</label>
            <input 
              v-model="form.name"
              type="text" 
              class="form-input"
              placeholder="例如：天气查询助手"
              required
            />
          </div>

          <div class="form-group">
            <label class="form-label">简介 *</label>
            <textarea 
              v-model="form.description"
              class="form-textarea"
              placeholder="描述你的 Skill 能做什么..."
              rows="4"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label class="form-label">作者名称 *</label>
            <input 
              v-model="form.author"
              type="text" 
              class="form-input"
              placeholder="你的名字或团队名称"
              required
            />
          </div>
        </div>

        <!-- 分类和标签 -->
        <div class="form-section">
          <h2 class="section-title">分类和标签</h2>
          
          <div class="form-group">
            <label class="form-label">选择分类 *</label>
            <select v-model="form.categoryId" class="form-select" required>
              <option value="" disabled>请选择分类</option>
              <option 
                v-for="cat in categories" 
                :key="cat.id" 
                :value="cat.id"
              >
                {{ cat.icon }} {{ cat.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">标签</label>
            <div class="tags-input">
              <span 
                v-for="(tag, index) in form.tags" 
                :key="index" 
                class="tag-item"
              >
                {{ tag }}
                <button type="button" class="tag-remove" @click="removeTag(index)">×</button>
              </span>
              <input 
                v-model="tagInput"
                type="text" 
                class="tags-input-field"
                placeholder="输入标签后按回车添加"
                @keydown.enter.prevent="addTag"
              />
            </div>
            <p class="form-hint">按回车添加标签，最多 5 个</p>
          </div>
        </div>

        <!-- 图标 -->
        <div class="form-section">
          <h2 class="section-title">图标</h2>
          
          <div class="form-group">
            <label class="form-label">选择图标</label>
            <div class="icon-selector">
              <button 
                type="button"
                v-for="icon in iconOptions" 
                :key="icon"
                :class="['icon-option', { selected: form.icon === icon }]"
                @click="form.icon = icon"
              >
                {{ icon }}
              </button>
            </div>
          </div>
        </div>

        <!-- 提交 -->
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="goBack">
            取消
          </button>
          <button type="submit" class="btn btn-primary" :disabled="submitting">
            {{ submitting ? '发布中...' : '发布 Skill' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { skillApi } from '@/api/skill'
import type { SkillCategory } from '@/types'

const router = useRouter()
const submitting = ref(false)
const tagInput = ref('')

const categories = ref<SkillCategory[]>([])

const form = reactive({
  name: '',
  description: '',
  author: '',
  categoryId: '',
  tags: [] as string[],
  icon: '⚡'
})

const iconOptions = ['⚡', '🌤️', '📄', '🎬', '👀', '🖼️', '📊', '🔒', '🔌', '🤖', '🎨', '🛠️']

async function loadCategories() {
  try {
    const res = await skillApi.getCategories()
    categories.value = res.data.data || []
  } catch (e) {
    console.error('Failed to load categories:', e)
  }
}

function addTag() {
  const tag = tagInput.value.trim()
  if (tag && form.tags.length < 5 && !form.tags.includes(tag)) {
    form.tags.push(tag)
    tagInput.value = ''
  }
}

function removeTag(index: number) {
  form.tags.splice(index, 1)
}

async function handleSubmit() {
  if (!form.name || !form.description || !form.author || !form.categoryId) {
    alert('请填写所有必填字段')
    return
  }

  submitting.value = true
  try {
    await skillApi.createSkill({
      name: form.name,
      description: form.description,
      author: form.author,
      categoryId: form.categoryId,
      tags: form.tags,
      icon: form.icon
    })
    alert('发布成功！')
    router.push('/')
  } catch (e: any) {
    alert(e.response?.data?.message || '发布失败，请重试')
  } finally {
    submitting.value = false
  }
}

function goBack() {
  router.back()
}

onMounted(() => {
  loadCategories()
})
</script>

<style scoped>
.publish-page {
  padding: 2rem 0 4rem;
  min-height: 100vh;
}

.container {
  max-width: 720px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0.5rem;
}

.page-desc {
  color: rgba(255, 255, 255, 0.6);
}

.publish-form {
  background: #1a1a2e;
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.form-section {
  margin-bottom: 2rem;
}

.form-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1.25rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-label {
  display: block;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.form-input,
.form-textarea,
.form-select {
  width: 100%;
  background: #0f0f1a;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 0.875rem 1rem;
  color: #fff;
  font-size: 1rem;
  transition: all 0.2s;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-select {
  cursor: pointer;
}

.form-hint {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

/* Tags Input */
.tags-input {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  background: #0f0f1a;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 10px;
  padding: 0.5rem;
  min-height: 48px;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
}

.tag-remove {
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  padding: 0;
  font-size: 1rem;
  line-height: 1;
}

.tags-input-field {
  flex: 1;
  min-width: 120px;
  background: transparent;
  border: none;
  color: #fff;
  padding: 0.25rem 0.5rem;
}

.tags-input-field:focus {
  outline: none;
}

/* Icon Selector */
.icon-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.icon-option {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  background: #0f0f1a;
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
}

.icon-option:hover {
  border-color: #667eea;
}

.icon-option.selected {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.2);
}

/* Form Actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  font-size: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.15);
}
</style>
