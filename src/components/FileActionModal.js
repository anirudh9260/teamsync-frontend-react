import React from 'react'
import { Button, Box, Stack } from '@mui/material'
import { Typography } from '@mui/material'
import Modal from '@mui/material/Modal';
import CopyLinkButton from './CopyLinkButton';
import DeleteFileConfirmDialog from './DeleteFileConfirmDialog'
import ConvertTable from './ConvertTable';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { getFilesForProject } from '../redux/actions/files'


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
    p: 4,
};


function FileActionModal(props) {
    const dispatch = useAppDispatch()
    const projectsState = useAppSelector(state => state.projectsReducer)
    const { row } = props
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
        dispatch(getFilesForProject(projectsState.selectedProject.projectId))
    }
    
    return (
        <div>
            <Typography
                variant="p"
                fontFamily="roboto"
                color="blue"
                fontWeight={500}
                onClick={handleClickOpen}
            >
                {row.file_name}
            </Typography>

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
                    width={450}
                >
                    <Stack
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={12}
                    >
                        <Typography variant="h6" color="blue">{row.file_name}</Typography>
                        <CopyLinkButton
                            row={row}
                        ></CopyLinkButton>
                    </Stack>
                    <ConvertTable row={row} open={open}></ConvertTable>
                    <Stack
                        direction="row"
                        justifyContent="flex-end"
                        alignItems="center"
                        spacing={4}
                    >
                    <Button onClick={handleClose} sx={{ mx: 3 }}>
                        Close
                    </Button>
                    <DeleteFileConfirmDialog
                        row={row}
                    ></DeleteFileConfirmDialog>
                    </Stack>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}

export default FileActionModal