export default interface BearerAuthenticationResponse {
  status: boolean
  errors: null | string
  message: string
  data: {
    user: {
      id: number
      userId: number
      name: string
      iconUrl: string
      status: string
      medicationHistories: {
        medicationHistory: {
          id: number
          amount: number
          drug: {
            id: number
            drugName: string
            url: string
          }
        }
      }
    }
  }
}
