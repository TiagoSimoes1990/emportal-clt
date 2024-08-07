
import React from "react";
import base64js from 'base64-js';

const userAvatarStyle = {
    borderRadius: "50%",
    border: "4px solid #fff",
    height: "120px",
    width: "120px"
  };

export default function UserAvatar(props) {
  return <img style={userAvatarStyle} src={props.src} alt={props.alt} />;
}