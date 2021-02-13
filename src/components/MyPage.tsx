import React, { useEffect } from 'react'
import { UserStateType, RootStateType } from '../store/state'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { bearerAuthenticationAsync } from '../store/action'
import { Avatar, CircularProgress } from '@material-ui/core'
import '../styles/MyPage.scss'

export default function MyPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const isAuthenticated = useSelector((state: UserStateType) => state.isAuthenticated)
  useEffect(() => {
    const bearerAction = async () => {
      await dispatch(bearerAuthenticationAsync())
    }
    bearerAction().then(() => {
      if (!isAuthenticated) {
        history.push('/login')
      }
    })
  }, [dispatch, history, isAuthenticated])
  const isLoading = useSelector((state: RootStateType) => state.isLoading)
  const user = useSelector((state: UserStateType) => state.user)
  const drug: Record<string, number> = {}

  // eslint-disable-next-line array-callback-return
  user.medication_histories.map((key: Record<string, any>) => {
    const amount = Number(key.amount)
    if (drug[key.drug.drug_name] !== undefined) {
      drug[key.drug.drug_name] += amount
    } else {
      drug[key.drug.drug_name] = amount
    }
  })

  if (isLoading) {
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
      <Avatar className="icon" alt="Icon" src={user.icon_url} sizes="20" />
    </div>
  )
}
