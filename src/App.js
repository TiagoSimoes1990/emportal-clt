import UserCard from './components/user-card';
import './App.css';
import * as React from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';

import Topbar from './scenes/user-modal-global/topbar';

// ProSide Bar plugin
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

// Data import
import { userData } from './data/mockdata';
import { Box } from '@mui/material';

// Images imports
const userPhoto = '../../images/TS_ProfilePhoto.jpg'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function App() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserCardClick = (id) => {
    console.log(id);
  }

  return (
    <Box>
      <Box>
        <Topbar/>
      </Box>
      <Box className="App">
        <UserCard
          userPhoto = {userPhoto}
          firstName = {"Tiago"}
          lastName = {"Simões"}
          position = {"Software Engineer"}
          email = {"tiago.simoes@gmail.com"}
          phoneNumber = {"+351 912 738 499"}
          onCardClick = {handleClickOpen}/>

        {userData.map((user) => {
          return(
            <UserCard
            key = {user.id}
            id = {user.id}
            userPhoto = {user.photo}
            firstName = {user.first_name}
            lastName = {user.last_name}
            position = {user.category_id}
            email = {user.email}
            phoneNumber = {user.phone_number}
            onCardClick = {handleClickOpen}/>
            )
          }
        )}
      </Box>
      <Box>
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
          <AppBar>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                Profile name
              </Typography>
              <Button autoFocus color="inherit" onClick={handleClose}>
                save
              </Button>
            </Toolbar>
          </AppBar>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <ListItemButton>
                  <ListItemText primary="Profile"/>
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
                
              </Grid>
            </Grid>
          </Box>
        </Dialog>
      </Box>
    </Box>
  );  
}

export default App;
