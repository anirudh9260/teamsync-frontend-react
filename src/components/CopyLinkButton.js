import React from 'react'

import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Box, Button, FormGroup, Stack, Typography } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'

import { useAppDispatch } from '../hooks/redux-hooks'
import { copyLinkAction } from '../redux/actions/files'

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
}

export default function CopyLinkButton(props) {
    const { row } = props

    const dispatch = useAppDispatch()

    const link =
        `${process.env.REACT_APP_API_URL}` +
        '/files/' +
        row.uid +
        '/' +
        row.file_name

    const handleCopyLink = () => {
        dispatch(copyLinkAction(link))
    }

    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Button
                variant="contained"
                color="success"
                onClick={handleClickOpen}
                startIcon={<ContentCopyIcon />}
                sx={{ mx: 1 }}
            >
                Copy Link
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
                        justifyContent="space-around"
                        spacing={4}
                        width={700}
                    >
                        <Typography
                            variant="p"
                            fontFamily="roboto"
                            fontWeight={500}
                            onClick={handleClickOpen}
                        >
                            {row.file_name}
                        </Typography>
                        <FormGroup>
                            <TextField
                                id="standard-name"
                                label="Link"
                                value={link}                                
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                    endAdornment: (
                                        <Button >
                                        <ContentCopyIcon
                                            onClick={handleCopyLink}
                                        />
                                        </Button>
                                    ),
                                }}
                            />
                        </FormGroup>
                    </Stack>
                </Box>
            </Modal>
        </div>
    )
}
