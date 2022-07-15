import React, {useState} from 'react';
import {Box,
CssBaseline,
Typography,
Button,
Dialog,
Container,
DialogActions,
DialogContent,
DialogContentText,
DialogTitle} from '@mui/material'
import {Navigate} from 'react-router-dom';
import { MarvelForm } from '../MarvelForm';
import { Navbar } from '../shareComponents';
import { DataTable } from '../DataTable';
import {getAuth,setPersistence,browserSessionPersistence} from 'firebase/auth';

export const Dashboard = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const auth = getAuth()
    
    if(auth.currentUser){
        return (
            <Container maxWidth={false} disableGutters={true} >
                <Navbar/>
                <Box>
                    <Container style={{padding: '4rem 0'}}>
                        <Button variant='contained' color='primary' onClick={handleOpen}>Create a New Char</Button>
                        <DataTable/>
                        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Add New Char</DialogTitle>
                            <DialogContent>
                                <DialogContentText>Add A New Char</DialogContentText>
                                <MarvelForm />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick = {handleClose} color="warning">Cancel</Button>
                            </DialogActions>
                        </Dialog>
                    </Container>
                </Box>
            </Container>
        )
    } else {
        return (
            <Navigate to = '/' replace/>
        )
    }

    
}