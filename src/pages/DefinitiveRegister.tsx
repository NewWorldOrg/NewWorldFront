import React, { FormEvent, useCallback, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { createTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles'
import { blue } from '@material-ui/core/colors'
import {
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  Button,
  Container,
  FormControl,
  CssBaseline,
} from '@material-ui/core'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { commonState } from '../store/CommonState'
import { CommonStateType } from '../types/store/CommonState'
import { definitiveRegister } from '../client/NewWorldApi'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function DefinitiveRegister() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const queryParamToken = searchParams.get('token')
  const classes = useStyles()
  const theme = createTheme({
    palette: {
      primary: {
        main: blue[800],
      },
      type: 'dark',
    },
  })
  const state = useRecoilValue(commonState)
  const setState = useSetRecoilState(commonState)
  const [isClose, setIsClose] = useState<boolean>(false)

  const handleDialogClose = useCallback(() => {
    setIsClose(true)
  }, [setIsClose])
  const handleSubmit = useCallback(
    async (event: FormEvent) => {
      event.preventDefault()
      event.persist()

      setState((): CommonStateType => {
        return {
          isPosting: true,
          isLoading: false,
          status: false,
          message: '',
        }
      })
      const result = await definitiveRegister(queryParamToken as string)
      if (!result.status) {
        setIsClose(false)
        setState((): CommonStateType => {
          return {
            isPosting: false,
            isLoading: false,
            status: result.status,
            message:
              '無効なURLです。\n Discordに届いているURLからもう一度アクセスするかもう一度パスワードを登録してください',
          }
        })
        return
      }
      setIsClose(true)
      navigate('/login')
    },
    [navigate, queryParamToken, setState]
  )
  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={!state.isPosting && !isClose && !state.status && state.message.length !== 0}
        onClose={handleDialogClose}
        disableEscapeKeyDown={true}
      >
        <DialogTitle>認証に失敗しました</DialogTitle>
        <DialogContent>無効なURLか有効期限が切れています</DialogContent>
        <DialogActions>
          <Button onClick={() => handleDialogClose()}>Close</Button>
        </DialogActions>
      </Dialog>
      <form onSubmit={handleSubmit}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              Definitive Register
            </Typography>
            <FormControl className={classes.form}>
              <Button type="submit" variant="contained" color="primary" className={classes.submit}>
                認証
              </Button>
            </FormControl>
          </div>
        </Container>
      </form>
    </ThemeProvider>
  )
}
