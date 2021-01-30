import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import * as colors from '@material-ui/core/colors'
import Container from '@material-ui/core/Container'
import { Link, useHistory } from 'react-router-dom'
import { RootStateType, UserStateType } from '../store/state'
import { postLoginRequestAsync, postStatusReset } from '../store/action'

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
  const history = useHistory()
  const dispatch = useDispatch()
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: colors.blue[800],
      },
      type: 'dark',
    },
  })
  const isAuthenticated = useSelector((state: UserStateType) => state.isAuthenticated)
  const isPosting = useSelector((state: RootStateType) => state.isPosting)
  const status = useSelector((state: RootStateType) => state.status)
  const message = useSelector((state: RootStateType) => state.message)
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
    dispatch(postStatusReset())
  }, [setIsClose, dispatch])

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault()
      event.persist()
      const submitData = new FormData()
      submitData.append('user_id', userId)
      submitData.append('password', password)
      setIsClose(false)
      dispatch(postLoginRequestAsync(submitData))
    },
    [dispatch, userId, password, setIsClose]
  )

  if (isAuthenticated) {
    history.push('/my-page')
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={!isPosting && !status && !isClose}
        onClose={handleDialogClose}
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
      >
        <DialogTitle>ログインに失敗しました</DialogTitle>
        <DialogContent>{message}</DialogContent>
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
                  disabled={isPosting}
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
