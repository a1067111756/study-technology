<template>
  <el-card class="box-card">
    <el-collapse accordion>
      <el-collapse-item title="拦截器测试">
        <collapseItem  title="请求拦截器" @click.native="putTest" />
        <collapseItem  title="响应拦截器" @click.native="putTest" />
        <collapseItem  title="请求/响应拦截器" @click.native="putTest" />
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
import axios from '../lib/index'
import collapseItem from '@/components/CollapseItem/index'

export default {
  components: {
    collapseItem
  },
  methods: {
    putTest () {
      axios.interceptors.request.use(config => {
        config.headers.test += '1'
        return config
      })
      axios.interceptors.request.use(config => {
        config.headers.test += '2'
        return config
      })
      axios.interceptors.request.use(config => {
        config.headers.test += '3'
        return config
      })

      axios.interceptors.response.use(res => {
        res.data.test = '1'
        console.log(res)
        return res
      })
      let interceptor = axios.interceptors.response.use(res => {
        res.data.test += '2'
        return res
      })
      axios.interceptors.response.use(res => {
        res.data.test += '3'
        return res
      })

      axios.interceptors.response.eject(interceptor)

      axios({
        url: '/dev/method',
        method: 'get',
        headers: {
          test: ''
        }
      }).then((res) => {
        console.log(res.data)
      })      
    }
  }
}
</script>

<style scoped>
  .el-collapse {
    border: none;
  }

  /deep/ .el-collapse-item__header {
    border: none;
    font-size: 16px;
    font-weight: bold;
  }

  /deep/ .el-collapse-item__wrap {
    border: none;
  }

  /deep/ .el-collapse-item__content {
    font-size: 16px;
  } 
</style>