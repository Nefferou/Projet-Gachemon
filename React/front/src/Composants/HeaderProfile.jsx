import React, { useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useNavigate  } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

function HeaderProfile() {
  const token = useState(sessionStorage.getItem("token"));

  const navigate = useNavigate();

  const handleRedirect = () => {
    const url = new URL('https://projet-angular-gachemon.vercel.app/boutique/');
    url.searchParams.append('token', token[0]);
    navigate(url.href);
  };
  

    return (
        <Box>
            <AppBar position="static">
                <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                    <IconButton href='./app' size="large" edge="start" color="inherit" aria-label="open drawer" sx={{ mr: 2 }}>
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ display: { sm: 'block' } }}>
                        Profile
                    </Typography>
                    <Box sx={{ flexGrow: 0 }}>
                        <IconButton size="large" edge="end" color="inherit" aria-label="open drawer" sx={{ ml: 2 }}
                               onClick={handleRedirect}
                               >
                            <ShoppingBasketIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default HeaderProfile;
