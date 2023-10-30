<template>
  <ThumbnailView :gallery="gallery" />
</template>

<script lang="ts" setup>
import ThumbnailView from '../components/ThumbnailView.vue'
import { onMounted, ref } from 'vue'
import type { country } from '../../../shared/api'
import { API_ENDPOINT } from '../../../shared/api'

const gallery = ref([] as country[])

const fetchGallery = async () => {
  try {
    const response = await fetch(API_ENDPOINT + 'get-gallery')
    if (!response.ok) {
      console.error('Network response was not ok')
    }
    gallery.value = await response.json()
  } catch (error) {
    console.error('Error fetching image URLs:', error)
  }
}

onMounted(fetchGallery)
</script>
