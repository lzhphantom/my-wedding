<template>
  <div class="heartbeat-container">
    <div class="heart-symphony">
      <!-- 背景环境 -->
      <div class="cosmic-background">
        <div class="stars-field">
          <div v-for="n in 50" :key="n" class="cosmic-star"
               :style="{
                 left: Math.random() * 100 + '%',
                 top: Math.random() * 100 + '%',
                 animationDelay: Math.random() * 5 + 's',
                 animationDuration: (2 + Math.random() * 3) + 's'
               }">
          </div>
        </div>
        <div class="nebula"></div>
      </div>
      
      <!-- 主心跳区域 -->
      <div class="heart-center">
        <div class="dual-hearts" ref="heartsRef">
          <!-- 男生的心跳 -->
          <div class="heart-container left-heart">
            <div class="heart boy-heart" :class="{ beating: boyHeartBeat }">
              <div class="heart-pulse boy-pulse"></div>
            </div>
            <div class="heart-rate-monitor">
              <div class="heart-rate-line boy-rate" ref="boyRateRef"></div>
              <div class="bpm-display">{{ boyBPM }} BPM</div>
              <div class="heart-owner">他的心跳</div>
            </div>
          </div>
          
          <!-- 心跳同步指示器 -->
          <div class="sync-indicator" :class="{ synced: heartsSynced }">
            <div class="sync-waves">
              <div v-for="n in 5" :key="n" class="sync-wave" 
                   :style="{ animationDelay: n * 0.1 + 's' }"></div>
            </div>
            <div class="sync-text">
              {{ heartsSynced ? '💕 心跳同步 💕' : '⏳ 寻找频率...' }}
            </div>
          </div>
          
          <!-- 女生的心跳 -->
          <div class="heart-container right-heart">
            <div class="heart girl-heart" :class="{ beating: girlHeartBeat }">
              <div class="heart-pulse girl-pulse"></div>
            </div>
            <div class="heart-rate-monitor">
              <div class="heart-rate-line girl-rate" ref="girlRateRef"></div>
              <div class="bpm-display">{{ girlBPM }} BPM</div>
              <div class="heart-owner">她的心跳</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 交互式心跳控制 -->
      <div class="heartbeat-controls" v-show="showControls">
        <h3>感受我们的心跳</h3>
        <div class="control-buttons">
          <button @click="startHeartbeat" :disabled="isPlaying" class="start-btn">
            开始感受
          </button>
          <button @click="syncHeartbeats" :disabled="!isPlaying || heartsSynced" class="sync-btn">
            同步心跳
          </button>
          <button @click="createLoveWave" :disabled="!heartsSynced" class="love-btn">
            爱的共鸣
          </button>
        </div>
        
        <div class="emotion-levels">
          <div class="emotion-bar">
            <label>紧张程度:</label>
            <div class="bar">
              <div class="bar-fill nervousness" :style="{ width: nervousness + '%' }"></div>
            </div>
          </div>
          <div class="emotion-bar">
            <label>兴奋程度:</label>
            <div class="bar">
              <div class="bar-fill excitement" :style="{ width: excitement + '%' }"></div>
            </div>
          </div>
          <div class="emotion-bar">
            <label>爱意浓度:</label>
            <div class="bar">
              <div class="bar-fill love" :style="{ width: loveIntensity + '%' }"></div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 爱情波动效果 -->
      <div class="love-waves" v-show="showLoveWaves">
        <div v-for="n in 8" :key="n" class="love-wave-ring"
             :style="{ 
               animationDelay: n * 0.2 + 's',
               '--wave-color': n % 2 === 0 ? '#FF69B4' : '#FF1493'
             }">
        </div>
      </div>
      
      <!-- 粒子效果 -->
      <div class="particle-system" v-show="showParticles">
        <div v-for="n in 30" :key="n" class="love-particle"
             :style="{
               left: Math.random() * 100 + '%',
               top: Math.random() * 100 + '%',
               animationDelay: Math.random() * 3 + 's',
               '--particle-color': Math.random() > 0.5 ? '#FF69B4' : '#FFB6C1'
             }">
          {{ Math.random() > 0.5 ? '💖' : '💕' }}
        </div>
      </div>
    </div>
    
    <div class="love-message" :class="{ visible: showMessage }">
      <h2>心有灵犀一点通</h2>
      <p>在这个世界上</p>
      <p>只有我们的心跳如此同步</p>
      <p>这就是命中注定的爱情</p>
      <div class="heartbeat-signature">
        <span class="heartbeat-emoji">💗</span>
        <span>Love Frequency: {{ loveFrequency }} Hz</span>
        <span class="heartbeat-emoji">💗</span>
      </div>
    </div>
    
    <div class="controls">
      <button @click="playHeartbeatStory" :disabled="isAnimationPlaying" class="play-btn">
        {{ isAnimationPlaying ? '正在播放...' : '播放心跳故事' }}
      </button>
      <button @click="nextScene" class="next-btn">
        查看婚礼照片 →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'

