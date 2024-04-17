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

// Icons
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalDialog(props) {

  // Hook for debugging
  React.useEffect(() => {
    console.log(props.expanded);

  });

  return (
    <Dialog
        fullScreen
        open={props.expanded}
        onClose={props.onClose}
        TransitionComponent={Transition}
      >
          <AppBar>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={props.onClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {props.userData.full_name}
              </Typography>
              <Button 
                autoFocus color="inherit" 
                onClick={props.onClose}
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
                      console.log("Clicked on Profile Button");
                    }}>
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
              <Grid item xs={10}>
              <Box>
                  
              </Box>
              </Grid>
            </Grid>
          </Box>
      </Dialog>
  );
}
