<template>
  <el-table
    :data="tableData"
    :spanMethod="spanMethod"
    :row-style="rowStyle"
    border
    height="450"
    style="width: 100%"
    @cell-click="cellClick">
    <el-table-column fixed prop="title" :label="spaceLabel" width="160">
    </el-table-column>
    <!--
    <el-table-column fixed prop="id" label="id" width="45">
    </el-table-column>

    <el-table-column fixed prop="showChildren" label="showChildren" width="100">
    </el-table-column>

    <el-table-column fixed prop="childOf" label="childOf" width="50">
    </el-table-column>
    -->

    <el-table-column prop="expand" fixed width="20">
      <template #default="scope">
        <div data-rel-day="0" style="display: flex; align-items: center;">
          <c1
            :spaceId="scope.row.id"
            :showChildren="scope.row.showChildren"
            :children="scope.row.children"
            @c1-toggle-show-children="c1ToggleShowChildren"
            ></c1>
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
  emits: [ 'resview-toggle-show-children', 'resBlockClick', 'emptyCellClick' ],
  props: [
    'tDateArray',
    'tableData',
    'trigger',
    'resSpaceCopy'
  ],
  data () {
    return {
      iloading: false
    }
  },
  computed: {
    spaceLabel() {
      return this.$t('message.spaceLabel')
    }
  },
  methods: {
    c1ToggleShowChildren ( spaceId ) {
      console.log('resViewTable toggle', spaceId)
      //  tell resView to toggle this
      this.$emit('resview-toggle-show-children', spaceId)
    },
    cellClick ( row, column ) {
      //  get the 'prop' of the colun
      let colProp = column.property
      //  if there's no res data from that column, emit the click
      let resIdKey = colProp + 'resid'
      if (! row[resIdKey] ){
        let obj = {
          spaceId: row.id,
          selectedDate: dayjs(column.property.substr(1)).format('YYYY-MM-DD')
        }
        //  finally, don't emit from clicks on first two rows:
        //  prop = "description", prop = "expand"
        if( column.property != 'description' && column.property != 'expand') {
          this.$emit( 'emptyCellClick', obj )
        }
      }
    },
    getChildrenIds( spaceId ) {
      const childrenArr = []
      const getChildren = (spaceId) => {
        let children = _.find(this.resSpaceCopy, (o) => {
          return o.childOf == spaceId
        })
        if( children ) {
          _.each(children, ( child ) => {
            console.log('child', child.id)
            childrenArr.push( child.id )
            getChildren( child.id )
          })
        } else {
          console.log('cArr', childrenArr)
          return childrenArr
        }
      }
      getChildren(spaceId)
    },
    resBlockClick( resId ) {
      //  pass the emitted event up to the parent
      this.$emit('resBlockClick', resId)
    },
    rowStyle ( obj ) {
      //  exclude level 0 items
      if(obj.row.childOf > 0) {
        const childOfRecord = _.find(this.tableData, (o) => {
          return o.id == obj.row.childOf
        })
        if(  childOfRecord.showChildren == true ) {
          return ''
        } else {
          return 'display: none;'
        }
      }
    }, 
    spanMethod ( d ) {
      const colName = d.column.property // the formatted 'name' ie 'D20220701'
      const rowTitle = d.row.title
      const r = _.find( this.tableData, function (o) { return o.title == rowTitle })
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
  },
  watch: {
    resSpaceCopy (old, newd){
      console.log('resSpaceCopy change on resViewTable')
    }
  }
}

</script>