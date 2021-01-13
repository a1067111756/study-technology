<template>
  <section class="analysis-container">
    <el-row :gutter="20">
      <el-col :span="6">
        <analysis-pane title="总销售额" total="￥ 189,345">
          <div class="ratio">
            <span>同周比 12%</span>
            <span class="triangle-up" style="top: -10px; left: 5px;"></span>
            <span style="margin-left: 20px;">日环比 11%</span>
            <span class="triangle-down" style="border-top-color: #52C41A; bottom: -11px; left: 5px;"></span>
          </div>
        </analysis-pane>
      </el-col>

      <el-col :span="6">
        <analysis-pane title="访问量" total="8,864">
          <v-chart :options="miniLine.options" :dataSource="miniLine.dataSource" />
        </analysis-pane>
      </el-col>

      <el-col :span="6">
        <analysis-pane title="支付笔数" total="6,560">
          <v-chart :options="miniBar.options" :dataSource="miniBar.dataSource" />
        </analysis-pane>
      </el-col>

      <el-col :span="6">
        <analysis-pane title="运营活动效果" total="70%">
          <v-chart :options="miniProgress.options" :dataSource="miniProgress.dataSource" />
        </analysis-pane>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import AnalysisPane from './analysis-pane'
import miniBarConfig from '@/plugins/vue-echarts/config/miniBar'
import miniLineConfig from '@/plugins/vue-echarts/config/miniLine'
import miniProgressConfig from '@/plugins/vue-echarts/config/miniProgress'

export default {
  components: {
    AnalysisPane
  },
  data () {
    return {
      miniLine: {
        options: miniLineConfig.options,
        dataSource: {
          data: [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]
        }
      },
      miniBar: {
        options: miniBarConfig.options,
        dataSource: {
          data: [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5]
        }
      },
      miniProgress: {
        options: miniProgressConfig.options,
        dataSource: {
          data: [
            { data: [80], itemStyle: { color: '#13C2C2' } },
            { data: [120], itemStyle: { color: '#F5F5F5' } },
            {
              data: [80],
              type: 'custom',
              renderItem: (params, api) => {
                const value = api.value(0)
                const endPoint = api.coord([value, 0])
                return {
                  type: 'group',
                  position: endPoint,
                  children: [
                    {
                      type: 'path',
                      shape: {
                        d: 'M1024 255.966 511.971 767.909 0 255.996 1024 255.966z',
                        x: -5,
                        y: -20,
                        width: 10,
                        height: 10
                      },
                      style: {
                        fill: '#13C2C2',
                        layout: 'cover'
                      }
                    },
                    {
                      type: 'path',
                      shape: {
                        d: 'M0 767.909l512.029-511.913L1024 767.909 0 767.909z',
                        x: -5,
                        y: 8,
                        width: 10,
                        height: 10
                      },
                      style: {
                        fill: '#13C2C2',
                        layout: 'cover'
                      }
                    }
                  ]
                }
              }
            }
          ]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .ratio {
    font-size: 14px;
    color: rgba(0, 0, 0, .65);
  }
</style>
