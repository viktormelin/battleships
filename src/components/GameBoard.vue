<script setup lang="ts">
import { ref } from 'vue'
import GameCardVue from './GameCard.vue'
import { BoardState } from '../types'

const props = defineProps<{
  currentPlayer: string
}>()

const gameBoardStates = ref<BoardState[]>([
  {
    id: 1,
    state: false
  },
  {
    id: 2,
    state: false
  },
  {
    id: 3,
    state: false
  },
  {
    id: 4,
    state: false
  },
  {
    id: 5,
    state: false
  },
  {
    id: 6,
    state: false
  },
  {
    id: 7,
    state: false
  },
  {
    id: 8,
    state: false
  },
  {
    id: 9,
    state: false
  }
])

const handleClick = (id: number) => {
  console.log(id, props.currentPlayer)

  const cardIndex = gameBoardStates.value.findIndex((card) => card.id === id)
  gameBoardStates.value[cardIndex].state = props.currentPlayer
}
</script>

<template>
  <div id="board" class="grid grid-cols-3 gap-2">
    <div v-for="card in gameBoardStates" :key="card.id">
      <GameCardVue :id="card.id" :state="card.state" @handleClick.once="handleClick" />
    </div>
  </div>
</template>

<style scoped></style>
