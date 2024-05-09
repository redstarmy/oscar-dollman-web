<template>
  <div class="description">
    <div class="img-frame">
      <UseWindowSize v-slot="{ width }">
        <LazyPlaceholderImage
          :srcImage="profile"
          :windowWidth="width"
          optStyle="max-width: 100%; height: auto;"
        />
      </UseWindowSize>
    </div>

    <div class="info">
      <p class="text">
        Hello! I'm Oscar, a student at TU Berlin with a passion for machine learning, web
        development, and business analysis.
      </p>
      <br />
      <p class="text">In my free time, I enjoy photography, specifically film photography.</p>
      <br />
      <p class="text">
        Feel free to contact me. For inquiries, please email me at
        <a href="mailto:info@oscardollman.com">info@oscardollman.com</a> or connect with me on
        <a href="https://www.linkedin.com/in/oscar-dollman" target="_blank">LinkedIn</a>.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { API_ENDPOINT, type image } from '../../../shared/api'
import { UseWindowSize } from '@vueuse/components'
import LazyPlaceholderImage from '@/components/LazyPlaceholderImage.vue'

const profile = ref<image>({ url: '', smallUrl: '', mediumUrl: '', width: 5407, height: 3862, index: 0 })

const fetchProfile = async () => {
  try {
    const response = await fetch(API_ENDPOINT + 'get-profile')
    if (!response.ok) throw new Error('Network response was not ok')

    profile.value = await response.json()
  } catch (error) {
    console.error('Error fetching profile image:', error)
  }
}

onMounted(fetchProfile)
</script>

<style scoped>
.description {
  padding: 30px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

.img-frame {
  width: 80%;
  padding-bottom: 20px;
}

.text {
  font-size: 20px;
  margin-bottom: 10px;
}

.text a {
  color: black;
  text-decoration: underline;
}

.info {
  width: 80%;
  text-align: left;
}

@media only screen and (min-width: 768px) {
  .description {
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 40px;
  }

  .img-frame {
    width: 70%;
    padding-bottom: 0;
  }
}

@media only screen and (min-width: 1200px) {
  .img-frame {
    width: 50%;
    padding-bottom: 0;
  }
}
</style>
