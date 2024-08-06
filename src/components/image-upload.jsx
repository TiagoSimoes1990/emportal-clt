import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import Avatar from '@mui/material/Avatar';

const StyledInput  = styled(Input)({
  display: 'none',
});

// TODO:Fix component to replace the input file from profile

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    // Here, you'd typically implement the logic to upload the image to your database
    console.log("File selected was set to: " + selectedFile);
    console.log(event.target);
  };

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      <label htmlFor="contained-button-file">
        <StyledInput 
          accept="image/*" 
          id="contained-button-file" 
          type="file" 
          onChange={handleFileChange}
        />
        <IconButton 
          color="primary" 
          aria-label="upload picture" 
          component="span"
        >
          <PhotoCamera />
        </IconButton>
      </label>
        {selectedFile && 
            <Avatar
                alt='New User Photo'
                src={selectedFile}
                sx={{ 
                    width: 24, 
                    height: 24 
                }}
            />
        }
    </Stack>
  );
}

export default ImageUpload;