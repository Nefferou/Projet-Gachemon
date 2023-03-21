import React from 'react';
import "../SCSS/style.scss"

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function AppBar({value, setValue, changePage}) {

  const handleChange = (event, newValue) => {
    setValue(newValue);
    changePage(event.target.label);
  };

  return (
    <div id='appBar'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', borderRadius: '5px', width: '96%', padding: '1%', margin: '1%', marginBottom: '0%', paddingBottom: '0%', bgcolor: '#a9a9a9e6'}}>
        <Tabs value={value} onChange={handleChange} >
            <Tab label="Gatcha" />
            <Tab label="Histoire"/>
            <Tab label="Pokedex"/>
        </Tabs>
      </Box>
    </div>
  );
}
export default AppBar;