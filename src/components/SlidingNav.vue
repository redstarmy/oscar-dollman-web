<template>
  <div>
    <nav>
      <RouterLink
        v-bind:key="route.name"
        v-for="route in router.getRoutes()"
        :to="route.path"
        @mouseleave="resetOffset()"
        @mouseover="hoverOffset(route)"
        >{{ route.meta.title }}
      </RouterLink>
    </nav>
    <div v-if="currentRoute.name" class="tab_underline" v-bind:style="tabOffset" />
  </div>
</template>

<style scoped>
nav {
  display: flex;
  justify-content: space-around;
}

nav a {
  text-align: center;
  font-size: 18px;
  min-width: 80px;
  text-decoration: none;
  color: inherit;
}

.tab_underline {
  height: 2px;
  width: 33.33%;
  background-color: black;
  transition: 0.3s;
}
</style>

<script lang="ts" setup>
import { RouterLink, useRoute } from 'vue-router'
import { ref, watch } from 'vue'
import router from '@/router'
import { useWindowSize } from '@vueuse/core'

const currentRoute = useRoute()
const tabOffset = ref()

watch([currentRoute, useWindowSize().width], () => {
  resetOffset()
})

const resetOffset = () => (tabOffset.value = { marginLeft: 33.33 * currentRoute.meta.offset + '%' })
const hoverOffset = (tab: any) => (tabOffset.value = { marginLeft: 33.33 * tab.meta.offset + '%' })
</script>
