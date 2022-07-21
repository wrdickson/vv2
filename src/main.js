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
import { faBars, faCircleArrowRight, faChevronRight, faChevronDown, faCircleArrowDown } from '@fortawesome/free-solid-svg-icons'



/* add icons to the library */
library.add(faBars, faChevronRight, faChevronDown, faCircleArrowRight, faCircleArrowDown)

//  i18n
const messages = {
  en: {
    message: {
      and: 'and',
      arrival: 'Arrival',
      customer: 'Customer',
      datepickerPlaceholder: 'Choose a start date',
      departure: 'Departure',
      endDate: 'End date',
      hello: 'Hello!',
      homePage: 'Home',
      loggedInAs: 'Logged in as',
      login: 'Login',
      loginFailed: 'Login failed',
      loginSucceeded: 'Login succeeded',
      logoff: 'Logoff',
      numberOfBeds: 'Number of beds',
      numberOfPeople: 'Number of people',
      password: 'Password',
      reservationCreated: 'Reservation created',
      reservationView: 'Reservation View',
      select: 'Select',
      spaceLabel: 'Space',
      startDate: 'Start date',
      to: 'to',
      username: 'Username'
    }
  },
  es: {
    message: {
      and: 'y',
      arrival: 'Llegada',
      customer: 'Cliente',
      datepickerPlaceholder: 'Elige una fecha de inicio',
      departure: 'Salida',
      endDate: 'Fecha final',
      hello: 'Buenos dias!',
      homePage: 'Página principal',
      loggedInAs: 'Iniciado sesión como',
      login: 'Iniciar sesión',
      loginFailed: 'Error de inicio de sesión',
      loginSucceeded: 'Inicio de sesión correcto',
      logoff: 'Cerrar Sesión',
      numberOfBeds: 'Número de camas',
      numberOfPeople: 'Número de personas',
      password: 'Contraseña',
      reservationCreated: 'Reserva CREATED',
      reservationView: 'Vista de Reservas',
      select: 'Seleccionar',
      spaceLabel: 'Espacio',
      startDate: 'Fecha de inicio',
      to: 'a',
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
