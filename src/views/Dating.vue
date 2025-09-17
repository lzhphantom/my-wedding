<template>
  <div class="dating-container">
    <div class="scene-wrapper">
      <div class="background">
        <div class="sky">
          <div v-for="n in 3" :key="n" class="cloud" :style="{ left: n * 30 + '%', animationDelay: n * 2 + 's' }"></div>
        </div>
        <div class="city-skyline">
          <div v-for="n in 5" :key="n" class="building" :style="{ height: (n * 20 + 60) + 'px', left: n * 15 + '%' }"></div>
        </div>
        <div class="park">
          <div class="tree" v-for="n in 4" :key="n" :style="{ left: n * 25 + '%' }">
            <div class="trunk"></div>
            <div class="leaves"></div>
          </div>
        </div>
      </div>
      
      <div class="couple" ref="coupleRef">
        <div class="boy-dating">
          <div class="head"></div>
          <div class="body"></div>
          <div class="legs">
            <div class="leg"></div>
            <div class="leg"></div>
          </div>
        </div>
        
        <div class="girl-dating">
          <div class="head"></div>
          <div class="body"></div>
          <div class="legs">
            <div class="leg"></div>
            <div class="leg"></div>
          </div>
        </div>
        
        <div class="holding-hands" v-show="showHands">
          <div class="hand-connection"></div>
        </div>
      </div>
      
      <div class="activities" v-show="showActivities">
        <div class="activity" v-for="(activity, index) in activities" :key="index" 
             :class="{ active: currentActivity === index }"
             :style="{ left: activity.position }">
          <div class="activity-icon">{{ activity.icon }}</div>
          <div class="activity-text">{{ activity.text }}</div>
        </div>
      </div>
      
      <div class="love-bubbles" v-show="showBubbles">
        <div v-for="n in 8" :key="n" class="bubble" 
             :style="{ 
               left: Math.random() * 100 + '%', 
               animationDelay: n * 0.5 + 's',
               animationDuration: (3 + Math.random() * 2) + 's'
             }">
          💖
        </div>
      </div>
    </div>
    
    <div class="story-text" :class="{ visible: showStoryText }">
      <h2>我们的约会时光</h2>
      <p>从咖啡厅到公园</p>
      <p>从电影院到街头小巷</p>
      <p>每一刻都是最美好的回忆</p>
    </div>
    
    <div class="controls">
      <button @click="playDatingAnimation" :disabled="isPlaying" class="play-btn">
        {{ isPlaying ? '正在播放...' : '播放约会故事' }}
      </button>
      <button @click="nextScene" class="next-btn">
        去看电影 →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'

const router = useRouter()
const coupleRef = ref<HTMLElement>()

const showHands = ref(false)
const showActivities = ref(false)
const showBubbles = ref(false)
const showStoryText = ref(false)
const isPlaying = ref(false)
const currentActivity = ref(0)

const activities = [
  { icon: '☕', text: '喝咖啡聊天', position: '10%' },
  { icon: '🚶‍♂️🚶‍♀️', text: '漫步公园', position: '30%' },
  { icon: '🍽️', text: '浪漫晚餐', position: '50%' },
  { icon: '🌃', text: '夜景漫步', position: '70%' },
  { icon: '🌟', text: '许下心愿', position: '90%' }
]

const playDatingAnimation = () => {
  if (isPlaying.value) return
  
  isPlaying.value = true
  resetAnimation()
  
  const timeline = gsap.timeline()
  
  // 情侣出现
  timeline.to(coupleRef.value, {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "back.out(1.7)"
  })
  
  // 显示牵手
  timeline.call(() => { showHands.value = true }, [], "+=0.5")
  
  // 显示活动
  timeline.call(() => { showActivities.value = true }, [], "+=0.5")
  
  // 依次高亮活动
  activities.forEach((_, index) => {
    timeline.call(() => { currentActivity.value = index }, [], `+=${index === 0 ? 0.5 : 1}`)
  })
  
  // 情侣移动（模拟约会过程）
  timeline.to(coupleRef.value, {
    x: 100,
    duration: 2,
    ease: "power2.inOut"
  }, "+=0.5")
  
  timeline.to(coupleRef.value, {
    x: -50,
    duration: 2,
    ease: "power2.inOut"
  })
  
  timeline.to(coupleRef.value, {
    x: 0,
    duration: 1.5,
    ease: "power2.inOut"
  })
  
  // 显示爱心气泡
  timeline.call(() => { showBubbles.value = true }, [], "+=0.5")
  
  // 显示故事文字
  timeline.call(() => { showStoryText.value = true }, [], "+=1")
  
  timeline.call(() => { isPlaying.value = false }, [], "+=2")
}

const resetAnimation = () => {
  showHands.value = false
  showActivities.value = false
  showBubbles.value = false
  showStoryText.value = false
  currentActivity.value = 0
  
  gsap.set(coupleRef.value, { opacity: 0, scale: 0.5, x: 0 })
}

const nextScene = () => {
  router.push('/movies')
}

onMounted(() => {
  playDatingAnimation()
})
</script>

<style scoped>
.dating-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #FFB6C1 0%, #FFC0CB 50%, #FFCCCB 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.scene-wrapper {
  position: relative;
  width: 100%;
  max-width: 900px;
  height: 600px;
  margin-bottom: 2rem;
}

