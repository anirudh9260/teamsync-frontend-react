import * as React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Home from './components/Home'
import TopBar from './components/TopBar'
import About from './pages/Home/About'
import PageNotFound from './pages/Home/PageNotFound'
import Profile from './pages/Home/Profile'
import SignIn from './pages/Home/SignIn'
import SignUp from './pages/Home/SignUp'
import ProjectSettings from './pages/Settings/ProjectSettings'
import UserSession from './services/auth'

function App() {
    return (
            <div>
            <TopBar />
            <div style={{ marginTop: 10 }}>
                <Routes>
                    {/* <Route
                        exact
                        path="/"
                        element={<Home />}
                        render={() => {
                            return UserSession.isAuthenticated() ? (
                                <Navigate to="/dash" />
                            ) : (
                                <Navigate to="/signin" />
                            )
                        }}
                    /> */}

                    {/* <Route
                        path="/"
                        element={
                            UserSession.isAuthenticated() ? (
                                <Home />
                            ) : (
                                <SignIn />
                            )
                        }
                    /> */}
                    <Route
                        path="/"
                        element={
                            UserSession.isAuthenticated() ? (
                                <Home />
                            ) : (
                                <SignIn />
                            )
                        }
                    />

                    <Route path="/dmp/dash" element={<Home />}></Route>
                    <Route path="/dash" element={<Home />}></Route>
                    <Route path="/signin" element={<SignIn />}></Route>
                    <Route
                        path="/settings"
                        element={<ProjectSettings />}
                    ></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </div>
            </div>
    )
}

export default App