const router = useRouter()
const heartsRef = ref<HTMLElement>()
const boyRateRef = ref<HTMLElement>()
const girlRateRef = ref<HTMLElement>()

const boyHeartBeat = ref(false)
const girlHeartBeat = ref(false)
const heartsSynced = ref(false)
const showControls = ref(false)
const showLoveWaves = ref(false)
const showParticles = ref(false)
const showMessage = ref(false)
const isPlaying = ref(false)
const isAnimationPlaying = ref(false)

const boyBPM = ref(72)
const girlBPM = ref(75)
const nervousness = ref(0)
const excitement = ref(0)
const loveIntensity = ref(0)
const loveFrequency = ref(432)

let heartbeatInterval: number | null = null
let animationTimeline: gsap.core.Timeline | null = null

const startHeartbeat = () => {
  if (isPlaying.value) return
  
  isPlaying.value = true
  boyHeartBeat.value = true
  girlHeartBeat.value = true
  
  // 模拟不同步的心跳
  const boyInterval = 60000 / boyBPM.value // 毫秒
  const girlInterval = 60000 / girlBPM.value
  
  // 开始心跳动画
  startHeartbeatAnimation()
  
  // 逐渐增加情感指标
  gsap.to({ value: nervousness.value }, {
    value: 60,
    duration: 3,
    onUpdate: function() {
      nervousness.value = Math.round(this.targets()[0].value)
    }
  })
  
  gsap.to({ value: excitement.value }, {
    value: 80,
    duration: 4,
    onUpdate: function() {
      excitement.value = Math.round(this.targets()[0].value)
    }
  })
}

const syncHeartbeats = () => {
  if (heartsSynced.value) return
  
  // 同步心跳频率
  const targetBPM = 72
  
  gsap.to({ value: boyBPM.value }, {
    value: targetBPM,
    duration: 2,
    onUpdate: function() {
      boyBPM.value = Math.round(this.targets()[0].value)
    }
  })
  
  gsap.to({ value: girlBPM.value }, {
    value: targetBPM,
    duration: 2,
    onUpdate: function() {
      girlBPM.value = Math.round(this.targets()[0].value)
    },
    onComplete: () => {
      heartsSynced.value = true
      
      // 增加爱意浓度
      gsap.to({ value: loveIntensity.value }, {
        value: 100,
        duration: 3,
        onUpdate: function() {
          loveIntensity.value = Math.round(this.targets()[0].value)
        }
      })
    }
  })
}

const createLoveWave = () => {
  if (!heartsSynced.value) return
  
  showLoveWaves.value = true
  showParticles.value = true
  
  // 创建爱情波动效果
  gsap.fromTo('.love-wave-ring', {
    scale: 0,
    opacity: 1
  }, {
    scale: 3,
    opacity: 0,
    duration: 2,
    stagger: 0.2,
    ease: "power2.out"
  })
  
  setTimeout(() => {
    showMessage.value = true
  }, 2000)
}

const startHeartbeatAnimation = () => {
  // 心电图线条动画
  const boyTimeline = gsap.timeline({ repeat: -1 })
  const girlTimeline = gsap.timeline({ repeat: -1 })
  
  // 男生心电图
  boyTimeline.fromTo(boyRateRef.value, {
    strokeDasharray: "0 200"
  }, {
    strokeDasharray: "200 0",
    duration: 60 / boyBPM.value,
    ease: "none"
  })
  
  // 女生心电图
  girlTimeline.fromTo(girlRateRef.value, {
    strokeDasharray: "0 200"
  }, {
    strokeDasharray: "200 0",
    duration: 60 / girlBPM.value,
    ease: "none"
  })
}

