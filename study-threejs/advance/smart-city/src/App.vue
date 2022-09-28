<template>
  <div id="canvas"></div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue'
  import initThree from './lib/init'

  onMounted(() => {
    initThree()
  })
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
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
</style>
