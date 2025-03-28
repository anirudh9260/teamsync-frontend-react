const getToken = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.access_token
}

const setUserToken = token => {
    let user = JSON.parse(localStorage.getItem('user'))
    user.access_token = token
}

const getRefreshToken = () => {
    const user = JSON.parse(localStorage.getItem('user'))
    return user?.refresh_token
}

const setRefreshToken = token => {
    let user = JSON.parse(localStorage.getItem('user'))
    user.refresh_token = token
}

const getUser = () => {
    return JSON.parse(localStorage.getItem('user'))
}

const setUser = user => {
    // console.log(JSON.stringify(user))
    localStorage.setItem('user', JSON.stringify(user))
}

const removeUser = () => {
    localStorage.removeItem('user')
}

const getUserId = () => {
    return JSON.parse(localStorage.getItem('user'))?.userId
}

const getUserName = () => {
    return JSON.parse(localStorage.getItem('user'))?.username
}

const getUserRole = () => {
    return JSON.parse(localStorage.getItem('user'))?.role
}

const isAdmin = () => {
    return JSON.parse(localStorage.getItem('user'))?.role === 'admin'
}

const isAuthenticated = () => {
    return JSON.parse(localStorage.getItem('user')) !== null
}

const UserSession = {
    getToken,
    setUserToken,
    getRefreshToken,
    setRefreshToken,
    getUser,
    setUser,
    removeUser,
    getUserId,
    getUserName,
    getUserRole,
    isAdmin,
    isAuthenticated,
}

export default UserSession
