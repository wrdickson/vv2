<template>
  <div>
    <div class="block">
      <el-config-provider :locale="locale">
        <el-date-picker
          v-model="selectedDate"
          type="date"
          :placeholder="datepickerPlaceholder"
          :size="size"
        />
      </el-config-provider>
    </div>
  </div>

</template>

<script>
import dayjs from 'dayjs'
import { localeStore } from './../stores/locale.js'
export default {
  name: 'singelDatePicker',
  emits: ['singleDatePicker:dateSelected'],
  data () {
    return {
      selectedDate: dayjs().format('YYYY-MM-DD'),
      size: 'default'
    }
  },
  computed: {
    datepickerPlaceholder () {
      return this.$t('message.datepickerPlaceholder')
    },
    locale () {
      return localeStore().selectedLocale
    }
  },
  mounted () {
    //  send a signal to parent that this is date selected
    this.$emit('singleDatePicker:dateSelected', this.selectedDate)
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