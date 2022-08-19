<template>
  <el-form
    label-width="120px"
    size="small"
  >
    <el-form-item label="First Name">
      <el-input v-model="form.firstName">
      </el-input>
    </el-form-item>
    <el-form-item label="Last Name">
      <el-input v-model="form.lastName">
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="searchC">Search</el-button>
      <el-button type="primary" @click="clearInputs">Clear inputs</el-button>
    </el-form-item>
  </el-form>
  <el-divider/>
  <el-table
    :data="customers"
    :default-sort="{ prop: 'lastName', order: 'descending' }"
    style="width: 100%"
    height="200px"
    @row-click="selectCustomer"
    >
    <el-table-column
      fixed
      sortable
      prop="lastName"
      label="Last Name"
      width="120"
    ></el-table-column>
    <el-table-column
      fixed
      sortable
      prop="firstName"
      label="First Name"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="email"
      label="Email"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="address1"
      label="Address 1"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="address2"
      label="Address 2"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="city"
      label="City"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="region"
      label="Region"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="country"
      label="Country"
      width="120"
    >
    </el-table-column>
    <el-table-column
      prop="postalCode"
      label="PostalCode"
      width="120"
    >
    </el-table-column>
  </el-table>
</template>

<script>
import api from './../api/api.js'
import { userStore } from './../stores/user.js'
import { handleRequestError } from './../assets/handleRequestError.js'
import { ElNotification } from 'element-plus'
export default {
  name: 'searchCustomers',
  emits: [ 'customer-selected' ],
  data () {
    return {
      customers: [],
      form: {
        firstName: '',
        lastName: ''
      },
      jwt: userStore().jwt


    }
  },
  methods: {
    clearInputs () {
      this.form.firstName = ''
      this.form.lastName = ''
      this.customers = []
    },
    searchC () {
      try {
        api.engine.searchCustomers(this.form.lastName, this.form.firstName, this.jwt).then( (response) => {
        console.log(response.data)
        this.customers = response.data.customer_search
        }).catch( (error) => {
          handleRequestError(error)
        })
      }
      catch ( error ) {
        //  handle server error here
        ElNotification({
          message: 'Error requesting data from server',
          type: 'warning'
        })
      }
    },
    selectCustomer (e) {
      this.$emit('customer-selected', e)
    }
  }
}
</script>