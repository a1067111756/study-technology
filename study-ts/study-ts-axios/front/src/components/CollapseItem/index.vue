<template>
  <div class="container">{{ title }}<i :class="[icon, 'icon-class']" /></div>  
</template>

<script>
export default {
  props: {
    title: {
      required: true,
      type: String
    },
    icon: {
      type: String,
      default: 'el-icon-s-promotion'
    }
  }
}
</script>

<style scoped>
  .container {
    font-size: 16px;
    padding: 10px 0;
  }

  .icon-class {
    float: right; 
    margin-right: 10px
  }
</style>