<template>
  <el-card class="box-card">
    <el-collapse accordion>
      <el-collapse-item title="error测试">
        <collapseItem  title="网络错误测试" @click.native="errorNetWorkTest" />
        <collapseItem  title="超时错误测试" @click.native="errorTimeOutTest" />
        <collapseItem  title="状态码错误测试" @click.native="errorStatusCodeTest" />
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
import collapseItem from '@/components/CollapseItem/index'

export default {
  components: {
    collapseItem
  },
  methods: {
    errorNetWorkTest () {
      this.$bus.emit('http-dialog:open', {
        method: 'post',
        url: '/dev/error/network'
      })
    },
    errorTimeOutTest () {
      this.$bus.emit('http-dialog:open', {
        method: 'post',
        url: '/dev/error/timeout',
        timeout: 3000
      })
    },
    errorStatusCodeTest () {
      this.$bus.emit('http-dialog:open', {
        method: 'post',
        url: '/dev/error/statusCode'
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