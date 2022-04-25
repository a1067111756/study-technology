/* 表格主内容 */
import {PlusOutlined} from "@ant-design/icons";
import {Button, message, Popconfirm, Switch} from "antd";
import {useMainTable} from '@/hooks/useMainTable';
import type {ProColumns} from "@ant-design/pro-table";
import React from "react";
import mittBus from '@/utils/mittBus'
import ProTable from "@ant-design/pro-table";
import * as userApi from "@/services/api/user";
import * as roleApi from "@/services/api/role";

const MainTable: React.FC = () => {
  // table引用
  const { tableRef } = useMainTable();

  // 请求 - 删除用户
  const onRemoveById = (userId: string) => {
    return userApi
      .removeById(userId)
      .then(() => {
        message.success('删除用户成功')
        mittBus.emit('page:main-table:reload')
      })
      .catch(err => {
        console.log(err)
      })
  }

  // 请求 - 更新用户状态
  const onUpdateStatus = (record: MODEL.IUser, status: boolean) => {
    return userApi
      .updateById({
        ...record,
        status: status ? 1 : 0
      })
      .then(() => {
        message.success('更新成功')
        mittBus.emit('page:main-table:reload')
      })
      .catch(err => {
        console.log(err)
      })
  }

  // 请求 - 获取分页
  const onGetPage = (params: any): any => {
    return userApi
      .getPage({
        ...params,
        status: parseInt(params.status),
        pageNo: params.current,
        pageSize: params.pageSize
      })
      .then((roleGetPageRes: APIS.IRoleGetPageRes) => ({
        data: roleGetPageRes.records,
        total: roleGetPageRes.total,
        success: true
      }))
  }

  const onGetRoleList = async () => {
    return roleApi.getList().then(data => data.map(item => ({
      label: item.name,
      value: item.id
    })))
  }

  // 表结构定义
  const columns: ProColumns[] = [
    {
      title: '用户名',
      dataIndex: 'userName',
      align: 'center'
    },
    {
      title: '用户昵称',
      dataIndex: 'nickName',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '联系地址',
      dataIndex: 'address',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '所属角色',
      dataIndex: 'role',
      align: 'center',
      valueType: 'select',
      request: onGetRoleList,
    },
    {
      title: '用户状态',
      dataIndex: 'status',
      align: 'center',
      filters: true,
      onFilter: true,
      valueEnum: {
        0: { text: '停用', status: 'Error' },
        1: { text: '启用', status: 'Success' }
      },
      render: (text, record) => [
        <Switch
          key={record.id}
          checkedChildren="启用"
          unCheckedChildren="停用"
          checked={record.status}
          loading={!!record.pendingStatus}
          onChange={(checked: boolean) => {
            record.pendingStatus = true
            onUpdateStatus(record, checked).finally(() => record.pendingStatus = false)
          }}
        />
      ]
    },
    {
      title: '创建时间',
      valueType: 'dateTime',
      dataIndex: 'create_time',
      align: 'center',
      hideInSearch: true,
      sorter: (a, b): any => a.create_time > b.create_time,
    },
    {
      title: '操作',
      valueType: 'option',
      align: 'center',
      render: (text, record) => [
        <a
          key="detail"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => mittBus.emit('page:crud-dialog:detail', record)}
        >
          查看
        </a>,
        <a
          key="update"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => mittBus.emit('page:crud-dialog:update', record)}
        >
          编辑
        </a>,
        <Popconfirm
          key="delete"
          title="确定删除该角色？"
          onConfirm={() => onRemoveById(record.id)}
        >
          <a target="_blank">删除</a>
        </Popconfirm>
      ]
    }
  ]

  return(
    <ProTable
      headerTitle="用户列表"
      rowKey={record => record.id}
      columns={columns}
      actionRef={tableRef}
      search={{ labelWidth: 100 }}
      request={onGetPage}
      toolBarRender={() => [
        <Button
          key="button"
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => mittBus.emit('page:crud-dialog:create')}
        >
          创建新用户
        </Button>,
      ]}
    />
  )
}

export default MainTable
