<template>
  <el-card shadow="always">
    <!-- 顶部标题 -->
    <div class="header">
      <div class="meta">
        <span>{{ title }}</span>
        <i class="el-icon-info"></i>
      </div>
      <div class="total">
        <span>{{ total }}</span>
      </div>
    </div>

    <!-- 中间图表 -->
    <div class="chart content">
      <slot></slot>
    </div>

    <!-- 底部信息 -->
    <div class="footer">
      <span>日均销售额 ￥234.56</span>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    title: String,
    total: String
  }
}
</script>

<style lang="scss" scoped>
  .el-card {
    /deep/ .el-card__body {
      padding: 20px 24px 8px 20px !important;
    }

    .header {
      .meta {
        display: flex;
        font-size: 14px;
        color: rgba(0, 0, 0, .45);
        align-items: center;
        justify-content: space-between;
      }
      .total {
        font-size: 30px;
        line-height: 38px;
        margin-top: 10px;
        color: rgba(0, 0, 0, .65);
      }
    }

    .content {
      height: 46px;
      margin-bottom: 12px;
      display: flex;
      align-items: flex-end;
    }

    .footer {
      font-size: 14px;
      padding-top: 9px;
      color: rgba(0, 0, 0, .65);
      border-top: 1px solid #d9d9d9;
    }
  }
</style>
