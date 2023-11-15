<template>
  <div v-if="album">
    <div class="album-title">
      <div class="back" v-on:click="handleBack">&lt;</div>
      <a>{{ album.title }}</a>
      <div style="opacity: 0; cursor: default">&lt;</div>
    </div>

    <div v-if="detailIndex == -1" class="masonry-container">
      <div
        v-for="image in album.images"
        :key="image.index"
        class="masonry-image-container"
        v-on:click="openDetail(image)"
        :id="image.index"
      >
        <UseWindowSize v-slot="{ width }">
          <lazy-placeholder-image :windowWidth="width" :srcImage="image" :ref="image.index" />
        </UseWindowSize>
      </div>
    </div>

    <div v-else class="detail-container">
      <div
        class="overlay overlay-left"
        :style="'max-height:' + detailSrc.height"
        v-on:click="handleDetailBackward"
      ></div>
      <div class="overlay overlay-right" v-on:click="handleDetailForward"></div>
      <div class="detailNav-left">&lt;</div>
      <UseWindowSize v-slot="{ width }">
        <lazy-placeholder-image
          size="large"
          :windowWidth="detailIndex == -1 ? width : -1"
          :srcImage="detailSrc"
          optStyle="max-height: 80vh; max-width: 100%; width: auto"
        />
      </UseWindowSize>

      <div class="detailNav-right">&gt;</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { image } from '../../../shared/api'
import { API_ENDPOINT } from '../../../shared/api'
import { computed, nextTick, onMounted, ref } from 'vue'
import router from '@/router'
import LazyPlaceholderImage from '@/components/LazyPlaceholderImage.vue'
import { useWindowSize } from '@vueuse/core'
import { UseWindowSize } from '@vueuse/components'

const props = defineProps({
  countryName: String
})
const album = ref()
const detailIndex = ref(-1)
const detailMaxIndex = ref()
const detailSrc = computed(() =>
  (album.value.images as image[]).find((image) => image.index == detailIndex.value)
)

const fetchAlbum = async () => {
  try {
    const response = await fetch(API_ENDPOINT + 'get-album/' + props.countryName)
    if (!response.ok) {
      console.error('Network response was not ok')
    }
    album.value = await response.json()
    detailMaxIndex.value = album.value.images.length - 1
  } catch (error) {
    console.error('Error fetching image URLs:', error)
  }
}

onMounted(fetchAlbum)

const openDetail = (detailImg: image) => {
  if (useWindowSize().width.value > 768) {
    detailIndex.value = detailImg.index
  }
}

const handleBack = () => {
  if (detailIndex.value == -1) {
    router.go(-1)
  } else {
    const scrollToElement = detailIndex.value.toString()
    detailIndex.value = -1
    nextTick(() => document.getElementById(scrollToElement)?.scrollIntoView())
  }
}

const handleDetailForward = () => {
  detailIndex.value = Math.min(detailIndex.value + 1, detailMaxIndex.value)
}

const handleDetailBackward = () => {
  detailIndex.value = Math.max(detailIndex.value - 1, 0)
}
</script>
<style scoped>
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

.detailNav-left {
  padding-right: 20px;
}
.detailNav-right {
  padding-left: 20px;
}
.detail-container {
  font-size: 30px;
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
}

.back {
  cursor: pointer;
  display: flex;
  align-items: center;
}
.album-title {
  font-size: 30px;
  justify-content: space-between;
  display: flex;
  padding: 5px;
}

@media only screen and (min-width: 600px) {
  .masonry-container {
    column-count: 1;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 768px) {
  .masonry-container {
    column-count: 2;
  }
}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {
  .masonry-container {
    column-count: 3;
  }
}

.masonry-container {
  line-height: 0;
  column-gap: 0;
}

.masonry-image-container {
  display: inline-block;
  width: 100%;
  padding: 4px;
}
@media only screen and (min-width: 768px) {
  .masonry-image-container {
    cursor: pointer;
  }
}
</style>
