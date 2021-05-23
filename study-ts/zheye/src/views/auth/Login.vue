<template>
  <div class="page-login__container">
    <div class="plc-login-box__wrapper">
      <p class="title">Admin Pro</p>
      <a-form
        ref="formRef"
        :model="loginForm"
        v-bind="formConfig"
      >
        <a-form-item>
          <a-input size="large" v-model:value="loginForm.username" placeholder="请输入邮箱地址">
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item>
          <a-input size="large" v-model:value="loginForm.password" placeholder="请输入密码">
            <template #prefix>
              <lock-outlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item>
          <div class="flex justify-between">
            <p class="cursor-pointer text-[#bfbfbf]" @click="$router.push('/register')">没有账号?去注册</p>
            <p class="cursor-pointer text-[#1890ff]">忘记密码</p>
          </div>
        </a-form-item>

        <a-form-item>
          <a-button block size="large" type="primary">登 陆</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, defineComponent } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    LockOutlined,
    UserOutlined
  },
  setup () {
    // 表单数据
    const loginForm = reactive({
      username: undefined,
      password: undefined
    })

    // 表单配置
    const formConfig = reactive({
      style: 'width: 100%'
    })

    return { loginForm, formConfig }
  }
})
</script>

<style lang="postcss" scoped>
  .page-login__container {
    @apply flex justify-center items-center;
    .plc-login-box__wrapper{
      @apply w-450px mt-140px px-40px py-70px flex flex-col items-center shadow-lg;
    }
    .title {
      @apply text-24px font-bold mb-40px;
    }
  }

  ::v-deep .ant-form-item-control-wrapper {
    width: 100%;
  }
</style>
