<template>
    <nav class="bg-gray-800">
        <div class="mx-auto px-6 lg:px-40">
            <div class="relative grid grid-cols-2 lg:grid-cols-3 h-16 items-center">
                <div class="flex items-center justify-start items-stretch lg:justify-start">
                    <RouterLink to="/" class="flex flex-shrink-0 items-center">
                        <img class="mx-auto h-16 w-auto" src="/logo-white.png" alt="logo">
                        <span class="hidden md:block ms-3 text-xl text-white">vBlog</span>
                    </RouterLink>
                </div>

                <div class="hidden lg:block">  
                    <SearchBar />
                </div>

                <div class="absolute inset-y-0 right-0 flex justify-end items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div class="relative ml-3">
                        <div v-show="false">
                            <div>
                                <button type="button" class="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                                    <span class="absolute -inset-1.5"></span>
                                    <span class="sr-only">Open user menu</span>
                                    <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
                                </button>
                            </div>
    
                            <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1">
                                <!-- Active: "bg-gray-100", Not Active: "" -->
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-0">Your Profile</a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-1">Settings</a>
                                <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="user-menu-item-2">Sign out</a>
                            </div>
                        </div>

                        <div class="flex gap-3">
                            <RouterLink to="/login">
                                <Button class="bg-blue-700 hover:bg-blue-800">Login</Button>
                            </RouterLink>
                            <RouterLink to="/signup">
                                <Button class="bg-white text-blue-700">Post a blog</Button>
                            </RouterLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import Button from './Button.vue'
import SearchBar from './SearchBar.vue'
</script>
