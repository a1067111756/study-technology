<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="onCreate"> 新增角色 </a-button>
    </template>

    <template #action="{ record }">
      <TableAction
        :actions="[
          {
            icon: 'clarity:note-edit-line',
            onClick: onUpdate.bind(null, record),
          },
          {
            icon: 'ant-design:delete-outlined',
            color: 'error',
            popConfirm: {
              title: '是否确认删除',
              confirm: onRemove.bind(null, record),
            },
          },
        ]"
      />
    </template>
  </BasicTable>
</template>

<script lang="ts" setup>
  import { message } from 'ant-design-vue';
  import { onMounted, onUnmounted } from 'vue';
  import { mittBus } from '/@/common/plugins/mittPlugin';
  import { columns, searchFormSchema } from '../schema';
  import { BasicTable, useTable, TableAction } from '/@/common/components/Table';
  import * as roleApi from '/@/service/api/sys/role';

  const [registerTable, { reload }] = useTable({
    title: '角色列表',
    api: roleApi.getPage,
    columns,
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    showIndexColumn: false,
    pagination: true,
    maxHeight: 655,
    formConfig: {
      labelWidth: 80,
      schemas: searchFormSchema,
    },
    actionColumn: {
      width: 150,
      title: '操作',
      dataIndex: 'action',
      slots: { customRender: 'action' },
      fixed: undefined,
    },
  });

  // 事件 - 创建角色
  const onCreate = () => {
    mittBus.emit('page:crud-modal:create-open');
  };

  // 事件 - 编辑角色
  const onUpdate = (record: MODEL.IRoleEntity) => {
    mittBus.emit('page:crud-modal:update-open', record);
  };

  // 事件 - 删除角色
  const onRemove = (record: MODEL.IRoleEntity) => {
    roleApi.remove(record.uuid!).then(() => {
      message.success('删除角色成功');
      reload();
    });
  };

  // 生命周期 - 挂载
  onMounted(() => {
    mittBus.on('page:main-table:reload', reload);
  });

  // 生命周期 - 卸载
  onUnmounted(() => {
    mittBus.off('page:main-table:reload', reload);
  });
</script>
