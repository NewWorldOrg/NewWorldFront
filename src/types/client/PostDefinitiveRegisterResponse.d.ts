export default interface PostDefinitiveRegisterResponse {
  status: boolean
  errors: null | {
    types: string
  }
  message: string
  data: null
}
