import { defineStore } from 'pinia'

// const not default . .  
export const useCounterStore = defineStore ({
  id: 'counter',
  state: ()=> ({
    counter: 123
  }),
  //  getters are like a computed property . . .  
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    },
  },
})
