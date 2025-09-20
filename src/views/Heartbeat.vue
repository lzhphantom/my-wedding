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
      
      <!-- 时间控制 -->
      <div class="time-controls" v-show="showControls">
        <h3>感受我们的心跳</h3>
        <div class="countdown-config">
          <label>倒计时总时长（秒）:</label>
          <input 
            type="number" 
            v-model="totalCountdownTime" 
            :disabled="isPlaying"
            min="60" 
            max="3600" 
            step="60"
            class="time-input"
          />
          <span class="time-display">{{ formatTime(totalCountdownTime) }}</span>
        </div>
        <div class="control-buttons">
          <button @click="startHeartbeat" :disabled="isPlaying" class="start-btn">
            开始感受
          </button>
          <button @click="syncHeartbeats" :disabled="!isPlaying || heartsSynced || loveIntensity < 25" class="sync-btn"
                  :class="{ 'available': loveIntensity >= 25 && !heartsSynced }">
            同步心跳 {{ loveIntensity >= 25 ? '✨' : '🔒' }}
          </button>
          <button @click="createLoveWave" :disabled="!heartsSynced || loveIntensity < 75" class="love-btn"
                  :class="{ 'available': loveIntensity >= 75 && heartsSynced }">
            爱的共鸣 {{ loveIntensity >= 75 ? '💕' : '🔒' }}
          </button>
        </div>
        
        <div class="emotion-levels">
          <div class="countdown-display">
            <label>倒计时:</label>
            <div class="countdown-timer">
              <span class="countdown-number">{{ formatTime(countdown) }}</span>
            </div>
          </div>
          <div class="emotion-bar">
            <label>爱意浓度:</label>
            <div class="bar">
              <div class="bar-fill love" :style="{ width: loveIntensity + '%' }">
                <div class="love-sparkles">
                  <span v-for="n in Math.floor(loveIntensity / 10)" :key="n" class="sparkle">✨</span>
                </div>
              </div>
            </div>
            <span class="love-percentage">{{ loveIntensity }}%</span>
          </div>
          <div class="love-milestones">
            <div class="milestone" :class="{ 'reached': loveIntensity >= 25 }">
              <span class="milestone-icon">💫</span>
              <span class="milestone-text">25% - 心跳可同步</span>
            </div>
            <div class="milestone" :class="{ 'reached': loveIntensity >= 75 }">
              <span class="milestone-icon">💕</span>
              <span class="milestone-text">75% - 爱的共鸣解锁</span>
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
    
    <!-- 宾客互动二维码 -->
    <div class="guest-interaction" v-show="isPlaying">
      <div class="qr-code-section">
        <div class="qr-code-container">
          <div class="qr-code">
            <div class="qr-pattern">
              <!-- 简化的二维码图案 -->
              <div class="qr-row" v-for="row in qrPattern" :key="row.id">
                <div 
                  v-for="(cell, index) in row.pattern" 
                  :key="index"
                  class="qr-cell"
                  :class="{ 'filled': cell }"
                ></div>
              </div>
            </div>
            <div class="qr-overlay">
              <div class="heart-icon">💕</div>
            </div>
          </div>
          <div class="qr-shine"></div>
        </div>
        
        <div class="interaction-info">
          <h4>宾客助力</h4>
          <p>扫码为新人加速</p>
          <p class="time-bonus">⏰ -5秒</p>
          <p>已加速</p>
          <p class="time-bonus">⏰ {{scanCount * 5}}秒</p>
          <div class="scan-count">
            <span class="count-number">{{ scanCount }}</span>
            <span class="count-text">位宾客已助力</span>
          </div>
        </div>
        
        <!-- 模拟扫码按钮 -->
        <button @click="simulateScan" class="simulate-scan-btn" v-show="countdown > 0">
          模拟扫码助力
        </button>
      </div>
      
      <!-- 扫码特效 -->
      <div class="scan-effects" v-show="showScanEffect">
        <div class="scan-particles">
          <div v-for="n in 8" :key="n" class="scan-particle"
               :style="{ '--angle': n * 45 + 'deg' }">
            ⭐
          </div>
        </div>
        <div class="time-reduction-text">-5秒!</div>
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
const totalCountdownTime = ref(300) // 可配置的倒计时总时长（秒）
const countdown = ref(300) // 当前倒计时剩余时间
const loveIntensity = ref(0)
const loveFrequency = ref(432)
const scanCount = ref(0) // 扫码次数
const showScanEffect = ref(false) // 扫码特效

