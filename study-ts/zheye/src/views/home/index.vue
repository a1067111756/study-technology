<template>
  <div class="page-home__container w-full px-74">
    <column-list :value="columnList"></column-list>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, defineComponent, getCurrentInstance } from 'vue'
import ColumnList from './ColumnList.vue'

export default defineComponent({
  components: { ColumnList },
  setup () {
    let columnList = ref([])
    const { proxy } = getCurrentInstance()

    onMounted(async () => {
      const res = await proxy.$api.column.getPage({ page: 1, pageSize: 6 })
      columnList.value = res.list
    })

    return { columnList }
  }
})
</script>
