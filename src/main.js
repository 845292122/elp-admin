import 'uno.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/router/guard'
import '@/styles/global.css'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
