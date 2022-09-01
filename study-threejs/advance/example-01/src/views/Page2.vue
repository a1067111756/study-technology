<!-- 页面2 -->
<template>
  <div
      class="scroll-page-section"
  >
    <div class="sps_wrapper">
      <p>DETTE ER CANNABIS-PLANTEN</p>
      <p>Cannabis er en fellesbetegnelse på alle produkter som kommer fra planten Cannabis sativa. Det finnes mange varianter av denne planten. Det er hovedsakelig toppskuddene og plantekvaen fra hunnplantene som brukes i cannabis.</p>
      <p>Klikk på de ulike delene av planten for å lese mer</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .scroll-page-section {
    height: 100%;
    width: 100%;

    .sps_wrapper {
      width: 432px;
      margin-left: 60px;

      > p:nth-child(1) {
        font-size: 30px;
        color: #025169;
        letter-spacing: 2px;
        text-align: left;
        font-weight: bold;
      }

      > p:nth-child(2) {
        font-size: 16px;
        color: #025169;
        margin: 30px 0;
        text-align: left;
        line-height: 28px;
        opacity: 0.9;
      }

      > p:nth-child(3) {
        width: 300px;
        font-size: 18px;
        font-weight: bold;
        color: #025169;
        text-align: left;
        line-height: 28px;
        text-decoration: underline;
      }
    }
  }
</style>
