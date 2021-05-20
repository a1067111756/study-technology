/* 业务组件 - 专栏 */
<template>
  <div class="components-column-list__container">
    <p class="clc-title">发现精彩</p>
    <section class="clc-list__wrapper inline-grid grid-cols-3 gap-x-10 gap-y-10">
      <div v-for="item in value" :key="item.id" class="clc-list-item">
        <img :src="item.avatar">
        <p>{{ item.title }}</p>
        <p>{{ item.descricption }}</p>
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
  .clc-title {
    @apply text-black text-18px;
  }

  .clc-list-item {
    img {
      @apply w-50px h-50px rounded-full;
    }
  }
</style>
