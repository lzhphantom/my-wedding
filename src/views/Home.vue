<template>
  <div class="home-container">
    <div class="hero-section">
      <div class="title-wrapper">
        <h1 class="main-title">Our Love Story</h1>
        <h2 class="subtitle">从相遇到永远</h2>
        <p class="description">点击开始，体验我们的爱情之旅</p>
      </div>
      
      <div class="heart-container">
        <div class="heart" :class="{ beating: isHeartBeating }"></div>
      </div>
      
      <button 
        @click="startJourney" 
        class="start-button"
        :class="{ pulse: !journeyStarted }"
      >
        开始我们的故事
      </button>
    </div>
    
    <div v-if="journeyStarted" class="journey-navigation">
      <div class="timeline">
        <div 
          v-for="(chapter, index) in chapters" 
          :key="chapter.id"
          class="timeline-item"
          :class="{ 
            active: currentChapter === index,
            completed: index < currentChapter 
          }"
          @click="goToChapter(index)"
        >
          <div class="timeline-dot">
            <i :class="chapter.icon"></i>
          </div>
          <div class="timeline-content">
            <h3>{{ chapter.title }}</h3>
            <p>{{ chapter.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isHeartBeating = ref(false)
const journeyStarted = ref(false)
const currentChapter = ref(0)

const chapters = [
  {
    id: 'meeting',
    title: '初次相遇',
    description: '那个改变一切的美好瞬间',
    icon: 'fas fa-eye',
    route: '/meeting'
  },
  {
    id: 'dating',
    title: '甜蜜约会',
    description: '我们一起度过的美好时光',
    icon: 'fas fa-coffee',
    route: '/dating'
  },
  {
    id: 'movies',
    title: '电影时光',
    description: '在黑暗中找到彼此的光',
    icon: 'fas fa-film',
    route: '/movies'
  },
  {
    id: 'first-kiss',
    title: '初吻时刻',
    description: '心动不已的那一刻',
    icon: 'fas fa-kiss',
    route: '/first-kiss'
  },
  {
    id: 'heartbeat',
    title: '心跳共鸣',
    description: '感受我们同步的心跳',
    icon: 'fas fa-heartbeat',
    route: '/heartbeat'
  },
  {
    id: 'wedding',
    title: '永结同心',
    description: '我们最美好的时刻',
    icon: 'fas fa-ring',
    route: '/wedding'
  }
]

const startJourney = () => {
  isHeartBeating.value = true
  journeyStarted.value = true
}

const goToChapter = (index: number) => {
  currentChapter.value = index
  router.push(chapters[index].route)
}

onMounted(() => {
  // 自动开始心跳动画
  setTimeout(() => {
    isHeartBeating.value = true
  }, 1000)
})
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  overflow-x: hidden;
}

.hero-section {
  text-align: center;
  margin-bottom: 4rem;
}

.title-wrapper {
  margin-bottom: 3rem;
}

.main-title {
  font-size: 4rem;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  margin-bottom: 1rem;
  font-weight: 300;
  letter-spacing: 2px;
}

.subtitle {
  font-size: 2rem;
  color: #fff;
  margin-bottom: 1rem;
  opacity: 0.9;
}

.description {
  font-size: 1.2rem;
  color: #fff;
  opacity: 0.8;
}

.heart-container {
  margin: 2rem 0;
}

.heart {
  position: relative;
  width: 100px;
  height: 90px;
  margin: 0 auto;
  transform: rotate(-45deg);
  transition: all 0.3s ease;
}

.heart::before,
.heart::after {
  content: '';
  width: 52px;
  height: 80px;
  position: absolute;
  left: 50px;
  top: 0;
  background: #ff6b6b;
  border-radius: 50px 50px 0 0;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}

.heart::after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}

.heart.beating {
  animation: heartbeat 1.5s infinite;
}

@keyframes heartbeat {
  0%, 100% { transform: rotate(-45deg) scale(1); }
  25% { transform: rotate(-45deg) scale(1.1); }
  50% { transform: rotate(-45deg) scale(1.2); }
  75% { transform: rotate(-45deg) scale(1.1); }
}

.start-button {
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  border: none;
  padding: 1rem 2rem;
  font-size: 1.2rem;
  color: white;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 107, 107, 0.4);
  margin-top: 2rem;
}

.start-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.6);
}

.start-button.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.journey-navigation {
  width: 100%;
  max-width: 1200px;
}

.timeline {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
}

.timeline-item {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 300px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.timeline-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
}

.timeline-item.active {
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  color: white;
}

.timeline-item.completed {
  background: linear-gradient(45deg, #51cf66, #69db7c);
  color: white;
}

.timeline-dot {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
}

.timeline-item.active .timeline-dot,
.timeline-item.completed .timeline-dot {
  background: rgba(255, 255, 255, 0.2);
}

.timeline-content h3 {
  margin-bottom: 0.5rem;
  font-size: 1.3rem;
}

.timeline-content p {
  opacity: 0.8;
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.5rem;
  }
  
  .timeline {
    flex-direction: column;
    align-items: center;
  }
  
  .timeline-item {
    width: 100%;
    max-width: 400px;
  }
}
</style>