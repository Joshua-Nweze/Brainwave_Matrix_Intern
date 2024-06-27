<template>
    <RouterLink :to="`/blog/${blog?._id}`" class="grid grid-cols-3 min-[450px]:grid-cols-5 md:grid-cols-8 lg:grid-cols-3 gap-2 flex items-center my-5">
        <div class="rounded">
            <img class="rounded max-h-14 min-w-full" :src="`data:image/jpeg;base64,${blog?.thumbnail.imageBase64}`" alt="" loading="lazy">
        </div>
        <div class="col-span-2 min-[450px]:col-span-4 md:col-span-7 lg:col-span-2 text-base">{{ blog?.title }}</div>
    </RouterLink>
</template>

<script setup lang="ts">
import type { IBlog } from '../types/BlogTypes'

defineProps<{
  blog: IBlog | null
}>()
</script>
