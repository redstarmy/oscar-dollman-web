<template>
  <div class="burger" :class="{ active: isOpen }" v-on:click="isOpen = !isOpen" />
  <div class="overlay" :class="{ active: isOpen }">
    <div class="overlay-content">
      <RouterLink
        v-for="route in router.getRoutes()"
        :class="{ noUnderline: activeRoute.name != route.name }"
        :to="route.path"
        v-on:click="isOpen=false"
        >{{ route.meta.title }}
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.overlay-content {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.overlay-content a {
  font-size: 30px;
  padding: 10px;
  text-align: center;
  color: inherit;
  display: block;
  text-decoration-thickness: 2px;
  text-underline-offset: 7px;
}

.overlay {
  height: 0;
  width: 100%;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  background: white;
  overflow: hidden;
  transition: 0.4s;
}

.active.overlay {
  height: 100%;
}

.burger {
  height: 20px;
  width: 30px;
  transition: all 250ms ease-out;
  cursor: pointer;
  display: inline-block;
  background: transparent;
  position: relative;
  padding-top: 1em;
  padding-bottom: 1em;
  margin-bottom: 1em;
  z-index: 2;
}

.noUnderline {
  text-decoration: none;
}

.burger:before,
.burger:after {
  content: '';
  width: 30px;
  height: 1px;
  position: absolute;
  background: black;
  transition: all 250ms ease-out;
}

.burger:before {
  transform: translateY(-4px);
}

.burger:after {
  transform: translateY(4px);
}

.active.burger:before {
  transform: translateY(0) rotate(-45deg);
}

.active.burger:after {
  transform: translateY(0) rotate(45deg);
}
</style>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import router from '@/router'
import { RouterLink, useRoute } from 'vue-router'

const activeRoute = ref(useRoute())
const isOpen = ref(false)

watch(activeRoute.value, () => (isOpen.value = false))
</script>
