/* 键值对添加模式 */
<template>
  <el-input
    v-model="model"
    type="textarea"
    placeholder="JSON参数，如: {'name: 'axios', domain: 'www.axios.com'}"
    :autosize="{ minRows: 15, maxRows: 15}"
  />
</template>

<script>
  export default {
    props: {
      value: {
        type: Object,
        default: () => ({})
      }
    },
    computed: {
      model: {
        get () {
          return JSON.stringify(this.value)
        },
        set (newVal) {
          this.$emit('input', JSON.parse(newVal))
        }
      }
    }
  }
</script>
