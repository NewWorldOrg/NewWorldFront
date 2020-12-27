import * as React from 'react'
import { FormControl, Grid, Button, TextField, CssBaseline, Avatar } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import * as colors from '@material-ui/core/colors'
import Container from '@material-ui/core/Container'
import { Link } from 'react-router-dom'
import '../styles/Login.scss'

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
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: colors.blue[800],
      },
      type: 'dark',
    },
  })
  return (
    <ThemeProvider theme={theme}>
      <div className="login-form">
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
      </div>
    </ThemeProvider>
  )
}
