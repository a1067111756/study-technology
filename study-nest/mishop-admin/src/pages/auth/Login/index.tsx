import React from 'react'
import { useIntl, history } from 'umi'
import styles from './index.less'
import { useModel } from 'umi';
import { useState, useEffect } from 'react'
import {Card, Form, Input, Button, Checkbox, notification} from 'antd'
import loginBanner from '@/assets/images/img_auth_banner.svg'
import { UserOutlined, LockOutlined, SafetyOutlined  } from '@ant-design/icons'
import * as authApi from '@/services/api/auth'

const LoginPage: React.FC = () => {
  // 国际化
  const intl = useIntl()
  // loading
  const [loading, setLoading] = useState(false)
  // 验证码
  const [fakerCaptcha, setFakerCaptcha] = useState('')
  // 数据流
  const { setAuthInfo } = useModel('auth')

  // 请求 - 获取验证码
  const requestFakerCaptcha = () => {
    authApi.getFakeCaptcha().then((fakeCaptchaRes: APIS.IFakeCaptchaRes) => setFakerCaptcha(fakeCaptchaRes.base64))
  }

  // 事件 - 登录
  const onLogin = (loginForm: APIS.ILoginReq) => {
    setLoading(true)

    authApi
      .login(loginForm)
      .then((loginRes: APIS.ILoginRes) => {
        notification.success({
          message: '登录成功',
          description: '欢迎回来'
        })
        setAuthInfo(loginRes)
        history.push('/welcome')
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 300)
      })
  }

  // 生命周期 - 挂载
  useEffect(() => {
    requestFakerCaptcha()
  }, [])

  return(
    <div className={styles.container}>
      {/* 左侧 */}
      <div className={styles.leftContent}>
        <Card className={styles.hover} style={{ width: 444, padding: '20px' }}>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={onLogin}
          >
            {/* 标题 */}
            <Form.Item>
              <p className={styles.title}>{intl.formatMessage({ id: 'pages.login.submit' })}</p>
            </Form.Item>

            {/* 账号 */}
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                className={styles.login_box__input}
                size="large"
                placeholder="用户名"
                prefix={<UserOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            {/* 密码 */}
            <Form.Item
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                className={styles.login_box__input}
                size="large"
                type="password"
                placeholder="密码"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            {/* 验证码 */}
            <Form.Item>
              <Form.Item
                name="captcha"
                rules={[{ required: true, message: '请输入验证码' }]}
                style={{display: 'inline-block', width: 'calc(100% - 100px)'}}>
                <Input
                  className={styles.login_box__input}
                  size="large"
                  placeholder="验证码"
                  prefix={<SafetyOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item style={{display: 'inline-block', width: '100px'}}>
                <img
                  src={fakerCaptcha}
                  alt="点击刷新"
                  style={{width: '100px', height: '100%', marginLeft: '10px'}}
                  onClick={requestFakerCaptcha}
                />
              </Form.Item>
            </Form.Item>

            <Form.Item>
              <div className={styles.login_box_redrict}>
                <Checkbox>记住密码</Checkbox>
                <a onClick={ () => history.push('/auth/register')  }>没有账号?注册</a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                block
                type="primary"
                size="large"
                htmlType="submit"
                loading={loading}
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

      {/* 右侧 */}
      <div className={styles.rightBanner}>
        <img src={loginBanner}  alt="banner"/>
        <p className={styles.title}>Mi Shop</p>
        <p className={styles.subTitle}>后台管理系统</p>
      </div>
    </div>
  )
}

export default LoginPage
