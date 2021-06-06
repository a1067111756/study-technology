import './index.scss'
import React from 'react'
import request from '@/utils/request'
import { Row, Col, Card, Form, Select, Button, Table } from 'antd'

const columns = [
  {
    title: '城市ID',
    dataIndex: 'id',
    key: 'id',
    align: 'center'
  },
  {
    title: '城市名称',
    dataIndex: 'name',
    key: 'name',
    align: 'center'
  },
  {
    title: '用车模式',
    dataIndex: 'mode',
    key: 'mode',
    align: 'center',
    render (mode) {
      return mode === 1 ? '停车点' : '禁停区'
    }
  },
  {
    title: '营运模式',
    dataIndex: 'op_mode',
    key: 'op_mode',
    align: 'center',
    render (op_mode) {
      return op_mode === 1 ? '自营' : '加盟'
    }    
  }, 
  {
    title: '授权加盟商',
    dataIndex: 'franchisee_name',
    key: 'franchisee_name',
    align: 'center'
  },   
  {
    title: '城市管理员',
    dataIndex: 'city_admins',
    key: 'city_admins',
    align: 'center',
    render (admins) {
      return admins.map(item => item.user_name).join('，')
    }
  },
  {
    title: '城市开通时间',
    dataIndex: 'open_time',
    key: 'open_time',
    align: 'center'
  }, 
  {
    title: '操作时间',
    dataIndex: 'update_time',
    key: 'update_time',
    align: 'center'
  },
  {
    title: '操作人',
    dataIndex: 'sys_user_name',
    key: 'sys_user_name',
    align: 'center'
  }                       
]

class CityPage extends React.Component {
  state = {
    searchValue: {
      cityCode: undefined,
      useCarMode: undefined,
      franchiseeStatus: undefined,
      businessMode: undefined
    },
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10
    },
    dataSource: []
  }

  // searchForm表单引用
  formRef = React.createRef()

  // 组件挂载
  componentDidMount () {
    this.getCityList()
  }

  // 事件 - 重置
  onReset = () => {
    this.setState({
      searchValue: {
        cityCode: undefined,
        useCarMode: undefined,
        franchiseeStatus: undefined,
        businessMode: undefined
      }      
    }, () => {
      this.formRef.current.resetFields()
      this.getCityList()
    })
  }

  // 事件 - 分页切换事件
  onTableChange = (pagination, filters, sorter, extra) => {
    if (extra.action === 'paginate') {
      this.setState({
        pagination: {
          ...this.state.pagination,
          current: pagination.current
        }
      }, () => {
        this.getCityList()
      })
    }
    console.log(pagination, filters, sorter, extra)
  }

  // 请求 - 获取城市列表数据
  getCityList = () => {
    request
      .get('/mock/city.json', {
        params: {
          ...this.state.searchValue,
          pageNo: this.state.pagination.current,
          pageSize: this.state.pagination.pageSize
        }
      })
      .then(data => {
        this.setState({
          pagination: {
            ...this.state.pagination,
            total: data.total
          },
          dataSource: data.records
        })
      })
  }

  render () {
    return(
      <div className="page-city__container">
        {/* 搜索栏 */}
        <Card className="pcc-search-section__container">
          <Form name="form" ref={this.formRef}>
            <Row gutter="24">
              <Col span={5}>
                <Form.Item label="城市：" name="city">
                  <Select
                    placeholder="全部"
                    allowClear
                    onChange={value => this.setState({searchValue: { ...this.state.searchValue, cityCode: value }})}
                  >
                    <Select.Option value="00001">遵义</Select.Option>
                    <Select.Option value="00002">乐山</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item label="用车模式：" name="useCarMode">
                  <Select
                    placeholder="全部"
                    allowClear
                    onChange={value => this.setState({searchValue: { ...this.state.searchValue, useCarMode: value }})}
                  >
                    <Select.Option value={0}>禁停区</Select.Option>
                    <Select.Option value={1}>停车点</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col span={5}>
                <Form.Item label="营运模式：" name="businessMode">
                  <Select
                    placeholder="全部"
                    allowClear
                    onChange={value => this.setState({searchValue: { ...this.state.searchValue, businessMode: value }})}
                  >
                    <Select.Option value={0}>加盟</Select.Option>
                    <Select.Option value={1}>自营</Select.Option>
                  </Select>
                </Form.Item>                 
              </Col>

              <Col span={5}>
                <Form.Item label="加盟商授权状态：" name="franchiseeStatus">
                  <Select
                    placeholder="全部"
                    allowClear
                    onChange={value => this.setState({searchValue: { ...this.state.searchValue, franchiseeStatus: value }})}
                  >
                    <Select.Option value={1}>正常</Select.Option>
                    <Select.Option value={0}>停用</Select.Option>
                  </Select>
                </Form.Item>  
              </Col>

              <Col span={4}>
                <Button type="primary" size="default" onClick={this.getCityList}>查询</Button>
                <Button type="default" size="default" onClick={this.onReset}>重置</Button>
              </Col>
            </Row>
          </Form>
        </Card>

        {/* 操作栏 */}
        <Card className="pcc-opreate-section__container" style={{ marginBottom: '0px' }}>
          <Button type="primary" size="default" style={{ marginLeft: '0px' }}>开通城市</Button>
        </Card>
        
        {/* 表格栏 */}
        <Card className="pcc-table-section__container">
          <Table 
            size="middle" 
            columns={columns} 
            rowKey={(record) => record.id} 
            pagination={this.state.pagination} 
            dataSource={this.state.dataSource}
            onChange={this.onTableChange}
          />
        </Card>
      </div>
    )
  }
}

export default CityPage