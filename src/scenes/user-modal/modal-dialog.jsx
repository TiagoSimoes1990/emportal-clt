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
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

// In-house components
import UserAvatar from '../../components/user-avatar';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import EmailIcon from '@mui/icons-material/Email';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';


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

  const [showPassword, setShowPassword] = React.useState(false);
  const [editFields, setEditFields] = React.useState(false);

  // Function toggles the visibility of the password
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Function to prevent the default behavior when the mouse down event occurs. 
  // This is necessary to ensure the expected behavior when interacting with the password toggle, 
  // avoiding any unintended selections or other default behaviors.
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Function toggles the edit of profile fields
  const handleClickEdit = () => setEditFields((edit) => !edit);

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
                {/* Personal Data section */}
                <Divider style={{margin: '0.5rem', width:'95%'}}/>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="h7" color="text.primary" component="div">
                    Personal Data
                  </Typography>
                  <Typography variant="h7" component="div">
                    <IconButton
                      aria-label="toggle edit option"
                      onClick={handleClickEdit}
                      edge="end"
                    >
                      {editFields ? <EditOffIcon/> : <EditIcon />}
                    </IconButton>
                  </Typography>
                </Stack>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      disabled={!editFields}
                      fullWidth
                      variant='outlined'
                      label="First Names">
                    </TextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      disabled={!editFields}
                      fullWidth
                      variant='outlined'
                      label="Last Names">
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      disabled={!editFields}
                      fullWidth
                      variant='outlined'
                      label="Birth Date">
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      disabled={!editFields}
                      fullWidth
                      variant='outlined'
                      label="Prefix">
                    </TextField>
                  </Grid>
                  <Grid item xs={8}>
                    <TextField
                      disabled={!editFields}
                      fullWidth
                      variant='outlined'
                      label="Phone Number">
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      disabled={!editFields}
                      fullWidth
                      variant='outlined'
                      label="Address">
                    </TextField>
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      disabled={!editFields}
                      fullWidth
                      variant='outlined'
                      label="Zip-Code">
                    </TextField>
                  </Grid>
                  <Grid item xs={7}>
                    <TextField
                      disabled={!editFields}
                      fullWidth
                      variant='outlined'
                      label="City">
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl 
                      disabled={!editFields}
                      fullWidth
                      variant="outlined">
                      <InputLabel variant='outlined'>Current Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        label="Current Password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                          }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl 
                      disabled={!editFields}
                      fullWidth
                      variant="outlined">
                      <InputLabel variant='outlined'>New Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        label="New Password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                          }
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl 
                      disabled={!editFields}
                      fullWidth
                      variant="outlined">
                      <InputLabel variant='outlined'>Confirm New Password</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        label="Confirm New Password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                          }
                      />
                    </FormControl>
                  </Grid>
                </Grid> 
                {/* About me section */}
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