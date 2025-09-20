<template>
  <div class="meeting-container">
    <div class="scene-wrapper">
      <div class="background">
        <div class="sky"></div>
        <div class="ground"></div>
        <!-- 地铁站内部环境 -->
        <div class="subway-interior">
          <div class="station-ceiling">
            <div class="ceiling-lights">
              <div class="light-strip" v-for="n in 4" :key="n"></div>
            </div>
          </div>
          <div class="station-walls">
            <div class="wall left-wall">
              <div class="wall-tiles"></div>
            </div>
            <div class="wall right-wall">
              <div class="wall-tiles"></div>
            </div>
          </div>
        </div>
        
        <!-- 地铁车辆经过效果 -->
        <div class="subway-train" v-show="showTrain">
          <div class="train-car">
            <div class="train-windows">
              <div class="window" v-for="n in 4" :key="n"></div>
            </div>
            <div class="train-door">
              <div class="door-line"></div>
            </div>
          </div>
          <div class="train-sound">🚇</div>
        </div>
        
        <!-- 地下支柱 -->
        <div class="underground-pillars">
          <div class="pillar pillar-1">
            <div class="pillar-base"></div>
            <div class="pillar-body"></div>
            <div class="pillar-top"></div>
          </div>
          <div class="pillar pillar-2">
            <div class="pillar-base"></div>
            <div class="pillar-body"></div>
            <div class="pillar-top"></div>
          </div>
          <div class="pillar pillar-3">
            <div class="pillar-base"></div>
            <div class="pillar-body"></div>
            <div class="pillar-top"></div>
          </div>
          <div class="pillar pillar-4">
            <div class="pillar-base"></div>
            <div class="pillar-body"></div>
            <div class="pillar-top"></div>
          </div>
        </div>
        
        <!-- 地铁站台细节 -->
        <div class="platform-details">
          <div class="platform-edge"></div>
          <div class="warning-line"></div>
          <div class="platform-lights">
            <div class="light" v-for="n in 5" :key="n"></div>
          </div>
          <div class="platform-tiles">
            <div class="tile" v-for="n in 8" :key="n"></div>
          </div>
          <div class="subway-tracks">
            <div class="rail rail-1"></div>
            <div class="rail rail-2"></div>
            <div class="rail-ties">
              <div class="tie" v-for="n in 6" :key="n"></div>
            </div>
          </div>
        </div>
        
        <!-- 地铁站内设施 -->
        <div class="station-facilities">
          <div class="info-screen">
            <div class="screen-content">
              <div class="time-display">18:30</div>
              <div class="next-train">下班列车 2分钟</div>
            </div>
          </div>
          <div class="ticket-machines">
            <div class="machine" v-for="n in 2" :key="n">
              <div class="screen"></div>
              <div class="buttons"></div>
            </div>
          </div>
          <div class="station-bench">
            <div class="bench-seat"></div>
            <div class="bench-back"></div>
          </div>
        </div>
        
        <!-- 路人背景人物 - 动图版 -->
        <div class="background-people">
          <!-- 从左到右的人流 -->
          <div class="person person-1 left-to-right gif-person">
            <img :src="backManGif" alt="背景人物" class="person-gif" />
          </div>
          <div class="person person-2 left-to-right gif-person">
            <img :src="backManGif" alt="背景人物" class="person-gif" />
          </div>
          <div class="person person-3 left-to-right gif-person">
            <img :src="backManGif" alt="背景人物" class="person-gif" />
          </div>
          <div class="person person-4 left-to-right gif-person">
            <img :src="backManGif" alt="背景人物" class="person-gif" />
          </div>
          
          <!-- 从右到左的人流 -->
          <div class="person person-5 right-to-left gif-person">
            <img :src="backManGif" alt="背景人物" class="person-gif reverse" />
          </div>
          <div class="person person-6 right-to-left gif-person">
            <img :src="backManGif" alt="背景人物" class="person-gif reverse" />
          </div>
          <div class="person person-7 right-to-left gif-person">
            <img :src="backManGif" alt="背景人物" class="person-gif reverse" />
          </div>
          <div class="person person-8 right-to-left gif-person">
            <img :src="backManGif" alt="背景人物" class="person-gif reverse" />
          </div>
          
          <!-- 站立等车的人 -->
          <div class="person person-waiting-1 waiting gif-person">
            <img :src="backManGif" alt="等车人物" class="person-gif" />
          </div>
          <div class="person person-waiting-2 waiting gif-person">
            <img :src="backManGif" alt="等车人物" class="person-gif" />
          </div>
        </div>
        
        <!-- 地铁指示牌 -->
        <div class="direction-signs">
          <div class="sign exit-sign">
            <span>🚪 A 出口</span>
          </div>
          <div class="sign line-sign">
            <span>🚇 9 号线</span>
          </div>
          <div class="sign transfer-sign">
            <span>⇆ 换乘 5 号线</span>
          </div>
          <div class="digital-clock">
            <div class="clock-display">{{ currentTime }}</div>
          </div>
        </div>
        
        <!-- 地铁站内装饰 -->
        <div class="station-decorations">
          <div class="ceiling-panels">
            <div class="panel" v-for="n in 6" :key="n"></div>
          </div>
          <div class="air-vents">
            <div class="vent" v-for="n in 4" :key="n"></div>
          </div>
          <div class="emergency-exits">
            <div class="exit-light">🟢</div>
            <div class="exit-arrow">→</div>
          </div>
        </div>
      </div>
      
      <div class="characters">
        <div 
          class="boy character" 
          :class="{ walking: boyWalking, stopped: boyStopped }"
          ref="boyRef"
        >
          <div class="head">
            <div class="eyes"></div>
            <div class="nose"></div>
            <div class="mouth" :class="{ smile: boyStopped }"></div>
            <div class="hair boy-hair"></div>
          </div>
          <div class="body">
            <div class="collar"></div>
            <div class="buttons">
              <div class="button"></div>
              <div class="button"></div>
            </div>
          </div>
          <div class="arms">
            <div class="arm left" :class="{ waving: boyStopped }"></div>
            <div class="arm right"></div>
          </div>
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
          <div class="head">
            <div class="eyes"></div>
            <div class="nose"></div>
            <div class="mouth" :class="{ smile: girlStopped }"></div>
            <div class="hair girl-hair"></div>
            <div class="hair-accessory"></div>
          </div>
          <div class="body">
            <div class="dress-pattern"></div>
            <div class="belt"></div>
          </div>
          <div class="arms">
            <div class="arm left"></div>
            <div class="arm right" :class="{ waving: girlStopped }"></div>
          </div>
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
        <h2>在人来人往的地铁遇见...</h2>
        <p>地铁站台上，人流急急，但时间在那一刻静止</p>
        <p>那一眼回眼，是最美的遇见</p>
      </div>
    </div>
    
    <div class="controls">
      <button @click="playAnimation" :disabled="isPlaying" class="play-btn">
        {{ isPlaying ? '正在播放...' : '重新播放站台遇见' }}
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
// 导入动图资源
import backManGif from '@/static/img/back_man.gif'

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
const showTrain = ref(false)
const currentTime = ref('')

