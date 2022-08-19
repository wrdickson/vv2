<template>
  <el-row>
    <el-col span="12">
      <el-table
        v-if="allAccounts.length > 0"
        :data="tableData"
        width="100%"
        size="small"
        @row-click="rowClick"
      >
        <el-table-column prop="username" :label="i18Username"></el-table-column>
        <el-table-column prop="permission" label="permission"></el-table-column>
        <el-table-column prop="email" label="email"></el-table-column>
        <el-table-column prop="is_active" label="is_active"></el-table-column>
      </el-table>
    </el-col>
    <el-col span="12">
      <el-form
        v-if="accountSelected"
        label-width="120px"
      >
        <el-form-item>
          <el-button @click="clearSelection" type="default">clear selection</el-button>
        </el-form-item>
        <el-form-item label="username">
          <el-input type="text" v-model="accountSelected.username"/>
        </el-form-item>
        <el-form-item label="email">
          <el-input type="text" v-model="accountSelected.email"/>
        </el-form-item>
        <el-form-item label="permission" >
          <el-select v-model="accountSelected.permission">
            <template v-for="permission in permissions">
              <el-option :label="permission" :value="permission">
              </el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="active">
          <el-switch 
            v-model="accountSelected.is_active" label="is_active"
            active-value=1
            inactive-value=0
            />
        </el-form-item>
        <el-form-item>
          <el-button v-if="showCreateButton" type="primary" @click="updateAccount">Update Account</el-button>
        </el-form-item>
        <el-form-item>
          <el-button @click="updateAccountInfo" type="primary">update account</el-button>
        </el-form-item>
        <el-form-item label="change password">
          <el-checkbox v-model="showUpdatePassword" />
        </el-form-item>
      </el-form>
      <el-divider/>
      <el-form
        v-if="showUpdatePassword"
        label-width="120px"
        size="small"
        >
        <el-form-item label="pasword1">
          <el-input type="password" v-model="newPassword1"/>
        </el-form-item>
        <el-form-item label="password2">
          <el-input type="password" v-model="newPassword2"/>
        </el-form-item>
        <el-form-item>
          <el-button v-if="passwordsValid" @click="updateAccountPassword" type="primary">update password</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>

</template>

<script>
import { userStore } from './../stores/user.js'
import _ from 'lodash'
export default {
  name: 'accountSelect',
  props: [ 'allAccounts' ],
  emits: [ 'update-account-info', 'update-account-password' ],
  data () {
    return {
      accountSelected: null,
      jwt: userStore().jwt,
      newPassword1: null,
      newPassword2: null,
      permissions: [1,2,3,4,5,6,7,8,9,10],
      showUpdatePassword: false
    }
  },
  computed: {
    accountSelectedCopy () {
    },
    i18Username () {
      return this.$i18n.t('message.username')
    },
    passwordsValid () {
      if(this.newPassword1 && this.newPassword2) {
        if(this.newPassword1 == this.newPassword2) {
          if(this.newPassword1.length > 5) {
            return true
          } else {return false }
        } else {return false }
      } else { return false }
    },
    tableData () {
      let iArr = []
      _.forEach(this.allAccounts, (account) => {
        iArr.push(account)
      })
      return iArr
    }
  },
  methods: {
    clearSelection () {
      this.accountSelected = null
      this.showUpdatePassword = false
    },
    rowClick ( accountObj ) {
      this.accountSelected = _.cloneDeep(accountObj)
      this.accountSelected.is_active = this.accountSelected.is_active.toString()
      this.showUpdatePassword = false
    },
    updateAccountInfo () {
      this.$emit('update-account-info', this.accountSelected )
    },
    updateAccountPassword () {
      this.$emit('update-account-password', this.accountSelected.id, this.newPassword1)
    }
  }
}
</script>