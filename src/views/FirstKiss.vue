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
          <div class="bench-back">
            <div class="bench-details"></div>
          </div>
          <div class="bench-seat">
            <div class="bench-cushion"></div>
          </div>
          <div class="bench-legs">
            <div class="leg left"></div>
            <div class="leg right"></div>
          </div>
        </div>
        
        <div class="street-lamp" :class="{ 'lit': isEvening || isNight }">
          <div class="lamp-post">
            <div class="post-details"></div>
          </div>
          <div class="lamp-light">
            <div class="light-bulb"></div>
            <div class="light-glow"></div>
            <div class="light-rays" v-show="isEvening || isNight">
              <div v-for="ray in 8" :key="ray" class="light-ray" 
                   :style="{ '--ray-angle': ray * 45 + 'deg' }"></div>
            </div>
          </div>
        </div>
        
        <!-- 增强的浪漫树林 -->
        <div class="romantic-trees">
          <div v-for="n in 5" :key="n" class="romantic-tree" 
               :style="{ left: (n * 18 + 5) + '%', zIndex: 6 - n }">
            <div class="tree-trunk">
              <div class="trunk-texture"></div>
            </div>
            <div class="tree-crown">
              <div class="leaves-layer-1"></div>
              <div class="leaves-layer-2"></div>
              <div v-if="showPetals" v-for="p in 8" :key="p" 
                   class="petal" 
                   :style="{ 
                     animationDelay: (p * 0.4 + n * 0.2) + 's',
                     '--start-x': (Math.random() * 40 - 20) + 'px',
                     '--end-x': (Math.random() * 100 - 50) + 'px'
                   }">
                🌸
              </div>
            </div>
            <!-- 树下小草 -->
            <div class="grass-patch">
              <div v-for="grass in 3" :key="grass" class="grass-blade"
                   :style="{ left: (grass * 20 + Math.random() * 10) + '%' }"></div>
            </div>
          </div>
        </div>
        
        <!-- 背景装饰元素 -->
        <div class="background-decorations">
          <!-- 远山轮廓 -->
          <div class="mountains">
            <div class="mountain" v-for="m in 3" :key="m"
                 :style="{ left: (m * 35 - 10) + '%' }"></div>
          </div>
          
          <!-- 云朵 -->
          <div class="clouds" v-show="!isNight">
            <div v-for="cloud in 4" :key="cloud" class="cloud"
                 :style="{ 
                   left: (cloud * 20 + 10) + '%', 
                   top: (5 + Math.random() * 15) + '%',
                   animationDelay: cloud * 2 + 's'
                 }">☁️</div>
          </div>
          
          <!-- 蝴蝶 -->
          <div class="butterflies" v-show="!isNight">
            <div v-for="butterfly in 2" :key="butterfly" class="butterfly"
                 :style="{ 
                   left: (butterfly * 40 + 20) + '%',
                   animationDelay: butterfly * 3 + 's'
                 }">🦋</div>
          </div>
          
          <!-- 小鸟 -->
          <div class="birds" v-show="!isNight">
            <div v-for="bird in 3" :key="bird" class="bird"
                 :style="{ 
                   left: (bird * 30 + 10) + '%',
                   top: (10 + bird * 5) + '%',
                   animationDelay: bird * 4 + 's'
                 }">🐦</div>
          </div>
        </div>
        
        <!-- 地面细节 -->
        <div class="ground-details">
          <!-- 小径 -->
          <div class="pathway">
            <div class="path-stones">
              <div v-for="stone in 6" :key="stone" class="stone"
                   :style="{ 
                     left: (stone * 15 + 10) + '%',
                     bottom: (stone % 2 * 5 + 5) + '%'
                   }"></div>
            </div>
          </div>
          
          <!-- 花床 -->
          <div class="flower-beds">
            <div class="flower-bed left">
              <div v-for="flower in 5" :key="flower" class="small-flower"
                   :style="{ 
                     left: (flower * 18) + '%',
                     animationDelay: flower * 0.5 + 's'
                   }">🌺</div>
            </div>
            <div class="flower-bed right">
              <div v-for="flower in 5" :key="flower" class="small-flower"
                   :style="{ 
                     left: (flower * 18) + '%',
                     animationDelay: flower * 0.5 + 1 + 's'
                   }">🌷</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 情侣角色 -->
      <div class="couple-scene" ref="coupleRef">
        <div class="boy-nervous" :class="{ 'leaning': isLeaning, 'nervous-animation': showThoughts }">
          <div class="head">
            <div class="hair boy-hair">
              <div class="hair-shine"></div>
            </div>
            <div class="eyes" :class="{ 'closed': eyesClosed, 'blinking': !eyesClosed }">•  •</div>
            <div class="eyebrows nervous-brows"></div>
            <div class="blush boy-blush" v-show="isLeaning">
              <div class="blush-glow"></div>
            </div>
            <div class="mouth" :class="{ 'nervous': !eyesClosed, 'kissing': eyesClosed }">
              <div v-if="eyesClosed" class="kiss-sparkle">✨</div>
            </div>
            <!-- 表情细节 -->
            <div class="expression-details">
              <div v-show="showThoughts" class="nervous-sweat">💦</div>
              <div v-show="isLeaning" class="love-eyes">😍</div>
            </div>
          </div>
          <div class="body boy-body">
            <div class="collar">
              <div class="collar-button"></div>
            </div>
            <div class="shirt-pattern"></div>
            <div class="heart-beat" v-show="isLeaning">💓</div>
            <div v-show="showThoughts" class="nervous-tremor"></div>
          </div>
          <div class="arms">
            <div class="arm left" :class="{ 'reaching': isLeaning, 'nervous': showThoughts }">
              <div class="hand">✋</div>
            </div>
            <div class="arm right" :class="{ 'reaching': isLeaning, 'nervous': showThoughts }">
              <div class="hand">🤚</div>
            </div>
          </div>
          <div class="legs">
            <div class="leg left"></div>
            <div class="leg right"></div>
            <div class="feet">
              <div class="shoe left"></div>
              <div class="shoe right"></div>
            </div>
          </div>
          <div class="thought-bubble enhanced" v-show="showThoughts">
            <div class="bubble-content">
              <span class="thought-icon">💭</span>
              <span class="thought-text">"她好美..."</span>
              <div class="bubble-tail"></div>
            </div>
          </div>
        </div>
        
        <div class="girl-shy" :class="{ 'leaning': isLeaning, 'shy-animation': showThoughts }">
          <div class="head">
            <div class="hair girl-hair">
              <div class="hair-shine"></div>
              <div class="hair-flow"></div>
            </div>
            <div class="hair-accessory">
              <div class="accessory-sparkle">✨</div>
            </div>
            <div class="eyes" :class="{ 'closed': eyesClosed, 'shy-look': !eyesClosed }">•  •</div>
            <div class="eyebrows shy-brows"></div>
            <div class="blush girl-blush" v-show="showBlush || isLeaning">
              <span class="blush-emoji">😊</span>
              <div class="blush-glow"></div>
            </div>
            <div class="mouth" :class="{ 'shy': !eyesClosed, 'kissing': eyesClosed }">
              <div v-if="eyesClosed" class="kiss-sparkle">💖</div>
            </div>
            <!-- 表情细节 -->
            <div class="expression-details">
              <div v-show="showThoughts" class="shy-gesture">🙈</div>
              <div v-show="isLeaning" class="love-aura">💕</div>
            </div>
          </div>
          <div class="body girl-body">
            <div class="dress-details">
              <div class="dress-pattern"></div>
              <div class="dress-bow">🎀</div>
            </div>
            <div class="heart-beat" v-show="isLeaning">💕</div>
            <div v-show="showThoughts" class="shy-posture"></div>
          </div>
          <div class="arms">
            <div class="arm left" :class="{ 'reaching': isLeaning, 'shy': showThoughts }">
              <div class="hand delicate">👋</div>
            </div>
            <div class="arm right" :class="{ 'reaching': isLeaning, 'shy': showThoughts }">
              <div class="hand delicate">🤲</div>
            </div>
          </div>
          <div class="legs">
            <div class="leg left"></div>
            <div class="leg right"></div>
            <div class="feet">
              <div class="shoe left delicate"></div>
              <div class="shoe right delicate"></div>
            </div>
          </div>
          <div class="thought-bubble enhanced" v-show="showThoughts">
            <div class="bubble-content">
              <span class="thought-icon">💭</span>
              <span class="thought-text">"好害羞..."</span>
              <div class="bubble-tail"></div>
            </div>
          </div>
        </div>
        
        <!-- 情侣间的连接效果 -->
        <div class="couple-connection" v-show="isLeaning">
          <div class="love-energy">
            <div v-for="n in 5" :key="n" class="energy-particle"
                 :style="{ 
                   '--particle-delay': n * 0.2 + 's',
                   '--particle-angle': n * 72 + 'deg'
                 }">💫</div>
          </div>
          <div class="invisible-bond"></div>
        </div>
      </div>
      
      <!-- 增强的魔法效果 -->
      <div class="magic-effects enhanced" v-show="showMagic">
        <!-- 闪烁精灵 -->
        <div class="sparkles">
          <div v-for="n in 25" :key="n" class="sparkle" 
               :style="{ 
                 left: (40 + Math.random() * 20) + '%',
                 top: (30 + Math.random() * 40) + '%',
                 animationDelay: Math.random() * 3 + 's',
                 '--sparkle-color': sparkleColors[n % 5]
               }">
            <div class="sparkle-core">✨</div>
            <div class="sparkle-rays"></div>
          </div>
        </div>
        
        <!-- 爱心爆炸 -->
        <div class="heart-explosion enhanced">
          <div v-for="n in 18" :key="n" class="explosion-heart"
               :style="{ 
                 '--angle': n * 20 + 'deg',
                 '--distance': (n % 3 + 1) * 50 + 'px',
                 animationDelay: Math.random() * 0.8 + 's'
               }">
            <div class="heart-trail"></div>
            <span class="heart-emoji">💖</span>
          </div>
        </div>
        
        <!-- 爱情光环 -->
        <div class="love-aura enhanced">
          <div class="aura-ring" v-for="n in 5" :key="n" 
               :style="{ 
                 animationDelay: n * 0.6 + 's',
                 '--ring-color': auraColors[n % 3]
               }">
            <div class="ring-sparkles">
              <div v-for="spark in 8" :key="spark" class="ring-sparkle"
                   :style="{ '--spark-angle': spark * 45 + 'deg' }">✨</div>
            </div>
          </div>
        </div>
        
        <!-- 飞舞的花瓣 -->
        <div class="flying-petals">
          <div v-for="n in 20" :key="n" class="flying-petal"
               :style="{ 
                 left: Math.random() * 100 + '%',
                 animationDelay: Math.random() * 4 + 's',
                 '--drift-x': (Math.random() * 200 - 100) + 'px',
                 '--petal-type': petalTypes[n % 4]
               }">
            <div class="petal-body">🌸</div>
            <div class="petal-shadow"></div>
          </div>
        </div>
        
        <!-- 星尘漩涡 -->
        <div class="stardust-swirl">
          <div v-for="n in 30" :key="n" class="stardust-particle"
               :style="{ 
                 '--swirl-radius': (n % 3 + 1) * 40 + 'px',
                 '--swirl-angle': n * 12 + 'deg',
                 animationDelay: n * 0.1 + 's'
               }">✨</div>
        </div>
        
        <!-- 爱情波纹 -->
        <div class="love-ripples">
          <div v-for="n in 6" :key="n" class="ripple"
               :style="{ animationDelay: n * 0.4 + 's' }">
            <div class="ripple-heart">💕</div>
          </div>
        </div>
        
        <!-- 初吻光芒 -->
        <div class="kiss-radiance">
          <div class="radiance-center">
            <div class="radiance-pulse">💫</div>
          </div>
          <div v-for="n in 12" :key="n" class="radiance-ray"
               :style="{ '--ray-angle': n * 30 + 'deg' }"></div>
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
import { ref, onMounted, computed } from 'vue'
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

