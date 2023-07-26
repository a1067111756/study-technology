<!-- 内部组件：基础组件容器，是其它组件的父包裹层
       1. 负责统一处理空状态、加载状态等数据切换状态
       2. 提供了默认loading样式，提供loadingOption属性修改loading样式，同时提供<slot name="loading" />插槽自定义加载状态
           :loadingOption="{
            // 加载文本
            text: '加载中',
            // 字体大小
            fontSize: '14px',
            // 文本颜色
            color: '#909399'
          }"
       3. 提供了默认empty样式，可通过<slot name="empty" />插槽自定义空状态
       4. 提供width、height控制容器宽高，默认自适应父布局宽高，最小高度、宽度100px
-->
<template>
  <div
    ref="chartBaseRef"
    style="position: relative;"
    :style="{
      width: chartBarWidth,
      height: chartBarHeight
    }"
  >
    <!-- 绘制容器 -->
    <div v-show="showChartCmp" style="width: 100%; height: 100%;">
      <slot />
    </div>

    <!-- 其它状态  -->
    <div style="position: absolute; left: 0; top: 0; width: 100%; height: 100%; pointer-events: none;">
      <!-- loading状态  -->
      <div v-if="showLoading" class="scree-chart-bar__loading" style="width: 100%; height: 100%;">
        <slot name="loading">
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; background-color: #fff;">
            <svg
              :style="{
                color: loadingOptionCmp.color,
                width: loadingOptionCmp.fontSize
              }"
              class="loading"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fill="currentColor" d="M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z" />
            </svg>

            <span :style="loadingOptionCmp" style="margin-left: 5px; line-height: 32px">
              {{ loadingOptionCmp.text }}
            </span>
          </div>
        </slot>
      </div>

      <!-- 空状态  -->
      <div v-else-if="showEmpty" class="scree-chart-bar__empty" style="width: 100%; height: 100%;">
        <slot name="empty">
          <div style="display: flex; align-items: center; justify-content: center; height: 100%; font-size: 14px; color: #909399;">
            暂无数据
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { ref, computed, onMounted } from 'vue'

  // emitter
  const emitter = defineEmits(['chartShow'])

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
    // 容器宽度
    width: {
      type: String,
      default: undefined
    },
    // 容器高度
    height: {
      type: String,
      default: undefined
    }
  })

  // refs
  const chartBaseRef = ref()

  // 生命周期 - 挂载
  onMounted(() => {
    computedChartBarWh()
  })
  /*------------------------------------------- 容器宽高相关 ------------------------------------------------*/
  // 容器宽度
  const chartBarWidth = ref(props.width || '100%')

  // 容器高度
  const chartBarHeight = ref(props.height || '100%')

  // 方法 - 计算容器宽高，当容器无宽高时设置最小宽高
  const computedChartBarWh = () => {
    const domWidth = getComputedStyle(chartBaseRef.value).width
    const domHeight = getComputedStyle(chartBaseRef.value).height

    if (domWidth === '0px') {
      chartBarWidth.value = 100 + 'px'
    }

    if (domHeight === '0px') {
      chartBarHeight.value = 100 + 'px'
    }
  }

  /*----------------------------------------- 容器控制状态相关 -----------------------------------------------*/
  // 计算属性 - 是否显示echarts绘制
  const showChartCmp = computed(() => {
    if (Array.isArray(props.data) && props.data.length > 0) {
      emitter('chartShow')
    }
    return Array.isArray(props.data) && props.data.length > 0
  })

  // 计算属性 - 是否显示loading状态
  const showLoading = computed(() => {
    return props.loading
  })

  // 计算属性 - 是否显示空状态
  const showEmpty = computed(() => {
    return !showChartCmp.value && !props.loading
  })

  // 计算属性 - 加载样式配置
  const loadingOptionCmp = computed(() => {
    return Object.assign(
      {},
      {
        // 加载文本
        text: '加载中',
        // 字体大小
        fontSize: '14px',
        // 文本颜色
        color: '#909399'
      },
      props.loadingOption
    )
  })
</script>

<style scoped>
  .loading {
    animation: loading-rotate 2s linear infinite;
    transform-origin: center;
  }

  @keyframes loading-rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
