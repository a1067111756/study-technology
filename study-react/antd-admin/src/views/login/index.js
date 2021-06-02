import './index.scss'
import React from 'react'
import { Input, Button, message } from 'antd'
import { withRouter } from 'react-router-dom'
import motationSvg from '../../assets/images/metation.svg'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

class LoginPage extends React.Component {
  state = {
    username: 'admin',
    password: 'admin123'
  }

  onLogin = () => {
    if (!this.state.username) {
      message.error('请输入用户名!')
      return
    }

    if (!this.state.password) {
      message.error('请输入密码!')
      return
    }
    
    if (this.state.username !== 'admin' || this.state.password !== 'admin123') {
      message.error('账号或密码不正确!')
      return
    }

    message.success('登录成功，欢迎回来!')
    this.props.history.push('/home')
  }

  render () {
    return (
      <div className="page-login__container">
        <div className="plc-left__wrapper">
          <div className="plc-login-box__wrapper">
            <p className="title">React 练习项目</p>
            <p className="subTitle">你咬我啊，不知道写些啥子</p>
            <Input 
              value={this.state.username} 
              className="input" 
              size="large" 
              placeholder="用户名：admin" 
              prefix={<UserOutlined style={{ color: '#1890ff' }} />}
              onChange={e => this.setState({username: e.target.value})}
            />
            <Input 
              value={this.state.password} 
              className="input" 
              size="large" 
              placeholder="密码：admin123" 
              prefix={<LockOutlined style={{ color: '#1890ff' }} />}
              onChange={e => this.setState({password: e.target.value})}
            />
            <Button 
              block
              size="large" 
              type="primary" 
              style={{ marginLeft: 0 }}  
              onClick={this.onLogin}>登录</Button>
          </div>
        </div>
        <div className="plc-right__wrapper">
          <p className="intro">只是单纯学习React的练手项目很多模块并未完全完成，主要觉得是没必要，开心就好</p>
          <img src={motationSvg} alt="" />
        </div>        
      </div> 
    )
  }
}

export default withRouter(LoginPage)