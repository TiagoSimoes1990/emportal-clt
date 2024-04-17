import * as React from 'react';

import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';

function ModalSidebar() {

    return(
        <Grid container spacing={2}>
            {/* Sidebar */}
            <Grid item xs={3}>
                <ListItemButton>
                    <ListItemText primary="Profiles"/>
                </ListItemButton>
                <Divider />
                <ListItemButton>
                    <ListItemText primary="Item 2"/>
                </ListItemButton>
                <Divider />
                <ListItemButton>
                    <ListItemText primary="Item 3"/>
                </ListItemButton>
                <Divider />
            </Grid>
            <Grid item xs={9}>
            <Box>
                
            </Box>
            </Grid>
        </Grid>
    )
}

export default ModalSidebar;