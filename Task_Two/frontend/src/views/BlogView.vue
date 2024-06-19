<template>
    <div class="grid lg:grid-cols-4 my-10">
        <div class="lg:col-span-3">
            <div class="font-medium text-2xl lg:text-4xl">title</div>
            <div>
                <img src="/Secure data-bro.svg" alt="" class="" />
            </div>
            <div>text text tex</div>

            <div class="mt-10 flex flex-col gap-3">
                <div class="text-slate-500 text-base">127 people like this blog</div>

                <Button class="bg-blue-700 hover:bg-blue-800 w-fit">
                    Like blog
                </Button>
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
                        <form class="mb-6">
                            <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                                <label for="comment" class="sr-only">Your comment</label>
                                
                                <textarea
                                    id="comment"
                                    rows="6"
                                    class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
                                    placeholder="Write a comment..."
                                    required
                                ></textarea>
                            </div>
                            <Button class="bg-blue-700 hover:bg-blue-800">Post comment</Button>
                        </form>
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
        <div class="w-full mt-10 lg:mt-0 flex flex-col gap-3">
            <div class="text-slate-500">Other blogs</div>

            <OtherBlogsCard />
            <OtherBlogsCard />
        </div>
    </div>
</template>

<script setup lang="ts">
import OtherBlogsCard from "../components/OtherBlogsCard.vue";
import Button from "@/components/Button.vue";
</script>

<style scoped></style>
