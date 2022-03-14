/* 表格主内容 */
import {useRef} from "react";
import {PlusOutlined} from "@ant-design/icons";
import {Button, Popconfirm} from "antd";
import React from "react";
import mittBus from '@/utils/mittBus'
import ProTable from "@ant-design/pro-table";
import * as roleHook from '@/pages/role/roleHook';
import * as userHook from '@/pages/user/userHook';
import type {ActionType, ProColumns} from "@ant-design/pro-table";

const MainTable: React.FC = () => {
  // table引用
  const tableRef = useRef<ActionType>();

  // 事件 - 刷新table
  const reloadTable = () => {
    if (tableRef.current) {
      tableRef.current.reload()
    }
  }

  // 生命周期 - 挂载
  React.useEffect(() => {
    mittBus.on('page:main-table:reload', reloadTable)
  }, [])

  // 生命周期 - 卸载
  React.useEffect(()=>{
    return () => {
      mittBus.off('page:main-table:reload', reloadTable)
    }
  },[]);

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
    },
    {
      title: '联系地址',
      dataIndex: 'address',
      align: 'center'
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
      valueType: "select",
      request: roleHook.getPage
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
    },
    {
      title: '创建时间',
      valueType: 'dateTime',
      dataIndex: 'create_time',
      align: 'center',
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
          onConfirm={() => userHook.remove(record.id)}
        >
          <a target="_blank">删除</a>
        </Popconfirm>
      ]
    }
  ]

  return(
    <ProTable
      headerTitle="角色列表"
      rowKey={record => record.id}
      columns={columns}
      actionRef={tableRef}
      search={{ labelWidth: 100 }}
      request={userHook.getPage}
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
