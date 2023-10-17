<template>
  <div>
    <nav>
      <RouterLink to="/" @mouseleave="offset = active" @mouseover="offset = calcOffset('home')"
                  v-on:click="active=0">Home
      </RouterLink>
      <RouterLink to="/gallery" @mouseleave="offset = active" @mouseover="offset = calcOffset('gallery')"
                  v-on:click="active=1">Gallery
      </RouterLink>
      <RouterLink to="/social" @mouseleave="offset = active" @mouseover="offset = calcOffset('social')"
                  v-on:click="active=2">Social
      </RouterLink>
    </nav>
    <div class="tab_underline" v-if="curRoute.name"
         v-bind:style="{marginLeft: 33.33 * offset + '%'}"></div>
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

const active = ref(0)
const offset = ref(0)
onMounted(async () => {
  await router.isReady()
  active.value = calcOffset(curRoute.name)
  offset.value= calcOffset(curRoute.name)
})

const calcOffset = (tab) => routes.indexOf(tab)



</script>
