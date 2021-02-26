import React from 'react'
import Alert from '@material-ui/lab/Alert'
import { Snackbar } from '@material-ui/core'

export default function AlertComponent(props) {
    const { alert, setAlert } = props

    const handleClose = () => {
        setAlert({
            ...alert,
            isOpen: false
        })
    }

    return (
        <Snackbar
            open={alert.isOpen}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            autoHideDuration={2000}>
        
            <Alert
                variant="filled"
                severity={alert.type}
                onClose={handleClose}>
                {alert.message}
            </Alert>

        </Snackbar>
    )
}