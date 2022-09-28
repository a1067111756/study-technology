<!-- 页面3 -->
<template>
  <div
    class="scroll-page-section"
    data-0-top="background-color: rgb(203,224,224)"
    data-bottom-top="background-color: rgb(17,32,44)"
  >
    <div class="sps_wrapper">
      <p>CANNABIS BESTÅR AV FLERE KJEMISKE KOMPONENTER</p>
      <p>Cannabis er en samlebetegnelse for alle produkter som fremstilles av cannabisplanten. I tillegg finnes det kjemisk fremstilte stoffer med cannabislignende virkninger. Det er hovedsakelig toppskuddene fra hunnplanten som brukes til marihuana, men flere deler av planten inneholder også virkestoffer som brukes for å lage hasj og ulike oljer. Alle disse produktene er regulert som narkotika og er i dag forbudt å bruke, lage, kjøpe, selge eller oppbevare.</p>
      <p>Klikk på de ulike produktene for å lese mer</p>
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
        font-size: 38px;
        color: #ffffff;
        letter-spacing: 2px;
        text-align: left;
        font-weight: bold;
        line-height: 54px;
      }

      > p:nth-child(2) {
        font-size: 16px;
        color: #ffffff;
        margin: 30px 0;
        text-align: left;
        line-height: 28px;
        opacity: 0.9;
      }

      > p:nth-child(3) {
        width: 400px;
        font-size: 18px;
        color: #ffffff;
        text-align: left;
        line-height: 28px;
        text-decoration: underline;
      }
    }
  }
</style>
