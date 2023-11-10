<template>
  <div class="container">
    <div class="subtitleContainer">
      <div class="subtitle">{{ subTitle }}</div>
      <a class="badge" target="_blank" :href="link"
        ><img
          src="https://img.shields.io/badge/view%20on%20GitHub-gray?style=flat&link=https://github.com/redstarmy/oscar-dollman-web"
          alt="View on GitHub"
      /></a>
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps({
  subTitle: String,
  link: String
})
</script>

<style scoped>
.container {
  padding-bottom: 20px;
  break-inside: avoid;
}
.badge {
  display: flex;
  align-items: center;
  padding-left: 8px;
}
.subtitle {
  font-size: 20px;
  font-weight: bold;
}
.subtitleContainer {
  padding: 5px 0;
  display: flex;
}
</style>
