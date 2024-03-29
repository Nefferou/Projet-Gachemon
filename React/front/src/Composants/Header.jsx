import {React, useState} from 'react';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Avatar, Box } from '@mui/material';

import Pokeball from "../Ressources/Pokeball.svg"
import Player from "../Ressources/Player.svg"

import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

export default function MenuAppBar({value, changeSearch, user, money, pokemons}) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const token = useState(sessionStorage.getItem("token"));
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const closeApp = () => {
    sessionStorage.setItem("user", null)
    navigate("/login")
    handleClose()
  }

  return (
    <div>
      <AppBar color='secondary' position="static">
        <Toolbar>
          <div className='headerInfo'>
              <IconButton size="medium" color="inherit">
                  <img src={Player} alt='player' onClick={handleClick} />
              </IconButton>
              <p>{user.username}</p>
              <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose} color='info'
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}>
              <MenuItem onClick={handleClose}>
                <IconButton size="small" edge="start" color='info' sx={{m:0, p:0}} href={`https://projet-angular-gachemon.vercel.app/boutique?token=${token[0]}`}>  
                  <ShoppingBasketIcon />
                </IconButton>
              </MenuItem>
              <MenuItem onClick={closeApp}>
              <IconButton size="small" edge="start" color='info' sx={{m:0, p:0}}>  
                  <ExitToAppIcon />
                </IconButton>
              </MenuItem>
            </Menu>
          </div>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
              {value === 0 ? "Gatcha"
              : value === 1 ? "Clicker" 
              : <Box><InputBase
                  sx={{ ml: 1, flex: 1, color: '#d32f2f'}}
                  placeholder="Search"
                  color='secondary'
                  inputProps={{ 'aria-label': 'Search' }}
                  onChange={event => changeSearch(event.target.value)}
                />
                <IconButton type="button" sx={{ p: '10px'}} aria-label="search">
                  <SearchIcon color='secondary' />
                </IconButton>
            </Box>}
          </Typography>
          <div className='headerInfo'>
            <p>{money.toLocaleString()}</p>
            <IconButton size="medium" color="inherit">
                <Avatar src={Pokeball} size="small" />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
