<template>
  <div>
    <!-- <div class="mt-8 block lg:hidden" v-if="typeof blogs != 'string'">
      // <SearchBar />
    </div> -->

    <!-- // <div class="mt-8" v-if="typeof blogs != 'string'">
    //   <span class="bg-blue-100 text-blue-800 text-xs font-medium me-2 px-3 py-1.5 rounded dark:bg-blue-900 dark:text-blue-300">Default</span>
    //   <span class="bg-gray-100 text-gray-800 text-xs font-medium me-2 px-3 py-1.5 rounded dark:bg-gray-700 dark:text-gray-300">Dark</span>
    // </div> -->

    <Blogs :blogs="blogs" type="all-blogs"/>
  </div>
</template>

<script setup lang="ts">
import Blogs from '../components/Blogs.vue'
import SearchBar from '../components/SearchBar.vue'
import { useBlogStore } from '@/stores/useBlog';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const blogStore = useBlogStore()
let { getBlogs } = blogStore
let { blogs } = storeToRefs(blogStore)

onMounted(async () => {
    if (!blogs.value) {
        await getBlogs()
    }
})
</script>
