<script setup lang="ts">
const props = defineProps<{ card: any }>()
defineEmits<{ (e: 'handleCardClick'): void }>()
</script>

<template>
  <div
    :class="card.kapput ? (card.player === 1 ? 'bg-red-500' : 'bg-yellow-500') : 'bg-slate-700'"
    class="relative h-[150px] w-[150px] rounded-sm flex items-center justify-center text-slate-300 cursor-pointer hover:bg-slate-600"
    @click="$emit('handleCardClick', card.index)"
  >
    <p>{{ card.index }}</p>
    <img v-if="card.kapput" class="absolute top-0 left-0" src="../assets/pngegg.png" alt="Kapput" />
  </div>
</template>

<style scoped></style>
