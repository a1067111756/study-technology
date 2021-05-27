<template>
  <div class="components-header__container">
    <!-- 标题 -->
    <p class="ch-title cursor-pointer" @click="$router.push('/home')">{{ title }}</p>

    <!-- 用户登录状态 -->
    <div v-if="isLogin" class="flex justify-center items-center">
      <!-- 头像 -->
      <img :src="userInfo.avatar || 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg?x-oss-process=image/resize,m_pad,h_50,w_50'" class="rounded-full">

      <!-- 下拉菜单 -->
      <a-dropdown class="ml-15px">
        <template #overlay>
          <a-menu>
            <a-menu-item key="1"><PlusOutlined/>新建文章</a-menu-item>
            <a-menu-item key="2"><UserSwitchOutlined/>管理账户</a-menu-item>
            <a-menu-item key="3" @click="onLoginOut"><LogoutOutlined/>退出登陆</a-menu-item>
          </a-menu>
        </template>
        <a-button class="!h-40px !rounded !bg-[#18b566]" type="primary">欢迎你，{{ userInfo.name }}<DownOutlined/></a-button>
      </a-dropdown>
      <!-- <p class="ml-15px text-white text-18px">{{ userInfo.name }}</p> -->
    </div>

    <!-- 用户未登录状态 -->
    <div v-else>
      <button class="btn-plain border-white text-white mr-10px hover:(bg-white text-black)" @click="$router.push('/login')">登录</button>
      <button class="btn-plain border-white text-white hover:(bg-white text-black)" @click="$router.push('/register')">注册</button>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { computed, defineComponent } from 'vue'
import { DownOutlined, PlusOutlined, UserSwitchOutlined, LogoutOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    DownOutlined,
    PlusOutlined,
    UserSwitchOutlined,
    LogoutOutlined
  },
  props: {
    title: {
      type: String,
      default: '者也专栏'
    }
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const isLogin = computed(() => store.getters.isLogin)
    const userInfo = computed(() => store.state.user.userInfo)

    // 事件 - 退出登陆
    const onLoginOut = () => {
      store.dispatch('authLoginOut')
      router.push('/login')
    }

    return { isLogin, userInfo, onLoginOut }
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
