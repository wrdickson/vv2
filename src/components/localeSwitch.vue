<template>
  <div>
    <el-select v-model="$i18n.locale">
      <el-option
        v-for="(lang, i) in langs"
        :key="`lang-${i}`"
        :value="lang"
      >
        {{ lang }}
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: 'LocaleSwitch',
  data() {
    return { langs: ['en', 'es'] }
  }
}
</script>
