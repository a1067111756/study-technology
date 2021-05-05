<template>
  <el-container>
    <el-main>
      <el-row :gutter="40">
        <!-- 测试连通 -->
        <el-col :span="6">
          <test-method></test-method>
        </el-col>
        
        <!-- params处理测试 -->
        <el-col :span="6">
          <test-params></test-params>
        </el-col>

        <!-- data处理测试 -->
        <el-col :span="6">
          <test-data></test-data>
        </el-col>

        <!-- header处理测试 -->
        <el-col :span="6">
          <test-headers></test-headers>
        </el-col>      
      </el-row>

      <el-row :gutter="40">
        <!-- error处理测试 -->
        <el-col :span="6">
          <test-error></test-error>
        </el-col>  

        <!-- 拦截器测试 -->
        <el-col :span="6">
          <test-interceptors></test-interceptors>
        </el-col>

       <!-- 默认配置测试 -->
        <el-col :span="6">
          <test-config></test-config>
        </el-col>

       <!-- 请求取消测试 -->
        <el-col :span="6">
          <test-cancel></test-cancel>
        </el-col>                       
      </el-row>

      <!-- http在线测试dialog -->
      <http-dialog></http-dialog>
    </el-main>
  </el-container>
</template>

<script>
import TestData from './testData'
import TestMethod from './testMethod'
import TestParams from './testParams'
import TestHeaders from './testHeaders'
import TestError from './testError'
import TestConfig from './testConfig'
import testCancel from './testCancel'
import TestInterceptors from './testInterceptors'
import HttpDialog from '@/components/HttpDialog/index.vue'

export default {
  components: {
    TestData,
    TestError,
    testCancel,
    TestConfig,
    HttpDialog,
    TestMethod,
    TestParams,
    TestHeaders,
    TestInterceptors
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-col {
    padding: 10px 20px;
  }
</style>
