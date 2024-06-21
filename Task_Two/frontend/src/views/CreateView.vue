<template>
    <div class="lg:mx-40">
        <form class="flex flex-col gap-5">
            <div class="text-2xl md:text-4xl">Create a blog post</div>
            <div>
                <input placeholder="Blog title" required class="block w-full text-base rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2">
            </div>

            <div>
                <label class="block mb-2 text-sm font-medium text-gray-900" for="file_input">Blog thumbnail</label>
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
                    :options="editorOptions"
                    ref="myEditor"
                    @editor-change="handleTextChange"
                ></QuillEditor>
            </div>

            <Button type="submit" class="bg-blue-700 hover:bg-blue-800">Post blog</Button>
        </form>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import Button from "@/components/Button.vue";

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


function handleTextChange() {
    if (myEditor.value) {
        const editorInstance = myEditor.value.getHTML();
    }
}
</script>

<style scoped>
</style>
