<template>
  <div v-if="album">
    <div class="title" >
      <div class="back" v-on:click="router.go(-1)">&lt;</div>
      <a>{{ album.title }}</a>
      <div/>
  </div>
    <div class="gallery-container">
      <div v-for="image in album.images" :key="image.index" class="image-container">
        <v-lazy-image :src="API_ENDPOINT + image.url" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { API_ENDPOINT } from '../../../shared/api'
import VLazyImage from 'v-lazy-image'
import { onMounted, ref } from 'vue'
import router from "@/router";

const props = defineProps(['countryName'])
defineEmits([''])
const album = ref()

const fetchAlbum = async () => {
  try {
    const response = await fetch(API_ENDPOINT + 'get-album/' + props.countryName)
    if (!response.ok) {
      console.error('Network response was not ok')
    }
    album.value = await response.json()
  } catch (error) {
    console.error('Error fetching image URLs:', error)
  }
}

onMounted(fetchAlbum)
</script>
<style scoped>
.back{
  cursor: pointer;

}
.title {
  font-size: 40px;
  text-transform: capitalize;
  justify-content: space-between;
  display: flex;
  padding: 25px 10px;
}

img {
  width: 100%;
}

@media only screen and (min-width: 600px) {
  .gallery-container {
    column-count: 1;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 768px) {
  .gallery-container {
    column-count: 2;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .gallery-container {
    column-count: 3;
  }
}

.gallery-container {
  line-height: 0;
  column-gap: 0;
}

.image-container {
  display: inline-block;
  width: 100%;
  padding: 4px;
}
</style>
