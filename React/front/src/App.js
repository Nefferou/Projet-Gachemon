import React from 'react';
import { useState, useEffect } from 'react';
import './Scss/App.scss';

import AppBar from "./Composants/AppBar"
import Header from "./Composants/Header"
import Pokedex from './Composants/Pokedex';

import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import Gatcha from './Composants/Gatcha';

import { Box } from '@mui/system';
import { CircularProgress } from '@mui/material';

function App() {

  const [value, setValue] = useState(1);
  const [search, setSearch] = useState("");

  const [items, setItems] = useState([]);
  const [load, isLoad] = useState(true);

  useEffect(function () {
    isLoad(true)
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
      <ThemeProvider theme={theme}>
      <Header value={value} changeSearch={setSearch} />

      <div hidden={value !== 0}>
      {load ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box> : 
      <Gatcha pokemons={items} />}
      </div>
      <div hidden={value !== 1}>
        Cool
      </div>
      <div hidden={value !== 2}>
        {load ? <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CircularProgress />
                </Box> :
        <Pokedex pokemons={items} search={search}/>}
      </div>

      <AppBar value={value} setValue={setValue}/>
      </ThemeProvider>
    </div>
  );
}

export default App;