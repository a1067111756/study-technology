<template>
  <el-card class="box-card">
    <el-collapse accordion>
      <el-collapse-item title="默认配置测试">
        <collapseItem  title="timeout配置修改测试" @click.native="setTimeoutConfig" />
        <collapseItem  title="accept配置修改测试" @click.native="setTimeoutConfig" />
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
    setTimeoutConfig () {
      axios.defaults.headers.common['test2'] = 123
      axios.defaults.timeout = 5000

      axios({
        method: 'post',
        url: '/base/post',
        data: {
          a: 1,
          b: 2
        }
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