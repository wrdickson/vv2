<template>
  <el-menu @select="menuSelect" :router="true">
    <el-menu-item index="/Home">{{ $t('message.homePage') }}</el-menu-item>
    <el-menu-item index="Login">{{ $t('message.login')}}</el-menu-item>
    <el-menu-item index="/ResView3">ResView3</el-menu-item>
    <el-menu-item index="/SpaceEdit">SpaceEdit</el-menu-item>
    <el-menu-item index="/CRes">CRes</el-menu-item>
    <el-menu-item index="/UserAdmin">User Admin</el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'MainMenu',
    emits: [ 'mainMenu-select' ],
    methods: {
      menuSelect (a,b,c,d) {
        this.$emit('mainMenu-select')
      }
    }
  }
</script>

<style>
.el-menu-item {
  height: 40px !important;
}
</style>