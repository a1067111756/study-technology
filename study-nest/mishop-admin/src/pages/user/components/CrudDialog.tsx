/* 新增 / 编辑 / 查看Dialog */
import React from "react";
import mittBus from '@/utils/mittBus'
import ProForm, {ProFormInstance} from "@ant-design/pro-form";
import {Mentions, message} from 'antd';
import {useMemo, useState, useRef } from "react";
import {MODEL_TYPE} from "@/services/enum/modal";
import {ModalForm, ProFormText, ProFormSelect, ProFormSwitch, ProFormTextArea} from "@ant-design/pro-form";
import * as roleApi from "@/services/api/role";
import * as userApi from "@/services/api/user";


const CrudDialog: React.FC= () => {
  // modal实例
  const modalRef = useRef<ProFormInstance<any>>();

  // modal类型
  const [modalType, setModalType] = useState<MODEL_TYPE>(MODEL_TYPE.CREATE)

  // modal显示 / 隐藏
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  // modal当前数据
  // const [modalData, setModalData] = useState<MODEL.IUser | {}>({})
  const modalData = {}

  // 计算属性 - modalConfig
  const modalConfig = useMemo(() => {
    const strategy = {
      [MODEL_TYPE.CREATE]: { title: '新增用户', okText: '创建' },
      [MODEL_TYPE.UPDATE]: { title: '编辑用户', okText: '更新' },
      [MODEL_TYPE.DETAIL]: { title: '用户详情', okText: '退出' }
    }
    return strategy[modalType]
  }, [modalType])

  // 事件 - 创建打开Dialog
  const onCreateOpen = () => {
    modalRef.current!.setFieldsValue({})
    setModalType(MODEL_TYPE.CREATE)
    setModalVisible(true)
  }

  // 事件 - 详情打开Dialog
  const onDetailOpen = (record: MODEL.IUser) => {
    modalRef.current!.setFieldsValue(record)
    setModalType(MODEL_TYPE.DETAIL)
    setModalVisible(true)
  }

  // 事件 - 更新打开Dialog
  const onUpdateOpen = (record: MODEL.IUser) => {
    modalRef.current!.setFieldsValue(record)
    setModalType(MODEL_TYPE.UPDATE)
    setModalVisible(true)
  }

  // 事件 - 关闭Dialog
  const onClose = () => {
    setModalVisible(false)
    modalRef.current!.resetFields()
  }

  // 生命周期 - 挂载
  React.useEffect(() => {
    mittBus.on('page:crud-dialog:close', onClose)
    mittBus.on('page:crud-dialog:create', onCreateOpen)
    mittBus.on('page:crud-dialog:detail', onDetailOpen)
    mittBus.on('page:crud-dialog:update', onUpdateOpen)
  }, [])

  // 生命周期 - 卸载
  React.useEffect(()=>{
    return () => {
      mittBus.off('page:crud-dialog:close', onClose)
      mittBus.off('page:crud-dialog:create', onCreateOpen)
      mittBus.off('page:crud-dialog:detail', onDetailOpen)
      mittBus.off('page:crud-dialog:update', onUpdateOpen)
    }
  },[]);

  // 请求 - 添加用户
  const onAddUser = (record: APIS.IUserCreateReq) => {
    return userApi
      .create(record)
      .then(() => {
        setModalVisible(false)
        message.success('新增用户成功')
        mittBus.emit('page:main-table:reload')
      })
      .catch(err => {
        console.log(err)
      })
  }

  // 请求 - 更新用户
  const onUpdateUser = (record: APIS.IUserCreateReq) => {
    return userApi
      .updateById({
        ...modalData,
        ...record
      } as any)
      .then(() => {
        setModalVisible(false)
        message.success('更新角色成功')
        mittBus.emit('page:main-table:reload')
      })
      .catch(err => {
        console.log(err)
      })
  }

  // 请求 - 获取角色列表
  const onGetPageOfRole = () => {
    return roleApi
      .getList()
      .then(data => data.map(item => ({
        label: item.name,
        value: item.id
      })))
  }

  return(
    <ModalForm
      title={modalConfig.title}
      width="1000px"
      layout="horizontal"
      formRef={modalRef}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      visible={modalVisible}
      onVisibleChange={setModalVisible}
      modalProps={{okText: modalConfig.okText}}
      onFinish={async (record: APIS.IUserCreateReq) => {
        return modalType === 'create'
          ? onAddUser(record)
          : onUpdateUser(record)
      }}
    >
      <ProFormText
        name="userName"
        label="账号："
        width="xl"
        placeholder="请填写用户名称"
        fieldProps={{
          maxLength: 15,
          showCount: true,
        }}
        rules={[
          {
            required: true,
            message: "必填项",
          }
        ]}
      />

      <ProFormText
        name="nickName"
        label="用户昵称："
        width="xl"
        placeholder="请填写用户昵称"
        fieldProps={{
          maxLength: 15,
          showCount: true,
        }}
      />

      <ProFormSelect
        name="role"
        label="所属角色"
        width="xl"
        placeholder="请选择用户所属角色"
        request={onGetPageOfRole}
        rules={[
          {
            required: true,
            message: "必填项",
          }
        ]}
      />

      <ProForm.Item label="邮箱：" name="email">
        <Mentions
          placeholder="example@xxx.com"
          style={{ width: '328px' }}
        >
          <Mentions.Option value="qq.com">qq.com</Mentions.Option>
          <Mentions.Option value="gmail.com">gmail.com</Mentions.Option>
          <Mentions.Option value="outlook.com">outlook.com</Mentions.Option>
        </Mentions>
      </ProForm.Item>

      <ProFormText
        name="phone"
        label="联系电话："
        width="md"
        placeholder="请填写联系电话"
        fieldProps={{
          maxLength: 11,
        }}
      />

      <ProFormTextArea
        name="address"
        label="联系地址："
        width="xl"
        placeholder="请填写联系地址"
        fieldProps={{
          maxLength: 100,
          showCount: true,
          autoSize: { minRows: 5, maxRows: 5 },
        }}
      />

      <ProFormSwitch
        name="status"
        label="状态："
        checkedChildren="启用"
        unCheckedChildren="停用"
        valuePropName="switch"
        fieldProps={{
          defaultChecked: true
        }}
      />
    </ModalForm>
  )
}

export default CrudDialog
