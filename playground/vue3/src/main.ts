import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'


import Brower from "../../../packages/browser/src"

Brower({
    dsn: 'http://localhost:7001/api/error',
})


const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')



setTimeout(() => {
    console.log(xxx.xx)
}, 1000)
