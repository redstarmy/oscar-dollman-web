<template>
  <div :class="['burger', { active: isOpen }]" @click="toggleMenu"></div>
  <div :class="['overlay', { active: isOpen }]">
    <div class="overlay-content">
      <RouterLink
        v-for="route in filteredRoutes"
        :key="route.name"
        :class="{ noUnderline: activeRoute.name !== route.name }"
        :to="route.path"
        @click="closeMenu"
      >
        {{ route.meta.title }}
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

const isOpen = ref(false);
const activeRoute = useRoute();
const router = useRouter();

// Toggle the menu open or closed
const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

// Close the menu
const closeMenu = () => {
  isOpen.value = false;
};

// Watch for changes in the active route to close the menu
watch(() => activeRoute.name, closeMenu);

// Filter out the 'album' route
const filteredRoutes = computed(() =>
  router.getRoutes().filter((route) => route.name !== 'album')
);
</script>

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

.overlay.active {
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

.burger.active:before {
  transform: translateY(0) rotate(-45deg);
}

.burger.active:after {
  transform: translateY(0) rotate(45deg);
}
</style>
