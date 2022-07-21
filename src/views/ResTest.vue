<template>
  <h1>ResTest</h1>
  <div>
    <el-button @click="getRootSpaces">Root Spaces</el-button>
  </div>
  <DateRangePicker
    @dateRangePicker:rangeSelected="dRangeSelected"
  />
</template>

<script>
import api from './../api/api.js'
import dayjs from 'dayjs'
import DateRangePicker from './../components/dateRangePicker.vue'
export default {
  name: 'ResTest',
  components: { DateRangePicker},
  data () {
    return {

    }
  },
  methods: {
    dRangeSelected ( rangeArr ) {
      console.log('rangeObject', rangeArr)
      const start = dayjs( rangeArr[0] ).format('YYYY-MM-DD')
      const end = dayjs( rangeArr[1] ).format('YYYY-MM-DD' )
      api.engine.checkAvailabilityByDates( start, end )
    },
    getRootSpaces () {

    }
  }
}
</script>