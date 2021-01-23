import { Action, Dispatch } from 'redux'
import { ThunkAction } from 'redux-thunk'
import { PostLoginParameter, PostLoginResponse, postLogin } from '../client/NewWorldApi'

enum ActionTypes {
  POST_ACTION = 'POST_ACTION',
  POST_ACTION_SUCCESS = 'LOGIN_ACTION_SUCCESS',
  POST_ACTION_FAILURE = 'LOGIN_ACTION_FAILURE',
  POST_STATUS_RESET = 'POST_STATUS_RESET',
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
      isAuthenticated: true,
      isPosting: false,
      status: true,
    },
  }
}

const postLoginFailure = (message: string) => {
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
      isPosting: false,
      status: true,
      message: '',
    },
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

export type Actions = ReturnType<typeof postLoginRequestAsync>
