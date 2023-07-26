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
      <p class="title">治安事件统计</p>

      <div style="flex: 1">
        <ChartPie
          :data="mockData"
          :merge-option="option"
          :autoHover="true"
          :autoHoverOption="{ action: 'highlight' }"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BgBoxUrl from '../../assets/images/bg-box1.png'
  import ChartPie from './chart/components/ChartPie.vue'
  import { ref } from 'vue'

  const mockData = ref([
    { name: '已处理', value: 90 },
    { name: '未处理', value: 18 }
  ])

  const option = {
    color: ['#376AF3', '#36DFFF', '#4ad6a2', '#13ABDB', '#85f1de'],
    tooltip: {
      show: false
    },
    legend: {
      top: 'center',
      right: '10%',
      itemGap: 19,
      orient: 'vertical',
      textStyle: {
        color: '#fff',
        rich: {
          a: {
            width: 50,
            fontSize: 12
          },
          b: {
            color: '#fff',
            fontSize: 14
          },
          c: {
            color: '#fff',
            fontSize: 12
          }
        }
      },
      formatter: (category: any) => {
        const sum = mockData.value.reduce((acc, curr) => acc + curr.value, 0)
        const match = mockData.value.find(item => item.name === category)
        return `{a|${category}} {b|${(match.value / sum  * 100).toFixed(2)}}{c|%}`
      }
    },
    series: [
      {
        type: 'pie',
        center: ['30%', '50%'],
        radius: ['45%', '55%'],
        startAngle: 0,
        minAngle: 10,
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center',
          fontWeight: 'bold',
          formatter: (param: any) => {
            return [
              '{c|共计（个）}',
              `{a|${param.data.value}}`
            ].join('\n')
          },
          rich: {
            a: {
              fontSize: 22,
              lineHeight: 40,
              color: '#fff'
            },
            c: {
              color: '#fff',
              fontSize: 10
            }
          }
        },
        labelLine: {
          show: false
        }
      }
    ]
  }
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
