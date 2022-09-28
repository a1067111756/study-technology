<!-- 全屏滚动组件 -->
<template>
  <!-- 滚动视图 -->
  <div ref="fullPageRef" style="height: 100%">
    <slot />
  </div>

  <!-- 侧边导航 -->
  <div class="component-slider-nav__container">
    <ul>
      <li
        v-for="(item, index) in navigation"
        :key="index"
        @click="onSwitch(index)"
      >
        <a href="#" :class="{ 'active': index === activeIndex }">
          <svg v-if="index === 0" class="home" viewBox="0 0 24 24">
            <path d="M0 0h24v24H0z" fill="none"></path><path fill="#047fa4" d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
          </svg>
          <span>{{ item }}</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script setup>
  import Rellax from 'rellax';
  import Skrollr from 'skrollr';
  import {ref, onMounted} from "vue";

  /* 右侧导航栏相关 */
  const navigation = ['Page1', 'Page2', 'Page3', 'Page4', 'Page5', 'Page6', 'Page7']
  const activeIndex = ref(0)
  const onSwitch = (index) => {
  }

  // 生命周期 - 挂载
  onMounted(() => {
    new Rellax('.rellax')
    Skrollr.init()
  })
</script>

<style lang="scss" scoped>
  .component-slider-nav__container {
    position: fixed;
    right: 30px;
    top: 50%;
    transform: translateY(-50%);
    ul {
      font-size: 0;
      > li {
        list-style-type: none;
        margin: 8px 0;
        cursor: pointer;

        &:nth-child(1) a:before {
          display: none;
        }

        .home {
          width: 14px;
          height: 14px;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        > a {
          display: inline-block;
          position: relative;
          width: 24px;
          height: 24px;
          box-sizing: border-box;

          &:hover {
            border-radius: 50%;
            border: 2px solid #047fa4;
            > span {
              visibility: visible;
              opacity: 1;
              transform: translateX(5px);
              transition: all 0.5s;
            }
          }

          &.active {
            border-radius: 50%;
            border: 2px solid #047fa4;
            > span {
              visibility: visible;
              opacity: 1;
              transform: translateX(5px);
              transition: all 0.5s;
            }
          }

          &:before {
            display: block;
            width: 8px;
            height: 8px;
            content: '';
            border-radius: 50%;
            background-color: #047fa4;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }

          > span {
            position: absolute;
            right: 35px;
            top: 3px;
            color: #047fa4;
            font-size: 14px !important;
            visibility: hidden;
            opacity: 0;
          }
        }
      }
    }
  }
</style>