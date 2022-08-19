<template>
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
      let pResStart
      let iSpan
      let ciInRange
      let coInRange
      let iKey
      let sKey

      this.spaceRecords =  _.cloneDeep(reservationStore().getRootSpaces)
      //  iterate through the reservations and add data to the appropriate array item
      _.each(this.reservations, (iReservation) => {
        //  ignore reservations where checkout == resViewStartDate
        if( iReservation.checkout == this.resViewStartDate ){
          //do nothing
        } else {
          let iRecord = _.find(this.spaceRecords, (o) => {
            //get the reservation
            return o.id == iReservation.space_id
          })
          if(iRecord){ 
            //  first present the reservation

            if( dayjs(iReservation.checkout).isAfter(dayjs(this.resViewEndDate)) ){
              coInRange = false
            } else {
              coInRange = true
            }


            //  check in is before start date, checkout is after start date
            //  presentedResStart is the first day that should be represented
            if ( dayjs(iReservation.checkin).isBefore(dayjs(this.resViewStartDate)) ){
                ciInRange = false
                presentedResStart = dayjs(this.resViewStartDate).format('YYYYMMDD')
                pResStart = dayjs(this.resViewStartDate).format('YYYY-MM-DD')
                iSpan = iSpan = dayjs(iReservation.checkout).diff(dayjs(this.resViewStartDate), 'd')
              } else {
                ciInRange = true
                presentedResStart = dayjs(iReservation.checkin).format('YYYYMMDD')
                pResStart = dayjs(iReservation.checkin).format('YYYY-MM-DD')
                iSpan = dayjs(iReservation.checkout).diff(dayjs(iReservation.checkin), 'd')
              }



            //  calculate the difference between presentedResStart and checkout
            let iDiff = dayjs(iReservation.checkout).diff(dayjs(pResStart), 'd')
            for( let i = 0; i < iDiff; i++){
                  //generate the day
                  let iDate = dayjs(presentedResStart).add(i, 'd').format('YYYYMMDD')
                  //  determine if this is the first day of the presentation
                  if( i == 0 ) {
                    iKey = 'D' + iDate + 'isfirst'
                    iRecord[iKey] = true
                  }
                  //  is block indicator
                  iKey = 'D' + iDate + 'blocked'
                  iRecord[iKey] = false
                  //  isStartTruncated flag
                  iKey = 'D' + iDate + 'starttruncated'
                  iRecord[iKey] = !ciInRange
                  //  isEndTruncated flat
                  iKey = 'D' + iDate + 'endtruncated'
                  iRecord[iKey] = !coInRange
                  //  resid
                  iKey = 'D' + iDate + 'resid'
                  iRecord[iKey] = iReservation.id
                  //  start
                  iKey = 'D' + iDate + 'start'
                  iRecord[iKey] = iReservation.checkin
                  //  end
                  iKey = 'D' + iDate + 'end'
                  iRecord[iKey] = iReservation.checkout
                  //  customer
                  iKey = 'D' +  iDate + 'customer'
                  iRecord[iKey] = iReservation.customer_obj.lastName
            }
          }

          //  now create 'empty block' records for children of reservations
          if(iRecord.children.length > 0){
            _.forEach(iRecord.children, (childId) => {
              let qRecord = _.find(this.spaceRecords, (o) => {
                return o.id == childId
              })
              if(qRecord) {
                //  calculate the difference between presentedResStart and checkout
                let iDiff = dayjs(iReservation.checkout).diff(dayjs(pResStart), 'd')
                //  iterate through the needed number of days
                for( let i = 0; i < iDiff; i++){
                  // console.log('i', i)
                  //generate the day
                  let iDate = dayjs(presentedResStart).add(i, 'd').format('YYYYMMDD')
                  // console.log( iDate )
                  sKey = 'D' + iDate + 'blocked'
                  //  also check for a reservation
                  let iiKey = 'D' + iDate + 'resid'
                  // console.log('sKey', sKey)
                  if( !qRecord[sKey]){
                    // console.log('no block for this. sKey: ', qRecord)
                    
                    let sKey = 'D' + iDate + 'blocked'
                    qRecord[sKey] = true
                    //  span
                    sKey = 'D' +  iDate + 'span'
                    qRecord[sKey] = 1
                    //  resIdRef
                    sKey = 'D' +  iDate + 'resIdRef'
                    qRecord[sKey] = iReservation.id
                  }
                }
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
                //  iterate through the 'days'
                //  calculate the difference between presentedResStart and checkout
                let iDiff = dayjs(iReservation.checkout).diff(dayjs(pResStart), 'd')
                // console.log('iDiff', iDiff)
                //iterate through the 'days'
                for( let i = 0; i < iDiff; i++){
                  // console.log('i', i)
                  //generate the day
                  let iDate = dayjs(presentedResStart).add(i, 'd').format('YYYYMMDD')
                  // console.log( iDate )
                  let sKey = 'D' + iDate + 'blocked'
                  //console.log('sKey', sKey)
                  if( !qRecord[sKey] ){
                    // console.log('no block for this')
                    let sKey = 'D' + iDate + 'blocked'
                    qRecord[sKey] = true
                    //  span
                    sKey = 'D' +  iDate + 'span'
                    qRecord[sKey] = 1
                    //  resIdRef
                    sKey = 'D' +  iDate + 'resIdRef'
                    qRecord[sKey] = iReservation.id
                  }
                }
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
      this.loading = true
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