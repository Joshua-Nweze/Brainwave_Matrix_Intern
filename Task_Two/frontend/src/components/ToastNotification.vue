<template>
    <div class="w-full flex justify-center relative z-50">
      <div
        id="toast-default"
        class="flex items-center w-fit p-2 px-3 text-white rounded-lg shadow fixed z-[99] bottom-10 left-1/2 transform -translate-x-1/2"
        :class="[feedback.status == 200 || feedback.status == 201 ? 'bg-green-500' : 'bg-red-500']"
        role="alert"
      >
        <div class="text-sm font-normal">{{ feedback.msg }}</div>
      </div>
    </div>
  </template>

<script setup lang="ts">
export interface IFeedback {
    msg: string,
    status: string | number
}

defineProps<{
  feedback: IFeedback
}>()
</script>