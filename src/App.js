import * as React from 'react';
// External components
import UserCard from './components/user-card';
import ModalDialog from './scenes/user-modal/modal-dialog'
import Topbar from './scenes/topbar/topbar';
// Data import
import { userData } from './data/mockdata';
import { Box } from '@mui/material';
// Styles
import './App.css';

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
              userPhoto = {user.photo}
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
