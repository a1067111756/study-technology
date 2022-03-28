<template>
  <a-form-item>
    <!-- 展开 / 折叠 -->
    <a-checkbox key="expandAll" v-model:checked="menuToolexpandAll" @change="menuToolExpandChange">
      展开/折叠
    </a-checkbox>

    <!-- 全选 / 全不选 -->
    <a-checkbox key="CheckAll" v-model:checked="menuToolCheckAll" @change="menuToolCheckChange">
      全选/全不选
    </a-checkbox>
  </a-form-item>

  <div class="p-10px min-h-200px mt-[-15px]" style="border: 1px solid #d9d9d9; border-radius: 2px">
    <BasicTree
      ref="treeRef"
      v-model:value="innerModelValue"
      checkable
      checkStrictly
      :height="190"
      :selectable="false"
      :treeData="treeData"
      :fieldNames="{ title: 'name', key: 'uuid' }"
      @check="onTreeCheckChange"
    />
  </div>
</template>

<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { BasicTree } from '/@/common/components/Tree';

  // props参数
  const props = defineProps({
    treeData: Array,
    modelValue: {
      type: Array,
      required: true,
      default: () => [],
    },
  });

  // 跨组件双向绑定，内部中转值
  const emit = defineEmits(['update:modelValue']);
  const innerModelValue = computed({
    get() {
      return props.modelValue;
    },
    set(newValue) {
      emit('update:modelValue', newValue);
    },
  });

  // 事件 - menu工具栏
  const menuToolCheckAll = ref(false);
  const menuToolexpandAll = ref(false);
  const menuToolCheckChange = () => {
    treeRef.value.checkAll(menuToolCheckAll.value);
  };
  const menuToolExpandChange = () => {
    treeRef.value.expandAll(menuToolexpandAll.value);
  };

  // 事件 - menu树形菜单
  const treeRef = ref();
  const onTreeCheckChange = (checkedKeys, { checked, node }) => {
    // 方法 - 获取勾选节点的所有层级父级点key
    const parentKeys: Array<number> = [];
    function getParentKey(currentNode: any) {
      parentKeys.push(currentNode.key);
      if (currentNode.parent) {
        getParentKey(currentNode.parent);
      }
    }

    // 方法 - 获取勾选节点的所有层级子节点key
    const childrenKeys: Array<number> = [];
    function getChildrenKeys(currentNode: any) {
      childrenKeys.push(currentNode.key || currentNode.uuid);

      const childList = currentNode.children;
      if (Array.isArray(childList) && childList.length > 0) {
        childList.map((item) => getChildrenKeys(item));
      }
    }

    // a. 勾选子节点，父节点状态置为勾选。
    if (checked) {
      getParentKey(node);
      const checkedKeysSet = new Set([...parentKeys, ...checkedKeys.checked]);
      treeRef.value.setCheckedKeys(Array.from(checkedKeysSet));
    }

    // b. 取消勾选父节点，子节点状全部态置为不勾选。
    if (!checked) {
      getChildrenKeys(node);
      const checkedKeysArr = checkedKeys.checked.filter(
        (key: number) => !childrenKeys.includes(key),
      );
      treeRef.value.setCheckedKeys(checkedKeysArr);
    }
  };
</script>

<style lang="less" scoped>
  /deep/ .ant-tree-title {
    color: #000000;
    font-size: 13px;
  }
</style>
