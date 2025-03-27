import apiClient from '../../services/apiClient'
import {
    CHANGE_PASSWORD,
    LOGIN_API,
    REGISTER_API,
    USERS_API,
    LOGOUT_API,
} from '../../constants'
import {
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
} from '../reducer/auth'

function jwtDecode(t) {
    let token = {}
    token.raw = t
    token.header = JSON.parse(window.atob(t.split('.')[0]))
    token.payload = JSON.parse(window.atob(t.split('.')[1]))
    return token
}

export const login = payload => async dispatch => {
    console.log('Calling action : login()')
    await dispatch(postLogin())
    try {
        const response = await apiClient.post(LOGIN_API, payload)

        if (response.data && response.status === 200) {
            const actionPayload = response.data
            const token = jwtDecode(actionPayload?.access_token)
            actionPayload['userId'] = token?.payload.sub?.user_id
            actionPayload['role'] = token.payload?.sub?.role
            actionPayload['username'] = token?.payload?.sub?.username
            // actionPayload['username'] = payload.username
            // actionPayload['password'] = payload.password
            return dispatch(postLoginSuccess(actionPayload))
        }
        return dispatch(postLoginFailed(response))
    } catch (err) {
        return dispatch(postLoginFailed(err))
    }
}

export const register = payload => async dispatch => {
    console.log('Calling action : register()')
    await dispatch(postRegister())
    try {
        const response = await apiClient.post(REGISTER_API, payload)
        console.log(response)
        if (response.data && response.status === 201) {
            return dispatch(postRegisterSuccess(response))
        }

        return dispatch(postRegisterFailed(response))
    } catch (err) {
        return dispatch(postRegisterFailed(err))
    }
}

export const passwordResetAction = payload => async dispatch => {
    console.log('Calling action : password_reset()')
    await dispatch(passwordReset())
    try {
        const response = await apiClient.put(CHANGE_PASSWORD, payload)
        return dispatch(passwordResetSuccess(response))
    } catch (err) {
        return dispatch(passwordResetFailed(err))
    }
}

export const getAllUsersAction = () => async dispatch => {
    console.log('Calling Action : getAllUsersAction()')
    await dispatch(fetchUsers())
    try {
        const response = await apiClient.get(`${USERS_API}/emails`)

        return dispatch(fetchUsersSuccess(response.data))
    } catch (err) {
        return dispatch(fetchUsersFailed(err))
    }
}

export const logoutAction = () => async dispatch => {
    console.log('Calling Action : logout()')
    await dispatch(postLogout())
    try {
        const response = await apiClient.delete(`${LOGOUT_API}`)
        if (response.status === 200) {
            return dispatch(postLogoutSuccess(response))
        }
        return dispatch(postLogoutFailed(response))
    } catch (err) {
        return dispatch(postLogoutFailed(err))
    }
}

// TODO: update function names so that they follow a pattern. eg: userLogin, userRegister, userLogout
