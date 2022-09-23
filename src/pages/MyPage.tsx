import React, { useEffect } from 'react'
import { syncUser } from '../store/UserState'
import { useNavigate } from 'react-router-dom'
import { Avatar } from '@material-ui/core'
import '../styles/MyPage.scss'
import { useRecoilValue } from 'recoil'

export default function MyPage() {
  const navigate = useNavigate()
  const bearerUserState = useRecoilValue(syncUser)

  useEffect(() => {
    if (bearerUserState.user.id === 0) {
      navigate('/login')
    }
  })

  return (
    <div className="my-page">
      <Avatar className="icon" alt="Icon" src={bearerUserState.user.iconUrl} sizes="20" />
      <div className="drug-pie-chart">ログインしまています</div>
    </div>
  )
}
