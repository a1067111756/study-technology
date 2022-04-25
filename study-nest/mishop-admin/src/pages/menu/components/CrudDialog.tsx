/* 新增 / 编辑 / 查看Dialog */
import React from "react";
import mittBus from '@/utils/mittBus'
import {message} from "antd";
import {useState} from "react";
import {useCrudModal} from '@/hooks/useCrudModal';
import {
  ProFormText,
  ProFormTextArea,
  ProFormRadio,
  ProFormGroup,
  DrawerForm,
  ProFormTreeSelect
} from "@ant-design/pro-form";
import * as menuApi from "@/services/api/menu";

enum MENU_TYPE {
  DIR = 0,
  MENU = 1,
  BUTTON = 2
}

const CrudDialog: React.FC= () => {
  // 当前选中的菜单类型
  const [curMenuType, setCurrentMenu] = useState<number>(MENU_TYPE.DIR)

  // 请求 - 获取树形菜单
  const onGetTree = () => {
    return menuApi.getTree().then((data) => [{ id: '-1', name: '根目录',children: data }])
  }

  // hooks
  const {formRef, modalConfig, modalVisible, setModalVisible, onModalOk} = useCrudModal<MODEL.IMenu>({
    formData: {
      type: 0,
      name: '',
      local: '',
      pid: '',
      icon: '',
      path: '',
      component: '',
      status: 1,
      hideInMenu: 0,
      hideInBreadcrumb: 0,
      remark: ''
    },
    events: {
      // 事件 - 打开窗口
      onOpen: () => {
        setCurrentMenu(formRef.current?.getFieldValue('type'))
      },
      // 事件 - 添加角色
      onCreate: (record: MODEL.IMenu) => {
        return menuApi
          .create(record)
          .then(() => {
            setModalVisible(false)
            message.success('新增菜单成功')
            mittBus.emit('page:main-table:reload')
          })
          .catch(err => {
            console.log(err)
          })
      },
      // 事件 - 更新角色
      onUpdate: (record: MODEL.IMenu) => {
        return menuApi
          .updateById(record)
          .then(() => {
            setModalVisible(false)
            message.success('更新菜单成功')
            mittBus.emit('page:main-table:reload')
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  })

  return(
    <DrawerForm<MODEL.IMenu>
      width="737px"
      formRef={formRef}
      visible={modalVisible}
      title={modalConfig.title}
      submitter={modalConfig['submitter']}
      onVisibleChange={setModalVisible}
      onFinish={async (record: MODEL.IMenu) => onModalOk(record)}
    >
      {/* 菜单类型 */}
      <ProFormGroup>
        <ProFormRadio.Group
          name="type"
          label="类型："
          radioType="button"
          fieldProps={{
            buttonStyle: "solid",
            defaultValue: 0,
            onChange: (e: any) => setCurrentMenu(e.target.value)
          }}
          options={[
            {
              label: '目录',
              value: 0,
            },
            {
              label: '菜单',
              value: 1,
            },
            {
              label: '按钮',
              value: 2,
            }
          ]}
        />
      </ProFormGroup>

      <ProFormGroup>
        <ProFormText
          name="name"
          width="md"
          label="名称："
          placeholder="请填写名称"
          fieldProps={{
            maxLength: 10,
            showCount: true,
          }}
          rules={[
            { required: true, message: "必填项" },
            { type: 'string', min: 2, max: 10, message: "菜单名称应为2 ~ 10个字符" }
          ]}
        />

        <ProFormText
          name="local"
          width="md"
          label="国际化："
          placeholder="请填写国际化名称"
        />

        <ProFormTreeSelect
          name="pid"
          width="md"
          allowClear
          label="上一级目录："
          placeholder="请填写菜单名称"
          fieldProps={{
            fieldNames: {
              label: 'name',
              value: 'id',
              children: 'children'
            }
          }}
          request={onGetTree}
          rules={[
            { required: true, message: "必填项" },
          ]}
        />

        {
          curMenuType !== MENU_TYPE.BUTTON && <ProFormText
            name="icon"
            width="md"
            label="菜单图标："
            placeholder="请填写菜单图标"
          />
        }

        {
          curMenuType !== MENU_TYPE.BUTTON && <ProFormText
            name="path"
            width="md"
            label="路由地址："
            placeholder="请填写路由地址"
            rules={[
              { required: true, message: "必填项" },
            ]}
          />
        }

        {
          curMenuType === MENU_TYPE.MENU && <ProFormText
            name="component"
            width="md"
            label="组件路径："
            placeholder="请填写组件路径"
            rules={[
              { required: true, message: "必填项" },
            ]}
          />
        }

        <div style={{ width: '328px' }}>
          <ProFormRadio.Group
            name="status"
            label="状态："
            radioType="button"
            fieldProps={{
              buttonStyle: "solid",
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
        </div>

        {
          curMenuType !== MENU_TYPE.BUTTON && <div style={{ width: '328px' }}>
            <ProFormRadio.Group
              name="hideInMenu"
              label="菜单中隐藏："
              radioType="button"
              fieldProps={{
                buttonStyle: "solid",
              }}
              options={[
                {
                  label: '显示',
                  value: 0,
                },
                {
                  label: '隐藏',
                  value: 1,
                }
              ]}
            />
          </div>
        }

        {
          curMenuType !== MENU_TYPE.BUTTON && <div style={{ width: '328px' }}>
            <ProFormRadio.Group
              name="hideInBreadcrumb"
              label="面包屑中隐藏："
              width="md"
              radioType="button"
              fieldProps={{
                buttonStyle: "solid",
              }}
              options={[
                {
                  label: '显示',
                  value: 0,
                },
                {
                  label: '隐藏',
                  value: 1,
                }
              ]}
            />
          </div>
        }
      </ProFormGroup>

      <ProFormTextArea
        name="remark"
        label="备注："
        placeholder=""
        fieldProps={{
          maxLength: 100,
          showCount: true,
          allowClear: true,
          autoSize: { minRows: 6, maxRows: 6 }
        }}
      />
    </DrawerForm>
  )
}

export default CrudDialog
