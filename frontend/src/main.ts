import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Notifications from '@kyvg/vue3-notification'
// import @volverjs/ui-vue plugin
import { VolverPlugin } from '@volverjs/ui-vue'
// import @volverjs/ui-vue icons collections
import iconsCollections from '@volverjs/ui-vue/icons'
import '@volverjs/style/base'
import App from '@/App.vue'
import router from './router'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(Notifications)
app.use(VolverPlugin, {
  iconsCollections
})
app.mount('#app')
