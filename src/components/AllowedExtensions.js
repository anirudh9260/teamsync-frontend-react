import React from 'react'

import { Button, Box, Stack } from '@mui/material'
import { Typography } from '@mui/material'
import Modal from '@mui/material/Modal'

import { extensions } from '../constants/conversions'

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

function AllowedExtensions() {
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            <Button size="small" variant="outlined" onClick={handleClickOpen}>
                Formats
            </Button>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography variant="h5">
                        {extensions.join('   |   ')}
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}

export default AllowedExtensions
