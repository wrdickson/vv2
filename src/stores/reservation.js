import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import _ from 'lodash'

export const reservationStore = defineStore({
  id: 'reservation',
  state: () => ({
    resViewStart: dayjs().format('YYYY-MM-DD'),
    resSpaces: [],
  }),
  actions: {
    setResSpacesFromObj ( resSpacesObj ) {
      let iArr = []
      _.forEach( resSpacesObj, ( resSpace ) => {
        iArr.push(resSpace)
      })
      this.resSpaces = iArr
    }
  }
})