// 二维码图案数据
const qrPattern = ref([
  { id: 1, pattern: [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1] },
  { id: 2, pattern: [1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,1] },
  { id: 3, pattern: [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1] },
  { id: 4, pattern: [1,0,1,1,1,0,1,0,0,1,0,0,1,1,1,0,1] },
  { id: 5, pattern: [1,0,1,1,1,0,1,0,1,1,1,0,1,1,1,0,1] },
  { id: 6, pattern: [1,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,1] },
  { id: 7, pattern: [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1] },
  { id: 8, pattern: [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0] },
  { id: 9, pattern: [1,0,1,1,0,1,1,1,0,1,1,1,0,1,1,0,1] },
  { id: 10, pattern: [0,1,0,1,1,0,0,0,1,0,0,0,1,1,0,1,0] },
  { id: 11, pattern: [1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,1,1] },
  { id: 12, pattern: [0,0,0,1,0,0,0,0,0,1,0,0,0,1,0,0,0] },
  { id: 13, pattern: [1,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,1] },
  { id: 14, pattern: [1,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,1] },
  { id: 15, pattern: [1,0,1,1,1,0,1,0,1,0,1,0,1,1,1,0,1] },
  { id: 16, pattern: [1,0,1,1,1,0,1,0,0,1,0,0,1,1,1,0,1] },
  { id: 17, pattern: [1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1] }
])

let heartbeatInterval: number | null = null
let countdownInterval: number | null = null
let animationTimeline: gsap.core.Timeline | null = null

// 格式化时间显示
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}

// 开始倒计时
const startCountdown = () => {
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
  
  countdownInterval = setInterval(() => {
    countdown.value--
    
    // 随着倒计时减少，爱意浓度逐渐增加（基于可配置的总时间计算）
    const timeProgress = (totalCountdownTime.value - countdown.value) / totalCountdownTime.value
    loveIntensity.value = Math.round(timeProgress * 100)
    
    // 爱意浓度达到特定阈值时的提示效果
    if (loveIntensity.value === 25 && !heartsSynced.value) {
      // 25%时提示可以同步心跳
      showMilestoneNotification('💫 心跳同步功能已解锁！')
    }
    
    if (loveIntensity.value === 75 && heartsSynced.value) {
      // 75%时提示可以爱的共鸣
      showMilestoneNotification('💕 爱的共鸣功能已解锁！')
    }
    
    // 倒计时结束时的特效
    if (countdown.value <= 0) {
      clearInterval(countdownInterval!)
      countdownInterval = null
      loveIntensity.value = 100
      
      // 如果还没有触发爱情波动，自动触发
      if (heartsSynced.value && !showLoveWaves.value) {
        createLoveWave()
      }
    }
  }, 1000)
}

// 显示里程碑通知
const showMilestoneNotification = (message: string) => {
  // 创建临时通知元素
  const notification = document.createElement('div')
  notification.className = 'milestone-notification'
  notification.textContent = message
  
  const container = document.querySelector('.heartbeat-container')
  if (container) {
    container.appendChild(notification)
    
    // 动画效果
    gsap.fromTo(notification, {
      opacity: 0,
      y: 20,
      scale: 0.8
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: "back.out(1.7)"
    })
    
    // 3秒后移除
    setTimeout(() => {
      gsap.to(notification, {
        opacity: 0,
        y: -20,
        scale: 0.8,
        duration: 0.3,
        onComplete: () => {
          if (notification.parentNode) {
            notification.parentNode.removeChild(notification)
          }
        }
      })
    }, 3000)
  }
}

