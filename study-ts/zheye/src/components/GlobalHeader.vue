<template>
  <div class="components-header__container">
    <!-- 标题 -->
    <p class="ch-title">{{ title }}</p>

    <!-- 用户登录状态 -->
    <div v-if="userInfo.isLogin" class="flex justify-center items-center">
      <img :src="userInfo.avatar" class="rounded-full">
      <p class="ml-15px text-white text-18px">{{ userInfo.name }}</p>
    </div>

    <!-- 用户未登录状态 -->
    <div v-else>
      <button class="btn-plain border-white text-white mr-10px hover:(bg-white text-black)">登录</button>
      <button class="btn-plain border-white text-white hover:(bg-white text-black)">注册</button>
    </div>    
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface UserProps {
  id?: Number,
  name?: String,
  avatar?: String,
  isLogin: Boolean
}

export default defineComponent({
  props: {
    title: {
      type: String,
      default: '者也专栏'
    },
    userInfo: {
      type: Object as PropType<UserProps>,
      required: true
    }
  }
})
</script>

<style lang="postcss" scoped>
  .components-header__container {
    @apply bg-blue-[#0d6efd] h-70px flex justify-between items-center px-70
  }

  .ch-title {
    @apply text-white text-20px
  }
</style>