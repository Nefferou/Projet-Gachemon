import React from 'react';
import "../SCSS/style.scss"

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

function AppBar({value, setValue}) {

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id='appBar'>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '98%', padding: '1%',paddingBottom: '0%', bgcolor: 'darkgrey' }}>
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