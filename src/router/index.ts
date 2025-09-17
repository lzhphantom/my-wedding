import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Meeting from '../views/Meeting.vue'
import Dating from '../views/Dating.vue'
import Movies from '../views/Movies.vue'
import FirstKiss from '../views/FirstKiss.vue'
import Heartbeat from '../views/Heartbeat.vue'
import Wedding from '../views/Wedding.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/meeting',
      name: 'meeting',
      component: Meeting
    },
    {
      path: '/dating',
      name: 'dating',
      component: Dating
    },
    {
      path: '/movies',
      name: 'movies',
      component: Movies
    },
    {
      path: '/first-kiss',
      name: 'firstKiss',
      component: FirstKiss
    },
    {
      path: '/heartbeat',
      name: 'heartbeat',
      component: Heartbeat
    },
    {
      path: '/wedding',
      name: 'wedding',
      component: Wedding
    }
  ],
})

export default router
