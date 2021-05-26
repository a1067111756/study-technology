<template>
  <global-header></global-header>
  <router-view></router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import GlobalHeader from '@/components/GlobalHeader.vue'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader
  }
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
