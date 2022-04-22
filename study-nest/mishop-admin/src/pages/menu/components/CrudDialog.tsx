/* 新增 / 编辑 / 查看Dialog */
import React, {useRef} from "react";
import mittBus from '@/utils/mittBus'
import {message} from "antd";
import {useMemo, useState } from "react";
import {ModalTypeEnum} from "@/services/enum/modal";
import {
  ProFormText,
  ProFormTextArea,
  ProFormRadio,
  ProFormGroup,
  DrawerForm,
  ProFormTreeSelect, ProFormInstance
} from "@ant-design/pro-form";
import * as menuApi from "@/services/api/menu";

const CrudDialog: React.FC= () => {
  // modal类型
  const [modalType, setModalType] = useState<ModalTypeEnum>(ModalTypeEnum.CREATE)

  // modal显示 / 隐藏
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  // modal实例
  const modalRef = useRef<ProFormInstance<any>>();

  // modal当前数据
  const [modalData, setModalData] = useState({})

  // 计算属性 - modalConfig
  const modalConfig = useMemo(() => {
    const strategy = {
      [ModalTypeEnum.CREATE]: { title: '新增菜单', okText: '创建' },
      [ModalTypeEnum.UPDATE]: { title: '更新菜单', okText: '更新' },
      [ModalTypeEnum.DETAIL]: { title: '菜单详情', okText: '退出' }
    }
    return strategy[modalType]
  }, [modalType])

  // 事件 - 创建打开Dialog
  const onCreateOpen = () => {
    modalRef.current!.setFieldsValue({
      type: 0,
      status: 1,
      hideInMenu: 0,
      hideInBreadcrumb: 0
    })
    setModalType(ModalTypeEnum.CREATE)
    setModalVisible(true)
  }

  // 事件 - 详情打开Dialog
  const onDetailOpen = (record: MODEL.IMenu) => {
    modalRef.current!.setFieldsValue(record)
    setModalData(record)
    setModalType(ModalTypeEnum.DETAIL)
    setModalVisible(true)
  }

  // 事件 - 更新打开Dialog
  const onUpdateOpen = (record: MODEL.IMenu) => {
    modalRef.current!.setFieldsValue(record)
    setModalData(record)
    setModalType(ModalTypeEnum.UPDATE)
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

  // 请求 - 添加菜单
  const onAddMenu = (record: APIS.IMenuCreateReq) => {
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
  }

  // 请求 - 更新菜单
  const onUpdateMenu = (record: MODEL.IMenu) => {
    return menuApi
      .updateById({
        ...modalData,
        ...record
      })
      .then(() => {
        setModalVisible(false)
        message.success('更新菜单成功')
        mittBus.emit('page:main-table:reload')
      })
      .catch(err => {
        console.log(err)
      })
  }

  // 请求 - 获取树形菜单
  const onGetTree = () => {
    return menuApi.getTree().then((data) => [{ id: '-1', name: '根目录',children: data }])
  }

  return(
    <DrawerForm
      title={modalConfig.title}
      width="737px"
      formRef={modalRef}
      visible={modalVisible}
      onVisibleChange={setModalVisible}
      drawerProps={{
        onClose: onClose
      }}
      onFinish={async (record: MODEL.IMenu) => {
        return modalType === ModalTypeEnum.CREATE
          ? onAddMenu(record)
          : onUpdateMenu(record)
      }}
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
            onChange: (e) => {
              setModalData({
                ...modalData,
                type: e.target.value
              })
            }
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
          label="菜单名称："
          placeholder="请填写菜单名称"
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

        <ProFormText
          name="icon"
          width="md"
          label="菜单图标："
          placeholder="请填写菜单图标"
        />

        <ProFormText
          name="path"
          width="md"
          label="路由地址："
          placeholder="请填写路由地址"
          rules={[
            { required: true, message: "必填项" },
          ]}
        />

        {modalData['type'] !== 0 && <ProFormText
          name="component"
          width="md"
          label="组件路径："
          placeholder="请填写组件路径"
          rules={[
            { required: true, message: "必填项" },
          ]}
        />}

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


        <div style={{ width: '328px' }}>
          <ProFormRadio.Group
            name="hideInMenu"
            label="菜单中隐藏："
            radioType="button"
            fieldProps={{
              buttonStyle: "solid",
            }}
            options={[
              {
                label: '隐藏',
                value: 1,
              },
              {
                label: '显示',
                value: 0,
              }
            ]}
          />
        </div>

        <div style={{ width: '328px' }}>
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
                label: '隐藏',
                value: 1,
              },
              {
                label: '显示',
                value: 0,
              }
            ]}
          />
        </div>
      </ProFormGroup>

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
    </DrawerForm>
  )
}

export default CrudDialog