// 增强的视觉效果配置
const sparkleColors = ['#FFD700', '#FF69B4', '#87CEEB', '#98FB98', '#DDA0DD']
const auraColors = ['rgba(255, 105, 180, 0.6)', 'rgba(135, 206, 235, 0.5)', 'rgba(255, 215, 0, 0.4)']
const petalTypes = ['🌸', '🌺', '🌹', '🌷']

// 根据时间计算背景渐变 - 调整为更柔和的色调
const backgroundGradient = computed(() => {
  if (isNight.value) {
    return 'linear-gradient(to bottom, #0A0A1F 0%, #1A1A2E 30%, #2D2D3F 60%, #3A3A4F 100%)'
  } else if (isEvening.value) {
    return 'linear-gradient(to bottom, #4A4A6A 0%, #6B5B95 30%, #8E7CC3 60%, #A8A4CE 100%)'
  } else {
    return 'linear-gradient(to bottom, #6FA8DC 0%, #8BB8E8 30%, #A8C8EC 60%, #C5D8F0 100%)'
  }
})

const setTime = (time: 'day' | 'evening' | 'night') => {
  isEvening.value = time === 'evening'
  isNight.value = time === 'night'
}

const playKissAnimation = () => {
  if (isPlaying.value) return
  
  isPlaying.value = true
  resetAnimation()
  
  const timeline = gsap.timeline()
  
  // 设置白天场景开始
  timeline.call(() => { setTime('day') })
  
  // 情侣出现在长椅上
  timeline.to(coupleRef.value, {
    opacity: 1,
    scale: 1,
    duration: 1.5,
    ease: "back.out(1.7)"
  })
  
  // 显示背景装饰元素
  timeline.to('.background-decorations', {
    opacity: 1,
    duration: 1,
    ease: "power2.out"
  }, "-=1")
  
  // 显示内心想法
  timeline.call(() => { showThoughts.value = true }, [], "+=0.5")
  timeline.to({}, { duration: 2.5 })
  
  // 转向黄昏
  timeline.call(() => { 
    setTime('evening')
    showThoughts.value = false
  })
  
  // 街灯亮起
  timeline.to('.light-rays', {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "power2.out"
  })
  
  // 开始花瓣飘落
  timeline.call(() => { showPetals.value = true }, [], "+=0.5")
  
  // 相互靠近
  timeline.call(() => { 
    isLeaning.value = true 
    showBlush.value = true
  }, [], "+=1")
  timeline.to(coupleRef.value, {
    scale: 1.3,
    duration: 2.5,
    ease: "power2.inOut"
  })
  
  // 转向夜晚
  timeline.call(() => { 
    setTime('night')
  }, [], "+=1")
  
  // 闭上眼睛
  timeline.call(() => { eyesClosed.value = true }, [], "+=1.5")
  
  // 初吻时刻 - 魔法效果
  timeline.call(() => { 
    showMagic.value = true
    kissHappened.value = true
  }, [], "+=1")
  
  // 屏幕闪光效果 - 调整为更柔和的亮度
  timeline.to('.first-kiss-container', {
    filter: 'brightness(1.2) saturate(1.1)',
    duration: 0.4,
    yoyo: true,
    repeat: 2,
    ease: "power2.inOut"
  })
  
  // 晨动效果
  timeline.to('.couple-scene', {
    y: -10,
    duration: 0.3,
    yoyo: true,
    repeat: 1,
    ease: "power2.inOut"
  }, "-=0.5")
  
  // 显示故事文字
  timeline.call(() => { showNarration.value = true }, [], "+=2")
  
  timeline.call(() => { isPlaying.value = false }, [], "+=4")
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
  
  gsap.set(coupleRef.value, { opacity: 0, scale: 0.5, y: 0 })
  gsap.set('.background-decorations', { opacity: 0 })
  gsap.set('.light-rays', { opacity: 0, scale: 0.5 })
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
  background: v-bind(backgroundGradient);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 3s ease;
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
  background: linear-gradient(to bottom, #8B7EC8 0%, #B39BC8 50%, #C8A8D8 100%);
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
  filter: drop-shadow(0 0 8px rgba(255, 228, 181, 0.6));
}

/* 增强的长椅细节 */
.park-bench {
  position: absolute;
  bottom: 25%;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 70px;
  filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.3));
}

