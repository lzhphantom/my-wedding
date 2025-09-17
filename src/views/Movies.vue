<template>
  <div class="movies-container">
    <div class="cinema-scene">
      <div class="cinema-exterior" v-show="!insideCinema">
        <div class="cinema-building">
          <div class="cinema-sign">
            <div class="neon-text">CINEMA</div>
            <div class="movie-title">{{ currentMovie.title }}</div>
          </div>
          <div class="entrance">
            <div class="doors"></div>
          </div>
        </div>
        
        <div class="couple-outside" ref="coupleOutsideRef">
          <div class="boy-excited">
            <div class="head"></div>
            <div class="body"></div>
            <div class="speech-bubble" v-show="showSpeech">
              "去看电影吧！"
            </div>
          </div>
          <div class="girl-excited">
            <div class="head"></div>
            <div class="body"></div>
            <div class="speech-bubble" v-show="showSpeech">
              "好呀！"
            </div>
          </div>
        </div>
      </div>
      
      <div class="cinema-interior" v-show="insideCinema">
        <div class="movie-screen">
          <div class="screen-content" :class="currentMovie.genre">
            <div v-if="currentMovie.genre === 'romance'" class="romance-scene">
              <div class="sunset"></div>
              <div class="couple-silhouette">
                <div class="silhouette boy-sil"></div>
                <div class="silhouette girl-sil"></div>
              </div>
            </div>
            <div v-else-if="currentMovie.genre === 'adventure'" class="adventure-scene">
              <div class="mountains"></div>
              <div class="hero-silhouette"></div>
            </div>
          </div>
        </div>
        
        <div class="cinema-seats">
          <div class="seat-row">
            <div v-for="n in 8" :key="n" class="seat" :class="{ occupied: Math.random() > 0.7 }"></div>
          </div>
          <div class="seat-row our-row">
            <div v-for="n in 3" :key="n" class="seat"></div>
            <div class="seat our-seat">
              <div class="couple-watching" ref="coupleWatchingRef">
                <div class="boy-watching">
                  <div class="head"></div>
                  <div class="body"></div>
                </div>
                <div class="girl-watching">
                  <div class="head"></div>
                  <div class="body"></div>
                </div>
                <div class="shared-popcorn" v-show="showPopcorn">🍿</div>
              </div>
            </div>
            <div class="seat our-seat">
              <div class="couple-watching">
                <!-- 第二个座位为空，显示他们坐得很近 -->
              </div>
            </div>
            <div v-for="n in 3" :key="'r'+n" class="seat"></div>
          </div>
          <div class="seat-row">
            <div v-for="n in 8" :key="'b'+n" class="seat" :class="{ occupied: Math.random() > 0.6 }"></div>
          </div>
        </div>
        
        <div class="romantic-moment" v-show="showRomanticMoment">
          <div class="hearts-rain">
            <div v-for="n in 10" :key="n" class="heart-drop" 
                 :style="{ 
                   left: Math.random() * 100 + '%',
                   animationDelay: Math.random() * 3 + 's',
                   animationDuration: (2 + Math.random() * 2) + 's'
                 }">
              💕
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="movie-selector" v-show="!insideCinema">
      <h3>选择一部电影</h3>
      <div class="movie-options">
        <div v-for="movie in movies" :key="movie.id" 
             class="movie-option" 
             :class="{ selected: currentMovie.id === movie.id }"
             @click="selectMovie(movie)">
          <div class="movie-poster">{{ movie.poster }}</div>
          <div class="movie-info">
            <h4>{{ movie.title }}</h4>
            <p>{{ movie.genre_name }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div class="story-text" :class="{ visible: showStoryText }">
      <h2>电影院的浪漫时光</h2>
      <p>在黑暗中，我们的心靠得更近</p>
      <p>分享着爆米花，也分享着快乐</p>
    </div>
    
    <div class="controls">
      <button @click="playMovieAnimation" :disabled="isPlaying" class="play-btn">
        {{ isPlaying ? '正在播放...' : '开始电影之夜' }}
      </button>
      <button @click="nextScene" class="next-btn">
        难忘的初吻 →
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { gsap } from 'gsap'

const router = useRouter()
const coupleOutsideRef = ref<HTMLElement>()
const coupleWatchingRef = ref<HTMLElement>()

const insideCinema = ref(false)
const showSpeech = ref(false)
const showPopcorn = ref(false)
const showRomanticMoment = ref(false)
const showStoryText = ref(false)
const isPlaying = ref(false)

const movies = [
  {
    id: 1,
    title: '泰坦尼克号',
    genre: 'romance',
    genre_name: '浪漫爱情',
    poster: '🚢'
  },
  {
    id: 2,
    title: '阿凡达',
    genre: 'adventure',
    genre_name: '科幻冒险',
    poster: '🌍'
  },
  {
    id: 3,
    title: '罗马假日',
    genre: 'romance',
    genre_name: '经典爱情',
    poster: '🏛️'
  }
]

const currentMovie = ref(movies[0])

const selectMovie = (movie: typeof movies[0]) => {
  currentMovie.value = movie
}

const playMovieAnimation = () => {
  if (isPlaying.value) return
  
  isPlaying.value = true
  resetAnimation()
  
  const timeline = gsap.timeline()
  
  // 显示对话
  timeline.call(() => { showSpeech.value = true })
  timeline.to({}, { duration: 2 }) // 等待2秒
  
  // 情侣走向电影院
  timeline.to(coupleOutsideRef.value, {
    x: 100,
    duration: 2,
    ease: "power2.inOut"
  })
  
  // 进入电影院
  timeline.call(() => { 
    insideCinema.value = true 
    showSpeech.value = false
  })
  
  // 电影院内的情侣出现
  timeline.to(coupleWatchingRef.value, {
    opacity: 1,
    scale: 1,
    duration: 1,
    ease: "back.out(1.7)"
  })
  
  // 显示爆米花
  timeline.call(() => { showPopcorn.value = true }, [], "+=1")
  
  // 浪漫时刻
  timeline.call(() => { showRomanticMoment.value = true }, [], "+=2")
  
  // 显示故事文字
  timeline.call(() => { showStoryText.value = true }, [], "+=1")
  
  timeline.call(() => { isPlaying.value = false }, [], "+=2")
}

const resetAnimation = () => {
  insideCinema.value = false
  showSpeech.value = false
  showPopcorn.value = false
  showRomanticMoment.value = false
  showStoryText.value = false
  
  gsap.set(coupleOutsideRef.value, { x: 0 })
  gsap.set(coupleWatchingRef.value, { opacity: 0, scale: 0.5 })
}

const nextScene = () => {
  router.push('/first-kiss')
}

onMounted(() => {
  playMovieAnimation()
})
</script>

<style scoped>
.movies-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #2c1810 0%, #1a0f08 50%, #000000 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
}

