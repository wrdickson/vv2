<template>
  <div @click="emptyBlockClick" class="emptyBlock">
    <span>blocked</span>
  </div>
</template>

<script>
export default {
  props: [ 'start', 'end', 'span', 'startTruncated', 'blockIndicator' ],
  name: 'emptyBlock',
  emits: [ 'empty-block-click' ],
  methods: {
    emptyBlockClick () {
      console.log('emptyBlockClick @emptyBlock')
      this.$emit('empty-block-click')
    }
  }
}
</script>

<style scoped>
  .emptyBlock {
    background-color: rgb(214, 214, 214);
    color: rgb(214, 214, 214);
    width: 100%;
    padding-right: 4px;
    padding-left: 4px;
    margin-right: 2px;
    margin-left: 2px;
    border-radius: 4px;
  }
</style>