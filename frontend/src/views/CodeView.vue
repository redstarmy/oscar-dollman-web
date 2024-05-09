<template>
  <div class="code-description">
    <p class="title">Code Projects</p>
    <div class="code-container">
      <div class="code-section">
        <CodeEntry
          sub-title="oscardollman.com"
          link="https://github.com/redstarmy/oscar-dollman-web"
        >
          <p class="text">
            This website is built using a
            <a target="_blank" class="link" href="https://vuejs.org/">Vue.js</a> frontend together
            with a simple
            <a target="_blank" class="link" href="https://expressjs.com/">Express</a> backend,
            mainly to serve images. Deployment is handled using Express to deploy in a single
            lightweight Docker container from
            <a
              class="link"
              target="_blank"
              href="https://hub.docker.com/repository/docker/redstarmy/oscar-dollman-web/general"
            >
              Dockerhub</a
            >!
          </p>
          <p class="text">
            I'm a great fan of
            <a class="link" target="_blank" href="https://www.typescriptlang.org/">Typescript</a>,
            which is why both backend and frontend are written with strict type checking.
          </p>
        </CodeEntry>
      </div>
      <div class="divider"></div>
      <div class="code-section">
        <CodeEntry
          sub-title="Kopfsachen Native App"
          link="https://github.com/ProgPrak-Native-App/react-native-app"
        >
          <p class="text">
            Kopfsachen Native App is a
            <a class="link" target="_blank" href="https://reactnative.dev/">React Native</a> based
            App build for
            <a class="link" target="_blank" href="https://www.kopfsachen.org/">Kopfsachen eV.</a>
            which is an association dedicated to the promotion of young people's mental health.
          </p>
        </CodeEntry>
      </div>
      <div class="divider"></div>
      <div class="code-section">
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
        </CodeEntry>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CodeEntry from '@/components/CodeEntry.vue'
</script>

<style scoped>
.code-description {
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 10px;
}

.title {
  display: block;
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
}

.code-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}

.code-section {
  flex: 1;
  padding: 0 10px;
}

.divider {
  width: 1px;
  height: 100%;
  background-color: rgba(128, 128, 128, 0.5);
}

.text {
  font-size: 20px;
  margin-bottom: 10px;
}

.link {
  color: black;
  text-decoration: underline;
}

@media only screen and (max-width: 900px) {
  .code-container {
    flex-direction: column;
  }

  .divider {
    width: 100%;
    height: 1px;
    margin: 20px 0;
  }

  .code-section {
    padding: 20px 0;
  }
}
</style>
