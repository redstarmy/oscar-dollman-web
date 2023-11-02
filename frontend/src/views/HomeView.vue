<template>
  <div class="description">
    <p class="text">
      This is my website. It serves the purpose of a
      <RouterLink class="link" to="/gallery">gallery</RouterLink> to showcase my photography work
      and a platform to introduce myself to the world.
    </p>
    <br />
    <p class="text">
      It is built using a
      <a target="_blank" class="link" href="https://vuejs.org/">Vue.js</a> frontend together with a
      simple <a target="_blank" class="link" href="https://expressjs.com/">Express</a> backend,
      mainly to serve images. More on that in my
      <a target="_blank" class="link" href="https://github.com/redstarmy/oscar-dollman-web"
        >GitHub</a
      >
      repository.
    </p>
    <br />
    <p class="text">Enjoy :)</p>
  </div>
</template>

<style scoped>
.description {
  padding: 30px 10px;
}
.link {
  color: black;
}
.text {
  display: block;
  font-size: 20px;
}

@media only screen and (min-width: 768px) {
  .text {
    width: 70%;
  }
}
@media only screen and (min-width: 1200px) {
  .text {
    width: 50%;
  }
}
</style>
