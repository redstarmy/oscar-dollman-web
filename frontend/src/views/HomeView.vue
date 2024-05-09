<template>
  <div class="home-description">
    <p class="intro-text">
      This is my website. It serves as a
      <RouterLink class="link" to="/gallery">gallery</RouterLink> to showcase my photography work
      and as a platform to introduce myself to the world.
    </p>
    <img
      class="banner"
      :src="API_ENDPOINT + bannerImage.url"
      alt="Website Banner"
    />

    <div class="overview-container">
      <div class="overview-section">
        <p class="title">Gallery</p>
        <p class="text">
          Check out the <RouterLink class="link" to="/gallery">gallery</RouterLink> to see my photography work.
        </p>
      </div>
      <div class="divider"></div>
      <div class="overview-section">
        <p class="title">Code</p>
        <p class="text">
          Explore <RouterLink class="link" to="/code">my coding projects</RouterLink> ranging from web apps to bots.
        </p>
      </div>
      <div class="divider"></div>
      <div class="overview-section">
        <p class="title">About Me</p>
        <p class="text">
          Learn more <RouterLink class="link" to="/me">about me</RouterLink> and get in touch.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-description {
  max-width: 1080px;
  margin: 0 auto;
  padding: 30px 10px;
}

.banner {
  width: 100%;
  height: 200px;
  object-fit: cover;
  object-position: center;
  margin-bottom: 30px;
}

.intro-text {
  display: block;
  font-size: 20px;
  max-width: 800px;
  margin: 0 auto 30px auto;
  text-align: center;
  line-height: 1.5;
}

.overview-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  gap: 20px;
}

.overview-section {
  flex: 1;
  text-align: center;
  padding: 0 10px;
}

.divider {
  width: 1px;
  height: 80%;
  background-color: rgba(128, 128, 128, 0.5);
}

.link {
  color: black;
  text-decoration: underline;
}

.text {
  display: block;
  font-size: 20px;
  margin-bottom: 1rem;
}

.title {
  display: block;
  font-size: 28px;
  margin-bottom: 15px;
}

@media only screen and (max-width: 768px) {
  .overview-container {
    flex-direction: column;
  }

  .divider {
    width: 100%;
    height: 1px;
    margin: 20px 0;
  }

  .overview-section {
    padding: 20px 0;
  }
}
</style>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { onMounted, ref } from "vue";
import { API_ENDPOINT, type image } from "../../../shared/api";

const bannerImage = ref<image>({ url: '', smallUrl: '', mediumUrl: '', width: 5407, height: 3862, index: 0 })

const fetchBanner = async () => {
  try {
    const response = await fetch(API_ENDPOINT + 'get-home')
    if (!response.ok) throw new Error('Network response was not ok')

    bannerImage.value = await response.json()
  } catch (error) {
    console.error('Error fetching profile image:', error)
  }
}
onMounted(fetchBanner)
</script>
