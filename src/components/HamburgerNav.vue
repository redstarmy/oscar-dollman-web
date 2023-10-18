<template>
  <div>
    <div class="burger" :class="{ active: open }" v-on:click="open = !open" />
    <div class="overlay" :class="{ active: open }"></div>
  </div>
</template>

<style scoped>
.overlay {
  /* Height & width depends on how you want to reveal the overlay (see JS below) */
  height: 0;
  width: 100%;
  position: fixed;
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.9);
  overflow-x: hidden;
  transition: 0.3s;
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
  background: white;
  transform: translateY(0) rotate(-45deg);
}

.active.burger:after {
  background: white;
  transform: translateY(0) rotate(45deg);
}
</style>

<script lang="ts" setup>
import { ref } from 'vue'

const open = ref(false)
</script>
