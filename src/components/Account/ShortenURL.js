import { Dialog, DialogTitle, DialogContent, DialogActions, Box, Button, TextField, IconButton, CircularProgress } from "@material-ui/core";
import { Close as CloseIcon } from "@material-ui/icons";
import { useState } from "react";

const ShortenURL = ({handleClose, createShortUrl}) => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState({
        name: "",
        longUrl: "",
    })
    const [form, setForm] = useState({
        name: "",
        longUrl: "",
    })

    const handleChange = event => setForm(oldForm => ({
        ...oldForm,
        [event.target.name]: event.target.value
    }));

    const handleSubmit = async () => {
        const errors = {};
        const tName = form.name.trim();
        const tLongUrl = form.longUrl.trim();

        const expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
        const regex = new RegExp(expression);

        if(tName.length < 3 || tName.length > 15) {
            errors.name = "Name should not be less than 3 characters or greater than 15 characters"
        }
        if (!regex.test(tLongUrl)) {
            errors.longUrl = "URL is not valid"
        }
        if(!!Object.keys(errors).length) return setErrors(errors)
        setLoading(true);
        try{
            setTimeout(() =>  createShortUrl(form.name, form.longUrl), 1000)
           
        }
        catch(err) {
            setLoading(false)
        }
        
    }

    return (
        <Dialog open={true} onClose={handleClose} fullWidth>
            <DialogTitle>
                <Box style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                Create Short URL
                <IconButton onClick={handleClose} size="small"> 
                    <CloseIcon />
                </IconButton>
                </Box>     
                </DialogTitle>
            <DialogContent>

        <Box style = {{marginBottom: '30px'}}>
            <TextField 
            error={!!errors.name} helperText={errors.name}
            value={form.name} name="name" onChange={handleChange} fullWidth variant="filled" label="Name"/>
        </Box>                
                <TextField error={!!errors.longUrl} helperText={errors.longUrl} value={form.longUrl} name="longUrl" onChange={handleChange} fullWidth variant="filled" label="Long URL"/>
            </DialogContent>
            <DialogActions>
                <Box style={{marginRight: '20px', marginBottom: '10px', marginTop: '10px'}}>
                    <Button onClick={handleSubmit} color="primary" variant="contained" disableElevation disabled={loading}> {loading ? <CircularProgress size={20} color="inherit" /> : "Shorten URL"} </Button>
                </Box>
               
            </DialogActions>
        </Dialog>
    )
}
 

export default ShortenURL