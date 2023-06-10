import { atom, selector } from 'recoil'
import { UserMedicationHistoryStateType } from '../types/store/UserMedicationHistoryStateType'
import { getUserMedicationHistory } from '../client/NewWorldApi'

export const userMedicationHistory = atom<UserMedicationHistoryStateType>({
  key: 'user/medicationHistory',
  default: {
    current_page: 0,
    data: {
      user: {
        name: '',
      },
      medication_history: [
        {
          id: 0,
          drugName: '',
          amount: 0.0,
          createdAt: '',
        },
      ],
    },
    first_page_url: '',
    from: 0,
    last_page: 0,
    last_page_url: '',
    links: [
      {
        url: null,
        label: '',
        active: false,
      },
    ],
    next_page_url: '',
    path: '',
    per_page: 0,
    prev_page_url: null,
    to: 0,
    total: 0,
  },
})

export const syncUserMedicationHistory = selector({
  key: 'user/madicationHistory',
  get: async ({ get }) => {
    const _userMedicationHistoryState = get(userMedicationHistory)
    if (!_userMedicationHistoryState) {
      return _userMedicationHistoryState
    }
    let accessToken = ''
    const cookies = document.cookie
    const cookiesArray = cookies.split('; ')
    for (const c of cookiesArray) {
      const keyValue = c.split('=')
      if (keyValue[0] === 'access_token') {
        accessToken = keyValue[1]
      }
    }
    const result = await getUserMedicationHistory(accessToken)
    return result.data
  },
})
