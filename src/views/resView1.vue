<template>
  <div v-if="resSpaceCopy">
    <singleDatePicker @singleDatePicker:dateSelected="singleDateSelected"></singleDatePicker>
    <ResViewTable
      @resBlockClick="reservationSelected"
      @resview-toggle-show-children="toggleShowChildren"
      @emptyCellClick="emptyCellClick"
      :tDateArray="tDateArray"
      :tableData="resTableData"
      :trigger="trigger"
      :resSpaceCopy="resSpaceCopy"
    />
  </div>
</template>

<script>
import singleDatePicker from './../components/singleDatePicker.vue'
import ResViewTable from './../components/resViewTable.vue'
import { reservationStore } from './../stores/reservation.js'
import api from './../api/api.js'
import { userStore } from './../stores/user.js'
import dayjs from 'dayjs'
import _ from 'lodash'
import { invokeArrayFns } from '@vue/shared'
export default {
  name: 'resView1',
  components: {
    singleDatePicker,
    ResViewTable
  },
  data () {
    return {
      reservations: [],
      trigger: 1,
      resSpaceCopy: reservationStore().getRootSpaces
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
      let resCopy = _.cloneDeep(this.reservations)
      //  iterate through the reservations and add data to the appropriate array item
      _.forEach( this.resSpaceCopy, ( resSpace ) => {
        //  filter reservations for a hit
        let resForSpace = _.filter( resCopy, (o) => {
          return o.space_id == resSpace.id
        })
        //  iterate through resForSpace and add data from reservations
        _.forEach(resForSpace, ( iRes ) => {
          //  console.log('resForSpace', resForSpace)
          //  console.log('resSpace', resSpace)
          //  first, check if start date is before resViewStart, and change 
          //  start date(this is just for the table, not changing the res)
          //  or it won't show
          if( dayjs(iRes.checkin).isBefore(dayjs(this.resViewStartDate)) &&  dayjs(iRes.checkout).isSameOrAfter(dayjs(this.resViewStartDate)) ) {
            //  isStartTruncated flag
            let iKey = 'D' + dayjs(this.resViewStartDate).format('YYYYMMDD') + 'starttruncated'
            resSpace[iKey] = true
            //  resid
            iKey = 'D' + dayjs(this.resViewStartDate).format('YYYYMMDD') + 'resid'
            resSpace[iKey] = iRes.id
            //  start
            iKey = 'D' + dayjs(this.resViewStartDate).format('YYYYMMDD') + 'start'
            resSpace[iKey] = iRes.checkin
            //  end
            iKey = 'D' + dayjs(this.resViewStartDate).format('YYYYMMDD') + 'end'
            resSpace[iKey] = iRes.checkout
            //  customer
            iKey = 'D' +  dayjs(this.resViewStartDate).format('YYYYMMDD') + 'customer'
            resSpace[iKey] = iRes.customer_obj.lastName
            //  span
            iKey = 'D' +  dayjs(this.resViewStartDate).format('YYYYMMDD') + 'span'
            //  span is the difference between resStart and checkout
            let iSpan = dayjs(iRes.checkout).diff(dayjs(this.resViewStartDate), 'd')
            resSpace[iKey] = iSpan
          } else {
            //  resid
            let iKey = 'D' + dayjs(iRes.checkin).format('YYYYMMDD') + 'resid'
            resSpace[iKey] = iRes.id
            //  start
            iKey = 'D' + dayjs(iRes.checkin).format('YYYYMMDD') + 'start'
            resSpace[iKey] = iRes.checkin
            //  end
            iKey = 'D' + dayjs(iRes.checkin).format('YYYYMMDD') + 'end'
            resSpace[iKey] = iRes.checkout
            //  customer
            iKey = 'D' +  dayjs(iRes.checkin).format('YYYYMMDD') + 'customer'
            resSpace[iKey] = iRes.customer_obj.lastName
            //  span
            iKey = 'D' +  dayjs(iRes.checkin).format('YYYYMMDD') + 'span'
            //  calculate span
            let iSpan = dayjs(iRes.checkout).diff(dayjs(iRes.checkin), 'd')
            resSpace[iKey] = iSpan
          }
        })




        console.log('now go out with ', resSpace.title, ' id:', resSpace.id)
        console.log('resSpace', resSpace)
        console.log('resCopy@ start', resCopy)
        //  parents
        _.forEach(resSpace.parents, (parentId) => {
          console.log('make a record for parentID:', parentId)
          //  filter reservations for a hit
          let resForSpace = _.filter( resCopy, (o) => {
            return o.space_id == parentId
          })
          console.log('resForSpace:', resForSpace)
        })






      })

      return this.resSpaceCopy
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
    reservationSelected ( resId) {
      console.log('resId selected: ', resId)
    },
    rowClassName ( obj) {
    },
    singleDateSelected ( nDate ) {
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
      let k = _.find(this.resSpaceCopy, (o) => {
        return o.id == spaceId
      })

      let hideChildren = (k) => {
        k.showChildren = false
        if(k.children) {
            _.each(k.children,( childId ) => {
              let m = _.find(this.resSpaceCopy, (o) => {
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
              let m = _.find(this.resSpaceCopy, (o) => {
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
              let m = _.find(this.resSpaceCopy, (o) => {
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