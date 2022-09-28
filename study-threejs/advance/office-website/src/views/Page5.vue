<!-- 页面3 -->
<template>
  <div class="scroll-page-section">
    <div class="sps_wrapper">
      <p>HELSEPÅVIRKNING</p>
      <p>Cannabis kan være skadelig for hjernen, særlig for en ung hjerne i utvikling. Normalt er ikke hjernen ferdig utviklet før du nærmer deg 25 år. Forskere er enige om at en hjerne i utvikling ikke bør utsettes for cannabis. Bruk av cannabis kan øke risikoen for depresjon og angst, særlig for sårbare personer og dersom man begynner å bruke i ung alder. Bruk av cannabis kan også føre til avhengighet.</p>
      <p>Les mer om helseeffekter ved å klikke på knappene</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .scroll-page-section {
    height: 100%;
    width: 100%;
    background-color: #11202c;

    .sps_wrapper {
      margin-left: 60px;

      > p:nth-child(1) {
        width: 432px;
        font-size: 36px;
        color: #ffffff;
        letter-spacing: 2px;
        text-align: left;
        font-weight: bold;
        line-height: 54px;
      }

      > p:nth-child(2) {
        width: 450px;
        font-size: 16px;
        color: #ffffff;
        margin: 30px 0;
        text-align: left;
        line-height: 28px;
        opacity: 0.9;
      }

      > p:nth-child(3) {
        width: 230px;
        font-size: 18px;
        color: #ffffff;
        text-align: left;
        line-height: 28px;
        text-decoration: underline;
      }
    }
  }
</style>
