import React from 'react'
import { Box, Button } from '@mui/material'
import ShareIcon from '@mui/icons-material/Share'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import { useAppDispatch } from '../hooks/redux-hooks'
import { copyLinkAction } from '../redux/actions/files'


export default function DownloadButton(props) {
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

    return (
<>
            {/* <ShareIcon></ShareIcon> */}
            <a href={link} download target="_blank" rel="noopener noreferrer">
                <Button
                    variant="contained"
                    target=""
                    sx={{ mx: 1 }}
                    startIcon={<FileDownloadIcon />}
                >
                    Download
                </Button>
            </a>
            
            </>
        
    )
}