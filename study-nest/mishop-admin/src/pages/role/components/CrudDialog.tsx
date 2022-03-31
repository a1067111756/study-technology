/* 新增 / 编辑 / 查看Dialog */
import React from "react";
import mittBus from '@/utils/mittBus'
import * as roleApi from "@/services/api/role";
import {message} from "antd";
import {useCrudModal} from '@/hooks/useCrudModal';
import {ModalTypeEnum} from "@/services/enum/modal";
import {ModalForm, ProFormText, ProFormTextArea, ProFormRadio} from "@ant-design/pro-form";

const CrudDialog: React.FC= () => {
  const {formRef, modalType, modalConfig, modalVisible, setModalVisible} = useCrudModal({
    formData: { status: 0 }
  })

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
      formRef={formRef}
      visible={modalVisible}
      onVisibleChange={setModalVisible}
      modalProps={{
        destroyOnClose: true,
        okText: modalConfig.okText
      }}
      onFinish={async (record: APIS.IRoleCreateReq) => {
        return modalType === ModalTypeEnum.CREATE
          ? onAddRole(record)
          : onUpdateRole(record)
      }}
    >
      <ProFormText
        name="name"
        width="xl"
        label="角色名："
        placeholder="请填写角色名称"
        hasFeedback
        fieldProps={{
          maxLength: 20,
          showCount: true,
        }}
        rules={[
          { required: true, message: "必填项" },
          { type: 'string', min: 2, max: 20, message: "角色名应为2 ~ 20个字符" }
        ]}
      />

      <ProFormRadio.Group
        name="status"
        label="状态："
        radioType="button"
        fieldProps={{
          buttonStyle: "solid"
        }}
        options={[
          {
            label: '启用',
            value: 1,
          },
          {
            label: '停用',
            value: 0,
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
