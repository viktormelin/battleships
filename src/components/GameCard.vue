<script setup lang="ts">
import { BoardState } from '../types'

const props = defineProps<BoardState>()

defineEmits<{ (e: 'handleClick', id: number): boolean }>()
</script>

<template>
  <div
    @click="$emit('handleClick', props.id)"
    class="relative bg-slate-700 h-[150px] w-[150px] rounded-sm flex items-center justify-center text-slate-300 cursor-pointer"
  >
    <div v-if="props.state === 'x'">
      <p>X</p>
    </div>

    <div v-if="props.state === 'o'">
      <p>O</p>
    </div>
  </div>
</template>

<style scoped></style>
