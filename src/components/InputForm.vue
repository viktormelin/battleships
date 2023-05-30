<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ currentPlayer: number }>()

defineEmits<{ (e: 'startGame'): void; (e: 'nextPlayer'): void }>()

const userName = ref('')
</script>

<template>
  <div class="flex flex-col gap-1">
    <input
      v-model="userName"
      placeholder="Namn"
      type="text"
      class="w-full text-sm bg-slate-500 rounded-sm p-2 border-0 text-slate-50 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-400"
    />
    <button
      v-if="props.currentPlayer === 1"
      @click="$emit('nextPlayer', userName)"
      class="rounded-sm bg-blue-500 hover:bg-blue-600 cursor-pointer flex w-full items-center justify-center p-1"
    >
      Klar
    </button>
    <button
      v-if="props.currentPlayer === 2"
      @click="$emit('startGame')"
      class="rounded-sm bg-blue-500 hover:bg-blue-600 cursor-pointer flex w-full items-center justify-center p-1"
    >
      Starta
    </button>
  </div>
</template>

<style scoped></style>
