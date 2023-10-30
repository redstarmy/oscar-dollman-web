import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

declare module 'vue-router' {
  interface RouteMeta {
    offset: number
    title: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { offset: 0, title: 'Home' }
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('@/views/GalleryView.vue'),
      meta: { offset: 1, title: 'Gallery' }
    },
    {
      path: '/social',
      name: 'social',
      component: () => import('@/views/SocialView.vue'),
      meta: { offset: 2, title: 'Social' }
    },
    {
      path: '/album/:countryName',
      name: 'album',
      component: () => import('@/views/AlbumView.vue'),
      meta: { offset: 1, title: 'Album' },
      props: true
    }
  ]
})

export default router
