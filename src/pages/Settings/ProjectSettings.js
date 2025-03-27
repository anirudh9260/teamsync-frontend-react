import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Stack, Box, MenuItem, FormControl, Button } from '@mui/material'
import Container from '@mui/material/Container'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'

import AddProjectDialog from '../../components/AddProjectDialog'
import SnackbarNotification from '../../components/SnackbarNotification'
import { useAppSelector, useAppDispatch } from '../../hooks/redux-hooks'
import { setSelectedProjectsAction } from '../../redux/actions/projects'
import { getAllUsersAction } from '../../redux/actions/auth'
import {
    getProjects,
    getProjectAccessAction,
} from '../../redux/actions/projects'
import { setMessage } from '../../redux/reducer/projects'
import UserSession from '../../services/auth'
import DeleteProjectModal from './DeleteProjectDialog'
import EditProjectDialog from './EditProjectDialog'
import ProjectAccessTable from './ProjectAccessTable'

export default function ProjectSettings() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const projectsState = useAppSelector(state => state.projectsReducer)
    const selectedProject = projectsState.selectedProject
    const [snackbarState, setSnackbarState] = useState(false)

    useEffect(() => {
        dispatch(setMessage());
        dispatch(getAllUsersAction())
    }, [])

    useEffect(() => {
        if (UserSession.isAuthenticated()) {
            dispatch(getProjects())
        }
    }, [
        projectsState.isAdding,
        projectsState.isUpdating,
        projectsState.isDeleteting,
    ])

    useEffect(() => {
        setSnackbarState(true)
    }, [projectsState.message])

    const handleSelectProject = event => {
        let obj = projectsState.projects.find(
            o => o.projectId === event.target.value,
        )
        dispatch(setSelectedProjectsAction({ ...obj }))
        dispatch(getProjectAccessAction(obj.projectId))
    }

    return (
        <Container maxWidth="xl">
            <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 2, mb: 4 }}
            >
                <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                        variant="contained"
                        sx={{ my: 1 }}
                        startIcon={<ArrowBackIcon />}
                        onClick={() => navigate('/dash')}
                    ></Button>
                    <Box sx={{ minWidth: 200 }}>
                        <FormControl fullWidth>
                            <InputLabel>Select Project</InputLabel>
                            <Select
                                value={
                                    projectsState.selectedProject?.projectId
                                        ? projectsState.selectedProject
                                                ?.projectId
                                        : ''
                                }
                                label="Select Project"
                                defaultValue=""
                                onChange={handleSelectProject}
                            >
                                {projectsState.projects.map(item => (
                                    <MenuItem
                                        key={item.projectId}
                                        value={item.projectId}
                                    >
                                        {item.projectName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    {selectedProject.projectName && (
                        <EditProjectDialog></EditProjectDialog>
                    )}
                    {selectedProject.projectName && (
                        <DeleteProjectModal></DeleteProjectModal>
                    )}
                </Stack>
                <Stack direction="row">
                    <AddProjectDialog></AddProjectDialog>
                </Stack>
            </Stack>
            {projectsState.isLoadingUsers === false &&
                projectsState.selectedProject.projectName &&
                projectsState.projectAccessUsers && <ProjectAccessTable />}

            {snackbarState && projectsState.message && (
                <SnackbarNotification
                    message={projectsState.message}
                    onClose={() => setSnackbarState(false)}
                    severity={projectsState.isError ? 'error' : 'success'}
                />
            )}
        </Container>
    )
}
