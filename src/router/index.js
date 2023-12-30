import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import PredictPage from '../views/PredictPage.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {
    path: '/collect',
    name: 'home',
    component: MainPage
  },
  {
    path: '/',
    name: 'predict',
    component: PredictPage
  },
  {
    path: '/:pathMatch(.*)',
    component: PageNotFound,
  }
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router