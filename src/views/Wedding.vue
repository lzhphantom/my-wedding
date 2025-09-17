<template>
  <div class="wedding-container">
    <div class="photo-gallery">
      <div class="gallery-header">
        <h1 class="wedding-title">Our Perfect Day</h1>
        <h2 class="wedding-subtitle">我们最美好的时刻</h2>
      </div>
      
      <div class="photos-showcase" ref="showcaseRef">
        <div class="main-photo" :class="{ active: currentPhoto === 0 }" @click="setCurrentPhoto(0)">
          <div class="photo-frame ceremony">
            <div class="photo-content">
              <div class="bride-groom">
                <div class="bride">👰‍♀️</div>
                <div class="groom">🤵‍♂️</div>
              </div>
              <div class="ceremony-decor">
                <div class="flowers">🌸🌺🌸</div>
                <div class="altar">⛪</div>
              </div>
            </div>
            <div class="photo-caption">Wedding Ceremony</div>
          </div>
        </div>
        
        <div class="photo-grid">
          <div v-for="(photo, index) in photos" :key="index" 
               class="photo-item" 
               :class="{ active: currentPhoto === index + 1 }"
               @click="setCurrentPhoto(index + 1)">
            <div class="photo-frame">
              <div class="photo-content" :class="photo.type">
                <div class="photo-emoji">{{ photo.emoji }}</div>
                <div class="photo-scene">{{ photo.scene }}</div>
              </div>
              <div class="photo-caption">{{ photo.title }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="photo-controls">
        <button @click="prevPhoto" class="nav-btn">← 上一张</button>
        <button @click="startSlideshow" :disabled="isPlaying" class="play-btn">
          {{ isPlaying ? '播放中...' : '开始幻灯片' }}
        </button>
        <button @click="nextPhoto" class="nav-btn">下一张 →</button>
      </div>
      
      <div class="love-effects" v-show="showEffects">
        <div v-for="n in 20" :key="n" class="floating-heart" 
             :style="{ 
               left: Math.random() * 100 + '%',
               animationDelay: Math.random() * 3 + 's'
             }">
          💕
        </div>
      </div>
    </div>
    
    <div class="wedding-message" :class="{ visible: showMessage }">
      <h2>从此以后</h2>
      <p>我们有了彼此</p>
      <p>有了一个温暖的家</p>
      <p>有了对未来的美好憧憬</p>
      <div class="signature">
        <span>💍 Forever & Always 💍</span>
      </div>
    </div>
    
    <div class="final-controls">
      <button @click="restartJourney" class="restart-btn">
        重新体验我们的故事
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'

const router = useRouter()
const showcaseRef = ref<HTMLElement>()

const currentPhoto = ref(0)
const showEffects = ref(false)
const showMessage = ref(false)
const isPlaying = ref(false)

const photos = [
  { emoji: '💐', scene: '🌹💒🌹', title: '捧花时刻', type: 'bouquet' },
  { emoji: '💕', scene: '👫💖👫', title: '甜蜜合影', type: 'couple' },
  { emoji: '🎂', scene: '🍰💍🍰', title: '切蛋糕', type: 'cake' },
  { emoji: '💃', scene: '🕺💃🎵', title: '第一支舞', type: 'dance' },
  { emoji: '🎉', scene: '🎊🥂🎊', title: '庆祝时刻', type: 'celebration' },
  { emoji: '🌅', scene: '🌄💑🌄', title: '夕阳西下', type: 'sunset' }
]

const setCurrentPhoto = (index: number) => {
  currentPhoto.value = index
  showEffects.value = true
  setTimeout(() => { showEffects.value = false }, 2000)
}

const nextPhoto = () => {
  currentPhoto.value = (currentPhoto.value + 1) % (photos.length + 1)
  setCurrentPhoto(currentPhoto.value)
}

const prevPhoto = () => {
  currentPhoto.value = currentPhoto.value === 0 ? photos.length : currentPhoto.value - 1
  setCurrentPhoto(currentPhoto.value)
}

