export interface RootStateType {
  isAuthenticated: boolean
  isPosting: boolean
  status: boolean
  message: string
}

const State: RootStateType = {
  isAuthenticated: false,
  isPosting: false,
  status: true,
  message: '',
}

export default State
