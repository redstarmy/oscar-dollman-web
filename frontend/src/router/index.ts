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
      name: 'overview',
      component: HomeView,
      meta: { offset: 0, title: 'Overview' }
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('@/views/GalleryView.vue'),
      meta: { offset: 1, title: 'Gallery' }
    },
    {
      path: '/code',
      name: 'code',
      component: () => import('@/views/CodeView.vue'),
      meta: { offset: 2, title: 'Code' }
    },
    {
      path: '/me',
      name: 'me',
      component: () => import('@/views/MeView.vue'),
      meta: { offset: 3, title: 'Me' }
    },
    {
      path: '/gallery/:countryName',
      name: 'album',
      component: () => import('@/views/AlbumView.vue'),
      meta: { offset: 1, title: 'Album' },
      props: true
    }
  ]
})

export default router
