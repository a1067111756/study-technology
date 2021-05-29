<template>
  <div class="page-home__container w-full px-74 pb-80px">
    <!-- 自由写作 -->
    <div class="flex flex-col justify-center items-center mt-80px mb-80px">
      <img class="w-310px h-250px" src="../../assets/bg_write.svg" />
      <span class="text-32px font-light mt-10px">随心写作，自由表达</span>
      <button class="mt-15px py-3 px-4 border-0  rounded shadow-md text-white text-16px bg-blue-500 hover:bg-blue-700">
        开始写文章
      </button>
    </div>

    <!-- 专栏列表 -->
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
