<template>
    <div class="grid my-10 lg:mx-40" v-if="blog">
        <div class="flex gap-5 mb-5">
            <Button class="bg-blue-700 hover:bg-blue-800" @click="showEditModal = true">Edit blog</Button>
            <Button class="bg-red-700 hover:bg-red-800" @click="showDelModal = true">Delete blog</Button>
        </div>
        <div>
            <div class="font-medium text-2xl lg:text-4xl">{{ blog?.title }}</div>
            <div>
                <img :src="`data:image/jpeg;base64,${blog?.thumbnail.imageBase64}`" alt="" />
            </div>
            <div :innerHTML="blog?.body"></div>

            <div class="mt-16 flex flex-col gap-3">
                <div class="text-slate-500 text-base">{{ blog?.likes }} {{ blog?.likes == 1 ? 'person' : 'people' }} like this blog</div>
            </div>

            <div>
                <section
                    class="bg-white py-8 lg:py-16 antialiased"
                >
                    <div>
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-lg lg:text-2xl font-bold text-gray-900 ">
                                Comments ({{ blog?.comments.length }})
                            </h2>
                        </div>
                        <article class="p-6 text-base bg-white rounded-lg" v-if="blog?.comments.length" v-for="comment in (blog?.comments).reverse()">
                            <footer
                                class="flex justify-between items-center mb-2 w-full">
                                <div class="flex items-center flex-2/3">
                                    <p
                                        class="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                                        <img
                                            v-if="comment.profilePic"
                                            class="mr-2 w-6 h-6 rounded-full"
                                            :src="`data:image/jpeg;base64,${comment.profilePic}`"
                                            alt=""
                                        />
                                        <img v-else class="h-6 w-6 rounded-full" :src="`https://ui-avatars.com/api/?name=${comment.name}&background=1d4ed8&color=ffffff`" alt="">
                                        {{ comment.name }}
                                    </p>
                                    <p class="text-sm text-gray-600">{{ new Date(comment.created_at).toDateString() }}</p>
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

        <!-- delete blog modal -->
        <Transition>
            <div v-if="showDelModal">
                <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
                    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="sm:flex sm:items-start">
                                        <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                            </svg>
                                        </div>
                                        <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                            <h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">Delete blog</h3>
                                            <div class="mt-2">
                                                <p class="text-sm text-gray-500">Are you sure you want to delete blog. This action cannot be undone.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" 
                                    @click="delBlog">Delete</button>
                                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="showDelModal = false">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                 </div>
            </div>
        </Transition>

        <!-- edit blog modal -->
        <Transition>
            <div v-if="showEditModal">
                <div class="relative z-40" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
                    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div class="lg:mx-64 flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div class="relative w-screen transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="sm:flex sm:items-start">
                                        <form class="w-full flex flex-col gap-5" @submit.prevent="edit">
                                            <div class="text-2xl md:text-4xl">Edit blog post</div>
                                            <div>
                                                <input v-model="title"placeholder="Blog title" required class="block min-w-full text-base rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2">
                                            </div>

                                            <div>
                                                <label class="block mb-2 text-sm font-medium text-gray-900" for="file_input">Blog thumbnail <span class="text-slate-400">(choose an image if you want to change blog thumbnail)</span></label>
                                                <input @change="handleFileChange" class="block w-full text-gray-900 border border-gray-300 rounded-md cursor-pointer py-1.5 bg-gray-50 focus:outline-none text-sm" id="file_input" type="file" accept="image/*">
                                                <p class="mt-1 text-sm text-gray-500 " id="file_input_help">SVG, PNG, JPG or GIF (max size 1mb).</p>
                                            </div>

                                            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" v-model="category" required>
                                                <option selected value="">Choose blog category</option>
                                                <option v-for="(category, index) in blogCategories" :value="category">{{ category }}</option>
                                            </select>

                                            <div>
                                                <label class="block mb-2 text-sm font-medium text-gray-900" for="file_input">Blog body</label>
                                                <QuillEditor
                                                    v-model="content"
                                                    :options="editorOptions"
                                                    ref="myEditor"
                                                    @ready="setEditorContents"
                                                    @editor-change="handleTextChange"
                                                ></QuillEditor>
                                            </div>

                                            <div class="py-3 sm:flex sm:flex-row-reverse gap-3">
                                                <Button class="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto" type="submit">Update blog</Button>
                                                <Button type="button"class="inline-flex w-full bg-slate-100 justify-center rounded-md px-3 py-2 text-sm font-semibold text-black shadow-sm sm:ml-3 sm:w-auto mt-3 sm:mt-0" @click="showEditModal = false">Cancel</Button>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </div>
    <MyBlogSkeletonLoader v-else/>
    
    <Transition>
        <ToastNotification :feedback="feedback" v-if="feedback"/>
    </Transition>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Button from "@/components/Button.vue";
