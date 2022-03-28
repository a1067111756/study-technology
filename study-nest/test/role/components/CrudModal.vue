<template>
  <BasicModal
    v-model:visible="modalVisible"
    v-bind="modalConfig"
    :confirmLoading="confirmLoading"
    @ok="onModalOk"
    @cancel="onModalCancel"
  >
    <a-form
      ref="formRef"
      :model="formData"
      :rules="formRule"
      :label-col="{ span: 5 }"
      :wrapper-col="{ span: 18 }"
    >
      <a-form-item label="角色名称" name="name">
        <a-input v-model:value="formData.name" allowClear placeholder="请填写角色名称" />
      </a-form-item>

      <a-form-item label="状态" name="enabled">
        <a-radio-group v-model:value="formData.enabled" button-style="solid">
          <a-radio-button :value="true">启用</a-radio-button>
          <a-radio-button :value="false">停用</a-radio-button>
        </a-radio-group>
      </a-form-item>

      <a-form-item label="备注" name="description">
        <a-textarea
          v-model:value="formData.description"
          allowClear
          :auto-size="{ minRows: 5, maxRows: 5 }"
          placeholder="请填写角色备注"
        />
      </a-form-item>

      <a-form-item label="菜单分配" name="menuUuids">
        <MenuTreeSelect v-model="formData.menuUuids" :treeData="menuTreeData" />
      </a-form-item>
    </a-form>
  </BasicModal>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { message } from 'ant-design-vue';
  import { mittBus } from '/@/common/plugins/mittPlugin';
  import { BasicModal } from '/@/common/components/Modal';
  import { useCrudPage } from '/@/hooks/modal/useCrudPage';
  import { ModalTypeEnum } from '/@/service/enums/modalEnum';
  import MenuTreeSelect from './MenuTreeSelect.vue';
  import * as roleApi from '/@/service/api/sys/role';
  import * as menuApi from '/@/service/api/sys/menu';

  // 表单校验规则
  const formRule = {
    name: [{ required: true, trigger: 'change', message: '必填项' }],
  };

  // 事件 - 打开
  const menuTreeData = ref<Array<MODEL.IMenuEntity>>([]);
  const onOpen = () => {
    menuApi.getList().then((menuTree: Array<MODEL.IMenuEntity>) => {
      menuTreeData.value = menuTree;
    });
  };

  // 事件 - 确认
  const confirmLoading = ref(false);
  const onOk = (type: ModalTypeEnum, record: MODEL.IRoleEntity) => {
    confirmLoading.value = true;
    type === ModalTypeEnum.CREATE
      ? roleApi
          .create(record)
          .then(() => {
            message.success('新增角色成功');
            onModalCancel();
            mittBus.emit('page:main-table:reload');
          })
          .finally(() => {
            confirmLoading.value = false;
          })
      : roleApi
          .update(record)
          .then(() => {
            message.success('更新角色成功');
            onModalCancel();
            mittBus.emit('page:main-table:reload');
          })
          .finally(() => {
            confirmLoading.value = false;
          });
  };

  // hook
  const { formRef, formData, modalConfig, modalVisible, onModalOk, onModalCancel } =
    useCrudPage<MODEL.IRoleEntity>({
      formData: {
        name: '',
        enabled: true,
        description: '',
        menuUuids: [],
      },
      props: {
        detailProps: { title: '角色详情' },
        updateProps: { title: '编辑角色' },
        createProps: { title: '新增角色' },
      },
      events: {
        onOk: onOk,
        onOpen: onOpen,
      },
    });
</script>
