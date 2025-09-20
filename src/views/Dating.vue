<template>
  <div class="dating-container">
    <div class="scene-wrapper">
      <div class="background" :class="`bg-${currentBackground}`">
        <!-- 默认背景元素 -->
        <div v-show="currentBackground === 'default'" class="default-elements">
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
        
        <!-- 奶茶店背景元素 -->
        <div v-show="currentBackground === 'cafe'" class="bubble-tea-elements">
          <div class="tea-shop-interior">
            <div class="tea-shop-counter">
              <div class="menu-board">
                <div class="menu-title">奶茶菜单</div>
                <div class="menu-items">
                  <div class="menu-item">🧄 珍珠奶茶</div>
                  <div class="menu-item">🍋 芝士奶蓋</div>
                  <div class="menu-item">🍯 焦糖玛奇朵</div>
                </div>
              </div>
              <div class="tea-making-station">
                <div class="tea-machine">
                  <div class="machine-display">
                    <div class="display-text">制作中...</div>
                    <div class="progress-bar">
                      <div class="progress-fill"></div>
                    </div>
                  </div>
                  <div class="machine-buttons">
                    <div class="button btn-1"></div>
                    <div class="button btn-2"></div>
                    <div class="button btn-3"></div>
                  </div>
                  <div class="steam-outlet">
                    <div class="steam-puff" v-for="n in 3" :key="n"></div>
                  </div>
                </div>
                <div class="ingredient-jars">
                  <div class="jar pearls">
                    <div class="jar-label">珍珠</div>
                  </div>
                  <div class="jar powder">
                    <div class="jar-label">奶粉</div>
                  </div>
                  <div class="jar syrup">
                    <div class="jar-label">糖浆</div>
                  </div>
                </div>
                <div class="work-tools">
                  <div class="shaker"></div>
                  <div class="measuring-cup"></div>
                  <div class="stirring-stick"></div>
                </div>
              </div>
            </div>
            <div class="tea-tables">
              <div class="tea-table" v-for="n in 3" :key="n" :style="{ left: n * 25 + 15 + '%' }">
                <div class="table-surface">
                  <div class="table-texture"></div>
                </div>
                <div class="table-items">
                  <div class="bubble-tea-cup">
                    <div class="straw"></div>
                    <div class="tea-liquid">
                      <div class="liquid-foam"></div>
                    </div>
                    <div class="bubbles">
                      <div class="bubble" v-for="b in 4" :key="b"></div>
                    </div>
                    <div class="cup-sleeve"></div>
                  </div>
                  <div class="snacks" v-if="n === 2">
                    <div class="cookie"></div>
                    <div class="cake-slice"></div>
                  </div>
                  <div class="napkins" v-if="n === 1">
                    <div class="napkin" v-for="m in 3" :key="m"></div>
                  </div>
                  <div class="phone" v-if="n === 3">
                    <div class="phone-screen"></div>
                  </div>
                </div>
                <div class="table-shadow"></div>
              </div>
            </div>
            <div class="shop-decorations">
              <div class="neon-signs">
                <div class="neon-sign main">蜜雪冰城</div>
                <div class="neon-sign sub">新鲜现做</div>
                <div class="neon-sign special">优惠大酷送</div>
              </div>
              <div class="wall-plants">
                <div class="plant" v-for="n in 3" :key="n"></div>
              </div>
              <div class="ceiling-fans">
                <div class="fan" v-for="n in 2" :key="n"></div>
              </div>
              <!-- 店内细节装饰 -->
              <div class="shop-details">
                <div class="wall-posters">
                  <div class="poster poster-1">🍭 夏日特饮</div>
                  <div class="poster poster-2">❄️ 冰爽一夏</div>
                  <div class="poster poster-3">❤️ 情侣套餐</div>
                </div>
                <div class="air-conditioning">
                  <div class="ac-unit">
                    <div class="ac-vents">
                      <div class="vent-line" v-for="n in 4" :key="n"></div>
                    </div>
                    <div class="ac-indicator"></div>
                  </div>
                  <div class="cold-air">
                    <div class="air-particle" v-for="n in 6" :key="n"></div>
                  </div>
                </div>
                <div class="floor-tiles">
                  <div class="tile-row" v-for="row in 3" :key="row">
                    <div class="floor-tile" v-for="col in 8" :key="col"></div>
                  </div>
                </div>
                <div class="ambient-lighting">
                  <div class="light-beam" v-for="n in 3" :key="n"></div>
                </div>
                <div class="sound-waves">
                  <div class="wave" v-for="n in 4" :key="n"></div>
                </div>
              </div>
            </div>
            <!-- 奶茶店背景人物 -->
            <div class="tea-shop-customers">
              <!-- 从左到右的顾客流 -->
              <img src="/img/back_man.gif" class="customer-gif customer-1 left-to-right walking-customer" alt="顾客" />
              <img src="/img/back_man.gif" class="customer-gif customer-2 left-to-right walking-customer" alt="顾客" />
              <img src="/img/back_man.gif" class="customer-gif customer-3 left-to-right walking-customer" alt="顾客" />
              
              <!-- 从右到左的顾客流 -->
              <img src="/img/back_man.gif" class="customer-gif customer-4 right-to-left walking-customer" alt="顾客" />
              <img src="/img/back_man.gif" class="customer-gif customer-5 right-to-left walking-customer" alt="顾客" />
              
              <!-- 排队等待的顾客 -->
              <img src="/img/back_man.gif" class="customer-gif customer-waiting-1 waiting-customer" alt="等待顾客" />
              <img src="/img/back_man.gif" class="customer-gif customer-waiting-2 waiting-customer" alt="等待顾客" />
            </div>
          </div>
        </div>
        
        <!-- 公园背景元素 -->
        <div v-show="currentBackground === 'park'" class="park-elements" :class="{ active: currentBackground === 'park' }">
          <!-- 简化的天空 -->
          <div class="park-sky">
            <div class="sun"></div>
            <div class="clouds">
              <div class="cloud" v-for="n in 3" :key="n" :style="{ left: n * 30 + 10 + '%', animationDelay: n * 2 + 's' }"></div>
            </div>
          </div>
          
          <!-- 简化的树木 -->
          <div class="park-trees">
            <div class="tree" v-for="n in 4" :key="n" :style="{ left: n * 20 + 5 + '%' }">
              <div class="tree-trunk"></div>
              <div class="tree-leaves"></div>
            </div>
          </div>
          
          <!-- 简化的草地 -->
          <div class="park-ground">
            <div class="grass"></div>
          </div>
          
          <!-- 简化的背景人物 -->
          <div class="park-visitors" :class="{ active: currentBackground === 'park' }">
            <!-- 慢跑者 - 远离中央情侣 -->
            <img src="/img/back_man.gif" class="visitor-gif jogger" style="left: 8%; animation-delay: 0s;" alt="慢跑者" />
            <img src="/img/back_man.gif" class="visitor-gif jogger" style="left: 88%; animation-delay: 1.5s;" alt="慢跑者" />
            
            <!-- 散步者 - 分布在两侧 -->
            <img src="/img/back_man.gif" class="visitor-gif walker" style="left: 18%; animation-delay: 0.8s;" alt="散步者" />
            <img src="/img/back_man.gif" class="visitor-gif walker" style="right: 8%; animation-delay: 2s;" alt="散步者" />
            
            <!-- 休息者 - 位于侧后方避开中央 -->
            <img src="/img/back_man.gif" class="visitor-gif rest" style="left: 75%; animation-delay: 1s;" alt="休息者" />
          </div>
        </div>
        
        <!-- 火锅店背景元素 -->
        <div v-show="currentBackground === 'hotpot'" class="hotpot-elements">
          <div class="restaurant-interior">
            <!-- 主要餐台区域 -->
            <div class="hotpot-dining-area">
              <!-- 多个火锅桌 -->
              <div class="hotpot-table main-table" style="left: 25%; bottom: 30%;">
                <div class="table-surface round-table"></div>
                <div class="hotpot-pot spicy-pot">
                  <div class="pot-divider"></div>
                  <div class="steam steam-spicy" v-for="s in 4" :key="s"></div>
                  <div class="bubbling-effect"></div>
                </div>
                <div class="table-items">
                  <div class="chopsticks" style="left: 10%; top: 5px;"></div>
                  <div class="sauce-bowl" style="right: 15%; top: 8px;"></div>
                  <div class="beer-bottle" style="left: 70%; top: 2px;"></div>
                </div>
              </div>
              
              <div class="hotpot-table" style="left: 65%; bottom: 25%;">
                <div class="table-surface square-table"></div>
                <div class="hotpot-pot mild-pot">
                  <div class="steam steam-mild" v-for="s in 3" :key="s"></div>
                </div>
                <div class="table-items">
                  <div class="plate" style="left: 20%; top: 10px;"></div>
                  <div class="teapot" style="right: 20%; top: 5px;"></div>
                </div>
              </div>
            </div>
            
            <!-- 中式装饰 -->
            <div class="chinese-decorations">
              <!-- 红灯笼 -->
              <div class="red-lanterns">
                <div class="lantern large-lantern" v-for="n in 3" :key="n" :style="{ left: n * 30 + 10 + '%' }">
                  <div class="lantern-text">福</div>
                  <div class="lantern-tassel"></div>
                </div>
              </div>
              
              <!-- 书法挂画 -->
              <div class="wall-calligraphy">
                <div class="scroll" style="left: 15%; top: 20%;">
                  <div class="scroll-text">火锅一品</div>
                </div>
                <div class="scroll" style="right: 15%; top: 25%;">
                  <div class="scroll-text">麻辣鲜香</div>
                </div>
              </div>
              
              <!-- 中国结 -->
              <div class="chinese-knots">
                <div class="knot" v-for="n in 2" :key="n" :style="{ left: n * 60 + 20 + '%', top: '10%' }"></div>
              </div>
            </div>
            
            <!-- 厨房区域 -->
            <div class="kitchen-area">
              <div class="kitchen-counter">
                <div class="cooking-station">
                  <div class="wok" v-for="n in 2" :key="n" :style="{ left: n * 40 + 10 + '%' }">
                    <div class="fire-flame"></div>
                    <div class="cooking-steam"></div>
                  </div>
                </div>
                <div class="ingredient-prep">
                  <div class="cutting-board"></div>
                  <div class="ingredient-bowls">
                    <div class="bowl vegetables"></div>
                    <div class="bowl meat"></div>
                    <div class="bowl noodles"></div>
                  </div>
                </div>
              </div>
              
              <!-- 厨房烟雾效果 -->
              <div class="kitchen-smoke">
                <div class="smoke-puff heavy" v-for="n in 6" :key="n"></div>
              </div>
            </div>
            
            <!-- 餐厅背景人物 -->
            <div class="hotpot-customers">
              <!-- 用餐中的食客 -->
              <img src="/img/back_man.gif" class="customer-gif dining-customer" style="left: 22%; bottom: 0;" alt="用餐食客" />
              <img src="/img/back_man.gif" class="customer-gif dining-customer" style="left: 32%; bottom: 0;" alt="用餐食客" />
              <img src="/img/back_man.gif" class="customer-gif dining-customer" style="left: 62%; bottom: 0;" alt="用餐食客" />
              
              <!-- 服务员 -->
              <img src="/img/back_man.gif" class="customer-gif waiter moving" style="left: 45%; bottom: 0; animation-delay: 0.5s;" alt="服务员" />
              
              <!-- 等待区的人物 -->
              <img src="/img/back_man.gif" class="customer-gif waiting-customer" style="left: 8%; bottom: 0; animation-delay: 1s;" alt="等待食客" />
              <img src="/img/back_man.gif" class="customer-gif waiting-customer" style="left: 88%; bottom: 0; animation-delay: 1.8s;" alt="等待食客" />
            </div>
            
            <!-- 环境氛围效果 -->
            <div class="restaurant-atmosphere">
              <!-- 暖色灯光 -->
              <div class="warm-lighting">
                <div class="light-beam" v-for="n in 4" :key="n" :style="{ left: n * 25 + '%' }"></div>
              </div>
              
              <!-- 燭火效果 -->
              <div class="candle-lights">
                <div class="candle" v-for="n in 3" :key="n" :style="{ left: n * 35 + 15 + '%' }">
                  <div class="flame"></div>
                </div>
              </div>
              
              <!-- 空气中的香料气息 -->
              <div class="spice-aroma">
                <div class="aroma-particle" v-for="n in 8" :key="n"></div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 夜景背景元素 -->
        <div v-show="currentBackground === 'night'" class="night-elements">
          <div class="night-city">
            <div class="night-buildings">
              <div v-for="n in 6" :key="n" class="night-building" :style="{ height: (n * 25 + 80) + 'px', left: n * 15 + '%' }">
                <div class="building-lights"></div>
              </div>
            </div>
            <div class="street-lights">
              <div class="street-light" v-for="n in 4" :key="n"></div>
            </div>
            <div class="moon"></div>
          </div>
        </div>
        
        <!-- 星空背景元素 -->
        <div v-show="currentBackground === 'starry'" class="starry-elements">
          <div class="cosmic-scene">
            <div class="shooting-stars">
              <div class="shooting-star" v-for="n in 3" :key="n"></div>
            </div>
            <div class="constellation">
              <div class="star-cluster" v-for="n in 4" :key="n"></div>
            </div>
            <div class="crescent-moon"></div>
            <div class="galaxy-swirl"></div>
          </div>
        </div>
      </div>
      
      <div class="couple" ref="coupleRef">
        <div class="boy-dating" :class="{ walking: boyWalking, stopped: boyStopped }">
          <div class="head">
            <div class="eyes"></div>
            <div class="nose"></div>
            <div class="mouth" :class="{ smile: boyStopped }"></div>
            <div class="hair"></div>
          </div>
          <div class="body">
            <div class="collar"></div>
            <div class="buttons">
              <div class="button"></div>
              <div class="button"></div>
            </div>
          </div>
          <div class="arms">
            <div class="arm left"></div>
            <div class="arm right" :class="{ waving: boyStopped }"></div>
          </div>
          <div class="legs">
            <div class="leg left"></div>
            <div class="leg right"></div>
          </div>
        </div>
        
        <div class="girl-dating" :class="{ walking: girlWalking, stopped: girlStopped }">
          <div class="head">
            <div class="eyes"></div>
            <div class="nose"></div>
            <div class="mouth" :class="{ smile: girlStopped }"></div>
            <div class="hair"></div>
            <div class="hair-accessory"></div>
          </div>
          <div class="body">
            <div class="dress-pattern"></div>
            <div class="belt"></div>
          </div>
          <div class="arms">
            <div class="arm left" :class="{ waving: girlStopped }"></div>
            <div class="arm right"></div>
          </div>
          <div class="legs">
            <div class="leg left"></div>
            <div class="leg right"></div>
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
const boyWalking = ref(false)
const girlWalking = ref(false)
const boyStopped = ref(false)
const girlStopped = ref(false)
const currentBackground = ref('default')

