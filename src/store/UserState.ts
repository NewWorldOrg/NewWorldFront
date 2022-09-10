import { atom, selector } from 'recoil'
import { UserStateType } from '../types/store/UserState'
import { bearerAuthentication } from '../client/NewWorldApi'

export const userState = atom<UserStateType>({
  key: 'user/userState',
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

export const syncUser = selector({
  key: 'user/syncUser',
  get: async ({ get }) => {
    let accessToken = ''
    const cookies = document.cookie
    const cookiesArray = cookies.split('; ')
    for (const c of cookiesArray) {
      const keyValue = c.split('=')
      if (keyValue[0] === 'access_token') {
        accessToken = keyValue[1]
      }
    }
    const _userState = get(userState).user
    if (!_userState) {
      return _userState
    }
    const result = await bearerAuthentication(accessToken)
    if (!result.status) {
      return {
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
      }
    }
    return result.data
  },
})
