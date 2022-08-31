import React, { FormEvent, useCallback, useState } from 'react'
import {
  FormControl,
  Grid,
  Button,
  TextField,
  CssBaseline,
  Avatar,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import Container from '@material-ui/core/Container'
import { Link, useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { commonState } from '../store/CommonState'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  registerLink: {
    color: '#fff',
  },
}))

export default function Login() {
  const classes = useStyles()
  const navigate = useNavigate()
  const theme = createTheme({
    palette: {
      primary: {
        main: blue[800],
      },
      type: 'dark',
    },
  })
  const state = useRecoilValue(commonState)
  const [userId, setUserId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isClose, setIsClose] = useState<boolean>(false)
  const handleChangeUserId = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setUserId(event.target.value)
    },
    [setUserId]
  )
  const handleChangePassword = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value)
    },
    [setPassword]
  )

  const handleDialogClose = useCallback(() => {
    setIsClose(true)
  }, [setIsClose])

  const handleSubmit = useCallback(
    (event: FormEvent) => {
      event.preventDefault()
      event.persist()
      const submitData = new FormData()
      submitData.append('user_id', userId)
      submitData.append('password', password)
      setIsClose(false)
    },
    [userId, password, setIsClose]
  )

  if (!state.status) {
    navigate('/my-page')
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={!state.isPosting && !isClose && !state.status && state.message.length !== 0}
        onClose={handleDialogClose}
        disableEscapeKeyDown={true}
      >
        <DialogTitle>ログインに失敗しました</DialogTitle>
        <DialogContent>{state.message}</DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose()} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <FormControl className={classes.form}>
                <TextField
                  variant="outlined"
                  color="primary"
                  margin="normal"
                  required={true}
                  fullWidth={true}
                  id="user_id"
                  label="User ID"
                  name="user_id"
                  autoComplete="user_id"
                  onChange={handleChangeUserId}
                  disabled={state.isPosting}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required={true}
                  fullWidth={true}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChangePassword}
                />
                <Button type="submit" variant="contained" color="primary" className={classes.submit}>
                  ログイン
                </Button>
                <Grid container={true}>
                  <Grid item={true} xs={true}>
                    <Link to="/register" className={classes.registerLink}>
                      パスワード登録
                    </Link>
                  </Grid>
                </Grid>
              </FormControl>
            </div>
          </Container>
        </form>
      </div>
    </ThemeProvider>
  )
}