.bench-back {
  position: absolute;
  top: 0;
  width: 100%;
  height: 45px;
  background: linear-gradient(45deg, #8B4513, #A0522D);
  border-radius: 12px 12px 0 0;
  position: relative;
}

.bench-details {
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 3px;
  background: #654321;
  border-radius: 1px;
  box-shadow: 0 15px 0 #654321, 0 25px 0 #654321;
}

.bench-seat {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 25px;
  background: linear-gradient(to bottom, #A0522D, #8B4513);
  border-radius: 8px;
  position: relative;
}

.bench-cushion {
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 8px;
  background: #CD853F;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.2);
}

.bench-legs {
  position: absolute;
  bottom: -15px;
  width: 100%;
  height: 15px;
}

.leg {
  position: absolute;
  bottom: 0;
  width: 8px;
  height: 15px;
  background: #696969;
  border-radius: 0 0 4px 4px;
}

.leg.left { left: 15px; }
.leg.right { right: 15px; }

/* 增强的街灯 */
.street-lamp {
  position: absolute;
  bottom: 30%;
  right: 15%;
  width: 25px;
  height: 140px;
  filter: drop-shadow(1px 2px 4px rgba(0,0,0,0.4));
}

.lamp-post {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 110px;
  background: linear-gradient(to right, #696969, #808080, #696969);
  border-radius: 5px;
  position: relative;
}

.post-details {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 4px;
  background: #555;
  border-radius: 2px;
  box-shadow: 0 30px 0 #555, 0 60px 0 #555;
}

.lamp-light {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 35px;
  height: 25px;
  position: relative;
}

.light-bulb {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 15px;
  background: #E6D16A;
  border-radius: 50%;
  opacity: 0;
  transition: opacity 2s ease;
  box-shadow: 0 0 10px rgba(230, 209, 106, 0.6);
}

.street-lamp.lit .light-bulb {
  opacity: 1;
}

.light-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(230, 209, 106, 0.3) 0%, rgba(230, 209, 106, 0.15) 50%, transparent 70%);
  border-radius: 50%;
  opacity: 0;
  transition: opacity 2s ease;
}

.street-lamp.lit .light-glow {
  opacity: 1;
}

.light-rays {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  opacity: 0;
  scale: 0.5;
}

.light-ray {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 60px;
  background: linear-gradient(to bottom, rgba(230, 209, 106, 0.5), transparent);
  transform-origin: bottom center;
  transform: translate(-50%, -100%) rotate(var(--ray-angle));
  animation: ray-flicker 3s infinite ease-in-out;
}

@keyframes ray-flicker {
  0%, 100% { opacity: 0.3; height: 60px; }
  50% { opacity: 0.6; height: 80px; }
}

/* 增强的浪漫树林 */
.romantic-trees {
  position: absolute;
  bottom: 30%;
  width: 100%;
  height: 120px;
}

.romantic-tree {
  position: absolute;
  bottom: 0;
  width: 70px;
  height: 100px;
  filter: drop-shadow(1px 2px 3px rgba(0,0,0,0.3));
}

.tree-trunk {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 14px;
  height: 40px;
  background: linear-gradient(to right, #654321, #8B4513, #654321);
  border-radius: 2px;
  position: relative;
}

.trunk-texture {
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 30px;
  background: repeating-linear-gradient(
    0deg,
    transparent 0px,
    transparent 2px,
    rgba(0,0,0,0.1) 2px,
    rgba(0,0,0,0.1) 3px
  );
}

.tree-crown {
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  position: relative;
}

.leaves-layer-1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, #228B22 40%, #32CD32 70%, #90EE90 100%);
  border-radius: 50%;
  animation: leaf-sway 4s ease-in-out infinite;
}

.leaves-layer-2 {
  position: absolute;
  top: 5px;
  left: 5px;
  width: 80%;
  height: 80%;
  background: radial-gradient(circle, #32CD32 30%, #90EE90 80%);
  border-radius: 50%;
  animation: leaf-sway 4s ease-in-out infinite reverse;
}

@keyframes leaf-sway {
  0%, 100% { transform: rotate(-2deg) scale(1); }
  50% { transform: rotate(2deg) scale(1.05); }
}

.petal {
  position: absolute;
  font-size: 16px;
  animation: enhanced-petal-fall 6s infinite ease-out;
  filter: drop-shadow(0 1px 2px rgba(0,0,0,0.2));
}

@keyframes enhanced-petal-fall {
  0% {
    opacity: 1;
    transform: translateY(-30px) translateX(var(--start-x)) rotate(0deg) scale(1);
  }
  25% {
    opacity: 0.9;
    transform: translateY(50px) translateX(calc(var(--start-x) * 0.7)) rotate(90deg) scale(1.1);
  }
  50% {
    opacity: 0.8;
    transform: translateY(130px) translateX(calc(var(--start-x) * 0.3)) rotate(180deg) scale(0.9);
  }
  75% {
    opacity: 0.6;
    transform: translateY(210px) translateX(var(--end-x)) rotate(270deg) scale(1.05);
  }
  100% {
    opacity: 0;
    transform: translateY(300px) translateX(calc(var(--end-x) * 1.2)) rotate(360deg) scale(0.8);
  }
}

.grass-patch {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 8px;
}

.grass-blade {
  position: absolute;
  bottom: 0;
  width: 2px;
  height: 8px;
  background: linear-gradient(to top, #228B22, #32CD32);
  border-radius: 50% 50% 0 0;
  animation: grass-wave 3s ease-in-out infinite;
}

@keyframes grass-wave {
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
}

/* 背景装饰元素 */
.background-decorations {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease;
}

.mountains {
  position: absolute;
  bottom: 40%;
  width: 100%;
  height: 30%;
  z-index: -1;
}

.mountain {
  position: absolute;
  bottom: 0;
  width: 120px;
  height: 80px;
  background: linear-gradient(45deg, #708090 0%, #B0C4DE 50%, #778899 100%);
  clip-path: polygon(0% 100%, 20% 60%, 40% 40%, 60% 30%, 80% 45%, 100% 100%);
  opacity: 0.6;
  filter: blur(1px);
}

.clouds {
  position: absolute;
  width: 100%;
  height: 50%;
  top: 0;
}

.cloud {
  position: absolute;
  font-size: 24px;
  animation: cloud-drift 20s linear infinite;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

@keyframes cloud-drift {
  0% { transform: translateX(-50px); }
  100% { transform: translateX(calc(100vw + 50px)); }
}

.butterflies {
  position: absolute;
  width: 100%;
  height: 60%;
  top: 20%;
}

.butterfly {
  position: absolute;
  font-size: 18px;
  animation: butterfly-flutter 8s ease-in-out infinite;
}

@keyframes butterfly-flutter {
  0%, 100% { 
    transform: translateY(0) translateX(0) rotate(0deg); 
  }
  25% { 
    transform: translateY(-20px) translateX(30px) rotate(10deg); 
  }
  50% { 
    transform: translateY(-10px) translateX(60px) rotate(-5deg); 
  }
  75% { 
    transform: translateY(-30px) translateX(90px) rotate(8deg); 
  }
}

.birds {
  position: absolute;
  width: 100%;
  height: 40%;
  top: 5%;
}

.bird {
  position: absolute;
  font-size: 14px;
  animation: bird-fly 12s linear infinite;
}

@keyframes bird-fly {
  0% { 
    transform: translateX(-30px) translateY(0) rotate(0deg); 
  }
  25% { 
    transform: translateX(25vw) translateY(-10px) rotate(-15deg); 
  }
  50% { 
    transform: translateX(50vw) translateY(5px) rotate(10deg); 
  }
  75% { 
    transform: translateX(75vw) translateY(-5px) rotate(-5deg); 
  }
  100% { 
    transform: translateX(calc(100vw + 30px)) translateY(0) rotate(0deg); 
  }
}

/* 地面细节 */
.ground-details {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 30%;
}

.pathway {
  position: absolute;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 20px;
}

.path-stones {
  position: relative;
  width: 100%;
  height: 100%;
}

.stone {
  position: absolute;
  width: 12px;
  height: 8px;
  background: #A9A9A9;
  border-radius: 50%;
  box-shadow: inset 1px 1px 2px rgba(0,0,0,0.2);
}

.flower-beds {
  position: absolute;
  bottom: 20%;
  width: 100%;
  height: 15%;
}

.flower-bed {
  position: absolute;
  bottom: 0;
  width: 80px;
  height: 100%;
}

.flower-bed.left {
  left: 10%;
}

.flower-bed.right {
  right: 10%;
}

.small-flower {
  position: absolute;
  bottom: 0;
  font-size: 12px;
  animation: flower-sway 4s ease-in-out infinite;
}

@keyframes flower-sway {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

/* 增强的情侣角色 */
.couple-scene {
  position: absolute;
  bottom: 25%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 25px;
  align-items: flex-end;
  opacity: 0;
  scale: 0.5;
  filter: drop-shadow(2px 4px 8px rgba(0,0,0,0.3));
}

.boy-nervous, .girl-shy {
  position: relative;
  width: 55px;
  height: 85px;
  transition: all 1.5s ease;
}

.boy-nervous.leaning {
  transform: rotate(8deg) translateX(3px);
  animation: boy-lean-pulse 3s ease-in-out infinite;
}

.girl-shy.leaning {
  transform: rotate(-8deg) translateX(-3px);
  animation: girl-lean-pulse 3s ease-in-out infinite;
}

.boy-nervous.nervous-animation {
  animation: nervous-fidget 2s ease-in-out infinite;
}

.girl-shy.shy-animation {
  animation: shy-sway 2.5s ease-in-out infinite;
}

@keyframes boy-lean-pulse {
  0%, 100% { transform: rotate(8deg) translateX(3px) scale(1); }
  50% { transform: rotate(8deg) translateX(3px) scale(1.02); }
}

@keyframes girl-lean-pulse {
  0%, 100% { transform: rotate(-8deg) translateX(-3px) scale(1); }
  50% { transform: rotate(-8deg) translateX(-3px) scale(1.02); }
}

@keyframes nervous-fidget {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  25% { transform: translateY(-1px) rotate(0.5deg); }
  75% { transform: translateY(1px) rotate(-0.5deg); }
}

@keyframes shy-sway {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-2px) rotate(1deg); }
}

.head {
  position: relative;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  margin: 0 auto 2px;
  overflow: visible;
  transition: all 0.8s ease;
}

.boy-nervous .head {
  background: radial-gradient(circle at 30% 30%, #F4A460, #DEB887, #D2B48C);
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
}

.girl-shy .head {
  background: radial-gradient(circle at 30% 30%, #FFEFD5, #F5DEB3, #F0E68C);
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
}

/* 增强的发型 */
.boy-hair {
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 15px;
  background: linear-gradient(45deg, #654321, #8B4513, #A0522D);
  border-radius: 60% 60% 40% 40%;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.2);
}

.hair-shine {
  position: absolute;
  top: 2px;
  left: 6px;
  width: 8px;
  height: 4px;
  background: rgba(255,255,255,0.3);
  border-radius: 50%;
  filter: blur(1px);
}

.girl-hair {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 22px;
  background: linear-gradient(135deg, #654321, #8B4513, #CD853F);
  border-radius: 50%;
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.15);
}

.hair-flow {
  position: absolute;
  top: 8px;
  right: -2px;
  width: 12px;
  height: 18px;
  background: linear-gradient(45deg, #8B4513, #CD853F);
  border-radius: 0 50% 50% 0;
  transform: rotate(15deg);
  animation: hair-flow-wave 4s ease-in-out infinite;
}

@keyframes hair-flow-wave {
  0%, 100% { transform: rotate(15deg); }
  50% { transform: rotate(20deg); }
}

.hair-accessory {
  position: absolute;
  top: -3px;
  right: 4px;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, #FF69B4, #FF1493);
  border-radius: 50%;
  box-shadow: 
    4px 0 0 -1px #FFB6C1, 
    -2px 3px 0 -1px #FF1493,
    2px 6px 0 -2px #FFB6C1;
  animation: accessory-sparkle 3s ease-in-out infinite;
}

.accessory-sparkle {
  position: absolute;
  top: -2px;
  right: -2px;
  font-size: 4px;
  animation: sparkle-twinkle 2s infinite;
}

@keyframes accessory-sparkle {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.1); }
}

@keyframes sparkle-twinkle {
  0%, 100% { opacity: 0.5; transform: rotate(0deg); }
  50% { opacity: 1; transform: rotate(180deg); }
}

/* 增强的眼睛 */
.eyes {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 6px;
  transition: all 0.8s ease;
  color: #2F4F4F;
  font-weight: bold;
  text-shadow: 0 0 1px rgba(0,0,0,0.3);
}

.eyes.blinking {
  animation: natural-blink 4s infinite;
}

.eyes.shy-look {
  animation: shy-glance 3s ease-in-out infinite;
}

.eyes.closed {
  content: '—  —';
  font-size: 5px;
  opacity: 0.9;
  transform: translate(-50%, -50%) scaleY(0.3);
}

@keyframes natural-blink {
  0%, 90%, 100% { transform: translate(-50%, -50%) scaleY(1); }
  95% { transform: translate(-50%, -50%) scaleY(0.1); }
}

@keyframes shy-glance {
  0%, 80%, 100% { transform: translate(-50%, -50%) translateX(0); }
  10%, 70% { transform: translate(-50%, -50%) translateX(-2px); }
  40%, 60% { transform: translate(-50%, -50%) translateX(2px); }
}

/* 表情细节 */
.expression-details {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.nervous-sweat {
  position: absolute;
  top: 5px;
  right: 2px;
  font-size: 6px;
  animation: sweat-drop 2s ease-in-out infinite;
}

@keyframes sweat-drop {
  0%, 70%, 100% { opacity: 0; transform: translateY(0); }
  10%, 60% { opacity: 1; transform: translateY(2px); }
}

.shy-gesture {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 4px;
  animation: shy-peek 3s infinite;
}

@keyframes shy-peek {
  0%, 90%, 100% { opacity: 0; }
  5%, 85% { opacity: 1; }
}

.love-eyes, .love-aura {
  position: absolute;
  top: 6px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 4px;
  animation: love-float 2s ease-in-out infinite;
}

@keyframes love-float {
  0%, 100% { transform: translateX(-50%) translateY(0) scale(1); }
  50% { transform: translateX(-50%) translateY(-2px) scale(1.2); }
}

/* 增强的脸红和嘴巴 */
.boy-blush {
  position: absolute;
  top: 12px;
  left: 3px;
  width: 5px;
  height: 5px;
  background: rgba(255, 182, 193, 0.8);
  border-radius: 50%;
  box-shadow: 16px 0 0 rgba(255, 182, 193, 0.8);
  animation: blush-intensity 2s ease-in-out infinite;
}

.blush-glow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  background: radial-gradient(circle, rgba(255, 182, 193, 0.3) 0%, transparent 70%);
  border-radius: 50%;
}

@keyframes blush-intensity {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

.girl-blush {
  position: absolute;
  top: 14px;
  left: 50%;
  transform: translate(-50%, -50%);
  position: relative;
}

.blush-emoji {
  font-size: 5px;
  animation: blush-glow-pulse 2s ease-in-out infinite;
}

@keyframes blush-glow-pulse {
  0%, 100% { transform: scale(1); filter: brightness(1); }
  50% { transform: scale(1.1); filter: brightness(1.2); }
}

/* 增强的嘴巴 */
.mouth {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  height: 3px;
  border-radius: 0 0 5px 5px;
  transition: all 0.8s ease;
  position: relative;
}

.mouth.nervous {
  border: 1px solid #8B4513;
  border-top: none;
  background: transparent;
  animation: nervous-mouth-twitch 2s infinite;
}

.mouth.shy {
  width: 3px;
  height: 3px;
  background: #FF69B4;
  border-radius: 50%;
  animation: shy-smile 3s ease-in-out infinite;
}

.mouth.kissing {
  width: 4px;
  height: 4px;
  background: radial-gradient(circle, #FF1493, #DC143C);
  border-radius: 50%;
  transform: translateX(-50%) scale(0.9);
  box-shadow: 0 0 3px rgba(255, 20, 147, 0.6);
}

.kiss-sparkle {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3px;
  animation: kiss-sparkle-dance 1.5s ease-in-out infinite;
}

@keyframes nervous-mouth-twitch {
  0%, 100% { width: 5px; transform: translateX(-50%); }
  50% { width: 3px; transform: translateX(-50%) translateY(-0.5px); }
}

@keyframes shy-smile {
  0%, 100% { transform: translateX(-50%) scale(1); }
  50% { transform: translateX(-50%) scale(1.2); }
}

@keyframes kiss-sparkle-dance {
  0%, 100% { transform: translateX(-50%) rotate(0deg) scale(1); }
  25% { transform: translateX(-50%) rotate(90deg) scale(1.2); }
  50% { transform: translateX(-50%) rotate(180deg) scale(0.8); }
  75% { transform: translateX(-50%) rotate(270deg) scale(1.1); }
}

/* 增强的身体 */
.body {
  position: relative;
  width: 32px;
  height: 40px;
  margin: 0 auto 2px;
  border-radius: 12px;
  overflow: hidden;
}

.boy-body {
  background: linear-gradient(135deg, #4169E1, #6495ED, #87CEEB);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

.girl-body {
  background: linear-gradient(135deg, #FF69B4, #FFB6C1, #FFC0CB);
  box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
}

/* 男生衬衫细节 */
.collar {
  position: absolute;
  top: 4px;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 10px;
  border: 1px solid #fff;
  border-bottom: 2px solid #fff;
  border-radius: 60% 60% 0 0;
  background: rgba(255,255,255,0.1);
}

.collar-button {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 3px;
  background: #E6E6FA;
  border-radius: 50%;
  box-shadow: 0 6px 0 #E6E6FA, 0 12px 0 #E6E6FA;
}

.shirt-pattern {
  position: absolute;
  top: 15px;
  left: 50%;
  transform: translateX(-50%);
  width: 28px;
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    rgba(255,255,255,0.2) 0px,
    rgba(255,255,255,0.2) 2px,
    transparent 2px,
    transparent 4px
  );
}

/* 女生裙子细节 */
.dress-details {
  position: relative;
  width: 100%;
  height: 100%;
}

.dress-pattern {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: 26px;
  height: 6px;
  background: repeating-linear-gradient(
    90deg,
    #FFB6C1 0px,
    #FFB6C1 3px,
    rgba(255,255,255,0.3) 3px,
    rgba(255,255,255,0.3) 6px
  );
  border-radius: 3px;
}

.dress-bow {
  position: absolute;
  top: 2px;
  right: 4px;
  font-size: 6px;
  animation: bow-flutter 4s ease-in-out infinite;
}

@keyframes bow-flutter {
  0%, 100% { transform: rotate(-5deg) scale(1); }
  50% { transform: rotate(5deg) scale(1.1); }
}

/* 心跳效果增强 */
.heart-beat {
  position: absolute;
  top: 18px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  animation: enhanced-heartbeat 1.2s infinite;
  filter: drop-shadow(0 0 3px rgba(255, 20, 147, 0.6));
}

@keyframes enhanced-heartbeat {
  0%, 100% { 
    transform: translateX(-50%) translateY(0) scale(1); 
    opacity: 1;
  }
  25% { 
    transform: translateX(-50%) translateY(-3px) scale(1.3); 
    opacity: 0.9;
  }
  50% { 
    transform: translateX(-50%) translateY(-6px) scale(1.1); 
    opacity: 0.8;
  }
  75% { 
    transform: translateX(-50%) translateY(-3px) scale(1.2); 
    opacity: 0.9;
  }
}

.nervous-tremor {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: body-tremor 0.3s ease-in-out infinite;
}

@keyframes body-tremor {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-1px); }
  75% { transform: translateX(1px); }
}

.shy-posture {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  animation: shy-lean 3s ease-in-out infinite;
}

@keyframes shy-lean {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(-2deg); }
}

/* 增强的手臂 */
.arms {
  position: absolute;
  top: 30px;
  width: 100%;
}

.arm {
  position: absolute;
  width: 8px;
  height: 25px;
  background: linear-gradient(to bottom, #DEB887, #D2B48C);
  border-radius: 4px;
  transition: all 1.2s ease;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
}

.arm.left {
  left: 6px;
  transform: rotate(-25deg);
  transform-origin: top;
}

.arm.right {
  right: 6px;
  transform: rotate(25deg);
  transform-origin: top;
}

.arm.reaching {
  animation: enhanced-reach-out 2.5s ease-in-out infinite;
}

.arm.nervous {
  animation: nervous-arm-fidget 1.5s ease-in-out infinite;
}

.arm.shy {
  animation: shy-arm-gesture 3s ease-in-out infinite;
}

@keyframes enhanced-reach-out {
  0%, 100% { 
    transform: rotate(-15deg) translateY(0) scale(1); 
  }
  50% { 
    transform: rotate(-8deg) translateY(-3px) scale(1.05); 
  }
}

.arm.right.reaching {
  animation: enhanced-reach-out-right 2.5s ease-in-out infinite;
}

@keyframes enhanced-reach-out-right {
  0%, 100% { 
    transform: rotate(15deg) translateY(0) scale(1); 
  }
  50% { 
    transform: rotate(8deg) translateY(-3px) scale(1.05); 
  }
}

@keyframes nervous-arm-fidget {
  0%, 100% { transform: rotate(-25deg) translateX(0); }
  25% { transform: rotate(-30deg) translateX(-1px); }
  75% { transform: rotate(-20deg) translateX(1px); }
}

@keyframes shy-arm-gesture {
  0%, 100% { transform: rotate(25deg) translateY(0); }
  50% { transform: rotate(30deg) translateY(-2px); }
}

/* 手部细节 */
.hand {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 6px;
  animation: hand-wave 4s ease-in-out infinite;
}

.hand.delicate {
  font-size: 5px;
  animation: delicate-gesture 3s ease-in-out infinite;
}

@keyframes hand-wave {
  0%, 100% { transform: translateX(-50%) rotate(0deg); }
  25% { transform: translateX(-50%) rotate(10deg); }
  75% { transform: translateX(-50%) rotate(-10deg); }
}

@keyframes delicate-gesture {
  0%, 100% { transform: translateX(-50%) rotate(0deg) scale(1); }
  50% { transform: translateX(-50%) rotate(5deg) scale(1.1); }
}

/* 增强的腿部 */
.legs {
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 30px;
}

.leg {
  position: absolute;
  bottom: 0;
  width: 8px;
  height: 25px;
  background: linear-gradient(to bottom, #DEB887, #D2B48C);
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
}

.leg.left {
  left: 35%;
}

.leg.right {
  right: 35%;
}

.feet {
  position: absolute;
  bottom: -8px;
  width: 100%;
  height: 8px;
}

.shoe {
  position: absolute;
  bottom: 0;
  width: 12px;
  height: 6px;
  background: #654321;
  border-radius: 0 3px 0 0;
  box-shadow: 0 1px 2px rgba(0,0,0,0.3);
}

.shoe.left {
  left: 32%;
}

.shoe.right {
  right: 32%;
}

.shoe.delicate {
  background: #FFB6C1;
  width: 10px;
  height: 5px;
  border-radius: 2px;
}

/* 增强的思想气泡 */
.thought-bubble.enhanced {
  position: absolute;
  top: -55px;
  left: 50%;
  transform: translateX(-50%);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 248, 255, 0.9));
  border-radius: 20px;
  font-size: 8px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.8);
  border: 1px solid rgba(255,255,255,0.3);
  animation: bubble-float 3s ease-in-out infinite;
}

.bubble-content {
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
}

.thought-icon {
  font-size: 6px;
  animation: icon-pulse 2s ease-in-out infinite;
}

.thought-text {
  font-size: 7px;
  color: #333;
  font-weight: 500;
}

.bubble-tail {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid rgba(255, 255, 255, 0.9);
}

.bubble-tail::before {
  content: '';
  position: absolute;
  top: -12px;
  left: -4px;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  box-shadow: -6px 3px 0 -1px rgba(255, 255, 255, 0.5), -10px 6px 0 -2px rgba(255, 255, 255, 0.3);
}

@keyframes bubble-float {
  0%, 100% { transform: translateX(-50%) translateY(0) scale(1); }
  50% { transform: translateX(-50%) translateY(-3px) scale(1.05); }
}

@keyframes icon-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

/* 情侣连接效果 */
.couple-connection {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 40px;
  pointer-events: none;
}

.love-energy {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
}

.energy-particle {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 8px;
  animation: energy-orbit 4s linear infinite;
  transform-origin: 0 0;
}

@keyframes energy-orbit {
  0% {
    transform: translate(-50%, -50%) rotate(var(--particle-angle)) translateX(20px) rotate(calc(-1 * var(--particle-angle)));
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) rotate(calc(var(--particle-angle) + 360deg)) translateX(20px) rotate(calc(-1 * (var(--particle-angle) + 360deg)));
    opacity: 0.3;
  }
}

.invisible-bond {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 105, 180, 0.3) 20%,
    rgba(255, 20, 147, 0.5) 50%,
    rgba(255, 105, 180, 0.3) 80%,
    transparent 100%
  );
  animation: bond-pulse 2s ease-in-out infinite;
}

@keyframes bond-pulse {
  0%, 100% { opacity: 0.3; transform: translateY(-50%) scaleY(1); }
  50% { opacity: 0.8; transform: translateY(-50%) scaleY(1.5); }
}

/* 增强的魔法效果 */
.magic-effects.enhanced {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
}

/* 增强的闪烁精灵 */
.sparkles {
  position: absolute;
  width: 100%;
  height: 100%;
}

.sparkle {
  position: absolute;
  animation: enhanced-sparkle-shine 3s infinite;
}

.sparkle-core {
  font-size: 14px;
  animation: sparkle-core-pulse 2s ease-in-out infinite;
  filter: drop-shadow(0 0 3px var(--sparkle-color));
}

.sparkle-rays {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 20px;
  height: 20px;
}

.sparkle-rays::before,
.sparkle-rays::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 12px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--sparkle-color), transparent);
  transform: translate(-50%, -50%);
}

