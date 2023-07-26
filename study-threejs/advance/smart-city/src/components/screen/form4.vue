<template>
  <div
    :style="{
      height: '100%',
      width: '100%',
      backgroundImage: `url(${BgBoxUrl})`,
      backgroundSize: '100% 100%',
      backgroundRepeat: 'no-repeat',
      pointerEvents: 'auto'
    }"
  >
    <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
      <p class="title">事件列表统计</p>

      <div style="flex: 1; padding: 0 40px; display: flex; flex-direction: column; gap: 20px 0;">
        <div v-for="(item, index) in props.data" :key="index" style="font-size: 14px; color: #fff; cursor: pointer;">
          <div style="display: flex; align-items: center; justify-content: space-between;">
            <div style="display: flex; align-items: center;">
              <img :src="item.icon" style="width: 48px; height: 48px;" alt=""/>
              <p style="font-size: 24px; font-weight: bold; margin-left: 10px;">{{ item.name }}</p>
            </div>
            <p>15:11:45</p>
          </div>
          <p style="margin-top: 10px; margin-left: 10px;">{{ item.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import BgBoxUrl from '../../assets/images/bg-box2.png'

  const props = defineProps({
    data: {
      type: Array,
      default: () => []
    }
  })
</script>

<style scoped>
  .title {
    color: #fff;
    font-weight: bold;
    font-size: 15px;
    margin: 0;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
