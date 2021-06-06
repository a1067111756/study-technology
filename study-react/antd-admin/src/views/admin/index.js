import './index.css'
import React from 'react'
import { Layout, Menu } from 'antd'
import * as Icon from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { swicthMenu } from '../../redux/action'
import menuConfig from '../../config/menuConfig'

const { SubMenu } = Menu
const { Header, Sider, Content } = Layout

class HomePage extends React.Component {
  state = {
    collapsed: false,
    menuTreeNode: []
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    })
  }

  onMenuSelect = ({ item, key }) => {
    const title = item.props.title
    this.props.dispatch(swicthMenu(title))
  }

  renderMenu = (data) => {
    return data.map(item => {
      return !item.children
        ? (
            <Menu.Item key={item.key} title={item.title} icon={React.createElement(Icon[item.icon])}>
              <Link to={item.key}>
                <span>{item.title}</span>
              </Link>
            </Menu.Item>
          )
        : (
            <SubMenu key={item.key} icon={React.createElement(Icon[item.icon])} title={item.title}>
              { this.renderMenu(item.children) }
            </SubMenu>
          )
      }
    )
  }

  componentWillMount () {
    const menuTreeNode = this.renderMenu(menuConfig)
    this.setState({ menuTreeNode })
  }

  render() {
    return (
      <Layout className="components-layout__container">
        <Sider trigger={null} collapsible collapsed={this.state.collapsed} width={'256px'}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onSelect={this.onMenuSelect}>
            { this.state.menuTreeNode }
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? Icon['MenuUnfoldOutlined'] : Icon['MenuFoldOutlined'], {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <div style={{ backgroundColor: '#ffffff', padding: '0 20px 10px 20px' }}>
            {this.props.menuName}
          </div>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 280,
              background: 'transparent'
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    menuName: state.menuName
  }
}

export default connect(mapStateToProps)(HomePage)