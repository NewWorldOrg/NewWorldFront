import axios from 'axios'
import PostRegisterResponse from '../types/client/PostRegisterResponse'
import PostLoginResponse from '../types/client/PostLoginResponse'
import BearerAuthenticationResponse from '../types/client/BearerAuthenticationResponse'
import PostLoginParameter from '../types/client/PostLoginParameter'
import PostRegisterParameter from '../types/client/PostRegisterParameter'
import PostDefinitiveRegisterResponse from '../types/client/PostDefinitiveRegisterResponse'
import GetUserMedicationHistoryResponse from '../types/client/GetUserMedicationHistoryResponse'

export async function postRegister(request: PostRegisterParameter): Promise<PostRegisterResponse> {
  const result = await axios({
    method: 'POST',
    url: import.meta.env.VITE_API_BASE_URL + '/api/users/register',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data: {
      user_id: request.userId,
      password: request.password,
      password_confirm: request.passwordConfirm,
    },
  })
  return result.data
}

export async function postLogin(request: PostLoginParameter): Promise<PostLoginResponse> {
  const result = await axios({
    method: 'POST',
    url: import.meta.env.VITE_API_BASE_URL + '/api/users/login',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data: {
      user_id: request.userId,
      password: request.password,
    },
  }).catch((e) => {
    return e.response
  })
  return result.data
}

export async function bearerAuthentication(accessToken: string): Promise<BearerAuthenticationResponse> {
  const result = await axios({
    method: 'GET',
    url: import.meta.env.VITE_API_BASE_URL + '/api/users/',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).catch((e) => {
    return e.response
  })
  return result.data
}

export async function definitiveRegister(definitiveRegisterToken: string): Promise<PostDefinitiveRegisterResponse> {
  const result = await axios({
    method: 'POST',
    url: import.meta.env.VITE_API_BASE_URL + `/api/users/definitive_registers`,
    data: {
      definitive_register_token: definitiveRegisterToken,
    },
  }).catch((e) => {
    return e.response
  })
  return result.data
}

export async function getUserMedicationHistory(accessToken: string): Promise<GetUserMedicationHistoryResponse> {
  const result = await axios({
    method: 'GET',
    url: import.meta.env.VITE_API_BASE_URL + '/api/users/medication_histories',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  }).catch((e) => {
    return e.response
  })
  return result.data
}
