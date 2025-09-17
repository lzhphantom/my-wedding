<template>
  <div class="first-kiss-container">
    <div class="romantic-scene">
      <div class="environment">
        <!-- 背景环境 -->
        <div class="sky" :class="{ 'sunset': isEvening, 'starry': isNight }">
          <div v-if="isNight" class="stars">
            <div v-for="n in 20" :key="n" class="star" 
                 :style="{ 
                   left: Math.random() * 100 + '%', 
                   top: Math.random() * 50 + '%',
                   animationDelay: Math.random() * 3 + 's'
                 }">
              ✨
            </div>
          </div>
          <div v-if="isNight" class="moon">🌙</div>
        </div>
        
        <!-- 场景元素 -->
        <div class="park-bench" ref="benchRef">
          <div class="bench-back"></div>
          <div class="bench-seat"></div>
        </div>
        
        <div class="street-lamp" :class="{ 'lit': isEvening || isNight }">
          <div class="lamp-post"></div>
          <div class="lamp-light">
            <div class="light-glow"></div>
          </div>
        </div>
        
        <div class="romantic-trees">
          <div v-for="n in 3" :key="n" class="romantic-tree" 
               :style="{ left: (n * 25 + 10) + '%' }">
            <div class="tree-trunk"></div>
            <div class="tree-crown">
              <div v-if="showPetals" v-for="p in 5" :key="p" 
                   class="petal" 
                   :style="{ animationDelay: (p * 0.3) + 's' }">
                🌸
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 情侣角色 -->
      <div class="couple-scene" ref="coupleRef">
        <div class="boy-nervous" :class="{ 'leaning': isLeaning }">
          <div class="head">
            <div class="eyes" :class="{ 'closed': eyesClosed }">👀</div>
          </div>
          <div class="body"></div>
          <div class="arms">
            <div class="arm left"></div>
            <div class="arm right"></div>
          </div>
          <div class="thought-bubble" v-show="showThoughts">
            💭 "好紧张..."
          </div>
        </div>
        
        <div class="girl-shy" :class="{ 'leaning': isLeaning }">
          <div class="head">
            <div class="eyes" :class="{ 'closed': eyesClosed }">👀</div>
            <div class="blush" v-show="showBlush">😊</div>
          </div>
          <div class="body"></div>
          <div class="arms">
            <div class="arm left"></div>
            <div class="arm right"></div>
          </div>
          <div class="thought-bubble" v-show="showThoughts">
            💭 "心跳好快..."
          </div>
        </div>
      </div>
      
      <!-- 魔法效果 -->
      <div class="magic-effects" v-show="showMagic">
        <div class="sparkles">
          <div v-for="n in 15" :key="n" class="sparkle" 
               :style="{ 
                 left: (45 + Math.random() * 10) + '%',
                 top: (40 + Math.random() * 20) + '%',
                 animationDelay: Math.random() * 2 + 's'
               }">
            ✨
          </div>
        </div>
        
        <div class="heart-explosion">
          <div v-for="n in 12" :key="n" class="explosion-heart"
               :style="{ 
                 '--angle': n * 30 + 'deg',
                 animationDelay: Math.random() * 0.5 + 's'
               }">
            💖
          </div>
        </div>
        
        <div class="love-aura">
          <div class="aura-ring" v-for="n in 3" :key="n" 
               :style="{ animationDelay: n * 0.7 + 's' }"></div>
        </div>
      </div>
      
      <!-- 时间控制 -->
      <div class="time-controls" v-show="!kissHappened">
        <button @click="setTime('day')" :class="{ active: !isEvening && !isNight }">
          ☀️ 白天
        </button>
        <button @click="setTime('evening')" :class="{ active: isEvening }">
          🌅 黄昏
        </button>
        <button @click="setTime('night')" :class="{ active: isNight }">
          🌙 夜晚
        </button>
      </div>
    </div>
    
    <div class="kiss-moment" v-show="kissHappened">
      <div class="moment-text">
        <h2>那一刻，时间停止了...</h2>
        <div class="heartbeat-text">
          <span class="heartbeat">💗</span>
          <span>我们的心，同频共振</span>
          <span class="heartbeat">💗</span>
        </div>
      </div>
    </div>
    
    <div class="story-narration" :class="{ visible: showNarration }">
      <h2>初吻的魔法</h2>
      <p>在星光下，在花瓣雨中</p>
      <p>那是我们爱情故事中最美的一页</p>
      <p>从此，心中只有彼此</p>
    </div>
    
    <div class="controls">
      <button @click="playKissAnimation" :disabled="isPlaying" class="play-btn">
        {{ isPlaying ? '正在播放...' : '播放初吻时刻' }}
      </button>
      <button @click="nextScene" class="next-btn">
        感受心跳 →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'

