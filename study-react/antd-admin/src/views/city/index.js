import React from 'react'
import { Row, Col, Card, Form, Select, Button } from 'antd'


class CityPage extends React.Component {
  render () {
    return(
      <div className="page-city__container">
        {/* 搜索栏 */}
        <Card className="pcc-search-section__container">
          <Form name="form">
            <Row gutter="24">
              <Col span={5}>
                <Form.Item label="城市：" name="city">
                  <Select
                    placeholder="全部"
                    onChange={this.onGenderChange}
                    allowClear
                  >
                    <Select.Option value="male">遵义</Select.Option>
                    <Select.Option value="female">乐山</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item label="用车模式：" name="city">
                  <Select
                    placeholder="全部"
                    onChange={this.onGenderChange}
                    allowClear
                  >
                    <Select.Option value="male">遵义</Select.Option>
                    <Select.Option value="female">乐山</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item label="营运模式：" name="city">
                  <Select
                    placeholder="全部"
                    onChange={this.onGenderChange}
                    allowClear
                  >
                    <Select.Option value="male">遵义</Select.Option>
                    <Select.Option value="female">乐山</Select.Option>
                  </Select>
                </Form.Item>                 
              </Col>

              <Col span={5}>
                <Form.Item label="加盟商授权状态：" name="city">
                  <Select
                    placeholder="全部"
                    onChange={this.onGenderChange}
                    allowClear
                  >
                    <Select.Option value="male">遵义</Select.Option>
                    <Select.Option value="female">乐山</Select.Option>
                  </Select>
                </Form.Item>  
              </Col>

              <Col span={4}>
                <Button type="primary" size="default">查询</Button>
                <Button type="default" size="default">重置</Button>
              </Col>
            </Row>
          </Form>
        </Card>

        {/* 操作栏 */}
        <div className="pcc-opreate-section__container"></div>
        
        {/* 表格栏 */}
        <div className="pcc-table-section__container"></div>
      </div>
    )
  }
}

export default CityPage