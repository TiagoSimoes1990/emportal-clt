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
import Grid from '@mui/material/Grid';

// In-house components
import UserModalTabProfile from './user-modal-tab-profile';
import UserModalTabAbsences from './user-modal-tab-absences';
import UserModalTabTimesheet from './user-modal-tab-timesheet';

// API

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Images imports

// Styles imports
import 'react-phone-number-input/style.css'

// Style Objects

// Create a FormikContext
const FormikSubmitContext = React.createContext(null);

// Transitions
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function UserModalDialog(props) {

  // useState Hooks
  const [tabIsOpen, setTabIsOpen] = React.useState('Profile');

  // References
  const formikRef = React.useRef(null);

  // Function to handle de event of closing the modal
  const handleCloseModal = () => {
    props.onClose();
    setTabIsOpen('Profile');
  }

  // Function to handle the click on save button
  // TODO: Disable save button if there are no changes to the form values
  const handleClickSave = () => {
    console.log("handleClickSave -> Submit form");
    formikRef.current?.submitForm();
    console.log(formikRef.current?.errors);
  }

  // Hook for debugging
  React.useEffect(() => {
    console.log("useEffect from 'Profile Tab'");
    console.log(props.expanded);
    console.log(props.userId);
  }, []);

  return (
    <FormikSubmitContext.Provider value={formikRef}>
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
                  {/* {userData.first_names + ' ' + userData.last_names} */}
                </Typography>
                <Button 
                  autoFocus color="inherit" 
                  onClick={handleClickSave}
                >
                  Save
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
                  <UserModalTabProfile
                    tabExpanded = {tabIsOpen} 
                    userId = {props.userId}
                    formikRef={formikRef}
                  >
                  </UserModalTabProfile>
                  <UserModalTabAbsences
                    tabExpanded = {tabIsOpen}
                  >
                  </UserModalTabAbsences>
                  <UserModalTabTimesheet
                    tabExpanded = {tabIsOpen}
                  >
                  </UserModalTabTimesheet>
                </Grid>
              </Grid>
      </Dialog>
    </FormikSubmitContext.Provider>
  );
}
