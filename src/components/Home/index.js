import { Typography, Button, Box, Grid, Hidden } from "@material-ui/core";
import AuthModal from "./AuthModal";
import { useState } from "react";


const Home = () => {
    const [openAuthModal, setOpenAuthModal] = useState(false);

    return (
    <Box style={{ display: 'flex', flexDirection: 'column', padding: "30px", boxSizing: "border-box", height: '100vh', backgroundColor: "#669CEE", //backgroundColor: "#56B7BA", 
    color: "#fff" }}>
         { openAuthModal && <AuthModal onClose={() => setOpenAuthModal(false)}  />}
        <Box style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h4"> Scissors </Typography>
            <Button onClick={() => setOpenAuthModal(true)} color="inherit">Login/Signup</Button>
        </Box>
        <Box style={{display: 'flex', flexGrow: 1, alignItems: 'center' }}>
        <Grid container alignItems="center">
            <Grid item sm={6}> 
                <Box>
                    <Typography variant="h4"> Revolutionizing Link Optimization</Typography>
                    <Box style={{marginTop: '20px', marginBottom: '20px'}} >
                    <Typography> Optimize your online experience with our advanced URL shortening solution </Typography>     
                    </Box>
           
                    <Button onClick={() => setOpenAuthModal(true)} variant="contained" size="large" disableElevation style={{ backgroundColor: "#1D3447", color: "#fff" }} >Get Started</Button>
                </Box>
            </Grid>
            <Hidden only="xs">
            <Grid item sm={6}> 
            <img style={{ width: "100%", borderRadius: "10px", boxShadow: "0px 10px 35px rgba(0 0 0 0.1)" }}  src="/assets/mockup.png" alt="mockup"/>
            </Grid>
            </Hidden>
          
        </Grid>

        </Box>
   
    </Box>
    )
};

export default Home;

     