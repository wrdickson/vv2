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
      beds: 'Beds',
      childOf: 'Child of',
      close: 'Close',
      confirmDelete: 'Are you sure you want to delete this space?',
      createSpace: 'Create space',
      customer: 'Customer',
      datepickerPlaceholder: 'Choose a start date',
      delete: 'Delete',
      departure: 'Departure',
      displayOrder: 'Dispaly order',
      editSpace: 'Edit space',
      endDate: 'End date',
      false: 'False', 
      hello: 'Hello!',
      homePage: 'Home',
      loggedInAs: 'Logged in as',
      login: 'Login',
      loginFailed: 'Login failed',
      loginSucceeded: 'Login succeeded',
      logoff: 'Logoff',
      no: 'No',
      numberOfBeds: 'Number of beds',
      numberOfPeople: 'Number of people',
      password: 'Password',
      people: 'People',
      reservationCreated: 'Reservation created',
      reservationView: 'Reservation View',
      select: 'Select',
      showChildren: 'Show children',
      spaceLabel: 'Space',
      startDate: 'Start date',
      title: 'Title',
      to: 'to',
      true: 'True',
      type: 'Type',
      update: 'Update',
      username: 'Username',
      yes: 'Yes'
    }
  },
  es: {
    message: {
      and: 'y',
      arrival: 'Llegada',
      beds: 'Camas',
      childOf: 'Niño de',
      close: 'Cerrar',
      confirmDelete: '¿Está seguro de que desea eliminar este espacio?',
      createSpace: 'Crear espacio',
      customer: 'Cliente',
      datepickerPlaceholder: 'Elige una fecha de inicio',
      delete: 'Borrar',
      departure: 'Salida',
      displayOrder: 'Orden de visualización',
      editSpace: 'Editar espacio',
      endDate: 'Fecha final',
      false: 'Falso',
      hello: 'Buenos dias!',
      homePage: 'Página principal',
      loggedInAs: 'Iniciado sesión como',
      login: 'Iniciar sesión',
      loginFailed: 'Error de inicio de sesión',
      loginSucceeded: 'Inicio de sesión correcto',
      logoff: 'Cerrar Sesión',
      no: 'No',
      numberOfBeds: 'Número de camas',
      numberOfPeople: 'Número de personas',
      password: 'Contraseña',
      people: 'Personas',
      reservationCreated: 'Reserva CREATED',
      reservationView: 'Vista de Reservas',
      select: 'Seleccionar',
      showChildren: 'Mostrar niños',
      spaceLabel: 'Espacio',
      startDate: 'Fecha de inicio',
      title: 'Título',
      to: 'a',
      true: 'Verdadero',
      type: 'Tipo',
      update: 'Actualizar',
      username: 'Nombre de usario',
      yes: 'Si'
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
