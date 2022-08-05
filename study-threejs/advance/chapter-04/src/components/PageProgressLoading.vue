/* 页面loading */
<template>
  <div class="page-progress-loading__container">
    <div class="page-progress-loading__text-container">
      <div style="font-size: 60px">{{ progress }}%</div>
      <div style="margin-top: 20px; font-size: 14px; letter-spacing: 4px;">LOADING</div>
    </div>
    <div id="page-progress-loading__spin-container"></div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, onMounted, nextTick } from 'vue'

  // props
  defineProps({
    progress: {
      type: Number,
      default: 0
    }
  })

  // 方法 - 创建加载动画
  const initLoadingAnimate = () => {
    const numberOfDots = 60
    let isFirstAction = true

    // 创建原点小球
    function createDots() {
      const spinner = document.getElementById('page-progress-loading__spin-container');

      for (let i = 0; i < numberOfDots; i++) {
        const arm = document.createElement('div');
        const dot = document.createElement('div');
        arm.className = 'arm';
        dot.className = 'dot';
        arm.appendChild(dot);
        spinner.appendChild(arm);
      }
    }

    // 设置原点小球的运动动画
    function loader() {
      const arms = document.getElementsByClassName('arm');
      for (let i = 0, len = arms.length; i < len; i++) {
        const armRotation = Math.floor(Math.random() * 541) + 20;
        const armTransition = Math.floor(Math.random() * 6) + 3;
        arms[i].style.transform = 'rotate(' + armRotation + 'deg)';
        arms[i].style.transition = armTransition + 's ease-out';
      }
    }

    // 循环更新动画
    function loop () {
      const randomNumber = isFirstAction ? 0 : Math.floor(Math.random() * 4001) + 1000;
      setTimeout(function() {
        isFirstAction = false
        loader()
        loop()
      }, randomNumber)
    }

    createDots()
    loop()
  }

  // 生命周期 - 挂载
  onMounted(() => {
    initLoadingAnimate()
  })
</script>

<style scoped>
  .page-progress-loading__container {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #000000;
    color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #page-progress-loading__spin-container {
    width: 300px;
    height: 300px;
    margin: auto;
    position: absolute;
  }

  .page-progress-loading__text-container {
    text-align: center
  }

  .animate {
    animation: animate .4s linear forwards;
  }

  @keyframes animate {
    to {
      margin-bottom: 20px;
    }
  }
</style>

<style>
  #page-progress-loading__spin-container .arm {
    overflow: hidden;
    position: absolute;
    left: calc(50% - 3px);
    bottom: 50%;
    height: 50%;
    width: 6px;
    margin: auto;
    transform-origin: center bottom;
  }

  #page-progress-loading__spin-container .dot {
    width: 6px;
    height: 6px;
    opacity: .8;
    border-radius: 100px;
    background: #ffffff;
  }
</style>