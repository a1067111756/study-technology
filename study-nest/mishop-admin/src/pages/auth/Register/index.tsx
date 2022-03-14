import React from 'react'
import styles from './index.less'
import { history } from 'umi'
import { useState } from 'react'
import { Card, Form, Input, Button, notification } from 'antd'
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons'
import * as authApi from '@/services/api/auth'
import imgAuthBanner from '@/assets/images/img_auth_banner.svg'

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false)

  // 事件 - 注册
  const onRegister = (registerForm: APIS.IRegisterReq) => {
    setLoading(true)

    // 简单校验
    if (registerForm.password !== registerForm.repassword) {
      notification.error({
        message: '注册出错',
        description: '两次密码输入不一致,请检查!'
      })
      setTimeout(() => setLoading(false), 300)
      return
    }

    // 提交请求
    authApi
      .register(registerForm)
      .then(() => {
        notification.success({
          message: '注册成功',
          description: '请重新登录新账号'
        })
        history.push('/auth/login')
      })
      .finally(() => {
        setTimeout(() => setLoading(false), 300)
      })
  }

  return(
    <div className={styles.container}>
      {/* 左侧 */}
      <div className={styles.leftContent}>
        <Card style={{ width: 444, padding: '20px' }}>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={onRegister}
          >
            {/* 标题 */}
            <Form.Item>
              <p className={styles.title}>注册</p>
            </Form.Item>

            {/* 账号 */}
            <Form.Item
              name="username"
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                allowClear
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
                allowClear
                className={styles.login_box__input}
                size="large"
                type="password"
                placeholder="密码"
                prefix={<LockOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            {/* 确认密码 */}
            <Form.Item
              name="repassword"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password
                allowClear
                className={styles.login_box__input}
                size="large"
                type="repassword"
                placeholder="确认密码"
                prefix={<SafetyOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item>
              <div className={styles.login_box_redrict}>
                <a onClick={() => history.push('/auth/login')}>已有账号?登录</a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button
                block
                size="large"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                注册
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

      {/* 右侧 */}
      <div className={styles.rightBanner}>
        <img src={imgAuthBanner} alt="banner" />
        <p className={styles.title}>Mi Shop</p>
        <p className={styles.subTitle}>后台管理系统</p>
      </div>
    </div>
  )
}

export default RegisterPage
