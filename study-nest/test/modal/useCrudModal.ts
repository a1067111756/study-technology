/* modal弹出窗通用逻辑封装 */
import { mittBus } from '/@/common/plugins/mittPlugin';
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { ModalTypeEnum, ModalMittBusTypeEnum } from '/@/service/enums/modalEnum';

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

export function useCrudModal<T = any>(modalProps?: IModalProps, modalEvents?: IModalEvents<T>) {
  // modal显示/隐藏
  const modalVisible = ref(false);

  // modal类型
  const modalType = ref(ModalTypeEnum.CREATE);

  // modal配置
  const modalConfig = computed(() => {
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

    return strategy[modalType.value];
  });

  // 事件 - 打开: 创建
  const onCreateOpen = () => {
    modalType.value = ModalTypeEnum.CREATE;
    modalEvents?.onOpen && modalEvents.onOpen(modalType.value);
    modalVisible.value = true;
  };

  // 事件 - 打开: 更新
  const onUpdateOpen = (record: T) => {
    modalType.value = ModalTypeEnum.UPDATE;
    modalVisible.value = true;

    modalEvents?.onOpen && modalEvents.onOpen(modalType.value, record);
  };

  // 事件 - 打开: 详情
  const onDetailOpen = (record: T) => {
    modalType.value = ModalTypeEnum.DETAIL;
    modalVisible.value = true;

    modalEvents?.onOpen && modalEvents.onOpen(modalType.value, record);
  };

  // 事件 - 关闭
  const onModalCancel = () => {
    modalVisible.value = false;
    modalEvents?.onCancel && modalEvents.onCancel(modalType.value);
  };

  // 事件 - 确定
  const onModalOk = () => {
    modalEvents?.onOk && modalEvents.onOk(modalType.value);
  };

  // 生命周期 - 挂载
  onMounted(() => {
    mittBus.on(ModalMittBusTypeEnum.CREATE, onCreateOpen);
    mittBus.on(ModalMittBusTypeEnum.UPDATE, onUpdateOpen);
    mittBus.on(ModalMittBusTypeEnum.DETAIL, onDetailOpen);
    mittBus.on(ModalMittBusTypeEnum.CLOSE, onModalCancel);
  });

  // 生命周期 - 卸载
  onUnmounted(() => {
    mittBus.off(ModalMittBusTypeEnum.CREATE, onCreateOpen);
    mittBus.off(ModalMittBusTypeEnum.UPDATE, onUpdateOpen);
    mittBus.off(ModalMittBusTypeEnum.DETAIL, onDetailOpen);
    mittBus.off(ModalMittBusTypeEnum.CLOSE, onModalCancel);
  });

  return {
    modalType,
    modalConfig,
    modalVisible,
    onModalOk,
    onModalCancel,
  };
}
