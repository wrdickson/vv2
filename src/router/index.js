import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/components/Home.vue'
import T1 from '/src/components/T1.vue'
import singleDatePicker from '/src/components/singleDatePicker.vue'
import resView1 from '/src/views/resView1.vue'
import resView2 from '/src/views/resView2.vue'
import Login from '/src/views/Login.vue'
import Logoff from '/src/views/Logoff.vue'
import ResTest from '/src/views/ResTest.vue'
import SpaceEdit from '/src/views/SpaceEdit.vue'
import CRes from '/src/views/CRes.vue'
const routes = [
    {
      path: '/',
      name: 'Homea',
      component: Home,
    },
    {
      path: '/CRes',
      name: 'CRes',
      component: CRes
    },
    {
      path: '/ResTest',
      name: 'ResTest',
      component: ResTest
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
      path: '/Logoff',
      name: 'Logoff',
      component: Logoff
    },
    {
      path: '/ResView1',
      name: 'ResView1',
      component: resView1
    },
    {
      path: '/resView2',
      name: 'ResView2',
      component: resView2
    },
    {
      path: '/SpaceEdit',
      name: 'SpaceEdit',
      component: SpaceEdit
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