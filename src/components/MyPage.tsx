import React, { useEffect } from 'react'
import { UserStateType } from '../store/state'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { bearerAuthenticationAsync } from '../store/action'

export default function MyPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    const bearerAction = async () => {
      await dispatch(bearerAuthenticationAsync())
    }
    bearerAction().then(() => {
      if (!isAuthenticated) {
        history.push('/login')
      }
    })
  }, [dispatch, history])
  const isAuthenticated = useSelector((state: UserStateType) => state.isAuthenticated)
  return (
    <div className="my-page">
      <h1>My Page</h1>
    </div>
  )
}
