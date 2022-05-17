export default interface BearerAuthenticationResponse {
  status: boolean
  message: string
  data: {
    user: {
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
  }
}
