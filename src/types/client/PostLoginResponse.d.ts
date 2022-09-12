export default interface PostLoginResponse {
  status: boolean
  error: null | {
    types: string
  }
  message: string
  data: {
    // eslint-disable-next-line camelcase
    access_token: string
    user: {
      id: number
      userId: string
      name: string
      iconUrl: string
      status: string
    }
  }
}
