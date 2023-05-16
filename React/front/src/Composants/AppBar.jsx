import React from 'react';
import "../Scss/App.scss";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function AppBar({value, setValue}) {

  const handleChange = (event, newValue) => {
    setValue(newValue);
  } ;

  return (
    <div id='appBar'>
      <Box sx={{width: '98%', padding: '1%', marginBottom: '0%', paddingBottom: '0%', bgcolor: '#000000'}}>
        <Tabs value={value}  onChange={handleChange} >
            <Tab sx={value === 0 ? {color: '#d32f2f'} : {color: '#858585'}} label="Gatcha" />
            <Tab sx={value === 1 ? {color: '#d32f2f'} : {color: '#858585'}} label="Clicker"/>
            <Tab sx={value === 2 ? {color: '#d32f2f'} : {color: '#858585'}} label="Pokedex"/>
        </Tabs>
      </Box>
    </div>
  );
}
export default AppBar;