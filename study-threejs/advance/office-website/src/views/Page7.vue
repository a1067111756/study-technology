<template>
  <div class="scroll-page-section">
    <p>LURER DU FORTSATT PÅ NOE?</p>
    <p>Ønsker du å vite enda mer om cannabis og hvordan det kan påvirke hjernen og kroppen din, eller trenger du bare noen å prate med? Her gir vi deg noen nyttige lenker du kan bruke.</p>

    <div class="sps_wrapper" style="display: grid; grid-template-columns: 1fr 1fr; grid-row-gap: 40px;  grid-column-gap: 100px;">
      <div>
        <p>Ung.no</p>
        <p>Offentlig og kvalitetssikret informasjon for ungdom. Også informasjon om cannabis og andre rusmidler. Du kan stille spørsmål og får svar på det du lurer på.</p>
        <a href="#">Les mer</a>
      </div>

      <div>
        <p>RUSinfo</p>
        <p>Landsdekkende informasjonstjeneste om rusmiddelproblematikk. Har mye informasjon om cannabis. Du kan ta anonym kontakt via telefon, chat eller spørreskjema.</p>
        <a href="#">Les mer</a>
      </div>

      <div>
        <p>Mental Helse Ungdom</p>
        <p>En interesseorganisasjon for ungdom som jobber med forebygging av psykiske plager. Hvis du har behov for noen å snakke med kan du ta kontakt på deres chat-tjeneste.</p>
        <a href="#">Les mer</a>
      </div>

      <div>
        <p>HelseNorge</p>
        <p>Et offentlig nettsted for helseinformasjon til alle. Har også informasjon om cannabis.</p>
        <a href="#">Les mer</a>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .scroll-page-section {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #f8f8f8;

    > p:nth-child(1) {
      font-size: 38px;
      color: #025169;
      text-align: left;
      font-weight: bold;
      line-height: 60px;
    }

    > p:nth-child(2) {
      text-align: center;
      font-size: 16px;
      color: #025169;
      margin: 40px 0;
      line-height: 28px;
      opacity: 0.9;
      width: 485px;
    }

    .sps_wrapper > div{
      text-align: left;

      > p:nth-child(1) {
        font-size: 16px;
        font-weight: bold;
        color: #025169;
        margin: 10px 0;
        opacity: 0.9;
      }

      > p:nth-child(2) {
        width: 435px;
        font-size: 15px;
        color: #025169;
        margin: 10px 0;
        opacity: 0.9;
        line-height: 28px;
      }

      > a {
        font-size: 13px;
        color: #025169;
        opacity: 0.9;
      }
    }
  }
</style>