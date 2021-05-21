<template>
  <global-header :user-info="userInfo"></global-header>
  <div class="page-home__container w-full px-74">
    <column-list :value="columnList"></column-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import ColumnList, { ColumnListProps } from "./ColumnList.vue";
import GlobalHeader, { UserProps } from "../../components/GlobalHeader.vue";

const UserInfoData: UserProps = {
  id: 1515815,
  name: '澄鱼',
  avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
  isLogin: false
}

const columnListData: ColumnListProps[] = [
  {
    id: 0,
    title: "铺先生",
    link: "http://zhihu.vikingship.xyz/column/5f3e86d62c56ee13bb83096c",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg?x-oss-process=image/resize,m_pad,h_50,w_50",
    descricption:
      "酒店售货机，酒店经营，共享经济，新零售，共享数据线，关注灵趣科技，了解更多",
  },
  {
    id: 1,
    title: "Vehicle攻城狮",
    link: "http://zhihu.vikingship.xyz/column/5f3e86d62c56ee13bb83096b",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e3a17c305b1070f455202.jpg?x-oss-process=image/resize,m_pad,h_50,w_50",
    descricption: "半吊子系统和程序狗，沉迷高端理论，日渐消瘦。",
  },
  {
    id: 2,
    title: "我不是鞋神",
    link: "http://zhihu.vikingship.xyz/column/5f4db92abb821789a5490ed3",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41b8b7d9c60b68cdd1ef.jpg?x-oss-process=image/resize,m_pad,h_50,w_50",
    descricption:
      "Vue is a progressive framework for building user interfaces. The core library is focused on the view layer only",
  },
  {
    id: 3,
    title: "爱生活爱眼睛",
    link: "http://zhihu.vikingship.xyz/column/5f4db92abb821789a5490ed3",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41b8b7d9c60b68cdd1ef.jpg?x-oss-process=image/resize,m_pad,h_50,w_50",
    descricption: "愿你有一颗热爱生活的心和一双不老的眼睛！",
  },
  {
    id: 4,
    title: "资料与资讯",
    link: "http://zhihu.vikingship.xyz/column/5f4db92abb821789a5490ed3",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41b8b7d9c60b68cdd1ef.jpg?x-oss-process=image/resize,m_pad,h_50,w_50",
    descricption: "鞋神号： sunmen123123",
  },
  {
    id: 5,
    title: "CATTI和MTI考研考试资料与资讯",
    link: "http://zhihu.vikingship.xyz/column/5f4db92abb821789a5490ed3",
    avatar:
      "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41b8b7d9c60b68cdd1ef.jpg?x-oss-process=image/resize,m_pad,h_50,w_50",
    descricption: "公号：高斋CATTI，细致讲解让翻译学习更轻松！",
  },
];

export default defineComponent({
  components: { ColumnList, GlobalHeader },
  setup(props) {
    const userInfo = ref(UserInfoData)
    const columnList = ref(columnListData);

    return { userInfo, columnList };
  },
});
</script>
