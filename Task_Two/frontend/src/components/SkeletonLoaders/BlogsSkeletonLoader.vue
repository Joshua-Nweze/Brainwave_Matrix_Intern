<template>
    <div class="grid grid-cols-1 min-[500px]:grid-cols-2 lg:grid-cols-3 gap-3 mt-8 mb-16">
        <div v-for="loader of 6" class="bg-gray-200 bg-opacity-40 rounded-lg">
            <div class="animate-pulse">
                <div class="flex items-center justify-center h-40 bg-gray-300 rounded dark:bg-gray-700 mb-6">
                    <svg class="w-10 h-10 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                        <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"/>
                    </svg>
                </div>
                <div class="px-6 pb-6 w-full">
                    <h3 class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></h3>
                    <h2 class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></h2>
                    <p class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4 w-full"></p>
                </div>
            </div>
        </div>
    </div>
</template>