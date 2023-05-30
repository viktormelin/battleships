<script setup lang="ts">
const props = defineProps<{ oldPlayer: number }>()
defineEmits<{ (e: 'restartGame'): void }>()
</script>

<template>
  <div
    class="absolute z-10 w-full h-full bg-slate-700/90 flex items-center justify-center flex-col gap-2 text-xl p-2 text-center"
  >
    <p>Winner winner, chicken dinner. Player {{ oldPlayer }} made the boats go Kapput</p>
    <button
      @click="$emit('restartGame')"
      class="rounded-sm bg-blue-500 hover:bg-blue-600 cursor-pointer p-2 flex items-center justify-center"
    >
      Starta Om
    </button>
  </div>
</template>

<style scoped></style>
