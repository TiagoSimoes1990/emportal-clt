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
import Paper from '@mui/material/Paper'

// In-house components
import UserAvatar from '../../components/user-avatar';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { margin } from '@mui/system';


// Style Objects
const centerDivColDir = {
  display: "flex", 
  flexDirection: "column", 
  alignItems: "center",
  backgroundColor: "#F9F7F7",
  height: "100%",
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
            <Grid container spacing={2} mt={7}>
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
              <Grid item xs={10} >
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
          <Grid container spacing={2} height={'93vh'} p={3}>
            <Grid item md={4} flex={1}>
              <Paper elevation={3} style={centerDivColDir}>
                <UserAvatar
                  alt={props.userData.first_name}
                  src={props.userData.photo}>
                </UserAvatar>
                <Typography gutterBottom variant="h7" component="div">
                  {props.userData.category_id}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ display: 'flex', flexDirection: 'row'}}>
                  <EmailIcon/>{props.userData.email}
                </Typography>
                <Typography variant="body2" color="text.secondary" style={{ display: 'flex', flexDirection: 'row'}}>
                  <SmartphoneIcon/>{props.userData.phone_number}
                </Typography>
                <Divider style={{margin: '0.5rem', width:'95%'}}/>
                <Typography variant="h7" color="text.primary" component="div">
                  About Me
                </Typography>
                <Typography variant="body2" color="text.secondary" m="1rem">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit dolore, a hic deleniti quisquam blanditiis modi maiores numquam corrupti ea ipsum possimus, animi doloribus eum quas? Hic dignissimos eligendi cupiditate!
                </Typography>
              </Paper>
            </Grid>
            <Grid item container spacing={2} md={8}>
              <Grid item>
                <Paper elevation={3} style={centerDivColDir}>
                <Typography variant="h6" color="text.primary" component="div">
                    Pendings
                  </Typography>
                  <Divider style={{margin: '0.5rem', width:'95%'}}/>
                  <Typography variant="body2" color="text.secondary" m="1rem">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit dolore, a hic deleniti quisquam blanditiis modi maiores numquam corrupti ea ipsum possimus, animi doloribus eum quas? Hic dignissimos eligendi cupiditate!
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper elevation={3} style={centerDivColDir}>
                <Typography variant="h6" color="text.primary" component="div">
                    Projects
                  </Typography>
                  <Divider style={{margin: '0.5rem', width:'95%'}}/>
                  <Typography variant="body2" color="text.secondary" m="1rem">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit dolore, a hic deleniti quisquam blanditiis modi maiores numquam corrupti ea ipsum possimus, animi doloribus eum quas? Hic dignissimos eligendi cupiditate!
                  </Typography>
                </Paper>
              </Grid>
              <Grid item>
                <Paper elevation={3} style={centerDivColDir}>
                <Typography variant="h6" color="text.primary" component="div">
                    Skills
                  </Typography>
                  <Divider style={{margin: '0.5rem', width:'95%'}}/>
                  <Typography variant="body2" color="text.secondary" m="1rem">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit dolore, a hic deleniti quisquam blanditiis modi maiores numquam corrupti ea ipsum possimus, animi doloribus eum quas? Hic dignissimos eligendi cupiditate!
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
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