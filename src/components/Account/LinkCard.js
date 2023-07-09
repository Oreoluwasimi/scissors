import { Box, Button, Typography} from "@material-ui/core";
import { BarChart as ChartIcon} from "@material-ui/icons";
import format from 'date-fns/format';
import { memo } from 'react';



const LinkCard = ({id, createdAt, name, longURL, shortCode, totalClicks, deleteLink, copyLink}) => {

    const shortUrl = `${window.location.host}/${shortCode}`;
        return (
    <Box style = {{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box> 
            <Typography color="textSecondary" variant="overline">Created at {format(createdAt, 'd MMMM, HH:mm')}</Typography>
            <Box style = {{marginTop: '20px', marginBottom: '20px',}}>
                <Typography style = {{marginBottom: '5px'}} variant="h6">{name}</Typography>
                <Typography>{longURL}</Typography>
            </Box>
           
            <Box style = {{display: 'flex', alignItems: 'center'}}>
                <Box style = {{marginRight: '30px'}} >
                    <Typography color="primary"> {shortUrl}</Typography>                   
                </Box>    
                <Box style = {{marginRight: '30px'}}>
                    <Button onClick={() => copyLink(shortUrl)} color="primary" variant="outlined"  size="small" >  Copy </Button> 
                </Box>
               
                <Button onClick={() => deleteLink(id)} color="secondary" variant="contained"  size="small" disableElevation>  Delete </Button> 
            </Box>
        </Box>
        <Box> 
            <Box >
                <Box style = {{display: 'flex', justifyContent: 'center'}}>
                    <Typography variant="overline">{totalClicks}</Typography>
                    <ChartIcon />
                </Box>
                <Typography> Total Clicks</Typography>
            </Box>
        </Box>
    </Box>
    )

}

export default memo(LinkCard);