<script lang="ts" setup>
import { RouterView } from 'vue-router'
import router from '@/router'
import { UseWindowSize } from '@vueuse/components'
import HamburgerNav from '@/components/HamburgerNav.vue'
import SlidingNav from '@/components/SlidingNav.vue'
</script>

<template>
  <UseWindowSize v-slot="{ width }">
    <header>
      <a class="title" v-on:click="router.push('/')">Oscar Dollman</a>
      <SlidingNav v-if="width >= 600" />
      <HamburgerNav v-else />
    </header>
  </UseWindowSize>
  <RouterView />
</template>

<style scoped>
.title {
  cursor: pointer;
  z-index: 3;
  font-size: 35px;
}

a {
  font-size: 28px;
}

header {
  padding-top: 0.5rem;
  display: flex;
  justify-content: space-between;
  place-items: center;
}
@media only screen and (min-width: 600px) {
  header {
    padding-top: 2rem;
  }
}
</style>
