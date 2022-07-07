<template>
  <div>
    <singleDatePicker @singleDatePicker:dateSelected="singleDateSelected"></singleDatePicker>
    <ResViewTable
      @resBlockClick="reservationSelected"
      @emptyCellClick="emptyCellClick"
      :tDateArray="tDateArray"
      :tableData="resTableData"
    />

  </div>
</template>

<script>
import singleDatePicker from './../components/singleDatePicker.vue'
import ResViewTable from './../components/resViewTable.vue'
import { reservationStore } from './../stores/reservation.js'
import api from './../api/api.js'
import dayjs from 'dayjs'
import _ from 'lodash'
export default {
  name: 'resView1',
  components: {
    singleDatePicker,
    ResViewTable
  },
  data () {
    return {
      //  THIS IS TEMPORARY
      reservations: [
        {
          id: 1,
          checkin: '2022-07-06',
          checkout: '2022-07-15',
          space_code: "1",
          space_id: 1,
          name: 'AADMIN',
          customer: 1,
          deposit: '$40',
          span: 3
        },
        {
          id: 2,
          checkin: '2022-7-11',
          checkout: '2022-7-14',
          space_code: "2",
          space_id: 2,
          name: 'aadmin',
          customer: 1,
          deposit: '$3',
          span: 3
        },
        {
          id: 3,
          checkin: '2022-08-07',
          checkout: '2022-08-13',
          space_code: "3",
          space_id: 3,
          name: 'aadmin',
          customer: 1,
          deposit: '$300',
          span: 2
        }

      ]
    }
  },
  computed: {
    resViewStartDate () {
      return reservationStore().resViewStart
    },
    resSpaceCopy () {
      //  we want a copy, not the reactive value since we will modify (greatly)
      return _.cloneDeep(reservationStore().resSpaces)
    },
    resTableData () {
      let resSpaceCopy = _.cloneDeep(this.resSpaceCopy)
      let resCopy = _.cloneDeep(this.reservations)
      //  iterate through the reservations and add data to the appropriate array item
      _.forEach( resSpaceCopy, ( resSpace ) => {
        //  filter reservations for a hit
        let resForSpace = _.filter( resCopy, (o) => {
          return o.space_id == resSpace.space_id
        })
        //  iterate throu resForSpace and add data from reservations
        _.forEach(resForSpace, ( iRes ) => {
          //first, check if start date is before resViewStart, and change 
          //  start date(this is just for the table, not changing the res)
          //  or it won't show
          if( dayjs(iRes.checkin).isBefore(dayjs(this.resViewStartDate)) ) {
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
            resSpace[iKey] = iRes.customer
            //  span
            iKey = 'D' +  dayjs(this.resViewStartDate).format('YYYYMMDD') + 'span'
            resSpace[iKey] = iRes.span
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
            resSpace[iKey] = iRes.customer
            //  span
            iKey = 'D' +  dayjs(iRes.checkin).format('YYYYMMDD') + 'span'
            resSpace[iKey] = iRes.span
          }
        })
      })
      return resSpaceCopy
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
    singleDateSelected ( nDate ) {
      //  format it
      let fDateSelected = dayjs(nDate).format('YYYY-MM-DD')
      //  send it to the store
      reservationStore().resViewStart = fDateSelected
    }
  },
  created () {
    //  load initial data
    api.engine.getSpaces().then( (response) => {
      console.log('fucking response', response)
      reservationStore().setResSpacesFromObj(response.data.spaces)
    })

  }
}
</script>