// 模拟扫码功能
const simulateScan = () => {
  if (countdown.value <= 0) return
  
  // 增加扫码次数
  scanCount.value++
  
  // 减少5秒倒计时
  countdown.value = Math.max(0, countdown.value - 5)
  
  // 立即更新爱意浓度（基于可配置的总时间）
  const timeProgress = (totalCountdownTime.value - countdown.value) / totalCountdownTime.value
  loveIntensity.value = Math.round(timeProgress * 100)
  
  // 显示扫码特效
  showScanEffect.value = true
  
  // 扫码特效动画
  gsap.fromTo('.scan-particles', {
    scale: 0,
    opacity: 0
  }, {
    scale: 1,
    opacity: 1,
    duration: 0.3,
    ease: "back.out(1.7)"
  })
  
  gsap.fromTo('.time-reduction-text', {
    y: 20,
    opacity: 0,
    scale: 0.5
  }, {
    y: -50,
    opacity: 1,
    scale: 1.5,
    duration: 1,
    ease: "power2.out"
  })
  
  // 显示感谢通知
  showMilestoneNotification(`🎉 感谢第${scanCount.value}位宾客的助力！`)
  
  // 2秒后隐藏特效
  setTimeout(() => {
    showScanEffect.value = false
  }, 2000)
  
  // 检查是否达到特定阈值
  if (loveIntensity.value === 25 && !heartsSynced.value) {
    showMilestoneNotification('💫 心跳同步功能已解锁！')
  }
  
  if (loveIntensity.value === 75 && heartsSynced.value) {
    showMilestoneNotification('💕 爱的共鸣功能已解锁！')
  }
  
  // 如果倒计时归零
  if (countdown.value <= 0) {
    loveIntensity.value = 100
    
    if (countdownInterval) {
      clearInterval(countdownInterval)
      countdownInterval = null
    }
    
    // 如果还没有触发爱情波动，自动触发
    if (heartsSynced.value && !showLoveWaves.value) {
      createLoveWave()
    }
  }
}

