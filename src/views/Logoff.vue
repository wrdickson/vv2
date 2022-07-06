<template>
  <h1>{{ $t('message.logoff')}}</h1>
  <p>{{ $t('message.loggedInAs') }} {{ user }}</p>
  <el-button @click="logoff">{{ $t('message.logoff')}}</el-button>
</template>

<script>
import { userStore } from './../stores/user.js'
export default {
  name: 'Logoff',
  computed: {
    user () {
      return userStore().account.username
    }
  },
  methods: {
    logoff () {
      userStore().setAccountToGuest()
      this.$router.push('/Login')
    }
  }
}
</script>