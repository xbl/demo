<template>
  <div class="app">
    <header class="header">
      <div class="container header-content">
        <router-link to="/" class="logo">
          <span class="logo-icon">⚡</span>
          <span class="logo-text">SkillHub</span>
        </router-link>
        
        <nav class="nav">
          <router-link to="/" class="nav-link">首页</router-link>
          <router-link to="/category/dev" class="nav-link">开发</router-link>
          <router-link to="/category/ai" class="nav-link">AI</router-link>
          <router-link to="/category/media" class="nav-link">多媒体</router-link>
        </nav>
        
        <div class="header-actions">
          <div class="search-box">
            <input 
              v-model="searchKeyword"
              type="text" 
              placeholder="搜索 Skills..."
              class="search-input"
              @keyup.enter="handleSearch"
            />
            <button class="search-icon-btn" @click="handleSearch">
              🔍
            </router-link>
          </div>
          <router-link to="/publish" class="btn btn-primary">
            <span>➕</span> 发布 Skill
          </router-link>
        </div>
      </div>
    </header>
    
    <main class="main">
      <router-view />
    </main>
    
    <footer class="footer">
      <div class="container">
        <p>© 2026 SkillHub. Powered by Vue + Node.js</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const searchKeyword = ref('')

function handleSearch() {
  if (searchKeyword.value.trim()) {
    router.push({ name: 'search', query: { q: searchKeyword.value } })
  }
}
</script>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #1a1a2e;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
}

.logo-icon {
  font-size: 1.75rem;
}

.logo-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.nav {
  display: flex;
  gap: 1.5rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  padding: 0.375rem 0;
  border-bottom: 2px solid transparent;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: #fff;
  border-bottom-color: #667eea;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
}

.search-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  padding-right: 2.5rem;
  color: #fff;
  width: 220px;
  transition: all 0.2s;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(255, 255, 255, 0.15);
  width: 280px;
}

.search-icon-btn {
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  opacity: 0.6;
  transition: opacity 0.2s;
}

.search-icon-btn:hover {
  opacity: 1;
}

.btn {
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.375rem;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #fff;
}

.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}

.main {
  flex: 1;
}

.footer {
  background: #1a1a2e;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 2rem 0;
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
  margin-top: auto;
}

@media (max-width: 768px) {
  .nav {
    display: none;
  }
  
  .search-input {
    width: 160px;
  }
  
  .search-input:focus {
    width: 200px;
  }
}
</style>
