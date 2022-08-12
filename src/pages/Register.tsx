import React, { FormEvent, useCallback, useState } from 'react'
import {
  FormControl,
  Button,
  TextField,
  CssBaseline,
  Avatar,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from '@material-ui/core'
import BuildIcon from '@material-ui/icons/Build'
import Typography from '@material-ui/core/Typography'
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import Container from '@material-ui/core/Container'
import { useNavigate } from 'react-router-dom'
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
}))

export default function Register() {
  const classes = useStyles()
  const history = useNavigate()
  const state = useRecoilValue(commonState)
  const theme = createTheme({
    palette: {
      primary: {
        main: blue[800],
      },
      type: 'dark',
    },
  })
  const [userId, setUserId] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordConfirm, setPasswordConfirm] = useState<string>('')
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

  const handleChangePasswordConfirm = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setPasswordConfirm(event.target.value)
    },
    [setPasswordConfirm]
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
      submitData.append('password_confirm', passwordConfirm)
      setIsClose(false)
    },
    [userId, password, passwordConfirm, setIsClose]
  )

  if (!state.status) {
    history('/login')
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={!state.isPosting && !isClose && state.message.length !== 0}
        onClose={handleDialogClose}
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
      >
        <DialogTitle>パスワードの登録に失敗しました</DialogTitle>
        <DialogContent>{state.message}</DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose()} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
      <div className="register-form">
        <form onSubmit={handleSubmit}>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <BuildIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Register
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
                  value={userId}
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
                  value={password}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required={true}
                  fullWidth={true}
                  name="password confirm"
                  label="Password Confirm"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChangePasswordConfirm}
                  value={passwordConfirm}
                />
                <Button type="submit" variant="contained" color="primary" className={classes.submit}>
                  登録
                </Button>
              </FormControl>
            </div>
          </Container>
        </form>
      </div>
    </ThemeProvider>
  )
}
