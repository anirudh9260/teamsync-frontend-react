import { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { register } from '../../redux/actions/auth'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { useNavigate } from 'react-router-dom'
import SnackbarNotification from '../../components/SnackbarNotification'
import { FormBackdropElement } from '../../components/FormElements'




const theme = createTheme()

export default function SignUp() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const authState = useAppSelector(state => state.authReducer)

    const [snackbarState, setSnackbarState] = useState(false)

    const handleSubmit = event => {
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        let context = {
            //  TODO : Needs to be updated in backend
            // first_name: data.get('firstName'),
            // last_name: data.get('lastName'),
            username: data.get('username'),
            email: data.get('email'),
            password: data.get('password'),
            role: 'user',
        }
        dispatch(register(context)).then(res => {
            if (res && res?.payload && res?.payload?.status == 201) {
                navigate('/signin')
            }
        })
    }

    useEffect(() => {
        setSnackbarState(true)
    }, [authState.message])

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
                        Sign up
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link to="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
            {snackbarState && authState.message && (
                <SnackbarNotification
                    message={authState.message}
                    onClose={() => setSnackbarState(false)}
                    severity={authState.isError ? 'error' : 'success'}
                />
            )}
        </ThemeProvider>
    )
}
