<template>
  <global-header :user-info="userInfo"></global-header>
  <router-view></router-view>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'

const UserInfoData: UserProps = {
  id: 1515815,
  name: '澄鱼',
  avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg?x-oss-process=image/resize,m_pad,h_50,w_50',
  isLogin: false
}

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  },
  setup () {
    const userInfo = ref(UserInfoData)
    return { userInfo }
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
