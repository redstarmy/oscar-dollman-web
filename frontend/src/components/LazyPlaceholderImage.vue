<template>
  <figure>
    <img
      :style="optStyle"
      ref="lazyImage"
      :alt="'image_' + srcImage.index"
      @load="onImageLoad"
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
import type { image } from '../../../shared/api';
import { API_ENDPOINT } from '../../../shared/api';
import { ref, watch, onMounted } from 'vue';
import type { PropType } from 'vue';
import { useIntersectionObserver, useWindowSize } from '@vueuse/core';

const props = defineProps({
  srcImage: {
    type: Object as PropType<image>,
    required: true,
  },
  windowWidth: {
    type: Number,
    required: true,
  },
  optStyle: {
    type: String,
    default: '',
  },
});

const imageLoaded = ref(false);
const lazyImage = ref<HTMLImageElement | null>(null);

const setSize = (windowWidth: number): 'small' | 'medium' | 'large' => {
  if (windowWidth === -1) {
    return 'large';
  } else if (windowWidth < 500) {
    return 'small';
  } else if (windowWidth < 768) {
    return 'medium';
  } else if (windowWidth < 900) {
    return 'small';
  } else if (windowWidth < 1200) {
    return 'medium';
  } else if (windowWidth < 1500) {
    return 'small';
  } else {
    return 'medium';
  }
};

const getSrcImg = (img: image) => {
  switch (setSize(props.windowWidth)) {
    case 'small':
      return `${API_ENDPOINT}${img.smallUrl}`;
    case 'medium':
      return `${API_ENDPOINT}${img.mediumUrl}`;
    default:
      return `${API_ENDPOINT}${img.url}`;
  }
};

const loadLazyImage = () => {
  if (lazyImage.value) {
    lazyImage.value.src = getSrcImg(props.srcImage);
  }
};

const onImageLoad = () => {
  imageLoaded.value = true;
};

const getPlaceholderAspectRatio = (image: image) =>
  image.width && image.height ? image.width / image.height : 1;

const observeLazyImage = (figure: HTMLElement) => {
  const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadLazyImage();
        observer.unobserve(figure);
      }
    });
  };

  const windowWidth = useWindowSize().width.value;
  const observerOptions = {
    root: null,
    threshold: 0,
    rootMargin: windowWidth > 768 ? '30%' : '50%',
  };

  useIntersectionObserver(figure, handleIntersect, observerOptions);
};

onMounted(() => {
  if (lazyImage.value) {
    observeLazyImage(lazyImage.value.parentElement as HTMLElement);
  }
});

watch(
  () => props.srcImage,
  () => {
    imageLoaded.value = false;
    loadLazyImage();
  }
);
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