const playHeartbeatStory = () => {
  if (isAnimationPlaying.value) return
  
  isAnimationPlaying.value = true
  resetAnimation()
  
  const timeline = gsap.timeline()
  
  // 心跳区域出现
  timeline.to(heartsRef.value, {
    opacity: 1,
    scale: 1,
    duration: 1.5,
    ease: "back.out(1.7)"
  })
  
  // 显示控制面板
  timeline.call(() => { showControls.value = true }, [], "+=0.5")
  
  // 自动播放心跳序列
  timeline.call(() => { startHeartbeat() }, [], "+=1")
  timeline.to({}, { duration: 3 })
  
  timeline.call(() => { syncHeartbeats() }, [], "+=1")
  timeline.to({}, { duration: 3 })
  
  timeline.call(() => { createLoveWave() }, [], "+=1")
  timeline.to({}, { duration: 3 })
  
  timeline.call(() => { isAnimationPlaying.value = false }, [], "+=2")
}

const resetAnimation = () => {
  boyHeartBeat.value = false
  girlHeartBeat.value = false
  heartsSynced.value = false
  showControls.value = false
  showLoveWaves.value = false
  showParticles.value = false
  showMessage.value = false
  isPlaying.value = false
  
  boyBPM.value = 72
  girlBPM.value = 75
  nervousness.value = 0
  excitement.value = 0
  loveIntensity.value = 0
  
  gsap.set(heartsRef.value, { opacity: 0, scale: 0.5 })
  
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval)
    heartbeatInterval = null
  }
  
  if (animationTimeline) {
    animationTimeline.kill()
    animationTimeline = null
  }
}

const nextScene = () => {
  router.push('/wedding')
}

onMounted(() => {
  playHeartbeatStory()
})

onUnmounted(() => {
  resetAnimation()
})
</script>

<style scoped>
.heartbeat-container {
  min-height: 100vh;
  background: radial-gradient(circle at center, #1a0033 0%, #000011 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.heart-symphony {
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 700px;
  margin-bottom: 2rem;
}

.cosmic-background {
  position: absolute;
  width: 100%;
  height: 100%;
}

.stars-field {
  position: absolute;
  width: 100%;
  height: 100%;
}

.cosmic-star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: white;
  border-radius: 50%;
  animation: twinkle-star infinite;
}

@keyframes twinkle-star {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 1; transform: scale(1.5); }
}

.nebula {
  position: absolute;
  top: 20%;
  left: 20%;
  width: 60%;
  height: 60%;
  background: radial-gradient(ellipse, rgba(255, 105, 180, 0.2) 0%, transparent 70%);
  filter: blur(50px);
  animation: nebula-float 10s infinite ease-in-out;
}

@keyframes nebula-float {
  0%, 100% { transform: scale(1) rotate(0deg); }
  50% { transform: scale(1.2) rotate(180deg); }
}

.heart-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 400px;
}

.dual-hearts {
  position: relative;
  width: 100%;
  height: 100%;
  opacity: 0;
  scale: 0.5;
}

.heart-container {
  position: absolute;
  top: 0;
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.left-heart {
  left: 10%;
}

.right-heart {
  right: 10%;
}

.heart {
  position: relative;
  width: 80px;
  height: 72px;
  margin-bottom: 2rem;
}

.heart::before,
.heart::after {
  content: '';
  width: 42px;
  height: 64px;
  position: absolute;
  left: 40px;
  top: 0;
  border-radius: 42px 42px 0 0;
  transform: rotate(-45deg);
  transform-origin: 0 100%;
}

.heart::after {
  left: 0;
  transform: rotate(45deg);
  transform-origin: 100% 100%;
}

.boy-heart::before,
.boy-heart::after {
  background: linear-gradient(45deg, #4169E1, #1E90FF);
}

.girl-heart::before,
.girl-heart::after {
  background: linear-gradient(45deg, #FF69B4, #FF1493);
}

.heart.beating {
  animation: heart-beat 1s infinite;
}

@keyframes heart-beat {
  0%, 100% { transform: scale(1); }
  25% { transform: scale(1.1); }
  50% { transform: scale(1.2); }
  75% { transform: scale(1.1); }
}

.heart-pulse {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  border: 2px solid;
  border-radius: 50%;
  opacity: 0;
}

.boy-pulse {
  border-color: #4169E1;
}

.girl-pulse {
  border-color: #FF69B4;
}

.heart.beating .heart-pulse {
  animation: pulse-wave 1s infinite;
}

@keyframes pulse-wave {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(0.8);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(2);
  }
}

.heart-rate-monitor {
  background: rgba(0, 0, 0, 0.8);
  border: 2px solid #00FF00;
  border-radius: 10px;
  padding: 1rem;
  color: #00FF00;
  font-family: 'Courier New', monospace;
  text-align: center;
  width: 200px;
}

.heart-rate-line {
  width: 100%;
  height: 40px;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 2px,
    #00FF00 2px,
    #00FF00 4px
  );
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
}

.heart-rate-line::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent 0%, #00FF00 50%, transparent 100%);
  animation: ecg-line 2s infinite linear;
}

