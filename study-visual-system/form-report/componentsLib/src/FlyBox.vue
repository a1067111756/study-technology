/* 大屏流星动画框
  1. 不设置宽高，默认自适应父容器
  2. 设置宽高，固定宽高
*/
<template>
  <div 
    ref="fly-box" 
    class="fly-box__container" 
    :style="{ width: width ? width + 'px' : '100%', height: height ? height + 'px' : '100%'  }">
    <!-- 流星动画 -->
    <svg :width="containerWidth" :height="containerHeight">
      <defs>
        <radialGradient
          id="radialGradient"
          cx="50%"
          cy="50%"
          fx="100%"
          fy="50%"
          r="50%"
        >
          <stop 
            :key="index"
            v-for="(item, index) in radialGradient"  
            :offset="item.offset" 
            :stop-color="item.color" 
            :stop-opacity="item.opacity" />
        </radialGradient>
        <path 
          id="fly-path"
          :d="path"
          fill="none"
        />
        <mask id="mask">
          <circle cx="0" cy="0" :r="strokeLength" fill="url(#radialGradient)">
            <animateMotion 
              dur="5s" 
              rotate="auto"
              repeatCount="indefinite"
              :path="path" 
            />
          </circle>
        </mask>      
      </defs>
      <use
        href="#fly-path"
        :stroke="strokeColor"
        :stroke-width="strokeWidth" 
        mask="url(#mask)"
      />    
    </svg>

    <!-- 内容框 -->
    <div class="fly-box__content" :style="{ padding: strokeWidth + 5 + 'px' }">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, getCurrentInstance } from 'vue'

export default {
  name: 'fly-box',
  props: {
    width: {
      type: Number,
      default: undefined
    },
    height: {
      type: Number,
      default: undefined
    },    
    strokeWidth: {
      type: Number,
      default: 3
    },
    strokeLength: {  
      type: Number,
      default: 40      
    },
    strokeColor: {  
      type: String,
      default: '#4fd2dd'     
    },    
    radialGradient: {
      type: Array,
      default: [
        {
          offset: '0%',
          color: '#409EFF',
          opacity: 1
        },
        {
          offset: '100%',
          color: '#F56C6C',
          opacity: 0
        }
      ]        
    }
  },
  setup (props) {
    const containerWidth = ref(0)
    const containerHeight = ref(0)
    const path = computed(() => `
      M ${props.strokeWidth / 2 + 1} ${props.strokeWidth / 2 + 1} 
      L ${containerWidth.value - props.strokeWidth / 2 - 1} ${props.strokeWidth / 2 + 1} 
      L  ${containerWidth.value - props.strokeWidth / 2 - 1}  ${containerHeight.value - props.strokeWidth / 2 - 1} 
      L ${props.strokeWidth / 2 + 1}  ${containerHeight.value - props.strokeWidth / 2 - 1} Z
    `)

    onMounted(() => {
      const instance = getCurrentInstance()
      const dom = instance.ctx.$refs['fly-box']
      containerWidth.value = dom.clientWidth
      containerHeight.value = dom.clientHeight
    })

    return {
      path,
      containerWidth,
      containerHeight
    }
  }
}
</script>

<style lang="scss" scoped>
  .fly-box__container {
    width: 100%;
    height: 100%;
    position: relative;

    svg {
      position: absolute;
      left: 0;
      top: 0;    
    }

    .fly-box__content {
      width: 100%;
      height: 100%;
    }
  }
</style>