const router = useRouter()
const benchRef = ref<HTMLElement>()
const coupleRef = ref<HTMLElement>()

const isEvening = ref(false)
const isNight = ref(false)
const showPetals = ref(false)
const showThoughts = ref(false)
const showBlush = ref(false)
const isLeaning = ref(false)
const eyesClosed = ref(false)
const showMagic = ref(false)
const kissHappened = ref(false)
const showNarration = ref(false)
const isPlaying = ref(false)

const setTime = (time: 'day' | 'evening' | 'night') => {
  isEvening.value = time === 'evening'
  isNight.value = time === 'night'
}

const playKissAnimation = () => {
  if (isPlaying.value) return
  
  isPlaying.value = true
  resetAnimation()
  
  const timeline = gsap.timeline()
  
  // 设置黄昏场景
  timeline.call(() => { setTime('evening') })
  
  // 情侣出现在长椅上
  timeline.to(coupleRef.value, {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "back.out(1.7)"
  })
  
  // 显示内心想法
  timeline.call(() => { showThoughts.value = true }, [], "+=0.5")
  timeline.to({}, { duration: 2 })
  
  // 转向夜晚
  timeline.call(() => { 
    setTime('night')
    showThoughts.value = false
  })
  
  // 开始花瓣飘落
  timeline.call(() => { showPetals.value = true }, [], "+=0.5")
  
  // 相互靠近
  timeline.call(() => { isLeaning.value = true }, [], "+=1")
  timeline.to(coupleRef.value, {
    scale: 1.2,
    duration: 2,
    ease: "power2.inOut"
  })
  
  // 显示脸红
  timeline.call(() => { showBlush.value = true }, [], "+=0.5")
  
  // 闭上眼睛
  timeline.call(() => { eyesClosed.value = true }, [], "+=1")
  
  // 初吻时刻 - 魔法效果
  timeline.call(() => { 
    showMagic.value = true
    kissHappened.value = true
  }, [], "+=1")
  
  // 屏幕闪光效果
  timeline.to('.first-kiss-container', {
    filter: 'brightness(1.5)',
    duration: 0.3,
    yoyo: true,
    repeat: 1
  })
  
  // 显示故事文字
  timeline.call(() => { showNarration.value = true }, [], "+=2")
  
  timeline.call(() => { isPlaying.value = false }, [], "+=3")
}

const resetAnimation = () => {
  isEvening.value = false
  isNight.value = false
  showPetals.value = false
  showThoughts.value = false
  showBlush.value = false
  isLeaning.value = false
  eyesClosed.value = false
  showMagic.value = false
  kissHappened.value = false
  showNarration.value = false
  
  gsap.set(coupleRef.value, { opacity: 0, scale: 0.5 })
}

const nextScene = () => {
  router.push('/heartbeat')
}

onMounted(() => {
  playKissAnimation()
})
</script>

<style scoped>
.first-kiss-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #87CEEB 0%, #FFB6C1 50%, #DDA0DD 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 2s ease;
}

.romantic-scene {
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 600px;
  margin-bottom: 2rem;
}

.environment {
  position: absolute;
  width: 100%;
  height: 100%;
}

.sky {
  position: absolute;
  top: 0;
  width: 100%;
  height: 70%;
  transition: all 2s ease;
}

.sky.sunset {
  background: linear-gradient(to bottom, #FF6B6B 0%, #FFE66D 50%, #FF9F43 100%);
}

.sky.starry {
  background: linear-gradient(to bottom, #0F0F23 0%, #1A1A3E 50%, #2D2D5F 100%);
}

.stars {
  position: absolute;
  width: 100%;
  height: 100%;
}

.star {
  position: absolute;
  font-size: 12px;
  animation: twinkle 3s infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.2); }
}

.moon {
  position: absolute;
  top: 15%;
  right: 20%;
  font-size: 3rem;
  filter: drop-shadow(0 0 10px #FFE4B5);
}

.park-bench {
  position: absolute;
  bottom: 25%;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 60px;
}

.bench-back {
  position: absolute;
  top: 0;
  width: 100%;
  height: 40px;
  background: #8B4513;
  border-radius: 10px 10px 0 0;
}

.bench-seat {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
  background: #A0522D;
  border-radius: 5px;
}

.street-lamp {
  position: absolute;
  bottom: 30%;
  right: 20%;
  width: 20px;
  height: 120px;
}

.lamp-post {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 100px;
  background: #696969;
}

.lamp-light {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 20px;
  background: #FFD700;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 2s ease;
}

.street-lamp.lit .lamp-light {
  opacity: 1;
}

.light-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
  border-radius: 50%;
}

