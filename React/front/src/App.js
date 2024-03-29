import React from 'react';
import { useState, useEffect } from 'react';
import './Scss/App.scss';

import AppBar from "./Composants/AppBar"
import Header from "./Composants/Header"
import Pokedex from './Page/Pokedex';
import Clicker from './Page/Clicker';
import Admin from './Page/Admin';

import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import Gatcha from './Page/Gatcha';

import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';

import { useNavigate } from "react-router-dom";

function App() {

  const [value, setValue] = useState(1);
  const [search, setSearch] = useState("");

  const [items, setItems] = useState([]);
  const [load, isLoad] = useState(true);

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")))
  const [money, setMoney] = useState(user.cryptokemons)
  const token = useState(sessionStorage.getItem("token"));

  const navigate = useNavigate();

  useEffect(function () {
    isLoad(true)
    setUser(JSON.parse(sessionStorage.getItem("user")))
    sessionStorage.setItem('pokemon', null)
    fetch("https://pokebuildapi.fr/api/v1/pokemon")
    .then(res => res.json())
    .then(
      (result) => {
        isLoad(false)
        setItems(result)
      }
    )
  }, [])

  return (
    <div className="App">
      {user === undefined ?
      navigate("/login") :
      <ThemeProvider theme={theme}>

      <Header value={value} changeSearch={setSearch} user={user} money={money} pokemons={items} />

      <div hidden={value !== 0}>
        {load ? 
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box> : 

        <Gatcha pokemons={items} value={value} user={user} token={token} money={money} setMoney={setMoney} />}

      </div>

      <div hidden={value !== 1}>
        {load ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box> :
        <Clicker pokemons={items} value={value} money={money} setMoney={setMoney} user={user} token={token} />}
      </div>

      <div hidden={value !== 2}>
        {load ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box> :
        <Pokedex pokemons={items} search={search} value={value} />}
      </div>

      <div hidden={value !== 3}>
        {load ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box> :
        <Admin user={user} token={token}/>}
      </div>

      <AppBar value={value} setValue={setValue} isAdmin={user.isAdmin}/>

      </ThemeProvider>}
    </div>
  );
}

export default App;