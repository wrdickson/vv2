<template>
  <div @click="resClicked(resId)" class="resBlock">
    <span v-if="startTruncated"><b>&lt</b></span>
    <span>{{ name }}</span>
  </div>
</template>

<script>
export default {
  props: [ 'resId', 'start', 'end', 'name', 'span', 'startTruncated' ],
  name: 'resBlock',
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
    margin-right: 2px;
    margin-left: 2px;
    border-radius: 4px;
  }
</style>