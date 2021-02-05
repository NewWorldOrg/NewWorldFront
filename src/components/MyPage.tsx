import React, { useEffect, useState } from 'react'
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
  const user = useSelector((state: UserStateType) => state.user)
  const drug: object = {}
  user.medication_histories.map((key) => {
    const amount: number = Number(key.amount)
    if (drug[key.drug.drug_name] !== undefined) {
      drug[key.drug.drug_name] += amount
    } else {
      drug[key.drug.drug_name] = amount
    }
  })
  console.log(drug)
  return (
    <div className="my-page">
      <h1>My Page</h1>
    </div>
  )
}
