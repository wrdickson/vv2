<template>
  <div>
    <div class="block">
      <el-date-picker
        v-model="selectedDate"
        type="date"
        placeholder="Pick a day"
        :size="size"
      />
    </div>
  </div>

</template>

<script>
export default {
  name: 'singelDatePicker',
  emits: ['singleDatePicker:dateSelected'],
  data () {
    return {
      selectedDate: null,
      size: 'default'
    }
  },
  watch: {
    selectedDate( newDate, oldDate ) {
      this.$emit('singleDatePicker:dateSelected', this.selectedDate)
    }
  }
}

</script>

<style>
</style>