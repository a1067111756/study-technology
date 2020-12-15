<template>
  <el-card class="box-card">
    <el-collapse accordion>
      <el-collapse-item title="params测试">
        <collapseItem  title="数组参数" @click.native="paramsIsArrayTest" />
        <collapseItem  title="对象参数" @click.native="paramsIsObjectTest" />
        <collapseItem  title="Date参数" @click.native="paramsIsDateTest" />
        <collapseItem  title="空值参数" @click.native="paramsHasNull" />
        <collapseItem  title="url哈希标记参数" @click.native="paramsHasHash" />
        <collapseItem  title="带有特殊字符参数" @click.native="paramsHasSpaceChar" />
        <collapseItem  title="url带参数" @click.native="urlHasParams" />
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
    paramsIsArrayTest () {
      this.$bus.emit('http-dialog:open', { 
        method: 'get', 
        url: '/dev/params', 
        params: { 
          foo: ['1', '2'] 
        } 
      })
    },
    paramsIsObjectTest () {
      this.$bus.emit('http-dialog:open', { 
        method: 'get', 
        url: '/dev/params', 
        params: {
          foo: {
            a: 'aaaaaaaa',
            b: 'bbbbbbbb'
          }
        } 
      })
    },
    paramsIsDateTest () {
      this.$bus.emit('http-dialog:open', { 
        method: 'get', 
        url: '/dev/params', 
        params: {
          date: new Date() 
        }
      })
    },
    paramsHasNull () {
      this.$bus.emit('http-dialog:open', { 
        method: 'get', 
        url: '/dev/params', 
        params: {
          foo: 'bar',
          baz: null
        }
      })
    },
    paramsHasHash () {
      this.$bus.emit('http-dialog:open', { 
        method: 'get',
        url: '/dev/params#hash',
        params: {
          foo: 'bar'
        }
      })
    },
    paramsHasSpaceChar () {
      this.$bus.emit('http-dialog:open', { 
        method: 'get',
        url: '/dev/params',
        params: {
          foo: '@:$, '
        }
      })
    },
    urlHasParams () {
      this.$bus.emit('http-dialog:open', { 
        method: 'get',
        url: '/dev/params?foo=bar',
        params: {
          bar: 'baz'
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