import React from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import './App.scss'

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
    color: 'white',
    height: 48,
    padding: '0 30px',
    margin: 20,
    textDecoration: 'none',
  },
})

function LoginButton(props: Record<string, string>) {
  const navigate = useNavigate()
  const other = props
  const classes = useStyles()
  return <Button className={classes.root} {...other} onClick={() => navigate('/login')} />
}

export default function App() {
  return (
    <div className="top-page">
      <div className="title">
        <h1 className="main-title">New World</h1>
        <div className="description">服薬指導室</div>
        <div className="login-bottom">
          <LoginButton>ログイン</LoginButton>
        </div>
      </div>
    </div>
  )
}
