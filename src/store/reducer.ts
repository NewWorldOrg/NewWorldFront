import State, { RootStateType } from './state'
import { Actions } from './action'

export default function reducer(state = { ...State }, action: Actions): RootStateType {
  switch ('type' in action && action.type) {
    case 'POST_REQUEST_ACTION':
      return {
        ...state,
        isPosting: true,
      }
    case 'LOGIN_ACTION_SUCCESS':
      return {
        ...state,
        ...action.payload,
      }
    case 'LOGIN_ACTION_FAILURE':
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
