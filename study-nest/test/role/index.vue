<template>
  <div>
    <!-- 主表格 -->
    <MainTable />

    <!-- Crud弹窗 -->
    <CrudModal />
  </div>
</template>
<script lang="ts" setup>
  import CrudModal from './components/CrudModal.vue';
  import MainTable from './components/MainTable.vue';
</script>
