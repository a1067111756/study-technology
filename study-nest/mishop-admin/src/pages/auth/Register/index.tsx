import React from 'react'
import styles from './index.less'
import { history } from 'umi'
import { Card, Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons'

const LoginPage: React.FC = () => {
  return(
    <div className={styles.container}>
      {/* 左侧 */}
      <div className={styles.leftContent}>
        <Card style={{ width: 444, padding: '20px' }}>
          <Form
            name="normal_login"
            className="login-form"
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

            {/* 确认密码 */}
            <Form.Item
              name="repassword"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password 
                className={styles.login_box__input}
                size="large"
                type="repassword"
                placeholder="确认密码"
                prefix={<SafetyOutlined className="site-form-item-icon" />}
              />
            </Form.Item>

            <Form.Item>
              <div className={styles.login_box_redrict}>
                <a onClick={e => history.push('/auth/login')}>已有账号?登录</a>
              </div>
            </Form.Item>

            <Form.Item>
              <Button block type="primary" size="large" htmlType="submit">
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>

      {/* 右侧 */}
      <div className={styles.rightBanner}>
        <img src={require('@/assets/images/img-login-banner.svg')} />
        <p className={styles.title}>Mi Shop</p>
        <p className={styles.subTitle}>后台管理系统</p>
      </div>
    </div>
  )
}

export default LoginPage