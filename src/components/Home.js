import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';

import { getFilesForProject } from '../redux/actions/files';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import EnhancedTableContainer from '../pages/FilesTable/EnhancedTableContainer';
import { getProjects } from '../redux/actions/projects';
import { setFilesMessage } from '../redux/reducer/files';
import { setMessage } from '../redux/reducer/projects';
import UserSession from '../services/auth';
import ProjectBar from './ProjectBar';
import SnackbarNotification from './SnackbarNotification';


const Home = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    
    const [snackbarState, setSnackbarState] = useState(false)

    const projectsState = useAppSelector(state => state.projectsReducer)
    const filesState = useAppSelector(state => state.filesReducer)

    useEffect(() => {
        dispatch(setFilesMessage())
        dispatch(setMessage())
        if (UserSession.isAuthenticated()) {
            dispatch(getProjects())
        }
    }, [])
    
    useEffect(() => {
        if (!UserSession.isAuthenticated()) {
            navigate('/signin')
        }
    }, [])

    


    useEffect(() => {
        if (!filesState.isUpdating) {
            dispatch(
                getFilesForProject(projectsState.selectedProject.projectId),
            )
        }
    }, [projectsState.selectedProject, filesState.isUpdating])

    

    useEffect(() => {
        setSnackbarState(true)
    }, [projectsState.message, filesState.isUpdating, filesState.isCopying, filesState.isConverting, filesState.isSelected])
    

    return (
            <Container maxWidth="xl">
                <ProjectBar
                ></ProjectBar>
                <EnhancedTableContainer 
                ></EnhancedTableContainer>

                {snackbarState && (projectsState.message) && (
                    <SnackbarNotification
                        message={projectsState.message}
                        onClose={() => setSnackbarState(false)}
                        severity={projectsState.isError ? 'error' : 'success'}
                    />
                )}
                {snackbarState && (filesState.message) && (
                    <SnackbarNotification
                        message={filesState.message}
                        onClose={() => setSnackbarState(false)}
                        severity={filesState.isError ? 'error' : 'success'}
                    />
                )}
            </Container>
    )
}

export default Home