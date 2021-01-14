<template>
  <p>sssssssssss</p>
</template>

<script>
export default {
  name: 'test-component',
  setup (props) {
    const message = ref('hello rollup')
    return {
      message: message.value
    }
  }
}
</script>

<style lang="scss" scoped>
  .title {
    font-size: 26px;
    color: red;
  }
</style>