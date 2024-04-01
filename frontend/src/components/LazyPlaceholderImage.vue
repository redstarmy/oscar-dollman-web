<template>
  <figure v-lazy>
    <img
      :style="optStyle"
      ref="lazyImage"
      :alt="'image_' + srcImage.index"
      :onload="onImageLoad"
      :class="{ loading: !imageLoaded }"
    />
    <div
      v-if="!imageLoaded"
      class="flashing-placeholder"
      :style="{ aspectRatio: getPlaceholderAspectRatio(srcImage) }"
    />
  </figure>
</template>

<script lang="ts" setup>
import type { image } from '../../../shared/api'
import { API_ENDPOINT } from '../../../shared/api'
import type { UseIntersectionObserverOptions } from '@vueuse/core'
import { useIntersectionObserver, useWindowSize } from '@vueuse/core'
import {ref, watch } from 'vue'
import type { PropType } from 'vue'

const props = defineProps({
  srcImage: {
    type: Object as PropType<image>,
    required: true
  },
  windowWidth: Number,
  optStyle: String
})
const imageLoaded = ref(false)
const lazyImage = ref()

watch(
  () => props.srcImage,
  () => {
    imageLoaded.value = false
    lazyImage.value.src = getSrcImg(props.srcImage)
  }
)

const setSize = (windowWidth: number) => {
  if (windowWidth == -1) {
    return 'large'
  } else if (windowWidth < 500) {
    return 'small'
  } else if (windowWidth < 768) {
    return 'medium'
  } else if (windowWidth < 900) {
    return 'small'
  } else if (windowWidth < 1200) {
    return 'medium'
  } else if (windowWidth < 1500) {
    return 'small'
  } else {
    return 'medium'
  }
}

const getSrcImg = (img: image) => {
  switch (setSize(props.windowWidth ?? 900)) {
    case 'small':
      return API_ENDPOINT + img.smallUrl
    case 'medium':
      return API_ENDPOINT + img.mediumUrl
    default:
      return API_ENDPOINT + img.url
  }
}

const vLazy = {
  mounted: (figure: HTMLElement) => {
    function handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lazyImage.value.src = getSrcImg(props.srcImage)
          observer.unobserve(figure)
        }
      })
    }
    useIntersectionObserver(figure, handleIntersect, {
      root: null,
      threshold: '0',
      rootMargin: useWindowSize().width.value > 768 ? '30%' : '50%'
    } as unknown as UseIntersectionObserverOptions)
  }
}

const getPlaceholderAspectRatio = (image: image) =>
  image.width && image.height ? image.width / image.height : 1

const onImageLoad = () => (imageLoaded.value = true)
</script>

<style scoped>
img {
  width: 100%;
}
.loading {
  height: 0;
  position: absolute;
  overflow: hidden;
}

.flashing-placeholder {
  animation: flash 2s infinite;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

@keyframes flash {
  0% {
    background-color: #f1f1f1; /* Initial grey color */
  }
  50% {
    background-color: #dcdcdc; /* Intermediate color for flashing effect */
  }
  100% {
    background-color: #f1f1f1; /* Back to grey color */
  }
}
</style>
