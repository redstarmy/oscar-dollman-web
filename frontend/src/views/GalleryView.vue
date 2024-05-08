<template>
  <div class="thumbnail-container">
    <div v-for="country in gallery" :key="country.name" class="thumbnail-content">
      <RouterLink :to="`gallery/${country.name}`">
        <div class="thumbnail-frame">
          <span class="title">{{ country.title }}</span>
          <UseWindowSize v-slot="{ width }">
            <LazyPlaceholderImage :srcImage="country.thumbnail" :windowWidth="width" />
          </UseWindowSize>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type { country } from '../../../shared/api';
import { API_ENDPOINT } from '../../../shared/api';
import LazyPlaceholderImage from '@/components/LazyPlaceholderImage.vue';
import { UseWindowSize } from '@vueuse/components';

const gallery = ref<country[]>([]);

const fetchGallery = async () => {
  try {
    const response = await fetch(`${API_ENDPOINT}get-gallery`);
    if (!response.ok) throw new Error('Network response was not ok');
    gallery.value = await response.json();
  } catch (error) {
    console.error('Error fetching image URLs:', error);
  }
};

onMounted(fetchGallery);
</script>

<style scoped>
.title {
  font-size: 30px;
  text-transform: capitalize;
  display: flex;
  justify-content: center;
  padding: 30px;
  color: black;
}

.thumbnail-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 10px;
  padding-top: 15px;
}

.thumbnail-content {
  padding: 20px;
}

.thumbnail-frame {
  width: 100%;
  display: inline-block;
}
</style>
