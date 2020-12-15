<template>
  <el-dialog
    v-on="event__"
    v-bind="config__"
  >
    <!-- 请求地址  -->
    <div style="display: flex">
      <el-input placeholder="请输入可请求网址，如：www.baidu.com" v-model="data__.axiosConfig.url" style="margin-right: 10px">
        <el-select slot="prepend" v-model="data__.request_domain" style="width: 105px">
          <el-option v-for="item in options__.REQUEST_DOMAIN" :key="item.value" v-bind="item" />
        </el-select>
      </el-input>
      <el-button type="success" icon="el-icon-setting" @click="onRequest">模拟请求</el-button>
    </div>

    <!-- 选项面板 -->
    <div style="display: flex; margin-top: 10px">
      <el-select v-model="data__.axiosConfig.method" style="width: 120px; margin-right: 10px">
        <el-option v-for="item in options__.REQUEST_METHOD" :key="item.value" v-bind="item" />
      </el-select>
      <el-checkbox v-model="data__.switch_params" label="参数设置" border style="margin: 0" />
      <el-checkbox v-model="data__.switch_headers" label="Header" border />      
    </div>

    <!-- 参数设置 -->
    <ParamsBox v-if="data__.switch_params" v-model="data__.axiosConfig.data" />

    <!-- 请求头设置 -->
    <ParamsBox 
      v-if="data__.switch_headers" 
      v-model="data__.axiosConfig.headers"
      :pane-list="[
        {
          name: '0',
          label: 'Header设置 / key-value方式',
          component: 'KeyValuePane'
        },
        {
          name: '1',
          label: 'Header设置 / JSON方式',
          component: 'JsonPane'
        }             
      ]"
    />

    <!-- 返回值设置 -->
    <ParamsBox 
      v-model="data__.response"
      :pane-list="[
        {
          name: '0',
          label: 'Response Text返回值',
          component: 'JsonPane'
        },
        {
          name: '1',
          label: 'Response Text原始返回值',
          component: 'JsonPane'
        }                    
      ]"
    />     
  </el-dialog>    
</template>

<script>
import axios from '@/lib/index'
import ParamsBox from '@/components/paramsBox/index.vue'

const REQUEST_DOMAIN = [
  { label: 'HTTP://', value: '0' },
  { label: 'HTTPS://', value: '1' }
]

const REQUEST_METHOD = [
  { label: 'GET', value: 'get' },
  { label: 'POST', value: 'post' },
  { label: 'PUT', value: 'put' },
  { label: 'HEAD', value: 'head' },
  { label: 'OPTIONS', value: 'options' },
  { label: 'PATCH', value: 'patch' }
]

export default {
  components: {
    ParamsBox  
  },
  data () {
    return {
      config__: {
        title: '在线HTTP接口测试工具',
        visible: false,
        fullscreen: true,
        customClass: 'http-dialog'
      },
      event__: {
        close: this.onClose,
        closed: this.onReset
      },
      data__: {
        response: null,
        axiosConfig: {},
        request_domain: '0',
        switch_params: true,
        switch_headers: true,
      },
      options__: {
        REQUEST_DOMAIN,
        REQUEST_METHOD
      }
    }
  },
  mounted () {
    this.$bus.on('http-dialog:open', this.onOpen)
  },
  methods: {
    // 钩子 - 打开
    onOpen (params) {
      this.data__.axiosConfig = params
      this.config__.visible = true
    },
    // 钩子 - 关闭
    onClose () {
      this.config__.visible = false
    },
    // 方法 - 重置
    onReset () {
      Object.assign(this.$data, this.$options.data.call(this))
    },
    // 事件 - 发送请求
    onRequest () {
      axios(this.data__.axiosConfig).then(res => {
        this.data__.response = res.data
      }).catch(e => {
        this.data__.response = `code - ${e.code}, msg - ${e.message}`
      })
    }    
  }
}
</script>

<style scoped>
  /deep/ .http-dialog .el-dialog__header {
    width: 50%;
    margin: auto;
  }

  /deep/ .http-dialog .el-dialog__body {
    width: 50%;
    margin: auto;
  }

  .params-box:not(:first-child) {
    margin-top: 40px;
  }
</style>