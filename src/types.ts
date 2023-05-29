export interface Boat {
  index: number
  kapput: boolean
}
export interface User {
  userName: string
  boats: Boat[]
}
