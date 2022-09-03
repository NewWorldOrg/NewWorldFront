import React, { useCallback, useEffect } from 'react'
import { commonState } from '../store/CommonState'
import { userState } from '../store/UserState'
import { useNavigate } from 'react-router-dom'
import { Avatar, CircularProgress } from '@material-ui/core'
import '../styles/MyPage.scss'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { bearerAuthentication } from '../client/NewWorldApi'
import { CommonStateType } from '../types/store/CommonState'

export default function MyPage() {
  const navigate = useNavigate()
  const user = useRecoilValue(userState)
  const state = useRecoilValue(commonState)
  const setState = useSetRecoilState(commonState)
  const isLogin = useCallback(async () => {
    try {
      let accessToken = ''
      const cookies = document.cookie
      const cookiesList = cookies.split('; ')
      for (const c of cookiesList) {
        const keyValue = c.split('=')
        if (keyValue[0] === 'access_token') {
          accessToken = keyValue[1]
        }
      }
      if (accessToken.length === 0) {
        setState((): CommonStateType => {
          return {
            isPosting: false,
            isLoading: false,
            status: false,
            message: '',
            accessToken: '',
          }
        })
      }
      const result = await bearerAuthentication(accessToken)
      if (!result.status) {
        setState((): CommonStateType => {
          return {
            isPosting: false,
            isLoading: false,
            status: false,
            message: result.message,
            accessToken: '',
          }
        })
        setState((): CommonStateType => {
          return {
            isPosting: false,
            isLoading: false,
            status: true,
            message: result.message,
            accessToken,
          }
        })
      }
    } catch {
      setState((): CommonStateType => {
        return {
          isPosting: false,
          isLoading: false,
          status: false,
          message: '',
          accessToken: '',
        }
      })
    }
  }, [setState])
  useEffect(() => {
    setState((): CommonStateType => {
      return {
        isPosting: false,
        isLoading: true,
        status: false,
        message: '',
        accessToken: '',
      }
    })
    const bearerAction = async () => {
      await isLogin()
    }
    bearerAction().then(() => {
      console.log(state)
      if (!state.status) {
        // navigate('/login')
      }
    })
  }, [isLogin, navigate, setState, state])

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
      <div className="drug-pie-chart">ログインしまています</div>
    </div>
  )
}
