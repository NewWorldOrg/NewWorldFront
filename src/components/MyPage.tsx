import React from 'react'
import { RootStateType } from '../store/state'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
export default function MyPage() {
  const isAuthenticated = useSelector((state: RootStateType) => state.isAuthenticated)
  const history = useHistory()
  if (!isAuthenticated) {
    history.push('/')
  }
  return (
    <div className="my-page">
      <h1>My Page</h1>
    </div>
  )
}
