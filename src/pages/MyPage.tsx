import React from 'react'
import { commonState } from '../store/CommonState'
import { syncUser } from '../store/UserState'
import { useNavigate } from 'react-router-dom'
import { Avatar, CircularProgress } from '@material-ui/core'
import '../styles/MyPage.scss'
import { useRecoilValue } from 'recoil'

export default function MyPage() {
  const navigate = useNavigate()
  const state = useRecoilValue(commonState)
  const bearerUserState = useRecoilValue(syncUser)

  if (!bearerUserState) {
    navigate('/login')
  }

  if (state.isLoading) {
    return (
      <div className="loading-view-container">
        <div className="loading-view-description">
          <CircularProgress color="secondary" />
          <div className="loading-text">
            <p>Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="my-page">
      <Avatar className="icon" alt="Icon" src={bearerUserState.user.iconUrl} sizes="20" />
      <div className="drug-pie-chart">ログインしまています</div>
    </div>
  )
}
