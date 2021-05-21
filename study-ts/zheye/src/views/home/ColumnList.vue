/* 业务组件 - 专栏 */
<template>
  <div class="components-column-list__container">
    <p class="ccl-title">发现精彩</p>
    <section class="clc-list__wrapper">
      <div v-for="item in value" :key="item.id" class="clc-list-item">
        <img :src="item.avatar">
        <p>{{ item.title }}</p>
        <p>{{ item.descricption }}</p>
        <button class="btn-plain hover:(bg-[#0d6efd] text-white)">进入专栏</button>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface ColumnListProps {
  id: number,
  title: String,
  link: String,
  avatar: String,
  descricption: String
}

export default defineComponent({
  name: 'ColumnList',
  props: {
    value: {
      type: Array as PropType<ColumnListProps[]>,
      required: true
    }
  },
  setup (props) {
  }
})
</script>

<style lang="postcss" scoped>
  .ccl-title {
    @apply text-center text-black text-24px font-bold my-20px;
  }

  .clc-list__wrapper {
    @apply inline-grid grid-cols-3 gap-x-10 gap-y-10;
  }

  .clc-list-item {
    @apply flex flex-col items-center p-16px shadow rounded border-1 border-[rgba(0,0,0,.125)] border-solid;
    img {
      @apply mt-10px w-50px h-50px rounded-full
    }
    p:nth-of-type(1) {
      @apply my-20px text-1.25rem text-[#212529] font-medium;
    }
    p:nth-of-type(2) {
      @apply text-17px text-[#6c757d] leading-5 h-80px;
    }
  }
</style>
