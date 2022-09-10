export default interface BearerAuthenticationResponse {
  status: boolean
  errors: null
  message: string
  data: {
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
}
