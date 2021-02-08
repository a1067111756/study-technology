/* 大屏页面主容器 
   1. 实现容器缩放比固定
*/

<template>
  <div ref="datavContainer" class="page-datav__container">
    <slot></slot>
  </div>
</template>

<script>
import { ref, getCurrentInstance, onMounted } from 'vue'

export default {
  name: 'datavContainer',
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    let dom = null
    let context = null

    const width = ref(0)
    const height = ref(0)
    const originalWidth = ref(0)
    const originalHeight = ref(0)

    // 初始化组件宽高
    const initSize = () => {
      // 1. 获取组件宽高
      // 外部指定宽高
      if (props.options.width && props.options.height) {
        width.value = props.options.width
        height.value = props.options.height
      // 外部未指定宽高，则读取dom的宽高  
      } else {
        width.value = dom.clientWidth
        height.value = dom.clientHeight
      }

      // 2. 获取视口宽高
      originalWidth.value = window.screen.width
      originalHeight.value = window.screen.height

      console.log(width.value, height.value)
      console.log(originalWidth.value, originalHeight.value)
    }

    // 更新组件宽高
    const updateSize = () => {
      if (width.value && height.value) {
        dom.style.width = `${width.value}px`
        dom.style.height = `${height.value}px`
      } else {
        dom.style.width = `${originalWidth.value}px`
        dom.style.height = `${originalHeight.value}px`
      }
    }

    // 对组件宽高进行缩放
    const updateScale = () => {
      const widthScale = 1
      const heightScale = 1
      dom.style.tranform = `scale(${widthScale}, ${heightScale})`
    }

    onMounted(() => {
      context = getCurrentInstance().ctx
      dom = context.$refs['datavContainer']

      initSize()
      updateSize()
      updateScale()
    })
  }
}
</script>