<template>
  <div @click="resClicked(resId)" class="resBlock">
    <span v-if="startTruncated && isFirst"><b>&lt&lt</b></span>
    <span v-if="isFirst">{{ name }}</span>
    <span  v-if="endTruncated"><b>&gt&gt</b></span>
    <span class="sameAsBackground">.</span>
  </div>
</template>

<script>
export default {
  props: [ 'isFirst', 'resId', 'start', 'end', 'name', 'span', 'startTruncated', 'endTruncated' ],
  name: 'resBlock',
  emits: [ 'resBlockClick' ],
  methods: {
    resClicked (resId) {
      this.$emit('resBlockClick', resId)
    }
  }
}
</script>

<style scoped>
  .resBlock {
    background-color: rgb(166, 196, 149);
    color: rgb(53, 53, 53);
    width: 100%;
    padding-right: 4px;
    padding-left: 4px;
    margin-right: 0px;
    margin-left: 0px;
    border-radius: 0px;
  }
  .sameAsBackground {
    color: rgb(166, 196, 149);
  }
</style>