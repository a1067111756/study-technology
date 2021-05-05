<template>
  <el-card class="box-card">
    <el-collapse accordion>
      <el-collapse-item title="data测试">
        <collapseItem  title="data参数为对象" @click.native="dataIsObjectTest" />
        <collapseItem  title="data参数为BodyInit" @click.native="dataIsBodyInit" />
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
    dataIsObjectTest () {
      this.$bus.emit('http-dialog:open', {
        method: 'post',
        url: '/dev/data',
        data: {
          bar: 'baz',
          a: 'aaaa',
          b: 'bbbb'
        }
      })
    },
    dataIsBodyInit () {
      const arr = new Int32Array([21, 31])
      this.$bus.emit('http-dialog:open', {
        method: 'post',
        url: '/dev/data',
        data: arr
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