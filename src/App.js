import './App.css';
import * as React from 'react';
import UserCard from './components/user-card';
import ModalDialog from './scenes/user-modal/modal-dialog'
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

import Topbar from './scenes/topbar/topbar';
import ModalSidebar from './scenes/user-modal-global/modal-sidebar';

// ProSide Bar plugin
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

// Data import
import { userData } from './data/mockdata';
import { Box } from '@mui/material';

// Images imports
const dummyUserProfile = 'src/images/dummy-profile-pic-300x300-1.png'

// -----------------------
// Main component
// -----------------------
function App() {

  const [open, setOpen] = React.useState(false);
  const [userID, setUserID] = React.useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserCardClick = (id) => {
    console.log(id);
    console.log(userData);
    setUserID(id);
    setOpen(true);
  }

  return (
    <Box className="App">
      <Topbar/>
      <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} justifyContent={'center'} mt={10}>
        {userData.map((user) => {
          return(
            <UserCard
              key = {user.id}
              id = {user.id}
              // userPhoto = {user.photo}
              userPhoto = {dummyUserProfile}
              firstName = {user.first_name}
              lastName = {user.last_name}
              position = {user.category_id}
              email = {user.email}
              phoneNumber = {user.phone_number}
              onCardClick = {handleUserCardClick}
            />
            )
          }
        )}
      </Box>
        {userID != null && 
        <ModalDialog
          expanded = {open}
          onClose = {handleClose}
          userData = {userData.find((user) => user.id === userID)}
        >
        </ModalDialog>}
    </Box>
  );  
}

export default App;
