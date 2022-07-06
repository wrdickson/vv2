<script>
import { userStore } from './stores/user.js'
import api from './api/api.js'
import MainMenu from './components/mainMenu.vue'
import userMenu from './components/userMenu.vue'
import localeSwitch from './components/localeSwitch.vue'
export default {
  components: {
    MainMenu, userMenu, localeSwitch
  },
  data () {
    return {
      drawerVisible: false,
    }
  },
  computed: {
    account: () => {
      return userStore().account
    }
  },
  methods: {
    hideDrawer () {
      this.drawerVisible = false
    },
    showDrawer () {
      this.drawerVisible = true
    }
  },
  created() {
    // user (account) auth
    //  check for a user in localstorage
    const account = JSON.parse(localStorage.getItem('account'))
    const jwt = localStorage.getItem('jwt')
    if (account && jwt) {
      //  test the token . . .
      api.account.testToken(jwt).then( (response) => {
        if(response.data.decoded.account.id > 0 && response.data.token_error == null) {
          //  load the user to vuex and localstorage
          userStore().setAccount(account)
          userStore().setJwt(jwt)
        } else {
          userStore().setAccountToGuest()
          userStore().setJwt('')
          //  navigate to login . . .

        }
      })
    } else {
      userStore().setAccountToGuest()
      userStore().setJwt('')
      //  navigate to login . . .

    }
  }
}
</script>

<template>
  <el-drawer
    v-model="drawerVisible"
    size="200px"
    direction="ltr"
    :with-header="false"
    :show-close="false"
    >
      <MainMenu @mainMenu:select="hideDrawer"/>
  </el-drawer>
  <el-container>
    <el-aside width="200px" class="hidden-sm-and-down navAside">
      <MainMenu/>
    </el-aside>
    <el-container>
      <el-header class="navHeader">
          <el-menu
            mode="horizontal"
            :ellipsis="false"
          >
            <span class="hidden-md-and-up"><el-menu-item @click="showDrawer"><font-awesome-icon icon="fa-solid fa-bars" size="2x" /></el-menu-item></span>
            <el-menu-item class="navbarBrand" index="1">Trekbill.com</el-menu-item>
            <div class="flex-grow"/>
            <userMenu :account="account"/>
            <localeSwitch/>
          </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style>
  body{
    font-family: Tahoma, Verdana, sans-serif;
  }
  .navAside {
    background-color: rgb(197, 106, 106);
  }
  .navHeader {
    padding: 0px;
  }
  .flex-grow {
    flex-grow: 1;
  }
  .el-drawer__header{
    display: none !important;
  }
  .navbarBrand {
    font-size: 20px;
  }
</style>
