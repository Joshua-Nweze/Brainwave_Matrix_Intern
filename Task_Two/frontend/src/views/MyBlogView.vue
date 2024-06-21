<template>
    <div class="grid my-10 lg:mx-40">
        <div class="flex gap-5 mb-5">
            <Button class="bg-blue-700 hover:bg-blue-800" @click="showEditModal = true">Edit blog</Button>
            <Button class="bg-red-700 hover:bg-red-800" @click="showDelModal = true">Delete blog</Button>
        </div>
        <div>
            <div class="font-medium text-2xl lg:text-4xl">title</div>
            <div>
                <img src="/Secure data-bro.svg" alt="" />
            </div>
            <div>text text tex</div>

            <div class="mt-16 flex flex-col gap-3">
                <div class="text-slate-500 text-base">127 people like this blog</div>
            </div>

            <div>
                <section
                    class="bg-white py-8 lg:py-16 antialiased"
                >
                    <div>
                        <div class="flex justify-between items-center mb-6">
                            <h2 class="text-lg lg:text-2xl font-bold text-gray-900 ">
                                Comments (20)
                            </h2>
                        </div>
                        <article
                            class="p-6 text-base bg-white rounded-lg"
                        >
                            <footer
                                class="flex justify-between items-center mb-2"
                            >
                                <div class="flex items-center">
                                    <p
                                        class="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold"
                                    >
                                        <img
                                            class="mr-2 w-6 h-6 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                            alt="Michael Gough"
                                        />Michael Gough
                                    </p>
                                    <p
                                        class="text-sm text-gray-600"
                                    >
                                        <time
                                            pubdate
                                            datetime="2022-02-08"
                                            title="February 8th, 2022"
                                            >Feb. 8, 2022</time
                                        >
                                    </p>
                                </div>
                            </footer>
                            <p class="text-gray-500">
                                Very straight-to-point article. Really worth
                                time reading. Thank you! But tools are just the
                                instruments for the UX designers. The knowledge
                                of the design tools are as important as the
                                creation of the design strategy.
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
                                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete</button>
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
                <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
                    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div class="lg:mx-64 flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div class="relative w-screen transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8">
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <div class="sm:flex sm:items-start">
                                        <form class="w-full flex flex-col gap-5">
                                            <div class="text-2xl md:text-4xl">Edit blog post</div>
                                            <div>
                                                <input placeholder="Blog title" required class="block min-w-full text-base rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2">
                                            </div>

                                            <div>
                                                <label class="block mb-2 text-sm font-medium text-gray-900" for="file_input">Blog thumbnail <span class="text-slate-400">(choose an image if you want to change blog thumbnail)</span></label>
                                                <input required class="block w-full text-gray-900 border border-gray-300 rounded-md cursor-pointer py-1.5 bg-gray-50 focus:outline-none text-sm" id="file_input" type="file" accept="image/*">
                                                <p class="mt-1 text-sm text-gray-500 " id="file_input_help">SVG, PNG, JPG or GIF (max size 1mb).</p>
                                            </div>

                                            <select class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" required>
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
                                                <Button class="bg-blue-700 hover:bg-blue-800 inline-flex w-full sm:w-auto">Update blog</Button>
                                                <Button type="button" class="ring-1 ring-gray-300 text-slate-600 hover:bg-gray-50 inline-flex w-full sm:w-auto" @click="showEditModal = false">Cancel</Button>
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
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Button from "@/components/Button.vue";

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
        const editorHTML = myEditor.value.getHTML();
        console.log(editorHTML)
    }
}
function setEditorContents() {
    myEditor.value?.setHTML('<b>hey bou</b>')
}
</script>

<style scoped></style>
