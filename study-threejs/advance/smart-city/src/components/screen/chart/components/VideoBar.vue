<template>
  <ChartBase v-bind="props">
    <!-- loading插槽 -->
    <template #loading>
      <slot name="loading" />
    </template>

    <!-- empty插槽 -->
    <template #empty>
      <slot name="empty" />
    </template>

    <!-- 内容插槽 -->
    <template #default>
      <div style="display: flex; height: 100%; gap: 20px;">
        <!-- 左侧播放 -->
        <div style="flex: 5; position: relative;">
          <img
            :src="currentItemCmp.thumbnail"
            alt=""
            object-fit="cover"
            style="width: 100%; height: 100%;"
          >

          <svg
            viewBox="0 0 1024 1024"
            style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 40px; height: 40px; color: #fff;"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z" />
          </svg>
        </div>

        <!-- 右侧列表 -->
        <div style="flex: 1; height: 100%; overflow-y: auto; display: flex; flex-direction: column; gap: 10px 20px">
          <div
            v-for="(item, index) in props.data"
            :key="index"
            style="position: relative;"
            @click="switchCurrentItem(item, index)"
          >
            <img
              :src="item.thumbnail"
              alt=""
              object-fit="cover"
              style="width: 100%; height: 80px;"
            >

            <svg
              viewBox="0 0 1024 1024"
              style="position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); width: 20px; height: 20px; color: #fff;"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="currentColor" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm0 832a384 384 0 0 0 0-768 384 384 0 0 0 0 768zm-48-247.616L668.608 512 464 375.616v272.768zm10.624-342.656 249.472 166.336a48 48 0 0 1 0 79.872L474.624 718.272A48 48 0 0 1 400 678.336V345.6a48 48 0 0 1 74.624-39.936z" />
            </svg>
          </div>
        </div>
      </div>
    </template>
  </ChartBase>
</template>

<script>
export default {
  name: 'GlobalVideoBar'
}
</script>

<script setup>
import ChartBase from './ChartBase.vue'
import {computed} from 'vue';

// props
const props = defineProps({
  // 数据
  data: {
    type: Array,
    default: undefined
  },
  // 加载动画
  loading: {
    type: Boolean,
    default: false
  },
  // 加载动画配置
  loadingOption: {
    type: Object,
    default: () => ({})
  },
  // 默认显示条目序号
  defaultIndex: {
    type: Number,
    default: 0
  }
})

/*-------------------------------------------- 选中条目相关 -----------------------------------------------*/
// 数据 - 当前选中的视频序号
const currentIndex = ref(props.defaultIndex)

// 计算属性 - 当前选中视频信息
const currentItemCmp = computed(() => {
  return props.data[currentIndex.value]
})

// 方法 - 切换选中条目
const switchCurrentItem = (item, index) => {
  currentIndex.value = index
}

/*-------------------------------------------- 视频操作相关 -----------------------------------------------*/
// 方法 - 播放
const play = () => {}

// 方法 - 暂停
const pause = () => {}
</script>

<style scoped>
</style>
