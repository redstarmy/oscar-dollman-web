<template>
  <div>
    <nav>


      <RouterLink to="/" @mouseleave="resetOffset()" @mouseover="hoverOffset('home')"
                  v-on:click="setActive('home')">Home
      </RouterLink>
      <RouterLink to="/gallery" @mouseleave="resetOffset()" @mouseover="hoverOffset('gallery')"
                  v-on:click="setActive('gallery')">Gallery
      </RouterLink>
      <RouterLink to="/social" @mouseleave="resetOffset()" @mouseover="hoverOffset('social')"
                  v-on:click="setActive('social')">Social
      </RouterLink>
    </nav>
    <div v-if="curRoute.name" class="tab_underline"
         v-bind:style=offset></div>
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
  transition: .3s;
}

</style>

<script lang="ts" setup>
import {RouterLink, useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import router from "@/router";

const routes = ["home", "gallery", "social"]
const curRoute = useRoute()

const active = ref()

const offset = ref()

onMounted(async () => {
  await router.isReady()
  active.value = curRoute.name
  offset.value = {marginLeft: 33.33 * routes.indexOf(active.value) + '%'}
})

const resetOffset = () => offset.value = {marginLeft: 33.33 * routes.indexOf(active.value) + '%'}
const hoverOffset = (tab) => offset.value = {marginLeft: 33.33 * routes.indexOf(tab) + '%'}
const setActive = (tab) => active.value = tab


</script>
