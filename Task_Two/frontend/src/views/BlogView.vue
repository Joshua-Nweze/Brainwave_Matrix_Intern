<template>
    <div>
        <div v-if="blog" class="grid lg:grid-cols-4 my-10 gap-5">
            <div class="lg:col-span-3">
                <div>
                    <div v-if="typeof blog != 'string'">
                        <div class="font-medium text-2xl lg:text-4xl">
                            {{ blog.title }}
                        </div>
                        <div class="my-5">
                            <img
                                :src="`data:image/jpeg;base64,${blog.thumbnail.imageBase64}`"
                                alt=""
                                class=""
                            />
                        </div>
                        <div :innerHTML="blog.body"></div>

                        <div class="mt-10 flex flex-col gap-3">
                            <div class="text-slate-500 text-base">
                                {{ blog.likes }}
                                {{ blog.likes == 1 ? "person" : "people" }} like
                                this blog
                            </div>

                            <Button class="bg-blue-700 hover:bg-blue-800 w-fit" @click="likeBlogBtn">
                                {{ blog.likedBy.some((liked) => liked.id === user?._id) ? "Unlike blog" : "Like blog" }}
                            </Button>
                        </div>

                        <div>
                            <section class="bg-white py-8 lg:py-16 antialiased">
                                <div>
                                    <div class="flex justify-between items-center mb-6">
                                        <h2 class="text-lg lg:text-2xl font-bold text-gray-900">
                                            Comments ({{
                                                blog.comments.length
                                            }})
                                        </h2>
                                    </div>
                                    <form class="mb-6" @submit.prevent="commentBlogBtn">
                                        <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                                            <label for="comment" class="sr-only">Your comment</label>
                                            <textarea
                                                id="comment"
                                                rows="6"
                                                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                                                placeholder="Write a comment..."
                                                v-model="comment"
                                                required
                                            ></textarea>
                                        </div>
                                        <Button
                                            class="bg-blue-700 hover:bg-blue-800"
                                            type="submit"
                                            >Post comment</Button
                                        >
                                    </form>
                                    <article
                                        class="p-6 text-base bg-white rounded-lg"
                                        v-if="blog.comments.length > 0"
                                        v-for="comment in sortedComments"
                                        :key="comment._id"
                                    >
                                        <footer class="flex justify-between items-center mb-2 w-full">
                                            <div class="flex items-center flex-2/3">
                                                <p class="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                                                    <img
                                                        v-if="comment.profilePic"
                                                        class="mr-2 w-6 h-6 rounded-full"
                                                        :src="`data:image/jpeg;base64,${comment.profilePic}`"
                                                        alt=""
                                                        loading="lazy"
                                                    />
                                                    <img
                                                        v-else
                                                        class="h-6 w-6 mr-2 rounded-full"
                                                        :src="`https://ui-avatars.com/api/?name=${comment.name}&background=1d4ed8&color=ffffff`"
                                                        alt=""
                                                    />
                                                    {{ comment.name }}
                                                </p>
                                                <p class="text-sm text-gray-600">
                                                    {{
                                                        new Date(
                                                            comment.created_at
                                                        ).toDateString()
                                                    }}
                                                </p>
                                            </div>
                                            <div class="flex justify-end w-full flex-1" v-if="user?._id == comment.id">
                                                <div
                                                    class="hover:cursor-pointer hover:bg-slate-300 rounded-full p-1"
                                                    @click="deleteBlogCommentBtn(comment._id)"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        class="h-4"
                                                        x="0px"
                                                        y="0px"
                                                        viewBox="0 0 30 30"
                                                    >
                                                        <path
                                                            d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"
                                                        ></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </footer>
                                        <p class="text-gray-500">
                                            {{ comment.comment }}
                                        </p>
                                    </article>
                                </div>
                            </section>
                        </div>
                    </div>
                    <div v-else class="text-center">
                        {{ blog }}
                    </div>
                </div>
            </div>
            <div class="w-full mt-10 lg:mt-0 flex flex-col gap-3">
                <div class="text-slate-500">Other blogs</div>
                <div>
                    <div
                        v-if="typeof otherBlogs != 'string'"
                        v-for="(blog, id) in otherBlogs"
                        :key="id"
                    >
                        <OtherBlogsCard :blog="blog" />
                    </div>
                    <div v-else>
                        {{ otherBlogs }}
                    </div>
                </div>
            </div>
        </div>
        <!-- skeleton loader -->
        <BlogSkeletonLoader v-else />
        <Transition>
            <ToastNotification :feedback="feedback" v-if="feedback" />
        </Transition>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import OtherBlogsCard from "../components/OtherBlogsCard.vue";
import Button from "@/components/Button.vue";
import { useBlogStore } from "@/stores/useBlog";
import BlogSkeletonLoader from "../components/SkeletonLoaders/BlogSkeletonLoader.vue";
import { onMounted, ref, watch, computed } from "vue";
import { useAuthStore } from "@/stores/useAuth";
import { storeToRefs } from "pinia";
import ToastNotification from "../components/ToastNotification.vue";
import type { IBlog } from "../types/BlogTypes";

const authStore = useAuthStore();
const { getUserProfilePic } = authStore;
const { user } = storeToRefs(authStore);

const blogStore = useBlogStore();
const { otherBlogs } = storeToRefs(blogStore);
const { getBlog, likeBlog, commentBlog, deleteBlogComment } = blogStore;

const route = useRoute();
const blogId = ref<string>(route.params.id as string);
const blog = ref<IBlog | null>(null);
const feedback = ref<any>(null);
const comment = ref<string>("");

async function likeBlogBtn() {
    const res = await likeBlog(blogId.value);
    feedback.value = res;

    if (res.status == 200) {
        blog.value = await getBlog(blogId.value);
    }

    clearFeedBack();
}

async function commentBlogBtn() {
    const res = await commentBlog(blogId.value, comment.value);
    feedback.value = res;

    if (res.status == 200) {
        blog.value = await getBlog(blogId.value);
    }

    comment.value = "";

    clearFeedBack();
}

async function deleteBlogCommentBtn(commentId: string) {
    const res = await deleteBlogComment(blogId.value, commentId);
    feedback.value = res;

    if (res?.status == 200) {
        blog.value = await getBlog(blogId.value);
    }

    clearFeedBack();
}

function clearFeedBack() {
    setTimeout(() => {
        feedback.value = null;
    }, 3000);
}

const fetchProfilePics = async () => {
    if (blog.value) {
        for (const comment of blog.value.comments) {
            const profilePic = await getUserProfilePic(comment.id);
            console.log(profilePic);
            comment.profilePic = profilePic.profilePic.imageBase64;
        }
    }
};

const sortedComments = computed(() => {
    if (blog.value) {
        return blog.value.comments.sort(
            (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
        );
    }
    return [];
});

watch(
    () => route.params.id, // Watch the route params directly
    async (newId) => {
        blog.value = null;
        blog.value = await getBlog(newId as string);
        await fetchProfilePics();
    }
);

onMounted(async () => {
    blog.value = await getBlog(blogId.value);
    await fetchProfilePics();
});
</script>

<style scoped></style>