const startHeartbeat = () => {
  if (isPlaying.value) return
  
  isPlaying.value = true
  boyHeartBeat.value = true
  girlHeartBeat.value = true
  
  // 初始化倒计时为总时长
  countdown.value = totalCountdownTime.value
  
  // 开始倒计时
  startCountdown()
  
  // 开始心跳动画
  startHeartbeatAnimation()
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
  timeline.to({}, { duration: 5 }) // 等待一些时间让用户看到倒计时
  
  timeline.call(() => { syncHeartbeats() }, [], "+=1")
  timeline.to({}, { duration: 3 })
  
  // 不再自动触发爱情波动，由倒计时结束触发
  
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
  countdown.value = totalCountdownTime.value
  loveIntensity.value = 0
  scanCount.value = 0
  showScanEffect.value = false
  
  gsap.set(heartsRef.value, { opacity: 0, scale: 0.5 })
  
  if (heartbeatInterval) {
    clearInterval(heartbeatInterval)
    heartbeatInterval = null
  }
  
  if (countdownInterval) {
    clearInterval(countdownInterval)
    countdownInterval = null
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
  if (countdownInterval) {
    clearInterval(countdownInterval)
  }
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

.time-controls {
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

.countdown-config {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.countdown-config label {
  font-size: 0.9rem;
  color: #FFD700;
  font-weight: bold;
}

.time-input {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  padding: 0.5rem;
  color: white;
  text-align: center;
  width: 80px;
  font-size: 0.9rem;
}

.time-input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.time-display {
  font-size: 1rem;
  font-weight: bold;
  color: #32CD32;
  background: rgba(50, 205, 50, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 15px;
  border: 1px solid rgba(50, 205, 50, 0.3);
}

.heartbeat-controls h3 {
  margin-bottom: 1rem;
  color: #FF69B4;
}

.time-controls h3 {
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
  position: relative;
  overflow: hidden;
}

.sync-btn.available {
  background: linear-gradient(45deg, #32CD32, #228B22);
  color: white;
  box-shadow: 0 0 15px rgba(50, 205, 50, 0.5);
  animation: button-ready-pulse 2s infinite;
}

.love-btn {
  background: linear-gradient(45deg, #FF69B4, #FF1493);
  color: white;
  position: relative;
  overflow: hidden;
}

.love-btn.available {
  background: linear-gradient(45deg, #DC143C, #B22222);
  color: white;
  box-shadow: 0 0 15px rgba(220, 20, 60, 0.6);
  animation: button-ready-pulse 2s infinite;
}

@keyframes button-ready-pulse {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 0 15px rgba(50, 205, 50, 0.5);
  }
  50% { 
    transform: scale(1.05);
    box-shadow: 0 0 25px rgba(50, 205, 50, 0.8);
  }
}

.control-buttons button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
  filter: grayscale(50%);
}

.control-buttons button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.emotion-levels {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.countdown-display {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.countdown-display label {
  font-size: 1rem;
  color: #FFD700;
  font-weight: bold;
}

.countdown-timer {
  background: linear-gradient(45deg, #FF69B4, #FF1493);
  border-radius: 15px;
  padding: 8px 16px;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
  animation: countdown-pulse 1s infinite;
}

.countdown-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  font-family: 'Courier New', monospace;
}

@keyframes countdown-pulse {
  0%, 100% { 
    transform: scale(1);
    box-shadow: 0 4px 15px rgba(255, 105, 180, 0.4);
  }
  50% { 
    transform: scale(1.05);
    box-shadow: 0 6px 20px rgba(255, 105, 180, 0.6);
  }
}

.emotion-bar {
  display: flex;
  align-items: center;
  gap: 1rem;
  position: relative;
}

.emotion-bar label {
  width: 80px;
  font-size: 0.9rem;
  text-align: right;
  color: #FFD700;
  font-weight: bold;
}

.bar {
  flex: 1;
  height: 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.bar-fill {
  height: 100%;
  transition: width 0.8s ease;
  border-radius: 6px;
  position: relative;
  overflow: hidden;
}

.bar-fill.love {
  background: linear-gradient(90deg, 
    #FF69B4 0%, 
    #FF1493 30%, 
    #DC143C 60%, 
    #B22222 90%, 
    #8B0000 100%);
  box-shadow: inset 0 2px 4px rgba(255,255,255,0.3);
  animation: love-glow 2s infinite;
}

@keyframes love-glow {
  0%, 100% { 
    box-shadow: inset 0 2px 4px rgba(255,255,255,0.3);
  }
  50% { 
    box-shadow: inset 0 2px 4px rgba(255,255,255,0.3), 0 0 10px rgba(255, 105, 180, 0.6);
  }
}

.love-sparkles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
}

.sparkle {
  font-size: 8px;
  animation: sparkle-dance 1.5s infinite;
  color: white;
  text-shadow: 0 0 3px rgba(255,255,255,0.8);
}

@keyframes sparkle-dance {
  0%, 100% { 
    transform: scale(1) rotate(0deg);
    opacity: 0.8;
  }
  50% { 
    transform: scale(1.3) rotate(180deg);
    opacity: 1;
  }
}

.love-percentage {
  min-width: 40px;
  text-align: center;
  font-weight: bold;
  color: #FF69B4;
  font-size: 0.9rem;
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

/* 爱意里程碑 */
.love-milestones {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.milestone {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.milestone.reached {
  background: linear-gradient(45deg, rgba(50, 205, 50, 0.3), rgba(32, 178, 170, 0.3));
  border-color: rgba(50, 205, 50, 0.5);
  box-shadow: 0 0 10px rgba(50, 205, 50, 0.3);
  animation: milestone-celebration 1s ease-out;
}

@keyframes milestone-celebration {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
    box-shadow: 0 0 15px rgba(50, 205, 50, 0.5);
  }
  100% {
    transform: scale(1);
  }
}

.milestone-icon {
  font-size: 1rem;
  animation: icon-celebration 2s infinite;
}

.milestone.reached .milestone-icon {
  animation: icon-celebration-active 1s infinite;
}

@keyframes icon-celebration {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  50% { transform: scale(1.1); opacity: 0.8; }
}

@keyframes icon-celebration-active {
  0%, 100% { transform: scale(1) rotate(0deg); }
  25% { transform: scale(1.2) rotate(10deg); }
  50% { transform: scale(1.3) rotate(0deg); }
  75% { transform: scale(1.2) rotate(-10deg); }
}

.milestone-text {
  font-size: 0.8rem;
  color: #FFD700;
  font-weight: 500;
}

.milestone.reached .milestone-text {
  color: #32CD32;
  font-weight: bold;
}

/* 里程碑通知 */
.milestone-notification {
  position: fixed;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(45deg, #32CD32, #228B22);
  color: white;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  z-index: 1000;
  box-shadow: 0 8px 25px rgba(50, 205, 50, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

/* 宾客互动二维码 */
.guest-interaction {
  position: fixed;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  z-index: 100;
}

.qr-code-section {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
  backdrop-filter: blur(15px);
  border-radius: 20px;
  padding: 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  text-align: center;
  min-width: 200px;
}

.qr-code-container {
  position: relative;
  margin-bottom: 1rem;
}

.qr-code {
  position: relative;
  width: 120px;
  height: 120px;
  background: white;
  border-radius: 8px;
  margin: 0 auto;
  padding: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.qr-pattern {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.qr-row {
  display: flex;
  gap: 1px;
  flex: 1;
}

.qr-cell {
  flex: 1;
  background: transparent;
  border-radius: 1px;
}

.qr-cell.filled {
  background: #333;
}

.qr-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background: linear-gradient(45deg, #FF69B4, #FF1493);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(255, 105, 180, 0.4);
}

.heart-icon {
  font-size: 16px;
  animation: heart-pulse 2s infinite;
}

@keyframes heart-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.qr-shine {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  background: conic-gradient(from 0deg, transparent, #FF69B4, transparent, #FF1493, transparent);
  border-radius: 12px;
  z-index: -1;
  animation: qr-rotate 3s linear infinite;
}

@keyframes qr-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.interaction-info {
  color: white;
  margin-bottom: 1rem;
}

.interaction-info h4 {
  margin: 0 0 0.5rem 0;
  color: #FFD700;
  font-size: 1.1rem;
}

.interaction-info p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  opacity: 0.9;
}

.time-bonus {
  font-size: 1rem !important;
  font-weight: bold;
  color: #32CD32 !important;
  animation: bonus-glow 2s infinite;
}

@keyframes bonus-glow {
  0%, 100% { text-shadow: 0 0 5px #32CD32; }
  50% { text-shadow: 0 0 15px #32CD32, 0 0 25px #32CD32; }
}

.scan-count {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: rgba(255, 215, 0, 0.2);
  border-radius: 10px;
  border: 1px solid rgba(255, 215, 0, 0.3);
}

.count-number {
  font-size: 1.5rem;
  font-weight: bold;
  color: #FFD700;
  margin-right: 0.5rem;
}

.count-text {
  font-size: 0.8rem;
  color: #FFD700;
}

.simulate-scan-btn {
  background: linear-gradient(45deg, #FF69B4, #FF1493);
  color: white;
  border: none;
  padding: 0.8rem 1.2rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(255, 105, 180, 0.3);
}

.simulate-scan-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 105, 180, 0.5);
}

/* 扫码特效 */
.scan-effects {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  pointer-events: none;
}

.scan-particles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
}

.scan-particle {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 16px;
  animation: particle-explode 2s ease-out;
  transform-origin: center;
}

@keyframes particle-explode {
  0% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(-60px) scale(1.2);
    opacity: 0;
  }
}

.time-reduction-text {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  font-size: 2rem;
  font-weight: bold;
  color: #32CD32;
  text-shadow: 0 0 10px #32CD32;
  animation: text-float-up 1s ease-out;
}

@keyframes text-float-up {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(0.5);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-50px) scale(1.5);
  }
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
  
  .time-controls {
    width: 95%;
    padding: 1rem;
  }
  
  .countdown-config {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .control-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .emotion-bar {
    flex-direction: column;
    gap: 0.5rem;
    align-items: stretch;
  }
  
  .emotion-bar label {
    text-align: center;
    width: auto;
  }
  
  .countdown-display {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  .love-milestones {
    margin-top: 0.5rem;
  }
  
  .milestone {
    padding: 0.3rem;
  }
  
  .milestone-text {
    font-size: 0.7rem;
  }
  
  .love-message h2 {
    font-size: 1.8rem;
  }
  
  .controls {
    flex-direction: column;
    align-items: center;
  }
  
  .guest-interaction {
    position: relative;
    top: auto;
    right: auto;
    transform: none;
    margin: 1rem auto;
    width: 90%;
    max-width: 300px;
  }
  
  .qr-code-section {
    padding: 1rem;
  }
  
  .qr-code {
    width: 100px;
    height: 100px;
  }
  
  .interaction-info h4 {
    font-size: 1rem;
  }
  
  .simulate-scan-btn {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
  }
}
</style>