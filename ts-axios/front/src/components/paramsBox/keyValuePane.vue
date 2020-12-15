/* 键值对添加模式 */
<template>
  <el-card class="params-box">
    <el-table :data="tableData" style="width: 100%">
      <!-- 通用栏 -->
      <el-table-column v-for="(item, index) in column" :key="index" v-bind="item">
        <template slot-scope="scope">
          <el-input v-model="scope.row[item.prop]" placeholder="输入参数"></el-input>
        </template>        
      </el-table-column>
      <!-- 操作栏 -->
      <el-table-column prop="action" label="操作栏">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="onDeleteOneRow(scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- append栏 -->
    <div style="margin-top: 20px; margin-left: 10px;">
      <el-button size="small" type="primary" @click="onAddOneRow">添加一行</el-button>
      <el-button size="small" type="warning"  @click="onDeleteAllRow">全部删除</el-button>
    </div>    
  </el-card>    
</template>

<script>
  import { objectToArray, arrayToObject } from './utils'

  export default {
    props: {
      // 表头
      column: {
        type: Array,
        default: () => [
          { label: '参数名称', prop: 'key' },
          { label: '参数值', prop: 'value' }
        ]
      },
      // 数据源
      value: {
        type: Object,
        default: () => ({})
      }
    },
    data () {
      return {
        tableData: objectToArray(this.value)
      }
    },
    watch: {
      tableData: {
        handler (newVal) {
          if (JSON.stringify(newVal) === JSON.stringify(objectToArray(this.value))) {
            return
          }
          this.$emit('input', arrayToObject(newVal))
        },
        deep: true
      },
      value: {
        handler (val) {
          if (JSON.stringify(objectToArray(val)) === JSON.stringify(this.tableData)) {
            return
          }
          this.tableData = objectToArray(val)
        },
        deep: true
      }      
    },
    methods: {
      // 事件 - 添加一行
      onAddOneRow () {
        this.tableData.push({ key: '', value: '' })
      },
      // 事件 - 删除一行
      onDeleteOneRow (index) {
        this.tableData.splice(index, 1)
      },
      // 事件 - 删除所有
      onDeleteAllRow () {
        this.tableData = []
      }
    }
  }
</script>

<style scoped>
  /deep/ .el-table__append-wrapper {
    padding: 20px 20px;
  }

  /deep/ .el-table__empty-block {
    display: none;
  }
</style>