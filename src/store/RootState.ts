export interface RootStateType {
  isPosting: boolean
  isLoading: boolean
  status: boolean
  message: string
}

export const RootState: RootStateType = {
  isPosting: false,
  isLoading: false,
  status: true,
  message: '',
}
