import { Action, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import {
  PostLoginParameter,
  PostLoginResponse,
  postLogin,
  bearerAuthentication,
  BearerAuthenticationResponse,
  PostRegisterParameter,
  PostRegisterResponse,
  postRegister,
} from '../client/NewWorldApi'

enum ActionTypes {
  POST_ACTION = 'POST_ACTION',
  LOAD_ACTION = 'LOAD_ACTION',
  POST_ACTION_SUCCESS = 'POST_ACTION_SUCCESS',
  POST_ACTION_FAILURE = 'POST_ACTION_FAILURE',
  POST_STATUS_RESET = 'POST_STATUS_RESET',
  IS_LOGIN_CHECK_ACTION = 'IS_LOGIN_CHECK_ACTION',
  IS_LOGIN_CHECK_ACTION_FAILURE = 'IS_LOGIN_CHECK_ACTION_FAILURE',
}

const postRequest = () => {
  return {
    type: ActionTypes.POST_ACTION,
    payload: {
      isPosting: true,
      status: true,
    },
  }
}

const loadAction = () => {
  return {
    type: ActionTypes.LOAD_ACTION,
    payload: {
      isLoading: true,
    },
  }
}

const postLoginSuccess = (accessToken: string) => {
  document.cookie = 'access_token=' + accessToken + ';'
  return {
    type: ActionTypes.POST_ACTION_SUCCESS,
    payload: {
      isAuthenticated: true,
      isPosting: false,
      status: true,
      message: '',
    },
  }
}

const postLoginFailure = (message: string) => {
  return {
    type: ActionTypes.POST_ACTION_FAILURE,
    payload: {
      isAuthenticated: false,
      isPosting: false,
      status: false,
      message,
    },
  }
}

const postRegisterSuccess = (message: string) => {
  return {
    type: ActionTypes.POST_ACTION_SUCCESS,
    payload: {
      isPosting: false,
      isRegistered: true,
      message,
    },
  }
}

const postRegisterFailure = (message: string) => {
  return {
    type: ActionTypes.POST_ACTION_FAILURE,
    payload: {
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
      isAuthenticated: false,
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
      user: result.user,
      isLoading: false,
    },
  }
}

export const bearerAuthActionFailure = () => {
  return {
    type: ActionTypes.IS_LOGIN_CHECK_ACTION_FAILURE,
    payload: {
      isAuthenticated: false,
      isLoading: false,
    },
  }
}

export const bearerAuthenticationAsync = (): ThunkAction<void, BearerAuthenticationResponse, undefined, Actions> => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(loadAction())
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
      if (!result.status) {
        return dispatch(bearerAuthActionFailure())
      }
      return dispatch(bearerAuthAction(result.data))
    } catch {
      return dispatch(bearerAuthActionFailure())
    }
  }
}

export const postLoginRequestAsync = (
  request: PostLoginParameter
): ThunkAction<void, PostLoginResponse, undefined, Actions> => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(postRequest())
    try {
      const result = await postLogin(request)
      if (!result.status) {
        return dispatch(postLoginFailure('ユーザーIDまたはパスワードに誤りがあります'))
      }
      return dispatch(postLoginSuccess(result.data.access_token))
    } catch {
      return dispatch(postLoginFailure('ユーザーIDまたはパスワードに誤りがあります'))
    }
  }
}

export const postRegisterRequestAsync = (
  request: PostRegisterParameter
): ThunkAction<void, PostRegisterResponse, undefined, Actions> => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(postRequest())
    if (request.password !== request.password_confirm) {
      return dispatch(postRegisterFailure('パスワードが一致しません'))
    }
    try {
      const result = await postRegister(request)
      if (!result.status) {
        return dispatch(postRegisterFailure('パスワードの登録に失敗しました'))
      }
      return dispatch(postRegisterSuccess('パスワードの登録に成功しました'))
    } catch {
      return dispatch(postRegisterFailure('ユーザーID・パスワードを確認してください'))
    }
  }
}

export type Actions =
  | ReturnType<typeof postLoginRequestAsync>
  | ReturnType<typeof bearerAuthenticationAsync>
  | ReturnType<typeof postRegisterRequestAsync>
