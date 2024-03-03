import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/contest',
      name: 'contest',
      component: () => import('../views/ContestView.vue')
    }
    /*     {
      path: '/terms',
      name: 'terms',
      component: () => import('../views/TermsView.vue')
    } */
  ]
})

export default router
