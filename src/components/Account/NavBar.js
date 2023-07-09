import React from 'react';
import {AppBar, Box, Button, Toolbar, Typography} from "@material-ui/core";
import { auth } from "../../firebase"; 

const NavBar = () => {
    return (
        <AppBar elevation={0} color="secondary" position="static">
            <Toolbar>
                <Typography variant="h6">Scissors</Typography>
                <Box style={{marginLeft: 'auto'}}>
               
                    <Button color="inherit">Links</Button>
                    <Button onClick={() => auth.signOut()} color="inherit">Logout</Button>
                               
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;


