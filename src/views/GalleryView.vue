<template>
  <div v-for="country in countries" v-bind:key="country.title">
    <a class="title">{{ country.title }}</a>
    <div class="gallery-container">
      <div v-for="image in country.images" :key="image" class="image-container">
        <v-lazy-image :src="API_ENDPOINT + image" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { API_ENDPOINT } from '@/api/api'
import type { country } from '@/api/api'
import VLazyImage from 'v-lazy-image'

const countries = ref([] as country[])

const fetchCountries = async () => {
  try {
    const response = await fetch(API_ENDPOINT + 'get-dirs')
    if (!response.ok) {
      console.error('Network response was not ok')
    }
    return (await response.json()).countries
  } catch (error) {
    console.error('Error fetching image Directories:', error)
  }
}

const fetchImages = async (country: string) => {
  try {
    const response = await fetch(API_ENDPOINT + country + '/get-images')
    if (!response.ok) {
      console.error('Network response was not ok')
    }
    return (await response.json()).images
  } catch (error) {
    console.error('Error fetching image URLs:', error)
  }
}

const fetchAllImages = async () => {
  fetchCountries().then((countryNames) =>
    countryNames.forEach((countryName: string) =>
      fetchImages(countryName).then((images) =>
        countries.value.push({ title: countryName, images: images })
      )
    )
  )
}

onMounted(fetchAllImages)
</script>
<style scoped>
.title {
  font-size: 40px;
  text-transform: capitalize;
  justify-content: center;
  display: flex;
  padding: 25px;
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
