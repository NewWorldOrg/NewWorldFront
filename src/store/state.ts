export interface RootStateType {
  isPosting: boolean
  status: boolean
  message: string
}

export interface UserStateType {
  isAuthenticated: boolean
  user: [
    {
      id: number
      // eslint-disable-next-line camelcase
      user_id: number
      name: string
      // eslint-disable-next-line camelcase
      icon_url: string
      // eslint-disable-next-line camelcase
      access_token: string
      // eslint-disable-next-line camelcase
      is_registered: number
      // eslint-disable-next-line camelcase
      def_flg: number
      // eslint-disable-next-line camelcase
      created_at: string
      // eslint-disable-next-line camelcase
      updated_at: string
      // eslint-disable-next-line camelcase
      medication_histories: [
        {
          id: number
          // eslint-disable-next-line camelcase
          user_id: number
          // eslint-disable-next-line camelcase
          drug_id: number
          amount: number
          // eslint-disable-next-line camelcase
          created_at: string
          // eslint-disable-next-line camelcase
          updated_at: string
          drug: {
            id: number
            // eslint-disable-next-line camelcase
            drug_name: string
            url: string
            // eslint-disable-next-line camelcase
            created_at: string
            // eslint-disable-next-line camelcase
            updated_at: string
          }
        }
      ]
    }
  ]
}

export const State: RootStateType = {
  isPosting: false,
  status: true,
  message: '',
}

export const UserState: UserStateType = {
  isAuthenticated: false,
  user: [
    {
      id: 0,
      // eslint-disable-next-line camelcase
      user_id: 0,
      name: '',
      // eslint-disable-next-line camelcase
      icon_url: '',
      // eslint-disable-next-line camelcase
      access_token: '',
      // eslint-disable-next-line camelcase
      is_registered: 0,
      // eslint-disable-next-line camelcase
      def_flg: 0,
      // eslint-disable-next-line camelcase
      created_at: '',
      // eslint-disable-next-line camelcase
      updated_at: '',
      // eslint-disable-next-line camelcase
      medication_histories: [
        {
          id: 0,
          // eslint-disable-next-line camelcase
          user_id: 0,
          // eslint-disable-next-line camelcase
          drug_id: 0,
          amount: 0,
          // eslint-disable-next-line camelcase
          created_at: '',
          // eslint-disable-next-line camelcase
          updated_at: '',
          drug: {
            id: 0,
            // eslint-disable-next-line camelcase
            drug_name: '',
            url: '',
            // eslint-disable-next-line camelcase
            created_at: '',
            // eslint-disable-next-line camelcase
            updated_at: '',
          },
        },
      ],
    },
  ],
}
