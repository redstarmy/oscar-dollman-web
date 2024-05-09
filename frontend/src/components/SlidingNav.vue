<template>
  <div>
    <nav>
      <RouterLink
        v-for="route in filteredRoutes"
        :key="route.name as string"
        :to="route.path"
        @mouseleave="resetOffset"
        @mouseover="hoverOffset(route)"
      >
        {{ route.meta.title }}
      </RouterLink>
    </nav>
    <div v-if="currentRoute.name" class="tab_underline" :style="tabOffset" />
  </div>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-around;
}

nav a {
  text-align: center;
  font-size: 20px;
  min-width: 90px;
  text-decoration: none;
  color: inherit;
}

.tab_underline {
  height: 2px;
  width: 25%; /* Adjusted to accommodate 4 items */
  background-color: black;
  transition: 0.3s;
}
</style>

<script lang="ts" setup>
import { RouterLink, useRoute } from 'vue-router'
import { ref, computed, watch } from 'vue'
import { useWindowSize } from '@vueuse/core'
import router from '@/router'

const currentRoute = useRoute()
const tabOffset = ref<{ marginLeft: string }>({ marginLeft: '0%' })

const filteredRoutes = computed(() =>
  router
    .getRoutes()
    .filter((route) => ['overview', 'gallery', 'code', 'me'].includes(route.name as string))
)

const resetOffset = () => {
  const offset = currentRoute.meta.offset || 0
  tabOffset.value = { marginLeft: `${25 * offset}%` }
}

const hoverOffset = (route: any) => {
  const offset = route.meta.offset || 0
  tabOffset.value = { marginLeft: `${25 * offset}%` }
}

watch([currentRoute, useWindowSize().width], resetOffset)

resetOffset()
</script>
