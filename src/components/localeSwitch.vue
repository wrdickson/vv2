<template>
  <div>
    <el-select @change="handleLocaleChange" class="menuLangSelect" v-model="$i18n.locale">
      <el-option
        v-for="(lang, i) in langs"
        :key="`lang-${i}`"
        :value="lang.code"
      >
        {{ lang.title }}
      </el-option>
    </el-select>
  </div>
</template>

<script>
import { localeStore } from './../stores/locale.js'
export default {
  name: 'LocaleSwitch',
  data() {
    return { 
      langs: [
        {
          code: 'en',
          title: 'English'
        },
        {
          code: 'es',
          title: 'Español'
        }
      ]
    }
  },
  methods: {
    handleLocaleChange ( locale ) {
      localeStore().setComponentLocale(locale)
    }
  }
}
</script>

<style>
.menuLangSelect {
  width: 80px;
  margin-top: 0px;
}
</style>
