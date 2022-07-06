import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import { createI18n } from 'vue-i18n';
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/display.css'
import './my-style.css'
import App from './App.vue'
import router from  './router/index.js'


//  fontawesome icons

/* add fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faBars } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faBars)

//  i18n
const messages = {
  en: {
    message: {
      hello: 'Hello!'
    }
  },
  es: {
    message: {
      hello: 'Buenos dias!'
    }
  }
};

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})


const pinia = createPinia()
const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(i18n)
app.use(router)
app.use(pinia)
app.use(ElementPlus)
app.mount('#app')
