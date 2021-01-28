import axios from 'axios'
import { API_BASE_URL } from '../../config/config'

export interface PostRegisterResponse {
  status: null
  message: string
}
export interface PostRegisterParameter {
  userId: number
  password: string
  passwordConfirm: string
}

export interface PostLoginResponse {
  status: boolean
  data: {
    // eslint-disable-next-line camelcase
    access_token: string
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
      is_registered: string
      // eslint-disable-next-line camelcase
      del_flg: number
      // eslint-disable-next-line camelcase
      created_at: string
      // eslint-disable-next-line camelcase
      updated_at: string
      // eslint-disable-next-line camelcase
      medication_histories: Record<string, unknown>
    }
  }
}

export interface BearerAuthenticationResponse {
  status: boolean
  message: string
  data: {
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
}

export interface PostLoginParameter {
  // eslint-disable-next-line camelcase
  user_id: number
  password: string
}

export async function postRegister(param: PostRegisterParameter): Promise<PostRegisterResponse> {
  const result = await axios({
    method: 'POST',
    url: API_BASE_URL + '/api/user/register',
    params: {
      param,
    },
  })
  return result.data
}

export async function postLogin(request: PostLoginParameter): Promise<PostLoginResponse> {
  const result = await axios({
    method: 'POST',
    url: API_BASE_URL + '/api/users/login',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data: request,
  })
  return result.data
}

export async function bearerAuthentication(accessToken: string): Promise<BearerAuthenticationResponse> {
  const result = await axios({
    method: 'GET',
    url: API_BASE_URL + 'api/users/',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
  return result.data
}