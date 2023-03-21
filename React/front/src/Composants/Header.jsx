import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import AccountCircle from '@mui/icons-material/AccountCircle';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

export default function MenuAppBar({value}) {

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
            <IconButton size="large" color="inherit">
                <AccountCircle />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                {value === 0 ? "Gatcha" : value === 1 ? "Histoire" : "Pokedex"}
            </Typography>
            <IconButton size="large" color="inherit">
                <CatchingPokemonIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}