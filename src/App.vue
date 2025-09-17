<script setup lang="ts">
import { onMounted } from 'vue'

// 添加 Font Awesome 图标支持
onMounted(() => {
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
  document.head.appendChild(link)
})
</script>

<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  overflow-x: hidden;
}

#app {
  width: 100%;
  min-height: 100vh;
}

/* 全局动画样式 */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

/* 全局按钮样式 */
button {
  font-family: inherit;
  outline: none;
  border: none;
  cursor: pointer;
}

/* 响应式文字 */
@media (max-width: 768px) {
  h1 { font-size: 2rem !important; }
  h2 { font-size: 1.5rem !important; }
  p { font-size: 1rem !important; }
}
</style>
