import React from 'react'
import { useState } from 'react'

import ClearIcon from '@mui/icons-material/Clear'
import { Button, TextField, Stack } from '@mui/material'

import { useAppSelector, useAppDispatch } from '../hooks/redux-hooks'
import {
    getFilesForProject,
    searchFilesInProject,
} from '../redux/actions/files'

function SearchFile() {
    const dispatch = useAppDispatch()
    const [searchText, setsearchText] = useState('')
    const projectsState = useAppSelector(state => state.projectsReducer)

    const handleSearch = () => {
        console.log(searchText)
        let searchParams = {
            searchText: searchText,
            projectId: projectsState.selectedProject.projectId,
        }
        dispatch(searchFilesInProject(searchParams))
    }

    const handleClear = () => {
        setsearchText('')
        dispatch(getFilesForProject(projectsState.selectedProject.projectId))
    }

    return (
        <Stack direction="row" spacing={1}>
            <TextField
                id="standard-name"
                label="Search File"
                value={searchText}
                fullWidth
                onChange={e => setsearchText(e.target.value)}
                sx={{ width: 300 }}
                InputProps={{
                    endAdornment: (
                        <Button disabled={searchText == '' ? true : false}>
                            <ClearIcon onClick={handleClear} size="small" />
                        </Button>
                    ),
                }}
            />
            <Button
                variant="contained"
                size="medium"
                disabled={searchText == '' ? true : false}
                onClick={handleSearch}
            >
                Search
            </Button>
        </Stack>
    )
}

export default SearchFile
