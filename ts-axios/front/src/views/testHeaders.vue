<template>
  <el-card class="box-card">
    <el-collapse accordion>
      <el-collapse-item title="headers测试">
        <collapseItem  title="设置Content-Type" @click.native="setContentType" />
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
    setContentType () {
      this.$bus.emit('http-dialog:open', {
        method: 'post',
        url: '/base/post',
        headers: {
          'content-type': 'application/json;'
        },
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