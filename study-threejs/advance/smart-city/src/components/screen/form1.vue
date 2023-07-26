<template>
  <div
    :style="{
      height: '250px',
      width: '100%',
      backgroundImage: `url(${BgBoxUrl})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      pointerEvents: 'auto'
    }"
  >
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
      <p class="title">接入ITO设备统计</p>

      <div style="flex: 1">
        <ChartBar
          :data="mockData"
          :merge-option="{
            color: ['#05ecef'],
            legend: {
              show: false,
            },
            grid: {
              top: 30,
              bottom: 35,
              right: 20
            },
            xAxis: {
              axisLine: {
                lineStyle: {
                  type: 'dashed',
                  color: 'rgba(144,147,153, 0.5)'
                }
              }
            },
            yAxis: {
              splitLine: {
                lineStyle: {
                  color: 'rgba(144,147,153, 0.5)'
                }
              }
            },
          }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BgBoxUrl from '../../assets/images/bg-box1.png'
  import ChartBar from './chart/components/ChartBar.vue'
  import { ref } from 'vue'

  const mockData = ref([
    { name: '智能路灯', value: 150 },
    { name: '智能监控', value: 15 },
    { name: '无人公交', value: 7 },
    { name: '智能停车位', value: 120 }
  ])
</script>

<style scoped>
  .title {
    color: #fff;
    text-align: left;
    font-weight: bold;
    font-size: 15px;
    margin: 0;
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 20px;
  }
</style>
