/* CrudModal统一逻辑封装 */
import mittBus from "@/utils/mittBus";
import {useEffect, useMemo, useState} from "react";
import {MODEL_TYPE} from "@/services/enum/modal";

export function useCrudModal () {
  // modal数据
  const [modalData, setModalData] = useState({})

  // modal类型
  const [modalType, setModalType] = useState<MODEL_TYPE>(MODEL_TYPE.CREATE)

  // modal显示 / 隐藏
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  // 计算属性 - modal配置
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
  useEffect(() => {
    mittBus.on('page:crud-dialog:close', onClose)
    mittBus.on('page:crud-dialog:create', onCreateOpen)
    mittBus.on('page:crud-dialog:detail', onDetailOpen)
    mittBus.on('page:crud-dialog:update', onUpdateOpen)
  }, [])

  // 生命周期 - 卸载
  useEffect(()=>{
    return () => {
      mittBus.off('page:crud-dialog:close', onClose)
      mittBus.off('page:crud-dialog:create', onCreateOpen)
      mittBus.off('page:crud-dialog:detail', onDetailOpen)
      mittBus.off('page:crud-dialog:update', onUpdateOpen)
    }
  },[]);

  return {
    modalData,
    setModalData,
    modalType,
    setModalType,
    modalVisible,
    setModalVisible,
    modalConfig
  }
}
