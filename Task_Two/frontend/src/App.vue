<script setup lang="ts">
import { RouterView } from 'vue-router'
import Nav from './components/Nav.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div>
    <Nav />

    <div class="px-6 lg:px-40">
      <RouterView />
    </div>

    <Footer />
  </div>
</template>

<style scoped>

</style>
