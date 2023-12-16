import { createRouter, createWebHistory } from 'vue-router'
import MainPage from '../views/MainPage.vue'
import PageNotFound from '../views/PageNotFound.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: MainPage
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