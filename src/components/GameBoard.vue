<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { User, Boat } from '../types'
import InputForm from './InputForm.vue'
import WinningScreen from './WinningScreen.vue'

const playerOne = ref<User>({
  userName: '',
  boats: []
})

const playerTwo = ref<User>({
  userName: '',
  boats: []
})

const GameBoard = ref<Boat[]>([])

onMounted(() => {
  for (let i = 0; i < 9; i++) {
    GameBoard.value.push({
      index: i,
      isBoat: false,
      kapput: false,
      player: null
    })
  }
})

let currentPlayer = ref(1)
let oldPlayer: number | null = null
let gameStarted = false
let gameEnded = false

// const userName = ref('')
const activeUser = ref<User>()

const nextPlayer = (userName: string) => {
  if (currentPlayer.value === 1 && playerOne.value?.boats.length === 2) {
    if (userName.length > 0) {
      playerOne.value.userName = userName
    }

    currentPlayer.value++
  } else if (currentPlayer.value === 2 && playerTwo.value?.boats.length === 2) {
    if (userName.length > 0) {
      playerTwo.value.userName = userName
    }
  }
}

const startGame = () => {
  currentPlayer.value = 1
  activeUser.value = playerOne.value
  gameStarted = true
}

const restartGame = () => {
  playerOne.value = { userName: '', boats: [] }
  playerTwo.value = { userName: '', boats: [] }

  GameBoard.value = []

  for (let i = 0; i < 9; i++) {
    GameBoard.value.push({
      index: i,
      isBoat: false,
      kapput: false,
      player: null
    })
  }

  currentPlayer.value = 1
  gameEnded = false
  gameStarted = false
}

const isAllBoatsKapput = (player: number) => {
  let kapputs = 0
  let boats = 0

  for (const card of GameBoard.value) {
    if (card.player === player) {
      if (card.isBoat) boats++
      if (card.kapput) kapputs++
    }
  }

  return kapputs === boats ? true : false
}

const handleCardClick = (id: number) => {
  if (!gameStarted && !gameEnded) {
    if (
      currentPlayer.value === 1 &&
      playerOne.value?.boats.length < 2 &&
      GameBoard.value[id].player !== currentPlayer.value
    ) {
      GameBoard.value[id].isBoat = true
      GameBoard.value[id].player = currentPlayer.value
      playerOne.value.boats.push(id)
    } else if (
      currentPlayer.value === 2 &&
      playerTwo.value?.boats.length < 2 &&
      GameBoard.value[id].player !== currentPlayer.value
    ) {
      GameBoard.value[id].isBoat = true
      GameBoard.value[id].player = currentPlayer.value
      playerTwo.value.boats.push(id)
    }
  } else if (gameStarted && !gameEnded) {
    if (currentPlayer.value === 1) {
      if (GameBoard.value[id].isBoat && GameBoard.value[id].player !== currentPlayer.value) {
        // BÅT GOES KAPPUT
        GameBoard.value[id].kapput = true
      }
    } else if (currentPlayer.value === 2) {
      if (GameBoard.value[id].isBoat && GameBoard.value[id].player !== currentPlayer.value) {
        // BÅT GOES KAPPUT
        GameBoard.value[id].kapput = true
      }
    }

    oldPlayer = currentPlayer.value
    currentPlayer.value = currentPlayer.value === 1 ? 2 : 1
    const allBoatsKapput = isAllBoatsKapput(currentPlayer.value)

    if (allBoatsKapput) {
      gameEnded = true
    }
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div>
      <h1 class="text-xl">Boat goes Kapput</h1>
      <h2 v-if="gameStarted">Spelare {{ currentPlayer }}s tur</h2>
    </div>
    <div id="board" class="relative grid grid-cols-3 gap-1">
      <WinningScreen v-if="gameEnded" :oldPlayer="oldPlayer" @restartGame="restartGame" />
      <div v-for="card in GameBoard" :key="card.index">
        <div
          :class="
            card.kapput ? (card.player === 1 ? 'bg-red-500' : 'bg-yellow-500') : 'bg-slate-700'
          "
          class="relative h-[150px] w-[150px] rounded-sm flex items-center justify-center text-slate-300 cursor-pointer hover:bg-slate-600"
          @click="handleCardClick(card.index)"
        >
          <p>{{ card.index }}</p>
          <img
            v-if="card.kapput"
            class="absolute top-0 left-0"
            src="../assets/pngegg.png"
            alt="Kapput"
          />
        </div>
      </div>
    </div>
    <InputForm
      v-if="!gameStarted"
      :currentPlayer="currentPlayer"
      @startGame="startGame"
      @nextPlayer="nextPlayer"
    />
  </div>
</template>

<style scoped></style>
