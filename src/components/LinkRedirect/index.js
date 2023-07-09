import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import { collection, doc, getDoc, updateDoc, increment } from "firebase/firestore";
import { Typography, CircularProgress, Box } from "@material-ui/core";


const LinkRedirect = () => {
    const {shortCode} = useParams();
    const [loading, setLoading] = useState(true);
   

    useEffect(() => {
        const fetchLinkDoc = async () => {
            const linkDocRef = doc(collection(firestore, 'links'), shortCode);
            const linkDoc = await getDoc(linkDocRef);
      

            const updateLinkClicks = async (userUid, linkID) => {
                const userLinksRef = collection(firestore, 'users', userUid, 'links');
                const linkRef = doc(userLinksRef, linkID);
                await updateDoc(linkRef, { totalClicks: increment(1) });
              };
              
              if (linkDoc.exists()) {
                const { linkID, longURL, userUid } = linkDoc.data();
                await updateLinkClicks(userUid, linkID);
                window.location.href = longURL;
              }
              
            else {
                setLoading(false);
            } 

        }
        fetchLinkDoc();
    }, [shortCode])

    if (loading) return <Box style = {{marginTop: '10px', textAlign: 'center'}}>
        <CircularProgress />
        <Typography> Redirecting</Typography>
    </Box>
    else return (
        <Box style = {{marginTop: '10px', textAlign: 'center'}}>
                  <Typography> Link does not exist </Typography>
        </Box>
    )
      
}

export default LinkRedirect;