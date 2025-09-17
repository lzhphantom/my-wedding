<template>
  <div class="meeting-container">
    <div class="scene-wrapper">
      <div class="background">
        <div class="sky"></div>
        <div class="ground"></div>
        <div class="cafe">
          <div class="cafe-front"></div>
          <div class="cafe-sign">Coffee & Love</div>
        </div>
      </div>
      
      <div class="characters">
        <div 
          class="boy character" 
          :class="{ walking: boyWalking, stopped: boyStopped }"
          ref="boyRef"
        >
          <div class="head"></div>
          <div class="body"></div>
          <div class="legs">
            <div class="leg left"></div>
            <div class="leg right"></div>
          </div>
        </div>
        
        <div 
          class="girl character" 
          :class="{ walking: girlWalking, stopped: girlStopped }"
          ref="girlRef"
        >
          <div class="head"></div>
          <div class="body"></div>
          <div class="legs">
            <div class="leg left"></div>
            <div class="leg right"></div>
          </div>
        </div>
      </div>
      
      <div class="hearts-effect" v-show="showHearts">
        <div v-for="n in 6" :key="n" class="floating-heart" :style="{ animationDelay: n * 0.2 + 's' }">
          💕
        </div>
      </div>
      
      <div class="story-text" :class="{ visible: showText }">
        <h2>那是一个美好的午后...</h2>
        <p>在咖啡馆门前，命运让我们相遇</p>
        <p>那一眼，就是一辈子</p>
      </div>
    </div>
    
    <div class="controls">
      <button @click="playAnimation" :disabled="isPlaying" class="play-btn">
        {{ isPlaying ? '正在播放...' : '重新播放相遇' }}
      </button>
      <button @click="nextScene" class="next-btn">
        下一个故事 →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'

const router = useRouter()
const boyRef = ref<HTMLElement>()
const girlRef = ref<HTMLElement>()

const boyWalking = ref(false)
const girlWalking = ref(false)
const boyStopped = ref(false)
const girlStopped = ref(false)
const showHearts = ref(false)
const showText = ref(false)
const isPlaying = ref(false)

const playAnimation = () => {
  if (isPlaying.value) return
  
  isPlaying.value = true
  resetAnimation()
  
  const timeline = gsap.timeline()
  
  // 男孩从左边走来
  timeline.set(boyRef.value, { x: -200, opacity: 1 })
  timeline.set(girlRef.value, { x: 200, opacity: 1 })
  
  timeline.call(() => { boyWalking.value = true })
  timeline.to(boyRef.value, {
    x: -50,
    duration: 2,
    ease: "power2.out"
  })
  
  // 女孩从右边走来
  timeline.call(() => { girlWalking.value = true }, [], 0.5)
  timeline.to(girlRef.value, {
    x: 50,
    duration: 2,
    ease: "power2.out"
  }, 0.5)
  
  // 停下来，四目相对
  timeline.call(() => {
    boyWalking.value = false
    girlWalking.value = false
    boyStopped.value = true
    girlStopped.value = true
  })
  
  // 显示爱心效果
  timeline.call(() => { showHearts.value = true }, [], "+=0.5")
  
  // 显示文字
  timeline.call(() => { showText.value = true }, [], "+=1")
  
  timeline.call(() => { isPlaying.value = false }, [], "+=2")
}

const resetAnimation = () => {
  boyWalking.value = false
  girlWalking.value = false
  boyStopped.value = false
  girlStopped.value = false
  showHearts.value = false
  showText.value = false
  
  gsap.set([boyRef.value, girlRef.value], { x: 0, opacity: 0 })
}

const nextScene = () => {
  router.push('/dating')
}

onMounted(() => {
  playAnimation()
})
</script>

<style scoped>
.meeting-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #87CEEB 0%, #98FB98 100%);
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
  max-width: 800px;
  height: 500px;
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
  height: 70%;
  background: linear-gradient(to bottom, #87CEEB, #E0F6FF);
}

.ground {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(to bottom, #8FBC8F, #228B22);
}

.cafe {
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: 100px;
}

.cafe-front {
  width: 100%;
  height: 80px;
  background: #8B4513;
  border-radius: 10px 10px 0 0;
  position: relative;
}

.cafe-front::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 20px;
  width: 40px;
  height: 30px;
  background: #4169E1;
  border-radius: 5px;
}

.cafe-front::after {
  content: '';
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 30px;
  background: #4169E1;
  border-radius: 5px;
}

.cafe-sign {
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background: #FF69B4;
  color: white;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: bold;
}

.characters {
  position: absolute;
  bottom: 30%;
  width: 100%;
  height: 100px;
}

.character {
  position: absolute;
  bottom: 0;
  width: 50px;
  height: 80px;
  opacity: 0;
  transition: all 0.3s ease;
}

.boy {
  left: 50%;
  margin-left: -25px;
}

.girl {
  right: 50%;
  margin-right: -25px;
}

.head {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 auto 5px;
}

.boy .head {
  background: #DEB887;
}

.girl .head {
  background: #F5DEB3;
}

.girl .head::after {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 25px;
  height: 15px;
  background: #8B4513;
  border-radius: 50%;
}

.body {
  width: 25px;
  height: 35px;
  margin: 0 auto 5px;
  border-radius: 10px;
}

.boy .body {
  background: #4169E1;
}

.girl .body {
  background: #FF69B4;
}

.legs {
  display: flex;
  justify-content: space-between;
  width: 20px;
  margin: 0 auto;
}

.leg {
  width: 8px;
  height: 20px;
  background: #8B4513;
  border-radius: 0 0 10px 10px;
}

.walking .leg {
  animation: walking 0.5s infinite alternate;
}

.walking .leg.right {
  animation-delay: 0.25s;
}

@keyframes walking {
  from { transform: translateY(0) rotate(-10deg); }
  to { transform: translateY(-5px) rotate(10deg); }
}

.stopped {
  animation: bounce 0.5s ease-out;
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.hearts-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  pointer-events: none;
}

.floating-heart {
  position: absolute;
  font-size: 24px;
  animation: float-up 3s infinite ease-out;
  opacity: 0;
}

.floating-heart:nth-child(1) { left: 10%; }
.floating-heart:nth-child(2) { left: 30%; }
.floating-heart:nth-child(3) { left: 50%; }
.floating-heart:nth-child(4) { left: 70%; }
.floating-heart:nth-child(5) { left: 90%; }
.floating-heart:nth-child(6) { left: 50%; }

@keyframes float-up {
  0% {
    opacity: 0;
    transform: translateY(50px) scale(0.5);
  }
  25% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  75% {
    opacity: 1;
    transform: translateY(-30px) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translateY(-60px) scale(0.8);
  }
}

.story-text {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  opacity: 0;
  transition: opacity 1s ease;
}

.story-text.visible {
  opacity: 1;
}

.story-text h2 {
  font-size: 1.8rem;
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
    height: 300px;
  }
  
  .story-text h2 {
    font-size: 1.4rem;
  }
  
  .story-text p {
    font-size: 1rem;
  }
  
  .controls {
    flex-direction: column;
    align-items: center;
  }
}
</style>