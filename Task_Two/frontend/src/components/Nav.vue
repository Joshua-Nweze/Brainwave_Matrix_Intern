<template>
    <nav class="bg-gray-800 z-20">
        <div class="mx-auto px-6 lg:px-40">
            <div class="relative grid grid-cols-2 lg:grid-cols-3 h-16 items-center">
                <div class="flex items-center justify-start items-stretch lg:justify-start">
                    <RouterLink to="/" class="flex flex-shrink-0 items-center">
                        <img class="mx-auto h-16 w-auto" src="/logo-white.png" alt="logo">
                        <span class="hidden md:block ms-3 text-xl text-white">vBlog</span>
                    </RouterLink>
                </div>

                <div class="hidden lg:block">  
                    <!-- <SearchBar /> -->
                </div>

                <div class="absolute inset-y-0 right-0 flex justify-end items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div class="relative ml-3 flex gap-3">
                        <RouterLink v-if="!user" to="/login">
                            <Button class="bg-blue-700 hover:bg-blue-800">Login</Button>
                        </RouterLink>
                        <div @click="postBlogBtn">
                            <Button class="bg-white text-blue-400">Post a blog</Button>
                        </div>
                        <div v-if="user" @mouseover="showProfileDropdown = true" @mouseleave="showProfileDropdown = false">
                            <div>
                                <button type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span class="absolute -inset-1.5"></span>
                                    <span class="sr-only">Open user menu</span>
                                    <img v-if="user.profilePic" class="h-8 w-8 rounded-full" :src="`data:image/jpeg;base64,${user?.profilePic.imageBase64}`" alt="profilePicture">
                                    <img v-else class="h-8 w-8 rounded-full" :src="`https://ui-avatars.com/api/?name=${user?.firstName}+${user?.lastName}&background=1d4ed8&color=ffffff`" alt="">
                                </button>
                            </div>
                            <div>
                                <div v-if="showProfileDropdown" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                                    <!-- Active: "bg-gray-100", Not Active: "" -->
                                    <RouterLink to="/me" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</RouterLink>
                                    <RouterLink to="/my-blogs" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Your Blogs</RouterLink>
                                    <hr>
                                    <span @click="logoutUser" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Button from './Button.vue'
import SearchBar from './SearchBar.vue'
import { useAuthStore } from '@/stores/useAuth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

let authStore = useAuthStore()
let { user } = storeToRefs(authStore)

let router = useRouter()

let showProfileDropdown = ref<boolean>(false)

function postBlogBtn() {
    if (!user.value) {
        router.push("/signup")
    } else {
        router.push("/create")
    }
}

function logoutUser() {
    authStore.logout()

    router.push('/')
    window.location.href = window.location.href
}
</script>