.romantic-trees {
  position: absolute;
  bottom: 30%;
  width: 100%;
  height: 100px;
}

.romantic-tree {
  position: absolute;
  bottom: 0;
  width: 60px;
  height: 80px;
}

.tree-trunk {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 30px;
  background: #8B4513;
}

.tree-crown {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 40px;
  background: #228B22;
  border-radius: 50%;
  position: relative;
}

.petal {
  position: absolute;
  font-size: 14px;
  animation: petal-fall 4s infinite ease-out;
}

@keyframes petal-fall {
  0% {
    opacity: 1;
    transform: translateY(-20px) rotate(0deg);
  }
  100% {
    opacity: 0;
    transform: translateY(200px) rotate(360deg);
  }
}

.couple-scene {
  position: absolute;
  bottom: 25%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
  align-items: flex-end;
  opacity: 0;
  scale: 0.5;
}

.boy-nervous, .girl-shy {
  position: relative;
  width: 50px;
  height: 80px;
  transition: all 1s ease;
}

.boy-nervous.leaning {
  transform: rotate(5deg);
}

.girl-shy.leaning {
  transform: rotate(-5deg);
}

.head {
  position: relative;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  margin: 0 auto 5px;
}

.boy-nervous .head {
  background: #DEB887;
}

.girl-shy .head {
  background: #F5DEB3;
}

.girl-shy .head::after {
  content: '';
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 26px;
  height: 15px;
  background: #8B4513;
  border-radius: 50%;
}

.eyes {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8px;
  transition: all 0.5s ease;
}

.eyes.closed {
  opacity: 0;
}

.blush {
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 6px;
}

.body {
  width: 28px;
  height: 35px;
  margin: 0 auto 5px;
  border-radius: 10px;
}

.boy-nervous .body {
  background: #4169E1;
}

.girl-shy .body {
  background: #FF69B4;
}

.arms {
  position: absolute;
  top: 30px;
  width: 100%;
}

.arm {
  position: absolute;
  width: 6px;
  height: 20px;
  background: #DEB887;
  border-radius: 3px;
}

.arm.left {
  left: 5px;
  transform: rotate(-20deg);
}

.arm.right {
  right: 5px;
  transform: rotate(20deg);
}

.thought-bubble {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 15px;
  font-size: 10px;
  white-space: nowrap;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.magic-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.sparkles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.sparkle {
  position: absolute;
  font-size: 16px;
  animation: sparkle-shine 2s infinite;
}

@keyframes sparkle-shine {
  0%, 100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
  50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
}

.heart-explosion {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
}

.explosion-heart {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 20px;
  animation: heart-explode 3s ease-out;
}

@keyframes heart-explode {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(0.5);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-50px) scale(1.2);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-100px) scale(0.8);
  }
}

.love-aura {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
}

.aura-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid rgba(255, 105, 180, 0.5);
  border-radius: 50%;
  animation: aura-expand 3s infinite ease-out;
}

@keyframes aura-expand {
  0% {
    width: 50px;
    height: 50px;
    opacity: 1;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}

.time-controls {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.time-controls button {
  padding: 8px 12px;
  border: none;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 12px;
}

.time-controls button.active {
  background: #FF69B4;
  color: white;
}

.kiss-moment {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.moment-text h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #FF1493;
  animation: glow-pulse 2s infinite;
}

@keyframes glow-pulse {
  0%, 100% { text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
  50% { text-shadow: 0 0 20px #FF1493, 0 0 30px #FF1493; }
}

.heartbeat-text {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1.2rem;
}

.heartbeat {
  animation: heartbeat-pulse 1s infinite;
}

@keyframes heartbeat-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
}

.story-narration {
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  opacity: 0;
  transition: opacity 1s ease;
  margin-bottom: 2rem;
}

.story-narration.visible {
  opacity: 1;
}

.story-narration h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #FF1493;
}

.story-narration p {
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
  background: linear-gradient(45deg, #FF1493, #FF69B4);
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
  .romantic-scene {
    height: 400px;
  }
  
  .moment-text h2 {
    font-size: 1.8rem;
  }
  
  .heartbeat-text {
    font-size: 1rem;
  }
  
  .time-controls {
    position: relative;
    top: auto;
    right: auto;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .controls {
    flex-direction: column;
    align-items: center;
  }
}
</style>