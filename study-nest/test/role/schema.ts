import { h } from 'vue';
import { Switch, message } from 'ant-design-vue';
import { BasicColumn } from '/@/common/components/Table';
import { FormSchema } from '/@/common/components/Table';
import { updateStatus } from '/@/service/api/sys/role';

// 主表格配置
export const columns: BasicColumn[] = [
  {
    title: '角色编号',
    dataIndex: 'rankId',
    width: 100,
  },
  {
    title: '角色名称',
    dataIndex: 'name',
    width: 200,
  },
  {
    title: '状态',
    dataIndex: 'enabled',
    width: 150,
    customRender: ({ record }: any) => {
      if (!Reflect.has(record, 'enabled')) {
        record.pendingStatus = false;
      }

      return h(Switch, {
        loading: record.pendingStatus,
        checked: record.enabled,
        checkedChildren: '启用',
        unCheckedChildren: '停用',
        onChange(checked: boolean) {
          record.pendingStatus = true;

          const tempRecord = JSON.parse(JSON.stringify(record));
          tempRecord.enabled = checked;

          updateStatus(tempRecord)
            .then(() => {
              record.enabled = checked;
              message.success('修改角色状态成功');
            })
            .catch(() => {
              message.error('修改角色状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '备注',
    dataIndex: 'description',
  },
];

// 搜索框配置
export const searchFormSchema: FormSchema[] = [
  {
    field: 'fuzzyKey',
    label: '角色名称',
    component: 'Input',
    colProps: { span: 6 },
  },
  {
    field: 'enabled',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    colProps: { span: 6 },
  },
];
