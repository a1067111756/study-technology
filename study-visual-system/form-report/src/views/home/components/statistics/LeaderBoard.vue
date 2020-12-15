<template>
 <div class="leader-board-wrapper">
    <p class="title">{{ title }}</p>
    <ul class="leader-board-ul-wrapper">
      <li :key="index" v-for="(li, index) in list">
        <span class="round-ball" :class="{ active: index < 3 }">{{ index }}</span>
        <span>{{ li.text }}</span>
        <span>{{ li.number }}</span>  
      </li>    
    </ul>  
 </div>
</template>

<script>
export default {
  data () {
    return {
      title: '门店销售排行榜',
      list: [
        { text: '白鹭岛1号店', number: '1234.56' },
        { text: '白鹭岛2号店', number: '1134.56' },
        { text: '白鹭岛3号店', number: '1034.56' },
        { text: '白鹭岛4号店', number: '934.56' },
        { text: '白鹭岛5号店', number: '834.56' },
        { text: '白鹭岛6号店', number: '734.56' },
        { text: '白鹭岛7号店', number: '634.56' }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  .round-ball {
    display: inline-flex;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    color: rgba(0,0,0,.65);
    background-color: #f5f5f5;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    margin-right: 24px;
    &.active {
      color: #ffffff;
      font-weight: bold;
      background-color: #314659;
    }
  }

  .title {
    font-size: 14px;
    color: rgba(0,0,0,.85);
    margin-bottom: 7px;
  }

  .leader-board-ul-wrapper {
    & > li {
      margin-top: 16px;
      font-size: 14px;
      color: rgba(0,0,0,.65);
      display: flex;
      span:nth-child(2) {
        flex: 1;
      }
    }
  }
</style>