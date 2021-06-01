import './index.css'
import React from 'react'
import { 
  Card, 
  Button
} from 'antd'
import { 
  LeftOutlined,
  RightOutlined,
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  SearchOutlined, 
  PoweroffOutlined, 
  VerticalAlignBottomOutlined  
} from '@ant-design/icons'

class Login extends React.Component {
  render () {
    return (
      <div>
        <Card title="基础按钮">
          <Button type="primary">按钮</Button>
          <Button type="primary" danger>按钮</Button>
          <Button type="default">按钮</Button>
          <Button type="dashed">按钮</Button>
          <Button type="primary" disabled>按钮</Button>
        </Card>

        <Card title="图形按钮">
          <Button icon={<PlusOutlined />}>创建</Button>
          <Button icon={<EditOutlined />}>编辑</Button>
          <Button type="primary" icon={<DeleteOutlined />} danger>删除</Button>
          <Button shape="circle" icon={<SearchOutlined />} />
          <Button type="primary" icon={<SearchOutlined />}>搜索</Button>
          <Button type="primary" icon={<VerticalAlignBottomOutlined />}>下载</Button>
        </Card> 

        <Card title="Loading按钮">
          <Button type="primary" loading>
            Loading
          </Button>
          <Button type="primary" loading>
            Loading
          </Button>
          <Button type="primary" icon={<PoweroffOutlined />} loading />
        </Card>

        <Card title="按钮组">
          <Button.Group style={{ marginLeft: '20px' }}>
            <Button type="primary" icon={<LeftOutlined />}>上一步</Button>
            <Button type="primary">下一步<RightOutlined /></Button>
          </Button.Group>
        </Card>
      </div>
    )
  }
}

export default Login