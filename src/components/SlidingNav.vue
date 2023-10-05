<template>
  <div>
    <nav>
      <RouterLink to="/" @mouseleave="highlighted = activeTab" @mouseover="highlighted='home'"
                  v-on:click="activeTab='home'">Home
      </RouterLink>
      <RouterLink to="/gallery" @mouseleave="highlighted = activeTab" @mouseover="highlighted='gallery'"
                  v-on:click="activeTab='gallery'">Gallery
      </RouterLink>
      <RouterLink to="/social" @mouseleave="highlighted = activeTab" @mouseover="highlighted='social'"
                  v-on:click="activeTab='about'">Social
      </RouterLink>
    </nav>
    <div class="tab_underline"
         v-bind:style="{marginLeft: 33.33 * Math.max(routes.indexOf(String(highlighted)), 0) + '%'}"></div>
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
import {computed, ref} from "vue";

const routes = ["home", "gallery", "social"]
const route = useRoute()

const activeTab = ref(computed(() => route.name))
const highlighted = ref(computed(() => route.name))
</script>
