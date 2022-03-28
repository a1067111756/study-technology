import { ref, Ref, unref } from 'vue';
import type { FormInstance } from 'ant-design-vue';

export function useCrudForm<T = any>(initFormData: T) {
  // 表单实例
  const formRef = ref<FormInstance>();

  // 表单数据
  const formData = ref(initFormData) as Ref<T>;

  // 更新数据
  const setFormData = (record: T) => {
    formData.value = record;
  };

  // 获取数据
  const getFormDataRaw = () => {
    return unref(formData);
  };

  // 表单校验
  const validate = () => {
    return formRef.value
      ? formRef.value.validate()
      : Promise.reject(new Error('formRef not is a form instance'));
  };

  // 表单重置
  const resetFields = () => {
    // 强制清除旧数据
    formData.value = initFormData;

    return formRef.value
      ? formRef.value.resetFields()
      : Promise.reject(new Error('formRef not is a form instance'));
  };

  return {
    formRef,
    formData,
    setFormData,
    getFormDataRaw,
    validate,
    resetFields,
  };
}