.sparkle-rays::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

@keyframes enhanced-sparkle-shine {
  0%, 100% { 
    opacity: 0.3; 
    transform: scale(0.8) rotate(0deg); 
  }
  25% { 
    opacity: 1; 
    transform: scale(1.3) rotate(90deg); 
  }
  50% { 
    opacity: 0.7; 
    transform: scale(1.1) rotate(180deg); 
  }
  75% { 
    opacity: 1; 
    transform: scale(1.4) rotate(270deg); 
  }
}

@keyframes sparkle-core-pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.5); }
}

/* 增强的爱心爆炸 */
.heart-explosion.enhanced {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  height: 250px;
}

.explosion-heart {
  position: absolute;
  top: 50%;
  left: 50%;
  animation: enhanced-heart-explode 4s ease-out infinite;
}

.heart-trail {
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 30px;
  background: linear-gradient(to bottom, rgba(255, 20, 147, 0.8), transparent);
  transform: translateX(-50%);
  border-radius: 1px;
}

.heart-emoji {
  font-size: 18px;
  filter: drop-shadow(0 0 5px #FF1493);
  animation: heart-emoji-spin 4s linear infinite;
}

@keyframes enhanced-heart-explode {
  0% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(0) scale(0.3);
  }
  30% {
    opacity: 1;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(-1 * var(--distance))) scale(1.2);
  }
  70% {
    opacity: 0.8;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(-1.5 * var(--distance))) scale(1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) rotate(var(--angle)) translateY(calc(-2 * var(--distance))) scale(0.6);
  }
}

