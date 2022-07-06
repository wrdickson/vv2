<script>
  import c1 from './C1.vue'
  import resBlock from './resBlock.vue'
  import singleDatePicker from './singleDatePicker.vue'
  import LocaleSwitch from './localeSwitch.vue'
  import { useCounterStore } from './../stores/counter.js'
  import dayjs from 'dayjs'
  import _ from 'lodash'
  export default {
    components:{ c1, resBlock, singleDatePicker, LocaleSwitch },
    data(){
      return{
        tDateArray: [
          {
            dayString: 'D20220703',
            dayLabel: '2022-07-03'
          },
          {
            dayString: 'D20220704',
            dayLabel: '2022-07-04'
          },
          {
            dayString: 'D20220705',
            dayLabel: '2022-07-05'
          },
          {
            dayString: 'D20220706',
            dayLabel: '2022-07-06'
          },
          {
            dayString: 'D20220707',
            dayLabel: '2022-07-07'
          },
          {
            dayString: 'D20220708',
            dayLabel: '2022-07-08'
          },
          {
            dayString: 'D20220709',
            dayLabel: '2022-07-09'
          }

        ],
        reservations: [
          {
            start: '2022-07-01',
            end: '2022-07-04',
            id: 1,
            space: 22
          },
          {
            start: '2022-07-02',
            end: '2022-07-05',
            id: 2,
            space: 23
          },
        ],
        /*
        *  So, what we need to do is iterate through the reservations
        *  and add the properties as below
        */
        tableData: [
          {
            title: 'Room 1',
            spaceId: 1,
            D20220704name: 'Jones',
            D20220704resid: '1',
            D20220704start: '2022-07-04',
            D20220704end: '2022-07-06',
            D20220704deposit: '$100.00',
            D20220704span: 2
          },
          {
            title: 'Room 2',
            spaceId: 2,
            D20220705name: 'Caseu',
            D20220705resid: '2',
            D20220705start: '2022-07-05',
            D20220705end: '2022-07-08',
            D20220705deposit: '$500.00',
            D20220705span: 3
          },
          {
            title: 'Room 3'
          },
          {
            title: 'Room 4'
          },
          {
            title: 'Room 5'
          },
          {
            title: 'Room 6'
          },
          {
            title: 'Empty for scrollbar'
          }
        ]
      }
    },
    computed: {
      countA () {
        return useCounterStore().counter
      },
      dToday () {
        return dayjs().format('YYYY-MM-DD')
      },
      dArrayString () {
        let a = []
        for (let i = 0; i < 31; i ++){
          a.push(
            { 
              formatted: "D" + dayjs(this.dToday).add( i, 'days').format('YYYYMMDD')
            }
          )
        }
        return a
      },
      dArray31 () {
        let a = []
        for (let i = 0; i < 31; i ++){
          a.push(
            { 
              formatted: dayjs(this.dToday).add( i, 'days').format('YYYY-MM-DD')
            }
          )
        }
        return a
      }
    },
    methods: {
      addGenericRes () {
        let r = _.find ( this.tableData, (o) => {
          return o.title == "Room 3"
        })
        console.log(r)
          r.D20220704name ='Smith'
          r.D20220704resid = '3'
          r.D20220704start = '2022-07-04',
          r.D20220704end = '2022-07-06',
          r.D20220704deposit = '$100.00',
          r.D20220704span = 2
      },
      cellClick (row, column, target) {
        const rowName = row.title
        const colProperty = column.property
        if(!target.innerText){
          console.log('empty cell clicked: ', rowName, ', ', colProperty)
        }
      },
      helloSusan () {
        console.log('hell0 susan')
      },
      refT () {
       this.$refs.resTable.setScrollLeft(180)
      },
      refT0 () {
        this.$refs.resTable.setScrollLeft(0)
      },
      randomizeCounter () {
        useCounterStore().randomizeCounter()
      },
      spanMethod ( d ) {
        const colName = d.column.property
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
      },
      tickCounter () {
        useCounterStore().counter+=1
      }
    },
    created () {
    }
  }
</script>

<template>
  <h1>T1</h1>
  <div>{{ $t('message.hello') }}</div>
  <LocaleSwitch/>
  <el-button @click="addGenericRes">Add Generic Res</el-button>
  <el-button @click="tickCounter">tickCounter:{{ countA }}</el-button>
  <el-button @click="randomizeCounter">randomizeCounter: {{ countA }}</el-button>
  <el-button @click="refT">refT</el-button>
  <el-button @click="refT0">refT0</el-button>
  <singleDatePicker/>
  <el-table
    ref="resTable"
    :span-method="spanMethod" 
    :data="tableData"
    border
    height="150"
    style="width: 100%"
    @cell-click="cellClick">
    <el-table-column fixed prop="title" label="Space" width="140">
    </el-table-column>
    <el-table-column fixed width="50">
      <template #default="scope">
        <div data-rel-day="0" style="display: flex; align-items: center;">
          <c1></c1>
        </div>
      </template>
    </el-table-column>
    <template v-for="day in tDateArray">
      <el-table-column :prop=day.dayString :label=day.dayLabel width="120">
      <template #default="scope">
        <div style="display: flex; align-items: center;">
          <resBlock
            v-if="scope.row[day.dayString + 'resid']"
            :resId="scope.row[day.dayString + 'resid']"
            :start="scope.row[day.dayString + 'start']"
            :end="scope.row[day.dayString + 'end']"
            :desposit="scope.row[day.dayString + 'deposit']"
            :span="scope.row[day.dayString + 'span']"
          />
        </div>
      </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<style>
.cell {
  padding: 0px !important;
}
.el-table .el-table__cell{
  padding: 0px !important;
}
.el-scrollbar__bar.is-horizontal{
  height:23px !important;
}
</style>