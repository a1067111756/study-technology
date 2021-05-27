<template>
  <div class="page-login__container">
    <div class="plc-login-box__wrapper">
      <p class="title">Admin Pro</p>
      <a-form
        ref="formRef"
        :model="data__.loginForm"
        :rules="config__.formConfig.rules"
      >
        <a-form-item name="email">
          <a-input size="large" v-model:value="data__.loginForm.email" placeholder="请输入邮箱地址">
            <template #prefix>
              <user-outlined />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item name="password">
          <a-input size="large" v-model:value="data__.loginForm.password" placeholder="请输入密码">
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
          <a-button block size="large" type="primary" @click="onLogin">登 陆</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { ref, reactive, defineComponent } from 'vue'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    LockOutlined,
    UserOutlined
  },
  setup () {
    const formRef = ref(null)
    const store = useStore()
    const router = useRouter()

    // 数据域
    const data__ = reactive({
      loginForm: { // 表单数据
        email: undefined,
        password: undefined
      }
    })

    // 配置域
    const config__ = reactive({
      formConfig: { // 表单配置
        rules: { // 校验规则
          email: [
            { required: true, message: '请输入账号', trigger: 'blur' },
            { min: 4, max: 16, message: '账号长度应为4 ~ 16位字符', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 6, max: 16, message: '密码长度应为6 ~ 16位字符', trigger: 'blur' }
          ]
        }
      }
    })

    // 事件 - 登陆
    const onLogin = () => {
      formRef.value
        .validate()
        .then(() => {
          return store.dispatch('authLogin', data__.loginForm)
        })
        .then(_ => {
          router.push('/home')
          message.success('登陆成功，欢迎回来!')
        })
    }

    return { formRef, data__, config__, onLogin }
  }
})
</script>

<style lang="postcss" scoped>
  .page-login__container {
    @apply flex justify-center items-center;
    .plc-login-box__wrapper{
      @apply w-450px mt-140px px-60px py-70px flex flex-col items-center shadow-lg;
    }
    .title {
      @apply text-24px font-bold mb-40px;
    }
  }

  ::v-deep .ant-form {
    width: 100%;
  }

  ::v-deep .ant-form-item-control-wrapper {
    width: 100%;
  }
</style>