const activities = [
  { icon: '☕', text: '喝下午茶聊天', position: '10%', background: 'cafe' },
  { icon: '🚶‍♂️🚶‍♀️', text: '漫步公园', position: '30%', background: 'park' },
  { icon: '🍲', text: '热情火锅', position: '50%', background: 'hotpot' },
  { icon: '🌃', text: '夜景漫步', position: '70%', background: 'night' },
  { icon: '🌟', text: '许下心愿', position: '90%', background: 'starry' }
]

const playDatingAnimation = () => {
  if (isPlaying.value) return
  
  isPlaying.value = true
  // 不要重置人物显示状态，只重置其他效果
  showHands.value = false
  showActivities.value = false
  showBubbles.value = false
  showStoryText.value = false
  currentActivity.value = 0
  boyWalking.value = false
  girlWalking.value = false
  boyStopped.value = false
  girlStopped.value = false
  currentBackground.value = 'default'
  
  const timeline = gsap.timeline()
  
  // 情侣出现 - 先走路动作
  timeline.call(() => {
    boyWalking.value = true
    girlWalking.value = true
  })
  
  // 停下来，露出笑容
  timeline.call(() => {
    boyWalking.value = false
    girlWalking.value = false
    boyStopped.value = true
    girlStopped.value = true
  }, [], "+=1.0")
  
  // 显示牵手
  timeline.call(() => { showHands.value = true }, [], "+=0.5")
  
  // 显示活动
  timeline.call(() => { showActivities.value = true }, [], "+=0.5")
  
  // 依次高亮活动并变换背景 - 调整为3-5秒间隔
  activities.forEach((activity, index) => {
    timeline.call(() => {
      currentActivity.value = index
      currentBackground.value = activity.background
    }, [], `+=${index === 0 ? 1.5 : (index === 1 ? 4 : index === 2 ? 3 : index === 3 ? 5 : 4)}`)
  })
  
  // 情侣移动（模拟约会过程）- 保持走路动画
  timeline.call(() => {
    boyWalking.value = true
    girlWalking.value = true
    boyStopped.value = false
    girlStopped.value = false
  }, [], "+=2")
  
  timeline.to(coupleRef.value, {
    x: 100,
    duration: 3,
    ease: "power2.inOut"
  })
  
  timeline.to(coupleRef.value, {
    x: -50,
    duration: 3,
    ease: "power2.inOut"
  })
  
  timeline.to(coupleRef.value, {
    x: 0,
    duration: 2.5,
    ease: "power2.inOut"
  })
  
  // 最终停下来，露出开心的笑容
  timeline.call(() => {
    boyWalking.value = false
    girlWalking.value = false
    boyStopped.value = true
    girlStopped.value = true
  }, [], "+=1")
  
  // 显示爱心气泡
  timeline.call(() => { showBubbles.value = true }, [], "+=1.5")
  
  // 显示故事文字
  timeline.call(() => { showStoryText.value = true }, [], "+=2")
  
  timeline.call(() => { isPlaying.value = false }, [], "+=3")
}

const resetAnimation = () => {
  showHands.value = false
  showActivities.value = false
  showBubbles.value = false
  showStoryText.value = false
  currentActivity.value = 0
  boyWalking.value = false
  girlWalking.value = false
  boyStopped.value = false
  girlStopped.value = false
  currentBackground.value = 'default'
  
  // 只在需要时重置couple容器的位置，但保持可见
  gsap.set(coupleRef.value, { x: 0 })
}

const nextScene = () => {
  router.push('/movies')
}

