<template>
  <div class="description">
    <div class="img-frame">
      <img :src="API_ENDPOINT + profileURL.url" alt="Profile" loading="lazy" />
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
        Feel free to contact me. For inquiries, please to
        <a href="mailto:info@oscardollman.com">email</a> me or connect with me on
        <a href="https://www.linkedin.com/in/oscar-dollman" target="_blank">LinkedIn</a>.
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { API_ENDPOINT } from '../../../shared/api'

const profileURL = ref({ url: '' })

const fetchProfile = async () => {
  try {
    const response = await fetch(API_ENDPOINT + 'get-profile')
    if (!response.ok) throw new Error('Network response was not ok')

    profileURL.value = await response.json()
  } catch (error) {
    console.error('Error fetching profile image:', error)
  }
}

onMounted(fetchProfile)
</script>

<style scoped>
.description {
  padding: 30px 10px;
  display: grid;
  grid-template-columns: 1fr;
}

.text {
  font-size: 20px;
  margin-bottom: 10px;
}

.text a {
  color: black;
  text-decoration: underline;
}

.img-frame {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
}

img {
  width: 70%;
  height: auto;
}

@media only screen and (min-width: 768px) {
  .description {
    grid-template-columns: 1fr 1fr;
  }
  .img-frame {
    padding-bottom: 0;
  }
}
</style>
