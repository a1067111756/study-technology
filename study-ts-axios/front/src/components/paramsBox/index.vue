/* 参数添加框组件 */
<template>
  <el-card class="params-box">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane :key="item.key" v-for="item in paneList" v-bind="item">
        <component v-bind:is="item.component" v-model="model"></component>
      </el-tab-pane>
    </el-tabs>  
  </el-card>    
</template>

<script>
  import JsonPane from './jsonPane'
  import KeyValuePane from './keyValuePane'

  export default {
    components: {
      JsonPane,
      KeyValuePane
    },
    props: {
      value: {
        type: Object,
        default: () => ({})
      },
      paneList: {
        type: Array,
        default: () => [
          {
            name: '0',
            label: '参数设置/key-value方式',
            component: 'KeyValuePane'
          },
          {
            name: '1',
            label: 'JSON参数设置/JSON方式',
            component: 'JsonPane'
          }
        ]
      }
    },
    computed: {
      model: {
        get () {
          return this.value
        },
        set (newVal) {
          this.$emit('input', newVal)
        }
      }
    },
    data() {
      return {
        activeName: '0'
      }
    }
  }
</script>