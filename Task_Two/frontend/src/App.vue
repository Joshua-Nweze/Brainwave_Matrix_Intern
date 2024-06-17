<script setup lang="ts">
import { RouterView } from 'vue-router'
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Nav />

    <div class="px-6 lg:px-40 grow h-full flex flex-col justify-center">
      <RouterView />
    </div>

    <Footer />
  </div>
</template>

<style scoped>

</style>
