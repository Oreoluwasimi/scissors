import { Grid, Box, Typography, Button, Divider, Snackbar, CircularProgress } from "@material-ui/core";
import { useState, Fragment, useEffect, useCallback, useMemo} from "react";
import LinkCard from "./LinkCard";
import NavBar from "./NavBar";
import ShortenURL from "./ShortenURL";
import { serverTimestamp, collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { nanoid } from "nanoid";
import { firestore, auth } from "../../firebase"; 
import copy from "copy-to-clipboard";



const Account = () => {
    const [fetchingLinks, setFetchingLinks] = useState(true);
    const [openModal, setOpenModal] = useState(false);
    const [links, setLinks] = useState([]);
    const userUid = auth.currentUser.uid;
    const [newLinkToastr, setNewLinkToastr] = useState(false);

    const linksPathRef = useMemo(() => collection(firestore, 'users', userUid, 'links'), [userUid]);

    const handleCreateShortUrl = async (name, longURL) => {
         const link = {
            createdAt: serverTimestamp(),
            name, 
            longURL: longURL.includes('http://') || longURL.includes('https://') ? longURL : `http://${longURL}`,
            shortCode: nanoid(6),
            totalClicks: 0
         }

         const resp = await addDoc(linksPathRef, link);

         setLinks(links => [...links, {...link, createdAt: new Date(), id: resp.id }])

         setOpenModal(false);         
    };

    

    useEffect(() => {
        const fetchLinks = async () => {

            const snapshot = await getDocs(linksPathRef);

            const tempLinks = [];

            snapshot.forEach((doc) => {
              const data = tempLinks.push({...doc.data(), id: doc.id, createdAt: doc.data().createdAt.toDate()});
            });
            setLinks(tempLinks);
            setTimeout(() =>  setFetchingLinks(false), 1000);
            
        };
        fetchLinks();
    }, [linksPathRef]);

    const handleDeleteLink = useCallback(async (linkDocID) => {
        if(window.confirm("Do you want to delete the link?")) {
            await deleteDoc(doc(linksPathRef, linkDocID));
            setLinks(oldlinks => oldlinks.filter(link => link.id !== linkDocID));
        }
    
    }, [linksPathRef]);

    const handleCopyLink = useCallback(shortUrl => {
        copy(shortUrl);
        setNewLinkToastr(true);
    }, []);
      


    return (
        <>
    <Snackbar open = {newLinkToastr} onClose={() => setNewLinkToastr(false)} autoHideDuration={2000} message="Link copied to the clipboard" />
           {openModal && <ShortenURL createShortUrl={handleCreateShortUrl} handleClose= {() => setOpenModal(false)}/> }
            <NavBar />
            <Box  style = {{marginTop: '40px', padding: { xs: '16px', sm: '0px' } }}>
            <Grid container justifyContent="center">
                <Grid item xs={12} sm={8}>
                    <Box style = {{display: 'flex', marginBottom: '40px'}}>
                        <Box style = {{marginRight: '30px'}}>
                        <Typography variant="h4"> Links </Typography>
                        </Box >
                       
                        <Button onClick={() => setOpenModal(true)}  disableElevation variant="contained" color="primary"> Create New  </Button>
                    </Box>

                    {fetchingLinks ? (<Box style = {{textAlign: 'center'}}> <CircularProgress /> </Box>) : !links.length ? (<Box style={{textAlign: "center"}}> <img style={{ width: "250px",  height: "auto", marginBottom: "24px"}}  src="/assets/no_link.svg" alt="No links"/> 
                    <Typography> You have no links.</Typography>
                    </Box>) : (links.sort((prevLink, nextLink) => nextLink.createdAt - prevLink.createdAt).map((link, idx) => (
                        <Fragment key={link.id} >
                          <LinkCard {...link} deleteLink={handleDeleteLink} copyLink ={handleCopyLink}
                          />
                          {idx !== links.length -1 && (
                            <Box style={{marginTop: '40px', marginBottom: '40px'}}>
                                <Divider />
                            </Box>
                          )}                   
                        </Fragment>
                    ))
                    )}

                </Grid>
            </Grid>
            </Box>
            
        </>
    );
};

export default Account;