.background {
  position: absolute;
  width: 100%;
  height: 100%;
}

.sky {
  position: absolute;
  top: 0;
  width: 100%;
  height: 60%;
  background: linear-gradient(to bottom, #87CEEB, #E0F6FF);
}

.cloud {
  position: absolute;
  width: 80px;
  height: 30px;
  background: white;
  border-radius: 50px;
  opacity: 0.8;
  animation: float-cloud 20s infinite linear;
}

.cloud::before,
.cloud::after {
  content: '';
  position: absolute;
  background: white;
  border-radius: 50px;
}

.cloud::before {
  width: 50px;
  height: 40px;
  top: -15px;
  left: 10px;
}

.cloud::after {
  width: 60px;
  height: 35px;
  top: -10px;
  right: 15px;
}

@keyframes float-cloud {
  from { transform: translateX(-100px); }
  to { transform: translateX(calc(100vw + 100px)); }
}

.city-skyline {
  position: absolute;
  bottom: 40%;
  width: 100%;
  height: 20%;
}

.building {
  position: absolute;
  width: 60px;
  background: #696969;
  border-radius: 5px 5px 0 0;
  bottom: 0;
}

.building::before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  width: 8px;
  height: 8px;
  background: #FFD700;
  box-shadow: 
    0 15px 0 #FFD700,
    0 30px 0 #FFD700,
    15px 0 0 #FFD700,
    15px 15px 0 #FFD700,
    15px 30px 0 #FFD700,
    30px 0 0 #FFD700,
    30px 15px 0 #FFD700,
    30px 30px 0 #FFD700;
}

.park {
  position: absolute;
  bottom: 20%;
  width: 100%;
  height: 20%;
  background: linear-gradient(to bottom, #90EE90, #228B22);
}

.tree {
  position: absolute;
  bottom: 0;
  width: 40px;
  height: 60px;
}

.trunk {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 25px;
  background: #8B4513;
}

.leaves {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 30px;
  background: #228B22;
  border-radius: 50%;
}

.couple {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  gap: 10px;
  opacity: 0;
  scale: 0.5;
}

.boy-dating, .girl-dating {
  width: 40px;
  height: 70px;
  position: relative;
}

.boy-dating .head, .girl-dating .head {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin: 0 auto 3px;
}

.boy-dating .head {
  background: #DEB887;
}

.girl-dating .head {
  background: #F5DEB3;
}

.girl-dating .head::after {
  content: '';
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 22px;
  height: 12px;
  background: #8B4513;
  border-radius: 50%;
}

.boy-dating .body, .girl-dating .body {
  width: 22px;
  height: 30px;
  margin: 0 auto 3px;
  border-radius: 8px;
}

.boy-dating .body {
  background: #4169E1;
}

.girl-dating .body {
  background: #FF69B4;
}

.legs {
  display: flex;
  justify-content: space-between;
  width: 18px;
  margin: 0 auto;
}

.leg {
  width: 6px;
  height: 18px;
  background: #8B4513;
  border-radius: 0 0 8px 8px;
}

.holding-hands {
  position: absolute;
  top: 35px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 3px;
  background: #DEB887;
  border-radius: 2px;
  animation: hand-pulse 2s infinite;
}

@keyframes hand-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.activities {
  position: absolute;
  top: 10%;
  width: 100%;
  height: 30%;
}

.activity {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  padding: 10px;
  text-align: center;
  width: 80px;
  transition: all 0.5s ease;
  opacity: 0.6;
  scale: 0.8;
}

.activity.active {
  opacity: 1;
  scale: 1.1;
  background: rgba(255, 182, 193, 0.9);
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
}

.activity-icon {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.activity-text {
  font-size: 0.7rem;
  font-weight: bold;
  color: #333;
}

.love-bubbles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.bubble {
  position: absolute;
  font-size: 20px;
  animation: bubble-up infinite ease-out;
  opacity: 0;
}

@keyframes bubble-up {
  0% {
    opacity: 0;
    transform: translateY(100vh) scale(0.5);
  }
  25% {
    opacity: 1;
    transform: translateY(75vh) scale(1);
  }
  75% {
    opacity: 1;
    transform: translateY(25vh) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translateY(-10vh) scale(0.8);
  }
}

.story-text {
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  opacity: 0;
  transition: opacity 1s ease;
  margin-bottom: 2rem;
}

.story-text.visible {
  opacity: 1;
}

.story-text h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #FF69B4;
}

.story-text p {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.controls {
  display: flex;
  gap: 1rem;
}

.play-btn, .next-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.play-btn {
  background: linear-gradient(45deg, #FF69B4, #FF1493);
  color: white;
}

.play-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.next-btn {
  background: linear-gradient(45deg, #32CD32, #228B22);
  color: white;
}

.play-btn:hover:not(:disabled), .next-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

@media (max-width: 768px) {
  .scene-wrapper {
    height: 400px;
  }
  
  .story-text h2 {
    font-size: 1.5rem;
  }
  
  .story-text p {
    font-size: 1rem;
  }
  
  .activity {
    width: 60px;
  }
  
  .activity-text {
    font-size: 0.6rem;
  }
  
  .controls {
    flex-direction: column;
    align-items: center;
  }
}
</style>