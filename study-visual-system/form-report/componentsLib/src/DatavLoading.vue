/* 大屏加载动画组件 */
<template>
  <svg :width="width" :height="height" viewBox="0 0 50 50">
    <circle 
      cx="25" 
      cy="25" 
      fill="none" 
      :r="outRadius" 
      stroke="#409EFF" 
      stroke-linecap="round"
      :stroke-dasharray="outStrokeDasharray"
      :stroke-width="outStrokeWidth"
    >
      <animateTransform 
        attributeName="transform" 
        type="rotate"
        values="0 25 25; 360 25 25"
        :dur="`${outDur}s`"
        repeatCount="indefinite" 
      />
    </circle>
    <circle 
      cx="25" 
      cy="25" 
      fill="none" 
      :r="innerRadius" 
      stroke="#F56C6C" 
      stroke-linecap="round"
      :stroke-dasharray="innerStrokeDasharray" 
      :stroke-width="innerStrokeWidth" 
    >
      <animateTransform 
        attributeName="transform" 
        type="rotate"
        values="360 25 25; 0 25 25"
        :dur="`${innerDur}s`"
        repeatCount="indefinite" 
      />
    </circle>
  </svg>
  <slot></slot>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'datav-loading',
  props: {
    width: {
      type: Number,
      default: 150
    },
    height: {
      type: Number,
      default: 150
    },
    outDur: {
      type: Number,
      default: 2
    },
    innerDur: {
      type: Number,
      default: 2
    },
    outColor: {
      type: String,
      default: '#409EFF'
    }, 
    innerColor: {
      type: String,
      default: '#F56C6C'
    }, 
    outStrokeWidth: {
      type: Number,
      default: 2
    }, 
    innerStrokeWidth: {
      type: Number,
      default: 2
    }                      
  },
  setup (props) {
    const outRadius = computed(() => 25 - props.outStrokeWidth)  
    const innerRadius = computed(() => Math.round(outRadius.value / 2))  
    const outStrokeDasharray = computed(() => {
      let dash = Math.round(outRadius.value * 2 * 3.14 / 4)
      return `${dash} ${dash}`
    })  
    const innerStrokeDasharray = computed(() => {
      let dash = Math.round(innerRadius.value * 2 * 3.14 / 4)
      return `${dash} ${dash}`
    })       

    return {
      outRadius,
      innerRadius,
      outStrokeDasharray,
      innerStrokeDasharray
    }
  }
}
</script>
