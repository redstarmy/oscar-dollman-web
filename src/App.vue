<script lang="ts" setup>
import { RouterView } from 'vue-router'
import SlidingNav from '@/components/SlidingNav.vue'
import router from '@/router'
import { UseWindowSize } from '@vueuse/components'
import HamburgerNav from '@/components/HamburgerNav.vue'
</script>

<template>
  <UseWindowSize v-slot="{ width }">
    <header>
      <a class="title" v-on:click="router.push('/')">Oscar Dollman</a>
      <SlidingNav v-if="width >= 600" />
      <HamburgerNav v-if="width < 600" />
    </header>
  </UseWindowSize>
  <RouterView />
</template>

<style scoped>
.title {
  z-index: 3;
}
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
