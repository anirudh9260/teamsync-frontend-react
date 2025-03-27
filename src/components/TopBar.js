import * as React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import MenuIcon from '@mui/icons-material/Menu'
import AppBar from '@mui/material/AppBar'
import Avatar from '@mui/material/Avatar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Toolbar from '@mui/material/Toolbar'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import { useAppDispatch } from '../hooks/redux-hooks'
import { logoutAction } from '../redux/actions/auth'
import { setFilesEmptyAction } from '../redux/actions/files'
import {
    setSelectedProjectsAction,
    setProjectsObjectAction,
} from '../redux/actions/projects'
import UserSession from '../services/auth'

const pages = [
    {
        label: 'Dashboard',
        route: '/dash',
    },
    {
        label: 'About',
        route: '/about',
    },
]

const TopBar = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [anchorElNav, setAnchorElNav] = React.useState(null)
    const [anchorElUser, setAnchorElUser] = React.useState(null)

    const handleOpenNavMenu = event => {
        setAnchorElNav(event.currentTarget)
    }

    const handleOpenUserMenu = event => {
        setAnchorElUser(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null)
    }

    const logOutUser = () => {
        dispatch(logoutAction()).then(res => {
            if (res && res?.payload && res?.payload?.status == 200) {
                dispatch(setSelectedProjectsAction({}))
                dispatch(setProjectsObjectAction())
                dispatch(setFilesEmptyAction())
                handleCloseUserMenu()
                navigate('/signin')
            }
        })
    }

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <CloudUploadIcon></CloudUploadIcon>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                        }}
                    >
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {/* {UserSession.isAuthenticated() && (
                                <MenuItem onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        Home
                                    </Typography>
                                </MenuItem>
                            )} */}

                            {/* <MenuItem onClick={handleCloseNavMenu}>
                                <Typography textAlign="center">
                                    About
                                </Typography>
                            </MenuItem> */}

                            {UserSession.isAuthenticated() &&
                                pages.map((page, index) => (
                                    <MenuItem
                                        key={index}
                                        onClick={() => {
                                            navigate(page.route)
                                            handleCloseNavMenu
                                        }}
                                    >
                                        <Typography textAlign="center">
                                            {page.label}
                                        </Typography>
                                    </MenuItem>
                                ))}
                        </Menu>
                    </Box>

                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontWeight: 500,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Data Management
                    </Typography>
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        {UserSession.isAuthenticated() && (
                            <Button
                                href="/dmp/dash"
                                key="Home"
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                Home
                            </Button>
                        )}
                        <Button
                            key="About"
                            onClick={() => navigate('/about')}
                            sx={{ my: 2, color: 'white' }}
                        >
                            About
                        </Button>
                        <Typography
                            variant="h5"
                            align="center"
                            fontFamily="roboto"
                            sx={{ my: 2, color: 'white', flex: '1' }}
                        >
                            DATA MANAGEMENT
                        </Typography>
                    </Box>

                    {UserSession.isAuthenticated() ? (
                        <>
                            
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt="Remy Sharp"
                                            src="./profilepic.svg"
                                        />
                                    </IconButton>
                                </Tooltip>

                                <Typography
                                    variant="h6"
                                    sx={{
                                        mr: 2,
                                        display: { xs: 'none', md: 'block' },
                                        flexGrow: 1,
                                        fontWeight: 500,
                                        color: 'inherit',
                                    }}
                                >
                                    {UserSession.isAuthenticated()
                                        ? UserSession.getUserName()
                                        : ''}
                                </Typography>

                                <Menu
                                    id="menu-appbar"
                                    sx={{ mt: '45px' }}
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem
                                        onClick={() => {
                                            navigate('/profile')
                                            handleCloseUserMenu()
                                        }}
                                    >
                                        <Typography textAlign="center">
                                            Profile
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem
                                        onClick={() => {
                                            logOutUser()
                                        }}
                                    >
                                        <Typography textAlign="center">
                                            Logout
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </Box>
                        </>
                    ) : location.pathname === '/signin' ? (
                        <Button
                            key="Signup"
                            onClick={() => navigate('/signup')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Sign Up
                        </Button>
                    ) : (
                        <Button
                            key="Login"
                            onClick={() => navigate('/signin')}
                            sx={{ my: 2, color: 'white', display: 'block' }}
                        >
                            Login
                        </Button>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default TopBar
