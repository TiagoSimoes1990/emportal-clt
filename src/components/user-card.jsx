import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { CardActionArea, Stack } from '@mui/material';
import '../styles/user-card.css';

function UserCard(props) {
  return (
    // <Card style={userImg} sx={{minWidth: 250, maxWidth: 275, m:1 }}>
    <Card className='user-card' sx={{minWidth: 250, maxWidth: 275, m:1 }}>
      <CardActionArea
        onClick={ () => {
          props.onCardClick (props.id)
          }
        }>
        <Stack 
          direction="column" 
          justifyContent="center"
          alignItems="center"
          spacing={2}>
          <Avatar
            alt={props.firstName}
            src={props.userPhoto}
            sx={{ width: 120, height: 120 }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {props.firstName + " " + props.lastName}
            </Typography>
            <Typography gutterBottom variant="h7" component="div">
              {props.position}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.email}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {props.phoneNumber}
            </Typography>
          </CardContent>
        </Stack>
      </CardActionArea>
    </Card>
  );
}

export default UserCard;