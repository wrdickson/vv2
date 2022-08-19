import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '/src/components/Home.vue'
import resView3 from '/src/views/resView3.vue'
import Login from '/src/views/Login.vue'
import Logoff from '/src/views/Logoff.vue'
import SpaceEdit from '/src/views/SpaceEdit.vue'
import CRes from '/src/views/CRes.vue'
import UserAdmin from '/src/views/UserAdmin.vue'
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
      path: '/resView3',
      name: 'ResView3',
      component: resView3
    },
    {
      path: '/SpaceEdit',
      name: 'SpaceEdit',
      component: SpaceEdit
    },
    {
      path: '/UserAdmin',
      name: 'UserAdmin',
      component: UserAdmin
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router