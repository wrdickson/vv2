<template>
  <el-row>
    <el-col :span="12">
      <el-form
        label-position="top"
        size="small"
      >
        <el-form-item :label=" i18nArrival + ' ' + i18nAnd + ' ' + i18nDeparture">
          <DateRangePicker
            @dateRangePicker:rangeSelected="dRangeSelected"
          />
        </el-form-item>
        <el-form-item size="small" :label="i18nSpaces">
          <allSpacePicker
            @allSpacePicker:spaceSelected="spaceSelected"
            :availableSpaceIds="availableSpaceIds"
          />
        </el-form-item>

      </el-form>
      <el-divider/>

      <allCustomerPicker
        @allCustomerPicker:customerSelected="customerSelected"
      />
      <resPeoplePicker
        @resPeoplePicker:peopleQtyChosen="peopleSelected"
      />
      <resBedsPicker
        @resBedsPicker:bedQtyChosen="bedsQtySelected"
      />
      <el-divider/>
      <el-button 
        @click="createReservation" 
        v-if="allFieldsCompleted"
        type="primary">
          Create Reservation
      </el-button>
    </el-col>
    <el-col :span="12">
      <searchCustomers/>
    </el-col>
  </el-row>
  <el-row>
    <el-col :span="12">
      <createCustomer/>
    </el-col>
  </el-row>
</template>

<script>
import { ElMessage } from 'element-plus'
import DateRangePicker from './../components/dateRangePicker.vue'
import allSpacePicker from './../components/allSpacePicker.vue'
import allCustomerPicker from './../components/allCustomerPicker.vue'
import createCustomer from './../components/createCustomer.vue'
import resPeoplePicker from './../components/resPeoplePicker.vue'
import resBedsPicker from './../components/resBedsPicker.vue'
import searchCustomers from './../components/searchCustomers.vue'
import api from './../api/api.js'
import { userStore } from './../stores/user.js'


import dayjs from 'dayjs'
export default {
  name: 'CRes',
  components: {
    DateRangePicker,
    allSpacePicker,
    allCustomerPicker,
    createCustomer,
    resPeoplePicker,
    resBedsPicker,

    searchCustomers
  },
  data () {
    return {
      availableSpaceIds: [],
      bedsQty: null,
      peopleQty: null,
      selectedCustomerId: null,
      startDate: null,
      endDate: null,
      selectedSpaceId: null
    }
  },
  computed: {
    allFieldsCompleted () {
      if(this.bedsQty && this.peopleQty && this.selectedCustomerId && this.startDate && this.endDate && this.selectedSpaceId){
        return true
      } else {
        return false
      }
    },
    fStartDate () {
      if(this.startDate) {
        return dayjs(this.startDate).format('YYYY-MM-DD')
      } else {
        return null
      }
    },
    fEndDate () {
      if(this.endDate) {
        return dayjs(this.endDate).format('YYYY-MM-DD')
      } else {
        return null
      }
    },
    i18nAnd () { return this.$i18n.t('message.and') },
    i18nArrival () { return this.$i18n.t('message.arrival') },
    i18nDeparture () { return this.$i18n.t('message.departure') },
    i18nSpaces () { return this.$i18n.t('message.spaceLabel') },
    jwt () {
      return userStore().jwt
    }
  },
  methods: {
    bedsQtySelected ( beds ) {
      this.bedsQty = beds
    },
    clearSelections () {
      this.availableSpaceIds = [],
      this.bedsQty = null,
      this.peopleQty = null,
      this.selectedCustomerId = null,
      this.startDate = null,
      this.endDate = null,
      this.selectedSpaceId = null
    },
    createReservation () {
      const newRes = {
        checkin: this.fStartDate,
        checkout: this.fEndDate,
        spaceId: this.selectedSpaceId,
        beds: this.bedsQty,
        people: this.peopleQty,
        customer: this.selectedCustomerId
      }
      api.engine.createReservation( newRes, this.jwt ).then( (response) => {
        console.log(response.data)
        if(response.data.checkAvailability == true && response.data.create.newId > 0){
          ElMessage({
            message: this.$t('message.reservationCreated'),
            type: 'success',
            center: true
          })
        } else {
          ElMessage({
            message: this.$t('message.reservationNotCreated'),
            type: 'success',
            center: true
          })
          //  clear the data

        }
        this.clearSelections()
      })
    },
    customerSelected ( customer ) {
      this.selectedCustomerId = customer
    },
    dRangeSelected ( range ) {
      this.startDate = range[0]
      this.endDate = range[1]
      api.engine.checkAvailabilityByDates(this.fStartDate, this.fEndDate).then( (response) => {
        console.log(response.data)
        this.availableSpaceIds = response.data.availability.availableSpaceIds
      })
    },
    peopleSelected ( peopleQty ) {
      this.peopleQty = peopleQty
    },
    spaceSelected ( spaceId ) {
      console.log(spaceId)
      this.selectedSpaceId = spaceId
    }
  }
}
</script>