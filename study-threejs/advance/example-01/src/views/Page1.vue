<!-- 页面1 -->
<template>
  <div class="scroll-page-section">
    <p>WEEDENSENTERET</p>
    <p>Hva er cannabis og hvordan virker det på hjernen? Scroll ned for å få vite mer.</p>
    <button style="width: 50px; height: 50px; border-radius: 50%; border: none; cursor: pointer;">
      <svg style="width: 25px; height: 25px;" viewBox="0 0 24 24">
        <path d="M0 0h24v24H0V0z" fill="none"></path><path fill="#cae0e0" d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"></path>
      </svg>
    </button>
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

    > p:nth-child(1) {
      font-size: 72px;
      color: #025169;
      letter-spacing: 6px;
      font-weight: bold;
    }

    > p:nth-child(2) {
      width: 480px;
      font-size: 20px;
      color: #20667a;
      margin: 32px 0;
    }
  }
</style>
