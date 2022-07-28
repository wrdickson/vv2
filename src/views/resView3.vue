<template>
    <div>{{resViewStartDate}}</div>
    <singleDatePicker
      @singleDatePicker:dateSelected="singleDateSelected">
    </singleDatePicker>
    <ResViewTable
      
      @resBlockClick="reservationSelected"
      @resview-toggle-show-children="toggleShowChildren"
      @emptyCellClick="emptyCellClick"
      :tDateArray="tDateArray"
      :tableData="resTableData"
      :trigger="trigger"
      :resSpaceCopy="spaceRecords"
    />
</template>

<script>
import singleDatePicker from './../components/singleDatePicker.vue'
import ResViewTable from './../components/resViewTable.vue'
import { reservationStore } from './../stores/reservation.js'
import api from './../api/api.js'
import { userStore } from './../stores/user.js'
import dayjs from 'dayjs'
import isSameOrBefore from 'dayjs'
import isSameOrAfter from 'dayjs'

import _ from 'lodash'
export default {
  name: 'resView3',
  components: {
    singleDatePicker,
    ResViewTable
  },
  data () {
    return {
      reservations: null,
      trigger: 1,
      spaceRecords: _.cloneDeep(reservationStore().getRootSpaces)
    }
  },
  computed: {
    jwt () {
      return userStore().jwt
    },
    resSC () {
      return reservationStore.getRootSpaces
    },
    resViewEndDate () {
      return dayjs(this.resViewStartDate).add(31, 'days').format('YYYY-MM-DD')
    },
    resViewStartDate () {
      return reservationStore().resViewStart
    },
    resTableData () {

      let presentedResStart
      let iSpan
      let ciInRange
      let coInRange

      this.spaceRecords =  _.cloneDeep(reservationStore().getRootSpaces)
      //  iterate through the reservations and add data to the appropriate array item
      _.each(this.reservations, (iReservation) => {
        console.log('c: ',iReservation.checkout, this.resViewStartDate)
        //  ignore reservations where checkout == resViewStartDate
        if( iReservation.checkout == this.resViewStartDate ){
          //do nothing
        } else {
          let iRecord = _.find(this.spaceRecords, (o) => {
            //get the reservation
            return o.id == iReservation.space_id
          })
          if(iRecord){ 
            //first, establish the presented checkin

            //  check in is befor start date, checkout is after start date
            if ( dayjs(iReservation.checkin).isBefore(dayjs(this.resViewStartDate)) ){
                ciInRange = false
                presentedResStart = dayjs(this.resViewStartDate).format('YYYYMMDD')
                iSpan = iSpan = dayjs(iReservation.checkout).diff(dayjs(this.resViewStartDate), 'd')
              } else {
                ciInRange = true
                presentedResStart = dayjs(iReservation.checkin).format('YYYYMMDD')
                iSpan = dayjs(iReservation.checkout).diff(dayjs(iReservation.checkin), 'd')
              }
            if( dayjs(iReservation.checkout).isAfter(dayjs(this.resViewEndDate)) ){
              coInRange = false
            } else {
              coInRange = true
            }

            //  is block indicator
            let iKey = 'D' + presentedResStart + 'blocked'
            iRecord[iKey] = false
            //  isStartTruncated flag
            iKey = 'D' + presentedResStart + 'starttruncated'
            iRecord[iKey] = !ciInRange
            //  isEndTruncated flat
            iKey = 'D' + presentedResStart + 'endtruncated'
            iRecord[iKey] = !coInRange
            //  resid
            iKey = 'D' + presentedResStart + 'resid'
            iRecord[iKey] = iReservation.id
            //  start
            iKey = 'D' + presentedResStart + 'start'
            iRecord[iKey] = iReservation.checkin
            //  end
            iKey = 'D' + presentedResStart + 'end'
            iRecord[iKey] = iReservation.checkout
            //  customer
            iKey = 'D' +  presentedResStart + 'customer'
            iRecord[iKey] = iReservation.customer_obj.lastName
            //  span
            iKey = 'D' +  presentedResStart + 'span'
            iRecord[iKey] = iSpan
          }

          //  now create 'empty block' records for children of reservations
          if(iRecord.children.length > 0){
            _.forEach(iRecord.children, (childId) => {
              let qRecord = _.find(this.spaceRecords, (o) => {
                return o.id == childId
              })
              if(qRecord) {
                //  is block indicator
                let iKey = 'D' + presentedResStart + 'blocked'
                qRecord[iKey] = true
                //  span
                iKey = 'D' +  presentedResStart + 'span'
                qRecord[iKey] = iSpan
                }
            })
          }

          //  now create 'empty block' records for parents of reservations
          if(iRecord.parents.length > 0){
            _.forEach(iRecord.parents, (parentId) => {
              let qRecord = _.find(this.spaceRecords, (o) => {
                return o.id == parentId
              })
              if(qRecord) {
                //  is block indicator
                let iKey = 'D' + presentedResStart + 'blocked'
                qRecord[iKey] = true
                //  span
                iKey = 'D' +  presentedResStart + 'span'
                qRecord[iKey] = iSpan
                }
            })
          }


        }
      })
      return this.spaceRecords
    },
    tDateArray () {
      //  this constructs the column elements for the table
      //  we want 31 columns, starting from start date
      const dArr = []
      for( let i = 0; i < 32; i++ ) {
        let iObj = {
          //  formatted without dashes
          dayString: 'D' +  dayjs(this.resViewStartDate).add(i, 'day').format('YYYYMMDD'),
          //  formatted with dashes
          dayLabel: dayjs(this.resViewStartDate).add(i, 'day').format('YYYY-MM-DD')
        }
        dArr.push(iObj)
      }
      return dArr
    }
  },
  methods: {
    emptyCellClick ( obj ) {
      console.log('empty cell selected', obj)
    },
    reservationSelected ( resId ) {
      console.log('resId selected: ', resId)
    },
    rowClassName ( obj) {
    },
    singleDateSelected ( nDate ) {
      //  format it
      let fDateSelected = dayjs(nDate).format('YYYY-MM-DD')
      //  send it to the store
      reservationStore().resViewStart = fDateSelected
      //  get reservations from db
      api.engine.getReservationsByRange( this.resViewStartDate, this.resViewEndDate, this.jwt)
        .then( (response) => {
          this.reservations = response.data.reservations

        })

    },
    toggleShowChildren( spaceId ) {

      console.log('toggle @resview', spaceId)
      let k = _.find(this.spaceRecords, (o) => {
        return o.id == spaceId
      })

      let hideChildren = (k) => {
        k.showChildren = false
        if(k.children) {
            _.each(k.children,( childId ) => {
              let m = _.find(this.spaceRecords, (o) => {
                return o.id == childId
              })
              if(m) {
                hideChildren(m)
              }
            })
        }
      }
      let showChildren = (k) => {
        k.showChildren = true
        if(k.children) {
            _.each(k.children,( childId ) => {
              let m = _.find(this.spaceRecords, (o) => {
                return o.id == childId
              })
              if(m) {
                showChildren(m)
              }
            })
        }
      }
      let toggleChildren = (k) => {
        console.log(k.showChildren)
        console.log(k.children)
        if(k.showChildren == true){
          k.showChildren = false
          if(k.children) {
            _.each(k.children,( childId ) => {
              let m = _.find(this.spaceRecords, (o) => {
                return o.id == childId
              })
              if(m) {
                hideChildren(m)
              }
            })
          }
        } else {
          k.showChildren = true
        }
      }
      toggleChildren(k)
    }
  },
  created () {
    dayjs.extend(isSameOrBefore)
    dayjs.extend(isSameOrAfter)
  },
  mounted () {
      console.log('mounted', this.resViewStartDate, this.resViewEndDate)
      //  send it to the store
      reservationStore().resViewStart = dayjs().format('YYYY-MM-DD')
      api.engine.getReservationsByRange( this.resViewStartDate, this.resViewEndDate, this.jwt)
        .then( (response) => {
          this.reservations = response.data.reservations
        })
  }
}
</script>

<style>
  .row-hidden {
    display: none !important;
  }
</style>