@keyframes ecg-line {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.bpm-display {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.heart-owner {
  font-size: 0.9rem;
  opacity: 0.8;
}

.sync-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: white;
  width: 200px;
}

.sync-waves {
  position: relative;
  width: 100px;
  height: 20px;
  margin: 0 auto 1rem;
}

.sync-wave {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 4px;
  background: #FFD700;
  border-radius: 2px;
  opacity: 0;
}

.sync-indicator.synced .sync-wave {
  animation: sync-pulse 1s infinite;
}

@keyframes sync-pulse {
  0%, 100% { opacity: 0; transform: translate(-50%, -50%) scaleX(1); }
  50% { opacity: 1; transform: translate(-50%, -50%) scaleX(3); }
}

.sync-text {
  font-size: 1.1rem;
  font-weight: bold;
}

.sync-indicator.synced .sync-text {
  color: #FF69B4;
  animation: text-glow 2s infinite;
}

@keyframes text-glow {
  0%, 100% { text-shadow: 0 0 5px #FF69B4; }
  50% { text-shadow: 0 0 20px #FF69B4, 0 0 30px #FF1493; }
}

.heartbeat-controls {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem;
  color: white;
  text-align: center;
  width: 80%;
  max-width: 500px;
}

.heartbeat-controls h3 {
  margin-bottom: 1rem;
  color: #FF69B4;
}

.control-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.control-buttons button {
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.start-btn {
  background: linear-gradient(45deg, #4169E1, #1E90FF);
  color: white;
}

.sync-btn {
  background: linear-gradient(45deg, #FFD700, #FFA500);
  color: #333;
}

.love-btn {
  background: linear-gradient(45deg, #FF69B4, #FF1493);
  color: white;
}

.control-buttons button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.control-buttons button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.emotion-levels {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.emotion-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.emotion-bar label {
  width: 80px;
  font-size: 0.8rem;
  text-align: right;
}

.bar {
  flex: 1;
  height: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  transition: width 0.5s ease;
  border-radius: 5px;
}

.bar-fill.nervousness {
  background: linear-gradient(90deg, #32CD32, #FFD700, #FF6347);
}

.bar-fill.excitement {
  background: linear-gradient(90deg, #4169E1, #FF69B4, #FF1493);
}

.bar-fill.love {
  background: linear-gradient(90deg, #FF69B4, #FF1493, #DC143C);
}

.love-waves {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  pointer-events: none;
}

.love-wave-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
  border: 2px solid var(--wave-color);
  border-radius: 50%;
  opacity: 0;
}

.particle-system {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.love-particle {
  position: absolute;
  font-size: 20px;
  animation: particle-float 3s infinite ease-out;
  opacity: 0;
}

@keyframes particle-float {
  0% {
    opacity: 0;
    transform: translateY(50px) scale(0.5) rotate(0deg);
  }
  25% {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(90deg);
  }
  75% {
    opacity: 1;
    transform: translateY(-30px) scale(1.2) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: translateY(-60px) scale(0.8) rotate(270deg);
  }
}

.love-message {
  text-align: center;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  opacity: 0;
  transition: opacity 1s ease;
  margin-bottom: 2rem;
}

.love-message.visible {
  opacity: 1;
}

.love-message h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #FF69B4;
  animation: message-glow 3s infinite;
}

@keyframes message-glow {
  0%, 100% { text-shadow: 2px 2px 4px rgba(0,0,0,0.5); }
  50% { text-shadow: 0 0 20px #FF69B4, 0 0 30px #FF1493; }
}

.love-message p {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
}

.heartbeat-signature {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 1.5rem;
  font-size: 1.1rem;
  color: #FFD700;
}

.heartbeat-emoji {
  animation: signature-heartbeat 1.5s infinite;
}

@keyframes signature-heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
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
  .heart-symphony {
    height: 500px;
  }
  
  .heart-container {
    width: 250px;
  }
  
  .left-heart {
    left: 5%;
  }
  
  .right-heart {
    right: 5%;
  }
  
  .heart {
    width: 60px;
    height: 54px;
  }
  
  .heartbeat-controls {
    width: 95%;
    padding: 1rem;
  }
  
  .control-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .emotion-bar {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .emotion-bar label {
    text-align: center;
    width: auto;
  }
  
  .love-message h2 {
    font-size: 1.8rem;
  }
  
  .controls {
    flex-direction: column;
    align-items: center;
  }
}
</style>