import React, { useEffect } from 'react'
import { commonState } from '../store/CommonState'
import { userState } from '../store/UserState'
import { useNavigate } from 'react-router-dom'
import { bearerAuthenticationAsync } from '../store/action'
import { Avatar, CircularProgress } from '@material-ui/core'
import '../styles/MyPage.scss'
import { useRecoilValue } from 'recoil'

export default function MyPage() {
  const history = useNavigate()
  const user = useRecoilValue(userState)
  const state = useRecoilValue(commonState)
  useEffect(() => {
    const bearerAction = async () => {
      await bearerAuthenticationAsync()
    }
    bearerAction().then(() => {
      if (!state.status) {
        history('/login')
      }
    })
  }, [history, state])
  const drug: Record<string, number> = {}
  // eslint-disable-next-line array-callback-return
  console.log(user)
  if (user.user.medicationHistories !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user.user.medicationHistories.map((key: Record<string, any>) => {
      const amount = Number(key.amount)
      drug[key.medicationHistory.drug.drug_name] =
        drug[key.medicationHistory.drug.drug_name] !== undefined
          ? (drug[key.medicationHistory.drug.drug_name] += amount)
          : (drug[key.medicationHistory.drug.drug_name] = amount)
    })
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
      <Avatar className="icon" alt="Icon" src={user.user.iconUrl} sizes="20" />
      <div className="drug-pie-chart">
        ログインしまています
      </div>
    </div>
  )
}
