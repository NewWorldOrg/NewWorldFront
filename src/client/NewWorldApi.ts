import axios from 'axios'
import PostRegisterResponse from '../types/client/PostRegisterResponse'
import PostLoginResponse from '../types/client/PostLoginResponse'
import BearerAuthenticationResponse from '../types/client/BearerAuthenticationResponse'
import PostLoginParameter from '../types/client/PostLoginParameter'
import PostRegisterParameter from '../types/client/PostRegisterParameter'

export async function postRegister(request: PostRegisterParameter): Promise<PostRegisterResponse> {
  const result = await axios({
    method: 'POST',
    url: import.meta.env.VITE_API_BASE_URL + '/api/users/register',
    headers: {
      'content-type': 'multipart/form-data',
    },
    data: request,
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
  })
  return result.data
}
