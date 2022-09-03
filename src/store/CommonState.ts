import { atom } from 'recoil'
import { CommonStateType } from '../types/store/CommonState'

export const commonState = atom<CommonStateType>({
  key: 'commonState',
  default: {
    isPosting: false,
    isLoading: false,
    status: false,
    message: '',
    accessToken: '',
  },
})
