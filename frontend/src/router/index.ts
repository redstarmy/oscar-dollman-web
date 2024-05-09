// router.ts
import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized
} from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { API_ENDPOINT } from '../../../shared/api'

declare module 'vue-router' {
  interface RouteMeta {
    offset: number
    title: string
  }
}

const trackSource = async (to: RouteLocationNormalized, next: NavigationGuardNext) => {
  const source = new URLSearchParams(window.location.search).get('source')
  if (to.query.source) {
    try {
      await fetch(API_ENDPOINT + 'track-source', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ source })
      })
    } catch (error) {
      console.error('Error tracking source:', error)
    }
    next({ path: to.path })
  } else {
    next()
  }
}

const beforeEnterWithSourceTracking = async (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  await trackSource(to, next)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'overview',
      component: HomeView,
      meta: { offset: 0, title: 'Overview' },
      beforeEnter: beforeEnterWithSourceTracking
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
