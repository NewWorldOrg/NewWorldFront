import React, { useEffect } from 'react'
import { UserStateType, RootStateType } from '../store/state'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { bearerAuthenticationAsync } from '../store/action'
import { Avatar, CircularProgress } from '@material-ui/core'
import { Pie } from 'react-chartjs-2'
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
  const pieOptions = {
    legend: {
      position: 'right',
    },
  }
  const chartColors = [
    '#336699',
    '#99CCFF',
    '#999933',
    '#666699',
    '#CC9933',
    '#006666',
    '#3399FF',
    '#993300',
    '#CCCC99',
    '#666666',
    '#FFCC66',
    '#6699CC',
    '#663366',
    '#9999CC',
    '#CCCCCC',
    '#669999',
    '#CCCC66',
    '#CC6600',
    '#9999FF',
    '#0066CC',
    '#99CCCC',
    '#999999',
    '#FFCC00',
    '#009999',
    '#99CC33',
    '#FF9900',
    '#999966',
    '#66CCCC',
    '#339966',
    '#CCCC33',
    '#003f5c',
    '#665191',
    '#a05195',
    '#d45087',
    '#2f4b7c',
    '#f95d6a',
    '#ff7c43',
    '#ffa600',
    '#EF6F6C',
    '#465775',
    '#56E39F',
    '#59C9A5',
    '#5B6C5D',
    '#0A2342',
    '#2CA58D',
    '#84BC9C',
    '#CBA328',
    '#F46197',
    '#DBCFB0',
    '#545775',
  ]
  const data = {
    labels: Object.keys(drug),
    datasets: [
      {
        data: Object.values(drug),
        backgroundColor: chartColors,
      },
    ],
  }

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
      <div className="drug-pie-chart">
        <Pie data={data} options={pieOptions} />
      </div>
    </div>
  )
}
