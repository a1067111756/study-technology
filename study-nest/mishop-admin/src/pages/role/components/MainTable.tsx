/* 表格主内容 */
import React, {useRef} from "react";
import mittBus from '@/utils/mittBus'
import ProTable from "@ant-design/pro-table";
import * as roleApi from "@/services/api/role";
import {PlusOutlined} from "@ant-design/icons";
import {Button, message, Popconfirm, Switch} from "antd";
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

  // 请求 - 删除角色
  const onDeleteRole = (roleId: string) => {
    return roleApi
      .removeById(roleId)
      .then(() => {
        message.success('删除角色成功')
        reloadTable()
      })
      .catch(err => {
        console.log(err)
      })
  }

  // 请求 - 更新角色状态
  const onUpdateStatus = (record: MODEL.IRole, status: boolean) => {
    return roleApi
      .updateById({
        ...record,
        status: status ? 1 : 0
      })
      .then(() => {
        message.success('更新成功')
        reloadTable()
      })
      .catch(err => {
        console.log(err)
      })
  }

  // 请求 - 获取分页
  const onGetPage = (params: any): any => {
    return roleApi
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
      title: '角色名',
      dataIndex: 'name',
      align: 'center'
    },

    {
      title: '角色备注',
      dataIndex: 'remark',
      align: 'center',
      hideInSearch: true
    },
    {
      title: '角色状态',
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
          defaultChecked={record.status}
          onChange={(checked) => onUpdateStatus(record, checked)}
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
          onConfirm={() => onDeleteRole(record.id)}
        >
          <a target="_blank">删除</a>
        </Popconfirm>
      ]
    }
  ]

  return(
    <ProTable
      headerTitle="角色列表"
      rowKey={record => record.name}
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
          新增角色
        </Button>,
      ]}
    />
  )
}

export default MainTable
