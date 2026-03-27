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
            <label class="form-label">分类 *</label>
            <select v-model="form.categoryId" class="form-select" required>
              <option value="">选择分类</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">
                {{ cat.icon }} {{ cat.name }}
              </option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">标签</label>
            <input 
              v-model="tagInput"
              type="text" 
              class="form-input"
              placeholder="输入标签，按回车添加"
              @keydown.enter.prevent="addTag"
            />
            <div class="tags-preview">
              <span v-for="(tag, index) in form.tags" :key="index" class="tag-item">
                {{ tag }}
                <button type="button" class="tag-remove" @click="removeTag(index)">×</button>
              </span>
            </div>
          </div>
        </div>

        <!-- SKILL.md 内容 -->
        <div class="form-section">
          <h2 class="section-title">📄 SKILL.md 内容</h2>
          <p class="section-desc">按照标准格式编写 Skill 描述，支持以下字段：</p>
          
          <div class="skill-md-editor">
            <textarea 
              v-model="form.skillMd"
              class="form-textarea code"
              placeholder="# name: <skill-name>
# description: <描述>

<objective>
Skill 的目标和解决的问题
</objective>

<trigger_pattern>
何时自动触发此 Skill
</trigger_pattern>

<action>
Skill 的具体执行逻辑
</action>

<output_format>
输出格式说明
</output_format>

<examples>
使用示例
</examples>"
              rows="20"
            ></textarea>
          </div>

          <div class="skill-md-preview" v-if="form.skillMd">
            <h4>预览</h4>
            <pre class="preview-content"><code>{{ form.skillMd }}</code></pre>
          </div>
        </div>

        <!-- Output Preview -->
        <div class="form-section">
          <h2 class="section-title">👁️ 输出预览</h2>
          <p class="section-desc">展示 Skill 的实际输出效果（可选）</p>
          
          <textarea 
            v-model="form.outputPreview"
            class="form-textarea code"
            placeholder="展示 Skill 的示例输出..."
            rows="10"
          ></textarea>
        </div>

        <!-- 评分设置 -->
        <div class="form-section">
          <h2 class="section-title">📊 评分设置</h2>
          <p class="section-desc">为你的 Skill 设置评分（可选）</p>
          
          <div class="scores-input">
            <div class="score-row">
              <label>🛡️ 安全性</label>
              <input 
                type="range" 
                v-model.number="form.scores.security" 
                min="0" max="10" 
                step="1"
              />
              <span>{{ form.scores.security }}/10</span>
            </div>
            <div class="score-row">
              <label>💡 清晰度</label>
              <input 
                type="range" 
                v-model.number="form.scores.clarity" 
                min="0" max="10" 
                step="1"
              />
              <span>{{ form.scores.clarity }}/10</span>
            </div>
            <div class="score-row">
              <label>⚙️ 实用性</label>
              <input 
                type="range" 
                v-model.number="form.scores.practicality" 
                min="0" max="10" 
                step="1"
              />
              <span>{{ form.scores.practicality }}/10</span>
            </div>
            <div class="score-row">
              <label>✨ 质量</label>
              <input 
                type="range" 
                v-model.number="form.scores.quality" 
                min="0" max="10" 
                step="1"
              />
              <span>{{ form.scores.quality }}/10</span>
            </div>
            <div class="score-row">
              <label>🔧 可维护性</label>
              <input 
                type="range" 
                v-model.number="form.scores.maintainability" 
                min="0" max="10" 
                step="1"
              />
              <span>{{ form.scores.maintainability }}/10</span>
            </div>
            <div class="score-row">
              <label>🚀 创新性</label>
              <input 
                type="range" 
                v-model.number="form.scores.innovation" 
                min="0" max="10" 
                step="1"
              />
              <span>{{ form.scores.innovation }}/10</span>
            </div>
          </div>
        </div>

        <!-- 兼容 Agents -->
        <div class="form-section">
          <h2 class="section-title">🤖 兼容 Agents</h2>
          <p class="section-desc">选择你的 Skill 兼容的 AI Agents</p>
          
          <div class="agents-select">
            <label 
              v-for="agent in availableAgents" 
              :key="agent.id"
              :class="['agent-checkbox', { selected: form.compatibleAgents.includes(agent.id) }]"
            >
              <input 
                type="checkbox" 
                :value="agent.id"
                v-model="form.compatibleAgents"
                class="hidden"
              />
              <span class="agent-icon">{{ agent.icon }}</span>
              <span class="agent-name">{{ agent.name }}</span>
            </label>
          </div>
        </div>

        <!-- 提交 -->
        <div class="form-actions">
          <button type="button" class="btn btn-secondary" @click="$router.back()">
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

