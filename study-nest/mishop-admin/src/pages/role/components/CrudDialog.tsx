/* 新增 / 编辑 / 查看Dialog */
import React, {useState} from "react";
import mittBus from '@/utils/mittBus'
import * as menuApi from "@/services/api/menu";
import * as roleApi from "@/services/api/role";
import {message, Tree} from "antd";
import {useCrudModal} from '@/hooks/useCrudModal';
import ProForm, {ModalForm, ProFormText, ProFormTextArea, ProFormRadio} from "@ant-design/pro-form";

const CrudDialog: React.FC= () => {
  const [treeData, setTreeData] = useState<MODEL.IMenu[]>([])

  const {formRef, modalConfig, modalVisible, setModalVisible, onModalOk} = useCrudModal<MODEL.IRole>({
    formData: {
      name: '',
      status: 1,
      remark: ''
    },
    events: {
      // 事件 - 打开窗口
      onOpen: () => {
        menuApi.getTree().then((data: MODEL.IMenu[]) => setTreeData(data))
      },
      // 事件 - 添加角色
      onCreate: (record: MODEL.IRole) => {
        roleApi
          .create(record)
          .then(() => {
            setModalVisible(false)
            message.success('新增角色成功')
            mittBus.emit('page:main-table:reload')
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 事件 - 更新角色
      onUpdate: (record: MODEL.IRole) => {
        roleApi
          .updateById(record)
          .then(() => {
            setModalVisible(false)
            message.success('更新角色成功')
            mittBus.emit('page:main-table:reload')
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  })

  return(
    <ModalForm<MODEL.IRole>
      width="500px"
      formRef={formRef}
      visible={modalVisible}
      modalProps={modalConfig}
      title={modalConfig.title}
      onVisibleChange={setModalVisible}
      onFinish={async (record: MODEL.IRole) => onModalOk(record)}
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

      <ProForm.Item label="菜单分配：">
        <div style={{ border: '1px solid #d9d9d9', padding: '10px', minHeight: '200px', maxHeight: '200px', overflow: 'auto' }}>
          <Tree
            checkable
            selectable={false}
            treeData={treeData}
            fieldNames={{
              key: 'id',
              title: 'name',
              children: 'children'
            }}
          />
        </div>
      </ProForm.Item>

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
