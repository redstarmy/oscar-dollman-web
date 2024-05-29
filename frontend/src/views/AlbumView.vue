<template>
  <div v-if="album">
    <div class="album-title">
      <div class="back" @click="handleBack">&lt;</div>
      <span>{{ album.title }}</span>
      <div class="hidden-arrow">&lt;</div>
    </div>

    <div v-if="detailIndex === -1" class="masonry-wrapper">
      <div class="masonry-container">
        <div
          v-for="image in album.images"
          :key="image.index"
          class="masonry-image-container"
          @click="openDetail(image)"
          :id="image.index.toString()"
        >
          <UseWindowSize v-slot="{ width }">
            <LazyPlaceholderImage :windowWidth="width" :srcImage="image" />
          </UseWindowSize>
        </div>
      </div>
    </div>

    <div v-else class="detail-container">
      <div
        class="overlay overlay-left"
        :style="{ maxHeight: detailSrc?.height || 'auto' }"
        @click="handleDetailBackward"
      ></div>
      <div class="overlay overlay-right" @click="handleDetailForward"></div>
      <div class="detail-nav-left">&lt;</div>
      <img :src="API_ENDPOINT + (detailSrc?.url || '')" :alt="'Gallery'" class="masonry-image" />
      <div class="detail-nav-right">&gt;</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, nextTick } from 'vue'
import router from '@/router'
import type { image } from '../../../shared/api'
import { API_ENDPOINT } from '../../../shared/api'
import LazyPlaceholderImage from '@/components/LazyPlaceholderImage.vue'
import { useWindowSize } from '@vueuse/core'
import { UseWindowSize } from '@vueuse/components'

const props = defineProps({
  countryName: String
})

const album = ref<{ title: string; images: image[] } | null>(null)
const detailIndex = ref(-1)
const detailMaxIndex = ref(0)
const detailSrc = computed(() => {
  return album.value?.images?.find((img) => img.index === detailIndex.value) || null
})

const fetchAlbum = async () => {
  const cacheKey = `album-${props.countryName}`
  const cachedData = sessionStorage.getItem(cacheKey)

  if (cachedData) {
    album.value = JSON.parse(cachedData)
    detailMaxIndex.value = album.value?.images.length - 1 || 0
  } else {
    try {
      const response = await fetch(`${API_ENDPOINT}get-album/${props.countryName}`)
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      album.value = data
      detailMaxIndex.value = data.images.length - 1
      sessionStorage.setItem(cacheKey, JSON.stringify(data))
    } catch (error) {
      console.error(
        'Error fetching album:',
        error instanceof Error ? error.message : 'Unknown error'
      )
    }
  }
}

onMounted(fetchAlbum)

const openDetail = (image: image) => {
  if (album.value && useWindowSize().width.value > 768) {
    detailIndex.value = image.index
  }
}

const handleBack = () => {
  if (detailIndex.value === -1) {
    router.go(-1)
  } else {
    const scrollToElement = detailIndex.value.toString()
    detailIndex.value = -1
    nextTick(() => document.getElementById(scrollToElement)?.scrollIntoView())
  }
}

const handleDetailForward = () => {
  if (album.value) {
    detailIndex.value = Math.min(detailIndex.value + 1, detailMaxIndex.value)
  }
}

const handleDetailBackward = () => {
  if (album.value) {
    detailIndex.value = Math.max(detailIndex.value - 1, 0)
  }
}
</script>

<style scoped>
.album-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  padding: 5px;
}

.back,
.hidden-arrow {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.hidden-arrow {
  opacity: 0;
  cursor: default;
}

.overlay {
  width: 40%;
  position: absolute;
  height: 100%;
}

.overlay-left {
  cursor: w-resize;
  left: 0;
}

.overlay-right {
  cursor: e-resize;
  right: 0;
}

.detail-nav-left {
  padding-right: 20px;
}

.detail-nav-right {
  padding-left: 20px;
}

.detail-container {
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

img {
  max-height: 80vh;
  width: auto;
  max-width: 80%;
}

.masonry-wrapper {
  width: 100%;
  max-width: 1200px;
  margin: auto;
}

.masonry-container {
  column-gap: 0;
  line-height: 0;
  column-count: 1;
}

.masonry-image-container {
  display: inline-block;
  width: 100%;
  padding: 4px;
}

@media only screen and (min-width: 600px) {
  .masonry-container {
    column-count: 1;
  }
}

@media only screen and (min-width: 768px) {
  .masonry-container {
    column-count: 2;
  }

  .masonry-image-container {
    cursor: pointer;
  }
}

@media only screen and (min-width: 1200px) {
  .masonry-container {
    column-count: 3;
  }
}
</style>
