/* 大屏页面主容器 
   1. 实现容器缩放比固定
*/

<template>
  <div ref="datavContainer" class="page-datav__container">
    <slot></slot>
  </div>
</template>

<script>
import { debounce } from '../utils/index'
import { ref, getCurrentInstance, onMounted, onUnmounted, nextTick } from 'vue'

export default {
  name: 'datavContainer',
  props: {
    options: {
      type: Object,
      default: () => {}
    }
  },
  setup (props) {
    let dom = null // 容器dom
    let context = null // 上下文

    const width = ref(0)
    const height = ref(0)
    const originalWidth = ref(0)
    const originalHeight = ref(0)

    // 初始化组件宽高
    const initSize = () => {
      // 1. 获取组件宽高 - 外部不指定宽高则获取屏幕宽高作为基数
      // 外部指定宽高
      if (props.options && props.options.width && props.options.height) {
        width.value = props.options.width
        height.value = props.options.height
      } 

      // 2. 获取屏幕宽高
      if (!originalWidth.value || originalHeight.value) {
        originalWidth.value = window.screen.width
        originalHeight.value = window.screen.height
      }
    }

    // 更新组件宽高（存在指定宽高 - 将dom宽高设置为指定宽高，不存在指定宽高 - 将dom宽高设置为屏幕宽高）
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
    // 原理 - 将容器组件从原宽高直接整体缩放到可是窗口宽高
    const updateScale = () => {      
      // 缩放前宽高
      const beforeScaleWidth = width.value || originalWidth.value
      const beforeScaleHeight = height.value || originalHeight.value

      // 缩放后宽高，浏览器可见视口宽高
      const afterScaleWidth = document.body.clientWidth 
      const afterScaleHeight = document.body.clientHeight

      // 缩放原理
      const widthScale = afterScaleWidth / beforeScaleWidth
      const heightScale = afterScaleHeight / beforeScaleHeight

      // 缩放
      dom.style.transform = `scale(${widthScale}, ${heightScale})`
    }

    const onResize = () => {
      updateSize()
      updateScale()
    }

    onMounted(() => {
      // 初始化变量
      context = getCurrentInstance().ctx
      dom = context.$refs['datavContainer']

      // 初始化尺寸
      initSize()
      updateSize()
      updateScale()
      
      // 监听窗口变化
      window.addEventListener('resize', debounce(50, onResize))
    })

    onUnmounted(() => {
      window.removeEventListener('resize', onResize)
    })
  }
}
</script>

<style lang="scss" scoped>
  .page-datav__container {
    position: fixed;
    top: 0;
    left: 0;
    overflow: hidden;
    transform-origin: left top;
  }
</style>