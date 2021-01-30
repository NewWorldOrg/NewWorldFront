import { Action, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { PostLoginParameter, PostLoginResponse, postLogin, bearerAuthentication, BearerAuthenticationResponse } from '../client/NewWorldApi'

enum ActionTypes {
  POST_ACTION = 'POST_ACTION',
  POST_ACTION_SUCCESS = 'LOGIN_ACTION_SUCCESS',
  POST_ACTION_FAILURE = 'LOGIN_ACTION_FAILURE',
  POST_STATUS_RESET = 'POST_STATUS_RESET',
  IS_LOGIN_CHECK_ACTION = 'IS_LOGIN_CHECK_ACTION',
  IS_LOGIN_CHECK_ACTION_FAILURE = 'IS_LOGIN_CHECK_ACTION_FAILURE',
}

const postLoginRequest = () => {
  return {
    type: ActionTypes.POST_ACTION,
    payload: {
      isPosting: true,
    },
  }
}

const postLoginSuccess = (accessToken: string) => {
  document.cookie = 'access_token=' + accessToken + ';'
  return {
    type: ActionTypes.POST_ACTION_SUCCESS,
    payload: {
      isPosting: false,
      status: true,
    },
  }
}

const postLoginFailure = (message: string) => {
  return {
    type: ActionTypes.POST_ACTION_FAILURE,
    payload: {
      isAuthenticated: true,
      isPosting: false,
      status: false,
      message,
    },
  }
}

export const postStatusReset = () => {
  return {
    type: ActionTypes.POST_STATUS_RESET,
    payload: {
      isPosting: false,
      status: true,
      message: '',
    },
  }
}

export const bearerAuthAction = (result: Record<string, number>) => {
  return {
    type: ActionTypes.IS_LOGIN_CHECK_ACTION,
    payload: {
      isAuthenticated: true,
      user: result.data,
    },
  }
}

export const bearerAuthActionFailure = () => {
  return {
    type: ActionTypes.IS_LOGIN_CHECK_ACTION_FAILURE,
    payload: {
      isAuthenticated: false,
    },
  }
}

export const bearerAuthenticationAsync = (): ThunkAction<void, BearerAuthenticationResponse, undefined, Actions> => {
  return async (dispatch: Dispatch<Action>) => {
    try {
      let accessToken = ''
      const cookies = document.cookie
      const cookiesArray = cookies.split('; ')
      for (const c of cookiesArray) {
        const keyValue = c.split('=')
        if (keyValue[0] === 'access_token') {
          accessToken = keyValue[1]
        }
      }
      const result = await bearerAuthentication(accessToken)
      return dispatch(bearerAuthAction(result))
    } catch {
      return dispatch(bearerAuthActionFailure())
    }
  }
}

export const postLoginRequestAsync = (
  request: PostLoginParameter
): ThunkAction<void, PostLoginResponse, undefined, Actions> => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(postLoginRequest())
    try {
      const result = await postLogin(request)
      return dispatch(postLoginSuccess(result.data.access_token))
    } catch {
      return dispatch(postLoginFailure('ユーザーIDまたはパスワードに誤りがあります'))
    }
  }
}

export type Actions = ReturnType<typeof postLoginRequestAsync> | ReturnType<typeof bearerAuthenticationAsync>
