import React from "react";
import {Box, Typography, Button, Container,Tooltip} from '@mui/material';
import {Link} from "react-router-dom";
import {Navbar} from "../shareComponents/Navbar"
import bg_image from "../../assets/images/marvel.jpg"
interface Props{
    title:string;
    sub:string;
}

export const Marvel = (props:Props) => {
    return (
        <Container maxWidth={false} disableGutters={true} sx={{height:'100vh'}}>
            <Navbar />
            <Box style={{backgroundImage:`url(${bg_image})`,backgroundColor:'rgba(0,0,0,.80)', backgroundBlendMode:'overlay'}} 
                sx={{justifyContent:'center', alignItems:'center', display:'flex', flexDirection: 'column', height: '100%'}}>
                <Typography color='primary' variant="h2">{props.title}</Typography>
                <Typography color='secondary' variant="h6">{props.sub}</Typography>
                <Tooltip title='You must be signed in to visit'>
                    <Button component={Link} to='/dashboard' variant='contained'>Check out the Characters!</Button>
                </Tooltip>    
            </Box>
        </Container>
    )
}