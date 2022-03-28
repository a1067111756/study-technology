/* CrudModal统一逻辑封装 */
import mittBus from "@/utils/mittBus";
import {useEffect, useMemo, useState, useRef} from "react";
import {ModalTypeEnum} from "@/services/enum/modal";

export interface IModalProps {
  createProps?: Record<string, any>;
  updateProps?: Record<string, any>;
  detailProps?: Record<string, any>;
  commonProps?: Record<string, any>;
}

export interface IModalEvents<T> {
  onOk?: (type: ModalTypeEnum) => void;
  onOpen?: (type: ModalTypeEnum, record?: T) => void;
  onCancel?: (type: ModalTypeEnum) => void;
}

export function useCrudModal<T>(modalProps?: IModalProps, modalEvents?: IModalEvents<T>) {
  // form引用
  const formRef = useRef()

  // form数据
  const [formData, setFormData] = useState({})

  // modal类型
  const [modalType, setModalType] = useState<ModalTypeEnum>(ModalTypeEnum.CREATE)

  // modal显示 / 隐藏
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  // modal配置 - 计算属性
  const modalConfig = useMemo(() => {
    const defaultProps = {
      confirmLoading: false,
    };

    const strategy = {
      [ModalTypeEnum.CREATE]: {
        title: '新增',
        okText: '创建',
        ...defaultProps,
        ...(modalProps?.createProps && modalProps.createProps),
        ...(modalProps?.commonProps && modalProps.commonProps),
      },
      [ModalTypeEnum.UPDATE]: {
        title: '编辑',
        okText: '更新',
        ...defaultProps,
        ...(modalProps?.updateProps && modalProps.updateProps),
        ...(modalProps?.commonProps && modalProps.commonProps),
      },
      [ModalTypeEnum.DETAIL]: {
        title: '详情',
        showOkBtn: false,
        ...defaultProps,
        ...(modalProps?.detailProps && modalProps.detailProps),
        ...(modalProps?.commonProps && modalProps.commonProps),
      },
    };
    return strategy[modalType];
  }, [modalType])

  // 事件 - 创建打开Dialog
  const onCreateOpen = () => {
    setModalType(ModalTypeEnum.CREATE)
    setModalVisible(true)
    modalEvents?.onOpen && modalEvents.onOpen(modalType);
  }

  // 事件 - 详情打开Dialog
  const onDetailOpen = (record: T) => {
    setModalType(ModalTypeEnum.DETAIL)
    setModalVisible(true)
    modalEvents?.onOpen && modalEvents.onOpen(modalType  , record);
  }

  // 事件 - 更新打开Dialog
  const onUpdateOpen = (record: T) => {
    setModalType(ModalTypeEnum.UPDATE)
    setModalVisible(true)
    modalEvents?.onOpen && modalEvents.onOpen(modalType  , record);
  }

  // 事件 - 关闭
  const onModalCancel = () => {
    setModalVisible(false)
  };

  // 事件 - 确定
  const onModalOk = () => {
    modalEvents?.onOk && modalEvents.onOk(modalType);
  };

  // open钩子
  const onModalOpen = (type: ModalTypeEnum, record: T) => {
    // 详情 && 编辑更新数据
    if (type === ModalTypeEnum.UPDATE || type === ModalTypeEnum.DETAIL) {
      nextTick(() => {
        crudFormHook.setFormData(JSON.parse(JSON.stringify(record)));
      });
    }

    if (options?.events?.onOpen) {
      options.events.onOpen(type, record);
    }
  };

  // 生命周期 - 挂载
  useEffect(() => {
    mittBus.on('page:crud-dialog:close', onModalCancel)
    mittBus.on('page:crud-dialog:create', onCreateOpen)
    mittBus.on('page:crud-dialog:detail', onDetailOpen)
    mittBus.on('page:crud-dialog:update', onUpdateOpen)
  }, [])

  // 生命周期 - 卸载
  useEffect(()=>{
    return () => {
      mittBus.off('page:crud-dialog:close', onModalCancel)
      mittBus.off('page:crud-dialog:create', onCreateOpen)
      mittBus.off('page:crud-dialog:detail', onDetailOpen)
      mittBus.off('page:crud-dialog:update', onUpdateOpen)
    }
  },[]);

  return {
    formData,
    modalType,
    setModalType,
    modalVisible,
    setModalVisible,
    modalConfig
  }
}
