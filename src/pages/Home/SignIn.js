import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useState, useEffect } from 'react'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { login } from '../../redux/actions/auth'
import { useNavigate } from 'react-router-dom'
import UserSession from '../../services/auth'
import SnackbarNotification from '../../components/SnackbarNotification'
import { FormBackdropElement } from '../../components/FormElements'

const theme = createTheme()

export default function SignIn() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const authState = useAppSelector(state => state.authReducer)

    const [snackbarState, setSnackbarState] = useState(false)

    React.useEffect(() => {
        if (UserSession.isAuthenticated()) {
            navigate('/dash')
        }
    }, [UserSession.isAuthenticated()])

    useEffect(() => {
        setSnackbarState(true)
    }, [authState.message])

    const handleSubmit = event => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        const context = {
            username: data.get('email'),
            password: data.get('password'),
        }
        dispatch(login(context))
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <FormBackdropElement loader={authState.isLoading} />
                {snackbarState && authState.message && (
                    <SnackbarNotification
                        message={authState.message}
                        onClose={() => setSnackbarState(false)}
                        severity={authState.isError ? 'error' : 'success'}
                    />
                )}
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        noValidate
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />

                        {/* {authState.isLoading && (
                            <div>
                                <CircularProgress />
                            </div>
                        )} */}
                        <Button
                            data-type="SignIn"
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                        <Grid container>
                            <Grid item xs>
                                {/* <Link href="#" variant="body2">
                  Forgot password?
                </Link> */}
                            </Grid>
                            <Grid item>
                                <Link to="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
            </Container>
        </ThemeProvider>
    )
}