onMounted(() => {
  // 初始化显示状态
  gsap.set(coupleRef.value, { opacity: 1, scale: 1, x: 0 })
  // 延迟一点播放动画，让人物先显示
  setTimeout(() => {
    playDatingAnimation()
  }, 500)
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
  transition: all 1s ease-in-out;
}

/* 默认背景 - 公园景色 */
.bg-default {
  background: linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 60%, #90EE90 100%);
}

/* 奶茶店背景 */
.bg-cafe {
  background: linear-gradient(to bottom, #FFE4E1 0%, #FFF0F5 40%, #E6E6FA 100%);
}

.bg-cafe .sky {
  background: linear-gradient(to bottom, #FFE4E1, #FFF0F5);
}

.bg-cafe::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 20%, rgba(255,182,193,0.15) 8%, transparent 8%),
    radial-gradient(circle at 80% 80%, rgba(255,105,180,0.1) 6%, transparent 6%),
    radial-gradient(circle at 40% 40%, rgba(221,160,221,0.1) 4%, transparent 4%);
  background-size: 150px 150px, 100px 100px, 200px 200px;
  animation: bubble-tea-vibes 20s infinite linear;
}

@keyframes bubble-tea-vibes {
  0% { transform: translateX(0) translateY(0); }
  100% { transform: translateX(-50px) translateY(-50px); }
}

/* 公园背景 */
.bg-park {
  background: linear-gradient(to bottom, #87CEEB 0%, #E0F6FF 40%, #90EE90 60%, #228B22 100%);
}

.bg-park .sky {
  background: linear-gradient(to bottom, #87CEEB, #E0F6FF);
}

/* 火锅店背景 */
.bg-hotpot {
  background: linear-gradient(to bottom, #8B0000 0%, #CD5C5C 30%, #F08080 60%, #FFB6C1 100%);
}

.bg-hotpot .sky {
  background: linear-gradient(to bottom, #8B0000, #CD5C5C);
}

.bg-hotpot::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 30% 70%, rgba(255,69,0,0.3) 10%, transparent 10%),
    radial-gradient(circle at 70% 30%, rgba(255,140,0,0.2) 8%, transparent 8%),
    radial-gradient(circle at 50% 90%, rgba(255,0,0,0.1) 15%, transparent 15%);
  background-size: 80px 80px, 120px 120px, 150px 150px;
  animation: hotpot-steam 8s infinite ease-in-out;
}

@keyframes hotpot-steam {
  0%, 100% { opacity: 0.6; transform: scale(1); }
  50% { opacity: 0.9; transform: scale(1.1); }
}

/* 夜景背景 */
.bg-night {
  background: linear-gradient(to bottom, #191970 0%, #483D8B 30%, #2F4F4F 60%, #000000 100%);
}

.bg-night .sky {
  background: linear-gradient(to bottom, #191970, #483D8B);
}

.bg-night::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 20% 10%, #FFD700 1px, transparent 1px),
    radial-gradient(circle at 80% 20%, #FFFFFF 0.5px, transparent 0.5px),
    radial-gradient(circle at 40% 30%, #FFD700 1px, transparent 1px),
    radial-gradient(circle at 90% 40%, #FFFFFF 0.8px, transparent 0.8px),
    radial-gradient(circle at 10% 60%, #FFD700 0.6px, transparent 0.6px),
    radial-gradient(circle at 70% 70%, #FFFFFF 1px, transparent 1px);
  background-size: 200px 200px;
  animation: twinkling-stars 4s infinite ease-in-out;
}

@keyframes twinkling-stars {
  0%, 100% { opacity: 0.8; }
  50% { opacity: 1; }
}

/* 星空背景 */
.bg-starry {
  background: linear-gradient(to bottom, #000428 0%, #004e92 50%, #191970 100%);
}

.bg-starry .sky {
  background: linear-gradient(to bottom, #000428, #004e92);
}

.bg-starry::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: 
    radial-gradient(circle at 15% 15%, #FFD700 2px, transparent 2px),
    radial-gradient(circle at 85% 25%, #FFFFFF 1px, transparent 1px),
    radial-gradient(circle at 35% 35%, #FFD700 1.5px, transparent 1.5px),
    radial-gradient(circle at 65% 45%, #FFFFFF 1px, transparent 1px),
    radial-gradient(circle at 25% 55%, #FFD700 1px, transparent 1px),
    radial-gradient(circle at 75% 65%, #FFFFFF 2px, transparent 2px),
    radial-gradient(circle at 45% 75%, #FFD700 1px, transparent 1px),
    radial-gradient(circle at 95% 85%, #FFFFFF 1.5px, transparent 1.5px);
  background-size: 150px 150px;
  animation: magical-stars 6s infinite ease-in-out;
}

@keyframes magical-stars {
  0%, 100% { 
    opacity: 0.9; 
    transform: scale(1) rotate(0deg);
  }
  33% { 
    opacity: 1; 
    transform: scale(1.1) rotate(120deg);
  }
  66% { 
    opacity: 0.8; 
    transform: scale(0.9) rotate(240deg);
  }
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

/* 奶茶店装饰元素 */
.bubble-tea-elements {
  position: absolute;
  width: 100%;
  height: 100%;
}

.tea-shop-interior {
  position: absolute;
  bottom: 20%;
  width: 100%;
  height: 60%;
}

.tea-shop-counter {
  position: absolute;
  bottom: 0;
  left: 5%;
  width: 200px;
  height: 80px;
  background: linear-gradient(to bottom, #FFB6C1, #FF69B4);
  border-radius: 15px 15px 0 0;
  border: 3px solid #FF1493;
}

.menu-board {
  position: absolute;
  top: -60px;
  left: 10px;
  width: 80px;
  height: 50px;
  background: #2F4F4F;
  border-radius: 8px;
  border: 2px solid #FFD700;
  color: #00FF00;
  font-size: 6px;
  padding: 4px;
  font-family: monospace;
}

.menu-title {
  text-align: center;
  font-weight: bold;
  margin-bottom: 2px;
  color: #FFD700;
}

.menu-items {
  line-height: 1.2;
}

.menu-item {
  font-size: 5px;
  margin-bottom: 1px;
  white-space: nowrap;
  overflow: hidden;
}

.tea-making-station {
  position: absolute;
  top: 10px;
  right: 15px;
  width: 60px;
  height: 50px;
}

.tea-machine {
  position: absolute;
  top: 0;
  left: 0;
  width: 35px;
  height: 40px;
  background: linear-gradient(to bottom, #FF69B4, #FF1493);
  border-radius: 8px;
  border: 2px solid #C71585;
  overflow: hidden;
}

.machine-display {
  position: absolute;
  top: 8px;
  left: 8px;
  width: 18px;
  height: 12px;
  background: #000;
  border-radius: 2px;
  border: 1px solid #FF1493;
  color: #00FF00;
  font-size: 4px;
  text-align: center;
}

.display-text {
  margin-top: 1px;
  font-family: monospace;
}

.progress-bar {
  position: absolute;
  bottom: 1px;
  left: 1px;
  right: 1px;
  height: 2px;
  background: #333;
  border-radius: 1px;
}

.progress-fill {
  height: 100%;
  background: #00FF00;
  border-radius: 1px;
  animation: progress-loading 3s infinite ease-in-out;
}

@keyframes progress-loading {
  0% { width: 0%; }
  50% { width: 80%; }
  100% { width: 100%; }
}

.machine-buttons {
  position: absolute;
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2px;
}

.button {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  border: 1px solid #C71585;
}

.btn-1 {
  background: #FF0000;
  animation: button-blink 2s infinite;
}

.btn-2 {
  background: #00FF00;
  animation: button-blink 2s infinite 0.5s;
}

.btn-3 {
  background: #0000FF;
  animation: button-blink 2s infinite 1s;
}

@keyframes button-blink {
  0%, 80% { opacity: 1; }
  90% { opacity: 0.3; }
}

.steam-outlet {
  position: absolute;
  top: -5px;
  right: 8px;
  width: 8px;
  height: 10px;
}

.steam-puff {
  position: absolute;
  width: 4px;
  height: 6px;
  background: rgba(255,255,255,0.8);
  border-radius: 50%;
  animation: steam-rise 2s infinite ease-out;
}

.steam-puff:nth-child(1) { left: 0; animation-delay: 0s; }
.steam-puff:nth-child(2) { left: 2px; animation-delay: 0.3s; }
.steam-puff:nth-child(3) { left: 4px; animation-delay: 0.6s; }

@keyframes steam-rise {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.5);
  }
  30% {
    opacity: 1;
    transform: translateY(5px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-10px) scale(0.3);
  }
}

.ingredient-jars {
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 40px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.jar {
  width: 100%;
  height: 12px;
  border-radius: 6px;
  border: 1px solid #FF69B4;
}

.jar.pearls {
  background: linear-gradient(to bottom, rgba(0,0,0,0.8), rgba(0,0,0,0.6));
}

.jar.powder {
  background: linear-gradient(to bottom, #DEB887, #D2B48C);
}

.jar.syrup {
  background: linear-gradient(to bottom, #DAA520, #B8860B);
}

.jar-label {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 3px;
  color: #333;
  background: rgba(255,255,255,0.9);
  padding: 1px 2px;
  border-radius: 2px;
  border: 1px solid #FF69B4;
  white-space: nowrap;
}

.work-tools {
  position: absolute;
  bottom: -15px;
  right: 0;
  width: 25px;
  height: 15px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
}

.shaker {
  width: 4px;
  height: 12px;
  background: linear-gradient(to bottom, #C0C0C0, #808080);
  border-radius: 2px 2px 1px 1px;
  border: 1px solid #696969;
  animation: shaker-shake 3s infinite ease-in-out;
}

@keyframes shaker-shake {
  0%, 80% { transform: translateY(0) rotate(0deg); }
  85% { transform: translateY(-1px) rotate(-2deg); }
  90% { transform: translateY(-1px) rotate(2deg); }
  95% { transform: translateY(0) rotate(0deg); }
}

.measuring-cup {
  width: 5px;
  height: 8px;
  background: rgba(255,255,255,0.9);
  border: 1px solid #FF69B4;
  border-radius: 0 0 2px 2px;
}

.measuring-cup::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60%;
  background: linear-gradient(to bottom, #DDA0DD, #DA70D6);
  border-radius: 0 0 1px 1px;
}

.stirring-stick {
  width: 2px;
  height: 10px;
  background: #8B4513;
  border-radius: 1px;
  transform: rotate(15deg);
  animation: stirring-motion 2s infinite ease-in-out;
}

@keyframes stirring-motion {
  0%, 100% { transform: rotate(15deg); }
  50% { transform: rotate(-15deg); }
}

.tea-tables {
  position: absolute;
  bottom: 30%;
  width: 100%;
  height: 40%;
}

.tea-table {
  position: absolute;
  bottom: 0;
  width: 50px;
  height: 45px;
}

.table-surface {
  position: absolute;
  bottom: 20px;
  width: 100%;
  height: 8px;
  background: linear-gradient(to right, #FFB6C1, #FFC0CB, #FFB6C1);
  border-radius: 50%;
  box-shadow: 0 3px 8px rgba(255,105,180,0.4);
  overflow: hidden;
}

.table-texture {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background: 
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 2px,
      rgba(255,255,255,0.1) 2px,
      rgba(255,255,255,0.1) 4px
    );
}

.table-items {
  position: absolute;
  bottom: 28px;
  width: 100%;
  height: 25px;
}

.table-shadow {
  position: absolute;
  bottom: 18px;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 3px;
  background: radial-gradient(ellipse, rgba(0,0,0,0.2), transparent);
  border-radius: 50%;
}

.bubble-tea-cup {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 18px;
  height: 25px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.95), rgba(255,255,255,0.8));
  border: 2px solid #FF69B4;
  border-radius: 0 0 8px 8px;
  position: relative;
  box-shadow: 0 2px 6px rgba(255,105,180,0.3);
}

.cup-sleeve {
  position: absolute;
  top: 8px;
  left: -1px;
  right: -1px;
  height: 6px;
  background: linear-gradient(45deg, #FF1493, #FF69B4);
  border-radius: 2px;
}

.cup-sleeve::after {
  content: '蜜雪';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3px;
  color: #fff;
  font-weight: bold;
}

.liquid-foam {
  position: absolute;
  top: 0;
  width: 100%;
  height: 15%;
  background: linear-gradient(to bottom, rgba(255,255,255,0.9), transparent);
  border-radius: 50%;
  animation: foam-bubble 4s infinite ease-in-out;
}

@keyframes foam-bubble {
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
}

.snacks {
  position: absolute;
  right: 5px;
  top: 5px;
  display: flex;
  gap: 3px;
}

.cookie {
  width: 6px;
  height: 6px;
  background: #D2B48C;
  border-radius: 50%;
  border: 1px solid #8B4513;
}

.cookie::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  width: 2px;
  height: 2px;
  background: #654321;
  border-radius: 50%;
  box-shadow: 2px 1px 0 #654321;
}

.cake-slice {
  width: 8px;
  height: 6px;
  background: linear-gradient(to top, #FFB6C1, #FFFFFF);
  border: 1px solid #FF69B4;
  border-radius: 0 0 4px 4px;
  position: relative;
}

.cake-slice::before {
  content: '';
  position: absolute;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 2px;
  background: #FF1493;
  border-radius: 1px;
}

.napkins {
  position: absolute;
  left: 5px;
  top: 8px;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.napkin {
  width: 8px;
  height: 2px;
  background: rgba(255,255,255,0.9);
  border: 1px solid #FFB6C1;
  border-radius: 1px;
}

.phone {
  position: absolute;
  right: 8px;
  top: 2px;
  width: 8px;
  height: 12px;
  background: #000;
  border-radius: 2px;
  border: 1px solid #333;
}

.phone-screen {
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 2px;
  background: linear-gradient(135deg, #4169E1, #87CEEB);
  border-radius: 1px;
  animation: phone-notification 3s infinite;
}

@keyframes phone-notification {
  0%, 90% { background: linear-gradient(135deg, #4169E1, #87CEEB); }
  95% { background: linear-gradient(135deg, #00FF00, #90EE90); }
}

.straw {
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 15px;
  background: #FF1493;
  border-radius: 1px;
}

.tea-liquid {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70%;
  background: linear-gradient(to bottom, #DDA0DD, #DA70D6);
  border-radius: 0 0 6px 6px;
}

.bubbles {
  position: absolute;
  bottom: 2px;
  width: 100%;
  height: 8px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.bubble {
  width: 3px;
  height: 3px;
  background: #2F4F4F;
  border-radius: 50%;
  animation: bubble-float 2s infinite ease-in-out;
}

.bubble:nth-child(1) { animation-delay: 0s; }
.bubble:nth-child(2) { animation-delay: 0.3s; }
.bubble:nth-child(3) { animation-delay: 0.6s; }
.bubble:nth-child(4) { animation-delay: 0.9s; }

@keyframes bubble-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
}

.shop-decorations {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.neon-signs {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.neon-sign {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  text-shadow: 0 0 10px currentColor;
  animation: neon-glow 3s infinite ease-in-out;
}

.neon-sign.main {
  font-size: 16px;
  color: #FF1493;
  margin-bottom: 5px;
}

.neon-sign.sub {
  font-size: 10px;
  color: #00FF7F;
}

.neon-sign.special {
  font-size: 8px;
  color: #FFD700;
  margin-top: 3px;
  animation-delay: 1s;
}

@keyframes neon-glow {
  0%, 100% { 
    text-shadow: 0 0 10px currentColor, 0 0 20px currentColor;
  }
  50% { 
    text-shadow: 0 0 15px currentColor, 0 0 30px currentColor, 0 0 40px currentColor;
  }
}

.wall-plants {
  position: absolute;
  top: 30%;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.plant {
  width: 15px;
  height: 20px;
  background: linear-gradient(to bottom, #32CD32, #228B22);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: plant-sway 4s infinite ease-in-out;
}

.plant::before {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 5px;
  background: #8B4513;
  border-radius: 4px;
}

@keyframes plant-sway {
  0%, 100% { transform: rotate(-2deg); }
  50% { transform: rotate(2deg); }
}

.ceiling-fans {
  position: absolute;
  top: 5%;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.fan {
  width: 25px;
  height: 25px;
  background: 
    linear-gradient(45deg, transparent 40%, #B0C4DE 40%, #B0C4DE 60%, transparent 60%),
    linear-gradient(-45deg, transparent 40%, #B0C4DE 40%, #B0C4DE 60%, transparent 60%);
  border-radius: 50%;
  animation: fan-rotate 1s infinite linear;
}

@keyframes fan-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* 店内细节装饰 */
.shop-details {
  position: absolute;
  width: 100%;
  height: 100%;
}

.wall-posters {
  position: absolute;
  top: 20%;
  right: 5%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.poster {
  width: 40px;
  height: 15px;
  background: linear-gradient(135deg, #FFE4E1, #FFF0F5);
  border: 2px solid #FF69B4;
  border-radius: 4px;
  font-size: 5px;
  text-align: center;
  line-height: 11px;
  color: #C71585;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(255,105,180,0.3);
}

.air-conditioning {
  position: absolute;
  top: 8%;
  right: 15%;
  width: 30px;
  height: 20px;
}

.ac-unit {
  width: 100%;
  height: 12px;
  background: linear-gradient(to bottom, #F5F5F5, #D3D3D3);
  border: 2px solid #A9A9A9;
  border-radius: 4px;
  position: relative;
}

.ac-vents {
  position: absolute;
  top: 2px;
  left: 3px;
  right: 3px;
  height: 6px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.vent-line {
  width: 1px;
  height: 4px;
  background: #696969;
}

.ac-indicator {
  position: absolute;
  top: 1px;
  right: 2px;
  width: 3px;
  height: 3px;
  background: #00FF00;
  border-radius: 50%;
  animation: ac-blink 2s infinite;
}

@keyframes ac-blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}

.cold-air {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 8px;
}

.air-particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(173,216,230,0.6);
  border-radius: 50%;
  animation: cold-air-flow 3s infinite ease-out;
}

.air-particle:nth-child(1) { left: 20%; animation-delay: 0s; }
.air-particle:nth-child(2) { left: 40%; animation-delay: 0.3s; }
.air-particle:nth-child(3) { left: 60%; animation-delay: 0.6s; }
.air-particle:nth-child(4) { left: 80%; animation-delay: 0.9s; }
.air-particle:nth-child(5) { left: 30%; animation-delay: 1.2s; }
.air-particle:nth-child(6) { left: 70%; animation-delay: 1.5s; }

@keyframes cold-air-flow {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.5);
  }
  30% {
    opacity: 0.8;
    transform: translateY(10px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(25px) scale(0.3);
  }
}

.floor-tiles {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 25%;
  opacity: 0.3;
}

.tile-row {
  display: flex;
  width: 100%;
  height: 33.33%;
}

.floor-tile {
  flex: 1;
  border: 1px solid rgba(255,182,193,0.3);
  background: linear-gradient(45deg, 
    rgba(255,240,245,0.8) 25%, 
    transparent 25%, 
    transparent 75%, 
    rgba(255,240,245,0.8) 75%);
  background-size: 8px 8px;
}

.ambient-lighting {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.light-beam {
  position: absolute;
  width: 50px;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(255,215,0,0.1) 0%, 
    rgba(255,215,0,0.05) 50%, 
    transparent 100%);
  animation: light-sway 8s infinite ease-in-out;
}

.light-beam:nth-child(1) { left: 20%; animation-delay: 0s; }
.light-beam:nth-child(2) { left: 50%; animation-delay: 2s; }
.light-beam:nth-child(3) { left: 80%; animation-delay: 4s; }

@keyframes light-sway {
  0%, 100% { transform: skewX(-2deg); opacity: 0.8; }
  50% { transform: skewX(2deg); opacity: 1; }
}

.sound-waves {
  position: absolute;
  top: 30%;
  left: 10%;
  width: 20px;
  height: 20px;
}

.wave {
  position: absolute;
  width: 100%;
  height: 100%;
  border: 2px solid rgba(255,105,180,0.3);
  border-radius: 50%;
  animation: sound-ripple 4s infinite ease-out;
}

.wave:nth-child(1) { animation-delay: 0s; }
.wave:nth-child(2) { animation-delay: 1s; }
.wave:nth-child(3) { animation-delay: 2s; }
.wave:nth-child(4) { animation-delay: 3s; }

@keyframes sound-ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(2);
    opacity: 0;
  }
}

/* 奶茶店背景人物 */
.tea-shop-customers {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50px;
  z-index: 5;
}

.customer {
  position: absolute;
  width: 25px;
  height: 40px;
  opacity: 0.8;
  transition: all 0.3s ease;
}

/* 背景人物头部 */
.customer-head {
  position: relative;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin: 0 auto 1px;
  border: 1px solid #333;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.customer-1 .customer-head,
.customer-4 .customer-head {
  background: radial-gradient(circle at 30% 30%, #F5DEB3, #DEB887);
}

.customer-2 .customer-head,
.customer-5 .customer-head {
  background: radial-gradient(circle at 30% 30%, #FFEFD5, #F5DEB3);
}

.customer-3 .customer-head,
.customer-waiting-1 .customer-head {
  background: radial-gradient(circle at 30% 30%, #F5DEB3, #DEB887);
}

.customer-waiting-2 .customer-head {
  background: radial-gradient(circle at 30% 30%, #FFEFD5, #F5DEB3);
}

/* 背景人物身体 */
.customer-body {
  position: relative;
  width: 16px;
  height: 20px;
  margin: 0 auto 1px;
  border-radius: 8px;
  border: 1px solid #333;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.customer-1 .customer-body,
.customer-3 .customer-body,
.customer-waiting-1 .customer-body {
  background: linear-gradient(135deg, #4169E1, #6495ED);
}

.customer-2 .customer-body,
.customer-5 .customer-body,
.customer-waiting-2 .customer-body {
  background: linear-gradient(135deg, #FF69B4, #FFB6C1);
  border-radius: 8px 8px 12px 12px;
}

.customer-4 .customer-body {
  background: linear-gradient(135deg, #32CD32, #90EE90);
}

/* 背景人物腿部 */
.customer-legs {
  display: flex;
  justify-content: space-between;
  width: 12px;
  margin: 0 auto;
  position: relative;
  gap: 2px;
}

.customer-legs .leg {
  width: 5px;
  height: 12px;
  background: linear-gradient(to bottom, #8B4513, #A0522D);
  border-radius: 0 0 6px 6px;
  border: 1px solid #654321;
  box-shadow: 0 1px 3px rgba(0,0,0,0.3);
}

/* 手持奶茶效果 */
.tea-cup-hand {
  position: absolute;
  top: 15px;
  right: -3px;
  width: 6px;
  height: 8px;
  background: rgba(255,255,255,0.9);
  border: 1px solid #FF69B4;
  border-radius: 0 0 3px 3px;
}

.tea-cup-hand::before {
  content: '';
  position: absolute;
  top: -2px;
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: 4px;
  background: #FF1493;
}

.tea-cup-hand::after {
  content: '';
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(to bottom, #DDA0DD, #DA70D6);
  border-radius: 0 0 2px 2px;
}

/* 从左到右的顾客流 */
.left-to-right {
  animation: tea-customer-left-to-right 12s infinite linear;
}

.customer-1 {
  animation-delay: 0s;
}

.customer-2 {
  animation-delay: 4s;
}

.customer-3 {
  animation-delay: 8s;
}

/* 从右到左的顾客流 */
.right-to-left {
  animation: tea-customer-right-to-left 14s infinite linear;
  transform: scaleX(-1);
}

.customer-4 {
  animation-delay: 2s;
}

.customer-5 {
  animation-delay: 9s;
}

/* 排队等待的顾客 */
.waiting-customer {
  animation: tea-customer-waiting 3s infinite ease-in-out;
}

.customer-waiting-1 {
  left: 25%;
  animation-delay: 0s;
}

.customer-waiting-2 {
  left: 35%;
  animation-delay: 1.5s;
}

/* 行走的顾客动画 */
.walking-customer .customer-legs .leg {
  animation: tea-customer-walk 0.6s infinite alternate;
}

.walking-customer .customer-legs .leg:nth-child(2) {
  animation-delay: 0.3s;
}

/* 背景人物动画 */
@keyframes tea-customer-left-to-right {
  0% { 
    transform: translateX(-40px);
    opacity: 0;
  }
  5% {
    opacity: 0.8;
  }
  95% {
    opacity: 0.8;
  }
  100% { 
    transform: translateX(calc(100vw + 40px));
    opacity: 0;
  }
}

@keyframes tea-customer-right-to-left {
  0% { 
    transform: scaleX(-1) translateX(-40px);
    opacity: 0;
  }
  5% {
    opacity: 0.8;
  }
  95% {
    opacity: 0.8;
  }
  100% { 
    transform: scaleX(-1) translateX(calc(100vw + 40px));
    opacity: 0;
  }
}

@keyframes tea-customer-waiting {
  0%, 100% { 
    transform: translateY(0) scale(1);
  }
  25% {
    transform: translateY(-1px) scale(1.02);
  }
  50% {
    transform: translateY(-2px) scale(1.01);
  }
  75% {
    transform: translateY(-1px) scale(1.03);
  }
}

@keyframes tea-customer-walk {
  from { 
    transform: translateY(0) rotate(-5deg) scale(1); 
    background: linear-gradient(to bottom, #8B4513, #A0522D);
  }
  to { 
    transform: translateY(-3px) rotate(5deg) scale(1.02); 
    background: linear-gradient(to bottom, #A0522D, #CD853F);
  }
}

/* 鼠标悬停效果 */
.customer:hover {
  transform: scale(1.1);
  z-index: 10;
}

/* 公园装饰元素 */
.park-elements {
  position: absolute;
  width: 100%;
  height: 100%;
}

.park-elements .sky {
  position: absolute;
  top: 0;
  width: 100%;
  height: 70%;
  background: linear-gradient(to bottom, #87CEEB, #E0F6FF, #F0F8FF);
  overflow: hidden;
}

/* 太阳和阳光 */
.sun {
  position: absolute;
  top: 15%;
  right: 20%;
  width: 40px;
  height: 40px;
  background: radial-gradient(circle, #FFD700, #FFA500);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(255,215,0,0.8);
  animation: sun-glow 8s infinite ease-in-out;
}

@keyframes sun-glow {
  0%, 100% { 
    box-shadow: 0 0 30px rgba(255,215,0,0.8);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 50px rgba(255,215,0,1);
    transform: scale(1.05);
  }
}

.sun-rays {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: 80px;
  animation: rays-rotate 20s infinite linear;
}

.ray {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 2px;
  height: 25px;
  background: linear-gradient(to bottom, #FFD700, transparent);
  transform-origin: 0 0;
  border-radius: 1px;
}

.ray:nth-child(1) { transform: rotate(0deg) translateY(-40px); }
.ray:nth-child(2) { transform: rotate(45deg) translateY(-40px); }
.ray:nth-child(3) { transform: rotate(90deg) translateY(-40px); }
.ray:nth-child(4) { transform: rotate(135deg) translateY(-40px); }
.ray:nth-child(5) { transform: rotate(180deg) translateY(-40px); }
.ray:nth-child(6) { transform: rotate(225deg) translateY(-40px); }
.ray:nth-child(7) { transform: rotate(270deg) translateY(-40px); }
.ray:nth-child(8) { transform: rotate(315deg) translateY(-40px); }

@keyframes rays-rotate {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* 飞鸟 */
.birds {
  position: absolute;
  top: 20%;
  width: 100%;
  height: 30%;
}

.bird {
  position: absolute;
  width: 8px;
  height: 6px;
  background: #333;
  border-radius: 50% 0;
  animation: bird-fly 15s infinite linear;
}

.bird:nth-child(1) {
  top: 20%;
  animation-delay: 0s;
}

.bird:nth-child(2) {
  top: 40%;
  animation-delay: 5s;
}

.bird:nth-child(3) {
  top: 60%;
  animation-delay: 10s;
}

.bird::before,
.bird::after {
  content: '';
  position: absolute;
  width: 4px;
  height: 2px;
  background: #333;
  border-radius: 50%;
  animation: wing-flap 1s infinite ease-in-out;
}

.bird::before {
  top: -1px;
  left: -2px;
  transform: rotate(-20deg);
}

.bird::after {
  top: -1px;
  right: -2px;
  transform: rotate(20deg);
}

@keyframes bird-fly {
  0% { 
    left: -20px;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% { 
    left: calc(100% + 20px);
    opacity: 0;
  }
}

@keyframes wing-flap {
  0%, 100% { transform: rotate(-20deg) scaleY(1); }
  50% { transform: rotate(-30deg) scaleY(0.7); }
}

.flowers {
  position: absolute;
  width: 100%;
  height: 100%;
}

.flower {
  position: absolute;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, #FF69B4, #FF1493);
  border-radius: 50%;
  animation: flower-bloom 4s infinite ease-in-out;
}

.flower::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle, rgba(255,105,180,0.6), transparent);
  border-radius: 50%;
}

@keyframes flower-bloom {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.park-bench {
  position: absolute;
  bottom: 30%;
  right: 20%;
  width: 80px;
  height: 30px;
  background: #8B4513;
  border-radius: 4px;
}

.park-bench::before {
  content: '';
  position: absolute;
  top: -15px;
  width: 100%;
  height: 15px;
  background: #A0522D;
  border-radius: 4px 4px 0 0;
}

/* 火锅店装饰元素 - 重新设计 */
.hotpot-elements {
  position: absolute;
  width: 100%;
  height: 100%;
}

.restaurant-interior {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80%;
  background: linear-gradient(to bottom, 
    rgba(139, 69, 19, 0.1) 0%,
    rgba(160, 82, 45, 0.15) 50%,
    rgba(101, 67, 33, 0.2) 100%);
}

/* 餐台区域 */
.hotpot-dining-area {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70%;
}

.hotpot-table {
  position: absolute;
  width: 120px;
  height: 80px;
}

.main-table {
  width: 150px;
  height: 100px;
}

.table-surface {
  position: absolute;
  bottom: 20px;
  width: 100%;
  height: 15px;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
}

.round-table {
  background: linear-gradient(ellipse, #8B4513, #A0522D);
  border: 2px solid #654321;
}

.square-table {
  background: linear-gradient(to bottom, #654321, #8B4513);
  border-radius: 10px;
}

/* 火锅锅子样式 */
.hotpot-pot {
  position: absolute;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid #2F4F4F;
  overflow: visible;
}

.spicy-pot {
  background: radial-gradient(ellipse, #FF4500 20%, #DC143C 60%, #8B0000 100%);
  box-shadow: 0 0 15px rgba(255, 69, 0, 0.6);
  animation: spicy-bubble 2s infinite ease-in-out;
}

.mild-pot {
  background: radial-gradient(ellipse, #F4A460 20%, #DEB887 60%, #CD853F 100%);
  box-shadow: 0 0 10px rgba(244, 164, 96, 0.5);
}

.pot-divider {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 2px;
  height: 80%;
  background: #2F4F4F;
  border-radius: 1px;
}

@keyframes spicy-bubble {
  0%, 100% { 
    box-shadow: 0 0 15px rgba(255, 69, 0, 0.6);
    transform: translateX(-50%) scale(1);
  }
  50% { 
    box-shadow: 0 0 25px rgba(255, 69, 0, 0.9);
    transform: translateX(-50%) scale(1.05);
  }
}

.bubbling-effect {
  position: absolute;
  top: 10%;
  left: 20%;
  width: 60%;
  height: 60%;
  background: radial-gradient(circle, 
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 69, 0, 0.2) 30%,
    transparent 70%);
  border-radius: 50%;
  animation: bubble-pop 1.5s infinite ease-in-out;
}

@keyframes bubble-pop {
  0%, 100% { 
    transform: scale(0.8);
    opacity: 0.6;
  }
  50% { 
    transform: scale(1.2);
    opacity: 1;
  }
}

/* 蒸汽效果 */
.steam {
  position: absolute;
  width: 8px;
  height: 20px;
  background: rgba(255,255,255,0.8);
  border-radius: 50%;
  animation: hotpot-steam-rise 2.5s infinite ease-out;
}

.steam-spicy {
  background: linear-gradient(to top, 
    rgba(255, 69, 0, 0.3) 0%,
    rgba(255, 255, 255, 0.8) 50%,
    rgba(255, 255, 255, 0.4) 100%);
}

.steam-mild {
  background: linear-gradient(to top, 
    rgba(244, 164, 96, 0.3) 0%,
    rgba(255, 255, 255, 0.7) 100%);
}

.steam:nth-child(1) { left: 20%; animation-delay: 0s; }
.steam:nth-child(2) { left: 40%; animation-delay: 0.3s; }
.steam:nth-child(3) { left: 60%; animation-delay: 0.6s; }
.steam:nth-child(4) { left: 80%; animation-delay: 0.9s; }

@keyframes hotpot-steam-rise {
  0% {
    opacity: 0;
    transform: translateY(0) scale(0.5) rotate(0deg);
  }
  30% {
    opacity: 1;
    transform: translateY(-15px) scale(1) rotate(5deg);
  }
  70% {
    opacity: 0.8;
    transform: translateY(-35px) scale(1.2) rotate(-3deg);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px) scale(0.3) rotate(8deg);
  }
}

/* 餐具和物品 */
.table-items {
  position: absolute;
  top: 0;
  width: 100%;
  height: 40px;
}

.chopsticks {
  position: absolute;
  width: 12px;
  height: 2px;
  background: #D2691E;
  border-radius: 1px;
  transform: rotate(15deg);
}

.chopsticks::after {
  content: '';
  position: absolute;
  top: -1px;
  left: 1px;
  width: 12px;
  height: 2px;
  background: #D2691E;
  border-radius: 1px;
  transform: rotate(5deg);
}

.sauce-bowl {
  position: absolute;
  width: 8px;
  height: 8px;
  background: radial-gradient(circle, #8B4513, #654321);
  border-radius: 50%;
  border: 1px solid #2F4F4F;
}

.sauce-bowl::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  width: 6px;
  height: 6px;
  background: linear-gradient(to bottom, #FF4500, #8B0000);
  border-radius: 50%;
}

.beer-bottle {
  position: absolute;
  width: 4px;
  height: 15px;
  background: linear-gradient(to bottom, #228B22, #006400);
  border-radius: 2px 2px 0 0;
  border: 1px solid #2F4F4F;
}

.beer-bottle::before {
  content: '';
  position: absolute;
  top: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: 3px;
  background: #8B4513;
  border-radius: 1px;
}

.plate {
  position: absolute;
  width: 10px;
  height: 10px;
  background: radial-gradient(circle, #FFFFFF, #F5F5F5);
  border-radius: 50%;
  border: 1px solid #DDD;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.teapot {
  position: absolute;
  width: 12px;
  height: 8px;
  background: linear-gradient(to bottom, #8B4513, #654321);
  border-radius: 4px;
  border: 1px solid #2F4F4F;
}

.teapot::before {
  content: '';
  position: absolute;
  top: -2px;
  right: 2px;
  width: 3px;
  height: 3px;
  background: #654321;
  border-radius: 2px;
}

.teapot::after {
  content: '';
  position: absolute;
  top: 2px;
  left: -3px;
  width: 4px;
  height: 2px;
  background: #654321;
  border-radius: 2px 0 0 2px;
}

/* 中式装饰元素 */
.chinese-decorations {
  position: absolute;
  top: 0;
  width: 100%;
  height: 50%;
}

.red-lanterns {
  position: absolute;
  top: 5%;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
}

.lantern {
  position: relative;
  width: 25px;
  height: 40px;
  background: linear-gradient(to bottom, #FF0000 0%, #DC143C 50%, #8B0000 100%);
  border-radius: 12px;
  border: 2px solid #FFD700;
  box-shadow: 
    0 0 15px rgba(255,0,0,0.6),
    inset 0 2px 4px rgba(255,255,255,0.3);
  animation: lantern-glow 3s infinite ease-in-out;
}

.large-lantern {
  width: 30px;
  height: 50px;
}

.lantern-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #FFD700;
  font-size: 12px;
  font-weight: bold;
  text-shadow: 0 1px 2px rgba(0,0,0,0.8);
}

.lantern-tassel {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 3px;
  height: 8px;
  background: linear-gradient(to bottom, #FFD700, #DAA520);
  border-radius: 0 0 2px 2px;
  animation: tassel-sway 2s infinite ease-in-out;
}

.lantern-tassel::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  height: 3px;
  background: #DAA520;
  border-radius: 50%;
}

@keyframes lantern-glow {
  0%, 100% { 
    box-shadow: 0 0 15px rgba(255,0,0,0.6), inset 0 2px 4px rgba(255,255,255,0.3);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 25px rgba(255,0,0,0.9), inset 0 2px 4px rgba(255,255,255,0.4);
    transform: scale(1.02);
  }
}

@keyframes tassel-sway {
  0%, 100% { transform: translateX(-50%) rotate(-2deg); }
  50% { transform: translateX(-50%) rotate(2deg); }
}

.wall-calligraphy {
  position: absolute;
  top: 10%;
  width: 100%;
  height: 30%;
}

.scroll {
  position: absolute;
  width: 60px;
  height: 25px;
  background: linear-gradient(to bottom, #F5DEB3, #DEB887);
  border: 2px solid #8B4513;
  border-radius: 3px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
}

.scroll-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 8px;
  color: #8B4513;
  font-weight: bold;
  writing-mode: vertical-rl;
  text-orientation: upright;
}

.chinese-knots {
  position: absolute;
  top: 0;
  width: 100%;
  height: 20%;
}

.knot {
  position: absolute;
  width: 15px;
  height: 15px;
  background: radial-gradient(circle, #DC143C, #8B0000);
  border-radius: 3px;
  transform: rotate(45deg);
  box-shadow: 0 0 8px rgba(220, 20, 60, 0.6);
}

.knot::before,
.knot::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 8px;
  background: #FFD700;
  border-radius: 50%;
}

.knot::before {
  transform: translate(-50%, -50%) rotate(-45deg) translateX(-3px);
}

.knot::after {
  transform: translate(-50%, -50%) rotate(-45deg) translateX(3px);
}

/* 厨房区域 */
.kitchen-area {
  position: absolute;
  top: 60%;
  right: 0;
  width: 40%;
  height: 40%;
  background: linear-gradient(135deg, 
    rgba(139, 69, 19, 0.2) 0%,
    rgba(160, 82, 45, 0.3) 100%);
  border-radius: 10px 0 0 0;
}

.kitchen-counter {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80%;
  background: linear-gradient(to top, #654321, #8B4513);
  border-radius: 5px 0 0 0;
}

.cooking-station {
  position: absolute;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 40%;
}

.wok {
  position: absolute;
  bottom: 0;
  width: 25px;
  height: 25px;
  background: radial-gradient(circle, #2F4F4F, #000000);
  border-radius: 50% 50% 40% 40%;
  border: 2px solid #1C1C1C;
}

.fire-flame {
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 15px;
  height: 10px;
  background: radial-gradient(ellipse at bottom, 
    #FF4500 0%, 
    #FFD700 30%, 
    #FF6347 60%, 
    transparent 100%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: flame-flicker 0.3s infinite ease-in-out alternate;
}

@keyframes flame-flicker {
  0% { 
    transform: translateX(-50%) scale(1) skewX(0deg);
    opacity: 1;
  }
  100% { 
    transform: translateX(-50%) scale(1.1) skewX(2deg);
    opacity: 0.8;
  }
}

.cooking-steam {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 15px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: cooking-steam-rise 1.5s infinite ease-out;
}

@keyframes cooking-steam-rise {
  0% {
    opacity: 0;
    transform: translateX(-50%) translateY(10px) scale(0.5);
  }
  50% {
    opacity: 1;
    transform: translateX(-50%) translateY(-5px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-20px) scale(0.3);
  }
}

.ingredient-prep {
  position: absolute;
  top: 60%;
  left: 10%;
  width: 80%;
  height: 30%;
}

.cutting-board {
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 15px;
  background: linear-gradient(to bottom, #DEB887, #D2B48C);
  border-radius: 3px;
  border: 1px solid #8B7355;
}

.ingredient-bowls {
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 15px;
  display: flex;
  gap: 3px;
}

.bowl {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  border: 1px solid #2F4F4F;
}

.bowl.vegetables {
  background: radial-gradient(circle, #32CD32, #228B22);
}

.bowl.meat {
  background: radial-gradient(circle, #DC143C, #8B0000);
}

.bowl.noodles {
  background: radial-gradient(circle, #F5DEB3, #DEB887);
}

.kitchen-smoke {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 60%;
}

.smoke-puff.heavy {
  position: absolute;
  width: 25px;
  height: 25px;
  background: rgba(128,128,128,0.4);
  border-radius: 50%;
  animation: heavy-smoke-rise 3s infinite ease-out;
}

.smoke-puff.heavy:nth-child(1) { left: 15%; animation-delay: 0s; }
.smoke-puff.heavy:nth-child(2) { left: 25%; animation-delay: 0.3s; }
.smoke-puff.heavy:nth-child(3) { left: 35%; animation-delay: 0.6s; }
.smoke-puff.heavy:nth-child(4) { left: 45%; animation-delay: 0.9s; }
.smoke-puff.heavy:nth-child(5) { left: 60%; animation-delay: 1.2s; }
.smoke-puff.heavy:nth-child(6) { left: 75%; animation-delay: 1.5s; }

@keyframes heavy-smoke-rise {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.3);
  }
  20% {
    opacity: 0.6;
    transform: translateY(20px) scale(0.8);
  }
  50% {
    opacity: 0.8;
    transform: translateY(0px) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-30px) scale(1.5);
  }
}

/* 火锅店背景人物 */
.hotpot-customers {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  z-index: 2;
}

.customer-gif {
  position: absolute;
  width: 40px;
  height: 60px;
  object-fit: contain;
  transition: all 0.3s ease;
}

.dining-customer {
  animation: hotpot-dining 3s infinite ease-in-out;
}

@keyframes hotpot-dining {
  0%, 80% { 
    transform: scale(1);
  }
  85% {
    transform: scale(1.02) translateY(-2px);
  }
  90% {
    transform: scale(1.05) translateY(-1px);
  }
  95% {
    transform: scale(1.02) translateY(-2px);
  }
  100% {
    transform: scale(1);
  }
}

.waiter {
  animation: waiter-service 4s infinite ease-in-out;
}

@keyframes waiter-service {
  0%, 70% { 
    transform: translateX(0) scale(1);
  }
  80% {
    transform: translateX(10px) scale(1.02);
  }
  90% {
    transform: translateX(-5px) scale(1.01);
  }
  100% {
    transform: translateX(0) scale(1);
  }
}

.waiting-customer {
  animation: customer-waiting 2.5s infinite ease-in-out;
}

@keyframes customer-waiting {
  0%, 100% { 
    transform: translateY(0) scale(1);
  }
  30% {
    transform: translateY(-3px) scale(1.01);
  }
  60% {
    transform: translateY(-1px) scale(1.02);
  }
}

.moving {
  animation: waiter-moving 5s infinite linear;
}

@keyframes waiter-moving {
  0% { transform: translateX(0); }
  25% { transform: translateX(15px); }
  50% { transform: translateX(30px); }
  75% { transform: translateX(15px); }
  100% { transform: translateX(0); }
}

/* 环境氛围效果 */
.restaurant-atmosphere {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.warm-lighting {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
}

.light-beam {
  position: absolute;
  top: 0;
  width: 60px;
  height: 100%;
  background: linear-gradient(to bottom, 
    rgba(255, 223, 0, 0.1) 0%, 
    rgba(255, 140, 0, 0.08) 30%,
    rgba(255, 69, 0, 0.05) 60%,
    transparent 100%);
  animation: warm-light-flicker 4s infinite ease-in-out;
}

.light-beam:nth-child(1) { animation-delay: 0s; }
.light-beam:nth-child(2) { animation-delay: 1s; }
.light-beam:nth-child(3) { animation-delay: 2s; }
.light-beam:nth-child(4) { animation-delay: 3s; }

@keyframes warm-light-flicker {
  0%, 100% { 
    opacity: 0.6;
    transform: skewX(-1deg);
  }
  50% { 
    opacity: 0.9;
    transform: skewX(1deg);
  }
}

.candle-lights {
  position: absolute;
  top: 70%;
  width: 100%;
  height: 30%;
}

.candle {
  position: absolute;
  bottom: 0;
  width: 4px;
  height: 20px;
  background: linear-gradient(to bottom, #F5DEB3, #DEB887);
  border-radius: 2px;
}

.flame {
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 8px;
  background: radial-gradient(ellipse at bottom, 
    #FFD700 0%, 
    #FF6347 40%, 
    #FF4500 70%, 
    transparent 100%);
  border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
  animation: candle-flame 0.5s infinite ease-in-out alternate;
}

@keyframes candle-flame {
  0% { 
    transform: translateX(-50%) scale(0.9) skewX(-1deg);
    opacity: 0.9;
  }
  100% { 
    transform: translateX(-50%) scale(1.1) skewX(1deg);
    opacity: 1;
  }
}

.spice-aroma {
  position: absolute;
  top: 40%;
  width: 100%;
  height: 60%;
}

.aroma-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  background: rgba(255, 69, 0, 0.3);
  border-radius: 50%;
  animation: aroma-float 6s infinite ease-in-out;
}

.aroma-particle:nth-child(1) { left: 20%; animation-delay: 0s; }
.aroma-particle:nth-child(2) { left: 30%; animation-delay: 0.5s; }
.aroma-particle:nth-child(3) { left: 40%; animation-delay: 1s; }
.aroma-particle:nth-child(4) { left: 50%; animation-delay: 1.5s; }
.aroma-particle:nth-child(5) { left: 60%; animation-delay: 2s; }
.aroma-particle:nth-child(6) { left: 70%; animation-delay: 2s; }
.aroma-particle:nth-child(7) { left: 80%; animation-delay: 3s; }
.aroma-particle:nth-child(8) { left: 90%; animation-delay: 3.5s; }

@keyframes aroma-float {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.5) rotate(0deg);
  }
  20% {
    opacity: 0.6;
    transform: translateY(15px) scale(0.8) rotate(45deg);
  }
  50% {
    opacity: 0.8;
    transform: translateY(-10px) scale(1) rotate(90deg);
  }
  80% {
    opacity: 0.4;
    transform: translateY(-25px) scale(1.2) rotate(135deg);
  }
  100% {
    opacity: 0;
    transform: translateY(-40px) scale(0.3) rotate(180deg);
  }
}

/* 夜景装饰元素 */
.night-elements {
  position: absolute;
  width: 100%;
  height: 100%;
}

.night-city {
  position: absolute;
  bottom: 20%;
  width: 100%;
  height: 60%;
}

.night-buildings {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 80%;
}

.night-building {
  position: absolute;
  bottom: 0;
  width: 60px;
  background: linear-gradient(to bottom, #2F4F4F, #000000);
  border-radius: 4px 4px 0 0;
}

.building-lights {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
  height: 60%;
  background: 
    linear-gradient(0deg, transparent 70%, #FFD700 70%, #FFD700 75%, transparent 75%),
    linear-gradient(0deg, transparent 50%, #FFFFFF 50%, #FFFFFF 55%, transparent 55%),
    linear-gradient(0deg, transparent 30%, #FFD700 30%, #FFD700 35%, transparent 35%);
  background-size: 100% 20px;
  animation: building-light-flicker 5s infinite ease-in-out;
}

@keyframes building-light-flicker {
  0%, 100% { opacity: 0.8; }
  25% { opacity: 1; }
  50% { opacity: 0.6; }
  75% { opacity: 0.9; }
}

.street-lights {
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
}

.street-light {
  width: 8px;
  height: 50px;
  background: #2F4F4F;
  border-radius: 2px;
  position: relative;
}

.street-light::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 10px;
  background: #FFD700;
  border-radius: 50%;
  box-shadow: 0 0 20px rgba(255,215,0,0.8);
}

.moon {
  position: absolute;
  top: 15%;
  right: 15%;
  width: 40px;
  height: 40px;
  background: radial-gradient(circle at 30% 30%, #FFFAF0, #F5F5DC);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(255,250,240,0.8);
  animation: moon-glow 8s infinite ease-in-out;
}

@keyframes moon-glow {
  0%, 100% { box-shadow: 0 0 30px rgba(255,250,240,0.8); }
  50% { box-shadow: 0 0 50px rgba(255,250,240,1); }
}

/* 星空装饰元素 */
.starry-elements {
  position: absolute;
  width: 100%;
  height: 100%;
}

.cosmic-scene {
  position: absolute;
  width: 100%;
  height: 100%;
}

.shooting-stars {
  position: absolute;
  top: 10%;
  width: 100%;
  height: 50%;
}

.shooting-star {
  position: absolute;
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, #FFFFFF, transparent);
  animation: shooting-star-move 6s infinite ease-out;
}

.shooting-star:nth-child(1) {
  top: 20%;
  left: 10%;
  animation-delay: 0s;
}

.shooting-star:nth-child(2) {
  top: 60%;
  left: 70%;
  animation-delay: 2s;
}

.shooting-star:nth-child(3) {
  top: 40%;
  left: 40%;
  animation-delay: 4s;
}

@keyframes shooting-star-move {
  0% {
    opacity: 0;
    transform: translateX(-100px) translateY(0) rotate(45deg);
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
    transform: translateX(200px) translateY(-100px) rotate(45deg);
  }
  100% {
    opacity: 0;
    transform: translateX(300px) translateY(-150px) rotate(45deg);
  }
}

.constellation {
  position: absolute;
  top: 20%;
  width: 100%;
  height: 60%;
}

.star-cluster {
  position: absolute;
  width: 80px;
  height: 80px;
  background: 
    radial-gradient(circle at 20% 30%, #FFD700 1px, transparent 1px),
    radial-gradient(circle at 60% 20%, #FFFFFF 1px, transparent 1px),
    radial-gradient(circle at 80% 70%, #FFD700 1px, transparent 1px),
    radial-gradient(circle at 30% 80%, #FFFFFF 1px, transparent 1px),
    radial-gradient(circle at 70% 50%, #FFD700 1px, transparent 1px);
  background-size: 100% 100%;
  animation: constellation-twinkle 8s infinite ease-in-out;
}

.star-cluster:nth-child(1) { top: 10%; left: 20%; }
.star-cluster:nth-child(2) { top: 40%; left: 70%; }
.star-cluster:nth-child(3) { top: 70%; left: 10%; }
.star-cluster:nth-child(4) { top: 20%; left: 80%; }

@keyframes constellation-twinkle {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  33% { opacity: 1; transform: scale(1.1); }
  66% { opacity: 0.6; transform: scale(0.9); }
}

.crescent-moon {
  position: absolute;
  top: 25%;
  right: 20%;
  width: 50px;
  height: 50px;
  background: radial-gradient(circle at 30% 30%, #FFFAF0, #F0E68C);
  border-radius: 50%;
  box-shadow: 0 0 40px rgba(255,250,240,0.9);
  clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 80%, 0% 20%);
  animation: crescent-glow 10s infinite ease-in-out;
}

@keyframes crescent-glow {
  0%, 100% { 
    box-shadow: 0 0 40px rgba(255,250,240,0.9);
    transform: scale(1);
  }
  50% { 
    box-shadow: 0 0 60px rgba(255,250,240,1);
    transform: scale(1.05);
  }
}

.galaxy-swirl {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: 
    radial-gradient(ellipse 40% 60% at 40% 60%, 
      rgba(138, 43, 226, 0.4) 0%, 
      rgba(75, 0, 130, 0.3) 30%, 
      transparent 70%),
    radial-gradient(ellipse 60% 40% at 60% 40%, 
      rgba(25, 25, 112, 0.3) 0%, 
      rgba(72, 61, 139, 0.2) 40%, 
      transparent 80%);
  border-radius: 50%;
  animation: galaxy-rotation 20s infinite linear;
}

@keyframes galaxy-rotation {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

.couple {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: flex-end;
  gap: 20px;
  opacity: 0;
  scale: 0.5;
  z-index: 10; /* 确保情侣在背景人物前面 */
}

.boy-dating, .girl-dating {
  position: relative;
  bottom: 0;
  width: 50px;
  height: 80px;
  opacity: 1;
  transition: all 0.3s ease;
}

.boy-dating {
  margin-right: 10px;
}

.girl-dating {
  margin-left: 10px;
}

/* 动漫风格头部 */
.boy-dating .head, .girl-dating .head {
  position: relative;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin: 0 auto 2px;
  overflow: visible;
  border: 2px solid #333;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
}

.boy-dating .head {
  background: radial-gradient(circle at 30% 30%, #F5DEB3, #DEB887);
}

.girl-dating .head {
  background: radial-gradient(circle at 30% 30%, #FFEFD5, #F5DEB3);
}

/* 动漫风格眼睛 */
.boy-dating .eyes, .girl-dating .eyes {
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

.boy-dating .eyes::before, .boy-dating .eyes::after,
.girl-dating .eyes::before, .girl-dating .eyes::after {
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

.boy-dating .eyes::before, .girl-dating .eyes::before {
  position: absolute;
  left: 0;
}

.boy-dating .eyes::after, .girl-dating .eyes::after {
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
.boy-dating .head::before, .girl-dating .head::before {
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
.boy-dating .nose, .girl-dating .nose {
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
.boy-dating .mouth, .girl-dating .mouth {
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

.boy-dating .mouth.smile, .girl-dating .mouth.smile {
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
.boy-dating .hair {
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

.boy-dating .hair::before {
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

.boy-dating .hair::after {
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
.girl-dating .hair {
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

.girl-dating .hair::before {
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

.girl-dating .hair::after {
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
.girl-dating .hair-accessory {
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

.girl-dating .hair-accessory::after {
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

/* 动漫风格身体 */
.boy-dating .body, .girl-dating .body {
  position: relative;
  width: 32px;
  height: 40px;
  margin: 0 auto 2px;
  border-radius: 16px;
  border: 2px solid #333;
  box-shadow: 0 3px 10px rgba(0,0,0,0.2);
  overflow: hidden;
}

.boy-dating .body {
  background: linear-gradient(135deg, #4169E1, #6495ED, #4169E1);
  position: relative;
}

.boy-dating .body::before {
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

.girl-dating .body {
  background: linear-gradient(135deg, #FF69B4, #FFB6C1, #FF69B4);
  border-radius: 16px 16px 25px 25px;
  position: relative;
}

.girl-dating .body::before {
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
.boy-dating .collar {
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
.boy-dating .buttons {
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.boy-dating .button {
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
.girl-dating .dress-pattern {
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

.girl-dating .dress-pattern::after {
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
.girl-dating .belt {
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

.girl-dating .belt::after {
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
.boy-dating .arms, .girl-dating .arms {
  position: absolute;
  top: 30px;
  width: 100%;
}

.boy-dating .arm, .girl-dating .arm {
  position: absolute;
  width: 8px;
  height: 24px;
  background: radial-gradient(ellipse, #F5DEB3, #DEB887);
  border-radius: 4px;
  border: 1px solid #333;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
}

.boy-dating .arm.left, .girl-dating .arm.left {
  left: 10px;
  transform: rotate(-25deg);
  transform-origin: top;
}

.boy-dating .arm.right, .girl-dating .arm.right {
  right: 10px;
  transform: rotate(25deg);
  transform-origin: top;
}

.boy-dating .arm.waving, .girl-dating .arm.waving {
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
.boy-dating .legs, .girl-dating .legs {
  display: flex;
  justify-content: space-between;
  width: 24px;
  margin: 0 auto;
  position: relative;
  top: 3px;
  gap: 4px;
}

.boy-dating .leg, .girl-dating .leg {
  width: 10px;
  height: 24px;
  background: linear-gradient(to bottom, #8B4513, #A0522D);
  border-radius: 0 0 12px 12px;
  border: 1px solid #654321;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3);
  position: relative;
}

.boy-dating .leg::after, .girl-dating .leg::after {
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

.boy-dating.walking .leg, .girl-dating.walking .leg {
  animation: anime-walking 0.5s infinite alternate;
}

.boy-dating.walking .leg.right, .girl-dating.walking .leg.right {
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

.boy-dating.stopped, .girl-dating.stopped {
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

/* 公园场景 - 简化版本 */
.park-elements {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 1s ease;
}

.park-elements.active {
  opacity: 1;
}

/* 简化的天空 */
.park-sky {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
}

.sun {
  position: absolute;
  top: 30px;
  right: 80px;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, #FFD700 0%, #FFA500 100%);
  border-radius: 50%;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.6);
  animation: sunGlow 4s ease-in-out infinite alternate;
}

@keyframes sunGlow {
  from { box-shadow: 0 0 30px rgba(255, 215, 0, 0.6); }
  to { box-shadow: 0 0 50px rgba(255, 215, 0, 0.8); }
}

.clouds {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.cloud {
  position: absolute;
  top: 20px;
  width: 80px;
  height: 30px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50px;
  animation: cloudMove 15s linear infinite;
}

@keyframes cloudMove {
  from { transform: translateX(-100px); }
  to { transform: translateX(calc(100vw + 100px)); }
}

/* 简化的树木 */
.park-trees {
  position: absolute;
  bottom: 150px;
  left: 0;
  right: 0;
  height: 200px;
}

.tree {
  position: absolute;
  bottom: 0;
  width: 80px;
  height: 180px;
  animation: treeSwayGentle 6s ease-in-out infinite;
}

.tree:nth-child(odd) {
  animation-delay: 0s;
}

.tree:nth-child(even) {
  animation-delay: 2s;
}

@keyframes treeSwayGentle {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(1deg); }
}

.tree-trunk {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 15px;
  height: 80px;
  background: linear-gradient(to bottom, #8B4513, #A0522D);
  border-radius: 0 0 8px 8px;
}

.tree-leaves {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 120px;
  background: radial-gradient(ellipse at center, #228B22 0%, #32CD32 60%, #90EE90 100%);
  border-radius: 50%;
  animation: leavesRustle 4s ease-in-out infinite;
}

@keyframes leavesRustle {
  0%, 100% { transform: translateX(-50%) scale(1); }
  50% { transform: translateX(-50%) scale(1.05); }
}

/* 简化的草地 */
.park-ground {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100px;
}

.grass {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  background: linear-gradient(to bottom, 
    #90EE90 0%, 
    #32CD32 50%, 
    #228B22 100%
  );
  animation: grassWave 3s ease-in-out infinite;
}

@keyframes grassWave {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.9; }
}

/* 简化的背景人物 */
.park-visitors {
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
  height: 80px;
  opacity: 0;
  transition: opacity 0.8s ease;
  z-index: 1; /* 确保背景人物在情侣后面 */
}

.park-visitors.active {
  opacity: 1;
}

.visitor-gif {
  position: absolute;
  bottom: 0;
  width: 40px;
  height: 60px;
  object-fit: contain;
  transition: all 0.3s ease;
}

/* 慢跑者动画 */
.visitor-gif.jogger {
  animation: simpleJogging 1.5s infinite ease-in-out;
}

@keyframes simpleJogging {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-8px) scale(1.05); }
}

/* 散步者动画 */
.visitor-gif.walker {
  animation: simpleWalking 3s infinite ease-in-out;
}

@keyframes simpleWalking {
  0%, 100% { transform: translateX(0px); }
  50% { transform: translateX(20px); }
}

/* 休息者动画 */
.visitor-gif.rest {
  animation: simpleResting 4s infinite ease-in-out;
}

@keyframes simpleResting {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}



/* 公园场景 - 背景人物样式（重新设计） */
.park-visitors {
  position: absolute;
  bottom: 80px;
  left: 0;
  right: 0;
  height: 150px;
  opacity: 0;
  transition: opacity 0.8s ease;
}

.park-visitors.active {
  opacity: 1;
}

/* 通用访客样式 */
.visitor {
  position: absolute;
  bottom: 0;
  transition: all 0.3s ease;
}

.visitor-head {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #F5DEB3;
  border-radius: 50%;
  border: 1px solid #333;
  bottom: 35px;
  left: 50%;
  transform: translateX(-50%);
}

.visitor-body {
  position: absolute;
  width: 16px;
  height: 25px;
  border-radius: 8px;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  border: 1px solid #333;
}

.visitor-legs {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 12px;
  height: 15px;
  display: flex;
  justify-content: space-between;
}

.visitor-legs .leg {
  width: 5px;
  height: 15px;
  background: #00008B;
  border-radius: 0 0 3px 3px;
  border: 1px solid #333;
}

/* 慢跑者样式 */
.jogger {
  width: 20px;
  height: 50px;
  animation: jogging 1s infinite ease-in-out;
}

@keyframes jogging {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-8px) scale(1.05); }
}

.jogger-orange .visitor-body {
  background: linear-gradient(to bottom, #FF6347, #FF4500);
}

.jogger-blue .visitor-body {
  background: linear-gradient(to bottom, #4169E1, #0000CD);
}

.jogger-green .visitor-body {
  background: linear-gradient(to bottom, #32CD32, #228B22);
}

.sports-gear {
  position: absolute;
}

.headband {
  width: 14px;
  height: 3px;
  background: #FF1493;
  border-radius: 2px;
  bottom: 43px;
  left: 50%;
  transform: translateX(-50%);
}

.sweatband {
  width: 4px;
  height: 8px;
  background: #FFFFFF;
  border-radius: 2px;
  bottom: 25px;
  right: 2px;
}

.water-bottle {
  width: 3px;
  height: 8px;
  background: linear-gradient(to bottom, #87CEEB, #4682B4);
  border-radius: 1px 1px 3px 3px;
  bottom: 20px;
  right: -2px;
}

.running-shoes::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 3px;
  background: #FFFFFF;
  border-radius: 2px;
  bottom: -2px;
  left: 50%;
  transform: translateX(-50%);
}

/* 遛狗者样式 */
.dog-walker {
  width: 35px;
  height: 50px;
  animation: walking 2s infinite ease-in-out;
}

@keyframes walking {
  0%, 100% { transform: translateX(0px); }
  50% { transform: translateX(15px); }
}

.walker-casual .visitor-body {
  background: linear-gradient(to bottom, #9370DB, #8A2BE2);
}

.walker-formal .visitor-body {
  background: linear-gradient(to bottom, #2F4F4F, #696969);
}

.pet-dog {
  position: absolute;
  width: 12px;
  height: 8px;
  border-radius: 6px;
  bottom: 3px;
  left: -18px;
  border: 1px solid #333;
  animation: dogWag 1s infinite ease-in-out;
}

.golden-retriever {
  background: linear-gradient(to bottom, #DAA520, #B8860B);
}

.small-dog {
  width: 8px;
  height: 6px;
  background: linear-gradient(to bottom, #FFFFFF, #F5F5F5);
}

@keyframes dogWag {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(5deg); }
}

.leash {
  position: absolute;
  width: 20px;
  height: 2px;
  background: #8B4513;
  bottom: 25px;
  left: -10px;
  border-radius: 1px;
}

/* 老年人样式 */
.elderly {
  width: 22px;
  height: 50px;
  animation: elderlyWalk 3s infinite ease-in-out;
}

@keyframes elderlyWalk {
  0%, 100% { transform: translateX(0px); }
  50% { transform: translateX(-10px); }
}

.elderly-head {
  background: #F5DEB3;
}

.elderly-head::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 4px;
  background: #D3D3D3;
  border-radius: 4px 4px 0 0;
  top: -2px;
  left: 2px;
}

.elderly-cardigan {
  background: linear-gradient(to bottom, #708090, #696969);
}

.elderly-dress {
  background: linear-gradient(to bottom, #DDA0DD, #DA70D6);
  width: 18px;
  height: 28px;
  border-radius: 8px 8px 0 0;
}

.walking-stick {
  position: absolute;
  width: 2px;
  height: 35px;
  background: #8B4513;
  bottom: 10px;
  right: -6px;
  border-radius: 1px;
}

.wooden-cane::before {
  content: '';
  position: absolute;
  width: 6px;
  height: 3px;
  background: #A0522D;
  border-radius: 3px;
  top: -2px;
  left: -2px;
}

.elderly-hat {
  position: absolute;
  width: 14px;
  height: 4px;
  background: #2F4F4F;
  border-radius: 7px;
  bottom: 47px;
  left: 50%;
  transform: translateX(-50%);
}

.elderly-handbag {
  position: absolute;
  width: 6px;
  height: 8px;
  background: #8B4513;
  border-radius: 2px;
  bottom: 18px;
  right: -8px;
}

/* 儿童样式 */
.child {
  width: 15px;
  height: 35px;
  animation: childrenPlay 2s infinite ease-in-out;
}

@keyframes childrenPlay {
  0%, 100% { transform: translateY(0px); }
  25% { transform: translateY(-5px); }
  50% { transform: translateY(-10px); }
  75% { transform: translateY(-5px); }
}

.child-head {
  width: 8px;
  height: 8px;
  bottom: 25px;
}

.child-pink .visitor-body {
  background: linear-gradient(to bottom, #FF69B4, #FF1493);
  width: 12px;
  height: 18px;
}

.child-blue .visitor-body {
  background: linear-gradient(to bottom, #32CD32, #228B22);
  width: 12px;
  height: 18px;
}

.child-yellow .visitor-body {
  background: linear-gradient(to bottom, #FFD700, #FFA500);
  width: 12px;
  height: 18px;
}

.toy {
  position: absolute;
}

.jump-rope {
  width: 2px;
  height: 15px;
  background: #FF1493;
  border-radius: 1px;
  bottom: 10px;
  right: -3px;
  animation: ropeSwing 1s infinite ease-in-out;
}

@keyframes ropeSwing {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(15deg); }
}

.soccer-ball {
  width: 6px;
  height: 6px;
  background: #FFFFFF;
  border-radius: 50%;
  border: 1px solid #000;
  bottom: 2px;
  left: -8px;
}

.teddy-bear {
  width: 5px;
  height: 8px;
  background: #8B4513;
  border-radius: 3px;
  bottom: 15px;
  right: -6px;
}

/* 情侣散步样式 */
.couple-walking {
  width: 40px;
  height: 50px;
  animation: coupleWalk 2.5s infinite ease-in-out;
}

@keyframes coupleWalk {
  0%, 100% { transform: translateX(0px); }
  50% { transform: translateX(20px); }
}

.couple-male, .couple-female {
  position: absolute;
  width: 18px;
  height: 50px;
}

.couple-male {
  left: 0;
}

.couple-female {
  right: 0;
}

.couple-casual .visitor-body {
  background: linear-gradient(to bottom, #4169E1, #0000CD);
}

.couple-dress .visitor-body {
  background: linear-gradient(to bottom, #FF69B4, #FF1493);
  width: 18px;
  border-radius: 8px 8px 0 0;
}

.holding-hands-effect {
  position: absolute;
  width: 8px;
  height: 2px;
  background: #F5DEB3;
  border-radius: 1px;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
}

/* 骑行者样式 */
.cyclist {
  width: 45px;
  height: 50px;
  animation: cycling 1.5s infinite ease-in-out;
}

@keyframes cycling {
  0%, 100% { transform: translateX(0px); }
  50% { transform: translateX(30px); }
}

.cyclist-head {
  bottom: 30px;
}

.cyclist-gear .visitor-body {
  background: linear-gradient(to bottom, #FFD700, #FFA500);
  width: 14px;
  height: 20px;
}

.bicycle {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 35px;
  height: 25px;
}

.wheel {
  position: absolute;
  width: 12px;
  height: 12px;
  background: #696969;
  border-radius: 50%;
  border: 2px solid #333;
  bottom: 0;
  animation: wheelSpin 0.5s linear infinite;
}

@keyframes wheelSpin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.front-wheel {
  right: 2px;
}

.rear-wheel {
  left: 2px;
}

.bike-frame {
  position: absolute;
  width: 25px;
  height: 2px;
  background: #FF0000;
  bottom: 6px;
  left: 5px;
  border-radius: 1px;
}

.pedals {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #333;
  border-radius: 2px;
  bottom: 4px;
  left: 15px;
  animation: pedalRotate 0.8s linear infinite;
}

@keyframes pedalRotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.handlebars {
  position: absolute;
  width: 8px;
  height: 2px;
  background: #333;
  border-radius: 1px;
  bottom: 15px;
  right: 5px;
}

.helmet {
  position: absolute;
  width: 14px;
  height: 6px;
  background: #FF0000;
  border-radius: 7px 7px 2px 2px;
  bottom: 38px;
  left: 50%;
  transform: translateX(-50%);
}

/* 摄影师样式 */
.photographer {
  width: 25px;
  height: 50px;
  animation: photographing 4s infinite ease-in-out;
}

@keyframes photographing {
  0%, 80% { transform: scale(1); }
  85%, 95% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.photographer-head {
  bottom: 35px;
}

.photographer-vest .visitor-body {
  background: linear-gradient(to bottom, #8FBC8F, #556B2F);
}

.professional-camera {
  position: absolute;
  width: 8px;
  height: 6px;
  background: #333;
  border-radius: 2px;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
}

.professional-camera::before {
  content: '';
  position: absolute;
  width: 4px;
  height: 4px;
  background: #000;
  border-radius: 50%;
  top: 1px;
  left: 2px;
}

.tripod {
  position: absolute;
  width: 2px;
  height: 20px;
  background: #333;
  border-radius: 1px;
  bottom: 0;
  right: -5px;
}

.camera-bag {
  position: absolute;
  width: 8px;
  height: 6px;
  background: #8B4513;
  border-radius: 2px;
  bottom: 15px;
  right: -10px;
}

/* 读书者样式 */
.reader {
  width: 20px;
  height: 40px;
  animation: reading 3s infinite ease-in-out;
}

@keyframes reading {
  0%, 90% { transform: rotate(0deg); }
  95% { transform: rotate(2deg); }
  100% { transform: rotate(0deg); }
}

.reader-head {
  bottom: 28px;
}

.reader-sweater .visitor-body {
  background: linear-gradient(to bottom, #CD853F, #A0522D);
  height: 22px;
}

.reading-pose {
  position: absolute;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
}

.book {
  position: absolute;
  width: 8px;
  height: 6px;
  background: #FFFFFF;
  border: 1px solid #333;
  border-radius: 1px;
  bottom: 5px;
  left: -2px;
}

.reading-glasses {
  position: absolute;
  width: 8px;
  height: 2px;
  border: 1px solid #333;
  border-radius: 4px;
  bottom: 15px;
  left: -2px;
  background: rgba(255,255,255,0.3);
}

/* 街头艺人样式 */
.performer {
  width: 25px;
  height: 50px;
  animation: performing 2s infinite ease-in-out;
}

@keyframes performing {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.performer-head {
  bottom: 35px;
}

.performer-outfit .visitor-body {
  background: linear-gradient(to bottom, #800080, #4B0082);
}

.acoustic-guitar {
  position: absolute;
  width: 6px;
  height: 18px;
  background: #8B4513;
  border-radius: 3px;
  bottom: 15px;
  left: -8px;
}

.acoustic-guitar::before {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background: #DEB887;
  border-radius: 50%;
  top: 5px;
  left: -1px;
}

.music-notes {
  position: absolute;
  bottom: 40px;
  left: -15px;
  width: 30px;
  height: 20px;
}

.note {
  position: absolute;
  font-size: 8px;
  color: #333;
  animation: noteFloat 2s infinite ease-in-out;
}

.note:nth-child(1) {
  left: 5px;
  animation-delay: 0s;
}

.note:nth-child(2) {
  left: 15px;
  animation-delay: 0.5s;
}

.note:nth-child(3) {
  left: 25px;
  animation-delay: 1s;
}

@keyframes noteFloat {
  0%, 100% { transform: translateY(0px); opacity: 1; }
  50% { transform: translateY(-10px); opacity: 0.7; }
}

.tip-hat {
  position: absolute;
  width: 6px;
  height: 6px;
  background: #8B4513;
  border-radius: 50%;
  bottom: 48px;
  left: 50%;
  transform: translateX(-50%);
}

/* 野餐家庭样式 */
.picnic-family {
  width: 60px;
  height: 50px;
  animation: familyTime 4s infinite ease-in-out;
}

@keyframes familyTime {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.family-member {
  position: absolute;
  bottom: 20px;
}

.dad {
  left: 0;
  width: 18px;
  height: 30px;
}

.mom {
  left: 20px;
  width: 18px;
  height: 30px;
}

.kid {
  left: 42px;
  width: 15px;
  height: 25px;
}

.dad-polo .visitor-body {
  background: linear-gradient(to bottom, #228B22, #006400);
}

.mom-sundress .visitor-body {
  background: linear-gradient(to bottom, #FF6347, #DC143C);
  border-radius: 8px 8px 0 0;
}

.kid-tshirt .visitor-body {
  background: linear-gradient(to bottom, #FFD700, #FFA500);
  width: 12px;
  height: 15px;
}

.picnic-setup {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 20px;
}

.picnic-blanket {
  position: absolute;
  width: 50px;
  height: 12px;
  background: linear-gradient(45deg, #FF0000 25%, #FFFFFF 25%, #FFFFFF 50%, #FF0000 50%, #FF0000 75%, #FFFFFF 75%);
  background-size: 8px 8px;
  border-radius: 4px;
  bottom: 0;
  left: 5px;
}

.picnic-basket {
  position: absolute;
  width: 8px;
  height: 6px;
  background: #8B4513;
  border-radius: 2px;
  bottom: 12px;
  right: 5px;
}

.food-items {
  position: absolute;
  bottom: 12px;
  left: 15px;
  width: 25px;
  height: 8px;
}

.sandwich {
  position: absolute;
  width: 4px;
  height: 3px;
  background: #DEB887;
  border-radius: 1px;
  left: 0;
}

.fruit {
  position: absolute;
  width: 3px;
  height: 3px;
  background: #FF0000;
  border-radius: 50%;
  left: 6px;
}

.drinks {
  position: absolute;
  width: 2px;
  height: 5px;
  background: #87CEEB;
  border-radius: 1px;
  right: 0;
}

/* 瑜伽练习者样式 */
.yoga-practitioner {
  width: 20px;
  height: 35px;
  animation: meditation 3s infinite ease-in-out;
}

@keyframes meditation {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}

.yoga-head {
  bottom: 25px;
}

.yoga-outfit .visitor-body {
  background: linear-gradient(to bottom, #9370DB, #8A2BE2);
  height: 20px;
}

.yoga-pose {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.yoga-mat {
  position: absolute;
  width: 25px;
  height: 3px;
  background: #800080;
  border-radius: 2px;
  bottom: 0;
  left: -10px;
}

.meditation-aura {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 2px solid rgba(147,112,219,0.3);
  border-radius: 50%;
  bottom: 5px;
  left: -15px;
  animation: auraGlow 2s infinite ease-in-out;
}

@keyframes auraGlow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(1.1); }
}

/* 滑板少年样式 */
.skateboarder {
  width: 20px;
  height: 45px;
  animation: skateboarding 1.2s infinite ease-in-out;
}

@keyframes skateboarding {
  0%, 100% { transform: translateX(0px) rotate(0deg); }
  25% { transform: translateX(10px) rotate(2deg); }
  50% { transform: translateX(20px) rotate(0deg); }
  75% { transform: translateX(10px) rotate(-2deg); }
}

.skater-head {
  bottom: 30px;
}

.skater-hoodie .visitor-body {
  background: linear-gradient(to bottom, #333, #000);
  height: 22px;
}

.skateboard {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.board {
  position: absolute;
  width: 18px;
  height: 4px;
  background: #8B4513;
  border-radius: 2px;
  bottom: 2px;
  left: -4px;
}

.wheels {
  position: absolute;
  bottom: 0;
  left: -2px;
  width: 14px;
  height: 3px;
}

.wheels::before, .wheels::after {
  content: '';
  position: absolute;
  width: 3px;
  height: 3px;
  background: #333;
  border-radius: 50%;
  bottom: 0;
}

.wheels::before {
  left: 0;
}

.wheels::after {
  right: 0;
}

.skater-cap {
  position: absolute;
  width: 12px;
  height: 4px;
  background: #FF0000;
  border-radius: 6px;
  bottom: 42px;
  left: 50%;
  transform: translateX(-50%);
}

/* 动态效果增强 */
.park-visitors .visitor:nth-child(odd) {
  animation-direction: alternate;
}

.park-visitors .visitor:nth-child(even) {
  animation-direction: alternate-reverse;
}

/* 响应式适配 */
@media (max-width: 768px) {
  .park-visitors {
    height: 100px;
  }
  
  .visitor {
    transform: scale(0.8);
  }
  
  .picnic-family {
    width: 40px;
  }
  
  .cyclist {
    width: 35px;
  }
}

/* 动图人物样式 */
.visitor-gif {
  position: absolute;
  bottom: 0;
  width: 40px;
  height: 60px;
  object-fit: contain;
  transition: all 0.3s ease;
}

/* 慢跑者动画 */
.visitor-gif.jogger {
  animation: jogging 1s infinite ease-in-out;
}

/* 遛狗者动画 */
.visitor-gif.dog-walker {
  animation: walking 2s infinite ease-in-out;
}

/* 老年人动画 */
.visitor-gif.elderly {
  animation: elderlyWalk 3s infinite ease-in-out;
}

/* 儿童动画 */
.visitor-gif.child {
  width: 30px;
  height: 45px;
  animation: childrenPlay 2s infinite ease-in-out;
}

/* 情侣散步动画 */
.visitor-gif.couple-walking {
  animation: coupleWalk 2.5s infinite ease-in-out;
}

/* 骑行者动画 */
.visitor-gif.cyclist {
  animation: cycling 1.5s infinite ease-in-out;
}

/* 摄影师动画 */
.visitor-gif.photographer {
  animation: photographing 4s infinite ease-in-out;
}

/* 读书者动画 */
.visitor-gif.reader {
  animation: reading 3s infinite ease-in-out;
}

/* 街头艺人动画 */
.visitor-gif.performer {
  animation: performing 2s infinite ease-in-out;
}

/* 野餐家庭动画 */
.visitor-gif.family {
  animation: familyTime 4s infinite ease-in-out;
}

/* 瑜伽练习者动画 */
.visitor-gif.yoga-practitioner {
  animation: meditation 3s infinite ease-in-out;
}

/* 滑板少年动画 */
.visitor-gif.skateboarder {
  animation: skateboarding 1.2s infinite ease-in-out;
}

/* 奶茶店顾客动图样式 */
.customer-gif {
  position: absolute;
  width: 35px;
  height: 50px;
  object-fit: contain;
  bottom: 0;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.customer-gif.walking-customer {
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

.customer-gif.waiting-customer {
  opacity: 1;
  animation: tea-customer-waiting 3s infinite ease-in-out;
}

/* 从左到右的顾客动画 */
.customer-gif.left-to-right {
  animation: tea-customer-left-to-right 12s infinite linear;
}

.customer-gif.customer-1.left-to-right {
  animation-delay: 0s;
}

.customer-gif.customer-2.left-to-right {
  animation-delay: 4s;
}

.customer-gif.customer-3.left-to-right {
  animation-delay: 8s;
}

/* 从右到左的顾客动画 */
.customer-gif.right-to-left {
  animation: tea-customer-right-to-left 14s infinite linear;
}

.customer-gif.customer-4.right-to-left {
  animation-delay: 2s;
}

.customer-gif.customer-5.right-to-left {
  animation-delay: 9s;
}

/* 等待顾客位置 */
.customer-gif.customer-waiting-1 {
  left: 15%;
  bottom: 15%;
}

.customer-gif.customer-waiting-2 {
  left: 25%;
  bottom: 12%;
}
</style>