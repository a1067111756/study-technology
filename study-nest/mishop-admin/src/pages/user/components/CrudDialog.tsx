/* 新增 / 编辑 / 查看Dialog */
import {Mentions, message} from 'antd';
import {useCrudModal} from '@/hooks/useCrudModal';
import {
  ModalForm,
  ProFormText,
  ProFormSelect,
  ProFormTextArea,
  ProFormRadio
} from "@ant-design/pro-form";
import React from "react";
import mittBus from '@/utils/mittBus'
import ProForm from "@ant-design/pro-form";
import * as roleApi from "@/services/api/role";
import * as userApi from "@/services/api/user";


const CrudDialog: React.FC= () => {
  // 请求 - 获取角色列表
  const requestRoleList = () => roleApi.getList()

  // hooks
  const {formRef, modalConfig, modalVisible, setModalVisible, onModalOk} = useCrudModal<MODEL.IUser>({
    formData: {
      userName: '',
      nickName: '',
      role: '',
      email: '',
      phone: '',
      address: '',
      status: 1
    },
    events: {
      // 事件 - 添加角色
      onCreate: (record: MODEL.IUser) => {
        return userApi
          .create({
            ...record,
            status: Number(record.status)
          })
          .then(() => {
            setModalVisible(false)
            message.success('新增用户成功')
            mittBus.emit('page:main-table:reload')
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 事件 - 更新角色
      onUpdate: (record: MODEL.IUser) => {
        return userApi
          .updateById({
            ...record,
            status: Number(record.status)
          })
          .then(() => {
            setModalVisible(false)
            message.success('更新用户成功')
            mittBus.emit('page:main-table:reload')
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  })

  return(
    <ModalForm<MODEL.IUser>
      title={modalConfig.title}
      width="600px"
      layout="horizontal"
      formRef={formRef}
      labelCol={{ span: 6 }}
      wrapperCol={{ span: 18 }}
      visible={modalVisible}
      submitter={modalConfig['submitter']}
      onVisibleChange={setModalVisible}
      modalProps={{okText: modalConfig.okText}}
      onFinish={async (record: MODEL.IUser) => onModalOk(record)}
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
        fieldProps={{
          fieldNames: {
            label: 'name',
            value: 'id'
          }
        }}
        request={requestRoleList}
        rules={[
          {
            required: true,
            message: "必填项",
          }
        ]}
      />

      <ProForm.Item label="邮箱：" name="email">
        <Mentions placeholder="example@xxx.com">
          <Mentions.Option value="qq.com">qq.com</Mentions.Option>
          <Mentions.Option value="gmail.com">gmail.com</Mentions.Option>
          <Mentions.Option value="outlook.com">outlook.com</Mentions.Option>
        </Mentions>
      </ProForm.Item>

      <ProFormText
        name="phone"
        label="联系电话："
        width="xl"
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
    </ModalForm>
  )
}

export default CrudDialog
