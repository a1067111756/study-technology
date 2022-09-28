<!-- 页面2 -->
<template>
  <div class="scroll-page-section">
    <div class="sps_wrapper">
      <p>DET FINNES MANGE CANNABIS-PRODUKTER</p>
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
      margin-left: 60px;

      > p:nth-child(1) {
        width: 550px;
        font-size: 40px;
        color: #025169;
        letter-spacing: 2px;
        text-align: left;
        font-weight: bold;
        line-height: 60px;
      }

      > p:nth-child(2) {
        font-size: 16px;
        color: #025169;
        margin: 30px 0;
        text-align: left;
        line-height: 28px;
        opacity: 0.9;
        width: 440px;
      }

      > p:nth-child(3) {
        width: 250px;
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
