import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import '../styles/user-card.css';

function UserCard(props) {
  return (
    <Card className="user-card" sx={{minWidth: 250, maxWidth: 275, m:1 }}>
      <CardActionArea
        onClick={ () => {
          props.onCardClick (props.id)
          }
        }>
        <img className="circle-img" src={props.userPhoto} />
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
      </CardActionArea>
    </Card>
  );
}

export default UserCard;