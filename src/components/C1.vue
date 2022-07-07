<template>
  <div @click="divClick" class="c1-wrapper">
    <font-awesome-icon icon="fa-circle-arrow-right" size="lg"/>
  </div>

</template>

<script>
export default {
  name: "c1",
  props:[ 'spaceId' ],
  methods: {
    divClick () {
      console.log('divClick')
  }
  },
  methods: {
    divClick (e) {
      console.log('divClick', this.spaceId)
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