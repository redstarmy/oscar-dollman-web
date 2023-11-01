<template>
  <figure v-lazy>
    <img
      ref="lazyImage"
      :alt="'image_' + srcImage.index"
      :onload="onImageLoad"
      :class="{ loading: !imageLoaded }"
    />
    <div
      v-if="!imageLoaded"
      class="flashing-placeholder"
      :style="{ aspectRatio: getPlaceholderAspectRatio(srcImage) }"
    ></div>
  </figure>
</template>

<script lang="ts" setup>
import type { image } from '../../../shared/api'
import { API_ENDPOINT } from '../../../shared/api'
import type { UseIntersectionObserverOptions } from '@vueuse/core'
import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

const props = defineProps(['srcImage'])
const imageLoaded = ref(false)
const lazyImage = ref()

window.onload = () => lazyImage.value.src = API_ENDPOINT + props.srcImage.url

const vLazy = {
  mounted: (figure: HTMLElement) => {
    function handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          lazyImage.value.src = API_ENDPOINT + props.srcImage.url
          observer.unobserve(figure)
        }
      })
    }
    useIntersectionObserver(figure, handleIntersect, {
      root: null,
      threshold: '0',
      rootMargin: "20%"
    } as unknown as UseIntersectionObserverOptions)
  }
}
const getPlaceholderAspectRatio = (image: image) =>
  image.width && image.height ? image.width / image.height : 1

const onImageLoad = () => imageLoaded.value = true
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
