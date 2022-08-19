<template>
  <el-tabs
    type="border-card"
  >
    <el-tab-pane
      label="Create Account"
    >
      <el-button type="success" @click="aaa">aaa</el-button>
      <createUser
        @create-user ="createUser"
        :triggerClearInputs="triggerClearInputs"
      />
    </el-tab-pane>
    <el-tab-pane
      label="Edit Account"
    >
      <accountSelect
        v-if="allAccounts.length > 0"
        :allAccounts="allAccounts"
        @update-account-info="updateAccountInfo"
        @update-account-password="updateAccountPassword"
      >
      </accountSelect>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import api from './../api/api.js'
import _ from 'lodash'
import { userStore } from './../stores/user.js'
import accountSelect from './../components/accountSelect.vue'
import createUser from './../components/createUser.vue'
import { ElMessage } from 'element-plus'
import { handleRequestError } from './../assets/handleRequestError.js'

export default {
  name: 'UserAdmin',
  components: { createUser, accountSelect },
  data () {
    return {
      accountSelected: null,
      allAccounts: [],
      selectedAccount: null,
      triggerClearInputs: 0
    }
  },
  computed: {
    jwt () {
      return userStore().jwt
    }
  },
  methods: {
    aaa () {
      try {
        api.engine.aaa(this.jwt).then( (response) => {
          // do something
          console.log(response)
          ElMessage({
            message: 'Authenticated',
            type: 'success'
          })
        }).catch( (error) => {
          handleRequestError(error)
        })
      } catch ( err ) {
        ElMessage({
          message: 'There was an error on the server.',
          type: 'danger'
        })
      }
    },
    accountSelect ( accountObj ) {
      this.accountSelected = accountObj
    },
    createUser ( userObj ) {
      api.engine.createAccount( userObj, this.jwt ).then( (response) => {
        console.log('acctccc', response.data.accountCreated)
        if(response.data.accountCreated == true){
          ElMessage({
            message: 'Account Created',
            type: 'success',
            center: true
          })
          // clear the inputs on the component
          this.triggerClearInputs += 1
          //  reload all accounts
          api.engine.getAllAccounts ( this.jwt ).then( (response) => {
            if(response.data.all_accounts) {
              this.allAccounts = response.data.all_accounts
              ElMessage({
                message: 'Updated Accounts Loaded',
                type: 'success',
                center: true
              })
            } else {
              ElMessage({
                  message: 'Error loading updated accounts',
                  type: 'warning',
                  center: true
                })
            }
          })

        } else {
          ElMessage({
            message: 'Error Creating Account',
            type: 'warning',
            center: true
          })
          // don't trigger clerar inputs on component
          //   or reload all accounts
        }

      })
    },
    updateAccountInfo( obj ) {
      api.engine.updateAccountInfo( obj, this.jwt).then( (response) => {
        this.allAccounts = response.data.allAccounts
      })
    },
    updateAccountPassword( accountId, newPassword ) {
      console.log('newp', newPassword)
      api.engine.updateAccountPassword( accountId, newPassword, this.jwt ).then( (response) => {
        console.log(response)
      })
    }
  },
  mounted () {
    api.engine.getAllAccounts ( this.jwt ).then( (response) => {
      this.allAccounts = response.data.all_accounts
    })
  }
}
</script>