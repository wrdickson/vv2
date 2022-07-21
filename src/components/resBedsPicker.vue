<template>
  <div>
    <div>{{ $t('message.numberOfBeds') }}</div>
    <el-config-provider :locale="locale">
      <el-select v-model="selectedBedQty" :placeholder="placeholder">
        <template v-for="item in arr">
          <el-option :lable="item" :value="item"/>
        </template>
      </el-select>
    </el-config-provider>
  </div>
</template>

<script>
export default {
  name: 'resBedsPicker',
  emits: [ 'resBedsPicker:bedQtyChosen' ],
  data () {
    return {
      arr: [1,2,3,4,5,6,7,8,9,10],
      selectedBedQty: null
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
    selectedBedQty ( oldVal, newVal ) {
      this.$emit( 'resBedsPicker:bedQtyChosen', this.selectedBedQty )
    }
  }
}
</script>