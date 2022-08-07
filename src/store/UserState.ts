import { atom } from 'recoil'
import { UserStateType } from '../types/store/UserState'

export const userState = atom<UserStateType>({
  key: 'userState',
  default: {
    user: {
      id: 0,
      userId: 0,
      name: '',
      iconUrl: '',
      status: '',
      medicationHistories: [
        {
          id: 0,
          amount: '',
          drug: {
            id: 0,
            drugName: '',
            url: '',
          },
        },
      ],
    },
  },
})