import { useRoute } from "vue-router";
import { useBlogStore } from "@/stores/useBlog";
import type { IBlog } from '../types/BlogTypes'
import MyBlogSkeletonLoader from "@/components/SkeletonLoaders/MyBlogSkeletonLoader.vue";
import ToastNotification from "@/components/ToastNotification.vue";
import router from "@/router";
import { useAuthStore } from "@/stores/useAuth";
import { storeToRefs } from "pinia";

let authStore = useAuthStore()
let { user } = storeToRefs(authStore)

const blogStore = useBlogStore()
let { getBlog, deleteBlog, editBlog } = blogStore

let showDelModal = ref<boolean>(false)
let showEditModal = ref<boolean>(false)

const blogCategories = ref<string[]>([
  "Technology",
  "Lifestyle",
  "Business",
  "Education",
  "Entertainment",
  "Food & Drink",
  "Personal",
  "Science & Nature",
  "Sports",
  "DIY & Crafts",
  "News & Politics",
  "Parenting & Family",
  "Finance",
  "Automotive",
  "Travel",
  "Hobbies",
  "Design"
]);

let content = ref<string>('jojo')

const myEditor = ref<InstanceType<typeof QuillEditor> | null>(null);
const editorOptions = ref({
    theme: "snow",
    modules: {
        toolbar: [
            [{ header: [1, 2, false] }],
            [{ 'font': [] }],
            ["bold", "italic", "underline", "strike"],
            ["image", "code-block", "link"],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'align': [] }],
        ],
    },
    placeholder: "Write something epic...",
});

function handleTextChange() {
    if (myEditor.value) {
        body.value = myEditor.value.getHTML();
    }
}
function setEditorContents() {
    myEditor.value?.setHTML(body.value)
}

function handleFileChange (event: any) {
    thumbnail = event.target.files[0];
}

let blog = ref<IBlog | null>(null)
let blogId = useRoute().params.id as string

let feedback = ref<any>(null)

async function delBlog(){
    let res = await deleteBlog(blogId)

    if (res.status == 200) {
        router.push('/my-blogs')
    }

    feedback.value = res

    clearFeedBack()
}


let title = ref<string>(blog.value?.title as string)
let category = ref<string>(blog.value?.category as string)
let body = ref<string>(blog.value?.body as string)
let thumbnail: any = null


async function edit() {
    let formData = new FormData()

    formData.append('id', user.value?._id as string)
    formData.append('title', title.value)
    formData.append('category', category.value)
    formData.append('thumbnail', thumbnail)
    formData.append('body', body.value)
    formData.append('blogId', blogId)

    let res = await editBlog(formData)

    blog.value = await getBlog(blogId)

    feedback.value = res
    
    
    clearFeedBack()    
}

function clearFeedBack() {
    setTimeout(() => {
        feedback.value = null
    }, 3000)
}
onMounted(async () => {
    blog.value = await getBlog(blogId)

    title.value = blog.value?.title as string
    category.value = blog.value?.category as string
    body.value = blog.value?.body as string
})
</script>

<style scoped></style>
