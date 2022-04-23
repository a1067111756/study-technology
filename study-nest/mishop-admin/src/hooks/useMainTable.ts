import {useEffect, useRef} from "react";
import mittBus from "@/utils/mittBus";
import {ActionType} from "@ant-design/pro-table";

export function useMainTable() {
  // table引用
  const tableRef = useRef<ActionType>();

  // 事件 - 刷新table
  const onReload = () => {
    tableRef.current && tableRef.current.reload()
  }

  // 生命周期 - 挂载
  useEffect(() => {
    mittBus.on('page:main-table:reload', onReload)
  }, [])

  // 生命周期 - 卸载
  useEffect(()=>{
    return () => {
      mittBus.off('page:crud-dialog:close', onReload)
    }
  },[]);

  return {
    tableRef
  }
}
