<template>
  <el-form
    :model="form"
    label-width="120px"
    >
    <el-form-item label="username">
      <el-input type="text" v-model="form.username"/>
    </el-form-item>
    <el-form-item label="email">
      <el-input type="text" v-model="form.email"/>
    </el-form-item>
    <el-form-item label="permission" >
      <el-select v-model="form.permission">
        <template v-for="permission in permissions">
          <el-option :label="permission" :value="permission">
          </el-option>
        </template>
      </el-select>
    </el-form-item>
    <el-form-item label="pasword1">
      <el-input type="password" v-model="form.pwd1"/>
    </el-form-item>
    <el-form-item label="password2">
      <el-input type="password" v-model="form.pwd2"/>
    </el-form-item>
    <el-form-item>
      <el-button v-if="showCreateButton" type="primary" @click="createUser">Create User</el-button>
      <el-button @click="clearInputs">clear inputs</el-button>
</el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'createUser',
  emits: [ 'create-user' ],
  props: [ 'triggerClearInputs' ],
  data () {
    return {
      form: {
        username: '',
        email: '',
        permission: null,
        pwd1: '',
        pwd2: ''
      },
      permissions: [1,2,3,4,5,6,7,8,9,10]
    }
  },
  computed: {
    locale () {
      return this.$i18n
    },
    inputValid () {
      if(this.form.email.length > 4 && this.form.username.length > 4 && this.form.permission) {
        return true
      } else { return false }
    },
    passwordsMatchAndValid () {
      // TODO make this more rigorous
      if( this.form.pwd1 == this.form.pwd2 && this.form.pwd1.length > 4) {
        return true
      } else { return false }
    },
    showCreateButton () {
      if( this.inputValid &&  this.passwordsMatchAndValid ) {
        return true
      } else { return false }
    }
  },
  methods: {
    clearInputs () {
      this.form.username = ''
      this.form.email = ''
      this.form.pwd1 = ''
      this.form.pwd2 = ''
      this.form.permission = null
    },
    createUser () {
      this.$emit( 'create-user', this.form)
    }
  },
  watch: {
    triggerClearInputs( newVal, oldVal ){
      this.clearInputs()
    }
  }
}
</script>