import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'
import { plugin, defaultConfig } from '@formkit/vue'
import '@volverjs/style/base'
import App from '@/App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Notifications)
app.use(plugin, defaultConfig)

app.mount('#app')
