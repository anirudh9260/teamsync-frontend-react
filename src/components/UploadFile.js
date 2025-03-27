import * as React from 'react'
import { useState } from 'react'

import FileUploadIcon from '@mui/icons-material/FileUpload'
import { Button, Box, Stack } from '@mui/material'
import { Typography } from '@mui/material'
import Modal from '@mui/material/Modal'
import PropTypes from 'prop-types'
import { extensions } from '../constants/conversions'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { uploadFilesAction, selectFileAction } from '../redux/actions/files'
import AllowedExtensions from './AllowedExtensions'
import { setFilesMessage } from '../redux/reducer/files'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    // height: 500,
    // width: 600,
    fullWidth: true,
    fullHeight: true,
    // maxHeight: "md",
    // maxWidth: "md",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
}

function UploadFile() {
    const dispatch = useAppDispatch()
    const projectsState = useAppSelector(state => state.projectsReducer)

    const [selectedFile, setSelectedFile] = useState()
    const [isFilePicked, setIsFilePicked] = useState(false)

    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleFileChange = e => {
        let fileExtension = e.target.files[0].name.split('.').pop()
        if (extensions.includes(fileExtension)) {
            setSelectedFile(e.target.files[0])
            setIsFilePicked(true)
        } else {
            setSelectedFile()
            setIsFilePicked(false)
            dispatch(setFilesMessage())
            dispatch(selectFileAction(fileExtension))
        }
    }

    const handleUploadClick = () => {
        if (isFilePicked) {
            const formData = new FormData()
            formData.append('file', selectedFile)
            formData.append(
                'project_id',
                projectsState.selectedProject.projectId,
            )
            console.log(dispatch(uploadFilesAction(formData)))
            setOpen(false)
        }
        setIsFilePicked(false)
    }

    return (
        <div>
            <Button
                variant="contained"
                size="large"
                onClick={handleClickOpen}
                sx={{ px: '5', whiteSpace: 'nowrap' }}
            >
                Upload File <FileUploadIcon></FileUploadIcon>
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack
                        direction="column"
                        alignItems="center"
                        justifyContent="space-around"
                        spacing={4}
                        width={350}
                    >
                        <Stack
                            direction="row"
                            justifyContent="space-evenly"
                            spacing={15}
                        >
                            <Typography variant="h6">
                                Upload File
                            </Typography>
                            <AllowedExtensions></AllowedExtensions>
                        </Stack>
                        <Box>
                            <input
                                id="files"
                                type="file"
                                onChange={handleFileChange}
                            />

</Box>
                        <Stack
                            direction="row"
                            justifyContent="flex-end"
                            alignItems="center"
                            spacing={4}
                        >
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button
                                variant="contained"
                                size="small"
                                sx={{ mx: 1 }}
                                startIcon={<FileUploadIcon />}
                                onClick={handleUploadClick}
                                disabled={!isFilePicked}
                            >
                                Upload
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}

export default UploadFile

UploadFile.propTypes = {
    Project: PropTypes.object,
}
