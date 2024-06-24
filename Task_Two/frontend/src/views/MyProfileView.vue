<template>
    <div class="grid my-10 lg:mx-40">
        <div class="flex flex-col gap-5">
            <img class="h-32 w-32 lg:h-40 lg:w-40 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="">
            <div>
                <Button class="bg-blue-700 hover:bg-blue-800">
                    <label for="files" class="btn hover:cursor-pointer">
                        Choose image
                    </label>
                </Button>
                <input id="files" style="visibility:hidden;" type="file" accept="image/*">
            </div>
            
            <form class="flex flex-col gap-5">
                <input placeholder="First name" required class="block min-w-full text-base rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2">
    
                <input placeholder="Last name" required class="block min-w-full text-base rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2">
    
                <Button class="bg-blue-700 hover:bg-blue-800">
                    Save changes
                </Button>
            </form>

            <hr class="my-10">

            <form class="flex flex-col gap-5">
                <div>Change password</div>
                <input placeholder="Current password" required class="block min-w-full text-base rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2">
    
                <input placeholder="New password" required class="block min-w-full text-base rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2">

                <input placeholder="Confirm new password" required class="block min-w-full text-base rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2">
    
                <Button class="bg-blue-700 hover:bg-blue-800">
                    Change password
                </Button>
            </form>

            <hr class="my-10">

            <div class="flex gap-3 items-center">
                <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                </svg> 
                Danger Zone
            </div>
            <div class="bg-red-100 text-red-500 rounded-lg px-5 py-7">
                <div>Delete account</div>
                <div class="text-base">By deleting your account, all your blogs will be deleted. This action is irreversible</div>
                <Button class="text-red-700 ring-1 ring-red-500 mt-5 hover:bg-red-200" @click="showDelModal = true">Delete account</Button>
            </div>

        </div>

        <!-- delete account modal -->
        <Transition>
            <div v-if="showDelModal">
                <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
    
                    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div class="flex w-screen min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <div class="relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                    <form class="sm:flex sm:items-start">
                                        <div class="mt-3 w-full text-center sm:mt-0 sm:text-left">
                                            <h3 class="text-base font-semibold leading-6 text-gray-900 text-start" id="modal-title">Enter password to delete account</h3>
                                            <div class="mt-2">
                                                <input placeholder="Enter password" required class="block w-full text-base rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2">
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="button" class="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Delete account</button>
                                    <button type="button" class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" @click="showDelModal = false">Cancel</button>
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
import Button from '@/components/Button.vue';
import { ref } from 'vue';

let showDelModal = ref<boolean>(false)
</script>

<style scoped>

</style>