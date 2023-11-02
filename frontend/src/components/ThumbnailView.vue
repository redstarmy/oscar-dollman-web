<template>
  <div class="thumbnail-container">
    <div v-for="country in gallery" v-bind:key="country.name" class="thumbnail-content">
      <RouterLink :to="'gallery/' + country.name">
        <div class="thumbnail-frame">
          <a class="title">{{ country.title }}</a>
          <lazy-placeholder-image :srcImage="country.thumbnail" />
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LazyPlaceholderImage from '@/components/LazyPlaceholderImage.vue'

defineProps(['gallery'])
</script>
<style scoped>
.title {
  font-size: 30px;
  text-transform: capitalize;
  justify-content: center;
  display: flex;
  padding: 30px;
  color: black;
}

.thumbnail-container {
  display: grid;
  grid-template-columns: 1fr;
  line-height: 0;
}

.thumbnail-content {
  padding: 20px 10px;
}

.thumbnail-frame {
  width: 100%;
  display: inline-block;
}

@media only screen and (min-width: 768px) {
  .thumbnail-container {
    grid-template-columns: 1fr 1fr;
  }
}

@media only screen and (min-width: 1200px) {
  .thumbnail-container {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
