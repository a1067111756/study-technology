<template>
  <el-card class="box-card">
    <el-collapse accordion>
      <el-collapse-item title="请求方法测试">
        <collapseItem  title="默认请求" @click.native="getTest" />
        <collapseItem  title="get" @click.native="getTest" />
        <collapseItem  title="post" @click.native="postTest" />
        <collapseItem  title="delete" @click.native="getTest" />
        <collapseItem  title="head" @click.native="getTest" />
        <collapseItem  title="options" @click.native="getTest" />
        <collapseItem  title="put" @click.native="getTest" />
        <collapseItem  title="patch" @click.native="getTest" />
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
    getTest () {
      this.$bus.emit('http-dialog:open', { method: 'get', url: '/dev/method' })
    },
    postTest () {
      this.$bus.emit('http-dialog:open', { method: 'post', url: '/dev/method' })
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