<template>
  <div>
    <div>{{ $t('message.customer') }}</div>
    <el-config-provider :locale="locale">
      <el-select 
        v-model="selectedCustomerId"
        :placeholder="placeholder"
      >
        <template v-for="customer in customers">
          <el-option :value="customer.id" :label="customer.lastName + ', ' + customer.firstName"></el-option>
        </template>
      </el-select>
    </el-config-provider>
  </div>
</template>

<script>
import api from './../api/api.js'
import { userStore } from './../stores/user.js'
export default {
  name: 'allCustomerPicker',
  emits: [ 'allCustomerPicker:customerSelected' ],
  data () {
    return {
      customers: [],
      selectedCustomerId: null
    }
  },
  computed: {
    jwt () {
      return userStore().jwt
    },
    locale () {
      return this.$i18n
    },
    placeholder () {
      return this.$t('message.select')
    }
  },
  mounted () {
    api.engine.getAllCustomers( this.jwt ).then( (response) => {
      console.log('cs', response.data.customers)
      this.customers = response.data.customers
    })
  },
  watch: {
    jwt( oldVal, newVal ) {
      api.engine.getAllCustomers( this.jwt ).then( (response) => {
        console.log('cs', response.data.customers)
        this.customers = response.data.customers
      })
    },
    selectedCustomerId( oldVal, newVal ) {
      this.$emit( 'allCustomerPicker:customerSelected', this.selectedCustomerId )
    }
  }
}

</script>