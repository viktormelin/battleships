<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ id: string; disabled: boolean }>()

defineEmits<{ (e: 'handleClick', player: string): void }>()

const nameInput = ref('')
</script>

<template>
  <div v-if="!props.disabled">
    <div class="flex flex-col justify-center items-center gap-1">
      <p class="mb-2">Player {{ props.id }}</p>
      <input
        type="text"
        v-model="nameInput"
        id="newTodoInput"
        placeholder="Name"
        class="w-full text-sm bg-slate-500 rounded-sm p-2 border-0 text-slate-50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400"
      />
      <button
        v-on:click.prevent="$emit('handleClick', nameInput, props.id)"
        class="rounded-sm bg-blue-500 hover:bg-blue-600 cursor-pointer flex w-full items-center justify-center p-1"
      >
        Ready!
      </button>
    </div>
  </div>
</template>

<style scoped></style>
