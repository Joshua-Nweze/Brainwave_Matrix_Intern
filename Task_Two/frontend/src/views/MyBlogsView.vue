<template>
    <div>
        <div class="mt-8 block lg:hidden">
            <SearchBar />
        </div>

        <div class="mt-5 lg:mt-8 text-2xl md:text-4xl">My blogs</div>

        <Blogs :blogs="myBlogs" type="my-blogs"/>
    </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import Blogs from "../components/Blogs.vue";
import SearchBar from "../components/SearchBar.vue";
import { useBlogStore } from "@/stores/useBlog";
import { storeToRefs } from "pinia";

let blogStore = useBlogStore()
let { myBlogs } = storeToRefs(blogStore)
let { getUserBlogs } = blogStore

onMounted(async () => {
  await getUserBlogs()
})
</script>
