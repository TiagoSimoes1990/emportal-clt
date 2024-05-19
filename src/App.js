import * as React from 'react';
// External components
import UserCard from './components/user-card';
import ModalDialog from './scenes/user-modal/modal-dialog'
import Topbar from './scenes/topbar/topbar';
// Data import
// Images imports
import dummyUserProfile from './images/dummy-profile-pic-300x300-1.png'
// import { userData } from './data/mockdata';
import { Box } from '@mui/material';

// Styles
import './App.css';
import { ColorModeContext, useMode } from './theme';
import { CssBaseline, ThemeProvider } from '@mui/material';

// API
import { getRequest } from './data/requests';

// -----------------------
// Main component
// -----------------------
function App() {
  const [theme, colorMode] = useMode();

  const [open, setOpen] = React.useState(false);
  const [userID, setUserID] = React.useState();

  const [userList, setUserList] = React.useState();

  const handleClose = () => {
    setOpen(false);
  };

  const handleUserCardClick = (id) => {
    console.log(id);
    // console.log(userData);
    setUserID(id);
    setOpen(true);
  }

  // ---------------------------------------------------------
  // Function to fetch users list
  const fetchActiveUsers = React.useCallback(async function fetchActiveUsers() {
    try {
      const userData = await getRequest('/users/active');
      if (userData) { // Check if data was fetched successfully
        console.log("<< MENSAGEM DE RETORNO - fetchActiveUsers >>\n");
        console.log("Dados :" + JSON.stringify(userData));
        setUserList(userData);
      } 
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    fetchActiveUsers();
  }, [fetchActiveUsers]); 

  return (
    <React.Suspense fallback="...is loading">
      <ThemeProvider theme={theme}>
        <CssBaseline />
          <Box className="App">
            <Topbar/>
            {userList && <Box display={'flex'} flexDirection={'row'} flexWrap={'wrap'} justifyContent={'center'} mt={10}>
              {userList.map((user) => {
                return(
                  <UserCard
                    key = {user.id}
                    id = {user.id}
                    userPhoto = {user.photo? user.photo : dummyUserProfile}
                    firstName = {user.first_names}
                    lastName = {user.last_names}
                    position = {user.category_id}
                    email = {user.email}
                    phoneNumber = {user.phone_number}
                    onCardClick = {handleUserCardClick}
                  />
                )}
              )}
            </Box>}
            {userID != null && 
              <ModalDialog
                expanded = {open}
                onClose = {handleClose}
                userData = {userList.find((user) => user.id === userID)}
              >
              </ModalDialog>}
          </Box>
      </ThemeProvider>
    </React.Suspense>
  );  
}

export default App;
