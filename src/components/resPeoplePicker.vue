<template>
  <div>
    <div>{{ $t('message.numberOfPeople') }}</div>
    <el-config-provider :locale="locale">
      <el-select v-model="selectedPeopleQty" :placeholder="placeholder">
        <template v-for="item in arr">
          <el-option :lable="item" :value="item"/>
        </template>
      </el-select>
    </el-config-provider>
  </div>
</template>

<script>
export default {
  name: 'resPeoplePicker',
  emits: [ 'resPeoplePicker:peopleQtyChosen' ],
  data () {
    return {
      arr: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
      selectedPeopleQty: null
    }
  },
  computed: {
    locale () {
      return this.$i18n
    },
    placeholder () {
      return this.$t('message.select')
    }
  },
  watch: {
    selectedPeopleQty ( oldVal, newVal ) {
      console.log(this.$i18n)
      this.$emit( 'resPeoplePicker:peopleQtyChosen', this.selectedPeopleQty )
    }
  }
}
</script>