<template>
    <div>
      <div class="mt-8 block lg:hidden">
        <SearchBar />
      </div>

      <div class="mt-5 lg:mt-8 text-2xl md:text-4xl">My blogs</div>
  
      <Blogs />
    </div>
  </template>
  
  <script setup lang="ts">
  import Blogs from '../components/Blogs.vue'
  import SearchBar from '../components/SearchBar.vue'
  </script>
  