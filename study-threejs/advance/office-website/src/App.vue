<template>
  <!-- 滚动视图 -->
  <ScrollFullPage>
    <Page1 />
    <Page2 />
    <Page3 />
    <Page4 />
    <Page5 />
    <Page6 />
    <Page7 />
  </ScrollFullPage>
</template>

<script setup lang="ts">
  import Page1 from './views/Page1.vue'
  import Page2 from './views/Page2.vue'
  import Page3 from './views/Page3.vue'
  import Page4 from './views/Page4.vue'
  import Page5 from './views/Page5.vue'
  import Page6 from './views/Page6.vue'
  import Page7 from './views/Page7.vue'
  import ScrollFullPage from './components/ScrollFullPage.vue';
</script>

<style lang="scss">
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
    height: 100% !important;
    width: 100% !important;
    margin: 0;
    padding: 0;
    background-color: #cbe0e0;
  }

  p {
    margin: 0;
  }

  .fp-watermark {
    display: none;
  }
</style>
