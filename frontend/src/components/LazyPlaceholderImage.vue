<!-- LazyPlaceholderImage.vue -->
<template>
  <figure :style="{ aspectRatio: getAspectRatio(srcImage) }" class="figure-frame">
    <img
      :src="imageSrc"
      :srcset="imageSrcSet || undefined"
      :sizes="sizes"
      alt="placeholder"
      :style="optStyle"
      ref="lazyImage"
      decoding="async"
      @load="onImageLoad"
      :class="{ loading: !imageLoaded }"
    />
    <div v-if="!imageLoaded" class="flashing-placeholder" />
  </figure>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue'
import type { PropType } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import type { image } from '../../../shared/api'
import { API_ENDPOINT } from '../../../shared/api'

const props = defineProps({
  srcImage: {
    type: Object as PropType<image>,
    required: true
  },
  optStyle: {
    type: String,
    default: ''
  },
  sizes: {
    type: String,
    default: '100vw'
  }
})

const imageLoaded = ref(false)
const lazyImage = ref<HTMLImageElement | null>(null)
const imageSrc = ref('')
const imageSrcSet = ref('')

const getSrcImg = (img: image) => {
  return `${API_ENDPOINT}${img.url}`
}

const getTransformedSrcImg = (img: image, width: number) => {
  const originalUrl = new URL(getSrcImg(img))
  return `${originalUrl.origin}/cdn-cgi/image/width=${width},quality=80,format=auto,onerror=redirect${originalUrl.pathname}`
}

const loadInitialImage = () => {
  if (import.meta.env.PROD) {
    imageSrc.value = getTransformedSrcImg(props.srcImage, 960)
    imageSrcSet.value = [480, 960, 1600]
      .map((width) => `${getTransformedSrcImg(props.srcImage, width)} ${width}w`)
      .join(', ')
  } else {
    imageSrc.value = getSrcImg(props.srcImage)
    imageSrcSet.value = ''
  }
}

const onImageLoad = () => {
  imageLoaded.value = true
}

const getAspectRatio = (img: image) =>
  img.width && img.height ? `${img.width}/${img.height}` : '1'

const observeLazyImage = (figure: HTMLElement) => {
  const handleIntersect = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadInitialImage()
        observer.unobserve(figure)
      }
    })
  }

  const observerOptions = {
    root: null,
    threshold: 0.1,
    rootMargin: '30%'
  }

  useIntersectionObserver(figure, handleIntersect, observerOptions)
}

onMounted(() => {
  if (lazyImage.value) {
    observeLazyImage(lazyImage.value.parentElement as HTMLElement)
  }
})

watch(
  () => props.srcImage,
  () => {
    imageLoaded.value = false
    loadInitialImage()
  }
)
</script>

<style scoped>
.figure-frame {
  margin: 0;
  padding: 0;
  position: relative;
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 0.3s ease-in-out;
}

.loading {
  opacity: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
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
