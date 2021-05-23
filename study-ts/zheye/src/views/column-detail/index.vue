/* 专栏详情列表 */
<template>
  <div class="page-column-detail__container">
    <!-- 作者信息 -->
    <div class="pcd-header flex items-center">
      <img class="w-150px h-150px rounded-full" :src="authorInfo.avatar">
      <div class="ml-20px">
        <p class="text-24px">{{ authorInfo.name }}</p>
        <p class="text-16px text-[#6c757d] mt-15px leading-24px">{{ authorInfo.introduce }}</p>
      </div>
    </div>

    <!-- 专栏列表 -->
    <div class="pcd-list__wrapper mt-40px">
      <a-card hoverable class="pcd-list-item" :key="item.id" v-for="item in columnData">
        <p class="text-22px">{{ item.title }}</p>
        <div class="flex mt-20px">
          <img class="w-200px h-110px rounded" :src="item.image">
          <p class="text-16px text-[#6c757d] ml-20px leading-24px">{{ item.introduce }}</p>
        </div>
        <p class="text-16px text-[#6c757d] mt-20px">{{ item.time }}</p>
      </a-card>
    </div>
  </div>
</template>

<script>
import { reactive, defineComponent } from 'vue'

export default defineComponent({
  setup () {
    const authorInfo = reactive({
      name: '铺先生',
      avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg?x-oss-process=image/resize,m_pad,h_100,w_100',
      introduce: '酒店售货机，酒店经营，共享经济，新零售，共享数据线，关注灵趣科技，了解更多'
    })

    const columnData = reactive([
      {
        id: 0,
        title: '英语语法的第一个坑if从句，你掉进去了吗？（一）',
        image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5e912f4c7f24af242a382b8c.png?x-oss-process=image/resize,m_fill,h_110,w_200',
        introduce: '我在学校学语法的时候，最让我头疼的就是各种语法的专有名词，状语，同位语，动名词，动词分词，这些听上去很高大上的称谓到底是什么？这篇文章会分三次推送给，先从什么是状语说起，然后再深入聊聊if的正常语态和虚拟语态句型。 英语中最早学习的复杂句型…',
        time: '2020-08-21 19:20:00'
      },
      {
        id: 1,
        title: '五分钟入门英语语法可能吗？',
        image: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5e913eb3912836262645f30f.jpg?x-oss-process=image/resize,m_fill,h_110,w_200',
        introduce: '我在学校学语法的时候，最让我头疼的就是各种语法的专有名词，状语，同位语，动名词，动词分词，这些听上去很高大上的称谓到底是什么？这篇文章会分三次推送给，先从什么是状语说起，然后再深入聊聊if的正常语态和虚拟语态句型。 英语中最早学习的复杂句型…',
        time: '2020-08-21 19:20:00'
      }
    ])

    return { authorInfo, columnData }
  }
})
</script>

<style lang="postcss" scoped>
  .page-column-detail__container {
    @apply w-720px m-auto p-20px;
  }

  .pcd-list-item {
    @apply rounded mb-20px;
  }
</style>
