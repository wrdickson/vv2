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
/* treeshake specific icons */
import {
  faBars,
  faCircleArrowRight,
  faChevronRight,
  faChevronDown,
  faCircleArrowDown
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
  faBars,
  faChevronRight,
  faChevronDown,
  faCircleArrowRight,
  faCircleArrowDown
)

//  i18n
const messages = {
  en: {
    message: {
      address: 'Address',
      and: 'and',
      arrival: 'Arrival',
      beds: 'Beds',
      childOf: 'Child of',
      city: 'City',
      close: 'Close',
      confirmDelete: 'Are you sure you want to delete this space?',
      country: 'Country',
      createCustomer: 'Create customer',
      createSpace: 'Create space',
      customer: 'Customer',
      datepickerPlaceholder: 'Choose a start date',
      delete: 'Delete',
      departure: 'Departure',
      displayOrder: 'Dispaly order',
      editSpace: 'Edit space',
      email: 'Email',
      endDate: 'End date',
      false: 'False', 
      firstName: 'First name',
      hello: 'Hello!',
      homePage: 'Home',
      lastName: 'Last name',
      loggedInAs: 'Logged in as',
      login: 'Login',
      loginFailed: 'Login failed',
      loginSucceeded: 'Login succeeded',
      logoff: 'Logoff',
      more: 'More',
      no: 'No',
      numberOfBeds: 'Number of beds',
      numberOfPeople: 'Number of people',
      password: 'Password',
      people: 'People',
      phone: 'Phone',
      postalCode: 'Postal code',
      region: 'Region',
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
      updateUsername: 'Update username',
      username: 'Username',
      yes: 'Yes'
    }
  },
  es: {
    message: {
      address: 'Dirección',
      and: 'y',
      arrival: 'Llegada',
      beds: 'Camas',
      childOf: 'Niño de',
      city: 'Ciudad',
      close: 'Cerrar',
      confirmDelete: '¿Está seguro de que desea eliminar este espacio?',
      country: 'Pais',
      createCustomer: 'Crear cliente',
      createSpace: 'Crear espacio',
      customer: 'Cliente',
      datepickerPlaceholder: 'Elige una fecha de inicio',
      delete: 'Borrar',
      departure: 'Salida',
      displayOrder: 'Orden de visualización',
      editSpace: 'Editar espacio',
      email: 'Email',
      endDate: 'Fecha final',
      false: 'Falso',
      firstName: 'Nombre',
      hello: 'Buenos dias!',
      homePage: 'Página principal',
      lastName: 'Apellido',
      loggedInAs: 'Iniciado sesión como',
      login: 'Iniciar sesión',
      loginFailed: 'Error de inicio de sesión',
      loginSucceeded: 'Inicio de sesión correcto',
      logoff: 'Cerrar Sesión',
      more: 'Más',
      no: 'No',
      numberOfBeds: 'Número de camas',
      numberOfPeople: 'Número de personas',
      password: 'Contraseña',
      people: 'Personas',
      phone: 'Teléfono',
      postalCode: 'Código postal',
      region: 'Región',
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
      updateUsername: 'Actualizar nombre de usario',
      username: 'Nombre',
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
