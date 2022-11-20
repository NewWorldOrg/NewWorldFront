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
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { commonState } from '../store/CommonState'
import { postRegister } from '../client/NewWorldApi'
import { CommonStateType } from '../types/store/CommonState'
import { useNavigate } from 'react-router-dom'

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
  const navigate = useNavigate()
  const classes = useStyles()
  const state = useRecoilValue(commonState)
  const setState = useSetRecoilState(commonState)
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
    async (event: FormEvent) => {
      event.preventDefault()
      event.persist()
      const submitData = {
        userId,
        password,
        passwordConfirm,
      }
      const result = await postRegister(submitData)
      if (!result.status) {
        setIsClose(false)
        setState((): CommonStateType => {
          return {
            isPosting: false,
            isLoading: false,
            status: result.status,
            message: result.message || 'ログインに失敗しました',
          }
        })
        return
      }
      setIsClose(true)
      navigate('/')
    },
    [userId, password, passwordConfirm, navigate, setState]
  )

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
