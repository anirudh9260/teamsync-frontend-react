import { createSlice } from '@reduxjs/toolkit'
import UserSession from '../../services/auth'

const initialState = {
    isLoading: false,
    message: '',
    access_token: null,
    users: [],
    isError: false,
}

export const authReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        postLogin(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },
        postLoginSuccess(state, action) {
            UserSession.setUser(action.payload)
            return {
                ...state,
                isLoading: false,
            }
        },
        postLoginFailed(state, action) {
            const errorMessage = action?.payload?.response?.data?.error
                ? action?.payload?.response?.data?.error
                : ''
            return {
                ...state,
                message: `User login failed: ${errorMessage}`,
                isLoading: false,
                isError: true,
            }
        },
        postRegister(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },
        postRegisterSuccess(state, action) {
            return {
                ...state,
                user: action.payload?.data,
                isLoading: false,
            }
        },
        postRegisterFailed(state, action) {
            const errorMessage = action?.payload?.response?.data?.error
                ? action?.payload?.response?.data?.error
                : ''
            return {
                ...state,
                message: `User registration failed: ${errorMessage}`,
                isLoading: false,
                isError: true,
            }
        },
        passwordReset(state, action) {
            return {
                ...state,
                isLoading: true,
                message: '',
            }
        },
        passwordResetSuccess(state, action) {
            return {
                ...state,
                user: action.payload.data,
                isLoading: false,
                message: 'Password Changed Successfully',
                isError: false,
            }
        },
        passwordResetFailed(state, action) {
            console.log(action.payload.response.data)
            return {
                ...state,
                isLoading: false,
                message: action.payload.response.data['error'],
                isError: true,
            }
        },

        fetchUsers(state, action) {
            return {
                ...state,
                isLoading: true,
                message: '',
            }
        },
        fetchUsersSuccess(state, action) {
            return {
                ...state,
                users: action.payload,
                isLoading: false,
                isError: false,
            }
        },
        fetchUsersFailed(state, action) {
            console.log(action.payload.response.data)
            return {
                ...state,
                isLoading: false,
                message: action.payload.response.data['error'],
                isError: true,
            }
        },

        postLogout(state, action) {
            return {
                ...state,
                message: '',
                isLoading: true,
            }
        },
        postLogoutSuccess(state, action) {
            UserSession.removeUser()
            return {
                ...state,
                isLoading: false,
            }
        },
        postLogoutFailed(state, action) {
            const errorMessage = action?.payload?.response?.data?.error
                ? action?.payload?.response?.data?.error
                : ''
            return {
                ...state,
                message: `User logout failed: ${errorMessage}`,
                isLoading: false,
                isError: true,
            }
        },
    },
})

export const {
    postLogin,
    postLoginSuccess,
    postLoginFailed,
    postRegister,
    postRegisterSuccess,
    postRegisterFailed,
    passwordReset,
    passwordResetSuccess,
    passwordResetFailed,
    fetchUsers,
    fetchUsersSuccess,
    fetchUsersFailed,
    postLogout,
    postLogoutSuccess,
    postLogoutFailed,
} = authReducer.actions

export default authReducer.reducer
