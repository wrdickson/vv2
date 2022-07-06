import { defineStore } from 'pinia'

export const userStore = defineStore({
  id: 'user',
  state: () => ({
    account: {
      id: '0',
      username: 'Guest',
      permission: '0',
      roles: []
    },
    jwt: null
  }),
  actions: {
    setAccount ( account ) {
      this.account = account
      localStorage.setItem('account', JSON.stringify(account))
    },
    setAccountToGuest () {
      this.account = {
        id: '0',
        username: 'Guest',
        permission: '0',
        roles: []
      }
      localStorage.setItem('account', JSON.stringify(this.account))
    },
    setJwt ( jwt ) {
      this.jwt = jwt
      localStorage.setItem('jwt', jwt)
    }
  }
})