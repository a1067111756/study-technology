import React from 'react'
import MainTable from './components/MainTable'
import CrudDialog from './components/CrudDialog'
import {PageContainer} from '@ant-design/pro-layout'

const RolePage: React.FC = () => {
  return(
    <PageContainer>
      {/* 主表单内容 */}
      <MainTable />

      {/* 新增 / 编辑 / 查看Dialog */}
      <CrudDialog />
    </PageContainer>
  )
}

export default RolePage
