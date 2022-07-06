<template>
  <el-menu @select="menuSelect" :router="true">
    <el-menu-item index="Home">Home</el-menu-item>
    <el-menu-item index="Login">Login</el-menu-item>
    <el-menu-item index="T1">T1</el-menu-item>
    <el-menu-item index="singleDatePicker">singleDatePicker</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'MainMenu',
    methods: {
      menuSelect (a,b,c,d) {
        console.log('menuSelect()', a,b,c,d)
        this.$emit('mainMenu:select')
      }
    }
  }
</script>