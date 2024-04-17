// React API
import * as React from 'react';

// External components
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

// In-house components
import UserAvatar from '../../components/user-avatar';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';

// Images imports
const dummyUserProfile = 'src/images/dummy-profile-pic-300x300-1.png'

// Style Objects
const centerDivColDir = {
  display: "flex", 
  flexDirection: "column", 
  justifyContent: "center", 
  alignItems: "center",
  borderRadius: "0.25rem", 
  backgroundColor: "grey",
  margin: "0.5rem"
}

const tilesStyle = {
  borderRadius: "0.25rem", 
  backgroundColor: "grey"
}

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalDialog(props) {

  const [tabIsOpen, setTabIsOpen] = React.useState('Profile');

  // Function to handle de event of closing the modal
  const handleCloseModal = () => {
    props.onClose();
    setTabIsOpen('Profile');
  }

  // Hook for debugging
  React.useEffect(() => {
    console.log(props.expanded);
    console.log(tabIsOpen);
    console.log(props.userData.first_name);
  });

  return (
    <Dialog
        fullScreen
        open={props.expanded}
        onClose={handleCloseModal}
        TransitionComponent={Transition}
      >
          <AppBar>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleCloseModal}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {props.userData.full_name}
              </Typography>
              <Button 
                autoFocus color="inherit" 
                onClick={handleCloseModal}
                >
                save
              </Button>
            </Toolbar>
          </AppBar>
          <Box sx={{ flexGrow: 1, mt:10}}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                  <ListItemButton
                    onClick={ () => {
                      setTabIsOpen('Profile');
                    }}>
                      <ListItemText primary="Profile"/>
                  </ListItemButton>
                  <Divider />
                  <ListItemButton
                    onClick={ () => {
                      setTabIsOpen('Absences');
                    }}>
                      <ListItemText primary="Absences"/>
                  </ListItemButton>
                  <Divider />
                  <ListItemButton
                    onClick={ () => {
                      setTabIsOpen('Timesheet');
                    }}>
                      <ListItemText primary="Timesheet"/>
                  </ListItemButton>
                  <Divider />
              </Grid>
              <Grid item xs={10}>
                <Profile
                  tabExpanded = {tabIsOpen} 
                  userData = {props.userData}>
                </Profile>
                <Absences
                  tabExpanded = {tabIsOpen} >
                </Absences>
                <Timesheet
                  tabExpanded = {tabIsOpen} >
                </Timesheet>
              </Grid>
            </Grid>
          </Box>
      </Dialog>
  );
}

// ------------------------
// Profile Tab
// ------------------------
const Profile = (props) =>  {

  if (props.tabExpanded === 'Profile') {
    return (
      <Box>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div style={centerDivColDir} >
                <UserAvatar
                  alt={props.userData.first_name}
                  src={dummyUserProfile}>
                </UserAvatar>
                {props.userData.first_name} {props.userData.last_name}
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                  <EmailIcon> </EmailIcon>{props.userData.email}
                </div>
                
              </div>
              <div style={centerDivColDir}>
              
              </div>
            </Grid>
            <Grid item xs={8} style={tilesStyle}>
              <div style={centerDivColDir}>
                This is "Profile" tab [0,1]
              </div>
            </Grid>
            <Grid item xs={4} style={tilesStyle}>
            This is "Profile" tab [1,0]
            </Grid>
            <Grid item xs={8} style={tilesStyle}>
            This is "Profile" tab [1,1]
            </Grid>
          </Grid>
      </Box>
    )
  }
}

// ------------------------
// Absences Tab
// ------------------------
const Absences = (props) =>  {

  if (props.tabExpanded === 'Absences') {
    return(
      <Box>
          This is "Absences" tab
      </Box>
    )
  }
}

// ------------------------
// Timesheet Tab
// ------------------------
const Timesheet = (props) =>  {

  if (props.tabExpanded === 'Timesheet') {
    return(
      <Box>
          This is "Timesheet" tab
      </Box>
    )
  }
}