// 更新时间显示
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('zh-CN', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: false 
  })
}

// 模拟地铁经过效果
const simulateTrainPass = () => {
  showTrain.value = true
  setTimeout(() => {
    showTrain.value = false
  }, 3000)
}

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
  updateTime()
  // 每分钟更新时间
  setInterval(updateTime, 60000)
  // 每10秒模拟一次地铁经过
  setInterval(simulateTrainPass, 10000)
})
</script>

<style scoped>
.meeting-container {
  min-height: 100vh;
  background: linear-gradient(to bottom, #2F2F2F 0%, #1C1C1C 50%, #000000 100%);
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
  background: linear-gradient(to bottom, #1C1C1C, #2F2F2F);
}

.ground {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30%;
  background: linear-gradient(to bottom, #696969, #2F2F2F);
}

/* 地铁站内部样式 */
.subway-interior {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.station-ceiling {
  position: absolute;
  top: 5%;
  width: 100%;
  height: 15%;
  background: linear-gradient(to bottom, #F5F5F5, #D3D3D3);
  border-bottom: 3px solid #A9A9A9;
}

.ceiling-lights {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  transform: translateY(-50%);
}

.light-strip {
  width: 150px;
  height: 8px;
  background: linear-gradient(to right, #FFFFFF, #F0F0F0, #FFFFFF);
  border-radius: 4px;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
  animation: ceiling-flicker 4s infinite ease-in-out;
}

@keyframes ceiling-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.9; }
}

.station-walls {
  position: absolute;
  top: 20%;
  width: 100%;
  height: 60%;
}

.wall {
  position: absolute;
  width: 15%;
  height: 100%;
  background: linear-gradient(to right, #E6E6E6, #D3D3D3, #E6E6E6);
}

.left-wall {
  left: 0;
}

.right-wall {
  right: 0;
}

.wall-tiles {
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    0deg,
    #FFFFFF 0px,
    #FFFFFF 2px,
    #E6E6E6 2px,
    #E6E6E6 25px
  ),
  repeating-linear-gradient(
    90deg,
    #FFFFFF 0px,
    #FFFFFF 2px,
    #E6E6E6 2px,
    #E6E6E6 25px
  );
}

/* 地下支柱 */
.underground-pillars {
  position: absolute;
  bottom: 25%;
  width: 100%;
  height: 150px;
}

.underground-pillars .pillar {
  position: absolute;
  bottom: 0;
  width: 25px;
  height: 120px;
}

/* 支柱位置分布 */
.pillar-1 {
  left: 8%;
}

.pillar-2 {
  left: 35%;
}

.pillar-3 {
  left: 65%;
}

.pillar-4 {
  left: 92%;
}

.pillar-base {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 15px;
  background: #696969;
  border-radius: 3px;
}

.pillar-body {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 90px;
  background: linear-gradient(to right, #A9A9A9, #D3D3D3, #A9A9A9);
  border-radius: 2px;
}

.pillar-top {
  position: absolute;
  top: 0;
  width: 100%;
  height: 15px;
  background: #696969;
  border-radius: 3px;
}

/* 地铁车辆 */
.subway-train {
  position: absolute;
  bottom: 25%;
  left: -400px;
  width: 320px;
  height: 60px;
  animation: train-pass 4s ease-in-out;
}

.train-car {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, #C0C0C0, #808080);
  border-radius: 8px;
  border: 2px solid #2F4F4F;
}

.train-windows {
  position: absolute;
  top: 12px;
  left: 15px;
  display: flex;
  gap: 12px;
}

.window {
  width: 40px;
  height: 25px;
  background: #4169E1;
  border-radius: 4px;
  border: 2px solid #2F4F4F;
  box-shadow: inset 0 0 8px rgba(255,255,255,0.3);
}

.train-door {
  position: absolute;
  right: 20px;
  top: 8px;
  width: 30px;
  height: 40px;
  background: #696969;
  border-radius: 4px;
  border: 2px solid #2F4F4F;
}

.door-line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 80%;
  background: #2F4F4F;
}

.train-sound {
  position: absolute;
  top: -35px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  animation: train-sound 0.5s infinite;
}

@keyframes train-pass {
  0% { left: -400px; }
  30% { left: 50%; transform: translateX(-50%); }
  70% { left: 50%; transform: translateX(-50%); }
  100% { left: calc(100% + 150px); }
}

@keyframes train-sound {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
/* 站台细节 */
.platform-details {
  position: absolute;
  bottom: 25%;
  width: 100%;
  height: 20px;
}

.platform-tiles {
  position: absolute;
  bottom: 10px;
  width: 100%;
  height: 8px;
  display: flex;
}

.tile {
  flex: 1;
  height: 100%;
  background: #D3D3D3;
  border: 1px solid #A9A9A9;
  margin: 0 1px;
}

.subway-tracks {
  position: absolute;
  bottom: -5px;
  width: 100%;
  height: 15px;
}

.rail {
  position: absolute;
  width: 100%;
  height: 3px;
  background: #2F4F4F;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

.rail-1 {
  top: 2px;
}

.rail-2 {
  top: 8px;
}

.rail-ties {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.tie {
  width: 8px;
  height: 12px;
  background: #8B4513;
  border-radius: 1px;
}

.platform-edge {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 5px;
  background: #2F4F4F;
  border-radius: 2px;
}

.warning-line {
  position: absolute;
  bottom: 5px;
  width: 100%;
  height: 3px;
  background: repeating-linear-gradient(
    90deg,
    #FFD700 0px,
    #FFD700 10px,
    #FF4500 10px,
    #FF4500 20px
  );
}

.platform-lights {
  position: absolute;
  top: -10px;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.light {
  width: 8px;
  height: 8px;
  background: #00FF00;
  border-radius: 50%;
  box-shadow: 0 0 10px #00FF00;
  animation: platform-lights 2s infinite alternate;
}

@keyframes platform-lights {
  0% { opacity: 0.5; }
  100% { opacity: 1; }
}

/* 背景人物 - 动图版 */
.background-people {
  position: absolute;
  bottom: 25%;
  width: 100%;
  height: 50px;
}

.person {
  position: absolute;
  width: 40px;
  height: 40px;
  opacity: 0.8;
  transition: all 0.3s ease;
}

/* 动图人物样式 */
.gif-person {
  display: flex;
  align-items: center;
  justify-content: center;
}

.person-gif {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
  transition: all 0.3s ease;
}

/* 反向动图（从右到左的人流） */
.person-gif.reverse {
  transform: scaleX(-1);
}

/* 从左到右的人流 */
.left-to-right {
  animation: gif-walk-left-to-right 10s infinite linear;
}

.person-1 {
  animation-delay: 0s;
}

.person-2 {
  animation-delay: 2.5s;
}

.person-3 {
  animation-delay: 5s;
}

.person-4 {
  animation-delay: 7.5s;
}

/* 从右到左的人流 */
.right-to-left {
  animation: gif-walk-right-to-left 12s infinite linear;
}

.person-5 {
  animation-delay: 1s;
}

.person-6 {
  animation-delay: 3.5s;
}

.person-7 {
  animation-delay: 6s;
}

.person-8 {
  animation-delay: 8.5s;
}

/* 等车的人 */
.waiting {
  animation: gif-waiting-movement 4s infinite ease-in-out;
}

.person-waiting-1 {
  left: 15%;
  animation-delay: 0s;
}

.person-waiting-2 {
  left: 75%;
  animation-delay: 2s;
}

/* 动图人物动画 */
@keyframes gif-walk-left-to-right {
  0% { 
    transform: translateX(-60px);
    opacity: 0;
  }
  5% {
    opacity: 0.8;
  }
  95% {
    opacity: 0.8;
  }
  100% { 
    transform: translateX(calc(100vw + 60px));
    opacity: 0;
  }
}

@keyframes gif-walk-right-to-left {
  0% { 
    transform: translateX(calc(100vw + 60px));
    opacity: 0;
  }
  5% {
    opacity: 0.8;
  }
  95% {
    opacity: 0.8;
  }
  100% { 
    transform: translateX(-60px);
    opacity: 0;
  }
}

@keyframes gif-waiting-movement {
  0%, 100% { 
    transform: translateY(0) scale(1);
  }
  25% {
    transform: translateY(-2px) scale(1.02);
  }
  50% {
    transform: translateY(-1px) scale(1.01);
  }
  75% {
    transform: translateY(-3px) scale(1.03);
  }
}

/* 鼠标悬停效果 */
.gif-person:hover .person-gif {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(0,0,0,0.5);
}

.gif-person:hover .person-gif.reverse {
  transform: scaleX(-1) scale(1.1);
}







/* 地铁站内设施 */
.station-facilities {
  position: absolute;
  top: 20%;
  width: 100%;
  height: 100px;
}

.info-screen {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 40px;
  background: #000;
  border: 3px solid #2F4F4F;
  border-radius: 5px;
}

.screen-content {
  padding: 5px;
  color: #00FF00;
  font-family: monospace;
  font-size: 8px;
  text-align: center;
}

.time-display {
  font-size: 12px;
  font-weight: bold;
  margin-bottom: 2px;
}

.next-train {
  font-size: 7px;
  opacity: 0.8;
  animation: blink-text 2s infinite;
}

@keyframes blink-text {
  0%, 50% { opacity: 0.8; }
  51%, 100% { opacity: 0.4; }
}

.ticket-machines {
  position: absolute;
  left: 15%;
  top: 20px;
  display: flex;
  gap: 20px;
}

.machine {
  width: 30px;
  height: 50px;
  background: linear-gradient(to bottom, #4682B4, #2F4F4F);
  border-radius: 5px;
  border: 2px solid #1C1C1C;
}

.machine .screen {
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 15px;
  background: #000;
  border: 1px solid #2F4F4F;
  border-radius: 2px;
}

.machine .buttons {
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 15px;
  height: 15px;
  background: repeating-linear-gradient(
    45deg,
    #696969 0px,
    #696969 2px,
    #A9A9A9 2px,
    #A9A9A9 4px
  );
  border-radius: 2px;
}

.station-bench {
  position: absolute;
  right: 15%;
  top: 30px;
  width: 60px;
  height: 25px;
}

.bench-seat {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 8px;
  background: #8B4513;
  border-radius: 4px;
}

.bench-back {
  position: absolute;
  top: 0;
  width: 100%;
  height: 20px;
  background: #A0522D;
  border-radius: 5px 5px 0 0;
}
/* 地铁指示牌 */
.direction-signs {
  position: absolute;
  top: 15%;
  width: 100%;
}

.transfer-sign {
  left: 50%;
  transform: translateX(-50%);
  background: #FF8C00;
}

.digital-clock {
  position: absolute;
  top: 50px;
  right: 15%;
  background: #000;
  color: #00FF00;
  padding: 5px 10px;
  border-radius: 3px;
  border: 2px solid #2F4F4F;
}

.clock-display {
  font-family: 'Courier New', monospace;
  font-size: 12px;
  font-weight: bold;
}

/* 地铁站内装饰 */
.station-decorations {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.ceiling-panels {
  position: absolute;
  top: 5%;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.panel {
  width: 80px;
  height: 12px;
  background: linear-gradient(to bottom, #F0F0F0, #D3D3D3);
  border: 1px solid #A9A9A9;
  border-radius: 2px;
}

.air-vents {
  position: absolute;
  top: 8%;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.vent {
  width: 15px;
  height: 8px;
  background: #2F4F4F;
  border-radius: 2px;
  position: relative;
}

.vent::after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    #696969 0px,
    #696969 2px,
    transparent 2px,
    transparent 4px
  );
  top: 50%;
  transform: translateY(-50%);
}

.emergency-exits {
  position: absolute;
  top: 12%;
  right: 10%;
  display: flex;
  align-items: center;
  gap: 5px;
}

.exit-light {
  font-size: 12px;
  animation: emergency-blink 3s infinite;
}

.exit-arrow {
  color: #00FF00;
  font-size: 14px;
  font-weight: bold;
}

@keyframes emergency-blink {
  0%, 90% { opacity: 1; }
  95% { opacity: 0.3; }
}

.sign {
  position: absolute;
  background: #2F4F4F;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: bold;
  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
}

.exit-sign {
  left: 20%;
  background: #228B22;
}

.line-sign {
  right: 20%;
  background: #4169E1;
}

.characters {
  position: absolute;
  bottom: 25%;
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
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin: 0 auto 2px;
  overflow: visible;
  border: 2px solid #333;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.boy .head {
  background: radial-gradient(circle at 30% 30%, #F5DEB3, #DEB887);
}

.girl .head {
  background: radial-gradient(circle at 30% 30%, #FFEFD5, #F5DEB3);
}

/* 动漫风格眼睛 */
.eyes {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 4px;
  align-items: center;
  width: 16px;
  height: 8px;
}

.eyes::before,
.eyes::after {
  content: '';
  width: 5px;
  height: 7px;
  background: radial-gradient(circle, #000 30%, #333 70%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  box-shadow: 
    inset 1px 1px 2px rgba(255,255,255,0.8),
    0 0 3px rgba(0,0,0,0.3);
  animation: anime-blink 4s infinite;
}

.eyes::before {
  position: absolute;
  left: 0;
}

.eyes::after {
  position: absolute;
  right: 0;
}

/* 眨眼动画 */
@keyframes anime-blink {
  0%, 90%, 100% { 
    transform: scaleY(1);
  }
  95% { 
    transform: scaleY(0.1);
  }
}

/* 可爱的腮红 */
.head::before {
  content: '';
  position: absolute;
  top: 15px;
  left: 3px;
  width: 4px;
  height: 3px;
  background: rgba(255, 182, 193, 0.8);
  border-radius: 50%;
  box-shadow: 18px 0 0 rgba(255, 182, 193, 0.8);
}

/* 动漫鼻子 */
.nose {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 1px;
  background: rgba(0,0,0,0.3);
  border-radius: 50%;
  box-shadow: 0 1px 1px rgba(255,255,255,0.5);
}

/* 动漫嘴巴 */
.mouth {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 3px;
  border: 1px solid #333;
  border-top: none;
  border-radius: 0 0 6px 6px;
  background: rgba(255,255,255,0.9);
  transition: all 0.3s ease;
}

.mouth.smile {
  width: 10px;
  height: 5px;
  border-radius: 0 0 10px 10px;
  animation: smile-sparkle 0.5s ease-out;
}

@keyframes smile-sparkle {
  0% { box-shadow: 0 0 0 rgba(255,215,0,0); }
  50% { box-shadow: 0 0 10px rgba(255,215,0,0.8); }
  100% { box-shadow: 0 0 0 rgba(255,215,0,0); }
}

/* 动漫风格男生发型 */
.boy-hair {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 16px;
  background: linear-gradient(135deg, #8B4513, #A0522D, #8B4513);
  border-radius: 50% 50% 20% 20%;
  border: 2px solid #654321;
  box-shadow: 
    inset 2px 2px 4px rgba(160,82,45,0.8),
    0 2px 6px rgba(0,0,0,0.3);
}

.boy-hair::before {
  content: '';
  position: absolute;
  top: 2px;
  left: 3px;
  width: 6px;
  height: 8px;
  background: #A0522D;
  border-radius: 0 80% 60% 40%;
  transform: rotate(-20deg);
}

.boy-hair::after {
  content: '';
  position: absolute;
  top: 2px;
  right: 3px;
  width: 6px;
  height: 8px;
  background: #A0522D;
  border-radius: 80% 0 40% 60%;
  transform: rotate(20deg);
}

/* 动漫风格女生发型 */
.girl-hair {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 20px;
  background: linear-gradient(135deg, #8B4513, #CD853F, #8B4513);
  border-radius: 60% 60% 30% 30%;
  border: 2px solid #654321;
  box-shadow: 
    inset 2px 2px 6px rgba(205,133,63,0.8),
    0 3px 8px rgba(0,0,0,0.3);
}

.girl-hair::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -4px;
  width: 8px;
  height: 12px;
  background: #CD853F;
  border-radius: 60% 20% 80% 40%;
  transform: rotate(-30deg);
  box-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.girl-hair::after {
  content: '';
  position: absolute;
  top: -2px;
  right: -4px;
  width: 8px;
  height: 12px;
  background: #CD853F;
  border-radius: 20% 60% 40% 80%;
  transform: rotate(30deg);
  box-shadow: -2px 2px 4px rgba(0,0,0,0.2);
}

/* 可爱的发饰 */
.hair-accessory {
  position: absolute;
  top: -5px;
  right: 2px;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #FF69B4, #FF1493);
  border-radius: 50%;
  border: 1px solid #C71585;
  box-shadow: 
    0 0 6px rgba(255,105,180,0.8),
    inset 1px 1px 2px rgba(255,255,255,0.6);
  animation: accessory-twinkle 2s infinite ease-in-out;
}

.hair-accessory::after {
  content: '';
  position: absolute;
  top: -2px;
  right: -4px;
  width: 4px;
  height: 4px;
  background: #FFB6C1;
  border-radius: 50%;
  box-shadow: 0 0 4px rgba(255,182,193,0.8);
}

@keyframes accessory-twinkle {
  0%, 100% { 
    transform: scale(1) rotate(0deg);
    box-shadow: 0 0 6px rgba(255,105,180,0.8);
  }
  50% { 
    transform: scale(1.1) rotate(5deg);
    box-shadow: 0 0 12px rgba(255,105,180,1);
  }
}

.body {
  position: relative;
  width: 32px;
  height: 40px;
  margin: 0 auto 2px;
  border-radius: 16px;
  border: 2px solid #333;
  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
  overflow: hidden;
}

.boy .body {
  background: linear-gradient(135deg, #4169E1, #6495ED, #4169E1);
  position: relative;
}

.boy .body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, 
    transparent 20%, 
    rgba(255,255,255,0.3) 50%, 
    transparent 80%);
  border-radius: 16px 16px 0 0;
}

.girl .body {
  background: linear-gradient(135deg, #FF69B4, #FFB6C1, #FF69B4);
  border-radius: 16px 16px 25px 25px;
  position: relative;
}

.girl .body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 6px;
  background: linear-gradient(90deg, 
    transparent 20%, 
    rgba(255,255,255,0.4) 50%, 
    transparent 80%);
  border-radius: 16px 16px 0 0;
}

/* 男生衬衫领子 */
.collar {
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 10px;
  border: 2px solid #fff;
  border-bottom: 3px solid #fff;
  border-radius: 50% 50% 20% 20%;
  background: rgba(255,255,255,0.1);
  box-shadow: inset 0 2px 4px rgba(255,255,255,0.3);
}

/* 男生衬衫按钮 */
.buttons {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.button {
  width: 3px;
  height: 3px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 
    0 1px 2px rgba(0,0,0,0.3),
    inset 0 1px 1px rgba(255,255,255,0.8);
  border: 1px solid #ddd;
}

/* 女生裙子花纹 */
.dress-pattern {
  position: absolute;
  top: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 26px;
  height: 4px;
  background: repeating-linear-gradient(
    90deg,
    rgba(255,255,255,0.6) 0px,
    rgba(255,255,255,0.6) 3px,
    transparent 3px,
    transparent 6px
  );
  border-radius: 2px;
}

.dress-pattern::after {
  content: '♡ ♡ ♡';
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 6px;
  color: rgba(255,255,255,0.8);
  text-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

/* 女生腰带 */
.belt {
  position: absolute;
  top: 22px;
  left: 50%;
  transform: translateX(-50%);
  width: 28px;
  height: 3px;
  background: linear-gradient(90deg, #FF1493, #FF69B4, #FF1493);
  border-radius: 2px;
  box-shadow: 
    0 1px 3px rgba(0,0,0,0.3),
    inset 0 1px 1px rgba(255,255,255,0.4);
}

.belt::after {
  content: '';
  position: absolute;
  top: -1px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 5px;
  background: #FFD700;
  border-radius: 1px;
  border: 1px solid #DAA520;
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.6);
}

/* 动漫风格手臂 */
.arms {
  position: absolute;
  top: 30px;
  width: 100%;
}

.arm {
  position: absolute;
  width: 8px;
  height: 24px;
  background: radial-gradient(ellipse, #F5DEB3, #DEB887);
  border-radius: 4px;
  border: 1px solid #333;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.arm.left {
  left: 10px;
  transform: rotate(-25deg);
  transform-origin: top;
}

.arm.right {
  right: 10px;
  transform: rotate(25deg);
  transform-origin: top;
}

.arm.waving {
  animation: anime-wave 0.6s ease-in-out infinite;
  box-shadow: 0 0 8px rgba(255,215,0,0.6);
}

@keyframes anime-wave {
  0%, 100% { 
    transform: rotate(25deg) scale(1);
  }
  25% {
    transform: rotate(-5deg) scale(1.05);
  }
  50% { 
    transform: rotate(35deg) scale(1.1);
  }
  75% {
    transform: rotate(10deg) scale(1.05);
  }
}

/* 动漫风格腿部 */
.legs {
  display: flex;
  justify-content: space-between;
  width: 24px;
  margin: 0 auto;
  position: relative;
  top: 3px;
  gap: 4px;
}

.leg {
  width: 10px;
  height: 24px;
  background: linear-gradient(to bottom, #8B4513, #A0522D);
  border-radius: 0 0 12px 12px;
  border: 1px solid #654321;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  position: relative;
}

.leg::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 6px;
  background: linear-gradient(to right, #654321, #8B4513, #654321);
  border-radius: 50%;
  border: 1px solid #333;
  box-shadow: 0 2px 4px rgba(0,0,0,0.4);
}

.walking .leg {
  animation: anime-walking 0.5s infinite alternate;
}

.walking .leg.right {
  animation-delay: 0.25s;
}

@keyframes anime-walking {
  from { 
    transform: translateY(0) rotate(-8deg) scale(1); 
    background: linear-gradient(to bottom, #8B4513, #A0522D);
    box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  }
  to { 
    transform: translateY(-6px) rotate(8deg) scale(1.02); 
    background: linear-gradient(to bottom, #A0522D, #CD853F);
    box-shadow: 0 4px 8px rgba(0,0,0,0.4);
  }
}

.stopped {
  animation: anime-bounce 0.8s ease-out;
}

@keyframes anime-bounce {
  0%, 100% { 
    transform: translateY(0) scale(1);
  }
  25% {
    transform: translateY(-8px) scale(1.05);
  }
  50% { 
    transform: translateY(-12px) scale(1.1);
  }
  75% {
    transform: translateY(-4px) scale(1.02);
  }
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