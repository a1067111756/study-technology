/* CrudModal统一逻辑封装 */
import mittBus from "@/utils/mittBus";
import {ModalTypeEnum} from "@/services/enum/modal";
import {useEffect, useMemo, useRef, useState} from "react";
import type {ProFormInstance} from "@ant-design/pro-form";

export interface IModalProps {
  createProps?: Record<string, any>;
  updateProps?: Record<string, any>;
  detailProps?: Record<string, any>;
  commonProps?: Record<string, any>;
}

export interface IModalEvents<T> {
  onCreate?: (record: T) => void;
  onUpdate?: (record: T) => void;
  onOk?: (type: ModalTypeEnum, record: T) => void;
  onOpen?: (type: ModalTypeEnum, record?: T) => void;
  onCancel?: (type: ModalTypeEnum) => void;
}

export interface ICrudPageOptions<T> {
  formData?: T;
  props?: IModalProps;
  events?: IModalEvents<T>;
}

export function useCrudModal<T>(options: ICrudPageOptions<T>) {
  // form引用
  const formRef = useRef<ProFormInstance>()

  // modalData数据
  const [modalData, setModalData] = useState<T | {}>()

  // modal类型
  const [modalType, setModalType] = useState<ModalTypeEnum>(ModalTypeEnum.CREATE)

  // modal显示 / 隐藏
  const [modalVisible, setModalVisible] = useState<boolean>(false)

  // modal配置
  const modalConfig = useMemo(() => {
    const defaultProps = {
      afterClose: () => { formRef.current && formRef.current.resetFields() }
    };

    const strategy = {
      [ModalTypeEnum.CREATE]: {
        title: '新增',
        okText: '创建',
        ...defaultProps,
        ...(options?.props?.createProps && options.props.createProps),
        ...(options?.props?.commonProps && options.props.commonProps),
      },
      [ModalTypeEnum.UPDATE]: {
        title: '编辑',
        okText: '更新',
        ...defaultProps,
        ...(options?.props?.updateProps && options.props.updateProps),
        ...(options?.props?.commonProps && options.props.commonProps),
      },
      [ModalTypeEnum.DETAIL]: {
        title: '详情',
        okText: '退出',
        submitter: {
          submitButtonProps: {
            style: {
              display: 'none',
            },
          }
        },
        ...defaultProps,
        ...(options?.props?.detailProps && options.props.detailProps),
        ...(options?.props?.commonProps && options.props.commonProps),
      }
    };

    return strategy[modalType];
  }, [modalType])

  // 事件 - 创建打开Dialog
  const onCreateOpen = () => {
    setModalData({})
    setModalType(ModalTypeEnum.CREATE)
    setModalVisible(true)
    setTimeout(() => formRef.current && formRef.current.setFieldsValue(options.formData || {}), 0)
    options?.events?.onOpen && options.events.onOpen(modalType)
  }

  // 事件 - 详情打开Dialog
  const onDetailOpen = (record: T) => {
    setModalData(record)
    setModalType(ModalTypeEnum.DETAIL)
    setModalVisible(true)
    setTimeout(() => formRef.current && formRef.current.setFieldsValue(record), 0)
    options?.events?.onOpen && options.events.onOpen(modalType, record);
  }

  // 事件 - 更新打开Dialog
  const onUpdateOpen = (record: T) => {
    setModalData(record)
    setModalType(ModalTypeEnum.UPDATE)
    setTimeout(() => formRef.current && formRef.current.setFieldsValue(record), 0)
    options?.events?.onOpen && options.events.onOpen(modalType, record);
    setModalVisible(true)
  }

  // 事件 - 关闭
  const onModalCancel = () => {
    setModalVisible(false)
    options?.events?.onCancel && options.events.onCancel(modalType);
  };

  // 事件 - 确认
  const onModalOk = (record: T) => {
    if (modalType === ModalTypeEnum.CREATE && options?.events?.onCreate) {
      return options.events.onCreate(record);
    }

    if (modalType === ModalTypeEnum.UPDATE && options?.events?.onUpdate) {
      return options.events.onUpdate({
        ...modalData,
        ...record,
      })
    }

    if (options?.events?.onOk) {
      return options.events.onOk(modalType, record)
    }
  }

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
    formRef,
    modalConfig,
    modalType,
    setModalType,
    modalVisible,
    setModalVisible,
    onModalOk,
    onModalCancel
  }
}