.cinema-scene {
  position: relative;
  width: 100%;
  max-width: 1000px;
  height: 600px;
  margin-bottom: 2rem;
}

/* 电影院外观 */
.cinema-exterior {
  position: absolute;
  width: 100%;
  height: 100%;
}

.cinema-building {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  height: 200px;
  background: #8B4513;
  border-radius: 10px;
}

.cinema-sign {
  position: absolute;
  top: -30px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
}

.neon-text {
  font-size: 2.5rem;
  color: #FF1493;
  text-shadow: 
    0 0 10px #FF1493,
    0 0 20px #FF1493,
    0 0 30px #FF1493;
  animation: neon-flicker 2s infinite alternate;
}

@keyframes neon-flicker {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

.movie-title {
  font-size: 1rem;
  color: #FFD700;
  margin-top: 5px;
}

.entrance {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 100px;
  background: #654321;
  border-radius: 10px 10px 0 0;
}

.couple-outside {
  position: absolute;
  bottom: 25%;
  left: 30%;
  display: flex;
  gap: 20px;
  align-items: flex-end;
}

.boy-excited, .girl-excited {
  position: relative;
  width: 50px;
  height: 80px;
}

.boy-excited .head, .girl-excited .head {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin: 0 auto 5px;
}

.boy-excited .head {
  background: #DEB887;
}

.girl-excited .head {
  background: #F5DEB3;
}

.boy-excited .body, .girl-excited .body {
  width: 25px;
  height: 35px;
  margin: 0 auto;
  border-radius: 10px;
}

.boy-excited .body {
  background: #4169E1;
}

.girl-excited .body {
  background: #FF69B4;
}

.speech-bubble {
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 8px 12px;
  border-radius: 15px;
  font-size: 12px;
  white-space: nowrap;
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}

.speech-bubble::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 8px solid transparent;
  border-right: 8px solid transparent;
  border-top: 8px solid white;
}

