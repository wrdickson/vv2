<template>
  <div>
    <el-row>
      <el-col :span="12">
        <el-card>
          <template #header>
           <div class="card-header">{{ $t('message.login')}}</div>
          </template>
          <el-form id="login-form">
            <el-form-item :label="$t('message.username')">
              <el-input
                v-model="username1"
                type="text"
              />
           </el-form-item>
           <el-form-item :label="$t('message.password')">
              <el-input
                v-model="password1"
                type="password"
              />
           </el-form-item>
           <el-form-item>
              <el-button
                @click="loginCheck"
              >
                {{ $t('message.login') }}
              </el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import api from './../api/api.js'
import { userStore } from './../stores/user.js'

export default {
  name: 'Login',
  components: {
  },
  data: function () {
    return {
      loginResponse: '',
      username1: '',
      password1: ''
    }
  },
  computed: {
    accountId: function () { return userStore.account.id },
    jwt: function () { return userStore.state.jwt },
    username: function () { return userStore.account.username }
  },
  methods: {
    loginCheck () {
      api.account.login(this.username1, this.password1).then((response) => {
        console.log(response)
        //  clear the input variables
        this.loginResponse = ''
        this.username1 = ''
        this.password1 = ''
        //  how did login go?
        if (response.data.pass === true &&
          Number.isInteger(parseInt(response.data.account.id))) {
          //  show the user if the login succeeded
          this.loginResponse = 'Login Succeeded'
          //  load the user to vuex and localstorage
          userStore().setAccount(response.data.account)
          userStore().setJwt(response.data.jwt)
          ElMessage({
            message: this.$t('message.loginSucceeded'),
            type: 'success',
            center: true
          })
          //  navigate
          this.$router.push('/')
        } else {
          //  show user the login has failed
          this.loginResponse = 'Login Failed'
          //  load Guest dummy user to vuex and localstorage
          userStore().setAccountToGuest()
          userStore().setJwt('')
          ElMessage({
            message: this.$t('message.loginFailed'),
            type: 'warning',
            center: true
         })
        }
      })
    }
  }
}
</script>

<style>
  .info1{
    color: rgb(15, 119, 29);
  }
</style>
