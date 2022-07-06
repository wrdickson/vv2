<template>
  <div>
    <h1>resView1</h1>
    <singleDatePicker @singleDatePicker:dateSelected="singleDateSelected"></singleDatePicker>


  </div>
</template>

<script>
import singleDatePicker from './../components/singleDatePicker.vue'
import axios from 'axios'
import dayjs from 'dayjs'
export default {
  name: 'resView1',
  components: { singleDatePicker },
  data () {
    return {
      dateSelected: '2022-01-01'
    }
  },
  computed: {
    fDateSelected () {
      return dayjs(this.dateSelected).format('YYYY-MM-DD')
    }
  },
  methods: {
    singleDateSelected ( nDate ) {
      console.log('singleDateSelected', nDate)
      this.dateSelected = dayjs(nDate).format('YYYY-MM-DD')
    }
  }
}
</script>