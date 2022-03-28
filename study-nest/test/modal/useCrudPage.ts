import { nextTick } from 'vue';
import { useCrudForm } from './useCrudForm';
import { useCrudModal } from './useCrudModal';
import { ModalTypeEnum } from '/@/service/enums/modal';
import type { IModalProps } from './useCrudModal';

type ICrudPageProps = IModalProps;

export interface ICrudPageEvent<T> {
  onOk?: (type: ModalTypeEnum, record?: T) => void;
  onOpen?: (type: ModalTypeEnum, record?: T) => void;
  onCancel?: (type: ModalTypeEnum) => void;
}

export interface ICrudPageOptions<T> {
  formData: T;
  props?: ICrudPageProps;
  events?: ICrudPageEvent<T>;
}

export function useCrudPage<T = any>(options: ICrudPageOptions<T>) {
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

  // cancel钩子
  const onModalCancel = (type: ModalTypeEnum) => {
    // 退出时重置表单
    crudFormHook.resetFields();

    if (options?.events?.onCancel) {
      options.events.onCancel(type);
    }
  };

  // ok钩子
  const onModalOk = (type: ModalTypeEnum) => {
    // 确认时进行表单验证
    crudFormHook.validate().then(() => {
      if (options?.events?.onOk) {
        options.events.onOk(type, crudFormHook.getFormDataRaw());
      }
    });
  };

  const crudFormHook = useCrudForm<T>(options.formData);
  const crudModalHook = useCrudModal<T>(options.props, {
    onOk: onModalOk,
    onOpen: onModalOpen,
    onCancel: onModalCancel,
  });

  return {
    ...crudFormHook,
    ...crudModalHook,
  };
}
