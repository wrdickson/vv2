<template>
  <el-table
   :data="tableData"
   :spanMethod="spanMethod"
    border
    height="450"
    style="width: 100%"
    @cell-click="cellClick">
    <el-table-column fixed prop="description" label="Space" width="160">
    </el-table-column>
    <el-table-column prop="expand" fixed width="20">
      <template #default="scope">
        <div data-rel-day="0" style="display: flex; align-items: center;">
          <c1 :spaceId="scope.row.space_id"></c1>
        </div>
      </template>
    </el-table-column>
    <template v-for="day in tDateArray">
      <el-table-column :prop=day.dayString :label=day.dayLabel width="120">
      <template #default="scope">
        <div style="display: flex; align-items: center;">
          <resBlock
            @resBlockClick="resBlockClick"
            v-if="scope.row[day.dayString + 'resid']"
            :resId="scope.row[day.dayString + 'resid']"
            :start="scope.row[day.dayString + 'start']"
            :end="scope.row[day.dayString + 'end']"
            span="1"
            :name="scope.row[day.dayString + 'customer']"
            :startTruncated="scope.row[day.dayString + 'starttruncated']"
          />
        </div>
      </template>
      </el-table-column>
    </template>
  </el-table>

</template>

<script>
import resBlock from './resBlock.vue'
import c1 from './C1.vue'
import dayjs from 'dayjs'
import _ from 'lodash'
export default {
  name: 'ResViewTable',
  components: { c1, resBlock },
  props: [
    'tDateArray',
    'tableData',
    'tableLoading'
  ],
  data () {
    return {
    }
  },
  computed: {

  },
  methods: {
    cellClick ( row, column ) {
      //  get the 'prop' of the colun
      let colProp = column.property
      //  if there's no res data from that column, emit the click
      let resIdKey = colProp + 'resid'
      if (! row[resIdKey] ){
        let obj = {
          spaceId: row.space_id,
          selectedDate: dayjs(column.property.substr(1)).format('YYYY-MM-DD')
        }
        //  finally, don't emit from clicks on first two rows:
        //  prop = "description", prop = "expand"
        if( column.property != 'description' && column.property != 'expand') {
          this.$emit( 'emptyCellClick', obj )
        }
      }
    },
    resBlockClick( resId ) {
      //  pass the emitted event up to the parent
      this.$emit('resBlockClick', resId)
    },
    spanMethod ( d ) {
      const colName = d.column.property // the formatted 'name' ie 'D20220701'
      const rowTitle = d.row.description
      const r = _.find( this.tableData, function (o) { return o.description == rowTitle })
      let useColSpan = 1
      if(r[colName + 'span']){
        useColSpan = r[colName + 'span']
      }
      const obj = {
        rowspan: 1,
        colspan: useColSpan
      }
      return obj
    }
  }
}

</script>