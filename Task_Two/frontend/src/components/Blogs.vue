<template>
    <div>
        <div v-if="blogs">
            <div class="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 gap-3 mt-8 mb-16">
                <div @click="to(blog._id as string)" v-if="typeof blogs != 'string'" v-for="(blog, id) in blogs" class="hover:cursor-pointer" :key="id">
                    <div class="bg-gray-200 bg-opacity-40 rounded-lg">
                        <img class="h-40 md:h-52 rounded w-full object-cover object-center mb-6"
                         :src="`data:image/jpeg;base64,${blog.thumbnail.imageBase64}`"
                         :alt="`${blog.title} thumbnail`" loading="lazy">
                        <div class="px-6 pb-6">
                            <h3 class="tracking-widest text-indigo-400 text-xs font-medium title-font uppercase">{{ blog.category }}</h3>
                            <h2 class="text-lg font-medium title-font mb-4">{{ blog.title }}</h2>
                            <span class="leading-relaxed text-base" :innerHTML="blog.body.slice(0, 10)"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="typeof blogs == 'string'" class="text-center">
                {{ blogs }}
            </div>
        </div>

        <BlogsSkeletonLoader v-else />

        <div ref="loadMore" class="my-5">
            <SpinnerLoader v-if="fetchingMoreBlogs && blogs" class="flex justify-center" />
            <div class="text-center" v-if="typeof blogs != 'string' && allRetrieved">You've caught up with all the blogs.</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import router from '@/router';
import BlogsSkeletonLoader from './SkeletonLoaders/BlogsSkeletonLoader.vue';
import type { IBlog } from '@/types/BlogTypes';
import { onMounted, ref, watch } from 'vue';
import SpinnerLoader from './SpinnerLoader.vue';
import { useBlogStore } from '@/stores/useBlog';
import { storeToRefs } from 'pinia';

const blogStore = useBlogStore()
let { getBlogs } = blogStore
let { allRetrieved } = storeToRefs(blogStore)

let props = defineProps<{
    blogs: IBlog[] | null,
    type: string
}>()

function to(id: string) {
    if (props.type == 'my-blogs') {
        router.push(`/my-blogs/${id}`)
    } else if (props.type == "all-blogs") {
        router.push(`/blog/${id}`)
    } 
}

let loadMore = ref<HTMLElement | null>(null)
let fetchingMoreBlogs = ref<boolean>(false)

const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach(async entry => {
        if (entry.isIntersecting && !fetchingMoreBlogs.value && !allRetrieved.value) {
            fetchingMoreBlogs.value = true
            await getBlogs()
            fetchingMoreBlogs.value = false
        }
    });
};

const createObserver = () => {
    const options: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Adjust as needed
    };

    const observer = new IntersectionObserver(handleIntersect, options);
    if (loadMore.value) {
        observer.observe(loadMore.value);
    }
};

onMounted(() => {
    createObserver();
});
</script>

<style scoped>

</style>