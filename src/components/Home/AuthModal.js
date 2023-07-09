import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TextField, Box, IconButton , CircularProgress } from "@material-ui/core";
import { useState } from "react";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { Close as CloseIcon } from "@material-ui/icons";


const AuthModal = ({onClose}) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isSignIn, setIsSignIn] = useState(true);

    const [form, setForm] = useState(
        {
            email: '',
            password: '',
        }
    );

    const handleChange = event => setForm(oldForm => ({
        ...oldForm,
        [event.target.name]: event.target.value
    }));

    const handleAuth = async () => {
        setLoading(true);
        try {
            if(isSignIn){
                await signInWithEmailAndPassword(auth, form.email, form.password); 
            }
            else {
                await createUserWithEmailAndPassword(auth, form.email, form.password);
            }
        }

        catch (err) {
            setError(err.message);
            setLoading(false);
        }
        
    }



    return (
        <Dialog open fullWidth onClose={onClose}>
            <DialogTitle> 
                <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                {isSignIn ? "Sign in" : "Sign up"}  
                <IconButton onClick={onClose} size="small"> 
                    <CloseIcon />
                </IconButton>
                </Box> </DialogTitle>
            <DialogContent>
                <Box style={{display: "flex", flexDirection: "column"}}>
                    <TextField style={{ marginBottom: "24px"}} variant="filled" fullWidth value={form.email} name="email" onChange={handleChange} label="Email"/>
                    <TextField variant="filled" fullWidth value={form.password} type="password" name="password" onChange={handleChange} label="Password"/>
                </Box>
                <Box style={{color: "red"}}>
                    <Typography> {error} </Typography>
                </Box>      
            </DialogContent>
            <DialogActions>
                <Box style={{width: "100%", marginRight: "18px", marginLeft: "16px", marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Typography onClick={() => setIsSignIn((o) => !o)}> {isSignIn ? "Don't have an account? Click to sign up" : "Already have an account? Click to sign in"}
                        </Typography>                
                        <Button disableElevation onClick={handleAuth} variant="contained" color="primary" disabled={loading}> {loading? (<CircularProgress size={20} color="inherit" />)  : isSignIn ? ("Sign in") : ("Sign up")} </Button> 
                </Box>
      
            </DialogActions>
        </Dialog>
    );
}

export default AuthModal