@keyframes heart-emoji-spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 增强的爱情光环 */
.love-aura.enhanced {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 350px;
}

.aura-ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 3px solid var(--ring-color);
  border-radius: 50%;
  animation: enhanced-aura-expand 4s infinite ease-out;
  box-shadow: 
    0 0 10px var(--ring-color),
    inset 0 0 10px rgba(255, 255, 255, 0.2);
}

.ring-sparkles {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
}

.ring-sparkle {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 8px;
  transform-origin: 0 0;
  animation: ring-sparkle-orbit 3s linear infinite;
}

@keyframes enhanced-aura-expand {
  0% {
    width: 60px;
    height: 60px;
    opacity: 1;
  }
  100% {
    width: 350px;
    height: 350px;
    opacity: 0;
  }
}

@keyframes ring-sparkle-orbit {
  0% {
    transform: translate(-50%, -50%) rotate(var(--spark-angle)) translateX(30px) rotate(calc(-1 * var(--spark-angle)));
  }
  100% {
    transform: translate(-50%, -50%) rotate(calc(var(--spark-angle) + 360deg)) translateX(30px) rotate(calc(-1 * (var(--spark-angle) + 360deg)));
  }
}

/* 飞舞的花瓣 */
.flying-petals {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}

.flying-petal {
  position: absolute;
  top: -20px;
  font-size: 16px;
  animation: enhanced-petal-dance 8s infinite ease-out;
}

