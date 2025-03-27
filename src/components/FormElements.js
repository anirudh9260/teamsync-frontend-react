import { Backdrop, CircularProgress } from '@mui/material'

// General function to export Form Loader
export const FormBackdropElement = props => {
    return (
        <Backdrop
            sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
            open={props.loader}
        >
            <CircularProgress color="primary" />
        </Backdrop>
    )
}
