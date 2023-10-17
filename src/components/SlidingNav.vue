<template>
  <div>
    <nav>
      <RouterLink
        v-for="rot in router.getRoutes()"
        :to="rot.path"
        @mouseleave="resetOffset()"
        @mouseover="hoverOffset(rot)"
        v-on:click="setActive(rot)"
        >{{ rot.meta.title }}
      </RouterLink>
    </nav>
    <div v-if="curRoute.name" class="tab_underline" v-bind:style="offset"></div>
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
  height: 0.15em;
  width: 33.33%;
  background-color: black;
  transition: 0.3s;
}
</style>

<script lang="ts" setup>
import { RouterLink, useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import router from '@/router'

const curRoute = useRoute()

const active = ref()
const offset = ref()

onMounted(async () => {
  await router.isReady()
  setActive(curRoute)
  resetOffset()
})

const resetOffset = () => (offset.value = { marginLeft: 33.33 * active.value.meta.offset + '%' })
const hoverOffset = (tab) => (offset.value = { marginLeft: 33.33 * tab.meta.offset + '%' })
const setActive = (tab) => (active.value = tab)
</script>