const router = useRouter()
const submitting = ref(false)
const tagInput = ref('')

const form = reactive({
  name: '',
  description: '',
  author: '',
  categoryId: '',
  tags: [] as string[],
  skillMd: '',
  outputPreview: '',
  scores: {
    security: 8,
    clarity: 8,
    practicality: 8,
    quality: 8,
    maintainability: 8,
    innovation: 8
  },
  compatibleAgents: [] as string[]
})

const categories = ref<any[]>([])

const availableAgents = [
  { id: 'claude-code', name: 'Claude Code', icon: '🦁' },
  { id: 'openclaw', name: 'OpenClaw', icon: '🦞' },
  { id: 'cursor', name: 'Cursor', icon: '💻' },
  { id: 'vscode', name: 'VS Code', icon: '📘' },
  { id: 'codex', name: 'Codex CLI', icon: '⚡' },
  { id: 'gemini', name: 'Gemini CLI', icon: '🌟' },
  { id: 'opencode', name: 'OpenCode', icon: '🔵' },
]

onMounted(async () => {
  try {
    const res = await skillApi.getCategories()
    if (res.data.success) {
      categories.value = res.data.data
    }
  } catch (e) {
    console.error('Failed to load categories:', e)
  }
})

function addTag() {
  const tag = tagInput.value.trim()
  if (tag && !form.tags.includes(tag)) {
    form.tags.push(tag)
  }
  tagInput.value = ''
}

function removeTag(index: number) {
  form.tags.splice(index, 1)
}

async function handleSubmit() {
  submitting.value = true
  try {
    // 检查是否有评分
    const hasScores = form.scores.security !== 8 || 
                      form.scores.clarity !== 8 ||
                      form.scores.practicality !== 8 ||
                      form.scores.quality !== 8 ||
                      form.scores.maintainability !== 8 ||
                      form.scores.innovation !== 8

    const skillData: any = {
      name: form.name,
      description: form.description,
      author: form.author,
      categoryId: form.categoryId,
      tags: JSON.stringify(form.tags),
      skillMd: form.skillMd || undefined,
      outputPreview: form.outputPreview || undefined,
      scores: hasScores ? JSON.stringify(form.scores) : undefined,
      compatibleAgents: form.compatibleAgents.length > 0 ? JSON.stringify(form.compatibleAgents) : undefined
    }

    const res = await skillApi.create(skillData)
    if (res.data.success) {
      alert('发布成功！')
      router.push('/my-skills')
    }
  } catch (e: any) {
    alert(e.response?.data?.message || '发布失败')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.publish-page {
  padding: 2rem 0 4rem;
  min-height: 100vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.page-header {
  text-align: center;
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
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  background: #1a1a2e;
  border-radius: 16px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.section-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 1rem;
}

.section-desc {
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.875rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group:last-child {
  margin-bottom: 0;
}

.form-label {
  display: block;
  color: #fff;
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
  transition: border-color 0.2s;
}

.form-input:focus,
.form-textarea:focus,
.form-select:focus {
  outline: none;
  border-color: #667eea;
}

.form-textarea {
  resize: vertical;
  min-height: 100px;
}

.form-textarea.code {
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.6;
}

.tags-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.tag-item {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
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

/* SKILL.md Editor */
.skill-md-editor {
  margin-bottom: 1rem;
}

.skill-md-preview {
  background: #0f0f1a;
  border-radius: 10px;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.skill-md-preview h4 {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.875rem;
  margin-bottom: 0.75rem;
}

.preview-content {
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
  line-height: 1.6;
  white-space: pre-wrap;
}

/* Scores */
.scores-input {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.score-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.score-row label {
  width: 100px;
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.875rem;
}

.score-row input[type="range"] {
  flex: 1;
  height: 6px;
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 3px;
}

.score-row input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  background: #667eea;
  border-radius: 50%;
  cursor: pointer;
}

.score-row span {
  width: 50px;
  text-align: right;
  color: #fff;
  font-weight: 600;
}

/* Agents */
.agents-select {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 0.75rem;
}

.agent-checkbox {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: #0f0f1a;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.agent-checkbox:hover {
  border-color: #667eea;
}

.agent-checkbox.selected {
  border-color: #667eea;
  background: rgba(102, 126, 234, 0.1);
}

.agent-checkbox .hidden {
  display: none;
}

.agent-icon {
  font-size: 1.25rem;
}

.agent-name {
  color: #fff;
  font-size: 0.875rem;
}

/* Actions */
.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
}

.btn {
  padding: 0.875rem 1.75rem;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: wait;
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
