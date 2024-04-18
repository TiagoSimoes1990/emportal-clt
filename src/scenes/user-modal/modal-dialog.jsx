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

// In-house components
import UserAvatar from '../../components/user-avatar';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';

// Style Objects
const centerDivColDir = {
  display: "flex", 
  flexDirection: "column", 
  justifyContent: "center", 
  alignItems: "center",
  borderRadius: "0.25rem", 
  backgroundColor: "#F9F7F7",
  margin: "0.5rem"
}

// Transitions
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

  console.log(props.userData);
  if (props.tabExpanded === 'Profile') {
    return (
      <Box>
          <Grid container spacing={2}>
            <Grid item xs={4} mt={'4rem'} height={''}>
              <Box style={centerDivColDir}>
                <Box mt={'-4rem'}>
                  <UserAvatar
                  alt={props.userData.first_name}
                  src={props.userData.photo}>
                  </UserAvatar>
                </Box>
                <Typography gutterBottom variant="h7" component="div">
                  {props.userData.category_id}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ display: 'flex', flexDirection: 'row'}}>
                  <EmailIcon/>{props.userData.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {props.userData.phone_number}
                </Typography>
                <Divider></Divider>
              </Box>
            </Grid>
            <Grid item xs={8}>
              <div style={centerDivColDir}>
                This is "Profile" tab [0,1]
              </div>
            </Grid>
            <Grid item xs={4}>
            This is "Profile" tab [1,0]
            </Grid>
            <Grid item xs={8}>
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