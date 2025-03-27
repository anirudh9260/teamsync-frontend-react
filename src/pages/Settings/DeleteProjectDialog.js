import * as React from 'react';
import { useNavigate } from 'react-router-dom'

import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { setFilesEmptyAction } from '../../redux/actions/files';
import { getProjects, setSelectedProjectsAction, deleteProjectAction } from '../../redux/actions/projects';


export default function DeleteProjectDialog() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const projectsState = useAppSelector(state => state.projectsReducer)
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleDelete = () => {
        dispatch(
            deleteProjectAction(projectsState.selectedProject.projectId),
        ).then(res => {
            if (res && res?.payload && res?.payload?.status == 200) {
                // dispatch(setSelectedProjectsAction({}))
                dispatch(setFilesEmptyAction())
            }
            // dispatch(getProjects())
            navigate("/dash")
            setOpen(false)
        })
    }

    return (
        <div>
            <Button
                variant="contained"
                size="large"
                onClick={handleClickOpen}
                sx={{ my: 1 }}
                color="error"
            >
                Delete Project
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>
                    Delete Project - {projectsState.selectedProject.projectName}
                </DialogTitle>
                <DialogContent>
                    <Box width="350px">
                        <DialogContentText>Are you Sure ?</DialogContentText>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}