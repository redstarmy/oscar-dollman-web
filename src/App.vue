<script lang="ts" setup>
import {RouterView} from 'vue-router'
import SlidingNav from "@/components/SlidingNav.vue";
</script>

<template>
  <header>

    <a>Oscar Dollman</a>
    <SlidingNav>
    </SlidingNav>

  </header>

  <RouterView/>
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
</style>
