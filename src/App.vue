<script setup lang="ts">
import { ref } from 'vue'
import GameBoard from './components/GameBoard.vue'
import InputForm from './components/InputForm.vue'

const players = ref<{ symbol: string; name: string }[]>([])

let currentPlayer = ref('x')

const readyPlayer = (name: string, player: string) => {
  console.log(name, player)

  if (player === 'one' && name.length > 0) {
    players.value.push({
      symbol: 'X',
      name
    })
  }

  if (player === 'two' && name.length > 0) {
    players.value.push({
      symbol: 'O',
      name
    })
  }
}

const playerPlayed = (player: string) => {
  if (player === currentPlayer.value) {
  }
}
</script>

<template>
  <main class="w-screen h-screen bg-slate-800 text-slate-50 flex items-center justify-center gap-4">
    <InputForm @handleClick.once="readyPlayer" :id="'one'" />
    <GameBoard :currentPlayer="currentPlayer" />
    <InputForm @handleClick.once="readyPlayer" :id="'two'" />
  </main>
</template>

<style scoped></style>
