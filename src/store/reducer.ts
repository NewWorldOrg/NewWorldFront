import { RootStateType, UserStateType, State, UserState } from './state'
import { Actions } from './action'

export default function reducer(state = { ...State, ...UserState }, action: Actions): RootStateType | UserStateType {
  switch ('type' in action && action.type) {
    case 'POST_ACTION':
      return {
        ...state,
        ...action.payload,
      }
    case 'LOAD_ACTION':
      return {
        ...state,
        ...action.payload,
      }
    case 'POST_REQUEST_ACTION':
      return {
        ...state,
        isPosting: true,
      }
    case 'POST_ACTION_SUCCESS':
      return {
        ...state,
        ...action.payload,
      }
    case 'POST_ACTION_FAILURE':
      return {
        ...state,
        ...action.payload,
      }
    case 'IS_LOGIN_CHECK_ACTION':
      return {
        ...state,
        ...action.payload,
      }
    case 'IS_LOGIN_CHECK_ACTION_FAILURE':
      return {
        ...state,
        ...action.payload,
      }
    case 'POST_STATUS_RESET':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