const startSlideshow = () => {
  if (isPlaying.value) return
  
  isPlaying.value = true
  let photoIndex = 0
  
  const timeline = gsap.timeline()
  
  photos.forEach((_, index) => {
    timeline.call(() => { setCurrentPhoto(index) }, [], index === 0 ? 0 : "+=2")
  })
  
  timeline.call(() => { 
    showMessage.value = true
    isPlaying.value = false
  }, [], "+=2")
}

const restartJourney = () => {
  router.push('/')
}

onMounted(() => {
  gsap.to(showcaseRef.value, {
    opacity: 1,
    scale: 1,
    duration: 1.5,
    ease: "back.out(1.7)"
  })
  
  setTimeout(() => {
    startSlideshow()
  }, 1000)
})
</script>

<style scoped>
.wedding-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #fff8dc 0%, #ffeaa7 50%, #fab1a0 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.photo-gallery {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin-bottom: 2rem;
}

.gallery-header {
  text-align: center;
  margin-bottom: 3rem;
}

.wedding-title {
  font-size: 3.5rem;
  color: #d63031;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  margin-bottom: 1rem;
  font-family: 'serif';
}

.wedding-subtitle {
  font-size: 1.8rem;
  color: #2d3436;
  opacity: 0.8;
}

.photos-showcase {
  opacity: 0;
  scale: 0.5;
}

.main-photo {
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  justify-items: center;
}

.photo-frame {
  background: white;
  border-radius: 15px;
  padding: 1rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  width: 200px;
  text-align: center;
}

.main-photo .photo-frame {
  width: 300px;
}

.photo-frame:hover, .photo-item.active .photo-frame, .main-photo.active .photo-frame {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 0 15px 35px rgba(214, 48, 49, 0.3);
}

.photo-content {
  background: #f8f9fa;
  border-radius: 10px;
  padding: 2rem;
  margin-bottom: 1rem;
  position: relative;
  overflow: hidden;
}

.main-photo .photo-content {
  padding: 3rem;
}

.bride-groom {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 1rem;
}

.bride, .groom {
  font-size: 3rem;
}

.ceremony-decor {
  text-align: center;
}

.flowers {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.altar {
  font-size: 2rem;
}

.photo-emoji {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.photo-scene {
  font-size: 1.5rem;
}

.photo-caption {
  font-weight: bold;
  color: #2d3436;
  font-size: 1.1rem;
}

.photo-controls {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin: 2rem 0;
}

.nav-btn, .play-btn {
  padding: 12px 24px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn {
  background: linear-gradient(45deg, #74b9ff, #0984e3);
  color: white;
}

.play-btn {
  background: linear-gradient(45deg, #fd79a8, #e84393);
  color: white;
}

.play-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.nav-btn:hover, .play-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.love-effects {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.floating-heart {
  position: absolute;
  font-size: 24px;
  animation: float-heart 4s infinite ease-out;
  opacity: 0;
}

@keyframes float-heart {
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

.wedding-message {
  text-align: center;
  color: #2d3436;
  opacity: 0;
  transition: opacity 1s ease;
  margin-bottom: 2rem;
  background: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
}

.wedding-message.visible {
  opacity: 1;
}

.wedding-message h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #d63031;
}

.wedding-message p {
  font-size: 1.3rem;
  margin-bottom: 0.8rem;
}

.signature {
  margin-top: 2rem;
  font-size: 1.2rem;
  color: #e17055;
  font-style: italic;
}

.restart-btn {
  padding: 15px 30px;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  background: linear-gradient(45deg, #00b894, #00cec9);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.restart-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
}

@media (max-width: 768px) {
  .wedding-title {
    font-size: 2.5rem;
  }
  
  .wedding-subtitle {
    font-size: 1.3rem;
  }
  
  .photo-grid {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
  
  .photo-frame {
    width: 150px;
  }
  
  .main-photo .photo-frame {
    width: 250px;
  }
  
  .photo-controls {
    flex-wrap: wrap;
  }
}
</style>