<template>
  <figure :style="{ aspectRatio: getAspectRatio(srcImage) }">
    <img
      :src="imageSrc"
      alt="placeholder"
      :style="optStyle"
      ref="lazyImage"
      @load="onImageLoad"
      :class="{ loading: !imageLoaded }"
    />
    <div v-if="!imageLoaded" class="flashing-placeholder" />
  </figure>
</template>

<script lang="ts" setup>
import type { image } from '../../../shared/api'
import { API_ENDPOINT } from '../../../shared/api'
import { ref, watch, onMounted } from 'vue'
import type { PropType } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

const props = defineProps({
  srcImage: {
    type: Object as PropType<image>,
    required: true
  },
  windowWidth: {
    type: Number,
    required: true
  },
  optStyle: {
    type: String,
    default: ''
  }
})

const imageLoaded = ref(false)
const lazyImage = ref<HTMLImageElement | null>(null)
const imageSrc = ref('')

const getSizeForWindowWidth = (windowWidth: number): 'small' | 'medium' | 'large' => {
  if (windowWidth < 768) {
    return 'small'
  } else if (windowWidth < 1200) {
    return 'medium'
  } else {
    return 'large'
  }
}

const getSrcImg = (img: image, size: 'small' | 'medium' | 'large') => {
  switch (size) {
    case 'small':
      return `${API_ENDPOINT}${img.smallUrl}`
    case 'medium':
      return `${API_ENDPOINT}${img.mediumUrl}`
    default:
      return `${API_ENDPOINT}${img.url}`
  }
}

const loadInitialImage = () => {
  const size = getSizeForWindowWidth(props.windowWidth)
  imageSrc.value = getSrcImg(props.srcImage, size)
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
figure {
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
