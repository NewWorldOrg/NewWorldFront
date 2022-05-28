import { Action, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { postLogin, bearerAuthentication, postRegister } from '../client/NewWorldApi'
import BearerAuthenticationResponse from '../types/client/BearerAuthenticationResponse'
import PostRegisterParameter from '../types/client/PostRegisterParameter'
import PostRegisterResponse from '../types/client/PostRegisterResponse'
import PostLoginParameter from '../types/client/PostLoginParameter'
import PostLoginResponse from '../types/client/PostLoginResponse'

// eslint-disable-next-line no-unused-vars
enum ActionTypes {
  // eslint-disable-next-line no-unused-vars
  POST_ACTION = 'POST_ACTION',
  // eslint-disable-next-line no-unused-vars
  LOAD_ACTION = 'LOAD_ACTION',
  // eslint-disable-next-line no-unused-vars
  POST_ACTION_SUCCESS = 'POST_ACTION_SUCCESS',
  // eslint-disable-next-line no-unused-vars
  POST_ACTION_FAILURE = 'POST_ACTION_FAILURE',
  // eslint-disable-next-line no-unused-vars
  POST_STATUS_RESET = 'POST_STATUS_RESET',
  // eslint-disable-next-line no-unused-vars
  IS_LOGIN_CHECK_ACTION = 'IS_LOGIN_CHECK_ACTION',
  // eslint-disable-next-line no-unused-vars
  IS_LOGIN_CHECK_ACTION_FAILURE = 'IS_LOGIN_CHECK_ACTION_FAILURE',
}

const postRequest = () => ({
  type: ActionTypes.POST_ACTION,
  payload: {
    isPosting: true,
    status: true,
  },
})

const loadAction = () => ({
  type: ActionTypes.LOAD_ACTION,
  payload: {
    isLoading: true,
  },
})

const postLoginSuccess = (result: PostLoginResponse) => {
  document.cookie = 'access_token=' + result.data.access_token + ';max-age=1800'
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

const postLoginFailure = (message: string) => ({
  type: ActionTypes.POST_ACTION_FAILURE,
  payload: {
    isAuthenticated: false,
    isPosting: false,
    status: false,
    message,
  },
})

const postRegisterSuccess = (message: string) => ({
  type: ActionTypes.POST_ACTION_SUCCESS,
  payload: {
    isPosting: false,
    isRegistered: true,
    message,
  },
})

const postRegisterFailure = (message: string) => ({
  type: ActionTypes.POST_ACTION_FAILURE,
  payload: {
    isPosting: false,
    status: false,
    message,
  },
})

export const postStatusReset = () => ({
  type: ActionTypes.POST_STATUS_RESET,
  payload: {
    isAuthenticated: false,
    isPosting: false,
    status: true,
    message: '',
  },
})

export const bearerAuthAction = (result: BearerAuthenticationResponse) => ({
  type: ActionTypes.IS_LOGIN_CHECK_ACTION,
  payload: {
    isAuthenticated: true,
    user: result.data.user,
    isLoading: false,
  },
})

export const bearerAuthActionFailure = () => ({
  type: ActionTypes.IS_LOGIN_CHECK_ACTION_FAILURE,
  payload: {
    isAuthenticated: false,
    isLoading: false,
  },
})

export const bearerAuthenticationAsync = (): ThunkAction<
  void,
  BearerAuthenticationResponse,
  undefined,
  Actions
> => async (dispatch: Dispatch<Action>) => {
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
    return dispatch(bearerAuthAction(result))
  } catch {
    return dispatch(bearerAuthActionFailure())
  }
}

export const postLoginRequestAsync = (
  request: PostLoginParameter
): ThunkAction<void, PostLoginResponse, undefined, Actions> => async (dispatch: Dispatch<Action>) => {
  dispatch(postRequest())
  try {
    const result = await postLogin(request)
    if (!result.status) {
      return dispatch(postLoginFailure('ユーザーIDまたはパスワードに誤りがあります'))
    }
    return dispatch(postLoginSuccess(result))
  } catch (e) {
    console.log(e)
    return dispatch(postLoginFailure('ユーザーIDまたはパスワードに誤りがあります'))
  }
}

export const postRegisterRequestAsync = (
  request: PostRegisterParameter
): ThunkAction<void, PostRegisterResponse, undefined, Actions> => async (dispatch: Dispatch<Action>) => {
  dispatch(postRequest())
  if (request.password !== request.password_confirm) {
    return dispatch(postRegisterFailure('パスワードが一致しません'))
  }
  try {
    const result = await postRegister(request)
    await console.log(result.status)
    if (!result.status) {
      return dispatch(postRegisterFailure('パスワードの登録に失敗しました'))
    }
    return dispatch(postRegisterSuccess('パスワードの登録に成功しました'))
  } catch {
    return dispatch(postRegisterFailure('ユーザーID・パスワードを確認してください'))
  }
}

export type Actions =
  | ReturnType<typeof postLoginRequestAsync>
  | ReturnType<typeof bearerAuthenticationAsync>
  | ReturnType<typeof postRegisterRequestAsync>
