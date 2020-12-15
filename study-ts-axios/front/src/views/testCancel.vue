<template>
  <el-card class="box-card">
    <el-collapse accordion>
      <el-collapse-item title="请求方法取消测试">
        <collapseItem  title="以axios静态对象形式取消请求" @click.native="test1" />
        <!-- <collapseItem  title="以配置回调形式取消请求" @click.native="test2" /> -->
      </el-collapse-item>
    </el-collapse>
  </el-card>
</template>

<script>
import axios from '@/lib/index'
import collapseItem from '@/components/CollapseItem/index'

export default {
  components: {
    collapseItem
  },
  methods: {
    test1 () {
      const CancelToken = axios.CancelToken
      const source = CancelToken.source()

      axios({
        url: '/dev/cancel',
        cancelToken: source.token
      }).catch(function(e) {
        if (axios.isCancel(e)) {
          console.log('Request has canceled', e.message)
        }
      })
      
      setTimeout(() => {
        // 取消请求
        source.cancel('Operation canceled by the user.')

        // 第二次进行相同请求
        axios({
          url: '/dev/cancel',
          cancelToken: source.token
        }).catch(function(e) {
          if (axios.isCancel(e)) {
            console.log(e.message)
          }
        })
      }, 100)
    },

    test2 () {
      let cancel

      axios({
        url: '/dev/cancel',
        cancelToken: new axios.CancelToken(c => {
          cancel = c
        })
      }).catch(function(e) {
        if (axios.isCancel(e)) {
          console.log('Request canceled')
        }
      })

      setTimeout(() => {
        cancel()
      }, 200)     
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