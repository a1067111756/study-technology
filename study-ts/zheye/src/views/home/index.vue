<template>
  <div class="page-home__container w-full px-96">
    <column-list v-bind:value="ColumnList"></column-list>
  </div>
</template>

<script lang="ts">
import ColumnList from './ColumnList.vue'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  components: { ColumnList },
  setup (props) {
    const ColumnList = ref([
      {
        id: '0',
        title: '铺先生',
        link: 'http://zhihu.vikingship.xyz/column/5f3e86d62c56ee13bb83096c',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
        descricption: '酒店售货机，酒店经营，共享经济，新零售，共享数据线，关注灵趣科技，了解更多'
      },
      {
        id: '1',
        title: 'Vehicle攻城狮',
        link: 'http://zhihu.vikingship.xyz/column/5f3e86d62c56ee13bb83096b',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
        descricption: '半吊子系统和程序狗，沉迷高端理论，日渐消瘦。'
      },
      {
        id: '2',
        title: '我不是鞋神',
        link: 'http://zhihu.vikingship.xyz/column/5f4db92abb821789a5490ed3',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41b8b7d9c60b68cdd1ef.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
        descricption: 'Vue is a progressive framework for building user interfaces. The core library is focused on the view layer only'
      },
      {
        id: '3',
        title: '我不是鞋神',
        link: 'http://zhihu.vikingship.xyz/column/5f4db92abb821789a5490ed3',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41b8b7d9c60b68cdd1ef.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
        descricption: 'Vue is a progressive framework for building user interfaces. The core library is focused on the view layer only'
      },
      {
        id: '4',
        title: '我不是鞋神',
        link: 'http://zhihu.vikingship.xyz/column/5f4db92abb821789a5490ed3',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41b8b7d9c60b68cdd1ef.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
        descricption: 'Vue is a progressive framework for building user interfaces. The core library is focused on the view layer only'
      },
      {
        id: '5',
        title: '我不是鞋神',
        link: 'http://zhihu.vikingship.xyz/column/5f4db92abb821789a5490ed3',
        avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41b8b7d9c60b68cdd1ef.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
        descricption: 'Vue is a progressive framework for building user interfaces. The core library is focused on the view layer only'
      }
    ])

    return { ColumnList }
  }
})
</script>
