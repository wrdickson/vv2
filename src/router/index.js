import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/components/Home.vue'
import T1 from '/src/components/T1.vue'
import singleDatePicker from '/src/components/singleDatePicker.vue'
import resView1 from '/src/views/resView1.vue'
import Login from '/src/views/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Homea',
        component: Home,
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/ResView1',
      name: 'ResView1',
      component: resView1
    },
    {
      path: '/T1',
      name: 'T1',
      component: T1
    },
    {
      path: '/singleDatePicker',
      name: 'singleDatePicker',
      component: singleDatePicker
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router