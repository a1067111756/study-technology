import './index.css';
import React from 'react'
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';

import menuConfig from '../../config/menuConfig'

const { SubMenu } = Menu;
const { Header, Sider, Content } = Layout;

class HomePage extends React.Component {
  state = {
    collapsed: false,
    menuTreeNode: []
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  renderMenu = (data) => {
    return data.map(item => {
      return !item.children
        ? (<Menu.Item key={item.key} icon={<UserOutlined />}>
            {item.title}
          </Menu.Item>)
        : (<SubMenu key={item.key} icon={<UserOutlined />} title={item.title}>
            {
              this.renderMenu(item.children)
            }
          </SubMenu>)
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
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            { this.state.menuTreeNode }
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default HomePage