/* 电影院内部 */
.cinema-interior {
  position: absolute;
  width: 100%;
  height: 100%;
  background: #000;
}

.movie-screen {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 180px;
  background: #222;
  border: 5px solid #444;
  border-radius: 10px;
}

.screen-content {
  width: 100%;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.romance-scene {
  background: linear-gradient(to bottom, #FF6B6B, #FFE66D);
  position: relative;
}

.sunset {
  position: absolute;
  top: 20%;
  right: 20%;
  width: 40px;
  height: 40px;
  background: #FF4757;
  border-radius: 50%;
  box-shadow: 0 0 20px #FF6B6B;
}

.couple-silhouette {
  position: absolute;
  bottom: 20%;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
}

.silhouette {
  width: 15px;
  height: 30px;
  background: #000;
  opacity: 0.8;
}

.adventure-scene {
  background: linear-gradient(to bottom, #5352ed, #40407a);
  position: relative;
}

.mountains {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 50%;
  background: linear-gradient(45deg, #2f3542, #57606f);
  clip-path: polygon(0 100%, 25% 60%, 50% 80%, 75% 40%, 100% 70%, 100% 100%);
}

.cinema-seats {
  position: absolute;
  bottom: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 80%;
}

.seat-row {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 10px;
}

.seat {
  width: 25px;
  height: 20px;
  background: #8B0000;
  border-radius: 8px 8px 0 0;
  position: relative;
}

.seat.occupied {
  background: #654321;
}

.seat.occupied::after {
  content: '';
  position: absolute;
  top: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: #DEB887;
  border-radius: 50%;
}

.our-seat {
  background: #FF1493 !important;
}

.couple-watching {
  position: absolute;
  top: -15px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 3px;
  opacity: 0;
  scale: 0.5;
}

.boy-watching, .girl-watching {
  width: 8px;
  height: 15px;
}

.boy-watching .head, .girl-watching .head {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin: 0 auto 1px;
}

.boy-watching .head {
  background: #DEB887;
}

.girl-watching .head {
  background: #F5DEB3;
}

.boy-watching .body, .girl-watching .body {
  width: 8px;
  height: 8px;
  border-radius: 3px;
}

.boy-watching .body {
  background: #4169E1;
}

.girl-watching .body {
  background: #FF69B4;
}

.shared-popcorn {
  position: absolute;
  top: 5px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 8px;
}

.movie-selector {
  margin-bottom: 2rem;
}

.movie-selector h3 {
  color: white;
  text-align: center;
  margin-bottom: 1rem;
}

.movie-options {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.movie-option {
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid transparent;
  border-radius: 10px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  color: white;
}

.movie-option:hover, .movie-option.selected {
  border-color: #FF1493;
  background: rgba(255, 20, 147, 0.2);
}

.movie-poster {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.movie-info h4 {
  margin-bottom: 0.25rem;
}

.movie-info p {
  font-size: 0.8rem;
  opacity: 0.8;
}

.romantic-moment {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.heart-drop {
  position: absolute;
  font-size: 16px;
  animation: heart-fall infinite ease-in;
  opacity: 0;
}

@keyframes heart-fall {
  0% {
    opacity: 0;
    transform: translateY(-20px) rotate(0deg);
  }
  25% {
    opacity: 1;
    transform: translateY(150px) rotate(90deg);
  }
  75% {
    opacity: 1;
    transform: translateY(300px) rotate(180deg);
  }
  100% {
    opacity: 0;
    transform: translateY(450px) rotate(270deg);
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
  color: #FF1493;
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
  .cinema-building {
    width: 300px;
    height: 150px;
  }
  
  .neon-text {
    font-size: 1.8rem;
  }
  
  .movie-screen {
    width: 240px;
    height: 144px;
  }
  
  .movie-options {
    flex-direction: column;
    align-items: center;
  }
  
  .controls {
    flex-direction: column;
    align-items: center;
  }
}
</style>