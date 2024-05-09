import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';

// API
import { getRequest, postRequest } from '../../data/requests';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

// ----------------------------------
// MAIN COMPONENT
// ----------------------------------
function Topbar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

// ---------------------------------------------------------
// Handle of specific mobile events

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileNotificationsOpen = () => {
    // TODO: Show a popup menu with a list of all notifications on a mobile device
    alert("Show mobile notifications list");
  } 

// ---------------------------------------------------------
// Handle of generic events

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleProfileOpen = () => {
    handleMenuClose();
    // TODO: Event to show the dialog with the current user information
    alert("Show the logged user dialog here!")
  }

  const handleLogout = () => {
    handleMenuClose();
    // TODO: Even to terminate the current user session
    alert("Clicked on Logout!")
  }

  const handleNotificationsOpen = () => {
    // TODO: Show a popup menu with a list of all notifications on a device with a widerscreen
    alert("Show a popover notifications list");
  }
  // ---------------------------------------------------------
  // Function to fetch users list
  const fetchUserList = React.useCallback(async function fetchUserList() {
    try {
      const jsonResponse = await getRequest('usr-list');
      // If succeeded ...
      if (jsonResponse.status === 200) {
        console.log("<< MENSAGEM DE RETORNO  - fetchUserList >>\n");
        console.log("Dados :"+JSON.stringify(jsonResponse.data.data));
      }
      
    } catch (error) {
      
    }
  }, []);

  // ---------------------------------------------------------
  // Function to request user data from database
  const fetchUserData = React.useCallback(async function fetchUserData() {
    try {
      const jsonResponse = await getRequest('usr-data');
      // If succeeded...
      if (jsonResponse.status === 200) {
          console.log("<< MENSAGEM DE RETORNO - fetchUserData >>\n");
          console.log("Dados :"+JSON.stringify(jsonResponse.data.data));
      }
      
    } catch (error) {
      
    }
  }, []);

  // ----------------------------------
  // After rendering and after every update, fetch the data to fill in the table
  React.useEffect(() => {
    fetchUserList();
  }, [fetchUserList]);
// ---------------------------------------------------------
// Widerscreens Menu Render Handling
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileOpen}>Profile</MenuItem>
      <MenuItem onClick={handleLogout}>Log Out</MenuItem>
    </Menu>
  );

// ---------------------------------------------------------
// Mobile Menu Render Handling
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem
        onClick={handleMobileNotificationsOpen}>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar>
        <Toolbar>
            <Box sx={{ flexGrow: 1 }} />
            <Search
            onClick={ () => {fetchUserData()}}
            onKeyDown={(e) => {
                if(e.key==="Enter") {
                    // TODO: Had proper event to request info on based on input value - e.target.value
                    alert("The value to search is: " + e.target.value);
                    }
                }
            }
            >
                <SearchIconWrapper>
                    <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Search>
            <Box sx={{ flexGrow: 1 }} />
            {/* ---------- Wider screens >= md ---------- */}
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={handleNotificationsOpen}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user" // TODO: Change to match the current logged user
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>

          {/* ---------- Mobile Menu ---------- */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

export default Topbar;