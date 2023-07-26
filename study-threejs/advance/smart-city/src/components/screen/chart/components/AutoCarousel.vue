<template>
  <ChartBase v-bind="props" @chartShow="reset">
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
      <vueSeamlessScroll
        ref="seamlessScrollRef"
        :data="props.data"
        :class-option="props.scrollOption"
        :singleHeight="30"
        class="scree-auto-carousel__container"
        v-on="$listeners"
      >
        <ul class="scree-auto-carousel__ul">
          <li
            v-for="(item, index) in props.data"
            :key="index"
            class="scree-auto-carousel__li"
          >
            <slot :row="item" />
          </li>
        </ul>
      </vueSeamlessScroll>
    </template>
  </ChartBase>
</template>

<script>
export default {
  name: 'GlobalAutoCarousel'
}
</script>

<script setup>
import { ref, nextTick } from 'vue'
import ChartBase from './ChartBase.vue'
import vueSeamlessScroll from 'vue-seamless-scroll'

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
  scrollOption: {
    type: Object,
    default: () => ({})
  }
})

// refs
const seamlessScrollRef = ref()

// 方法 - 重置轮播
// 主要是解决，vue-seamless-scroll使用v-show,v-if情况下获取dom高度为0导致轮播失效问题
const reset = () => {
  nextTick(() => {
    seamlessScrollRef.value._cancle()
    seamlessScrollRef.value._initMove()
  })

}
</script>

<style scoped>
.scree-auto-carousel__container {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

.scree-auto-carousel__ul {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  /*!* 优化大数据量显示 *!*/
  /*content-visibility: auto;*/
  /*!* 优化滚动卡顿，启用GPU渲染 *!*/
  will-change: transform;
}
</style>
