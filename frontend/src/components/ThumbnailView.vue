<template>
  <div class="thumbnail-container">
    <div v-for="country in gallery" v-bind:key="country.name" class="thumbnail-content">
      <RouterLink :to="'album/' + country.name">
        <div class="thumbnail-frame">
          <a class="title">{{ country.title }}</a>
          <v-lazy-image :src="API_ENDPOINT + country.thumbnail.url" />
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { API_ENDPOINT } from '../../../shared/api'
import VLazyImage from 'v-lazy-image'

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

img {
  width: 100%;
}

.thumbnail-container {
  display: grid;
  grid-template-columns: auto;
  line-height: 0;
}

.thumbnail-content {
  width: 100%;
  padding: 20px 10px;
}

.thumbnail-frame {
  display: inline-block;
}

@media only screen and (min-width: 768px) {
  .thumbnail-container {
    grid-template-columns: 50% 50%;
  }
}

@media only screen and (min-width: 1200px) {
  .thumbnail-container {
    grid-template-columns: 33.33% 33.33% 33.33%;
  }
}
</style>
