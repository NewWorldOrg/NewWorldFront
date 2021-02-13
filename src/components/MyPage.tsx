import React, { useEffect } from 'react'
import { UserStateType } from '../store/state'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { bearerAuthenticationAsync } from '../store/action'
import { Avatar } from '@material-ui/core'
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
  const user = useSelector((state: UserStateType) => state.user)
  const drug: Record<string, number> = {}

  user.medication_histories.map((key: Record<string, any>) => {
    const amount = Number(key.amount)
    if (drug[key.drug.drug_name] !== undefined) {
      drug[key.drug.drug_name] += amount
    } else {
      drug[key.drug.drug_name] = amount
    }
  })
  return (
    <div className="my-page">
      <Avatar className="icon" alt="Icon" src={user.icon_url} sizes="20" />
    </div>
  )
}
