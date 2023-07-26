<template>
  <div class="screen">
    <!-- 顶部 -->
    <div
      :style="{
        height: '68px',
        width: '100%',
        backgroundImage: `url(${BgTopBoxUrl})`,
        backgroundSize: '100% 100%',
        backgroundRepeat: 'no-repeat',
        pointerEvents: 'auto',
        textAlign: 'center'
      }"
    >
      <span style="font-size: 32px; color: #fff;">threeJs可视化大屏</span>
    </div>

    <div style="height: calc(100% - 68px); display: flex; justify-content: space-between; padding: 40px 20px 20px 20px;">
      <!-- 左侧 -->
      <div class="screen-side">
        <Form1 />

        <Form2 />

        <Form3 />
      </div>

      <!-- 右侧 -->
      <div style="width: 400px; height: 100%;">
        <Form4 :data="props.data" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Form1 from './form1.vue'
  import Form2 from './form2.vue'
  import Form3 from './form3.vue'
  import Form4 from './form4.vue'
  import BgTopBoxUrl from "../../assets/images/bg-top-box.png";

  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })
</script>

<style scoped>
  .screen {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    pointer-events: none;
    z-index: 10;
  }

  .screen-side {
    width: 400px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
