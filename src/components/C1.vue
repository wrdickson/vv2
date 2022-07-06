<template>
  <div @click="divClick" class="c1-wrapper">
    <span>></span>
  </div>

</template>

<script>
export default {
  name: "c1",
    methods: {
      divClick () {
        console.log('divClick')
      }
  }
}
</script>

<style scoped>
  .c1-wrapper {
    min-width: 60px;
    max-width: 60px;
    max-height: 23px;
  }

</style>