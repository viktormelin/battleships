export interface Boat {
  index: number
  kapput?: boolean
  isBoat: boolean
  player: number | null
}
export interface User {
  userName: string
  boats: number[]
}