.petal-body {
  position: relative;
  animation: petal-rotate 4s linear infinite;
  filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
}

.petal-shadow {
  position: absolute;
  top: 2px;
  left: 1px;
  font-size: inherit;
  color: rgba(0,0,0,0.2);
  z-index: -1;
  filter: blur(1px);
}

@keyframes enhanced-petal-dance {
  0% {
    opacity: 1;
    transform: translateY(0) translateX(0) scale(1);
  }
  25% {
    opacity: 0.9;
    transform: translateY(25vh) translateX(var(--drift-x)) scale(1.1);
  }
  50% {
    opacity: 0.8;
    transform: translateY(50vh) translateX(calc(var(--drift-x) * 0.7)) scale(0.9);
  }
  75% {
    opacity: 0.6;
    transform: translateY(75vh) translateX(calc(var(--drift-x) * 1.3)) scale(1.05);
  }
  100% {
    opacity: 0;
    transform: translateY(100vh) translateX(calc(var(--drift-x) * 1.5)) scale(0.8);
  }
}

@keyframes petal-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 星尘漩涡 */
.stardust-swirl {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
}

.stardust-particle {
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 6px;
  animation: stardust-spiral 6s linear infinite;
  opacity: 0.8;
}

@keyframes stardust-spiral {
  0% {
    transform: translate(-50%, -50%) rotate(var(--swirl-angle)) translateX(var(--swirl-radius)) rotate(calc(-1 * var(--swirl-angle)));
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: translate(-50%, -50%) rotate(calc(var(--swirl-angle) + 720deg)) translateX(calc(var(--swirl-radius) * 1.5)) rotate(calc(-1 * (var(--swirl-angle) + 720deg)));
    opacity: 0;
  }
}

