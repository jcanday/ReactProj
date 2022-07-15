import React from 'react';
import {AppBar, 
    Box, 
    Toolbar,
    IconButton,
    Typography,
    Button, CircularProgress, Link, styled, Tooltip} from '@mui/material'
import firebase from 'firebase/app';
import { useSigninCheck } from 'reactfire';
import { useAuthState, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { getAuth, GoogleAuthProvider, signOut,setPersistence,browserSessionPersistence } from 'firebase/auth'
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
const NavList = styled('ul')({
    listStyle:'None',
    display:'flex',
    alignItems:'center',
    gap:'2rem'
})
const GoogleButton = () => {
    const navigate = useNavigate();
    const auth = getAuth();
    setPersistence(auth, browserSessionPersistence)
    const provider = new GoogleAuthProvider();
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);

    const signIn = async () => {
        await signInWithGoogle()
        navigate('/dashboard')
    }

    const signMeOut = async() => {
        await signOut(auth)
        navigate('/')
    }

    if (loading){
        return (<CircularProgress/>)
    } 

    if(auth.currentUser){
        return (<Button variant='contained' color='error' onClick={signMeOut}>Sign Out</Button>)
    }else {
        return (<Tooltip title='Google Sign In'><Button variant='contained' color='secondary' onClick={signIn}>Sign In</Button></Tooltip>)
    }
}

export const Navbar = () => {
    const auth = getAuth();
    if (auth.currentUser){
        return(
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{justifyContent:'space-between'}}>
                    <Link component={RouterLink} to = '/' underline='hover' color='secondary' sx={{fontSize: '2rem', width:'fit-content'}}>
                       Marvel
                    </Link>
                    <NavList>
                        <Link component={RouterLink} to = '/dashboard' underline='hover' color='secondary' sx={{fontSize: '1.5rem' , flexGrow: 1, height:'fit-content' }}>
                            Dashboard
                        </Link> 
                        <GoogleButton/>
                    </NavList>
                    
                    </Toolbar>
                </AppBar>
            </Box>
        )
    } else {
        return(
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar sx={{justifyContent:'space-between'}}>
                        <Link href="/" underline='hover' color='secondary' sx={{fontSize: '2rem' ,width:'fit-content'}}>
                            Marvel
                        </Link>
                        <NavList>                      
                            <GoogleButton/>                       
                        </NavList>           
                    </Toolbar>
                </AppBar>
            </Box>
        )
    }
    
}