<!-- GalleryComponent.vue -->
<template>
  <div v-if="errorMessage">{{ errorMessage }}</div>
  <div class="thumbnail-container">
    <div v-if="isLoading" class="loading">Loading gallery...</div>
    <div v-else v-for="country in gallery" :key="country.name" class="thumbnail-content">
      <RouterLink :to="'gallery/' + country.name">
        <div class="thumbnail-frame">
          <h2 class="thumbnail-title">{{ country.title }}</h2>
          <UseWindowSize v-slot="{ width }">
            <lazy-placeholder-image
              :srcImage="country.thumbnail"
              :windowWidth="width"
              style="box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15)"
            />
          </UseWindowSize>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import type { country } from '../../../shared/api'
import { API_ENDPOINT } from '../../../shared/api'
import LazyPlaceholderImage from '@/components/LazyPlaceholderImage.vue'
import { UseWindowSize } from '@vueuse/components'

const gallery = ref([] as country[])
const isLoading = ref(true)
const errorMessage = ref('')

const fetchGallery = async () => {
  isLoading.value = true // Ensure loading is true at the start of the fetch operation
  try {
    // Attempt to retrieve cached data first
    const cachedGallery = sessionStorage.getItem('gallery')
    if (cachedGallery) {
      gallery.value = JSON.parse(cachedGallery)
      isLoading.value = false // Set loading false here if cache is used
    } else {
      const response = await fetch(API_ENDPOINT + 'get-gallery')
      if (!response.ok) {
        throw new Error(`Network response was not ok, status: ${response.status}`)
      }
      gallery.value = await response.json()
      sessionStorage.setItem('gallery', JSON.stringify(gallery.value)) // Cache the fetched gallery
      isLoading.value = false // Set loading false here after successful fetch
    }
  } catch (error) {
    isLoading.value = false // Ensure loading is set to false when an error occurs
    if (error instanceof Error) {
      errorMessage.value = 'Error fetching image URLs: ' + error.message
    } else {
      // If the error is not an instance of Error, it might be a string or another type
      errorMessage.value = 'An unexpected error occurred'
    }
  }
}

onMounted(fetchGallery)
</script>

<style scoped>
.thumbnail-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  padding-top: 15px;
  line-height: 0;
}

.thumbnail-content {
  padding: 10px;
}

.thumbnail-frame {
  width: 100%;
  display: inline-block;
  text-align: center;
}

.thumbnail-title {
  font-size: 24px;
  text-transform: capitalize;
  margin: 20px 0;
  color: black;
}

.loading {
  font-size: 20px;
  text-align: center;
  padding: 20px;
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