/* 爱情波纹 */
.love-ripples {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
}

.ripple {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 2px solid rgba(255, 105, 180, 0.6);
  border-radius: 50%;
  animation: love-ripple-expand 3s infinite ease-out;
}

.ripple-heart {
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  animation: ripple-heart-float 3s infinite ease-out;
}

@keyframes love-ripple-expand {
  0% {
    width: 30px;
    height: 30px;
    opacity: 1;
  }
  100% {
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}

@keyframes ripple-heart-float {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px) scale(1.3);
  }
}

/* 初吻光芒 */
.kiss-radiance {
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 400px;
}

.radiance-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60px;
  height: 60px;
}

.radiance-pulse {
  font-size: 24px;
  animation: radiance-center-pulse 2s ease-in-out infinite;
  filter: drop-shadow(0 0 15px #FFD700);
}

.radiance-ray {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 100px;
  background: linear-gradient(to bottom, rgba(255, 215, 0, 0.9), rgba(255, 215, 0, 0.3), transparent);
  transform-origin: bottom center;
  transform: translate(-50%, -100%) rotate(var(--ray-angle));
  animation: radiance-ray-pulse 3s ease-in-out infinite;
  border-radius: 2px;
}

@keyframes radiance-center-pulse {
  0%, 100% { 
    transform: scale(1);
    filter: drop-shadow(0 0 8px #E6D16A);
  }
  50% { 
    transform: scale(1.3);
    filter: drop-shadow(0 0 15px #E6D16A) drop-shadow(0 0 20px #B39BC8);
  }
}

@keyframes radiance-ray-pulse {
  0%, 100% { 
    opacity: 0.3;
    height: 100px;
    background: linear-gradient(to bottom, rgba(230, 209, 106, 0.6), rgba(230, 209, 106, 0.2), transparent);
  }
  50% { 
    opacity: 0.7;
    height: 150px;
    background: linear-gradient(to bottom, rgba(230, 209, 106, 0.8), rgba(179, 155, 200, 0.5), rgba(230, 209, 106, 0.2), transparent);
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