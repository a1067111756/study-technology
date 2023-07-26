<template>
  <div id="canvas"></div>

  <Screen :data="mockData" />
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import initThree from './lib/init'
  import Screen from './components/screen/index.vue'
  import IconDianli from "./assets/images/icon-dianli.png";
  import IconFire from "./assets/images/icon-fire.png";
  import IconJingcha from "./assets/images/icon-jingcha.png";

  const mockData = [
    {
      type: '治安',
      time: '15:11:45',
      desc: '存在电力泄露，需要派人尽快修复，恢复电力使用，保证生活用电',
      icon: IconJingcha,
      x: -0.45,
      y: 0.13,
      z: 0.4
    },
    {
      type: '火警',
      time: '17:11:45',
      desc: '发生火灾，请联系消防部门',
      icon: IconFire,
      x: 0,
      y: 0.1,
      z: 0.2
    },
    {
      type: '电力',
      time: '18:11:45',
      desc: '存在安全隐患，需要派人排除隐患',
      icon: IconDianli,
      x: -0.1,
      y: 0.1,
      z: -0.2
    }
  ]

  onMounted(() => {
    initThree(mockData)
  })
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height: 100%;
    width: 100%;
  }

  html, body {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }
</style>
