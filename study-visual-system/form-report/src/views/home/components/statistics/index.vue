<template>
  <section class="statistics-container">
    <el-card shadow="always">
      <template #header>
        <div class="header-wrapper">
          <!-- 统计切换面板 -->
          <el-tabs v-model="activeName">
            <el-tab-pane label="销售额" name="first"></el-tab-pane>
            <el-tab-pane label="访问量" name="second"></el-tab-pane>
          </el-tabs>

          <!-- 时间切换面板 -->
          <div>
            <el-button-group  class="el-button-group-wrapper">
              <el-button type="text">今日</el-button>
              <el-button type="text">本周</el-button>
              <el-button type="text">本月</el-button>
              <el-button type="text">本年</el-button>
            </el-button-group>        

            <el-date-picker
              size="small"
              style="width: 250px"
              v-model="dataValue"
              type="daterange"
              range-separator="~"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
        </div>
      </template>

      <template #default>
        <!-- 销售排行榜 -->
        <el-row :gutter="80" style="">
          <el-col :span="16">
            <v-chart :options="miniBar.options" :dataSource="miniBar.dataSource" :height="320" />
          </el-col>
          <el-col :span="8">
            <leader-board></leader-board>
          </el-col>
        </el-row>
      </template>
    </el-card>
  </section>
</template>

<script>
import LeaderBoard from './LeaderBoard'
import BarConfig from '@/plugins/vue-echarts/config/bar'

export default {
  components: {
    LeaderBoard
  },
  data () {
    return {
      activeName: 'first',
      dataValue: undefined,
      miniBar: {
        options: BarConfig.options,
        dataSource: {
          xLabel: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          data: [262, 352, 1119, 391, 653, 663, 1147, 892, 811, 926, 900, 1194]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .statistics-container {
    margin-top: 40px;
    .header-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  .el-card {
    /deep/ .el-card__header {
      padding: 0 32px;
    }

    /deep/ .el-card__body {
      padding: 32px;
    }    
  }

  .el-button-group-wrapper {
    padding-right: 24px;
    .el-button {
      font-size: 14 px;
    }

    .el-button+.el-button {
      margin-left: 24px;
    }
  }

  .el-tabs {
    /deep/ .el-tabs__header {
      padding: 0;
      margin: 0;
      ::after {
        display: none;
      }
      .el-tabs__item {
        color: rgba(0, 0, 0, .65);
        font-size: 16px;
        height: 50px;
        margin-top: 10px;
        &:hover {
          color: #409EFF;
        }  
        &.is-active {
          color: #409EFF;
        }              
      }
    }
  }
</style>
