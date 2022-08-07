export interface UserStateType {
  user: {
    id: number
    userId: number
    name: string
    iconUrl: string
    status: string
    medicationHistories: [
      {
        id: number
        amount: string
        drug: {
          id: number
          drugName: string
          url: string
        }
      }
    ]
  }
}
