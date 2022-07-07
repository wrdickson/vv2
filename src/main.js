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
import es from 'element-plus/lib/locale/lang/es'

//  fontawesome icons

/* add fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
/* import specific icons */
import { faBars, faCircleArrowRight, faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'



/* add icons to the library */
library.add(faBars, faCircleArrowRight, faCircleArrowDown)

//  i18n
const messages = {
  en: {
    message: {
      datepickerPlaceholder: 'Choose a start date',
      hello: 'Hello!',
      homePage: 'Home',
      loggedInAs: 'Logged in as',
      login: 'Login',
      loginFailed: 'Login failed',
      loginSucceeded: 'Login succeeded',
      logoff: 'Logoff',
      password: 'Password',
      reservationView: 'Reservation View',
      username: 'Username'
    }
  },
  es: {
    message: {
      datepickerPlaceholder: 'Elige una fecha de inicio',
      hello: 'Buenos dias!',
      homePage: 'Página principal',
      loggedInAs: 'Iniciado sesión como',
      login: 'Iniciar sesión',
      loginFailed: 'Error de inicio de sesión',
      loginSucceeded: 'Inicio de sesión correcto',
      logoff: 'Cerrar Sesión',
      password: 'Contraseña',
      reservationView: 'Vista de Reservas',
      username: 'Nombre de usario'
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
