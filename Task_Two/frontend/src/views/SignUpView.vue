<template>
    <div class="grid lg:grid-cols-2">
        <div class="hidden lg:block">
            <img src="/Secure data-bro.svg"  alt="">
        </div>
        <div>
            <div class="flex min-h-full flex-col justify-center py-5 lg:px-8">
                <div class="bg-gray-100 rounded-xl p-5">
                    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img class="mx-auto h-16 w-auto" src="/logo.png" alt="logo">
                        <h2 class="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Create an account</h2>
                    </div>
    
                    <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form class="space-y-4" @submit.prevent="createAcc">
                            <div>
                                <input v-model="firstName"type="text" name="firstname" placeholder="First name" required class="block w-full text-base rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2">
                            </div>
    
                            <div>
                                <input type="text" v-model="lastName" name="lastname" placeholder="Last name" required class="block w-full text-base rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2">
                            </div>
    
                            <div>
                                <input name="email" v-model="email" type="email" placeholder="Email" required class="block w-full text-base rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2">
                            </div>
    
                            <div>
                                <input name="password" type="password" v-model="password" placeholder="Password" required class="block w-full text-base rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2">
                            </div>
    
                            <div>
                                <input name="password" type="password" v-model="confirmPassword" placeholder="Comfirm password" required class="block w-full text-base rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2">
                            </div>
    
                            <div>
                                <button type="submit" class="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign up</button>
                            </div>
                            
                        </form>
<!--     
                        <div class="inline-flex items-center justify-center w-full">
                            <hr class="w-full h-px my-8 bg-gray-200 border-0 dark:bg-gray-700">
                            <span class="absolute px-3 font-medium text-gray-900 mb-1 bg-gray-100">or</span>
                        </div>
    
                        <div>
                            <SignWithGoogleBtn text="Continue with Google"/>
                        </div> -->

                        <div class="text-center text-sm mt-5">
                            Already have an account? <RouterLink to="/login" class="text-blue-600">Login</RouterLink>
                        </div>
    
                    </div>
                </div>
            </div>
        </div>
    </div>

    <Transition>
        <ToastNotification :feedback="feedback" v-if="feedback"/>
    </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SignWithGoogleBtn from '../components/SignWithGoogleBtn.vue'
import { useAuthStore } from '@/stores/useAuth';
import type { IUser } from '@/types/UserTypes';
import ToastNotification from '@/components/ToastNotification.vue';
import router from '@/router';

let authStore = useAuthStore()
let { createAccount } = authStore

let firstName = ref<string>('')
let lastName = ref<string>('')
let email = ref<string>('')
let password = ref<string>('')
let confirmPassword = ref<string>('')

let feedback = ref<any>(null)

async function createAcc() {
    feedback.value = null;

    if (password.value != confirmPassword.value) {
        feedback.value = {
            status: 400,
            msg: "Password and password confirmation must match"
        }
        return
    }

    let data = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    }

    let req = await createAccount(data)
    feedback.value = req

    clearFeedBack()
}

async function clearFeedBack() {
    setTimeout(() => {
        if(feedback.value?.status == 200 || feedback.value?.status == 201) {
            router.push("/login")
        }

        feedback.value = null
    }, 3000)
}
</script>

<style scoped>

</style>