<script setup lang="ts"></script>

<template>
  <div id="board" class="grid grid-cols-3 gap-2">
    <div v-for="card in 9" :key="card">
      <div
        class="relative bg-slate-700 h-[150px] w-[150px] rounded-sm flex items-center justify-center text-slate-300 cursor-pointer"
      >
        <p>{{ card }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
