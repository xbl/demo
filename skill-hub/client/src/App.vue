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
          <a href="#" class="nav-link">分类</a>
          <a href="#" class="nav-link">文档</a>
        </nav>
        
        <div class="header-actions">
          <div class="search-box">
            <input 
              type="text" 
              placeholder="搜索 Skills..." 
              class="search-input"
            />
          </div>
          <button class="btn btn-primary">发布 Skill</button>
        </div>
      </div>
    </header>
    
    <main class="main">
      <router-view />
    </main>
    
    <footer class="footer">
      <div class="container">
        <p>© 2026 SkillHub. Build with Vue + Node.js</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
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
  gap: 2rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #fff;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-box {
  position: relative;
}

.search-input {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: #fff;
  width: 240px;
  transition: all 0.2s;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  background: rgba(255, 255, 255, 0.15);
}

.btn {
  padding: 0.5rem 1.25rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
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
}
</style>
