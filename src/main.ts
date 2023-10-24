import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueLazyload from "vue-lazyload";

const app = createApp(App)

app.use(VueLazyload, {
  attempt: 3
})

app.use(router)

app.mount('#app')
