export default interface PostLoginResponse {
  status: boolean
  error: null | {
    types: string
  }
  message: string
  data: null | {
    // eslint-disable-next-line camelcase
    access_token: string
    user: {
      id: number
      userId: number
      name: string
      iconUrl: string
      status: string
    }
  }
}
