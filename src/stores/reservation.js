import { defineStore } from 'pinia'
import dayjs from 'dayjs'
import api from './../api/api.js'
import _ from 'lodash'

export const reservationStore = defineStore({
  id: 'reservation',
  state: () => ({
    resViewStart: dayjs().format('YYYY-MM-DD'),
    resSpaces: [],
    showChildrenObj: {}
  }),
  getters: {
    getRootSpaces ( state ) {
      return state.resSpaces
    }
  },
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