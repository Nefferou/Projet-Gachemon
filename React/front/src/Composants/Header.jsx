import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';


import AccountCircle from '@mui/icons-material/AccountCircle';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

export default function MenuAppBar({value, changeSearch}) {

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <div className='headerInfo'>
              <IconButton size="medium" color="inherit">
                  <AccountCircle />
              </IconButton>
              <p>LeNomDuMec</p>
            </div>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {value === 0 ? "Gatcha" 
                : value === 1 ? "Histoire" 
                : <div><InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search"
                    inputProps={{ 'aria-label': 'Search' }}
                    onChange={event => changeSearch(event.target.value)}
                  />
                  <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                  </IconButton>
              </div>}
            </Typography>
            <div className='headerInfo'>
              <p>150 350</p>
              <IconButton color="inherit">
                  <CatchingPokemonIcon />
              </IconButton>
            </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}