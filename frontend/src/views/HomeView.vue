<template>
  <div class="description">
    <p class="text">
      This is my website. It serves the purpose of a
      <RouterLink class="link" to="/gallery">gallery</RouterLink> to showcase my photography work
      and as a platform to introduce myself to the world.
    </p>

    <hr />

    <p class="title">Code</p>
    <div class="code-container">
      <CodeEntry sub-title="oscardollman.com" link="https://github.com/redstarmy/oscar-dollman-web">
        <p class="text">
          This website is built using a
          <a target="_blank" class="link" href="https://vuejs.org/">Vue.js</a> frontend together
          with a simple
          <a target="_blank" class="link" href="https://expressjs.com/">Express</a> backend, mainly
          to serve images. Deployment is handled using Express to deploy in a single lightweight
          Docker container from
          <a
            class="link"
            target="_blank"
            href="https://hub.docker.com/repository/docker/redstarmy/oscar-dollman-web/general"
          >
            Dockerhub </a
          >!
        </p>
        <p class="text">
          I'm a great fan of
          <a class="link" target="_blank" href="https://www.typescriptlang.org/">Typescript</a>,
          which is why both backend and frontend are written with strict type checking.
        </p>
      </CodeEntry>

      <CodeEntry
        sub-title="Kopfsachen Native App"
        link="https://github.com/ProgPrak-Native-App/react-native-app"
      >
        <p class="text">
          Kopfsachen Native App is a
          <a class="link" target="_blank" href="https://reactnative.dev/">React Native</a> based App
          build for
          <a class="link" target="_blank" href="https://www.kopfsachen.org/">Kopfsachen eV.</a>
          which is an association dedicated to the promotion of young people's mental health. In the
          open source spirit, this app is freely available and aims to provide mental support on the
          go. For development and prototyping
          <a class="link" target="_blank" href="https://expo.dev/">Expo</a> was used.
        </p>
      </CodeEntry>

      <CodeEntry
        sub-title="Berlin Landesamt für Einwanderung Bot"
        link="https://github.com/redstarmy/LEA_bot"
      >
        <p class="text">
          This is a direct result of my deep frustration with Berlin's
          <a class="link" target="_blank" href="https://otv.verwalt-berlin.de/ams/TerminBuchen">
            Landesamt für Einwanderung
          </a>
          (LEA). It is a
          <a class="link" target="_blank" href="https://www.selenium.dev/">Selenium</a> bot which
          scrapes the LEA appointment webpage and notifies the user once new appointments are
          available.
        </p>
        <p class="text">
          I spent several weeks employing various strategies across different times of the day.
          Furthermore, I attempted to reach out to the LEA through both email and traditional mail,
          but my efforts yielded no success. Since there aren't any discernible patterns for the
          release of new appointments, I forked
          <a
            class="link"
            target="_blank"
            href="https://github.com/capital-G/berlin-auslanderbehorde-termin-bot"
            >an existing bot</a
          >
          and improved upon it's stability and reliabilty.
        </p>
        <p class="text"></p>
      </CodeEntry>
    </div>
  </div>
</template>

<style scoped>
hr {
  border: 1px solid rgba(128, 128, 128, 0.5);
  margin: 30px 15px;
}

.description {
  padding: 30px 10px;
}

.link {
  color: black;
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

.code-container {
  column-count: 1;
  column-gap: 20px;
}

@media only screen and (min-width: 768px) {
  .code-container {
    column-count: 2;
  }
}

@media only screen and (min-width: 1200px) {
  .code-container {
    column-count: 3;
  }
}
</style>

<script setup lang="ts">
import CodeEntry from '@/components/CodeEntry.vue'
</script>
