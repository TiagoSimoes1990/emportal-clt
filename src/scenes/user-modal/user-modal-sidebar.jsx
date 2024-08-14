// React API
import * as React from 'react';

// External components
import Box from '@mui/material/Box';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';

// In-house components

// API

// Icons

// Images imports

// Styles imports

// Style Objects

// Create a FormikContext

// Transitions

// ------------------------
// Sidebar component
// ------------------------
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