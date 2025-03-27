import React from 'react'
import { useState, useEffect } from 'react'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button, TextField } from '@mui/material'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'

import {
    getProjectAccessAction,
    addProjectAccessAction,
    removeProjectAccessAction,
} from '../../redux/actions/projects'

function ProjectAccessTable() {
    const dispatch = useAppDispatch()
    const projectState = useAppSelector(state => state.projectsReducer)
    const [selectedEmail, setSelectedEmail] = useState('')


    useEffect(() => {
        if (
            projectState.isAddingAccess === false &&
            projectState.isRemovingAccess === false
        ) {
            dispatch(
                getProjectAccessAction(projectState.selectedProject.projectId),
            )
        }
    }, [projectState.isAddingAccess, projectState.isRemovingAccess])

    const handleDeleteAccess = accessId => {
        dispatch(
            removeProjectAccessAction(projectState.selectedProject.projectId, {
                access_id: '' + accessId,
            }),
        )
    }

    const handleAddAccess = () => {
        dispatch(
            addProjectAccessAction(projectState.selectedProject.projectId, {
                email: selectedEmail,
            }),
        )
        setSelectedEmail('')
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 50 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>SN#</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Add/Remove User</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {projectState.projectAccessUsers.map((user, i) => (
                        <TableRow
                            key={user.id}
                            sx={{
                                '&:last-child td, &:last-child th': {
                                    border: 0,
                                },
                            }}
                        >
                            <TableCell>{i + 1}</TableCell>
                            <TableCell component="th" scope="row">
                                {user.email}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                <Button
                                    startIcon={<DeleteIcon />}
                                    onClick={() => handleDeleteAccess(user.id)}
                                    color="error"
                                    variant='contained'
                                > Remove</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    <TableRow
                        key="new"
                        sx={{
                            '&:last-child td, &:last-child th': {
                                border: 0,
                            },
                        }}
                    >
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell component="th" scope="row">
                            <TextField
                                value={selectedEmail}
                                
                                
                                onChange={e => setSelectedEmail(e.target.value)}
                            ></TextField>
                        </TableCell>
                        <TableCell component="th" scope="row">
                            <Button
                                startIcon={<AddCircleIcon />}
                                onClick={handleAddAccess}
                                variant='contained'
                                color="success"
                                sx={{px:4}}
                            >Add</Button>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ProjectAccessTable
