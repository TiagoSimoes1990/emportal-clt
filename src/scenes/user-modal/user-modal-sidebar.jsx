import * as React from 'react';

import Grid from '@mui/material/Grid';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';

function UserModalSidebar({setTabIsOpen}) {

    return(
        <Box>
            <ListItemButton
                onClick={ () => {
                    setTabIsOpen('Profile');
                }}
            >
                <ListItemText primary="Profile"/>
            </ListItemButton>
            <Divider />
            <ListItemButton
                onClick={ () => {
                    setTabIsOpen('Absences');
                }}
            >
                <ListItemText primary="Absences"/>
            </ListItemButton>
            <Divider />
            <ListItemButton
                onClick={ () => {
                    setTabIsOpen('Timesheet');
                }}
            >
                <ListItemText primary="Timesheet"/>
            </ListItemButton>
            <Divider/>
        </Box>
    )
}

export default UserModalSidebar;