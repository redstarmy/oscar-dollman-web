<script lang="ts" setup>
import { RouterView } from 'vue-router'
import SlidingNav from '@/components/SlidingNav.vue'
import router from '@/router'
import { UseWindowSize } from '@vueuse/components'
import HamburgerNav from '@/components/HamburgerNav.vue'
</script>

<template>
  <UseWindowSize v-slot="{ width, height }">
    <header>
      <a v-on:click="router.push('/')">Oscar Dollman</a>
      <SlidingNav v-if="width >= 600" />
      <HamburgerNav v-if="width < 600" />
    </header>
  </UseWindowSize>
  <RouterView />
</template>

<style scoped>
a {
  font-size: 28px;
}

header {
  padding-top: 1rem;
  display: flex;
  justify-content: space-between;
  place-items: center;
}

@media (max-width: 1024px) {
}
</style>
