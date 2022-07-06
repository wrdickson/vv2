<template>
  <div @click="resClicked(resId)" class="resBlock">
    <span>resId: {{resId}}</span>
  </div>
</template>

<script>
export default {
  props: [ 'resId', 'start', 'end', 'name', 'span' ],
  name: 'resBlock',
  methods: {
    resClicked (e) {
      console.log('resClicked()', e)
      return false
    }
  }
}
</script>

<style scoped>
  .resBlock {
    background-color: rgb(166, 196, 149);
    width: 100%;
    padding-right: 4px;
    padding-left: 4px;
    margin-right: 2px;
    margin-left: 2px;
    border-radius: 4px;
  }
</style>