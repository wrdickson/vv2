import { defineStore } from 'pinia'
import es from 'element-plus/lib/locale/lang/es'
import en from 'element-plus/lib/locale/lang/en'

export const localeStore = defineStore({
  id: 'locale',
  state: () => ({
    selectedLocale: en
  }),
  actions: {
    setComponentLocale (locale) {
      if(locale == 'en'){
        this.selectedLocale = en
      }
      if(locale == 'es') {
        this.selectedLocale = es
      }
    }
  }

})