<template>
  <p class="title">{{ message }}</p>
</template>

<script>
export default {
  name: 'test-component',
  setup (props) {
    const message = '我是测试组件'
    return {
      message
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