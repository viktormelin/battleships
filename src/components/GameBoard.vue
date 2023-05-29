<script setup lang="ts">
import { ref } from 'vue'
import { User } from '../types'

const playerOne = ref<User>({
  userName: '',
  boats: []
})

const playerTwo = ref<User>({
  userName: '',
  boats: []
})

let currentPlayer = 1
let gameStarted = false

const userName = ref('')
const activeUser = ref<User>()

const nextPlayer = () => {
  if (currentPlayer === 1 && playerOne.value?.boats.length === 2) {
    if (userName.value.length > 0) {
      playerOne.value.userName = userName.value
    }

    currentPlayer++
  } else if (currentPlayer === 2 && playerTwo.value?.boats.length === 2) {
    if (userName.value.length > 0) {
      playerTwo.value.userName = userName.value
    }
  }
}

const startGame = () => {
  currentPlayer = 1
  gameStarted = true

  console.log('Game Started', currentPlayer)
}

const handleCardClick = (id: number) => {
  if (!gameStarted) {
    if (currentPlayer === 1 && playerOne.value?.boats.length < 2) {
      if (!playerOne.value.boats[id]) {
        playerOne.value.boats.push({ index: id, kapput: false })
      }
    } else if (currentPlayer === 2 && playerTwo.value?.boats.length < 2) {
      if (!playerTwo.value.boats[id]) {
        playerTwo.value.boats.push({ index: id, kapput: false })
      }
    }
  } else if (gameStarted) {
    console.log(playerTwo.value.boats)
    if (currentPlayer === 1) {
      const index = playerTwo.value.boats.findIndex((boat) => boat.index === id)
      if (playerTwo.value.boats[index]) {
        // BÅT GOES KAPPUT
        console.log('Boat is here')

        playerTwo.value.boats[index].kapput = true
      }

      currentPlayer = 2
    } else if (currentPlayer === 2) {
      const index = playerOne.value.boats.findIndex((boat) => boat.index === id)
      if (playerOne.value.boats[index]) {
        // BÅT GOES KAPPUT
        console.log('Boat is here')
        playerOne.value.boats[index].kapput = true
      }

      currentPlayer = 1
    }
  }
}

const checkForPlayer = (id: number) => {
  console.log('Checking for player', id)

  if (gameStarted) {
    console.log('111')

    if (currentPlayer === 1) {
      console.log('222')

      const index = playerTwo.value.boats.findIndex((boat) => boat.index === id)
      console.log(index)

      if (playerTwo.value.boats[index].kapput) {
        return true
      }
    } else if (currentPlayer === 2) {
      const index = playerOne.value.boats.findIndex((boat) => boat.index === id)
      console.log(index)

      if (playerOne.value.boats[index].kapput) {
        return true
      }
    }
  }
}
</script>

<template>
  <input v-model="userName" type="text" class="text-slate-900" />
  <div id="board" class="grid grid-cols-3 gap-2">
    <div v-for="card in 9" :key="card">
      <div
        :class="
          checkForPlayer(card - 1)
            ? 'relative bg-yellow-700 h-[150px] w-[150px] rounded-sm flex items-center justify-center text-slate-300 cursor-pointer'
            : 'relative bg-slate-700 h-[150px] w-[150px] rounded-sm flex items-center justify-center text-slate-300 cursor-pointer'
        "
        @click="handleCardClick(card - 1)"
      >
        <p>{{ card - 1 }}</p>
      </div>
    </div>
  </div>
  <button v-if="currentPlayer === 1" @click="nextPlayer">Klar</button>
  <button v-if="currentPlayer === 2" @click="startGame">Starta</button>
</template>

<style scoped></style>
