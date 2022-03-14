/* 新增 / 编辑 / 查看Dialog */
import React from "react";
import mittBus from '@/utils/mittBus'
import * as roleApi from "@/services/api/role";
import {message} from "antd";
import {useMemo, useState } from "react";
import {MODEL_TYPE} from "@/services/enum/modal";
import {ModalForm, ProFormText, ProFormTextArea} from "@ant-design/pro-form";

const CrudDialog: React.FC= () => {
  // modal类型
  const [modalType, setModalType] = useState<MODEL_TYPE>(MODEL_TYPE.CREATE)

  // modal显示 / 隐藏
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  // modal当前数据
  const [modalData, setModalData] = useState({})

  // 计算属性 - modalConfig
  const modalConfig = useMemo(() => {
    const strategy = {
      [MODEL_TYPE.CREATE]: { title: '新增角色', okText: '创建' },
      [MODEL_TYPE.UPDATE]: { title: '更新角色', okText: '更新' },
      [MODEL_TYPE.DETAIL]: { title: '角色详情', okText: '退出' }
    }
    return strategy[modalType]
  }, [modalType])

  // 事件 - 创建打开Dialog
  const onCreateOpen = () => {
    setModalData({})
    setModalType(MODEL_TYPE.CREATE)
    setModalVisible(true)
  }

  // 事件 - 详情打开Dialog
  const onDetailOpen = (record: MODEL.IUser) => {
    setModalData(record)
    setModalType(MODEL_TYPE.DETAIL)
    setModalVisible(true)
  }

  // 事件 - 更新打开Dialog
  const onUpdateOpen = (record: MODEL.IUser) => {
    setModalData(record)
    setModalType(MODEL_TYPE.UPDATE)
    setModalVisible(true)
  }

  // 事件 - 关闭Dialog
  const onClose = () => {
    setModalVisible(false)
    setModalData({})
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

  // 请求 - 添加角色
  const onAddRole = (record: APIS.IRoleCreateReq) => {
    return roleApi
      .create(record)
      .then(() => {
        setModalVisible(false)
        message.success('新增角色成功')
        mittBus.emit('page:main-table:reload')
      })
      .catch(err => {
        console.log(err)
      })
  }

  // 请求 - 更新角色
  const onUpdateRole = (record: APIS.IRoleCreateReq) => {
    return roleApi
      .updateById({
        ...modalData,
        ...record
      } as MODEL.IRole)
      .then(() => {
        setModalVisible(false)
        message.success('更新角色成功')
        mittBus.emit('page:main-table:reload')
      })
      .catch(err => {
        console.log(err)
      })
  }

  return(
    <ModalForm
      title={modalConfig.title}
      width="500px"
      visible={modalVisible}
      onVisibleChange={setModalVisible}
      modalProps={{destroyOnClose: true, okText: modalConfig.okText}}
      onFinish={async (record: APIS.IRoleCreateReq) => {
        return modalType === 'create'
          ? onAddRole(record)
          : onUpdateRole(record)
      }}
      initialValues={modalData}
    >
      <ProFormText
        name="name"
        width="xl"
        label="角色名："
        placeholder="请填写角色名称"
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

      <ProFormTextArea
        name="remark"
        label="备注："
        placeholder=""
        fieldProps={{
          maxLength: 100,
          showCount: true,
          allowClear: true,
          autoSize: { minRows: 5, maxRows: 5 }
        }}
      />
    </ModalForm>
  )
}

export default CrudDialog
