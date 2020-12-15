<template>
  <div class="home-page-container">
    <!-- 分析模块 -->
    <Analysis></Analysis>

    <!-- 统计模块 -->
    <Statistics></Statistics>

    <!-- 地图模块 -->
    <Map></Map>
  </div>
</template>

<script>
import Map from './components/map'
import Analysis from './components/analysis'
import Statistics from './components/statistics'

export default {
  name: 'Home',
  components: {
    Map,
    Analysis,
    Statistics
  }
}
</script>

<style lang="scss" scoped>
  .home-page-container {
    padding: 80px;
  }
</style>
