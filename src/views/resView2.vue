<template>
    <singleDatePicker @singleDatePicker:dateSelected="singleDateSelected"></singleDatePicker>
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
import _ from 'lodash'
export default {
  name: 'resView2',
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
      //  iterate through the reservations and add data to the appropriate array item
      _.each(this.reservations, (iReservation) => {
        let iRecord = _.find(this.spaceRecords, (o) => {
          return o.id == iReservation.space_id
        })

        /*
        *  TODO
        *  Handle a couple more cases:
        *  1- check out is AFTER the end of the view
        *  2- check in is BEFORE resview start AND check out is AFTER resView end
        *  3- more edge cases???
        */

        //  first, check if start date is before resViewStart, and change 
        //  start date(this is just for the table, not changing the res)
        //  or it won't show
        if( dayjs(iReservation.checkin).isBefore(dayjs(this.resViewStartDate)) && dayjs(iReservation.checkout).isSameOrAfter(dayjs(this.resViewStartDate)) ) {
          //  is block indicator
          let iKey = 'D' + dayjs(this.resViewStartDate).format('YYYYMMDD') + 'blocked'
          iRecord[iKey] = false
          //  isStartTruncated flag
          iKey = 'D' + dayjs(this.resViewStartDate).format('YYYYMMDD') + 'starttruncated'
          iRecord[iKey] = true
          //  resid
          iKey = 'D' + dayjs(this.resViewStartDate).format('YYYYMMDD') + 'resid'
          iRecord[iKey] = iReservation.id
          //  start
          iKey = 'D' + dayjs(this.resViewStartDate).format('YYYYMMDD') + 'start'
          iRecord[iKey] = iReservation.checkin
          //  end
          iKey = 'D' + dayjs(this.resViewStartDate).format('YYYYMMDD') + 'end'
          iRecord[iKey] = iReservation.checkout
          //  customer
          iKey = 'D' +  dayjs(this.resViewStartDate).format('YYYYMMDD') + 'customer'
          iRecord[iKey] = iReservation.customer_obj.lastName
          //  span
          iKey = 'D' +  dayjs(this.resViewStartDate).format('YYYYMMDD') + 'span'
          //  span is the difference between resStart and checkout
          let iSpan = dayjs(iReservation.checkout).diff(dayjs(this.resViewStartDate), 'd')
          iRecord[iKey] = iSpan
        } else {
          //  is block indicator
          let iKey = 'D' + dayjs(iReservation.checkin).format('YYYYMMDD') + 'blocked'
          iRecord[iKey] = false
          //  isStartTruncated flag
          iKey = 'D' + dayjs(iReservation.checkin).format('YYYYMMDD') + 'starttruncated'
          iRecord[iKey] = false
          //  resid
          iKey = 'D' + dayjs(iReservation.checkin).format('YYYYMMDD') + 'resid'
          iRecord[iKey] = iReservation.id
          //  start
          iKey = 'D' + dayjs(iReservation.checkin).format('YYYYMMDD') + 'start'
          iRecord[iKey] = iReservation.checkin
          //  end
          iKey = 'D' + dayjs(iReservation.checkin).format('YYYYMMDD') + 'end'
          iRecord[iKey] = iReservation.checkout
          //  customer
          iKey = 'D' +  dayjs(iReservation.checkin).format('YYYYMMDD') + 'customer'
          iRecord[iKey] = iReservation.customer_obj.lastName
          //  span
          iKey = 'D' +  dayjs(iReservation.checkin).format('YYYYMMDD') + 'span'
          //  calculate span
          let iSpan = dayjs(iReservation.checkout).diff(dayjs(iReservation.checkin), 'd')
          iRecord[iKey] = iSpan
        }
        //now, create 'empty block' records for parents of reservations
        if(iRecord.parents.length > 0){
          _.forEach(iRecord.parents, (parentId) => {
            let qRecord = _.find(this.spaceRecords, (o) => {
              return o.id == parentId
            })
            if( dayjs(iReservation.checkin).isBefore(dayjs(this.resViewStartDate)) &&  dayjs(iReservation.checkout).isSameOrAfter(dayjs(this.resViewStartDate)) ) {
              //  is block indicator
              let iKey = 'D' + dayjs(this.resViewStartDate).format('YYYYMMDD') + 'blocked'
              qRecord[iKey] = true
              //  isStartTruncated flag
              iKey = 'D' + dayjs(this.resViewStartDate).format('YYYYMMDD') + 'starttruncated'
              qRecord[iKey] = true
              //  start
              iKey = 'D' + dayjs(this.resViewStartDate).format('YYYYMMDD') + 'start'
              qRecord[iKey] = iReservation.checkin
              //  end
              iKey = 'D' + dayjs(this.resViewStartDate).format('YYYYMMDD') + 'end'
              qRecord[iKey] = iReservation.checkout
              //  span
              iKey = 'D' +  dayjs(this.resViewStartDate).format('YYYYMMDD') + 'span'
              //  span is the difference between resStart and checkout
              let iSpan = dayjs(iReservation.checkout).diff(dayjs(this.resViewStartDate), 'd')
              qRecord[iKey] = iSpan
            } else {
              //  is block indicator
              let iKey = 'D' + dayjs(iReservation.checkin).format('YYYYMMDD') + 'blocked'
              qRecord[iKey] = true
              //  isStartTruncated flag
              iKey = 'D' + dayjs(iReservation.checkin).format('YYYYMMDD') + 'starttruncated'
              qRecord[iKey] = false
              //  start
              iKey = 'D' + dayjs(iReservation.checkin).format('YYYYMMDD') + 'start'
              qRecord[iKey] = iReservation.checkin
              //  end
              iKey = 'D' + dayjs(iReservation.checkin).format('YYYYMMDD') + 'end'
              qRecord[iKey] = iReservation.checkout
              //  span
              iKey = 'D' +  dayjs(iReservation.checkin).format('YYYYMMDD') + 'span'
              //  calculate span
              let iSpan = dayjs(iReservation.checkout).diff(dayjs(iReservation.checkin), 'd')
              qRecord[iKey] = iSpan
            }
          })
        }
        //  now create 'empty block' records for children of reservatoins
        if(iRecord.children.length > 0){
          _.forEach(iRecord.children, (childId) => {
            let qRecord = _.find(this.spaceRecords, (o) => {
              return o.id == childId
            })
            if( dayjs(iReservation.checkin).isBefore(dayjs(this.resViewStartDate)) &&  dayjs(iReservation.checkout).isSameOrAfter(dayjs(this.resViewStartDate)) ) {
              //  is block indicator
              let iKey = 'D' + dayjs(this.resViewStartDate).format('YYYYMMDD') + 'blocked'
              qRecord[iKey] = true
              //  isStartTruncated flag
              iKey = 'D' + dayjs(this.resViewStartDate).format('YYYYMMDD') + 'starttruncated'
              qRecord[iKey] = true
              //  start
              iKey = 'D' + dayjs(this.resViewStartDate).format('YYYYMMDD') + 'start'
              qRecord[iKey] = iReservation.checkin
              //  end
              iKey = 'D' + dayjs(this.resViewStartDate).format('YYYYMMDD') + 'end'
              qRecord[iKey] = iReservation.checkout
              //  span
              iKey = 'D' +  dayjs(this.resViewStartDate).format('YYYYMMDD') + 'span'
              //  span is the difference between resStart and checkout
              let iSpan = dayjs(iReservation.checkout).diff(dayjs(this.resViewStartDate), 'd')
              qRecord[iKey] = iSpan
            } else {
              //  is block indicator
              let iKey = 'D' + dayjs(iReservation.checkin).format('YYYYMMDD') + 'blocked'
              qRecord[iKey] = true
              //  isStartTruncated flag
              iKey = 'D' + dayjs(iReservation.checkin).format('YYYYMMDD') + 'starttruncated'
              qRecord[iKey] = false
              //  start
              iKey = 'D' + dayjs(iReservation.checkin).format('YYYYMMDD') + 'start'
              qRecord[iKey] = iReservation.checkin
              //  end
              iKey = 'D' + dayjs(iReservation.checkin).format('YYYYMMDD') + 'end'
              qRecord[iKey] = iReservation.checkout
              //  span
              iKey = 'D' +  dayjs(iReservation.checkin).format('YYYYMMDD') + 'span'
              //  calculate span
              let iSpan = dayjs(iReservation.checkout).diff(dayjs(iReservation.checkin), 'd')
              qRecord[iKey] = iSpan
            }
          })
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
      console.log('singleDateSelected')
      //  get reservations from db
      api.engine.getReservationsByRange( this.resViewStartDate, this.resViewEndDate, this.jwt)
        .then( (response) => {
          this.reservations = response.data.reservations
        })
      //  format it
      let fDateSelected = dayjs(nDate).format('YYYY-MM-DD')
      //  send it to the store
      reservationStore().resViewStart = fDateSelected
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

  }
}
</script>

<style>
  .row-hidden {
    display: none !important;
  }
</style>