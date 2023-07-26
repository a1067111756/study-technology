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
      <p class="title">城市电力能耗统计</p>

      <div style="flex: 1">
        <ChartLine
          :data="mockData"
          :merge-option="{
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
  import ChartLine from './chart/components/ChartLine.vue'
  import { ref } from 'vue'

  const mockData = ref([
    { name: '04-05', value: 50 },
    { name: '04-06', value: 68 },
    { name: '04-07', value: 75 },
    { name: '04-09', value: 42 },
    { name: '04-10', value: 66 },
    { name: '04-11', value: 120 },
    { name: '04-12', value: 70 },
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
