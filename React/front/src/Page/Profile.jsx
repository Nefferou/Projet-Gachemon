import React from 'react';
import { useState, useEffect} from 'react';
import '../Scss/Profile.scss';
import theme from "../theme";

import HeaderProfile from '../Composants/HeaderProfile';

import { ThemeProvider } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { Grid } from '@material-ui/core';

export default function Profile() {
      const user = useState(JSON.parse(sessionStorage.getItem('user')))
      const [img, setImg] = useState();

    useEffect(() => {
      fetch("https://pokebuildapi.fr/api/v1/pokemon/")
        .then((res) => res.json())
        .then(
          (result) => {
            setImg(result[user[0].id].sprite);
            console.log(user);
          },
          (error) => {
            console.log(error);
          }
        )
    })
    
    return (
      <ThemeProvider theme={theme}>
        <HeaderProfile />
        <Grid container>
          <Grid item xs={4} className='avatar'>
            <Avatar
              alt="Profile"
              src={img}
              sx={{ width: "10%", height: "auto"}}
            />
          </Grid>
          <Grid item xs={8} className='avatar'>

          </Grid>
          <Grid item xs={12} className='avatar'>
            
          </Grid>
        </Grid>
      </ThemeProvider>
      );
    }
